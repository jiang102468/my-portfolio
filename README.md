# 我的作品集（Astro）

一个为 UI 设计师设计的个人作品集网站，基于 [Astro 5](https://astro.build) 构建。
Apple 官网式画廊风格（全宽明暗瓦片 + 单一蓝色强调色），支持自动深色模式，
无需任何前端框架，加载快、易维护。

## 🚀 快速开始

```bash
npm install        # 安装依赖
npm run dev        # 本地预览 http://localhost:4321
npm run build      # 构建生产版本到 dist/
npm run preview    # 本地预览构建结果
```

> 国内网络建议使用镜像：`npm install --registry=https://registry.npmmirror.com`

## 📁 项目结构

```
my-portfolio/
├── public/                      # 静态资源（项目封面图等放这里）
│   ├── portfolio/               # ★ 作品集图片（cover.webp + pNN.webp，按项目分目录）
│   ├── portfolio.pdf            # 完整作品集 PDF（下载入口）
│   └── projects/
├── scripts/
│   └── optimize-portfolio.py    # 把 pdf/ 原图转 WebP 压缩到 public/portfolio/
├── pdf/                         # 设计稿原图（PNG，不入库，本地素材）
├── src/
│   ├── site.config.ts           # ★ 站点内容配置（名字/邮箱/社交/文案，维护入口）
│   ├── data/
│   │   └── portfolio.ts         # ★ 作品集查看器数据（项目元数据 + 图片清单）
│   ├── components/
│   │   ├── Header.astro         # 顶部导航 + 汉堡菜单
│   │   ├── Hero.astro           # 首屏大标题
│   │   ├── Projects.astro       # 作品网格
│   │   ├── ProjectCard.astro    # 作品卡片
│   │   ├── About.astro          # 关于我（技能 + 经历）
│   │   ├── Contact.astro        # 联系方式（含 PDF 下载）
│   │   └── Footer.astro         # 页脚
│   ├── content/
│   │   ├── config.ts            # 作品数据格式定义（schema）
│   │   └── projects/            # ★ 项目内容（Markdown）
│   ├── layouts/
│   │   └── Layout.astro         # 页面骨架
│   ├── pages/
│   │   ├── index.astro          # 首页
│   │   ├── portfolio/           # ★ 作品集在线查看器（仿 PDF 翻页）
│   │   └── projects/            # 项目详情页（自动生成）
│   └── styles/
│       └── global.css           # 设计系统（Token / 组件库 / 断点）
├── DESIGN-SYSTEM.md             # ★ 设计规范文档
├── AGENTS.md                    # Agent 工作约定
└── package.json
```

## ✍️ 如何填充你的内容

### 1. 个人基本信息

所有站点文案集中在 **`src/site.config.ts`**，改这里即可，组件无需改动：

| 内容 | 配置段 |
| --- | --- |
| 名字 / 邮箱 / 所在地 / 方向 | `site` 顶部变量 |
| 首屏文案（头衔 / 描述 / CTA） | `site.hero` |
| 关于我（技能 / 经历 / 自我介绍） | `site.about` |
| 联系方式 / 社交链接 | `site.contact` |
| SEO 标题 / 描述 | `site.seo` |

### 2. 添加作品项目（核心）

每篇项目是一个 Markdown 文件，放在 `src/content/projects/` 下，
文件名即页面地址（如 `project-1.md` → `/projects/project-1/`）。

在文件顶部用 `---` 包裹的 frontmatter 填元数据：

```markdown
---
title: "项目名称"
description: "一句话简介（显示在卡片上）"
category: "APP 设计"
year: "2025"
tags: ["移动端", "设计系统"]
cover: "/projects/封面图.png"
---
```

- `cover`：封面图，把图片放到 `public/projects/` 目录，填 `/projects/文件名`。不填则显示渐变占位。
- 正文部分：用 Markdown 写项目详情（背景、职责、过程、成果）。

完整字段参考见 `src/content/config.ts`（含可选的 `link` 字段）。

### 3. 自定义配色

所有颜色、字体、圆角都在 `src/styles/global.css` 顶部的 CSS 变量里。
修改 `--accent`（强调色）即可一键换肤，支持自动深色模式。

详细 Token 表见 `DESIGN-SYSTEM.md`。

## 🛠 维护速查（非开发者友好）

| 需求 | 修改位置 |
| --- | --- |
| 改站名 / 邮箱 / 社交链接 / 技能 / 经历 / 首屏文案 | `src/site.config.ts` |
| 新增作品 | 复制 `src/content/projects/*.md`，改 frontmatter 和正文 |
| 更新作品集查看器的项目元数据 / 图片清单 | `src/data/portfolio.ts` |
| 更新作品集设计稿图片 | 替换 `pdf/` 原图后重跑 `scripts/optimize-portfolio.py`（转 WebP 到 `public/portfolio/`） |
| 换主色调 | `src/styles/global.css` 中 `--accent` 变量 |
| 改按钮 / 标签 / 小节标签样式 | `src/styles/global.css` 组件库段落 |
| 改深色模式配色 | `src/styles/global.css` `@media (prefers-color-scheme: dark)` 段落 |
| 响应式断点约定 | `src/styles/global.css` 顶部注释（640 / 768 / 1024 三档） |
| 本地验证 | `npm run dev` 预览；上线前 `npm run build`（含类型检查） |

## 🎨 设计系统速览

- **风格**：Apple «画廊» 节奏 —— 明暗瓦片交替 / 近隐形 UI / 大留白
- **配色**：白 + 羊皮纸 + 近黑瓦片 + 单一 Action Blue（`--accent: #0066cc`）
- **字体**：系统 SF Pro 字体栈（苹方 / 雅黑自适应）+ 17px 正文 / 12–21px 阶梯
- **Token**：颜色 / 圆角 / 阴影 / 字号全部收敛在 `src/styles/global.css` 顶部 `:root` 变量，深色模式自动覆盖
- **组件库**：`.btn` / `.tag` / `.eyebrow` / `.text-link` / `.tile-dark` 等全局类在 `global.css` 维护，组件复用不重复定义
- **响应式**：作品瓦片桌面左右分栏、移动端单列（断点：640 / 768 / 1024px）
- **无障碍**：语义化标签、`:focus-visible` 焦点环、`prefers-reduced-motion` 支持

完整规范（色彩 Token 表、字号阶梯、组件库、汉堡菜单规范、无障碍约定）见
[`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md)。
