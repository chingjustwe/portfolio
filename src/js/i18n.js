// ============ I18N: language dictionary + management ============
const I18N = {
  lang: localStorage.getItem('portfolio-lang') || 'zh',

  dict: {
    zh: {
      // ---- nav ----
      nav_timeline: '经历', nav_projects: '项目', nav_skills: '技能', nav_blog: '博客', nav_contact: '联系',
      // ---- hero ----
      hero_vol: 'PORTFOLIO · VOL. 01 · MMXXVI',
      hero_greeting: 'Hi，我是',
      hero_name: '池忠强',
      hero_tagline: 'Java 架构师 / AI Engineer',
      hero_subtitle: 'AI Agent · AIOps · Observability — 杭州 / 上海',
      hero_quote: '"拥抱 AI，洞悉 AI，驾驭 AI"',
      tags: { ai_agent: 'AI Agent', llm: 'LLM', java: 'Java', spring_boot: 'Spring Boot', distributed: '分布式系统', k8s: 'K8s' },
      hero_cta_browse: '开始浏览',
      hero_cta_blog: '个人博客',
      hero_index: 'INDEX',
      hero_available: 'Available for AI / Full-Stack Roles · 杭州/上海',
      hero_available_short: 'Available for AI / Full-Stack Roles',
      // hero original tab labels
      hero_tab_bio: 'Bio', hero_tab_terminal: 'Terminal', hero_tab_stats: 'Stats',
      // hero terminal lines
      term_whoami: 'whoami', term_roles: 'cat /roles/current', term_specialty: 'echo $SPECIALTY', term_exp: 'cat /experience/timeline', term_edu: 'cat /education/degree',
      // dossier
      dossier_title: 'DOSSIER',
      dossier_role: 'role', dossier_location: 'location', dossier_email: 'email', dossier_experience: 'experience', dossier_focus: 'focus',
      dossier_role_val: 'Java Architect · AI Engineer',
      dossier_location_val: '杭州 / 上海',
      dossier_focus_val: 'AI Agent · AIOps',
      // floating badges
      badge_distributed: '分布式系统专家', badge_ai_agent: 'AI Agent 工程化',
      // stats labels
      stat_cisco: 'Years @ Cisco', stat_sharing: '技术分享', stat_arch: '年架构经验', stat_dev: '年开发经验',
      stat_agents: 'AI Agents 上线',
      // ---- timeline ----
      timeline_kicker: '经历 / Timeline',
      timeline_title: 'Experience & Education',
      timeline_section_num: '§ 01 — Chroncle',
      timeline_edu: 'EDUCATION', timeline_work: 'EXPERIENCE',
      // ---- projects ----
      projects_kicker: '项目 / Projects',
      projects_title: 'Featured Projects',
      projects_section_num: '§ 02 — Features',
      projects_view_detail: '查看详情',
      // ---- skills ----
      skills_kicker: '技能 / Skills',
      skills_title: 'Technical Competencies',
      skills_section_num: '§ 03 — Competence',
      skills_radar: '能力雷达图', skills_detail: '技术栈明细',
      skills_continuous: 'Continuous learning: 正在深入 LLM / Multi-Agent 方向',
      // ---- footer ----
      footer_section_num: '§ 04 — Colophon',
      footer_title: 'Get in Touch',
      footer_kicker: '联系 / Contact',
      footer_quote: '"用代码构建世界，用 AI 探索未来"',
      footer_built: '© 2026 Rocky Chi · Built with care & vanilla JS · set in Fraunces & Hanken Grotesk',
      footer_built_original: '© 2026 Rocky Chi · Built with ❤️ & vanilla JS',
      // ---- modal ----
      modal_slide_overview: '项目概述', modal_slide_arch: '技术架构', modal_slide_highlights: '关键亮点', modal_slide_results: '关键成果',
      modal_bg: '项目背景', modal_duty: '我的职责', modal_metrics: '核心指标',
      modal_prev: '上一页', modal_next: '下一页',
      modal_no_arch: '暂无架构详情',
      // ---- slide mode ----
      slide_enter: '进入幻灯片模式 (P)', slide_exit: '退出幻灯片模式 (P)',
      slide_hint_nav: '导航', slide_hint_exit: '退出',
      // ---- fixed controls ----
      back_to_top: '回到顶部',
      // ---- tooltips ----
      theme_toggle: '切换主题', style_switch: '切换风格', lang_switch: '切换语言',
      style_original: '原版', style_editorial: '编辑',
      zoom_out: '缩小 (Ctrl -)', zoom_in: '放大 (Ctrl +)', zoom_reset: '重置缩放 (Ctrl 0)', modal_close: '关闭 (Esc)',
      // metrics
      metric_duration: '耗时缩短', metric_cycle: '上线周期', metric_rbac: '权限隔离',
      metric_endpoints: '监控端点', metric_daily: '日均任务', metric_availability: '可用率',
      metric_sites: '全球站点', metric_success: '成功率', metric_concurrency: '并发/Agent', metric_flows: '核心流程',
      // arch diagram labels (already English, but some have Chinese)
      arch_config_endpoints: '配置监控端点 · 查看插件监控结果',
      arch_collector_deploy: 'Collector 按站点就近部署',
      arch_standard_scale: '同一程序不同角色 · 水平扩展',
      arch_slim_monolith: '单体应用 · 无水平扩展',
      arch_adapter_writeback: 'Adapter → Agent API 写回',
      arch_plugin_fs: 'Plugin (文件系统)', arch_plugin_direct: 'Worker 直接调用',
      arch_plugin_test: 'Plugin 执行测试 → Agent API 写回',
      arch_e2e_schedule: '调度 UI 测试步骤 · 驱动 Runner 执行',
      arch_yaml_steps: 'YAML 测试步骤', arch_yaml_config: '端点参数配置',
      arch_yaml_title: 'YAML 配置示例', arch_yaml_desc: 'Git Registry Repo 中存储的测试用例定义',
      arch_accounts: '账号', arch_runner: 'Runner', arch_artifacts: 'Artifacts', arch_metrics_label: 'Metrics',
      arch_read_git: '读 Git Repo', arch_call_rm: '调 Resource Mgr',
      arch_agent_monolith: 'Agent (单体)', arch_receive_plugin: '接收 Plugin 任务',
    },

    en: {
      // ---- nav ----
      nav_timeline: 'Experience', nav_projects: 'Projects', nav_skills: 'Skills', nav_blog: 'Blog', nav_contact: 'Contact',
      // ---- hero ----
      hero_vol: 'PORTFOLIO · VOL. 01 · MMXXVI',
      hero_greeting: "Hi, I'm",
      hero_name: 'Rocky Chi',
      hero_tagline: 'Java Architect / AI Engineer',
      hero_subtitle: 'AI Agent · AIOps · Observability — Hangzhou / Shanghai',
      hero_quote: '"Embrace AI, understand AI, master AI"',
      tags: { ai_agent: 'AI Agent', llm: 'LLM', java: 'Java', spring_boot: 'Spring Boot', distributed: 'Distributed Systems', k8s: 'K8s' },
      hero_cta_browse: 'Explore',
      hero_cta_blog: 'Personal Blog',
      hero_index: 'INDEX',
      hero_available: 'Available for AI / Full-Stack Roles · Hangzhou/Shanghai',
      hero_available_short: 'Available for AI / Full-Stack Roles',
      hero_available_short: 'Available for AI / Backend Roles',
      hero_tab_bio: 'Bio', hero_tab_terminal: 'Terminal', hero_tab_stats: 'Stats',
      term_whoami: 'whoami', term_roles: 'cat /roles/current', term_specialty: 'echo $SPECIALTY', term_exp: 'cat /experience/timeline', term_edu: 'cat /education/degree',
      dossier_title: 'DOSSIER',
      dossier_role: 'role', dossier_location: 'location', dossier_email: 'email', dossier_experience: 'experience', dossier_focus: 'focus',
      dossier_role_val: 'Java Architect · AI Engineer',
      dossier_location_val: 'Hangzhou / Shanghai',
      dossier_focus_val: 'AI Agent · AIOps',
      badge_distributed: 'Distributed Systems Expert', badge_ai_agent: 'AI Agent Engineering',
      stat_cisco: 'Years @ Cisco', stat_sharing: 'Tech Talks', stat_arch: 'Years Architecture', stat_dev: 'Years Development',
      stat_agents: 'AI Agents Shipped',
      // ---- timeline ----
      timeline_kicker: 'Experience / Timeline',
      timeline_title: 'Experience & Education',
      timeline_section_num: '§ 01 — Chronicle',
      timeline_edu: 'EDUCATION', timeline_work: 'EXPERIENCE',
      // ---- projects ----
      projects_kicker: 'Projects / Projects',
      projects_title: 'Featured Projects',
      projects_section_num: '§ 02 — Features',
      projects_view_detail: 'View Details',
      // ---- skills ----
      skills_kicker: 'Skills / Skills',
      skills_title: 'Technical Competencies',
      skills_section_num: '§ 03 — Competence',
      skills_radar: 'Skill Radar', skills_detail: 'Tech Stack Details',
      skills_continuous: 'Continuous learning: exploring LLM / Multi-Agent',
      // ---- footer ----
      footer_section_num: '§ 04 — Colophon',
      footer_title: 'Get in Touch',
      footer_kicker: 'Contact / Contact',
      footer_quote: '"Build the world with code, explore the future with AI"',
      footer_built: '© 2026 Rocky Chi · Built with care & vanilla JS · set in Fraunces & Hanken Grotesk',
      footer_built_original: '© 2026 Rocky Chi · Built with ❤️ & vanilla JS',
      // ---- modal ----
      modal_slide_overview: 'Overview', modal_slide_arch: 'Architecture', modal_slide_highlights: 'Key Highlights', modal_slide_results: 'Results',
      modal_bg: 'Background', modal_duty: 'My Role', modal_metrics: 'Key Metrics',
      modal_prev: 'Prev', modal_next: 'Next',
      modal_no_arch: 'No architecture details available',
      // ---- slide mode ----
      slide_enter: 'Enter slide mode (P)', slide_exit: 'Exit slide mode (P)',
      slide_hint_nav: 'navigate', slide_hint_exit: 'exit',
      // ---- fixed controls ----
      back_to_top: 'Back to top',
      // ---- tooltips ----
      theme_toggle: 'Toggle theme', style_switch: 'Switch style', lang_switch: 'Switch language',
      style_original: 'Original', style_editorial: 'Editorial',
      zoom_out: 'Zoom out (Ctrl -)', zoom_in: 'Zoom in (Ctrl +)', zoom_reset: 'Reset zoom (Ctrl 0)', modal_close: 'Close (Esc)',
      // metrics
      metric_duration: 'Duration Reduced', metric_cycle: 'Deployment Cycle', metric_rbac: 'RBAC',
      metric_endpoints: 'Endpoints', metric_daily: 'Daily Tasks', metric_availability: 'Availability',
      metric_sites: 'Sites', metric_success: 'Success Rate', metric_concurrency: 'Concurrency/Agent', metric_flows: 'Core Flows',
      // arch diagram labels
      arch_config_endpoints: 'Configure endpoints · view plugin results',
      arch_collector_deploy: 'Collectors deployed by site proximity',
      arch_standard_scale: 'Same program, different roles · horizontal scaling',
      arch_slim_monolith: 'Monolithic app · no horizontal scaling',
      arch_adapter_writeback: 'Adapter → Agent API writeback',
      arch_plugin_fs: 'Plugin (filesystem)', arch_plugin_direct: 'Worker direct call',
      arch_plugin_test: 'Plugin executes test → Agent API writeback',
      arch_e2e_schedule: 'Schedule UI test steps · drive Runner execution',
      arch_yaml_steps: 'YAML test steps', arch_yaml_config: 'Endpoint config',
      arch_yaml_title: 'YAML config example', arch_yaml_desc: 'Test case definitions stored in Git Registry Repo',
      arch_accounts: 'Accounts', arch_runner: 'Runner', arch_artifacts: 'Artifacts', arch_metrics_label: 'Metrics',
      arch_read_git: 'Read Git Repo', arch_call_rm: 'Call Resource Mgr',
      arch_agent_monolith: 'Agent (monolith)', arch_receive_plugin: 'Receive Plugin task',
    }
  },

  t(key) {
    const parts = key.split('.');
    let val = this.dict[this.lang];
    for (const p of parts) { val = val?.[p]; if (val === undefined) return key; }
    return val;
  },

  setLang(l) { this.lang = l; localStorage.setItem('portfolio-lang', l); document.documentElement.lang = l === 'en' ? 'en' : 'zh-CN'; },
  getLang() { return this.lang; },
  toggle() { this.setLang(this.lang === 'zh' ? 'en' : 'zh'); }
};

// set initial html lang
document.documentElement.lang = I18N.lang === 'en' ? 'en' : 'zh-CN';
