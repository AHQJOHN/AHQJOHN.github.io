const portfolioProjects = [
  {
    id: 'brac-cin-ai', code: 'DEP-01', category: 'surveillance', stage: 'Production rollout', year: '2025–2026',
    title: 'Enterprise Bank & ATM Vision Monitoring', legacy: 'BRAC CIN AI',
    summary: 'Centralized AI surveillance for branches, ATMs, and critical facilities, combining security events, behavioral analytics, face workflows, alerting, and dashboard/API integration.',
    role: 'AI product and technical lead: use-case definition, system architecture, server-readiness planning, UAT coordination, false-positive reduction, stakeholder alignment, and production hardening.',
    metrics: [['1,000+','camera feeds'],['650+','locations'],['12','AI scenarios']],
    stack: ['Computer Vision','Multi-camera','Face Recognition','FastAPI','RTSP','GPU Inference'],
    challenges: ['Translate regulated banking-security needs into testable AI scenarios.','Coordinate camera, network, server, dashboard, API, and UAT dependencies.','Balance detection sensitivity with operationally acceptable false-alert rates.'],
    outcomes: ['Scaled centralized monitoring without proportional growth in manual supervision.','Created repeatable UAT, evidence, alert, and feedback workflows.','Advanced the implementation toward a modular, configurable surveillance platform.']
  },
  {
    id: 'bat-leaf-ai', code: 'DEP-02', category: 'sop', stage: 'Three-year production cycle', year: '2024–2026',
    title: 'Industrial Leaf SOP Intelligence', legacy: 'BAT AI Leaf SOP Checker',
    summary: 'Real-time, on-premises computer vision for a multi-step leaf checking and weighing workflow, with event evidence, GUI controls, API integration, and recovery logic.',
    role: 'Portfolio ownership, solution architecture, team leadership, stakeholder coordination, deployment planning, technical governance, and client-facing delivery.',
    metrics: [['3','buying seasons'],['Multi-step','SOP flow'],['On-prem','deployment']],
    stack: ['Object Tracking','YOLO','Multi-camera','PySide/PyQt','APIs','Recovery Logic'],
    challenges: ['Maintain bale identity across checking, opening, moisture, barcode, and weighing stages.','Operate under changing line conditions and real industrial camera constraints.','Sustain the platform across repeated seasonal cycles rather than a one-off demo.'],
    outcomes: ['Delivered a refreshed end-to-end pipeline for the 2026 cycle.','Improved operational controls, precision, and automated-line adaptability.','Demonstrated continuous product evolution through field learning and production hardening.']
  },
  {
    id: 'argus-safety', code: 'DEP-03', category: 'safety', stage: 'Production rollout', year: '2023–2026',
    title: 'Industrial Intrusion, Safety & SOP Platform', legacy: 'Argus Automata / KGF Smart Surveillance',
    summary: 'Centralized multi-camera safety intelligence covering virtual fencing, intrusion, object tracking, PPE and harness checks, vehicle/pathway monitoring, and unsafe-behavior detection.',
    role: 'Solution architecture, scenario design, model and evidence review, API/dashboard integration, accuracy governance, field validation, and team delivery leadership.',
    metrics: [['90+','cameras'],['97–99%','reported accuracy'],['Multi-site','operations']],
    stack: ['YOLO','Tracking','Virtual Fencing','PPE','Pose','Alert APIs'],
    challenges: ['Generalize across varied camera angles, lighting, PPE types, and operating zones.','Convert safety policy into measurable scenario-level acceptance rules.','Provide clear evidence snapshots and reliable production alerts.'],
    outcomes: ['Reduced dependence on continuous onsite manual checking.','Established reusable patterns for safety rules, alert senders, configuration, and deployment.','Supported scalable architecture and production monitoring.']
  },
  {
    id: 'staircase-safety', code: 'DEP-04', category: 'safety', stage: 'Production support', year: '2025–2026',
    title: 'Smart Staircase Safety Monitoring', legacy: 'Unilever Staircase Monitoring',
    summary: 'Vision-based staircase compliance monitoring for rail holding, phone use, person counting, and unsafe movement under a single-camera deployment.',
    role: 'Architecture, tracker/pose benchmarking, performance tuning, API integration, validation strategy, hosting/security documentation, and production support planning.',
    metrics: [['1','live camera'],['Pose +','tracking'],['Zero','reported misses in review']],
    stack: ['Pose Estimation','Tracking','RTSP','FastAPI','Cloud Hosting'],
    challenges: ['Avoid segmentation and tracker failures in narrow staircase geometry.','Support multiple people without losing rule continuity.','Maintain reliable behavior classification with limited camera coverage.'],
    outcomes: ['Delivered a focused safety workflow with event reporting.','Benchmarked alternatives and tuned the system for the constrained scene.','Prepared architecture, privacy, and operational-control documentation.']
  },
  {
    id: 'container-management', code: 'DEP-05', category: 'logistics', stage: 'Operational rollout', year: '2023–2026',
    title: 'Container Yard Intelligence', legacy: 'Track My Container / KDS Logistics',
    summary: 'Edge AI and OCR-assisted container tracking for a depot handling large inventory and high daily movement, designed to reduce manual reconciliation.',
    role: 'Requirement scoping, edge architecture, tracking/OCR design, deployment coordination, diagnostics, incident resolution, and operational integration.',
    metrics: [['6,000+','container capacity'],['3,000+','daily movements'],['~90%','inefficiency reduction']],
    stack: ['Jetson Orin Nano','OCR','Tracking','GPS/IoT','RTSP','Edge AI'],
    challenges: ['Handle fisheye distortion, vertical IDs, faded text, and unstable streams.','Fuse camera evidence with gate-side IoT and operational data.','Run reliably on edge hardware with limited infrastructure.'],
    outcomes: ['Reduced manual tracking and reconciliation effort.','Created event-level container movement evidence.','Established a base for yard dashboards, health monitoring, and incident workflows.']
  },
  {
    id: 'bengali-anpr', code: 'DEP-06', category: 'mobility', stage: 'Production & support', year: '2023–2026',
    title: 'Bengali ANPR & Vehicle Verification', legacy: 'Knit Asia / New Asia ANPR',
    summary: 'Bangla number-plate detection and recognition for day/night vehicle entry, driver-data association, gate operations, and searchable event records.',
    role: 'ML backend ownership, annotation and fine-tuning, camera calibration, deployment, performance validation, troubleshooting, and client handover.',
    metrics: [['15,000+','annotations'],['0.5–1.0s','response'],['Day/night','tuning']],
    stack: ['YOLO','PaddleOCR','OpenCV','Tracking','APIs','Edge/GPU'],
    challenges: ['Recognize low-contrast and night-time Bangla plates.','Maintain performance after physical camera-position changes.','Persist driver image and vehicle information consistently.'],
    outcomes: ['Delivered a responsive Bengali ANPR pipeline.','Established calibration and validation practices for real sites.','Supported long-term stabilization and operational handover.']
  },
  {
    id: 'smart-parking', code: 'DEP-07', category: 'mobility', stage: 'Rollout-ready', year: '2024–2026',
    title: 'Smart Parking & Automated Gate Flow', legacy: 'MKC Smart Parking',
    summary: 'Camera-based parking occupancy, Bengali ANPR, QR/payment confirmation, barrier integration, slot allocation, and operational analytics.',
    role: 'Solution architecture, ML readiness, parking-flow design, integration planning, camera-view requirements, and rollout dependency management.',
    metrics: [['ANPR +','occupancy'],['3-level','slot allocation'],['API/relay','integration']],
    stack: ['ANPR','Occupancy Detection','QR','Barrier Relay','Dashboard','RTSP'],
    challenges: ['Coordinate ML readiness with civil works, camera placement, and gate hardware.','Unify plate identity, payment state, slot availability, and barrier decisions.','Design for restart only after formal site-readiness and camera acceptance.'],
    outcomes: ['Prepared the AI and integration architecture for deployment.','Defined evidence, camera baseline, and site-readiness controls.','Preserved configuration readiness for rapid restart.']
  },
  {
    id: 'face-recognition', code: 'SOL-08', category: 'identity', stage: 'Productized capability', year: '2024–2026',
    title: 'Face Recognition, Attendance & Watchlists', legacy: 'FaceX Pro',
    summary: 'Real-time face identification for attendance, access, whitelist/blacklist alerts, VIP recognition, and searchable movement history.',
    role: 'Face-pipeline design, embedding and identity management, multi-camera workflow planning, edge/server sizing, data quality, and product use-case definition.',
    metrics: [['500+','registered identities'],['Entry/exit','events'],['On-prem','matching option']],
    stack: ['FaceNet','ArcFace','DeepFace','Siamese Networks','Tracking','APIs'],
    challenges: ['Maintain robust identity matching across lighting, pose, camera, and demographic variation.','Preserve names/tags and audit-safe identity updates.','Scale from single-camera attendance to centralized multi-camera operation.'],
    outcomes: ['Created reusable identity, access, watchlist, and movement modules.','Integrated recognition with operational event records.','Established a path toward larger centralized camera deployments.']
  },
  {
    id: 'crowd-analytics', code: 'SOL-09', category: 'analytics', stage: 'Delivered product', year: '2023–2025',
    title: 'Crowd Activity & Space Analytics', legacy: 'Smarter Spaces',
    summary: 'Crowd monitoring, heatmaps, journey visualization, dwell analysis, and customizable operational dashboards for physical spaces.',
    role: 'End-to-end product development across Python backend, PySide/PyQt frontend, analytics logic, visualization, and client-specific customization.',
    metrics: [['Heatmaps','real time'],['Journey','analytics'],['Custom','dashboards']],
    stack: ['Python','OpenCV','Tracking','PySide/PyQt','Matplotlib','Analytics'],
    challenges: ['Turn raw tracks into useful movement and engagement insights.','Build a flexible interface for different spaces and questions.','Balance visual clarity with real-time processing.'],
    outcomes: ['Delivered customizable operational analytics.','Enabled evidence-based layout and flow analysis.','Created reusable visualization patterns for client demos and dashboards.']
  },
  {
    id: 'deepfake-pipeline', code: 'SOL-10', category: 'generative', stage: 'Scaled production', year: '2022–2024',
    title: 'Bengali Voice & Lipsync Production Pipeline', legacy: 'Deepfake Production System',
    summary: 'A scaled media-generation pipeline combining Bengali TTS/voice cloning, automated lipsync, throughput controls, and quality review.',
    role: 'Pipeline design, production scaling, quality controls, performance optimization, team coordination, and ethical-use safeguards.',
    metrics: [['2,600+','videos'],['Bengali','voice pipeline'],['Batch','production']],
    stack: ['TTS','Voice Cloning','Wav2Lip','Python','Video Processing','QA'],
    challenges: ['Maintain identity, voice, and lip alignment across large batches.','Optimize throughput without losing quality consistency.','Apply appropriate controls to identity-based generative media.'],
    outcomes: ['Scaled output to thousands of videos.','Built repeatable quality and production workflows.','Developed strong practical experience in multimodal generation.']
  },
  {
    id: 'trp-monitoring', code: 'SOL-11', category: 'analytics', stage: 'Delivered system', year: '2022–2024',
    title: 'TV Habit & TRP Monitoring', legacy: 'TRP Monitoring System',
    summary: 'End-to-end monitoring with custom hardware planning, audio/video processing, Python GUI, packaging, and parallel execution.',
    role: 'System architecture, Raspberry Pi prototyping, backend processing, GUI design, audio segmentation, packaging, and deployment planning.',
    metrics: [['Audio +','video'],['Parallel','processing'],['End-to-end','delivery']],
    stack: ['Python','PyQt','Raspberry Pi','Audio Processing','Multiprocessing','Packaging'],
    challenges: ['Synchronize capture, segmentation, processing, and user interface.','Operate reliably on constrained prototype hardware.','Package a multi-process solution for practical deployment.'],
    outcomes: ['Delivered hardware-to-interface ownership.','Improved throughput using parallel processing.','Expanded capability beyond vision-only systems.']
  },
  {
    id: 'ocr-card', code: 'SOL-12', category: 'ocr', stage: 'Delivered tools', year: '2022–2025',
    title: 'OCR, Card & Document Interpretation', legacy: 'Card Interpreter / Container OCR',
    summary: 'OCR systems for business cards, container IDs, structured fields, and check-digit validation, delivered as practical interpretation tools.',
    role: 'OCR pipeline design, field extraction, validation logic, GUI/API integration, error handling, and packaging.',
    metrics: [['OCR','multiformat'],['Validation','rules'],['GUI/API','delivery']],
    stack: ['PaddleOCR','OpenCV','Python','Regex','Check Digits','FastAPI'],
    challenges: ['Handle varied layouts, orientation, blur, and low-quality text.','Map OCR output to structured fields and validation rules.','Provide usable tools rather than raw model output.'],
    outcomes: ['Delivered reusable OCR and interpretation modules.','Combined recognition with business-rule validation.','Applied OCR across logistics, identity, and document workflows.']
  },
  {
    id: 'bopp-inspection', code: 'RND-13', category: 'quality', stage: 'Feasibility & architecture', year: '2026',
    title: 'High-Speed BOPP/BOPET Film Inspection', legacy: 'Production-line Visual QC',
    summary: 'Camera, lighting, and inference design for detecting pinholes, scratches, trump lines, wrinkles, and low optical density on fast-moving film.',
    role: 'Feasibility analysis, camera geometry, backlight design, defect taxonomy, multi-camera coverage, server planning, and interactive visualization.',
    metrics: [['2.9 m','web width'],['1,000 m/min','line speed'],['0.2–0.5 mm','target pinholes']],
    stack: ['Line-scan Concepts','High-speed Vision','Backlighting','Detection/Segmentation','GPU','3D Planning'],
    challenges: ['Resolve sub-millimeter defects at extreme material speed.','Cover the full web width with synchronized cameras and stable illumination.','Translate physical constraints into realistic sensor, lens, lighting, and compute requirements.'],
    outcomes: ['Developed a practical multi-camera inspection concept.','Created interactive camera and line-layout visualizations.','Defined a staged feasibility path before committing to production hardware.']
  },
  {
    id: 'inventory-forklift', code: 'RND-14', category: 'logistics', stage: 'Solution design', year: '2026',
    title: 'Autonomous Inventory & Forklift Mapping', legacy: 'QR Inventory Management',
    summary: 'Vision/QR-assisted tracking of products moved by forklifts across temporary ground zones, permanent ground zones, and multi-level shelf storage.',
    role: 'Workflow design, location mapping, QR/vision architecture, forklift-path analysis, automation options, and deployment feasibility.',
    metrics: [['3','storage modes'],['Row/column','mapping'],['Low-manual','operation target']],
    stack: ['QR','Tracking','Spatial Mapping','Forklift Analytics','APIs','Edge AI'],
    challenges: ['Determine exact product location without manual operator input.','Represent rows, columns, stories, blocks, and temporary zones consistently.','Track handoffs and occlusions around moving forklifts.'],
    outcomes: ['Created multiple feasible architecture options.','Defined location semantics and event flows.','Connected inventory identity, movement, and spatial placement.']
  },
  {
    id: 'product-authentication', code: 'RND-15', category: 'quality', stage: 'Prototype', year: '2026',
    title: 'Engine-Oil Product Authentication', legacy: 'Mobil OBB Product Inspector',
    summary: 'Mobile/web inspection flow using oriented detection for container, cap, grade, product name, seal, size, and optional QR verification.',
    role: 'Class taxonomy, OBB training design, capture workflow, pass/fail logic, mobile-camera integration, best-crop selection, and API architecture.',
    metrics: [['7','inspection classes'],['3-step','capture'],['Pass/fail','decision']],
    stack: ['YOLO OBB','Mobile Web','FastAPI','Image Quality','QR','Session APIs'],
    challenges: ['Guide users through front/left/right capture without a dedicated app.','Select the best evidence crop from multiple frames.','Handle browser camera permissions, HTTPS, and network reliability.'],
    outcomes: ['Built a clear field-inspection workflow.','Combined visual attributes with optional QR verification.','Created a foundation for distribution traceability and counterfeit checks.']
  },
  {
    id: 'forklift-safety', code: 'RND-16', category: 'safety', stage: 'Solution design', year: '2025–2026',
    title: 'Warehouse Forklift Collision Safety', legacy: 'Forklift Safety System',
    summary: 'AI safety concept for blind spots, imminent collision, man-in-pathway, vehicle pathway, and physical alert integration.',
    role: 'Scenario definition, risk logic, camera placement, alert workflow, phase planning, and system architecture.',
    metrics: [['Blind spot','coverage'],['People +','vehicles'],['Physical','alerts']],
    stack: ['Detection','Tracking','Risk Zones','Edge AI','Alarm Integration','Event Logs'],
    challenges: ['Estimate risk from relative movement and occlusion.','Reduce nuisance alarms while keeping dangerous events visible.','Connect AI events to immediate physical warning mechanisms.'],
    outcomes: ['Defined a phased path from alerting to reporting.','Mapped safety scenarios to camera and edge-compute needs.','Created a reusable warehouse-risk framework.']
  },
  {
    id: 'multi-camera-tracking', code: 'RND-17', category: 'identity', stage: 'R&D prototype', year: '2025–2026',
    title: 'Cross-Camera Tracking & Re-identification', legacy: 'Multi-camera Re-ID',
    summary: 'Persistent identity linking across camera zones using detection, tracking, re-identification, and configurable transition logic.',
    role: 'R&D architecture, tracker/re-ID integration, persistent ID design, NVR stream handling, and event-state logic.',
    metrics: [['Multi-camera','identity'],['Persistent','tracks'],['NVR','stream support']],
    stack: ['YOLO','ByteTrack/DeepSORT','Re-ID','RTSP/NVR','State Stores','Python'],
    challenges: ['Link identities when cameras do not share the same view.','Preserve state through stream interruption and re-entry.','Support proprietary or irregular NVR stream formats.'],
    outcomes: ['Built reusable cross-camera identity concepts.','Advanced movement and access analytics capabilities.','Informed centralized face and safety platforms.']
  },
  {
    id: 'android-segmentation', code: 'RND-18', category: 'mobile', stage: 'R&D prototype', year: '2025',
    title: 'Android Live Detection & Segmentation', legacy: 'SAM + YOLO Mobile',
    summary: 'Live object detection and segmentation using front/back mobile cameras, designed for responsive operation on lower-end devices.',
    role: 'Model-pipeline design, mobile-camera workflow, performance strategy, and practical deployment analysis.',
    metrics: [['Live','camera'],['Detection +','segmentation'],['Low-end','device target']],
    stack: ['SAM','YOLO','Android','On-device AI','Camera APIs','Optimization'],
    challenges: ['Run heavy segmentation models within mobile memory and latency limits.','Switch camera sources without breaking inference state.','Balance mask quality with usable frame rate.'],
    outcomes: ['Explored production constraints for mobile vision.','Defined model and optimization trade-offs.','Expanded deployment experience beyond fixed-camera systems.']
  },
  {
    id: 'cash-counter-analytics', code: 'RND-19', category: 'surveillance', stage: 'Feasibility study', year: '2026',
    title: 'Bank Cash-Counter & Branch Analytics', legacy: '74-site Branch Vision',
    summary: 'Feasibility design for banker-side device presence, unattended bags, headcount, vault-area intrusion, tampering, loitering, theft, fights, and queue analytics.',
    role: 'Scenario feasibility, alert-duration logic, central-server capacity analysis, VLM versus detector trade-offs, and multi-site architecture.',
    metrics: [['74','sites'],['1','camera/site'],['Multi-rule','analytics']],
    stack: ['Detection','VLM Evaluation','Temporal Rules','Central GPU','RTSP','Alerts'],
    challenges: ['Separate feasible deterministic rules from open-ended behavior interpretation.','Run multiple scenarios centrally across constrained branch connectivity.','Define temporal thresholds that reduce nuisance alerts.'],
    outcomes: ['Produced a realistic detector-first architecture.','Defined rule timing for missing devices and unattended objects.','Clarified where VLMs add value and where specialized models are more efficient.']
  },
  {
    id: 'threat-object', code: 'RND-20', category: 'surveillance', stage: 'Integration prototype', year: '2026',
    title: 'Threat-Object Event Integration', legacy: 'Stick Detection POST API',
    summary: 'Detection and API event packaging for people carrying sticks or similar objects, including camera identity, timestamps, state, and evidence snapshots.',
    role: 'Detection workflow, payload schema, event-state design, evidence capture, and integration testing.',
    metrics: [['Event','payload'],['Snapshot','evidence'],['Detected/missing','state']],
    stack: ['YOLO','REST API','Multipart POST','RTSP','Event State','Python'],
    challenges: ['Avoid duplicate events across consecutive frames.','Attach consistent camera and timestamp metadata.','Handle detection-to-missing transitions cleanly.'],
    outcomes: ['Defined a production-ready integration contract.','Connected vision detections to external systems.','Created reusable event packaging patterns.']
  },
  {
    id: 'predictive-quality', code: 'SOL-21', category: 'quality', stage: 'Applied analytics', year: '2023–2026',
    title: 'Manufacturing Quality & Predictive Analysis', legacy: 'AI Process Checker',
    summary: 'Applied machine learning and vision for process verification, defect identification, production evidence, and predictive-quality exploration.',
    role: 'Problem discovery, data strategy, feasibility validation, model selection, visualization, and productization planning.',
    metrics: [['Vision +','tabular data'],['Process','evidence'],['Predictive','analysis']],
    stack: ['Computer Vision','Scikit-learn','Time Series','XAI','Dashboards','Data QA'],
    challenges: ['Connect image evidence to process and quality outcomes.','Build reliable datasets from operational signals.','Explain model findings to non-ML stakeholders.'],
    outcomes: ['Established reusable quality-inspection concepts.','Connected model metrics with business and process KPIs.','Supported technical pitches and future product opportunities.']
  },
  {
    id: 'digital-twin-grid', code: 'RND-22', category: 'platform', stage: 'R&D proposal', year: '2026',
    title: 'Cyber-Physical Grid Digital Twin', legacy: 'Utility R&D Initiative',
    summary: 'Production architecture concept for a power-grid digital twin integrating IoT/SCADA/PLCC data, real-time synchronization, AI serving, dashboards, audit trails, and utility validation.',
    role: 'Industry implementation and commercialization architecture: data pipelines, edge-to-cloud synchronization, MLOps/DevSecOps, APIs, alert workflows, and productization planning.',
    metrics: [['IoT/SCADA','integration'],['Edge ↔ cloud','synchronization'],['Utility','validation']],
    stack: ['Digital Twin','SCADA','IoT','MLOps','DevSecOps','Streaming Data'],
    challenges: ['Translate academic simulation into an operational utility platform.','Synchronize heterogeneous physical-system data with model state.','Design secure, auditable, scalable deployment and validation workflows.'],
    outcomes: ['Defined complementary academic and industry roles.','Created a production-oriented architecture direction.','Positioned the work for secure commercialization and real-world validation.']
  },
  {
    id: 'face-thesis', code: 'RES-23', category: 'research', stage: 'M.Sc. research', year: '2025–2026',
    title: 'Hybrid Face Verification Research', legacy: 'M.Sc. Thesis',
    summary: 'Face-verification research combining FaceNet/VGGFace representations, Siamese learning, ArcFace and triplet-loss concepts for robust metric learning.',
    role: 'Research design, dataset/evaluation planning, architecture development, experiments, ablation, metric analysis, and defense preparation.',
    metrics: [['95.70%','accuracy snapshot'],['Hybrid','embeddings'],['Metric','learning']],
    stack: ['FaceNet','VGGFace','Siamese','ArcFace','Triplet Loss','PyTorch'],
    challenges: ['Improve minority-class precision/recall beyond high overall accuracy.','Defend architectural choices with ablation and threshold analysis.','Connect embedding quality with operational verification metrics.'],
    outcomes: ['Completed an advanced applied face-verification study.','Built a rigorous defense framework with PR/ROC/EER and ablation analysis.','Deepened expertise in metric learning and identity systems.']
  },
  {
    id: 'medical-ai-research', code: 'RES-24', category: 'research', stage: 'Published research', year: '2021–2026',
    title: 'Applied ML, Medical AI, Federated Learning & XAI', legacy: 'Research Portfolio',
    summary: 'Research across medical prediction, federated random forests, intent classification, explainability, video surveillance, and energy-material simulation.',
    role: 'Research, experimentation, comparative evaluation, writing, visualization, and publication collaboration.',
    metrics: [['7','public works'],['29','ResearchGate citations*'],['1,300+','ResearchGate reads*']],
    stack: ['Scikit-learn','Federated Learning','Grad-CAM','NLP','Computer Vision','LaTeX'],
    challenges: ['Evaluate models beyond accuracy with transparent methodology.','Work with decentralized and privacy-sensitive data.','Communicate results across interdisciplinary domains.'],
    outcomes: ['Published across IEEE/conference and journal venues.','Built a foundation in applied research and scientific communication.','Connected research methods with enterprise AI practice.']
  }
];

(() => {
  const grid = document.querySelector('[data-project-grid]');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const search = document.querySelector('[data-project-search]');
  const count = document.querySelector('[data-result-count]');
  const modal = document.querySelector('[data-project-modal]');
  const modalContent = document.querySelector('[data-modal-content]');
  const modalClose = document.querySelector('[data-modal-close]');
  let activeFilter = 'all';

  const escapeHTML = (value) => String(value).replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

  const card = (project) => `
    <article class="archive-card glass-card" data-category="${escapeHTML(project.category)}" data-search="${escapeHTML([project.title, project.legacy, project.summary, project.stack.join(' ')].join(' ').toLowerCase())}">
      <div class="archive-top"><span class="archive-code">${escapeHTML(project.code)}</span><span class="archive-stage">${escapeHTML(project.stage)}</span></div>
      <h3>${escapeHTML(project.title)}</h3>
      <p>${escapeHTML(project.summary)}</p>
      <div class="archive-footer">
        <div class="archive-tags">${project.stack.slice(0,3).map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join('')}</div>
        <button class="details-button" type="button" data-open-project="${escapeHTML(project.id)}">Details ↗</button>
      </div>
    </article>`;

  const render = () => {
    if (!grid) return;
    grid.innerHTML = portfolioProjects.map(card).join('');
    applyFilters();
  };

  const applyFilters = () => {
    const query = (search?.value || '').trim().toLowerCase();
    let visible = 0;
    grid?.querySelectorAll('.archive-card').forEach((item) => {
      const matchesFilter = activeFilter === 'all' || item.dataset.category === activeFilter;
      const matchesSearch = !query || item.dataset.search.includes(query);
      item.hidden = !(matchesFilter && matchesSearch);
      if (!item.hidden) visible += 1;
    });
    if (count) count.textContent = `${visible} project${visible === 1 ? '' : 's'}`;
  };

  const openModal = (project) => {
    if (!modal || !modalContent) return;
    modalContent.innerHTML = `
      <div class="kicker">${escapeHTML(project.code)} · ${escapeHTML(project.year)} · ${escapeHTML(project.stage)}</div>
      <h2 id="project-modal-title">${escapeHTML(project.title)}</h2>
      <p style="margin-top:10px;color:var(--faint);font:650 .72rem/1.4 var(--font-mono)">Earlier portfolio label: ${escapeHTML(project.legacy)}</p>
      <div class="modal-metrics">${project.metrics.map(([value,label]) => `<div class="modal-metric"><strong>${escapeHTML(value)}</strong><span>${escapeHTML(label)}</span></div>`).join('')}</div>
      <h3>Project summary</h3><p>${escapeHTML(project.summary)}</p>
      <h3>My role</h3><p>${escapeHTML(project.role)}</p>
      <h3>Key challenges</h3><ul>${project.challenges.map((item) => `<li>${escapeHTML(item)}</li>`).join('')}</ul>
      <h3>Outcome / value</h3><ul>${project.outcomes.map((item) => `<li>${escapeHTML(item)}</li>`).join('')}</ul>
      <h3>Technology & methods</h3><div class="skill-cloud">${project.stack.map((item) => `<span class="skill-pill">${escapeHTML(item)}</span>`).join('')}</div>
      <p style="margin-top:24px;font-size:.74rem;color:var(--faint)">Descriptions are intentionally generalized. Client data, credentials, thresholds, internal network details, and sensitive configurations are excluded.</p>`;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose?.focus();
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  filters.forEach((button) => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    filters.forEach((item) => item.classList.toggle('active', item === button));
    applyFilters();
  }));
  search?.addEventListener('input', applyFilters);
  grid?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-open-project]');
    if (!button) return;
    const project = portfolioProjects.find((item) => item.id === button.dataset.openProject);
    if (project) openModal(project);
  });
  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal?.classList.contains('open')) closeModal(); });

  render();
})();
