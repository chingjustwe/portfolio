// ============ THEME: EDITORIAL (warm paper magazine serif) ============
Portfolio.registerTheme('editorial', {
  renderHTML() {
    return `
    <header id="main-header" class="fixed top-0 left-0 right-0 z-40 transition-all duration-300 h-16 flex items-center border-b u-br-rule" style="background:var(--c-header); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);">
      <div id="scroll-progress" class="absolute top-0 left-0 h-[2px]" style="width:0%;background:linear-gradient(90deg,var(--c-accent),var(--c-accent-2))"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center justify-between">
        <a href="#hero" onclick="event.preventDefault();window.scrollTo({top:0,behavior:'smooth'})" class="flex items-baseline gap-2 group cursor-pointer">
          <span class="u-serif text-lg u-ink font-semibold">池忠强</span>
          <span class="u-mono text-[10px] u-dim hidden sm:inline">— Rocky Chi / portfolio</span>
        </a>
        <div class="flex items-center gap-6">
          <nav class="hidden md:flex items-center gap-7">
            <a href="#timeline" class="nav-link text-sm font-medium" data-section="timeline"><span class="nidx">01</span>${I18N.t('nav_timeline')}</a>
            <a href="#projects" class="nav-link text-sm font-medium" data-section="projects"><span class="nidx">02</span>${I18N.t('nav_projects')}</a>
            <a href="#skills" class="nav-link text-sm font-medium" data-section="skills"><span class="nidx">03</span>${I18N.t('nav_skills')}</a>
            <a href="https://chingjustwe.github.io" target="_blank" class="nav-link text-sm font-medium"><span class="nidx">·</span>${I18N.t('nav_blog')}</a>
            <a href="#contact" class="nav-link text-sm font-medium" data-section="contact"><span class="nidx">04</span>${I18N.t('nav_contact')}</a>
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
      <div class="absolute inset-0 pointer-events-none opacity-60" style="background-image:linear-gradient(var(--c-rule-soft) 1px,transparent 1px),linear-gradient(90deg,var(--c-rule-soft) 1px,transparent 1px);background-size:88px 88px"></div>
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-[12%] left-[-6%] w-[420px] h-[420px] rounded-full" style="background:var(--c-glow1);filter:blur(40px)"></div>
        <div class="absolute bottom-[10%] right-[-4%] w-[520px] h-[520px] rounded-full" style="background:var(--c-glow2);filter:blur(50px)"></div>
      </div>
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div class="lg:col-span-7 flex flex-col items-start text-left">
            <p class="u-mono text-[11px] tracking-[0.2em] u-dim mb-6 rise" style="animation-delay:0s">${I18N.t('hero_vol')}</p>
            <p class="rise u-muted mb-2" style="animation-delay:.05s;font-family:var(--f-display);font-style:italic;font-size:1.1rem">${I18N.t('hero_greeting')}</p>
            <h1 class="rise mb-4" style="animation-delay:.1s;font-family:var(--f-display);font-weight:600;letter-spacing:-.035em;line-height:.88;color:var(--c-ink);font-size:clamp(3.5rem,8vw,6rem)">${I18N.t('hero_name')}</h1>
            <p class="rise mb-5" style="animation-delay:.2s;font-family:var(--f-display);font-style:italic;color:var(--c-soft);font-size:clamp(1.25rem,3vw,1.75rem)">${I18N.t('hero_tagline')}</p>
            <p class="u-mono text-sm u-muted mb-6 rise" style="animation-delay:.28s">${I18N.t('hero_subtitle')}</p>
            <blockquote class="rise mb-7 max-w-lg" style="animation-delay:.36s;font-family:var(--f-display);font-style:italic;color:var(--c-soft);border-left:2px solid var(--c-accent);padding-left:1rem;font-size:1.25rem">${I18N.t('hero_quote')}</blockquote>
            <div class="flex flex-wrap gap-2 mb-8 rise" style="animation-delay:.44s">
              <span class="u-tag">${I18N.t('tags.ai_agent')}</span><span class="u-tag">${I18N.t('tags.llm')}</span><span class="u-tag">${I18N.t('tags.java')}</span><span class="u-tag">${I18N.t('tags.spring_boot')}</span><span class="u-tag">${I18N.t('tags.distributed')}</span><span class="u-tag">${I18N.t('tags.k8s')}</span>
            </div>
            <div class="flex flex-wrap gap-3 items-center rise" style="animation-delay:.52s">
              <a href="#timeline" class="u-btn-accent"><span>${I18N.t('hero_cta_browse')}</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
              <a href="https://chingjustwe.github.io" target="_blank" class="u-btn-ghost"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg><span>${I18N.t('hero_cta_blog')}</span></a>
            </div>
            <nav class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-9 u-mono text-[11px] u-dim rise" style="animation-delay:.6s">
              <span class="u-muted">${I18N.t('hero_index')}</span>
              <a href="#timeline" class="hover:u-accent transition">01 ${I18N.t('nav_timeline')}</a><span>·</span>
              <a href="#projects" class="hover:u-accent transition">02 ${I18N.t('nav_projects')}</a><span>·</span>
              <a href="#skills" class="hover:u-accent transition">03 ${I18N.t('nav_skills')}</a><span>·</span>
              <a href="#contact" class="hover:u-accent transition">04 ${I18N.t('nav_contact')}</a>
            </nav>
          </div>
          <div class="lg:col-span-5 relative mt-4 lg:mt-0">
            <aside class="u-elev border u-br-rule p-6 sm:p-7 rise" style="animation-delay:.4s">
              <div class="flex items-center justify-between border-b u-br-rule pb-3 mb-4">
                <span class="u-mono text-[11px] tracking-[0.15em] u-dim">${I18N.t('dossier_title')}</span>
                <span class="u-mono text-[11px] u-accent">rocky_chi</span>
              </div>
              <dl class="grid grid-cols-1 gap-3 mb-5">
                <div class="flex items-baseline justify-between gap-3 border-b u-br-soft pb-2.5"><dt class="u-mono text-[10px] tracking-[0.1em] u-dim uppercase">${I18N.t('dossier_role')}</dt><dd class="u-serif text-right u-ink">${I18N.t('dossier_role_val')}</dd></div>
                <div class="flex items-baseline justify-between gap-3 border-b u-br-soft pb-2.5"><dt class="u-mono text-[10px] tracking-[0.1em] u-dim uppercase">${I18N.t('dossier_location')}</dt><dd class="u-serif text-right u-ink">${I18N.t('dossier_location_val')}</dd></div>
                <div class="flex items-baseline justify-between gap-3 border-b u-br-soft pb-2.5"><dt class="u-mono text-[10px] tracking-[0.1em] u-dim uppercase">${I18N.t('dossier_email')}</dt><dd class="u-mono text-right text-[13px] u-ink">ching91@sina.com</dd></div>
                <div class="flex items-baseline justify-between gap-3 border-b u-br-soft pb-2.5"><dt class="u-mono text-[10px] tracking-[0.1em] u-dim uppercase">${I18N.t('dossier_experience')}</dt><dd class="u-serif text-right u-ink">${getData().bio.experience}</dd></div>
                <div class="flex items-baseline justify-between gap-3"><dt class="u-mono text-[10px] tracking-[0.1em] u-dim uppercase">${I18N.t('dossier_focus')}</dt><dd class="u-serif text-right u-ink">${I18N.t('dossier_focus_val')}</dd></div>
              </dl>
              <div class="grid grid-cols-2 gap-px border u-br-rule" style="background:var(--c-rule)">
                <div class="u-elev p-3.5 text-center"><span class="block u-serif text-2xl font-semibold u-accent">20+</span><span class="block u-mono text-[10px] u-dim mt-0.5">${I18N.t('stat_agents').toUpperCase()}</span></div>
                <div class="u-elev p-3.5 text-center"><span class="block u-serif text-2xl font-semibold u-accent2">20+</span><span class="block u-mono text-[10px] u-dim mt-0.5">${I18N.t('stat_sharing')}</span></div>
                <div class="u-elev p-3.5 text-center"><span class="block u-serif text-2xl font-semibold u-accent">6+</span><span class="block u-mono text-[10px] u-dim mt-0.5">${I18N.t('stat_arch')}</span></div>
                <div class="u-elev p-3.5 text-center"><span class="block u-serif text-2xl font-semibold u-accent2">12+</span><span class="block u-mono text-[10px] u-dim mt-0.5">${I18N.t('stat_dev')}</span></div>
              </div>
              <div class="flex items-center justify-end gap-2 mt-5 pt-4 border-t u-br-rule">
                <span class="u-mono text-[11px] u-muted">${I18N.t('hero_available_short')}</span>
                <span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style="background:var(--c-accent-2)"></span><span class="relative inline-flex rounded-full h-2 w-2" style="background:var(--c-accent-2)"></span></span>
              </div>
            </aside>
            <div class="absolute -bottom-5 -left-5 floaty u-elev border u-br-rule px-4 py-2.5 flex items-center gap-2 u-mono text-[11px] u-ink max-w-[180px]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="u-accent"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span>${I18N.t('badge_distributed')}</span>
            </div>
            <div class="absolute -top-4 -right-4 floaty-d u-elev border u-br-rule px-4 py-2.5 flex items-center gap-2 u-mono text-[11px] u-ink max-w-[180px]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="u-accent2"><path d="M12 2v20"/><path d="M2 12h20"/></svg><span>${I18N.t('badge_ai_agent')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="timeline" class="py-24 relative overflow-hidden u-bg-alt">
      <div class="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex items-end justify-between gap-6 mb-14 border-b u-br-rule pb-6">
          <div><p class="sec-num mb-2">${I18N.t('timeline_section_num')}</p><h2 class="sec-title text-4xl sm:text-5xl">${I18N.t('timeline_title')}</h2></div>
          <p class="u-mono text-[10px] tracking-[0.12em] u-muted uppercase hidden sm:block whitespace-nowrap pb-1">${I18N.t('timeline_kicker')}</p>
        </div>
        <div id="timeline-container">
          ${getData().timeline.map((item, index) => `
            <div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-b u-br-soft last:border-b-0">
              <div class="md:col-span-3 flex md:flex-col gap-3 md:gap-1.5 items-baseline md:items-start">
                <span class="u-mono text-[11px] u-dim">0${index + 1}</span>
                <span class="u-serif text-base u-accent font-semibold">${item.year}</span>
                <span class="u-mono text-[11px] u-muted md:mt-1">${item.type === 'edu' ? I18N.t('timeline_edu') : I18N.t('timeline_work')}</span>
              </div>
              <div class="md:col-span-9">
                <div class="flex items-center gap-2 mb-1">
                  <span class="u-accent">${item.type === 'edu' ? ICON.edu : ICON.work}</span>
                  <h3 class="u-serif text-xl md:text-2xl u-ink font-semibold">${item.title}</h3>
                </div>
                <p class="u-mono text-xs u-muted mb-4">${item.org}</p>
                <ul class="space-y-2.5">
                  ${item.points.map(p => `<li class="flex items-start gap-3 text-sm u-soft leading-relaxed"><span class="u-accent">${ICON.arrow}</span><span>${p}</span></li>`).join('')}
                </ul>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <section id="projects" class="py-24 relative overflow-hidden u-bg">
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex items-end justify-between gap-6 mb-14 border-b u-br-rule pb-6">
          <div><p class="sec-num mb-2">${I18N.t('projects_section_num')}</p><h2 class="sec-title text-4xl sm:text-5xl">${I18N.t('projects_title')}</h2></div>
          <p class="u-mono text-[10px] tracking-[0.12em] u-muted uppercase hidden sm:block whitespace-nowrap pb-1">${I18N.t('projects_kicker')}</p>
        </div>
        <div id="project-cards" class="divide-y" style="--tw-divide-opacity:1">
          ${getData().projects.map((proj, idx) => `
            <div class="cursor-pointer py-8 px-2 transition" data-project="${proj.id}" onmouseover="this.style.background='var(--c-overlay)'" onmouseout="this.style.background=''">
              <div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                <div class="md:col-span-1"><span class="u-serif text-3xl u-dim font-semibold">0${idx + 1}</span></div>
                <div class="md:col-span-7">
                  <h3 class="u-serif text-2xl md:text-3xl u-ink font-semibold mb-1.5">${proj.title}</h3>
                  <p class="u-mono text-xs u-accent mb-3">${proj.role}</p>
                  <p class="u-soft text-sm leading-relaxed mb-4 max-w-xl">${proj.summary}</p>
                  <div class="flex flex-wrap gap-1.5">${proj.tech.map(t => `<span class="u-tag" style="padding:.2rem .5rem;font-size:.62rem">${t}</span>`).join('')}</div>
                </div>
                <div class="md:col-span-4 flex md:justify-end items-start md:items-center h-full">
                  <span class="u-accent text-xs u-mono flex items-center gap-1.5">${I18N.t('projects_view_detail')} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>
                </div>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <section id="skills" class="py-24 relative overflow-hidden u-bg-alt">
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex items-end justify-between gap-6 mb-14 border-b u-br-rule pb-6">
          <div><p class="sec-num mb-2">${I18N.t('skills_section_num')}</p><h2 class="sec-title text-4xl sm:text-5xl">${I18N.t('skills_title')}</h2></div>
          <p class="u-mono text-[10px] tracking-[0.12em] u-muted uppercase hidden sm:block whitespace-nowrap pb-1">${I18N.t('skills_kicker')}</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div class="u-elev border u-br-rule p-6 md:p-8"><h3 class="u-serif text-lg u-ink mb-6">${I18N.t('skills_radar')}</h3><div class="relative w-full max-w-[380px] mx-auto aspect-square"><canvas id="radar-chart"></canvas></div></div>
          <div class="u-elev border u-br-rule p-6 md:p-8"><h3 class="u-serif text-lg u-ink mb-6">${I18N.t('skills_detail')}</h3><div id="skills-bars" class="space-y-5"></div></div>
        </div>
        <div class="text-center mt-12 u-mono text-[11px] u-dim flex items-center justify-center gap-2"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span>${I18N.t('skills_continuous')}</span></div>
      </div>
    </section>

    <footer id="contact" class="u-bg-alt border-t u-br-rule py-16 relative overflow-hidden">
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex items-end justify-between gap-6 mb-12 border-b u-br-rule pb-6">
          <div><p class="sec-num mb-2">${I18N.t('footer_section_num')}</p><h2 class="sec-title text-4xl sm:text-5xl">${I18N.t('footer_title')}</h2></div>
          <p class="u-mono text-[10px] tracking-[0.12em] u-muted uppercase hidden sm:block whitespace-nowrap pb-1">${I18N.t('footer_kicker')}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <blockquote style="font-family:var(--f-display);font-style:italic;color:var(--c-soft);border-left:2px solid var(--c-accent);padding-left:1rem;font-size:1.5rem">${I18N.t('footer_quote')}</blockquote>
          <div class="md:text-right">
            <p class="u-mono text-xs u-dim mb-1">Rocky Chi</p>
            <p class="u-mono text-xs u-muted mb-5">ching91@sina.com · 18814840552</p>
            <div class="flex md:justify-end gap-3 flex-wrap">
              <a href="mailto:ching91@sina.com" class="u-btn-ghost" style="padding:.6rem 1rem;font-size:.8rem"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="0"/><path d="m22 7-8.97 5.7a2 2 0 0 1-2.06 0L2 7"/></svg><span>Email</span></a>
              <a href="https://chingjustwe.github.io" target="_blank" class="u-btn-ghost" style="padding:.6rem 1rem;font-size:.8rem"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg><span>Website</span></a>
              <a href="https://github.com/chingjustwe" target="_blank" class="u-btn-ghost" style="padding:.6rem 1rem;font-size:.8rem"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg><span>GitHub</span></a>
            </div>
          </div>
        </div>
        <div class="text-center u-mono text-[11px] u-dim mt-14 pt-8 border-t u-br-soft">${I18N.t('footer_built')}</div>
      </div>
    </footer>`;
  },

  afterRender() {
    // project card clicks
    document.querySelectorAll('#project-cards > div[data-project]').forEach(card => {
      card.addEventListener('click', () => Portfolio.openProjectModal(card.dataset.project));
    });
  }
});
