(() => {
  const root = document.documentElement;
  root.classList.add('reveal-ready');
  const header = document.querySelector('.site-header');
  const themeButton = document.querySelector('[data-theme-toggle]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav-links]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let storedTheme = null;
  try { storedTheme = localStorage.getItem('ahq-theme'); } catch {}
  if (storedTheme === 'light' || storedTheme === 'dark') root.dataset.theme = storedTheme;

  const setThemeIcon = () => {
    if (!themeButton) return;
    const isLight = root.dataset.theme === 'light';
    themeButton.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    themeButton.innerHTML = isLight
      ? '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.64 5.64l1.42 1.42m9.88 9.88 1.42 1.42m0-12.72-1.42 1.42M7.06 16.94l-1.42 1.42"/><circle cx="12" cy="12" r="4"/></svg>'
      : '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.5 14.2A8.3 8.3 0 0 1 9.8 3.5 8.6 8.6 0 1 0 20.5 14.2Z"/></svg>';
  };
  setThemeIcon();

  themeButton?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('ahq-theme', root.dataset.theme); } catch {}
    setThemeIcon();
  });

  const setMenu = (open) => {
    if (!nav || !menuButton) return;
    nav.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };

  menuButton?.addEventListener('click', () => setMenu(!nav?.classList.contains('open')));
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 16);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const revealItems = [...document.querySelectorAll('.reveal')];
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
    revealItems.forEach((item) => observer.observe(item));
  }

  const counters = [...document.querySelectorAll('[data-counter]')];
  const animateCounter = (node) => {
    const target = Number(node.dataset.counter || 0);
    const suffix = node.dataset.suffix || '';
    const decimals = Number(node.dataset.decimals || 0);
    if (reduceMotion) {
      node.textContent = target.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
      return;
    }
    const start = performance.now();
    const duration = 1200;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = target * eased;
      node.textContent = value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    counters.forEach((counter) => counterObserver.observe(counter));
  }

  document.querySelectorAll('[data-copy-email]').forEach((button) => {
    button.addEventListener('click', async () => {
      const email = button.dataset.copyEmail || 'ahq.john@gmail.com';
      const label = button.querySelector('[data-copy-label]');
      try {
        await navigator.clipboard.writeText(email);
        if (label) {
          const old = label.textContent;
          label.textContent = 'Copied';
          setTimeout(() => { label.textContent = old; }, 1600);
        }
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  });

  document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });

  // Progressive images: fade in each full-resolution image once it has loaded.
  // The blurred LQIP placeholder stays visible until then. Errors also resolve
  // so a failed/unsupported source never leaves an image stuck hidden.
  document.querySelectorAll('img.progressive-img').forEach((img) => {
    const reveal = () => img.classList.add('is-loaded');
    if (img.complete && img.naturalWidth > 0) {
      reveal();
    } else {
      img.addEventListener('load', reveal, { once: true });
      img.addEventListener('error', reveal, { once: true });
    }
  });
})();

// Vision pointer HUD
// A restrained computer-vision reticle that eases toward the pointer with a soft
// glow, trailing scan dots, and a contextual detection label. Self-contained and
// disabled on touch / coarse-pointer devices. Under prefers-reduced-motion it
// degrades to a calm, instant reticle (no trails, ambient glow, or click pulse).
(() => {
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rootEl = document.documentElement;
  const EASE = reduceMotion ? 1 : 0.18;
  const TRAIL_COUNT = reduceMotion ? 0 : 6;
  const TARGETS = 'a, button, .btn, .card, .work-card, .project-card, .case-card, .research-card, .research-item, .metric-card, .stat-card, .visual-card, .architecture-card, .contact-card, .archive-card, .project-visual, .architecture-visual, .project-metric, picture, img, [data-vision-target]';

  const labelFor = (el) => {
    const custom = el.closest('[data-vision-label]');
    if (custom) return custom.dataset.visionLabel;
    if (el.matches('picture, img') || el.closest('.project-visual, .architecture-visual')) return 'SCAN';
    if (el.closest('.project-metric, .metric-card, .stat-card, [data-counter]')) return 'KPI';
    if (el.closest('.archive-card, .work-card, .case-card')) return 'TRACK';
    if (el.closest('.research-card, .research-item, .research-layout')) return 'RESEARCH';
    if (el.closest('.project-card')) return 'DETECT';
    const link = el.closest('a');
    if ((link && /mailto:|tel:|wa\.me|t\.me|linkedin|github|researchgate|calendar/i.test(link.getAttribute('href') || '')) || el.closest('.contact-card, .contact-channel')) return 'CONNECT';
    return 'FOCUS';
  };

  const pointer = document.createElement('div');
  pointer.className = 'vision-pointer';
  pointer.setAttribute('aria-hidden', 'true');
  const reticle = document.createElement('div');
  reticle.className = 'vision-pointer__reticle';
  reticle.innerHTML =
    '<span class="vision-pointer__glow"></span>'
    + '<span class="vision-pointer__box"></span>'
    + '<span class="vision-pointer__ring"></span>'
    + '<span class="vision-pointer__dot"></span>'
    + '<span class="vision-pointer__label"></span>';
  pointer.appendChild(reticle);
  const label = reticle.querySelector('.vision-pointer__label');

  const trails = [];
  for (let i = 0; i < TRAIL_COUNT; i += 1) {
    const dot = document.createElement('span');
    dot.className = 'vision-pointer__trail';
    dot.style.opacity = (0.4 * (1 - i / TRAIL_COUNT)).toFixed(2);
    pointer.appendChild(dot);
    trails.push({ el: dot, x: 0, y: 0 });
  }

  const ambient = reduceMotion ? null : document.createElement('div');
  if (ambient) {
    ambient.className = 'vision-ambient';
    ambient.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ambient);
  }
  document.body.appendChild(pointer);

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let curX = targetX;
  let curY = targetY;
  let visible = false;
  let started = false;

  const setVisible = (state) => {
    if (state === visible) return;
    visible = state;
    pointer.classList.toggle('is-visible', state);
    if (ambient) ambient.classList.toggle('is-visible', state);
  };

  window.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') { setVisible(false); return; }
    targetX = event.clientX;
    targetY = event.clientY;
    if (!started) { started = true; curX = targetX; curY = targetY; }
    setVisible(true);
  }, { passive: true });

  window.addEventListener('pointerdown', (event) => {
    if (reduceMotion || event.pointerType === 'touch') return;
    pointer.classList.add('vision-pointer--clicking');
    setTimeout(() => pointer.classList.remove('vision-pointer--clicking'), 180);
  }, { passive: true });

  document.addEventListener('pointerover', (event) => {
    const target = event.target.closest && event.target.closest(TARGETS);
    if (target) {
      label.textContent = labelFor(target);
      pointer.classList.add('vision-pointer--active');
    }
  });
  document.addEventListener('pointerout', (event) => {
    const to = event.relatedTarget;
    if (!to || !(to.closest && to.closest(TARGETS))) {
      pointer.classList.remove('vision-pointer--active');
    }
  });

  document.addEventListener('mouseout', (event) => { if (!event.relatedTarget) setVisible(false); });
  window.addEventListener('blur', () => setVisible(false));

  const loop = () => {
    curX += (targetX - curX) * EASE;
    curY += (targetY - curY) * EASE;
    reticle.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
    if (ambient) ambient.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
    rootEl.style.setProperty('--pointer-x', `${curX}px`);
    rootEl.style.setProperty('--pointer-y', `${curY}px`);
    let px = curX;
    let py = curY;
    for (let i = 0; i < trails.length; i += 1) {
      const t = trails[i];
      t.x += (px - t.x) * 0.32;
      t.y += (py - t.y) * 0.32;
      t.el.style.transform = `translate3d(${t.x}px, ${t.y}px, 0)`;
      px = t.x;
      py = t.y;
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
})();
