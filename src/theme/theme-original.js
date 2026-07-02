// ============ THEME: ORIGINAL (glassmorphism dark blue/purple) ============
Portfolio.registerTheme('original', {
  renderHTML() {
    return `
    <header id="main-header" class="fixed top-0 left-0 right-0 z-40 transition-all duration-300 h-16 flex items-center border-b u-br-rule" style="background:var(--c-header); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);">
      <div id="scroll-progress" class="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" style="width:0%"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center justify-between">
        <a href="#hero" onclick="event.preventDefault();window.scrollTo({top:0,behavior:'smooth'})" class="flex items-center gap-2.5 group cursor-pointer">
          <div class="w-7 h-7 u-r-md overflow-hidden ring-2 u-br-soft group-hover:ring-blue-500/50 transition-all duration-300">
            <img src="images/link.jpg" alt="" class="w-full h-full object-cover" />
          </div>
          <div class="flex items-baseline gap-1.5">
            <span class="font-semibold text-sm u-ink">池忠强</span>
            <span class="text-[10px] u-dim u-mono hidden sm:inline">/portfolio</span>
          </div>
        </a>
        <div class="flex items-center gap-6">
          <nav class="hidden md:flex items-center gap-12">
            <a href="#timeline" class="nav-link text-sm font-medium" data-section="timeline">${I18N.t('nav_timeline')}</a>
            <a href="#projects" class="nav-link text-sm font-medium" data-section="projects">${I18N.t('nav_projects')}</a>
            <a href="#skills" class="nav-link text-sm font-medium" data-section="skills">${I18N.t('nav_skills')}</a>
            <a href="https://chingjustwe.github.io" target="_blank" class="nav-link text-sm font-medium">${I18N.t('nav_blog')}</a>
            <a href="#contact" class="nav-link text-sm font-medium" data-section="contact">${I18N.t('nav_contact')}</a>
          </nav>
          <div class="hidden md:block w-px h-5" style="background:var(--c-rule)"></div>
          <div class="flex items-center gap-2">
            <button id="lang-switch" class="u-icon-btn flex items-center gap-1.5" style="width:auto;padding:0 .55rem;" title="${I18N.t('lang_switch')}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <span class="lang-label u-mono text-[10px]">中</span>
            </button>
            <button id="style-switch" class="u-icon-btn flex items-center gap-1.5" style="width:auto;padding:0 .55rem;" title="${I18N.t('style_switch')}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/></svg>
              <span class="style-label u-mono text-[10px]">ED</span>
            </button>
            <button id="theme-toggle" class="u-icon-btn" title="${I18N.t('theme_toggle')}">
              <svg id="theme-icon-sun" class="hidden" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              <svg id="theme-icon-moon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            </button>
            <a href="https://github.com/chingjustwe/portfolio" target="_blank" class="u-icon-btn" title="GitHub">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
          </div>
        </div>
      </div>
    </header>

    <section id="hero" class="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <canvas id="particle-canvas" style="position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;z-index:0;pointer-events:none;"></canvas>
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute top-[10%] left-[5%] w-[350px] h-[350px] rounded-full blur-[120px]" style="background:var(--c-glow1)"></div>
        <div class="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full blur-[130px]" style="background:var(--c-glow2)"></div>
        <div class="absolute inset-0 opacity-[0.03] mix-blend-overlay" style="background-image:radial-gradient(circle,rgb(59,130,246) 1px,transparent 1px);background-size:24px 24px"></div>
      </div>
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative" id="hero-content">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-7 flex flex-col items-start text-left">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 u-r-tag bg-green-500/10 border border-green-500/20 text-green-400 u-mono text-xs font-semibold mb-6 shadow-sm shadow-green-500/5">
              <span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
              <span>${I18N.t('hero_available')}</span>
            </div>
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight u-ink leading-none mb-4">
              ${I18N.t('hero_greeting')} <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">${I18N.t('hero_name')}</span>
            </h1>
            <h2 class="text-lg sm:text-xl md:text-2xl font-bold u-soft mb-2">${I18N.t('hero_tagline')}</h2>
            <p class="text-base sm:text-lg u-muted u-mono mb-2">AI Agent / AIOps / Observability</p>
            <p class="text-base sm:text-lg u-muted leading-relaxed max-w-xl mb-6">${I18N.t('hero_quote')}</p>
            <div class="flex flex-wrap gap-2 mb-6">
              <span class="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 u-mono text-xs u-r-tag">${I18N.t('tags.ai_agent')}</span>
              <span class="px-3 py-1 bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 u-mono text-xs u-r-tag">${I18N.t('tags.llm')}</span>
              <span class="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 u-mono text-xs u-r-tag">${I18N.t('tags.java')}</span>
              <span class="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 u-mono text-xs u-r-tag">${I18N.t('tags.spring_boot')}</span>
              <span class="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 u-mono text-xs u-r-tag">${I18N.t('tags.distributed')}</span>
              <span class="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 u-mono text-xs u-r-tag">${I18N.t('tags.k8s')}</span>
            </div>
            <div class="flex flex-wrap gap-4 items-center">
              <a href="#timeline" class="u-btn-accent">
                <span>${I18N.t('hero_cta_browse')}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
              <a href="https://chingjustwe.github.io" target="_blank" class="u-btn-ghost">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                <span>${I18N.t('hero_cta_blog')}</span>
              </a>
            </div>
          </div>
          <div class="lg:col-span-5 relative mt-6 lg:mt-0">
            <div class="border u-br-rule u-r-lg shadow-2xl relative overflow-hidden u-glass">
              <div class="u-card border-b u-br-rule px-4 py-2.5 flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                <span class="ml-2 text-[10px] u-dim u-mono">rocky_chi</span>
              </div>
              <div class="flex p-1.5 u-overlay border-b u-br-rule">
                <button class="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 u-r-sm text-xs u-mono font-semibold transition-all duration-300 hero-tab" data-tab="profile" style="background:var(--c-accent);color:#fff">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span>${I18N.t('hero_tab_bio')}</span>
                </button>
                <button class="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 u-r-sm text-xs u-mono font-semibold transition-all duration-300 hero-tab" data-tab="terminal" style="color:var(--c-muted)">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg><span>${I18N.t('hero_tab_terminal')}</span>
                </button>
                <button class="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 u-r-sm text-xs u-mono font-semibold transition-all duration-300 hero-tab" data-tab="stats" style="color:var(--c-muted)">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg><span>${I18N.t('hero_tab_stats')}</span>
                </button>
              </div>
              <div class="hero-tab-content p-5 min-h-[340px] flex flex-col justify-center" id="tab-profile">
                <div class="flex flex-col items-center">
                  <div class="w-28 h-28 u-r-lg overflow-hidden border-2 border-blue-500/20 shadow-lg shadow-blue-500/10 mb-3"><img src="images/link.jpg" alt="Rocky Chi" class="w-full h-full object-cover" /></div>
                  <h3 class="u-ink font-bold text-lg">Rocky Chi</h3>
                  <p class="text-xs u-mono text-blue-400 mb-3">${getData().bio.subtitle}</p>
                  <div class="w-full grid grid-cols-2 gap-2 text-left u-mono text-[11px]">
                    <div class="u-card border u-br-rule p-2.5 u-r-sm"><span class="text-blue-400 block mb-0.5">location:</span><span class="u-soft">${getData().bio.location}</span></div>
                    <div class="u-card border u-br-rule p-2.5 u-r-sm"><span class="text-blue-400 block mb-0.5">email:</span><span class="u-soft">ching91@sina.com</span></div>
                    <div class="u-card border u-br-rule p-2.5 u-r-sm"><span class="text-blue-400 block mb-0.5">experience:</span><span class="u-soft">${getData().bio.experience}</span></div>
                    <div class="u-card border u-br-rule p-2.5 u-r-sm"><span class="text-blue-400 block mb-0.5">focus:</span><span class="u-soft">${getData().bio.focus}</span></div>
                  </div>
                </div>
              </div>
              <div class="hero-tab-content hidden p-5 min-h-[340px] flex flex-col justify-center u-mono text-sm" id="tab-terminal">
                <p><span class="text-green-400">$</span> <span class="u-soft">${I18N.t('term_whoami')}</span></p><p class="text-blue-400 mb-2">&gt; ${getData().terminal.whoami_out}</p>
                <p><span class="text-green-400">$</span> <span class="u-soft">${I18N.t('term_roles')}</span></p><p class="text-blue-400 mb-2">&gt; ${getData().terminal.roles_out}</p>
                <p><span class="text-green-400">$</span> <span class="u-soft">${I18N.t('term_specialty')}</span></p><p class="text-blue-400 mb-2">&gt; ${getData().terminal.specialty_out}</p>
                <p><span class="text-green-400">$</span> <span class="u-soft">${I18N.t('term_exp')}</span></p><p class="text-blue-400 mb-2">&gt; ${getData().terminal.exp_out}</p>
                <p><span class="text-green-400">$</span> <span class="u-soft">${I18N.t('term_edu')}</span></p><p class="text-blue-400 mb-2">&gt; ${getData().terminal.edu_out}</p>
                <p><span class="text-green-400">$</span> <span class="animate-pulse">_</span></p>
              </div>
              <div class="hero-tab-content hidden p-5 min-h-[340px] flex flex-col justify-center" id="tab-stats">
                <div class="grid grid-cols-2 gap-3">
                  <div class="u-card border u-br-rule u-r-md p-4 text-center"><span class="block text-2xl font-bold text-blue-400">20+</span><span class="block text-[10px] u-mono u-dim mt-1">${I18N.t('stat_agents')}</span></div>
                  <div class="u-card border u-br-rule u-r-md p-4 text-center"><span class="block text-2xl font-bold text-indigo-400">20+</span><span class="block text-[10px] u-mono u-dim mt-1">${I18N.t('stat_sharing')}</span></div>
                  <div class="u-card border u-br-rule u-r-md p-4 text-center"><span class="block text-2xl font-bold text-purple-400">6+</span><span class="block text-[10px] u-mono u-dim mt-1">${I18N.t('stat_arch')}</span></div>
                  <div class="u-card border u-br-rule u-r-md p-4 text-center"><span class="block text-2xl font-bold text-cyan-400">12+</span><span class="block text-[10px] u-mono u-dim mt-1">${I18N.t('stat_dev')}</span></div>
                </div>
              </div>
              <div class="u-card border-t u-br-rule py-1.5 px-3 flex items-center justify-between text-[10px] u-dim u-mono"><span>main</span><span>NORMAL</span></div>
            </div>
            <div class="absolute -bottom-6 -left-6 animate-float u-card border border-blue-500/20 shadow-md shadow-blue-500/5 px-4 py-2.5 u-r-md flex items-center gap-2 text-xs u-mono font-medium u-ink max-w-[180px]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span>${I18N.t('badge_distributed')}</span>
            </div>
            <div class="absolute -top-4 -right-4 animate-float-delayed u-card border border-purple-500/20 shadow-md shadow-purple-500/5 px-4 py-2.5 u-r-md flex items-center gap-2 text-xs u-mono font-medium u-ink max-w-[180px]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M2 12h20"/></svg><span>${I18N.t('badge_ai_agent')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="timeline" class="py-24 relative overflow-hidden u-bg-alt">
      <div class="absolute top-[10%] right-[5%] w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none" style="background:var(--c-glow1)"></div>
      <div class="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex flex-col items-center mb-16 text-center">
          <span class="inline-flex items-center gap-2 px-3 py-1.5 u-r-tag bg-blue-500/10 border border-blue-500/20 text-blue-400 u-mono text-xs font-semibold mb-4"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg><span>${I18N.t('timeline_kicker')}</span></span>
          <h2 class="text-3xl sm:text-4xl font-extrabold u-ink tracking-tight">${I18N.t('timeline_title')}</h2>
          <div class="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4"></div>
        </div>
        <div class="relative pl-4 sm:pl-8 border-l u-br-rule" id="timeline-container">
          ${getData().timeline.map((item, index) => {
            const isLast = index === getData().timeline.length - 1;
            return `<div class="relative group ${isLast ? '' : 'pb-12'}">
              <div class="absolute -left-[32px] sm:-left-[48px] top-1.5 w-8 h-8 u-r-md flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-all duration-300 shadow-md z-10" style="background:var(--c-bg-alt);border:4px solid var(--c-rule)">
                ${item.type === 'edu' ? ICON.edu : ICON.work}
              </div>
              <div class="u-glass border u-br-rule hover:border-blue-500/20 u-r-lg p-6 md:p-8 transition-all duration-300 group-hover:shadow-lg ml-4 sm:ml-8">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b u-br-rule pb-4">
                  <div><h3 class="font-bold text-lg md:text-xl u-ink group-hover:text-blue-400 transition">${item.title}</h3><p class="text-sm u-mono u-muted font-medium">${item.org}</p></div>
                  <span class="inline-flex items-center gap-1.5 px-3 py-1 u-overlay border u-br-rule u-r-sm text-xs u-mono u-muted shrink-0 self-start sm:self-center">${ICON.calendar} ${item.year}</span>
                </div>
                <ul class="space-y-3">${item.points.map(p => `<li class="flex items-start gap-3 text-sm u-soft"><span class="u-accent">${ICON.arrow}</span><span class="leading-relaxed">${p}</span></li>`).join('')}</ul>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>
    </section>

    <section id="projects" class="py-24 relative overflow-hidden u-bg">
      <div class="absolute top-[30%] left-[5%] w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none" style="background:var(--c-glow1)"></div>
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex flex-col items-center mb-16 text-center">
          <span class="inline-flex items-center gap-2 px-3 py-1.5 u-r-tag bg-blue-500/10 border border-blue-500/20 text-blue-400 u-mono text-xs font-semibold mb-4"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"/><circle cx="13" cy="12" r="2"/><path d="M18 19c-2.8 0-5-2.2-5-5v8"/><circle cx="20" cy="19" r="2"/></svg><span>${I18N.t('projects_kicker')}</span></span>
          <h2 class="text-3xl sm:text-4xl font-extrabold u-ink tracking-tight">${I18N.t('projects_title')}</h2>
          <div class="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="project-cards">
          ${getData().projects.map((proj, idx) => `<div class="u-elev border u-br-rule hover:border-blue-500/30 u-r-lg p-6 flex flex-col justify-between group transition-all duration-300 cursor-pointer hover:shadow-lg" data-project="${proj.id}">
            <div>
              <h3 class="font-bold text-lg md:text-xl u-ink group-hover:text-blue-400 transition mb-2">${proj.title}</h3>
              <p class="text-xs u-mono text-blue-400 mb-3">${proj.role}</p>
              <p class="u-soft text-sm leading-relaxed mb-4">${proj.summary}</p>
              <div class="flex flex-wrap gap-1.5 mb-4">${proj.tech.map(t => `<span class="px-2.5 py-1 u-overlay border u-br-rule u-muted u-mono text-[10px] u-r-sm">${t}</span>`).join('')}</div>
            </div>
            <div class="flex items-center justify-between pt-4 border-t u-br-rule">
              <span class="text-blue-400 text-xs u-mono flex items-center gap-1 group-hover:translate-x-1 transition-transform">${I18N.t('projects_view_detail')} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <section id="skills" class="py-24 relative overflow-hidden u-bg-alt">
      <div class="absolute top-[20%] left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style="background:var(--c-glow2)"></div>
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex flex-col items-center mb-16 text-center">
          <span class="inline-flex items-center gap-2 px-3 py-1.5 u-r-tag bg-blue-500/10 border border-blue-500/20 text-blue-400 u-mono text-xs font-semibold mb-4"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20v2"/><path d="M12 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/></svg><span>${I18N.t('skills_kicker')}</span></span>
          <h2 class="text-3xl sm:text-4xl font-extrabold u-ink tracking-tight">${I18N.t('skills_title')}</h2>
          <div class="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4"></div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="u-elev border u-br-rule u-r-lg p-6 md:p-8"><h3 class="font-bold text-lg u-ink mb-6 text-center">${I18N.t('skills_radar')}</h3><div class="relative w-full max-w-[380px] mx-auto aspect-square"><canvas id="radar-chart"></canvas></div></div>
          <div class="u-elev border u-br-rule u-r-lg p-6 md:p-8"><h3 class="font-bold text-lg u-ink mb-6">${I18N.t('skills_detail')}</h3><div id="skills-bars" class="space-y-5"></div></div>
        </div>
        <div class="text-center mt-12 u-mono text-[11px] u-dim flex items-center justify-center gap-2"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span>${I18N.t('skills_continuous')}</span></div>
      </div>
    </section>

    <footer id="contact" class="u-bg-alt border-t u-br-rule py-12 relative overflow-hidden">
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <p class="u-muted text-lg mb-2 font-light">${I18N.t('footer_quote')}</p>
        <p class="text-xs u-dim u-mono mb-8">Rocky Chi · ching91@sina.com · 18814840552</p>
        <div class="flex justify-center gap-4 mb-8">
          <a href="mailto:ching91@sina.com" class="u-btn-ghost" style="padding:.6rem 1rem;font-size:.8rem"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a2 2 0 0 1-2.06 0L2 7"/></svg><span>Email</span></a>
          <a href="https://chingjustwe.github.io" target="_blank" class="u-btn-ghost" style="padding:.6rem 1rem;font-size:.8rem"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg><span>Website</span></a>
          <a href="https://github.com/chingjustwe" target="_blank" class="u-btn-ghost" style="padding:.6rem 1rem;font-size:.8rem"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg><span>GitHub</span></a>
        </div>
        <div class="text-xs u-dim u-mono">${I18N.t('footer_built_original')}</div>
      </div>
    </footer>`;
  },

  afterRender() {
    // ---- particles ----
    const heroCanvas = document.getElementById('particle-canvas');
    if (!heroCanvas) return;
    const ctx = heroCanvas.getContext('2d');
    let particles = [];
    function resize() { heroCanvas.width = window.innerWidth; heroCanvas.height = window.innerHeight; }
    class Particle { constructor(){this.reset();} reset(){this.x=Math.random()*heroCanvas.width;this.y=Math.random()*heroCanvas.height;this.vx=(Math.random()-.5)*.4;this.vy=(Math.random()-.5)*.4;this.r=Math.random()*1.5+.5;} update(){this.x+=this.vx;this.y+=this.vy;if(this.x<0||this.x>heroCanvas.width)this.vx*=-1;if(this.y<0||this.y>heroCanvas.height)this.vy*=-1;} draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle='rgba(96,165,250,0.4)';ctx.fill();} }
    for (let i=0;i<80;i++) particles.push(new Particle());
    function drawConnections(){for(let i=0;i<particles.length;i++){for(let j=i+1;j<particles.length;j++){const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,dist=Math.sqrt(dx*dx+dy*dy);if(dist<150){ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(96,165,250,${(1-dist/150)*0.12})`;ctx.lineWidth=0.5;ctx.stroke();}}}}
    function animate(){ctx.clearRect(0,0,heroCanvas.width,heroCanvas.height);particles.forEach(p=>{p.update();p.draw();});drawConnections();requestAnimationFrame(animate);}
    resize(); animate();
    window.addEventListener('resize', resize);

    // ---- parallax ----
    const heroContent = document.getElementById('hero-content');
    const heroSection = document.getElementById('hero');
    if (heroContent && heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroContent.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        heroContent.style.transform = `perspective(1000px) rotateY(${x*2}deg) rotateX(${-y*2}deg)`;
      });
      heroSection.addEventListener('mouseleave', () => {
        heroContent.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        heroContent.style.transition = 'transform 0.5s ease-out';
        setTimeout(() => { heroContent.style.transition = ''; }, 500);
      });
    }

    // ---- hero tabs ----
    document.querySelectorAll('.hero-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.hero-tab').forEach(b => { b.style.background=''; b.style.color='var(--c-muted)'; });
        btn.style.background = 'var(--c-accent)';
        btn.style.color = '#fff';
        document.querySelectorAll('.hero-tab-content').forEach(c => c.classList.add('hidden'));
        document.getElementById('tab-' + btn.dataset.tab)?.classList.remove('hidden');
      });
    });

    // ---- project card clicks ----
    document.querySelectorAll('#project-cards > div[data-project]').forEach(card => {
      card.addEventListener('click', () => Portfolio.openProjectModal(card.dataset.project));
    });
  }
});
