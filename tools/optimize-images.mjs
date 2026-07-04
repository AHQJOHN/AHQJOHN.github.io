// One-time image optimizer for the static portfolio.
// Generates responsive WebP derivatives + a tiny blurred LQIP (base64) for each
// referenced PNG, and writes tools/image-manifest.json with the srcset + LQIP
// data URI to paste into the HTML. Original PNGs are kept as <picture> fallback.
//
// Usage: npm install && npm run optimize

import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'assets', 'img');

// Displayed widths to emit (capped to the source width, never upscaled).
const TARGET_WIDTHS = [800, 1600];
const WEBP_QUALITY = 80;
const LQIP_WIDTH = 32;
const LQIP_QUALITY = 40;

// PNGs actually referenced by the pages (unused images are skipped).
const IMAGES = [
  'cin',
  'sop-flow1',
  'industrial-safety0',
  'container1',
  'mobility-anpr',
  'identity',
  'identity2',
  'research-network2',
  'architecture2',
  'research-network',
  'work',
];

const manifest = {};

for (const name of IMAGES) {
  const src = path.join(IMG_DIR, `${name}.png`);
  const meta = await sharp(src).metadata();

  const widths = [...new Set(TARGET_WIDTHS.map((w) => Math.min(w, meta.width)))].sort((a, b) => a - b);
  const srcsetParts = [];

  for (const w of widths) {
    const outFile = path.join(IMG_DIR, `${name}-${w}.webp`);
    await sharp(src)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outFile);
    srcsetParts.push(`assets/img/${name}-${w}.webp ${w}w`);
  }

  const lqipBuffer = await sharp(src)
    .resize({ width: LQIP_WIDTH })
    .webp({ quality: LQIP_QUALITY })
    .toBuffer();
  const lqip = `data:image/webp;base64,${lqipBuffer.toString('base64')}`;

  manifest[name] = {
    width: meta.width,
    height: meta.height,
    srcset: srcsetParts.join(', '),
    lqip,
  };

  console.log(`${name}: widths [${widths.join(', ')}], lqip ${lqipBuffer.length} B`);
}

await writeFile(
  path.join(__dirname, 'image-manifest.json'),
  JSON.stringify(manifest, null, 2),
);

console.log(`\nDone. Wrote tools/image-manifest.json for ${IMAGES.length} images.`);
