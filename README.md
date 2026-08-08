# 我的作品集（Astro）

一个为 UI 设计师设计的作品集网站，基于 [Astro](https://astro.build) 构建。
现代极简风格，支持自动深色模式，无需任何前端框架，加载快、易维护。

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
├── public/                    # 静态资源（图片放这里）
│   └── projects/              # 项目封面图建议放这里
├── src/
│   ├── components/            # 页面组件
│   │   ├── Header.astro       # 顶部导航
│   │   ├── Hero.astro         # 首屏大标题
│   │   ├── Projects.astro     # 作品网格
│   │   ├── ProjectCard.astro  # 作品卡片
│   │   ├── About.astro        # 关于我（技能+经历）
│   │   ├── Contact.astro      # 联系方式
│   │   └── Footer.astro       # 页脚
│   ├── content/
│   │   ├── config.ts          # 作品数据格式定义
│   │   └── projects/          # ★ 项目内容（markdown）
│   ├── layouts/
│   │   └── Layout.astro       # 页面骨架
│   ├── pages/
│   │   ├── index.astro        # 首页
│   │   └── projects/          # 项目详情页（自动生成）
│   └── styles/
│       └── global.css         # 设计系统（颜色/字体/间距）
```

## ✍️ 如何填充你的内容

### 1. 个人基本信息

- 名字/头衔：改 `src/components/Header.astro` 顶部的 `siteName`
- 首屏文案：改 `src/components/Hero.astro`
- 关于我：改 `src/components/About.astro`（技能列表、经历时间线）
- 联系方式：改 `src/components/Contact.astro` 和 `src/components/Footer.astro`

### 2. 添加作品项目（核心）

每篇项目是一个 markdown 文件，放在 `src/content/projects/` 下，
文件名就是页面地址（如 `project-1.md` → `/projects/project-1/`）。

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

- `cover`：封面图，把图片放到 `public/projects/` 目录，填 `/projects/文件名`。**不填则显示渐变占位**
- 标题下的正文部分：用 Markdown 写项目详情（背景、职责、过程、成果）

复制现有的 `project-1.md` 改内容，或新建文件（记得 frontmatter 格式一致）。

### 3. 自定义配色

所有颜色、字体、圆角都在 `src/styles/global.css` 顶部的 CSS 变量里，
改 `--accent`（强调色）即可一键换肤，支持自动深色模式。

## 🎨 设计系统速览

- 风格：现代极简 / 编辑式排版 / 大留白
- 配色：暖白底 + 墨色文字 + 陶土橙强调色（`--accent: #c4552d`）
- 字体：系统字体栈（苹方/雅黑/Segoe UI 自适应）
- 响应式：桌面双列作品网格，移动端单列
- 无障碍：语义化标签、focus 状态、支持 `prefers-reduced-motion`
