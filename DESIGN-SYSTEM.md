# 设计规范（Design System）

这份文档是本站点的**唯一设计依据**，风格参考 Apple 官网设计分析
（`DESIGN.md`）。所有颜色、字号、圆角、阴影、组件样式都以
`src/styles/global.css` 顶部的 CSS 变量为准，改样式只改这里，
组件里不要写死色值 / 圆角 / 字号。

## 设计原则

- **画廊节奏**：全宽明暗瓦片交替（白 / 羊皮纸 / 近黑），色块切换本身即分区，
  不依赖边框和装饰性渐变
- **近隐形 UI**：chrome 让位于内容，UI 上无阴影、无装饰边框、无渐变
- **单一强调色**：Action Blue（`--accent`）承担全部可交互元素，
  深色面上自动换成 Sky Link Blue（`--accent-on-dark`）
- **Apple 排版**：展示级标题 600 字重 + 紧字距（`-0.02em`），正文 17px，
  大字号正文 21px，注释 12–14px
- **自动深色模式**：跟随系统，变量在 `@media (prefers-color-scheme: dark)`
  中整体覆盖

## 色彩 Token

| 变量 | 亮色模式 | 深色模式 | 用途 |
| --- | --- | --- | --- |
| `--bg` | `#ffffff` | `#000000` | 页面背景（画布白 / 纯黑） |
| `--surface` | `#f5f5f7` | `#1d1d1f` | 羊皮纸：浅瓦片、页脚、毛玻璃导航 |
| `--surface-muted` | `#f0f0f2` | `#272729` | 珍珠白：标签底、占位 |
| `--text` | `#1d1d1f` | `#f5f5f7` | 主文字（墨色 ink） |
| `--text-secondary` | `#6e6e73` | `#a1a1a6` | 次级文字（白底 ≥4.5:1） |
| `--text-tertiary` | `#86868b` | `#86868b` | 弱文字：大号说明 / 禁用 |
| `--accent` | `#0066cc` | `#2997ff` | Action Blue：唯一交互色 |
| `--accent-strong` | `#0071e3` | `#0071e3` | Focus Blue：hover / 焦点 |
| `--accent-on-dark` | `#2997ff` | `#2997ff` | Sky Blue：深色面上的链接 |
| `--accent-soft` | `#e8f0fa` | `rgb(41 151 255 / .14)` | 强调色浅底（正文引用） |
| `--border` | `#e8e8ed` | `#424245` | 发丝线（浅背景） |
| `--border-inverse` | `rgb(255 255 255 / .16)` | `rgb(255 255 255 / .16)` | 深色面上的发丝线 |
| `--on-inverse` | `#f5f5f7` | `#f5f5f7` | 深色瓦片上的主文字 |
| `--on-inverse-muted` | `#a1a1a6` | `#a1a1a6` | 深色瓦片上的次级文字 |
| `--tile-dark` | `#1d1d1f` | `#1d1d1f` | 深瓦片 1 |
| `--tile-dark-2` | `#272729` | `#272729` | 深瓦片 2 |
| `--tile-void` | `#000000` | `#0a0a0b` | 纯黑瓦片（联系区） |

> **对比度说明**（WCAG 2.1 AA）：
> - 亮色 `--accent #0066cc` 对白底 5.6:1；`--text-secondary #6e6e73` 4.7:1
> - 深色 `--accent #2997ff` 对 `#1d1d1f` ≥ 7:1；`--text-secondary #a1a1a6` ≥ 7:1
> - 深色瓦片上的主按钮用 `--accent-strong #0071e3` 保证白字 ≥ 4.5:1
> - `--text-tertiary #86868b` 对白底约 4:1，仅用于大号说明 / 禁用态，
>   12px 小字一律用 `--text-secondary`

## 字号阶梯

| 变量 | 值 | 用途 |
| --- | --- | --- |
| `--text-xs` | `12px` | 标签、注释、导航、页脚链接 |
| `--text-sm` | `14px` | 说明性小字（胶囊、注脚、经历备注） |
| `--text-md` | `17px` | 正文 / `body` 默认字号 |
| `--text-lg` | `21px` | 标语（hero 描述、作品瓦片描述） |
| 分区标题 | `clamp(30–40px)` | 600 字重，`-0.02em` 紧字距 |
| Hero 标题 | `clamp(34–56px)` | 600 字重，`-0.02em`，行高 1.14 |

正文行高 1.6（中文阅读），展示级标题行高 1.1 左右；不要低于 1.47。
字重阶梯：300 / 400 / 600 / 700，**没有 500**，中间态一律用 600。

## 圆角 / 阴影 / 动效 Token

| 类别 | Token | 值 | 用途 |
| --- | --- | --- | --- |
| 圆角 | `--radius-sm` | `8px` | 小工具、行内元素 |
| 圆角 | `--radius-md` | `11px` | 珍珠钮、移动菜单项 |
| 圆角 | `--radius-lg` | `18px` | 作品海报、占位图、空状态 |
| 圆角 | `--radius-pill` | `999px` | 胶囊按钮 / 标签 / 胶囊 |
| 阴影 | `--shadow-product` | `0 4px 14px rgb(0 0 0 / .12)` | 仅作品视觉；UI chrome 不用阴影 |
| 动效 | `--ease` | `cubic-bezier(.4, 0, .2, 1)` | 全局统一缓动 |
| 动效 | `--dur` | `0.24s` | 交互动效 |
| 动效 | `--dur-slow` | `0.6s` | 海报图片缩放 |

> 圆角语法（Apple）：胶囊 / 18px 卡片 / 11px 珍珠钮 / 8px 小工具，
> 全宽瓦片本身不圆角。

## 组件库（全局类）

以下类在 `src/styles/global.css` 中全局维护，组件直接复用，**不要**在组件
`<style>` 里复制一份样式。

| 类 | 说明 |
| --- | --- |
| `.container` / `.section` | 页面容器与区块垂直留白 |
| `.section-head` + `.section-title` | 分区标题（编号标签 + 大标题） |
| `.eyebrow` | 小节标签：12px 灰、首屏头衔 / 分区编号 |
| `.tag` / `.tag-year` | 小标签（胶囊 14px；`tag-year` 为描边变体） |
| `.btn` / `.btn-primary` / `.btn-outline` | 按钮：蓝底白字 / 白底蓝字描边，胶囊形 |
| `.text-link` | 文本链接：Action Blue 常显，hover 下划线 |
| `.tile-dark` / `.tile-dark-2` / `.tile-light` / `.tile-void` | 明暗瓦片，内部自动切深色面语法 |
| `.fade-up` | 首屏淡入上移动画（`.fade-up-1..4` 控制延迟） |

## 明暗瓦片规范（作品区 / 联系区）

- 作品瓦片由 `Projects.astro` 按 `dark → light → dark-alt` 节奏循环；
  瓦片用负 margin 冲破容器实现全宽，内容仍随 `.container` 居中
- `tile-dark` / `tile-dark-2` / `tile-void` 会**本地覆盖** `--accent`（→ Sky
  Blue）、`--border`（→ 白 16% 发丝线）、`--text-secondary`、`--surface-muted`，
  组件无需写深色分支
- 深色瓦片上的主按钮自动改用 `--accent-strong`（白字对比度 ≥ 4.5:1）
- 海报占位图形用 `color-mix(currentColor 12%, transparent)`，随瓦片明暗自动适配
- 海报箭头为 44×44 玻璃圆钮（`rgb(210 210 215 / .64)` + `blur(20px)`），
  仅 hover / focus-within 显影，触屏设备（`hover: none`）常显

## 汉堡菜单规范（Header）

Apple 式无边框三条线，不依赖 logo 方标配对：

| 维度 | 规范 | 依据 |
| --- | --- | --- |
| 视觉尺寸 | 36×36，无边框无底色 | Apple 极简导航图标 |
| 线条 | 3 条 18×2px，胶囊圆角，间距 5px | 视觉轻量，焦点在内容 |
| 触控热区 | `::before { inset: -4px }` 扩到 44×44 | WCAG 2.2 AA 建议 ≥44px |
| 激活态 | 中线淡出，上下线 45° 旋转成 X | 常用汉堡转 X 动效 |
| 布局 | 绝对定位 3 条线（top 12 / 17 / 22px） | 位移精确不抖动 |
| 展开面板 | 毛玻璃（`--surface` + 发丝线）下拉 | Apple sub-nav 下拉语法 |
| 无障碍 | `aria-expanded` / `aria-controls`，Escape 关闭，点外部关闭 | 见"无障碍约定" |

## 响应式断点（唯一依据）

只允许这三档，改断点先改 `global.css` 顶部注释，再同步组件：

- **640px**：手机 — 汉堡菜单、Hero 规格栏单列、经历行上下堆叠
- **768px**：平板 — 作品瓦片内单列（文案上 / 海报下）
- **1024px**：屏幕较宽 / 平板横屏 — 关于区切换单列

## 无障碍约定

- 保留语义化标签（`nav` / `main` / `h1-6` 等），移动端菜单有 `aria-expanded`
- 所有可交互元素有统一 `:focus-visible` 焦点环（`--accent` 2px，深色面自动 Sky Blue）
- 支持 `prefers-reduced-motion`，关闭滚动平滑与动画
- 文字层级保证最小对比度：正文 ≥ 4.5:1，大号文字 ≥ 3:1
- 触控目标：导航链接 ≥ 40px、页脚文字链接 ≥ 32px、海报箭头 44×44、
  `back-link` / `back-top` ≥ 40px
- 作品海报箭头仅在 `:hover` / `:focus-within` 显影；`@media (hover: none)`
  时常显，避免隐藏可点击信号

## 修改入口速查

| 需要改什么 | 修改位置 |
| --- | --- |
| 颜色 / 字号 / 圆角 / 阴影 / 动效 | `src/styles/global.css` 顶部 `:root` 变量 |
| 按钮 / 标签 / 小节标签 / 瓦片样式 | `src/styles/global.css` 组件库段落 |
| 深色模式配色 | `src/styles/global.css` `@media (prefers-color-scheme: dark)` 段落 |
| 新增组件样式 | 优先复用上方全局类，组件内只写"自己的差异" |
