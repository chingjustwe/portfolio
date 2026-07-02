// ============ SHARED DATA (bilingual) ============
const ICON = {
  edu: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
  work: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  calendar: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  arrow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
};

const DATA = {
  zh: {
    timeline: [
      { year: '2016.04 — 至今', title: '技术负责人', org: '思科系统（Cisco）· 杭州', type: 'work',
        points: [
          'AI Ops 平台（EAP）核心开发者，参与全栈建设：AG-UI 前端交互、Gateway 统一控制面（OAuth/OIDC 登录、RBAC、会话管理）、Agent Runtime 集成、Persistent 数据层，覆盖 Agent/Skill 从开发到上线的完整流程',
          '负责 Cisco Webex 监控平台（MCT）架构演进与持续迭代：推动微服务化改造，实施系统调优与性能优化，保障平台高可用与可扩展性',
          '主导 End to End UI Monitoring 项目，基于 Appium 构建跨平台 UI 自动化监控方案，覆盖全球 40+ 站点，成功率 99.9%+',
          '推动团队工程规范：CI/CD 全覆盖，UT 覆盖率 30% → 80%，推进技术栈升级，完善技术文档体系'
        ]},
      { year: '2015.09 — 2016.04', title: 'Java 工程师', org: '华信软件 · 上海', type: 'work',
        points: ['参与 Ericsson Multi Activation 命令集中分发系统的开发与维护','负责 Provisioning Gateway 模块的客户问题修复与定制需求实现'] },
      { year: '2015.03 — 2015.09', title: 'Java 工程师', org: '柯莱特软件 · 上海', type: 'work', points: ['参与 HP 中国商城的 J2EE 开发与维护工作'] },
      { year: '2013.07 — 2015.03', title: '信息员 / 开发', org: '国利汽车 · 上海', type: 'work', points: ['企业物流管理 ERP 全栈开发（Spring MVC + Hibernate + MySQL）','车型配置、零件管理等核心功能模块编码'] },
      { year: '2009.09 — 2013.06', title: '本科 · 信息与计算科学', org: '华东理工大学（211）', type: 'edu', points: ['计算机核心基础：数据结构、操作系统、计算机网络','为后续技术生涯奠定扎实基础'] }
    ],

    projects: [
      { id: 'eap', title: 'EAP — AI Agent 编排与运维平台', role: '核心开发者 · Gateway 架构设计', tech: ['FastAPI','React','Agent Runtime','OAuth/OIDC','MCP'],
        summary: '面向运维的 AI Agent 平台，统一鉴权与编排，MTTR 缩短近 60%',
        details: '作为核心人员参与从 n8n 原型到自有 Agent Runtime 平台的演进，负责 Gateway（统一控制面）的设计实现（OAuth/OIDC 登录、项目级 RBAC、会话管理），以及 AG-UI 前端交互。搭建 MCP Proxy 基础设施，与 Agent Runtime 深度集成。主导 Agent/Skill 上线标准化全流程，平台已上线 20+ Agent/Skill，相关 Incident MTTR 缩短近 60%。',
        highlights: ['MTTR 缩短 60%','20+ Agents','推动团队 AI 技术栈落地','促进了 coding agent 的普及'],
        background: '构建面向运维人员的中心化 AI Agent 平台，将 incident 分析、报警处理、工具调用和恢复动作从人工经验沉淀为可复用 Agent/Skill。初期基于 n8n 原型验证，后演进至通用 Agent Runtime 架构。',
        contributions: ['主导 Gateway 统一控制面设计：OAuth/OIDC 登录、项目级 RBAC、LLM/MCP Proxy、AG-UI 协议翻译','搭建 MCP Proxy 基础设施，实现企业 Token 注入与密钥隔离','主导 Agent/Skill 上线标准化全流程，Registry YAML 声明式接入，上线周期从 1 周缩短至 2 天','推动 OpenTelemetry 可观测性接入及 CI/CD 发布验证自动化'],
        architecture: [
          { title: 'Gateway（控制面）', desc: 'FastAPI 统一控制面，负责 OAuth/OIDC 鉴权、项目级 RBAC（LDAP）、会话管理及 AG-UI 协议翻译。Agent 统一通过 Gateway 鉴权路由，不直接调用 Runtime。', color: 'blue' },
          { title: 'AG-UI（交互面）', desc: 'React + Vite 前端，通过 Gateway 与 Runtime 交互。负责 Agent 列表、conversation streaming、权限弹窗及 subagent 可视化。', color: 'purple' },
          { title: 'OpenCode Runtime（执行面）', desc: 'Agent 执行引擎，负责 LLM 循环、Tool/MCP 调用、权限门控（allow/ask/deny）、事件流推送及 PostgreSQL 持久化。', color: 'indigo' },
          { title: '持久层', desc: 'PostgreSQL 存储会话状态、Agent 元数据及 RBAC 配置，支持水平扩展；NFS 挂载会话制品（日志、截图、Trace），实现执行面无状态化。', color: 'teal' }
        ],
        flowDiagram: [{ label:'AG-UI',sub:'React + Vite',color:'blue' },{ label:'Gateway',sub:'FastAPI 控制面',color:'purple' },{ label:'OpenCode Runtime',sub:'Agent 执行引擎',color:'blue' },{ label:'PostgreSQL',sub:'持久化存储',color:'indigo' }]
      },
      { id: 'ga', title: 'Global Agent — 分布式监控系统', role: '技术负责人 · 架构设计', tech: ['Java','Spring Quartz','Redis','Zookeeper','K8s'],
        summary: '高可用分布式任务调度，支持全球 15 万+ 监控端点',
        details: '独立主导从需求分析、架构设计、技术选型到工程搭建、代码评审、测试上线的完整生命周期。采用 Redis + Zookeeper + Spring Quartz 构建高可用分布式任务调度引擎，支持按地理位置择优分配测试 Agent。将原有未维护的 C++ 服务重写为 Java，统一技术体系。荣获 Cisco 2019 年度 Customer First 奖。',
        highlights: ['15 万+ 端点','日均 2000 万+ 任务','Cisco Customer First 奖','确保了系统高可用运行'],
        background: 'Cisco Webex 监控平台（MCT）需要一种分布式监控代理方案来替代已停止维护的 C++ Dispatcher + Station 架构。目标是将测试任务从中心式下发改造为全球分布式调度，同时统一技术体系到 Java 栈。',
        contributions: ['独立主导从需求分析、架构设计到工程搭建、代码评审、测试上线的完整生命周期','采用 Redis + Zookeeper + Spring Quartz 构建高可用分布式任务调度，按地理位置择优分配测试 Agent','将原有未维护的 C++ 服务重写为 Java，统一技术体系，吞吐量提升 3 倍'],
        architecture: [
          { title: '分布式调度引擎', desc: 'Redis + Zookeeper + Spring Quartz 构建高可用架构。Redis 存储 Agent 状态与地理位置索引，Zookeeper 选主与协调，Quartz 驱动定时任务分发。', color: 'blue' },
          { title: '智能路由与负载均衡', desc: '根据 Agent 地理位置、当前负载、历史成功率等维度综合评分，择优分配测试任务，确保全球各站点测试覆盖均衡。', color: 'purple' },
          { title: 'C++ → Java 统一迁移', desc: '将原 C++ Dispatcher 和 Station 全部重写为 Java 服务，统一技术体系，降低维护成本。迁移后吞吐量提升 3 倍。', color: 'indigo' }
        ]
      },
      { id: 'e2e', title: 'E2E UI Monitoring — 跨平台 UI 自动化', role: '技术负责人', tech: ['Appium','Java','YAML','Docker','Grafana'],
        summary: '跨平台模拟真实会议体验，覆盖全球 40+ 站点，成功率 99.9%+',
        details: '在全球 40+ 站点部署并稳定运行，日均执行数千次端到端 UI 测试，成功率 99.9%+。多次成功预警产线事故（如证书过期、网络故障等），大幅降低人工回归成本。每个 Linux Agent 支持 16 并发 Web 测试，Windows 多用户执行 App/混合测试，显著提升资源利用率。',
        highlights: ['全球 40+ 站点','99.9%+ 成功率','16 并发/Agent','多次成功预警产线事故'],
        background: '传统监控方案难以模拟真实用户从客户端发起会议、共享屏幕、音视频验证等完整体验。该平台旨在自动化验证 Webex 端到端会议体验，提前发现区域性故障并降低人工测试成本。',
        contributions: ['主导技术选型与架构设计，基于 Appium 封装跨平台 UI 监控方案，设计 YAML 模板统一 App 与 Web 测试接口','设计动态 Agent 分配策略，按测试类型（Web/App/混合）智能调度至对应 OS 的 Runner，最大化硬件利用率','集成 XFreeRDP、Xvfb、FFmpeg 等技术组件构建录屏与失败截图能力；自研 Resource Manager 统一管理测试账号、Runner 资源与产出物','推进 GitOps 运维体系，将测试模板、端点配置、告警规则纳入 GitHub 管理；推动 AI Ops 平台集成，上线辅助 Agent'],
        architecture: [
          { title: '跨平台测试引擎', desc: '基于 Appium 封装统一测试方案，YAML 模板驱动，同一模板同时支持 App 与 Web 测试，消除平台差异。', color: 'blue' },
          { title: 'Resource Manager', desc: '自研测试资源管理系统，统一管理 Agent、测试账户、资产文件，集成 Grafana 可视化资源状态，支持 GitOps 配置管理。', color: 'indigo' },
          { title: '动态 Agent 分配', desc: 'Linux Agent 4v8G 支持 16 并发 Web 测试，Windows Agent 多用户执行 App/混合测试，按测试类型自动分配，最大化硬件利用率。', color: 'purple' },
          { title: 'GitOps 与 AI Ops 辅助', desc: '用户通过 Git 仓库单一定义 YAML 测试用例、端点参数与告警规则，实现 Single Source of Truth；AI Ops 平台上线 Case 创建辅助 Agent，加速用例定义。', color: 'amber' }
        ]
      }
    ],

    skills: {
      categories: [{ name:'AI / LLM',level:85 },{ name:'Java / JVM',level:92 },{ name:'Spring Boot',level:90 },{ name:'数据库 / SQL',level:85 },{ name:'系统设计',level:90 },{ name:'DevOps',level:82 }],
      details: [{ name:'LLM / AI Agent',level:90 },{ name:'Python',level:82 },{ name:'Java',level:95 },{ name:'Spring Boot / Cloud',level:90 },{ name:'PostgreSQL / MySQL',level:85 },{ name:'Redis / Kafka',level:85 },{ name:'Docker / K8s',level:82 },{ name:'微服务架构',level:90 }]
    },

    // ---- EAP innovations (lang-specific text) ----
    innovations: {
      eap: [
        { color:'blue', title:'标准协议抽象，Runtime 可插拔', desc:'Gateway 以 AG-UI / MCP / A2A 标准协议统一控制面，Runtime 通过协议接入而非硬编码绑定，支持灵活替换执行引擎，不锁定 OpenCode。' },
        { color:'purple', title:'声明式 GitOps 接入，多级验证', desc:'Registry YAML 声明项目权限与 MCP Server，Project Repo 托管 Agent/Skill 配置，Admin review + CI 自动校验确保接入稳定。' },
        { color:'indigo', title:'多层安全护栏', desc:'Project/Tenant 隔离 → Conversation Ownership → RBAC → OpenCode Permission Gate（allow/ask/deny）→ MCP Proxy 密钥隔离，运行时安全由多层堆叠保障，非单点防御。' },
        { color:'rose', title:'企业补丁体系，低耦合扩展', desc:'不 Fork OpenCode，以补丁机制扩展 PostgreSQL 持久化、Tool Output 隔离、Workspace 边界限定、环境变量沙箱等企业能力。升级 OpenCode 时仅需维护 Patch 兼容性，核心代码零侵入。' }
      ],
      ga: [
        { color:'blue', title:'分布式调度引擎', desc:'Redis + Zookeeper + Spring Quartz 构建高可用架构。Redis 存储 Agent 状态与地理位置索引，Zookeeper 选主与协调，Quartz 驱动定时任务分发。' },
        { color:'purple', title:'智能路由与负载均衡', desc:'根据 Agent 地理位置、当前负载、历史成功率等维度综合评分，择优分配测试任务，确保全球各站点测试覆盖均衡。' },
        { color:'indigo', title:'抽象层设计', desc:'定义任务分配接口与 Plugin 执行抽象层，屏蔽 Standard / Slim 两种 Collector 运行模式的底层差异，同一套调度逻辑可无感切换部署模式。' },
        { color:'rose', title:'Redis 的妙用', list:['Agent 注册与健康状态','分布式锁与选主，去除 ZK 依赖','任务分配队列（List / Stream）','Meta 数据缓存、Status 数据缓存'] }
      ]
    },

    // ---- terminal lines (original hero) ----
    terminal: {
      whoami_out: 'rocky_chi / 池忠强',
      roles_out: 'Java Architect · AI Engineer · 技术负责人',
      specialty_out: '"AI Agent · Distributed Systems · Observability"',
      exp_out: 'Cisco 9y · 15 万+ 端点 · 20+ AI Agents',
      edu_out: '华东理工大学 · 信息与计算科学 · 211'
    },

    // ---- bio card (original hero) ----
    bio: {
      subtitle: 'Java Architect · AI Engineer',
      location: '"杭州 / 上海"', experience: '"12+ years"', focus: '"AI Agent · AIOps"'
    }
  },

  // ====================================================================
  //  EN — PLACEHOLDER, needs translation
  // ====================================================================
  en: {
    timeline: [
      { year: '2016.04 — Present', title: 'Tech Lead', org: 'Cisco Systems · Hangzhou', type: 'work',
        points: [
          'Core developer of AI Ops platform (EAP), full-stack involvement: AG-UI frontend, Gateway unified control plane (OAuth/OIDC login, RBAC, session management), Agent Runtime integration, and Persistent data layer — covering the complete Agent/Skill development-to-production pipeline',
          'Led architecture evolution of Cisco Webex monitoring platform (MCT): drove microservice migration, implemented system tuning and performance optimization, ensuring high availability and scalability',
          'Led End-to-End UI Monitoring project, built cross-platform UI automation solution based on Appium, covering 40+ global sites with 99.9%+ success rate',
          'Drove engineering standards: full CI/CD coverage, UT coverage from 30% to 80%, pushed tech stack upgrades, and improved technical documentation'
        ] },
      { year: '2015.09 — 2016.04', title: 'Java Engineer', org: 'Huaxin Software · Shanghai', type: 'work', points: ['Participated in development and maintenance of Ericsson Multi Activation command distribution system','Handled customer issue resolution and custom feature implementation for Provisioning Gateway module'] },
      { year: '2015.03 — 2015.09', title: 'Java Engineer', org: 'Continent Software · Shanghai', type: 'work', points: ['Participated in J2EE development and maintenance for HP China E-commerce platform'] },
      { year: '2013.07 — 2015.03', title: 'Developer', org: 'Guoli Auto · Shanghai', type: 'work', points: ['Full-stack development of enterprise logistics ERP (Spring MVC + Hibernate + MySQL)','Implemented core modules: vehicle configuration, parts management, etc.'] },
      { year: '2009.09 — 2013.06', title: 'B.S. · Information & Computing Science', org: 'East China University of Science and Technology (211)', type: 'edu', points: ['Computer science fundamentals: Data Structures, Operating Systems, Computer Networks','Laid a solid foundation for subsequent technical career'] }
    ],

    projects: [
      { id: 'eap', title: 'EAP — AI Agent Orchestration & Ops Platform', role: 'Core Developer · Gateway Architecture', tech: ['FastAPI','React','Agent Runtime','OAuth/OIDC','MCP'],
        summary: 'AI Agent platform for operations, unified auth and orchestration, reducing MTTR by nearly 60%',
        details: 'As a core contributor, participated in the evolution from n8n prototype to a proprietary Agent Runtime platform. Responsible for Gateway (unified control plane) design and implementation — OAuth/OIDC login, project-level RBAC, session management — and AG-UI frontend interaction. Built MCP Proxy infrastructure with deep Agent Runtime integration. Led standardization of the full Agent/Skill production pipeline. The platform has deployed 20+ Agents/Skills, reducing related Incident MTTR by nearly 60%.',
        highlights: ['MTTR reduced by 60%','20+ Agents','Drove AI tech stack adoption','Accelerated coding agent adoption'],
        background: 'Build a centralized AI Agent platform for operations engineers, transforming incident analysis, alert handling, tool invocation, and recovery actions from manual expertise into reusable Agents/Skills. Initially validated with an n8n prototype, then evolved to a general-purpose Agent Runtime architecture.',
        contributions: ['Designed Gateway unified control plane: OAuth/OIDC login, project-level RBAC, LLM/MCP Proxy, AG-UI protocol translation','Built MCP Proxy infrastructure with enterprise token injection and key isolation','Led standardization of the full Agent/Skill production pipeline: declarative Registry YAML, reducing deployment from 1 week to 2 days','Drove OpenTelemetry observability integration and CI/CD release verification automation'],
        architecture: [
          { title: 'Gateway (Control Plane)', desc: 'FastAPI unified control plane, handling OAuth/OIDC authentication, project-level RBAC (LDAP), session management, and AG-UI protocol translation. All Agents authenticate and route through Gateway without directly accessing Runtime.', color: 'blue' },
          { title: 'AG-UI (Interaction)', desc: 'React + Vite frontend, communicating with Runtime via Gateway. Manages Agent listings, conversation streaming, permission dialogs, and subagent visualization.', color: 'purple' },
          { title: 'OpenCode Runtime (Execution)', desc: 'Agent execution engine handling LLM loop, Tool/MCP invocation, permission gates (allow/ask/deny), event stream push, and PostgreSQL persistence.', color: 'indigo' },
          { title: 'Persistence Layer', desc: 'PostgreSQL stores session state, Agent metadata, and RBAC configuration with horizontal scaling support; NFS mounts session artifacts (logs, screenshots, traces) for stateless execution.', color: 'teal' }
        ],
        flowDiagram: [{ label:'AG-UI',sub:'React + Vite',color:'blue' },{ label:'Gateway',sub:'FastAPI',color:'purple' },{ label:'OpenCode Runtime',sub:'Agent Engine',color:'blue' },{ label:'PostgreSQL',sub:'Persistence',color:'indigo' }]
      },
      { id: 'ga', title: 'Global Agent — Distributed Monitoring System', role: 'Tech Lead · Architecture Design', tech: ['Java','Spring Quartz','Redis','Zookeeper','K8s'],
        summary: 'High-availability distributed task scheduling, supporting 150K+ monitoring endpoints globally',
        details: 'Independently led the complete lifecycle from requirements analysis, architecture design, and technology selection to project setup, code review, testing, and deployment. Built a high-availability distributed task scheduling engine with Redis + Zookeeper + Spring Quartz, supporting optimal test agent allocation based on geographic proximity. Rewrote unmaintained C++ services into Java, unifying the technology stack. Won the Cisco 2019 Customer First Award.',
        highlights: ['150K+ endpoints','20M+ daily tasks','Cisco Customer First Award','Ensured high-availability operation'],
        background: 'Cisco Webex monitoring platform (MCT) required a distributed monitoring agent solution to replace the deprecated C++ Dispatcher + Station architecture. The goal was to transform centralized task dispatch into globally distributed scheduling while unifying the technology stack to Java.',
        contributions: ['Independently led the complete lifecycle from requirements analysis, architecture design to project setup, code review, testing, and deployment','Built high-availability distributed task scheduling with Redis + Zookeeper + Spring Quartz, with geographic-aware optimal test agent allocation','Rewrote unmaintained C++ services to Java, unifying the tech stack with 3x throughput improvement'],
        architecture: [
          { title: 'Distributed Scheduler', desc: 'High-availability architecture built with Redis + Zookeeper + Spring Quartz. Redis stores agent status and geographic index, Zookeeper handles leader election and coordination, Quartz drives scheduled task distribution.', color: 'blue' },
          { title: 'Smart Routing & Load Balancing', desc: 'Comprehensive scoring based on agent geographic location, current load, and historical success rate for optimal test task allocation, ensuring balanced global test coverage.', color: 'purple' },
          { title: 'C++ → Java Migration', desc: 'Complete rewrite of legacy C++ Dispatcher and Station services to Java, unified technology stack, reduced maintenance costs. 3x throughput improvement after migration.', color: 'indigo' }
        ]
      },
      { id: 'e2e', title: 'E2E UI Monitoring — Cross-Platform UI Automation', role: 'Tech Lead', tech: ['Appium','Java','YAML','Docker','Grafana'],
        summary: 'Cross-platform real meeting experience simulation, covering 40+ global sites with 99.9%+ success rate',
        details: 'Deployed and running stably across 40+ global sites, executing thousands of end-to-end UI tests daily with 99.9%+ success rate. Successfully provided early warnings for production incidents (e.g., certificate expiration, network failures), significantly reducing manual regression costs. Each Linux Agent supports 16 concurrent Web tests, Windows multi-user execution for App/hybrid tests, maximizing resource utilization.',
        highlights: ['40+ global sites','99.9%+ success rate','16 concurrent/Agent','Multiple production incident early warnings'],
        background: 'Traditional monitoring approaches cannot simulate the complete user experience of initiating meetings, screen sharing, and audio/video verification. This platform automates validation of the Webex end-to-end meeting experience, proactively detecting regional failures and reducing manual testing costs.',
        contributions: ['Led technology selection and architecture design, built cross-platform UI monitoring solution based on Appium, designed YAML templates to unify App and Web test interfaces','Designed dynamic Agent allocation strategy, intelligently dispatching to corresponding OS Runners based on test type (Web/App/Hybrid), maximizing hardware utilization','Integrated XFreeRDP, Xvfb, FFmpeg for screen recording and failure screenshot capabilities; built in-house Resource Manager for unified test account, Runner, and artifact management','Promoted GitOps operations with test templates, endpoint configs, and alert rules managed in GitHub; drove AI Ops platform integration with an auxiliary Agent'],
        architecture: [
          { title: 'Cross-Platform Test Engine', desc: 'Unified test solution built on Appium, YAML template-driven — same template supports both App and Web testing, eliminating platform differences.', color: 'blue' },
          { title: 'Resource Manager', desc: 'In-house test resource management system, unified management of Agents, test accounts, and asset files, integrated with Grafana for resource visualization, supporting GitOps configuration management.', color: 'indigo' },
          { title: 'Dynamic Agent Allocation', desc: 'Linux Agent 4v8G supports 16 concurrent Web tests, Windows Agent multi-user execution for App/hybrid tests, automatic allocation by test type, maximizing hardware utilization.', color: 'purple' },
          { title: 'GitOps & AI Ops', desc: 'Users define YAML test cases, endpoint parameters, and alert rules in a single Git repository as the Single Source of Truth; AI Ops platform provides an auxiliary Agent for case creation, accelerating test definition.', color: 'amber' }
        ]
      }
    ],

    skills: {
      categories: [{ name:'AI / LLM',level:85 },{ name:'Java / JVM',level:92 },{ name:'Spring Boot',level:90 },{ name:'Database / SQL',level:85 },{ name:'System Design',level:90 },{ name:'DevOps',level:82 }],
      details: [{ name:'LLM / AI Agent',level:90 },{ name:'Python',level:82 },{ name:'Java',level:95 },{ name:'Spring Boot / Cloud',level:90 },{ name:'PostgreSQL / MySQL',level:85 },{ name:'Redis / Kafka',level:85 },{ name:'Docker / K8s',level:82 },{ name:'Microservice Architecture',level:90 }]
    },

    innovations: {
      eap: [
        { color:'blue', title:'Standard Protocol Abstraction, Pluggable Runtime', desc:'Gateway unifies the control plane with AG-UI / MCP / A2A standard protocols. Runtimes connect via protocol rather than hardcoded binding, enabling flexible engine replacement without vendor lock-in on OpenCode.' },
        { color:'purple', title:'Declarative GitOps Integration, Multi-level Validation', desc:'Registry YAML declaratively defines project permissions and MCP Servers. Project Repo hosts Agent/Skill configuration. Admin review + CI auto-validation ensures stable integration.' },
        { color:'indigo', title:'Multi-layered Security Guardrails', desc:'Project/Tenant isolation → Conversation Ownership → RBAC → OpenCode Permission Gate (allow/ask/deny) → MCP Proxy key isolation. Runtime security is enforced by layered defense, not single-point protection.' },
        { color:'rose', title:'Enterprise Patch System, Loosely Coupled Extension', desc:'No fork of OpenCode. Extend with patches for PostgreSQL persistence, Tool Output isolation, Workspace boundary enforcement, and environment variable sandboxing. Only patch compatibility needs maintenance when upgrading OpenCode — zero core code intrusion.' }
      ],
      ga: [
        { color:'blue', title:'Distributed Scheduling Engine', desc:'High-availability architecture built with Redis + Zookeeper + Spring Quartz. Redis stores agent status and geographic index, Zookeeper handles leader election and coordination, Quartz drives scheduled task distribution.' },
        { color:'purple', title:'Smart Routing & Load Balancing', desc:'Comprehensive scoring based on geographic location, current load, and historical success rate for optimal test task allocation, ensuring balanced global test coverage.' },
        { color:'indigo', title:'Abstraction Layer Design', desc:'Defined task distribution interface and Plugin execution abstraction layer, hiding underlying differences between Standard and Slim Collector runtime modes. Same scheduling logic seamlessly switches deployment modes.' },
        { color:'rose', title:'Clever Use of Redis', list:['Agent registration and health status','Distributed lock and leader election, removing ZK dependency','Task distribution queue (List / Stream)','Meta data cache, Status data cache'] }
      ]
    },

    terminal: {
      whoami_out: 'rocky_chi / Rocky Chi',
      roles_out: 'Java Architect · AI Engineer · Tech Lead',
      specialty_out: '"AI Agent · Distributed Systems · Observability"',
      exp_out: 'Cisco 9y · 150K+ endpoints · 20+ AI Agents',
      edu_out: 'ECUST · Information & Computing Science · 211'
    },

    bio: {
      subtitle: 'Java Architect · AI Engineer',
      location: '"Hangzhou / Shanghai"', experience: '"12+ years"', focus: '"AI Agent · AIOps"'
    }
  }
};

function getData() { return DATA[I18N.getLang()]; }
