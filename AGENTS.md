# AGENTS.md

本文件对在仓库内工作的 coding agent 提供项目约定。本仓库是一个基于
**Astro 5** 的个人作品集网站，面向"不太懂前端"的用户，代码的第一目标
是**好配置、好维护、低折腾**。

## 项目概览

- 框架：Astro 5，无前端框架，页面由 `src/pages/*.astro` + 组件构成
- 内容：作品集由 `src/content/projects/*.md` 驱动（首页列表 + 详情页自动生成）
- 配置入口：**`src/site.config.ts`** 是用户修改站点文案/邮箱/技能/经历/社交链接的主力文件；
  组件只负责展示，从该文件读取数据，不要再到组件里写散落的硬编码文案
- 样式：设计 token（颜色/圆角/动效）集中在 `src/styles/global.css` 顶部，
  深色模式在同文件 `@media (prefers-color-scheme: dark)` 中覆盖变量
- 设计规范：`DESIGN-SYSTEM.md` 是设计规范文档（token / 组件库 / 断点 / 无障碍），
  组件库全局类（`.btn` / `.tag` / `.eyebrow` 等）在 `global.css` 维护，组件内不要重复定义

## 必须遵守的约定

1. **不要改动 `npm` 依赖、`node engines`、`Astro` 版本**（用户明确限制）。
2. **不要在本机强制安装环境或跑 `npm` 构建**（用户环境受限）。
   改动完成后应给出用户侧的自查命令（`npm run dev` / `npm run build`），
   而不是自己反复跑构建。
3. **断点统一**：以 `src/styles/global.css` 顶部注释为唯一依据（640 / 768 / 1024），
   组件内媒体查询只使用这三档；调整断点请先改该注释，再同步组件。
4. **文案/数据优先进 `src/site.config.ts`**；新增展示内容时，先看配置里
   是否已有该字段，避免同一信息多处硬编码。
5. **作品内容**：新增项目复制 `src/content/projects/` 下现有 md，
   frontmatter 必须与 `src/content/config.ts` 的 schema 一致，
   封面图放 `public/` 下填绝对路径（如 `/projects/xxx.png`）。
6. **颜色与主题**：改色改 `global.css` 的 CSS 变量（如 `--accent`），
   不要在组件里写死色值。
7. **类型**：内容集合类型引用统一用 `CollectionEntry<'projects'>`。
8. **无障碍与响应式**：保留语义化标签（`nav`/`main`/`h1-6` 等）、
   `:focus-visible` 状态、`prefers-reduced-motion` 处理、移动端导航可用性。
9. **注释语言**：仓库现有代码用中文注释，新增/修改时保持一致。
10. **分支**：默认在 `develop` 分支工作，`master` 为已发布基线；
    不要擅自 commit / push / 切换分支，用户明确要求除外。

## 常见任务入口

- 改站名/邮箱/社交/技能/经历/首屏文案 → `src/site.config.ts`
- 新增/编辑作品 → `src/content/projects/*.md`
- 换主题色/全局排版/断点说明 → `src/styles/global.css`
- 改页面结构/组件 → `src/components/*.astro`
- 新增页面 → `src/pages/*.astro`

## 完成后自查清单

- 没有改到 `package.json` / `package-lock.json`
- 没有新增硬编码文案（除非是页面专属一次性内容）
- 媒体查询只用了 640 / 768 / 1024 三档
- README「维护速查」与当前结构保持一致


## 渲染验证约定（Render-Before-Trust）

agent 在沙箱内**只能读写代码文本，不能渲染页面**。因此「布局/几何/视觉对齐」
类的 bugs，只有靠**你在本地渲染后的像素**才能暴露 — 纯 diff 文字永远看不见。

### 生效规则

1. **改完 UI 后，必须在浏览器里确认渲染结果**。
   本地命令：`npm run dev` → 打开浏览器 → 切手机宽度 (375px) 预览。
2. **`git commit` 之前，截 1 张「能反映改动的屏幕截图」** 粘到对话框。
   - 静态问题 → 截图 1 张 (PNG)。
   - 动画/交互问题 → 录 1 个 2-3s 动图/GIF。
3. **布局问题必传图**：盒模型重叠、对齐偏移、hot-area 错位、字体层级混乱
   这类问题**纯读代码无法发现** — 例如汉堡菜单 3 根横线用 `grid` 放在一起
   会坍缩重叠，代码读起来像「居中」，但像素看起来就歪。
4. **提交规范**：在 commit message 里附上「截图验效说明」，例如
   ``fix(nav): hamburger bars overlap — verified 375px screenshot inline``。

### 原则

> **渲染后把像素交给 agent，就像交 diff 一样直接。**
> 不然 agent 就像拿放大镜摸钻石 — 只读形状看不见光。

遵守这一条，你在本机看见的每一个像素问题，我都能在 1 轮对话内定位并修复。
