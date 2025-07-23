# AI Showcase - LKS Personal Portfolio

一个现代化的AI技术专家个人作品集网站，采用Next.js 15和玻璃态设计风格。

## 🌟 特性

- **现代设计**: 玻璃态效果和渐变色彩系统
- **响应式布局**: 支持桌面端、平板和移动端
- **静态生成**: 优化的性能和SEO
- **中英文支持**: 专为中文用户优化的字体和排版
- **动画效果**: 流畅的Framer Motion动画
- **AI主题**: 专注展示AI开发能力和项目

## 🛠️ 技术栈

- **框架**: Next.js 15 + React 18
- **类型检查**: TypeScript
- **样式**: Tailwind CSS + 自定义设计系统
- **动画**: Framer Motion
- **图标**: Lucide React
- **部署**: 静态导出，支持任何静态托管平台

## 🏗️ 项目结构

```
src/
├── app/              # Next.js App Router
├── components/       # 组件
│   ├── ui/          # 基础UI组件
│   ├── layout/      # 布局组件
│   └── modules/     # 页面模块
├── data/            # 静态数据
├── types/           # TypeScript类型定义
└── lib/             # 工具函数
```

## 📱 页面模块

1. **首页 (Hero)**: 个人介绍和核心能力展示
2. **项目作品集 (Portfolio)**: 项目展示和分类筛选
3. **技术栈 (TechStack)**: 技能评级和详细说明
4. **AI工具 (AITools)**: 常用AI开发工具介绍
5. **AI服务 (AIServices)**: 提供的AI服务展示
6. **学习历程 (Learning Journey)**: 技术成长轨迹

## 🚀 快速开始

### 安装依赖

\`\`\`bash
npm install
\`\`\`

### 开发环境

\`\`\`bash
npm run dev
\`\`\`

在浏览器中打开 [http://localhost:3000](http://localhost:3000)

### 生产构建

\`\`\`bash
npm run build
\`\`\`

### 预览生产版本

\`\`\`bash
npm start
\`\`\`

## 🎨 设计系统

### 色彩系统
- **主色调**: 蓝紫渐变 (#667eea → #764ba2)
- **背景**: 深色玻璃态效果
- **文本**: 分层的灰度系统
- **强调色**: 蓝色、紫色、青色

### 字体系统
- **中文**: PingFang SC, Microsoft YaHei
- **英文**: Inter
- **代码**: JetBrains Mono

### 组件设计
- **玻璃态效果**: 毛玻璃背景和边框
- **响应式网格**: 自适应布局系统
- **流畅动画**: 基于Framer Motion的交互

## 📊 性能优化

- ✅ 静态生成 (SSG)
- ✅ 代码分割
- ✅ 图片优化
- ✅ 字体优化
- ✅ CSS压缩
- ✅ Tree Shaking

## 🌐 部署

项目配置了静态导出，可部署到：

- **Vercel**: 推荐，与Next.js完美集成
- **Netlify**: 支持持续部署
- **GitHub Pages**: 免费静态托管
- **AWS S3 + CloudFront**: 企业级部署

### Vercel部署

\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

### 静态文件部署

\`\`\`bash
npm run build
# 将 out 目录上传到静态托管服务
\`\`\`

## 🛠️ 自定义配置

### 个人信息
编辑 \`src/data/index.ts\` 文件：

- 导航菜单
- 项目列表
- 技能评级
- AI工具
- 服务介绍
- 学习历程

### 设计主题
编辑 \`tailwind.config.js\` 和 \`src/app/globals.css\`：

- 色彩系统
- 字体配置
- 间距规范
- 动画效果

## 📈 SEO优化

- ✅ 结构化数据
- ✅ Open Graph标签
- ✅ Twitter Cards
- ✅ 语义化HTML
- ✅ 移动端友好
- ✅ 快速加载

## 🔧 开发工具

- **ESLint**: 代码质量检查
- **TypeScript**: 类型安全
- **Prettier**: 代码格式化（推荐）
- **Git Hooks**: 提交前检查（推荐）

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交Issues和Pull Requests！

## 📞 联系方式

- **邮箱**: contact@lks0426.com
- **网站**: https://lks0426.com
- **GitHub**: https://github.com/lks0426

---

⭐ 如果这个项目对你有帮助，请给它一个star！