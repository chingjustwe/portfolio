// ============ CORE: shared logic, modal, diagrams, interactions ============
const Portfolio = {
  state: { currentStyle: 'editorial', currentSlideIdx: 0, slidesCount: 0, slideMode: false, radarChart: null, zoom: 1 },
  themes: {},

  registerTheme(name, theme) { this.themes[name] = theme; },

  // ---- helpers ----
  escJson(str) { return str.replace(/'/g, "&#39;").replace(/"/g, "&quot;"); },
  escapeHtml(text) { const d = document.createElement('div'); d.textContent = text; return d.innerHTML; },
  hexToRgba(hex, a) { const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16); return `rgba(${r},${g},${b},${a})`; },
  cssVar(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); },

  // ============ RENDER PAGE ============
  renderPage() {
    const theme = this.themes[this.state.currentStyle];
    if (!theme) return;
    // destroy old chart before re-render
    if (this.state.radarChart) { this.state.radarChart.destroy(); this.state.radarChart = null; }
    const scrollY = window.scrollY;
    document.getElementById('page-content').innerHTML = theme.renderHTML();
    if (theme.afterRender) theme.afterRender();
    this.wireUpPage();
    this.updateStaticTexts();
    // re-apply slide mode styles if active (sections were re-rendered)
    if (this.state.slideMode) {
      document.querySelectorAll('section, #contact').forEach(el => {
        el.style.maxHeight = '100vh'; el.style.overflowY = 'auto'; el.style.overscrollBehavior = 'contain';
      });
      const contact = document.getElementById('contact');
      if (contact) { contact.style.display = 'flex'; contact.style.alignItems = 'center'; contact.style.justifyContent = 'center'; }
      document.getElementById('back-to-top').style.display = 'none';
    } else {
      window.scrollTo(0, scrollY);
    }
  },

  switchStyle(name) {
    if (name === this.state.currentStyle || !this.themes[name]) return;
    // close modal if open
    if (document.getElementById('project-modal').classList.contains('flex')) this.closeModal();
    this.state.currentStyle = name;
    document.documentElement.setAttribute('data-style', name);
    localStorage.setItem('portfolio-style', name);
    this.renderPage();
    this.updateStyleButton();
    this.updateLangButton();
  },

  switchLang(lang) {
    if (lang === I18N.getLang()) return;
    if (document.getElementById('project-modal').classList.contains('flex')) this.closeModal();
    I18N.setLang(lang);
    this.renderPage();
    this.updateLangButton();
  },

  updateStyleButton() {
    const btn = document.getElementById('style-switch');
    if (!btn) return;
    const cur = this.state.currentStyle;
    const labels = { original: I18N.t('style_original'), editorial: I18N.t('style_editorial') };
    btn.title = `${I18N.t('style_switch')}（${labels[cur]}）`;
    const labelEl = btn.querySelector('.style-label');
    if (labelEl) labelEl.textContent = cur === 'editorial' ? 'OR' : 'ED';
  },

  updateLangButton() {
    const btn = document.getElementById('lang-switch');
    if (!btn) return;
    const lang = I18N.getLang();
    btn.title = I18N.t('lang_switch');
    const labelEl = btn.querySelector('.lang-label');
    if (labelEl) labelEl.textContent = lang === 'zh' ? '中' : 'EN';
  },

  updateStaticTexts() {
    // slide hint (persistent HTML)
    const hint = document.getElementById('slide-hint');
    if (hint) {
      hint.innerHTML = `<span class="u-dim whitespace-nowrap"><kbd class="px-1.5 py-0.5 border u-br-rule u-r-sm text-[10px] u-muted">↑</kbd><kbd class="px-1.5 py-0.5 border u-br-rule u-r-sm text-[10px] u-muted">↓</kbd> <span class="u-muted">${I18N.t('slide_hint_nav')}</span> <span class="u-muted">·</span> <kbd class="px-1.5 py-0.5 border u-br-rule u-r-sm text-[10px] u-muted">Esc</kbd> <span class="u-muted">${I18N.t('slide_hint_exit')}</span></span>`;
    }
    // modal tooltips
    const zo = document.getElementById('zoom-out'); if (zo) zo.title = I18N.t('zoom_out');
    const zi = document.getElementById('zoom-in'); if (zi) zi.title = I18N.t('zoom_in');
    const zr = document.getElementById('zoom-reset'); if (zr) zr.title = I18N.t('zoom_reset');
    const mc = document.getElementById('modal-close'); if (mc) mc.title = I18N.t('modal_close');
    const bt = document.getElementById('back-to-top'); if (bt) bt.title = I18N.t('back_to_top');
    const st = document.getElementById('slide-toggle'); if (st) st.title = this.state.slideMode ? I18N.t('slide_exit') : I18N.t('slide_enter');
    // prev/next buttons
    const sp = document.getElementById('slide-prev'); if (sp) sp.querySelector('span').textContent = I18N.t('modal_prev');
    const sn = document.getElementById('slide-next'); if (sn) sn.querySelector('span').textContent = I18N.t('modal_next');
  },

  // ============ WIRE UP ============
  init() {
    // load saved style
    const savedStyle = localStorage.getItem('portfolio-style') || 'editorial';
    this.state.currentStyle = this.themes[savedStyle] ? savedStyle : 'editorial';
    document.documentElement.setAttribute('data-style', this.state.currentStyle);
    // load saved dark/light
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    this.setTheme(savedTheme);
    // wire persistent elements once
    this.wirePersistent();
    // render page
    this.renderPage();
    this.updateStyleButton();
    this.updateLangButton();
  },

  wirePersistent() {
    // modal
    document.getElementById('modal-close')?.addEventListener('click', () => this.closeModal());
    document.getElementById('project-modal')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) this.closeModal(); });
    document.getElementById('slide-prev')?.addEventListener('click', () => this.prevSlide());
    document.getElementById('slide-next')?.addEventListener('click', () => this.nextSlide());
    document.getElementById('slide-dots')?.addEventListener('click', (e) => { const dot = e.target.closest('[data-slide]'); if (dot) this.goToSlide(parseInt(dot.dataset.slide)); });
    // zoom controls
    document.getElementById('zoom-in')?.addEventListener('click', () => this.zoom(0.1));
    document.getElementById('zoom-out')?.addEventListener('click', () => this.zoom(-0.1));
    document.getElementById('zoom-reset')?.addEventListener('click', () => this.zoomReset());
    // back to top
    document.getElementById('back-to-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    // slide toggle
    document.getElementById('slide-toggle')?.addEventListener('click', () => this.toggleSlideMode());
    // scroll effects (persistent listener, queries DOM each time)
    let lastScrollY = 0;
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      const progressEl = document.getElementById('scroll-progress');
      if (progressEl) progressEl.style.width = progress + '%';
      const header = document.getElementById('main-header');
      if (header) {
        if (scrollTop > 60 && scrollTop > lastScrollY) { header.style.transform = 'translateY(-100%)'; header.style.boxShadow = 'none'; }
        else { header.style.transform = 'translateY(0)'; header.style.boxShadow = scrollTop > 50 ? '0 1px 0 var(--c-rule)' : 'none'; }
      }
      lastScrollY = scrollTop;
      document.querySelectorAll('.nav-link').forEach(link => {
        const section = document.getElementById(link.dataset.section);
        if (section) { const rect = section.getBoundingClientRect(); link.classList.toggle('active', rect.top <= 100 && rect.bottom >= 100); }
      });
    });
    // keyboard (persistent)
    document.addEventListener('keydown', (e) => {
      // P key toggles slide mode (not when typing in inputs)
      if (e.key === 'p' || e.key === 'P') { if (!e.target.matches('input,textarea')) { this.toggleSlideMode(); return; } }

      // Modal navigation — takes priority (modal can be open during slide mode)
      const modal = document.getElementById('project-modal');
      if (modal.classList.contains('flex')) {
        const archState = window.__archCardState;
        // zoom shortcuts (Ctrl +/-/0)
        if (e.ctrlKey || e.metaKey) {
          if (e.key === '=' || e.key === '+') { this.zoom(0.1); e.preventDefault(); return; }
          if (e.key === '-') { this.zoom(-0.1); e.preventDefault(); return; }
          if (e.key === '0') { this.zoomReset(); e.preventDefault(); return; }
        }
        if (e.key === 'Escape') {
          if (archState && archState.isOpen()) { archState.close(); e.preventDefault(); return; }
          this.closeModal(); return;
        }
        if (archState && archState.isOpen()) {
          if (e.key === 'ArrowLeft') { archState.goPrev(); e.preventDefault(); }
          if (e.key === 'ArrowRight') { archState.goNext(); e.preventDefault(); }
        } else {
          if (e.key === 'ArrowLeft') { this.prevSlide(); e.preventDefault(); }
          if (e.key === 'ArrowRight') { this.nextSlide(); e.preventDefault(); }
        }
        return;
      }

      // Slide mode section navigation (only when no modal is open)
      if (this.state.slideMode) {
        if (e.key === 'ArrowDown') { e.preventDefault(); this.goNextSlide(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); this.goPrevSlide(); }
        if (e.key === 'Escape') { this.toggleSlideMode(); }
      }
    });
  },

  wireUpPage() {
    // theme toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', () => {
      this.setTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark');
    });
    // style switch
    const styleBtn = document.getElementById('style-switch');
    if (styleBtn) styleBtn.addEventListener('click', () => {
      this.switchStyle(this.state.currentStyle === 'editorial' ? 'original' : 'editorial');
    });
    // lang switch
    const langBtn = document.getElementById('lang-switch');
    if (langBtn) langBtn.addEventListener('click', () => {
      this.switchLang(I18N.getLang() === 'zh' ? 'en' : 'zh');
    });
    // skills
    this.initSkills();
    // reveal observers
    this.setupReveal('#timeline-container > div');
    this.setupReveal('#project-cards > div');
  },

  setupReveal(selector) {
    const items = document.querySelectorAll(selector);
    if (!items.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(28px)';
      item.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
      observer.observe(item);
    });
  },

  setTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
    const sun = document.getElementById('theme-icon-sun');
    const moon = document.getElementById('theme-icon-moon');
    if (sun) sun.classList.toggle('hidden', theme === 'dark');
    if (moon) moon.classList.toggle('hidden', theme === 'light');
    // re-render chart with new colors
    if (this.state.radarChart) { this.state.radarChart.destroy(); this.state.radarChart = null; this.initSkills(); }
  },

  // ============ SKILLS ============
  initSkills() {
    const data = getData().skills;
    const radarCtx = document.getElementById('radar-chart');
    if (!radarCtx) return;
    const accent = this.cssVar('--c-accent') || '#3b82f6';
    const accent2 = this.cssVar('--c-accent-2') || '#8b5cf6';
    const isDark = document.documentElement.classList.contains('dark');
    this.state.radarChart = new Chart(radarCtx.getContext('2d'), {
      type: 'radar',
      data: { labels: data.categories.map(s => s.name), datasets: [{ data: data.categories.map(s => s.level),
        backgroundColor: this.hexToRgba(accent, 0.15), borderColor: this.hexToRgba(accent, 0.8), borderWidth: 2,
        pointBackgroundColor: this.hexToRgba(accent2, 0.8), pointBorderColor: isDark ? '#161310' : '#F2EDE3', pointHoverRadius: 6 }] },
      options: { responsive: true, maintainAspectRatio: true,
        scales: { r: { beginAtZero: true, max: 100,
          ticks: { stepSize: 20, color: isDark ? 'rgba(154,144,130,0.5)' : 'rgba(107,99,89,0.5)', backdropColor: 'transparent' },
          grid: { color: isDark ? 'rgba(237,230,216,0.08)' : 'rgba(27,25,22,0.08)' },
          angleLines: { color: isDark ? 'rgba(237,230,216,0.08)' : 'rgba(27,25,22,0.08)' },
          pointLabels: { color: isDark ? '#9A9082' : '#6B6359', font: { size: 11, family: this.cssVar('--f-body') || 'sans-serif' } } } },
        plugins: { legend: { display: false } },
        animation: { animateRotate: true, animateScale: true, duration: 1500 } }
    });
    // bars
    const barsContainer = document.getElementById('skills-bars');
    if (!barsContainer || barsContainer.children.length) return;
    data.details.forEach(skill => {
      const bar = document.createElement('div');
      bar.innerHTML = `<div class="flex items-center justify-between text-sm mb-1.5"><span class="u-soft font-medium">${skill.name}</span><span class="u-accent u-mono text-xs">${skill.level}%</span></div><div class="h-2 overflow-hidden border u-br-soft u-r-sm" style="background:var(--c-overlay)"><div class="h-full u-r-tag transition-all duration-1000 ease-out" style="width:0%;background:linear-gradient(90deg,var(--c-accent),var(--c-accent-2))"></div></div>`;
      barsContainer.appendChild(bar);
    });
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = document.getElementById('skills-bars')?.querySelectorAll('div[style*="width:0%"]');
          if (bars) bars.forEach((bar, idx) => setTimeout(() => bar.style.width = data.details[idx].level + '%', idx * 100));
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    const skillsSection = document.getElementById('skills');
    if (skillsSection) skillsObserver.observe(skillsSection);
  },

  // ============ MODAL ============
  openProjectModal(id) {
    const proj = getData().projects.find(p => p.id === id);
    if (!proj) return;
    const modal = document.getElementById('project-modal');
    const container = document.getElementById('modal-slides');
    const label = document.getElementById('modal-project-label');
    const slides = [
      { title: I18N.t('modal_slide_overview'), html: this.buildOverviewSlide(proj) },
      { title: I18N.t('modal_slide_arch'), html: this.buildArchitectureSlide(proj) },
      ...(proj.id === 'ga' || proj.id === 'e2e' || proj.id === 'eap' ? [{ title: I18N.t('modal_slide_highlights'), html: this.buildInnovationsSlide(proj) }] : []),
      { title: I18N.t('modal_slide_results'), html: this.buildResultsSlide(proj) }
    ];
    if (label) label.textContent = proj.title;
    container.innerHTML = slides.map((s, i) => `<div class="modal-slide p-8 ${i === 0 ? '' : ' hidden'}" data-index="${i}"><div class="flex items-center gap-3 mb-6 pb-4 border-b u-br-rule"><span class="w-8 h-8 flex items-center justify-center text-xs u-mono u-accent border u-br-accent u-r-sm shrink-0">${String(i + 1).padStart(2, '0')}</span><h3 class="u-serif text-xl u-ink font-semibold">${s.title}</h3></div><div class="modal-slide-body" style="transform:scale(1);transform-origin:top center;transition:transform .2s">${s.html}</div></div>`).join('');
    this.state.currentSlideIdx = 0;
    this.state.slidesCount = slides.length;
    this.state.zoom = 1;
    this.updateZoomLabel();
    this.updateSlideNav();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    Prism.highlightAll();
    document.body.style.overflow = 'hidden';
    document.getElementById('modal-slides-wrapper').scrollTop = 0;
    if (proj.id === 'eap') this.initArchHotspots();
    if (proj.id === 'e2e') this.initE2eYamlBubble();
  },

  closeModal() {
    const modal = document.getElementById('project-modal');
    const archState = window.__archCardState;
    if (archState && archState.isOpen()) archState.close();
    document.getElementById('e2e-yaml-bubble')?.classList.add('hidden');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
    this.state.currentSlideIdx = 0;
  },

  updateSlideNav() {
    const archState = window.__archCardState;
    if (archState && archState.isOpen()) archState.close();
    const e2eBubble = document.getElementById('e2e-yaml-bubble');
    if (e2eBubble && !e2eBubble.classList.contains('hidden')) e2eBubble.classList.add('hidden');
    document.querySelectorAll('.modal-slide').forEach(el => el.classList.toggle('hidden', parseInt(el.dataset.index) !== this.state.currentSlideIdx));
    document.getElementById('slide-prev').disabled = this.state.currentSlideIdx === 0;
    document.getElementById('slide-next').disabled = this.state.currentSlideIdx === this.state.slidesCount - 1;
    document.getElementById('slide-counter').textContent = `${this.state.currentSlideIdx + 1} / ${this.state.slidesCount}`;
    const dotsContainer = document.getElementById('slide-dots');
    dotsContainer.innerHTML = Array.from({ length: this.state.slidesCount }, (_, i) => `<span class="block w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === this.state.currentSlideIdx ? 'w-4' : 'opacity-40 hover:opacity-70'}" data-slide="${i}" style="background:${i === this.state.currentSlideIdx ? 'var(--c-accent)' : 'var(--c-dim)'}"></span>`).join('');
    // scroll to top on slide change
    document.getElementById('modal-slides-wrapper').scrollTop = 0;
  },

  // ============ ZOOM ============
  zoom(delta) {
    if (this.state.zoom === undefined) this.state.zoom = 1;
    this.state.zoom = Math.min(1.5, Math.max(0.5, this.state.zoom + delta));
    this.applyZoom();
  },
  zoomReset() { this.state.zoom = 1; this.applyZoom(); },
  applyZoom() {
    const body = document.querySelector('.modal-slide:not(.hidden) .modal-slide-body');
    if (body) body.style.transform = `scale(${this.state.zoom})`;
    this.updateZoomLabel();
  },
  updateZoomLabel() {
    const el = document.getElementById('zoom-level');
    if (el) el.textContent = Math.round((this.state.zoom || 1) * 100) + '%';
  },

  goToSlide(idx) { if (idx < 0 || idx >= this.state.slidesCount) return; this.state.currentSlideIdx = idx; this.updateSlideNav(); },
  nextSlide() { this.goToSlide(this.state.currentSlideIdx + 1); },
  prevSlide() { this.goToSlide(this.state.currentSlideIdx - 1); },

  // ============ SLIDE BUILDERS (shared) ============
  buildOverviewSlide(proj) {
    const metrics = {
      eap: [{v:'20+',l:'Agent/Skill',c:'u-accent'},{v:'MTTR -60%',l:I18N.t('metric_duration'),c:'u-accent2'},{v:'1w→2d',l:I18N.t('metric_cycle'),c:'u-accent'},{v:'5',l:I18N.t('metric_rbac'),c:'u-accent2'}],
      ga: [{v:'150K+',l:I18N.t('metric_endpoints'),c:'u-accent2'},{v:'20M+',l:I18N.t('metric_daily'),c:'u-accent'},{v:'99.99%',l:I18N.t('metric_availability'),c:'u-accent2'},{v:'2019',l:'Customer First',c:'u-accent'}],
      e2e: [{v:'40+',l:I18N.t('metric_sites'),c:'u-accent2'},{v:'99.9%',l:I18N.t('metric_success'),c:'u-accent2'},{v:'16',l:I18N.t('metric_concurrency'),c:'u-accent'},{v:'15+',l:I18N.t('metric_flows'),c:'u-accent'}]
    };
    const ms = metrics[proj.id] || [];
    return `<div class="grid grid-cols-1 md:grid-cols-5 gap-6"><div class="md:col-span-3 space-y-4"><div><h4 class="text-[11px] font-semibold u-dim uppercase tracking-wider mb-2 u-mono">${I18N.t('modal_bg')}</h4><p class="text-sm u-soft leading-relaxed">${proj.background || proj.details}</p></div><div><h4 class="text-[11px] font-semibold u-dim uppercase tracking-wider mb-2 u-mono">${I18N.t('modal_duty')}</h4><ul class="space-y-2">${(proj.contributions || []).map(c => `<li class="flex items-start gap-2 text-sm u-soft"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5 u-accent"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg><span>${c}</span></li>`).join('')}</ul></div></div><div class="md:col-span-2 u-bg-alt p-5 border u-br-rule u-r-md flex flex-col justify-center"><span class="text-[10px] u-mono u-dim uppercase tracking-wider mb-3">${I18N.t('modal_metrics')}</span><div class="grid grid-cols-2 gap-3">${ms.map(m => `<div class="u-elev p-3 text-center border u-br-soft u-r-sm"><span class="block u-serif text-xl font-semibold ${m.c}">${m.v}</span><span class="block text-[10px] u-mono u-dim">${m.l}</span></div>`).join('')}</div></div></div>`;
  },

  buildArchitectureSlide(proj) {
    const parts = [];
    if (proj.id === 'eap') parts.push(this.buildEapComplexDiagram(proj.architecture || []));
    else if (proj.id === 'ga') parts.push(this.buildGaComplexDiagram());
    else if (proj.id === 'e2e') parts.push(this.buildE2eComplexDiagram());
    else if (proj.flowDiagram && proj.flowDiagram.length) {
      const arrow = '<svg class="w-5 h-5 mx-2 u-dim rotate-90 md:rotate-0 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
      parts.push(`<div class="flex flex-col md:flex-row items-center justify-center gap-0 mb-6 pb-6 border-b u-br-rule">${proj.flowDiagram.map((n, i) => `${i > 0 ? arrow : ''}<div class="w-28 px-3 py-4 border bg-${n.color}-500/5 border-${n.color}-500/30 text-center group transition hover:bg-${n.color}-500/10 u-r-md"><div class="text-xs font-semibold u-ink group-hover:text-${n.color}-500 transition mb-0.5">${n.label}</div><div class="text-[9px] u-mono u-dim leading-tight">${n.sub}</div></div>`).join('')}</div>`);
    }
    if (proj.architecture && proj.architecture.length && proj.id !== 'eap' && proj.id !== 'ga' && proj.id !== 'e2e') parts.push(this.buildArchCardsHtml(proj));
    if (!parts.length) return '<p class="text-sm u-muted">' + I18N.t('modal_no_arch') + '</p>';
    return parts.join('');
  },

  buildArchCardsHtml(proj) {
    return '<div class="space-y-3">' + proj.architecture.map(l => `<div class="flex items-start gap-3 p-3 u-bg-alt border u-br-rule u-r-md"><div class="w-7 h-7 flex items-center justify-center shrink-0 bg-${l.color}-500/10 border border-${l.color}-500/30 u-r-sm"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-${l.color}-500"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div><div><h5 class="text-sm font-semibold u-ink mb-1">${l.title}</h5><p class="text-sm u-soft leading-relaxed">${l.desc}</p></div></div>`).join('') + '</div>';
  },

  buildEapComplexDiagram(archCards) {
    const down = '<svg class="w-3.5 h-3.5 mx-auto u-dim my-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>';
    const h = (idx) => `cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-${archCards[idx].color}-400/50 hover:shadow-lg hover:shadow-${archCards[idx].color}-500/10`;
    const hotspot = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="inline-block ml-1 opacity-50 group-hover:opacity-100 transition-opacity"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    return `<div class="relative" id="eap-arch-root" data-arch-cards='${this.escJson(JSON.stringify(archCards))}'><div class="flex flex-col items-center mb-5 pb-5 border-b u-br-rule"><div class="flex flex-wrap justify-center gap-1.5">${['AI Studio UI','IM Bot','IDE','Other services'].map((n,i) => `<div class="px-2.5 py-1.5 u-r-sm text-xs font-semibold bg-blue-500/10 border border-blue-500/30 text-blue-400${i===0?' '+h(1)+' cursor-pointer':''}"${i===0?' data-arch-idx="1"':''}>${n}${i===0?' '+hotspot:''}</div>`).join('')}</div>${down}<div class="bg-blue-600/5 border border-blue-600/20 u-r-md px-4 py-2.5 text-center group ${h(0)}" data-arch-idx="0"><div class="text-xs font-semibold text-blue-300 mb-1.5">API Gateway ${hotspot}</div><div class="flex items-center justify-center gap-1.5 flex-wrap">${['AG-UI','A2A','MCP','REST API'].map(n => `<span class="px-2 py-1 u-r-sm text-[10px] u-mono font-semibold bg-emerald-500/10 border border-dashed border-emerald-500/30 text-emerald-400">${n}</span>`).join('')}</div></div>${down}<div class="flex items-stretch justify-center gap-0 w-full max-w-xl"><div class="flex flex-col justify-around py-4 shrink-0"><div class="px-2 py-1.5 u-r-sm text-[10px] font-semibold text-center bg-amber-500/10 border border-amber-500/30 text-amber-400"><div>Registry</div><div class="text-[8px] u-mono opacity-70">Git Repo</div></div><div class="px-2 py-1.5 u-r-sm text-[10px] font-semibold text-center bg-orange-500/10 border border-orange-500/30 text-orange-400"><div>Project</div><div class="text-[8px] u-mono opacity-70">Git Repo</div></div></div><div class="flex flex-col justify-around py-4 px-0.5"><div class="flex flex-col items-center u-dim"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg><span class="text-[8px] u-mono">config</span></div><div class="flex flex-col items-center u-dim"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg><span class="text-[8px] u-mono">context</span></div></div><div class="flex-1 border-2 border-dashed u-br-soft u-r-lg p-2.5 min-w-0"><div class="text-[10px] u-mono u-dim uppercase tracking-wider mb-2 text-center">Server Side Agent Service</div>${down}<div class="flex flex-wrap justify-center gap-1 mb-1.5">${['Registry Catalog','Protocol Adapters','Session Routers','Identity / RBAC'].map(n => `<div class="px-2 py-1.5 u-r-sm text-[11px] font-semibold bg-lime-500/10 border border-lime-500/30 text-lime-400">${n}</div>`).join('')}</div>${down}<div class="flex items-start justify-center gap-1.5 flex-wrap"><div class="bg-green-500/10 border border-green-500/30 u-r-md p-2 ${h(2)}" data-arch-idx="2"><div class="text-[10px] u-mono u-dim mb-1">Runtime: project-a1 ${hotspot}</div><div class="flex gap-1"><div class="px-2 py-1.5 u-r-sm bg-green-500/10 border border-green-500/20 text-[11px] font-semibold text-green-400">Agent Runtime</div><div class="px-2 py-1.5 u-r-sm bg-green-500/10 border border-green-500/20 text-[11px] font-semibold text-green-400">Sessions</div></div></div><div class="bg-green-500/5 border border-green-500/20 u-r-md p-1.5 self-center"><div class="text-[9px] font-semibold text-green-400/70">Other Runtimes ...</div></div></div></div></div>${down}<div class="flex flex-wrap justify-center gap-2 ${h(3)}" data-arch-idx="3">${[{label:'MCP',sub:'Sandbox Executors',color:'teal'},{label:'LLM',sub:'Proxy',color:'rose'},{label:'PostgreSQL',sub:'Session DB',color:'purple'},{label:'NFS',sub:'Session Artifacts',color:'purple'}].map(n => `<div class="px-2.5 py-1.5 u-r-sm text-center bg-${n.color}-500/10 border border-${n.color}-500/30 text-${n.color}-400"><div class="text-[11px] font-semibold">${n.label}</div><div class="text-[9px] u-mono opacity-70">${n.sub}</div></div>`).join('')}<span class="text-xs u-dim self-center">${hotspot}</span></div></div><div class="fixed z-[100] hidden" id="arch-bubble"><div class="relative u-elev border u-br-rule u-r-md p-4 shadow-2xl max-w-xs transform transition-all duration-200 scale-95 opacity-0" id="arch-bubble-body"><div class="absolute w-3 h-3 u-elev rotate-45" id="arch-bubble-arrow"></div><div class="flex items-start gap-2.5"><div class="w-7 h-7 flex items-center justify-center shrink-0" id="arch-bubble-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div><div class="flex-1 min-w-0"><div class="text-sm font-semibold u-ink" id="arch-bubble-title"></div><div class="text-xs u-soft mt-0.5 leading-relaxed" id="arch-bubble-desc"></div></div><button class="shrink-0 p-0.5 u-muted hover:u-ink transition cursor-pointer" id="arch-bubble-close"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div><div class="flex items-center justify-between mt-2.5 pt-2 border-t u-br-soft"><button class="flex items-center gap-0.5 text-xs u-mono u-muted hover:u-ink disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" id="arch-bubble-prev"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>上一个</button><span class="text-xs u-mono u-dim" id="arch-bubble-counter"></span><button class="flex items-center gap-0.5 text-xs u-mono u-muted hover:u-ink disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" id="arch-bubble-next">下一个<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button></div></div></div></div>`;
  },

  buildGaComplexDiagram() {
    const down = '<svg class="w-3.5 h-3.5 mx-auto u-dim my-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>';
    return `<div class="flex flex-col items-center"><div class="px-3 py-2 u-r-sm bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">Portal</div><div class="text-[10px] u-mono u-dim mt-1 mb-1">Configure endpoints · view plugin results</div>${down}<div class="flex items-stretch gap-2 w-full max-w-xl"><div class="flex-1 border-2 border-dashed u-br-soft u-r-lg p-3"><div class="text-[10px] u-mono u-dim uppercase tracking-wider mb-2 text-center">Central Service</div><div class="grid grid-cols-2 gap-1.5 mb-2">${[['Meta Service','blue'],['Status Service','purple'],['Job Engine','indigo'],['Alert Service','amber']].map(([l,c]) => `<div class="px-2 py-1.5 u-r-sm text-[10px] font-semibold bg-${c}-500/10 border border-${c}-500/30 text-${c}-400 text-center">${l}</div>`).join('')}</div><div class="flex flex-wrap justify-center gap-1.5 pt-2 border-t u-br-soft">${[['PG','rose'],['Redis','rose']].map(([l,c]) => `<span class="px-1.5 py-0.5 u-r-sm text-[8px] u-mono font-semibold bg-${c}-500/10 border border-${c}-500/30 text-${c}-400">${l}</span>`).join('')}</div></div><div class="w-28 border-2 border-dashed border-teal-500/30 u-r-lg p-2 flex flex-col items-center"><div class="text-[10px] u-mono text-teal-400 uppercase tracking-wider mb-1.5">Observability</div>${['Prometheus','Grafana','Splunk','OpenSearch'].map(n => `<span class="w-full px-1.5 py-0.5 u-r-sm text-[10px] u-mono font-semibold bg-teal-500/10 border border-teal-500/30 text-teal-400 text-center mb-0.5">${n}</span>`).join('')}</div></div>${down}<div class="border-2 border-dashed u-br-soft u-r-lg p-3 w-full max-w-2xl"><div class="text-[10px] u-mono u-dim uppercase tracking-wider mb-1.5 text-center">Collector</div><div class="flex items-center justify-center gap-1.5 flex-wrap mb-2 pb-2 border-b u-br-soft">${['SJC','PEK (Beijing)','LHR (London)','HKG','SYD','FRA','N ...'].map((l,i) => `<span class="px-2 py-0.5 u-r-sm text-[9px] u-mono font-semibold ${i<3?'bg-indigo-500/10 border border-indigo-500/30 text-indigo-400':'u-dim'}">${l}</span>`).join('')}<span class="text-[8px] u-mono u-dim ml-1">Collector deployed by site proximity</span></div><div class="flex gap-2 items-stretch"><div class="flex-1 bg-green-500/5 border border-green-500/20 u-r-md p-2"><div class="text-[10px] font-semibold u-muted text-center mb-1.5">Standard Mode</div><div class="bg-green-500/10 border border-green-500/30 u-r-sm p-1.5 mb-1.5"><div class="text-[10px] font-semibold text-green-400 text-center mb-1">Agent</div><div class="flex items-center justify-center gap-1"><span class="px-2 py-0.5 u-r-sm text-[9px] font-semibold bg-green-500/10 border border-green-500/30 text-green-400">Dispatcher</span><svg class="w-3 h-3 u-dim shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg><span class="px-2 py-0.5 u-r-sm text-[9px] font-semibold bg-green-500/10 border border-green-500/30 text-green-400">Workers</span><span class="text-[8px] u-mono u-dim">×N</span></div><div class="text-[8px] u-mono u-dim text-center mt-0.5">Same program, different roles · horizontal scaling</div></div><div class="flex gap-1 justify-center mb-1"><div class="flex-1 bg-lime-500/10 border border-lime-500/30 u-r-sm p-1 text-center"><div class="text-[9px] font-semibold text-lime-400">Python Adapter</div><span class="inline-block px-1.5 py-0.5 text-[8px] u-mono text-amber-400 bg-amber-500/10 mt-0.5">Plugin</span></div><div class="flex-1 bg-lime-500/10 border border-lime-500/30 u-r-sm p-1 text-center"><div class="text-[9px] font-semibold text-lime-400">Java Adapter</div><span class="inline-block px-1.5 py-0.5 text-[8px] u-mono text-amber-400 bg-amber-500/10 mt-0.5">Plugin</span></div><div class="flex items-center justify-center bg-lime-500/10 border border-lime-500/30 u-r-sm px-1"><span class="text-[9px] u-mono text-lime-400/60">...</span></div></div><div class="text-[8px] u-mono u-dim text-center">Adapter → Agent API writeback</div><div class="mt-1 pt-1 border-t border-green-500/20 flex justify-center"><span class="px-2 py-0.5 u-r-sm text-[9px] u-mono font-semibold bg-rose-500/10 border border-rose-500/30 text-rose-400">Redis</span></div></div><div class="flex-1 bg-green-500/5 border border-dashed border-green-500/20 u-r-md p-2"><div class="text-[10px] font-semibold u-muted text-center mb-1.5">Slim Mode</div><div class="bg-green-500/10 border border-green-500/30 u-r-sm p-1.5 mb-1.5"><div class="text-[10px] font-semibold text-green-400 text-center mb-1">Agent (monolith)</div><div class="flex items-center justify-center gap-1"><span class="px-2 py-0.5 u-r-sm text-[9px] font-semibold bg-green-500/10 border border-green-500/30 text-green-400">Dispatcher</span><svg class="w-3 h-3 u-dim shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg><span class="px-2 py-0.5 u-r-sm text-[9px] font-semibold bg-green-500/10 border border-green-500/30 text-green-400">Worker</span></div><div class="text-[8px] u-mono u-dim text-center mt-0.5">Monolithic app · no horizontal scaling</div></div><div class="bg-amber-500/10 border border-amber-500/30 u-r-sm p-1 text-center mb-1"><div class="text-[9px] font-semibold text-amber-400">Plugin (filesystem)</div><div class="text-[8px] u-mono u-dim">Worker direct call</div></div><div class="text-[8px] u-mono u-dim text-center">Plugin executes test → Agent API writeback</div><div class="mt-1 pt-1 border-t border-green-500/20 flex justify-center"><span class="px-2 py-0.5 u-r-sm text-[9px] u-mono font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">Enhance Cache</span></div></div></div></div></div>`;
  },

  buildE2eComplexDiagram() {
    const down = '<svg class="w-3.5 h-3.5 mx-auto u-dim my-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>';
    const right = '<svg class="w-3 h-3 u-dim shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
    return `<div class="flex flex-col items-center"><div class="w-full max-w-xl bg-amber-500/5 border border-amber-500/20 u-r-md px-3 py-2 text-center cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-amber-400/50 hover:shadow-lg hover:shadow-amber-500/10" id="e2e-git-hotspot"><div class="text-[10px] u-mono text-amber-400 uppercase tracking-wider">Git Registry Repo<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="inline-block ml-1 text-amber-400/60"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></div><div class="flex justify-center gap-2 mt-1">${['YAML test steps','endpoint config'].map(l => `<span class="px-1.5 py-0.5 u-r-sm text-[8px] u-mono font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400">${l}</span>`).join('')}</div></div>${down}<div class="w-full max-w-xl border-2 border-dashed u-br-soft u-r-lg p-3"><div class="text-[10px] u-mono u-dim uppercase tracking-wider text-center mb-2">Monitoring System</div><div class="flex items-center justify-center gap-1.5">${['Scheduler','API','Agent'].map(l => `<span class="px-2 py-1 u-r-sm text-[9px] font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">${l}</span>`).join('')}</div></div>${down}<div class="flex items-stretch gap-2 w-full max-w-xl"><div class="flex-1 border-2 border-dashed u-br-soft u-r-lg p-3"><div class="text-[10px] u-mono u-dim uppercase tracking-wider text-center mb-2">Appium Adapter</div><div class="bg-blue-500/5 border border-blue-500/20 u-r-md p-2 text-center"><div class="text-[10px] font-semibold text-blue-400 mb-1">Appium Plugin</div><div class="text-[8px] u-mono u-dim">Schedule UI test steps · drive Runner execution</div><div class="flex justify-center gap-1 mt-1">${['Read Git Repo','Call Resource Mgr'].map(l => `<span class="px-1.5 py-0.5 u-r-sm text-[7px] u-mono bg-amber-500/10 border border-amber-500/30 text-amber-400">${l}</span>`).join('')}</div></div></div><div class="w-28 bg-rose-500/5 border border-rose-500/20 u-r-lg p-2 flex flex-col items-center justify-center"><div class="text-[10px] u-mono text-rose-400 uppercase tracking-wider mb-1.5">Resource Manager</div>${['Accounts','Runner','Artifacts','Metrics'].map(l => `<span class="w-full px-1.5 py-0.5 u-r-sm text-[8px] u-mono font-semibold bg-rose-500/10 border border-rose-500/30 text-rose-400 text-center mb-0.5">${l}</span>`).join('')}</div></div>${down}<div class="w-full max-w-xl border-2 border-dashed u-br-soft u-r-lg p-3"><div class="text-[10px] u-mono u-dim uppercase tracking-wider text-center mb-2">Appium Runner</div><div class="flex gap-2 items-stretch">${[{name:'Windows Runner',mode:'App / Browser'},{name:'Linux Runner',mode:'Browser (Headless)'}].map(r => `<div class="flex-1 bg-lime-500/5 border border-lime-500/20 u-r-md p-2"><div class="text-[10px] font-semibold text-lime-400 text-center mb-1.5">${r.name}</div><div class="bg-lime-500/10 border border-lime-500/30 u-r-sm p-1.5 mb-1 text-center"><div class="text-[9px] font-semibold text-lime-400">Runner Service</div><div class="text-[7px] u-mono u-dim">Receive Plugin task</div></div><div class="flex justify-center my-0.5">${right}</div><div class="bg-lime-500/10 border border-lime-500/30 u-r-sm p-1.5 text-center"><div class="text-[9px] font-semibold text-lime-400">Appium Service</div><div class="text-[7px] u-mono u-dim">${r.mode}</div></div></div>`).join('')}</div></div><div class="fixed z-[100] hidden" id="e2e-yaml-bubble"><div class="relative u-elev border u-br-rule u-r-md p-4 shadow-2xl max-w-sm transform transition-all duration-200 scale-95 opacity-0" id="e2e-yaml-body"><div class="absolute w-3 h-3 u-elev rotate-45" id="e2e-yaml-arrow"></div><div class="flex items-start gap-2.5 mb-2"><div class="flex-1 min-w-0"><div class="text-sm font-semibold u-ink">YAML Config Example</div><div class="text-[10px] u-mono u-dim">Test case definitions stored in Git Registry Repo</div></div><button class="shrink-0 p-0.5 u-muted hover:u-ink transition cursor-pointer" id="e2e-yaml-close"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div><pre class="text-[10px] leading-relaxed overflow-x-auto p-3" style="max-height:60vh"><code class="language-yaml">test_type: "web"\nresource:\n  account:\n    exclusive:\n      - u1\n      - u2\n    shared:\n      - u3\n  machine:\n    lin:\n      - m1\n      - m2\ncases:\n  machine_name: m1\n  steps:\n    - type: 1 # reference\n      name: "start meeting"\n      ref: "example_org/example_repo/example_dir/start_meeting"\n    - type: 2 # self define\n      name: "click chat"\n      action: "click"\n      target: "#chat"\n      timeout: 5\n...</code></pre></div></div></div>`;
  },

  buildResultsSlide(proj) {
    return `<div class="grid grid-cols-2 gap-4"><div class="col-span-2"><p class="text-sm u-soft leading-relaxed mb-4">${proj.details}</p></div>${(proj.highlights || []).map(h => `<div class="u-bg-alt border u-br-rule u-r-md p-5 text-center hover:border-blue-500/30 transition group"><span class="block text-sm u-ink font-semibold leading-relaxed">${h}</span></div>`).join('')}</div>`;
  },

  buildInnovationsSlide(proj) {
    const card = (color, inner) => `<div class="flex items-start gap-3 p-3 u-bg-alt border u-br-rule u-r-md"><div class="w-7 h-7 flex items-center justify-center shrink-0 bg-${color}-500/10 border border-${color}-500/30 u-r-sm"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-${color}-500"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div><div>${inner}</div></div>`;
    const innov = getData().innovations[proj.id];
    if (!innov) {
      if (proj.id === 'e2e') return '<div class="space-y-4">' + proj.architecture.map(l => `<div class="flex items-start gap-3 p-3 u-bg-alt border u-br-rule u-r-md"><div class="w-7 h-7 flex items-center justify-center shrink-0 bg-${l.color}-500/10 border border-${l.color}-500/30 u-r-sm"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-${l.color}-500"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div><div><h5 class="text-sm font-semibold u-ink mb-1">${l.title}</h5><p class="text-sm u-soft leading-relaxed">${l.desc}</p></div></div>`).join('') + '</div>';
      return '';
    }
    return `<div class="space-y-4">${innov.map(item => {
      let inner = `<h5 class="text-sm font-semibold u-ink mb-1">${item.title}</h5>`;
      if (item.list) inner += `<ul class="space-y-1 mt-1">${item.list.map(t => `<li class="flex items-start gap-2 text-sm u-soft"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5 text-rose-500"><circle cx="12" cy="12" r="10"/></svg><span>${t}</span></li>`).join('')}</ul>`;
      else inner += `<p class="text-sm u-soft leading-relaxed">${item.desc}</p>`;
      return card(item.color, inner);
    }).join('')}</div>`;
  },

  // ============ ARCH HOTSPOTS ============
  initArchHotspots() {
    const root = document.getElementById('eap-arch-root');
    if (!root) return;
    const cardsData = JSON.parse(root.dataset.archCards);
    let currentIdx = -1, currentEl = null;
    const bubble = document.getElementById('arch-bubble');
    const body = document.getElementById('arch-bubble-body');
    const arrow = document.getElementById('arch-bubble-arrow');
    const icon = document.getElementById('arch-bubble-icon');
    const title = document.getElementById('arch-bubble-title');
    const desc = document.getElementById('arch-bubble-desc');
    const counter = document.getElementById('arch-bubble-counter');
    const prevBtn = document.getElementById('arch-bubble-prev');
    const nextBtn = document.getElementById('arch-bubble-next');
    const closeBtn = document.getElementById('arch-bubble-close');
    const GAP = 8;
    function position(hotspotEl) {
      const r = hotspotEl.getBoundingClientRect();
      const bw = Math.min(320, window.innerWidth - 32);
      let above = r.top - 90 > 16;
      let left = Math.max(16, Math.min(r.left + r.width/2 - bw/2, window.innerWidth - bw - 16));
      let top = above ? r.top - GAP - arrow.offsetHeight : r.bottom + GAP + arrow.offsetHeight;
      bubble.style.left = left+'px'; bubble.style.top = top+'px'; bubble.style.width = bw+'px';
      const aLeft = Math.max(16, Math.min(r.left + r.width/2 - left, bw - 16));
      if (above) { arrow.style.top='auto'; arrow.style.bottom='-6px'; arrow.style.left=aLeft+'px'; arrow.style.borderLeft='1px solid var(--c-rule)'; arrow.style.borderTop='none'; arrow.style.borderRight='1px solid var(--c-rule)'; arrow.style.borderBottom='1px solid var(--c-rule)'; }
      else { arrow.style.top='-6px'; arrow.style.bottom='auto'; arrow.style.left=aLeft+'px'; arrow.style.borderLeft='1px solid var(--c-rule)'; arrow.style.borderTop='1px solid var(--c-rule)'; arrow.style.borderRight='none'; arrow.style.borderBottom='none'; }
    }
    function showCard(idx, hotspotEl) {
      if (idx < 0 || idx >= cardsData.length) return;
      currentIdx = idx; currentEl = hotspotEl;
      const d = cardsData[idx];
      title.textContent = d.title; desc.textContent = d.desc;
      counter.textContent = `${idx+1}/${cardsData.length}`;
      prevBtn.disabled = idx === 0; nextBtn.disabled = idx === cardsData.length - 1;
      icon.className = `w-7 h-7 flex items-center justify-center shrink-0 bg-${d.color}-500/10 border border-${d.color}-500/30 u-r-sm`;
      icon.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-${d.color}-500"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`;
      bubble.classList.remove('hidden'); position(hotspotEl);
      requestAnimationFrame(() => { body.classList.remove('scale-95','opacity-0'); body.classList.add('scale-100','opacity-100'); });
    }
    function hideCard() { body.classList.add('scale-95','opacity-0'); body.classList.remove('scale-100','opacity-100'); setTimeout(()=>bubble.classList.add('hidden'),200); currentIdx=-1; currentEl=null; }
    function reposition() { if (currentEl) position(currentEl); }
    root.querySelectorAll('[data-arch-idx]').forEach(el => el.addEventListener('click', (e) => { e.stopPropagation(); const idx = parseInt(el.dataset.archIdx); if (currentIdx === idx) hideCard(); else showCard(idx, el); }));
    closeBtn.addEventListener('click', (e) => { e.stopPropagation(); hideCard(); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); if (currentIdx > 0) { const el = root.querySelector(`[data-arch-idx="${currentIdx-1}"]`); if (el) showCard(currentIdx-1, el); }});
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); if (currentIdx < cardsData.length-1) { const el = root.querySelector(`[data-arch-idx="${currentIdx+1}"]`); if (el) showCard(currentIdx+1, el); }});
    document.addEventListener('click', (e) => { if (currentIdx >= 0 && !bubble.contains(e.target) && !e.target.closest('[data-arch-idx]')) hideCard(); }, true);
    const slide = root.closest('.modal-slide'); if (slide) slide.addEventListener('scroll', reposition);
    window.__archCardState = { isOpen: () => currentIdx >= 0, goPrev: () => { if (currentIdx > 0) { const el = root.querySelector(`[data-arch-idx="${currentIdx-1}"]`); if (el) showCard(currentIdx-1, el); } }, goNext: () => { if (currentIdx < cardsData.length-1) { const el = root.querySelector(`[data-arch-idx="${currentIdx+1}"]`); if (el) showCard(currentIdx+1, el); } }, close: hideCard };
  },

  initE2eYamlBubble() {
    const hotspot = document.getElementById('e2e-git-hotspot');
    const bubble = document.getElementById('e2e-yaml-bubble');
    const body = document.getElementById('e2e-yaml-body');
    const arrow = document.getElementById('e2e-yaml-arrow');
    const close = document.getElementById('e2e-yaml-close');
    if (!hotspot || !bubble) return;
    const ARROW = 8, GAP = 8; let open = false;
    function position() {
      const r = hotspot.getBoundingClientRect();
      const bw = Math.min(384, window.innerWidth - 32);
      let above = r.top - 150 > 16;
      let left = Math.max(16, Math.min(r.left + r.width/2 - bw/2, window.innerWidth - bw - 16));
      let top = above ? r.top - GAP - ARROW : r.bottom + GAP + ARROW;
      bubble.style.left = left+'px'; bubble.style.top = top+'px'; bubble.style.width = bw+'px';
      const aLeft = Math.max(16, Math.min(r.left + r.width/2 - left, bw - 16));
      if (above) { arrow.style.top='auto'; arrow.style.bottom='-6px'; arrow.style.left=aLeft+'px'; arrow.style.border='1px solid var(--c-rule)'; arrow.style.borderTop='none'; }
      else { arrow.style.top='-6px'; arrow.style.bottom='auto'; arrow.style.left=aLeft+'px'; arrow.style.border='1px solid var(--c-rule)'; arrow.style.borderBottom='none'; }
    }
    function show() { open = true; bubble.classList.remove('hidden'); position(); requestAnimationFrame(() => body.classList.remove('scale-95','opacity-0')); document.addEventListener('scroll', position, true); }
    function hide() { open = false; body.classList.add('scale-95','opacity-0'); setTimeout(()=>bubble.classList.add('hidden'),200); document.removeEventListener('scroll', position, true); }
    hotspot.addEventListener('click', (e) => { e.stopPropagation(); open ? hide() : show(); });
    close.addEventListener('click', hide);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) hide(); });
    const slide = document.getElementById('modal-slides-wrapper'); if (slide) slide.addEventListener('scroll', () => { if (open) position(); });
  },

  // ============ SLIDE MODE ============
  toggleSlideMode() {
    this.state.slideMode = !this.state.slideMode;
    const allSlides = document.querySelectorAll('section, #contact');
    const toggle = document.getElementById('slide-toggle');
    const hint = document.getElementById('slide-hint');
    const backTop = document.getElementById('back-to-top');
    if (this.state.slideMode) {
      window.scrollTo(0, 0); document.documentElement.scrollTop = 0;
      document.body.style.overflow = 'hidden'; document.body.style.overscrollBehavior = 'none';
      toggle.className = 'u-icon-btn active'; toggle.title = I18N.t('slide_exit');
      hint.classList.remove('hidden'); backTop.style.display = 'none';
      allSlides.forEach(el => { el.style.maxHeight = '100vh'; el.style.overflowY = 'auto'; el.style.overscrollBehavior = 'contain'; });
      const contact = document.getElementById('contact');
      if (contact) { contact.style.display = 'flex'; contact.style.alignItems = 'center'; contact.style.justifyContent = 'center'; }
      this.state.currentSlideSection = 0;
    } else {
      document.body.style.overflow = ''; document.body.style.overscrollBehavior = '';
      toggle.className = 'u-icon-btn'; toggle.title = I18N.t('slide_enter');
      hint.classList.add('hidden'); backTop.style.display = '';
      allSlides.forEach(el => { el.style.maxHeight = ''; el.style.overflowY = ''; el.style.overscrollBehavior = ''; });
      const contact = document.getElementById('contact');
      if (contact) { contact.style.display = ''; contact.style.alignItems = ''; contact.style.justifyContent = ''; }
    }
  },

  goNextSlide() {
    const sectionIds = ['hero','timeline','projects','skills','contact'];
    if (this.state.currentSlideSection === undefined) this.state.currentSlideSection = 0;
    if (this.state.currentSlideSection < sectionIds.length - 1) { this.state.currentSlideSection++; this.scrollToSlideSection(sectionIds[this.state.currentSlideSection]); }
  },
  goPrevSlide() {
    const sectionIds = ['hero','timeline','projects','skills','contact'];
    if (this.state.currentSlideSection === undefined) this.state.currentSlideSection = 0;
    if (this.state.currentSlideSection > 0) { this.state.currentSlideSection--; this.scrollToSlideSection(sectionIds[this.state.currentSlideSection]); }
  },
  scrollToSlideSection(id) {
    const el = document.getElementById(id); if (!el) return;
    try { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (_) { document.documentElement.scrollTop = el.offsetTop; }
  }
};
