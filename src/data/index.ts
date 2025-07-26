import { Project, TechSkill, AITool, AIService, LearningMilestone, NavItem, Stat } from '@/types';

// Navigation Items
export const navItems: NavItem[] = [
  { id: 'home', label: '首页', icon: 'Home', href: '#home' },
  { id: 'portfolio', label: '项目作品', icon: 'Briefcase', href: '#portfolio' },
  { id: 'tech-stack', label: '技术栈', icon: 'Code2', href: '#tech-stack' },
  { id: 'ai-tools', label: 'AI工具', icon: 'Bot', href: '#ai-tools' },
  { id: 'ai-services', label: 'AI服务', icon: 'Settings', href: '#ai-services' },
  { id: 'learning', label: '学习历程', icon: 'GraduationCap', href: '#learning' },
];

// Hero Statistics
export const heroStats: Stat[] = [
  { label: '实战项目', value: '15+', icon: 'Briefcase', color: 'text-primary-blue' },
  { label: '技术工具', value: '20+', icon: 'Code2', color: 'text-primary-purple' },
  { label: '创业历程', value: '1年', icon: 'Clock', color: 'text-primary-cyan' },
  { label: '积极反馈', value: '极佳', icon: 'ThumbsUp', color: 'text-accent-success' },
];

// Projects Data
export const projects: Project[] = [
  {
    id: 'ai-hr',
    title: 'AI-HR 企业幸福赋能主题网站',
    description: '基于AI的日本中小企业员工幸福度标准化解决方案',
    image: '/ai-hr.png',
    tags: ['Next.js', 'OpenAI', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://ai-hr.lks0426.com/',
    githubUrl: 'https://github.com/lks0426/AI-HR2',
    category: 'ai'
  },
  {
    id: 'personal-website',
    title: '个人主页',
    description: '响应式的个人作品集网站，采用现代化设计和玻璃态效果，展示技术能力和项目经验。',
    image: '/personal.png',
    tags: ['Next.js', 'React', 'Framer Motion', 'Tailwind CSS'],
    liveUrl: 'https://lks0426.com/',
    category: 'web'
  },
  {
    id: 'ai-chat-bot',
    title: 'AI 聊天机器人',
    description: '集成多种AI模型的聊天机器人，支持上下文记忆、文档问答、代码生成等功能。',
    image: '/coming_soon.png',
    tags: ['React', 'Node.js', 'OpenAI', 'WebSocket'],
    category: 'ai'
  },
  {
    id: 'task-management',
    title: '任务管理系统',
    description: '功能完整的项目管理工具，支持团队协作、进度跟踪、时间统计等企业级功能。',
    image: '/coming_soon.png',
    tags: ['Vue.js', 'Express', 'MongoDB', 'Element UI'],
    category: 'web'
  },
  {
    id: 'data-visualization',
    title: '数据可视化平台',
    description: '交互式数据分析和可视化平台，支持多种图表类型和实时数据更新。',
    image: '/coming_soon.png',
    tags: ['D3.js', 'React', 'Python', 'Flask'],
    category: 'tool'
  },
  {
    id: 'ai-image-generator',
    title: 'AI 图片生成器',
    description: '基于Stable Diffusion的图片生成工具，提供友好的界面和丰富的参数控制。',
    image: '/coming_soon.png',
    tags: ['Python', 'FastAPI', 'React', 'Stable Diffusion'],
    category: 'ai'
  }
];

// Technology Skills
export const techSkills: TechSkill[] = [
  // Frontend
  { name: 'React', category: 'frontend', level: 95, icon: 'React', description: '5年开发经验，熟练掌握Hooks、Context等现代特性' },
  { name: 'Next.js', category: 'frontend', level: 90, icon: 'Next.js', description: '擅长SSR、SSG和API路由开发' },
  { name: 'TypeScript', category: 'frontend', level: 88, icon: 'TypeScript', description: '类型系统专家，提升代码质量和开发效率' },
  { name: 'Tailwind CSS', category: 'frontend', level: 92, icon: 'Tailwind CSS', description: '快速构建响应式和现代化界面' },
  { name: 'Vue.js', category: 'frontend', level: 85, icon: 'Vue.js', description: '熟悉组合式API和生态系统' },
  { name: 'Framer Motion', category: 'frontend', level: 80, icon: 'Framer Motion', description: '创建流畅的动画和交互效果' },
  
  // Backend
  { name: 'Node.js', category: 'backend', level: 88, icon: 'Node.js', description: '构建高性能的服务端应用' },
  { name: 'Python', category: 'backend', level: 85, icon: 'Python', description: 'Web开发、数据分析和AI集成' },
  { name: 'Express.js', category: 'backend', level: 82, icon: 'Express.js', description: 'RESTful API和中间件开发' },
  { name: 'MongoDB', category: 'backend', level: 78, icon: 'MongoDB', description: '文档数据库设计和优化' },
  { name: 'PostgreSQL', category: 'backend', level: 75, icon: 'PostgreSQL', description: '关系型数据库设计和查询优化' },
  { name: 'FastAPI', category: 'backend', level: 80, icon: 'FastAPI', description: '高性能Python API框架' },
  
  // AI Integration
  { name: 'OpenAI API', category: 'ai', level: 92, icon: 'OpenAI', description: 'GPT模型集成和提示工程专家' },
  { name: 'Claude API', category: 'ai', level: 88, icon: 'Claude', description: 'Anthropic Claude模型应用开发' },
  { name: 'LangChain', category: 'ai', level: 85, icon: 'LangChain', description: 'LLM应用框架和工具链' },
  { name: 'Ollama', category: 'ai', level: 80, icon: 'Ollama', description: '本地大模型部署和管理' },
  { name: 'RAG系统', category: 'ai', level: 83, icon: 'RAG', description: '检索增强生成系统设计' },
  { name: 'Vector DB', category: 'ai', level: 78, icon: 'VectorDB', description: '向量数据库和语义搜索' },
  
  // Cloud & DevOps
  { name: 'AWS', category: 'cloud', level: 82, icon: 'AWS', description: 'EC2、S3、CloudFront等服务应用' },
  { name: 'Docker', category: 'cloud', level: 85, icon: 'Docker', description: '容器化部署和微服务架构' },
  { name: 'GitHub Actions', category: 'cloud', level: 80, icon: 'GitHub', description: 'CI/CD流水线和自动化部署' },
  { name: 'Vercel', category: 'cloud', level: 88, icon: 'Vercel', description: '前端应用快速部署和优化' },
  { name: 'Nginx', category: 'cloud', level: 75, icon: 'Nginx', description: '反向代理和负载均衡配置' },
  { name: 'PM2', category: 'cloud', level: 78, icon: 'PM2', description: 'Node.js应用进程管理' }
];

// AI Tools
export const aiTools: AITool[] = [
  {
    id: 'n8n',
    name: 'n8n',
    description: '可视化工作流自动化平台，连接各种服务和API',
    icon: 'n8n',
    category: 'Automation',
    rating: 85,
    features: ['可视化编辑', 'API集成', '定时任务', '数据处理'],
    liveUrl: 'https://n8n.lks0426.com/'
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    description: 'Anthropic的AI编程助手，支持代码生成、调试和重构',
    icon: 'Claude Code',
    category: 'Development',
    rating: 95,
    features: ['代码生成', '智能调试', '重构建议', '技术栈支持']
  },
  {
    id: 'superclaude',
    name: 'SuperClaude',
    description: '增强版Claude助手，专为开发者优化的AI工具',
    icon: 'SuperClaude',
    category: 'Development',
    rating: 90,
    features: ['项目分析', '架构建议', '性能优化', '最佳实践']
  },
  {
    id: 'ollama',
    name: 'Ollama',
    description: '本地大语言模型运行平台，支持多种开源模型',
    icon: 'Ollama',
    category: 'AI Infrastructure',
    rating: 88,
    features: ['本地部署', '模型管理', 'API接口', '隐私保护']
  },
  {
    id: 'anythingllm',
    name: 'AnythingLLM',
    description: '私有知识库和文档管理系统，支持AI问答',
    icon: 'AnythingLLM',
    category: 'Knowledge Base',
    rating: 87,
    features: ['文档上传', '智能问答', '知识检索', '团队协作']
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: '基于AI的智能代码编辑器，提供上下文感知的编码体验',
    icon: 'Cursor',
    category: 'Development',
    rating: 92,
    features: ['AI补全', '代码解释', '重构助手', '项目理解']
  }
];

// AI Services
export const aiServices: AIService[] = [
  {
    id: 'ocr-service',
    name: 'OCR文字识别',
    description: '高精度的图片文字识别服务，支持多语言和复杂布局',
    icon: 'OCR文字识别',
    features: ['多语言识别', '表格提取', '手写识别', '批量处理'],
    pricing: '按次计费'
  },
  {
    id: 'code-generation',
    name: '代码生成服务',
    description: '基于需求描述自动生成高质量代码，支持多种编程语言',
    icon: '代码生成服务',
    features: ['多语言支持', '框架适配', '最佳实践', '单元测试'],
    pricing: '按项目计费'
  },
  {
    id: 'document-summary',
    name: '文档总结',
    description: '智能文档分析和摘要生成，快速提取关键信息',
    icon: '文档总结',
    features: ['多格式支持', '关键信息提取', '结构化输出', '多语言处理'],
    pricing: '订阅制'
  },
  {
    id: 'ai-translation',
    name: 'AI翻译服务',
    description: '专业级机器翻译，保持语境和专业术语准确性',
    icon: 'AI翻译服务',
    features: ['专业术语', '语境理解', '格式保持', '多语言对'],
    pricing: '按字数计费'
  },
  {
    id: 'chatbot-development',
    name: '智能客服开发',
    description: '定制化AI客服机器人开发，提升客户服务效率',
    icon: '智能客服开发',
    features: ['自然对话', '知识库集成', '多渠道支持', '数据分析'],
    pricing: '定制开发'
  },
  {
    id: 'data-analysis',
    name: '数据分析服务',
    description: 'AI驱动的数据分析和可视化，发现业务洞察',
    icon: '数据分析服务',
    features: ['趋势分析', '预测建模', '可视化图表', '报告生成'],
    pricing: '项目制'
  }
];

// Learning Journey
export const learningMilestones: LearningMilestone[] = [
  {
    id: '1',
    date: '2013–2017',
    title: '大连外国语大学：计算机基础打底',
    description: '在大连外国语大学主修软件技术方向，系统学习 Java、Web 前端、数据库、数据结构与算法、网络基础等课程，为日后技术成长打下坚实基础。',
    technologies: ['Java', 'HTML/CSS/JS', 'MySQL', '数据结构', '计算机基础'],
    type: 'learning'
  },
  {
    id: '2',
    date: '2017–2023',
    title: '企业级项目实战积累',
    description: '深度参与10+个SaaS类企业系统项目，涵盖人事、ERP、教育、电商等行业。主导多个核心模块的开发，熟练掌握 Java Web、主流框架、数据库及团队协作经验。',
    technologies: ['Java EE', 'Spring Boot', 'MyBatis', 'JSP', 'jQuery', 'Oracle'],
    type: 'project'
  },
  {
    id: '3',
    date: '2024-07～Now',
    title: '全栈架构系统精进',
    description: '重构个人项目架构，采用前后端分离和微服务理念，提升系统扩展性与可维护性。掌握 Git、CI/CD、模块化开发等现代开发模式。',
    technologies: ['React', 'Next.js', 'Microservices', 'CI/CD', 'Git', 'Tailwind'],
    type: 'learning'
  },
  {
    id: '4',
    date: '2024-08～Now',
    title: 'AI 技术体系与项目实践',
    description: '学习并应用 LangChain、RAG、OpenAI API、Ollama 等技术，构建多个 AI 项目如：简历解析助手、邮件 Copilot、AI 内容生成器等，逐步形成工程化能力。',
    technologies: ['LangChain', 'OpenAI', 'Embedding', 'RAG', 'Ollama', 'Agent'],
    type: 'project'
  },
  {
    id: '5',
    date: '2024-08～Now',
    title: '云平台与部署技术实战',
    description: '掌握 AWS 和 GCP 的云产品与部署流程，能独立使用 Fargate、Cloud Run、Amplify、Lambda 等服务完成全栈项目的部署与上线。',
    technologies: ['AWS', 'Fargate', 'GCP', 'Cloud Run', 'Amplify', 'Lambda', 'S3', 'API Gateway'],
    type: 'achievement'
  },
  {
    id: '6',
    date: '2024-08～Now',
    title: 'Docker 与本地服务管理',
    description: '深入学习 Docker 基础、镜像构建、Compose、网络配置等内容，完成本地 AI 模型部署、n8n 服务搭建、多服务协同测试等开发支撑。',
    technologies: ['Docker', 'Docker Compose', 'n8n', '本地 LLM', '服务编排'],
    type: 'learning'
  },
  {
    id: '7',
    date: '2024-09～Now',
    title: '自动化工具与开发提效',
    description: '掌握 n8n、Make、Zapier 等自动化平台，结合 Google API 与 Vector Store，实现智能工作流系统（如：邮件统计、访客追踪、表单处理等）。',
    technologies: ['n8n', 'Make', 'Google Apps Script', '向量匹配', '自动化工作流'],
    type: 'project'
  },
  {
    id: '8',
    date: '2024-09～Now',
    title: 'Python 与 AI 后端实践',
    description: '系统学习 Python 编程、数据处理与 FastAPI 开发，构建 AI 后端服务并集成 OpenAI、Claude 等 API，实现 Prompt 优化与自动问答系统。',
    technologies: ['Python', 'FastAPI', 'Pandas', 'Prompt Engineering', 'OpenAI API'],
    type: 'learning'
  }
];