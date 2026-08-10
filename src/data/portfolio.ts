// ============================================================
// 作品集数据：5 个项目的元数据 + 页面清单
// 真正的图片资源放在 public/portfolio/<slug>/ 下（cover.webp + p01..pNN.webp）
// 全部由 scripts/optimize-portfolio.py 从 pdf/ 原图生成
// ============================================================

export interface PortfolioPage {
  src: string;        // 相对于 public 的路径
  caption?: string;   // 可选：页脚说明（暂未启用，保留扩展位）
}

export interface PortfolioProject {
  slug: string;
  title: string;
  subtitle?: string;  // 副标题（如 "C端 App" / "B端 UI&UX 设计"）
  category: string;   // 与 ProjectCard.category 对齐
  year: string;
  description: string; // 卡片简介
  pagesDir: string;   // public/portfolio/<slug>/
  pages: PortfolioPage[];
}

export const portfolio: PortfolioProject[] = [
  {
    slug: 'smart-hospital',
    title: 'SMART HOSPITAL',
    subtitle: '掌上医院小程序 · C 端 App 改版',
    category: 'APP 设计',
    year: '2025',
    description:
      '面向门诊、住院场景的一站式就医小程序改版，涵盖信息架构重构、视觉规范、交互原型与高保真设计。',
    pagesDir: '/portfolio/smart-hospital/',
    pages: Array.from({ length: 15 }, (_, i) =>
      i === 0
        ? { src: '/portfolio/smart-hospital/cover.webp' }
        : { src: `/portfolio/smart-hospital/p${String(i).padStart(2, '0')}.webp` }
    ),
  },
  {
    slug: 'tianjin-public-security',
    title: '天津公安民生服务平台',
    subtitle: '政务移动端 · V1.0.70',
    category: '政务移动端',
    year: '2025',
    description:
      '天津公安民生服务平台政务移动端设计，整合户政、出入境、交警等高频民生服务，V1.0.70 完整 UI 方案。',
    pagesDir: '/portfolio/tianjin-public-security/',
    pages: Array.from({ length: 11 }, (_, i) =>
      i === 0
        ? { src: '/portfolio/tianjin-public-security/cover.webp' }
        : { src: `/portfolio/tianjin-public-security/p${String(i).padStart(2, '0')}.webp` }
    ),
  },
  {
    slug: 'info-publishing',
    title: 'Information Publishing System',
    subtitle: '信息发布系统 · B 端 UI&UX 设计',
    category: 'B 端后台',
    year: '2025',
    description:
      '面向零售连锁的信息发布管理系统，覆盖数据概览、终端管理、资源/任务/审批/用户全链路，搭建统一设计系统。',
    pagesDir: '/portfolio/info-publishing/',
    pages: Array.from({ length: 16 }, (_, i) =>
      i === 0
        ? { src: '/portfolio/info-publishing/cover.webp' }
        : { src: `/portfolio/info-publishing/p${String(i).padStart(2, '0')}.webp` }
    ),
  },
  {
    slug: 'finepak',
    title: 'Finepak',
    subtitle: '跨境电商 · DTC 品牌设计',
    category: 'Web 设计',
    year: '2026',
    description:
      'Finepak 是一个致力于服务欧美市场、主营环保纸杯的跨境电商品牌，从 0 到 1 完成的独立站品牌视觉与响应式设计。',
    pagesDir: '/portfolio/finepak/',
    pages: Array.from({ length: 9 }, (_, i) =>
      i === 0
        ? { src: '/portfolio/finepak/cover.webp' }
        : { src: `/portfolio/finepak/p${String(i).padStart(2, '0')}.webp` }
    ),
  },
  {
    slug: 'data-viz',
    title: '数据可视化项目合集',
    subtitle: '智慧校园 / 文旅 / 政务大屏',
    category: '数据可视化',
    year: '2025',
    description:
      '数据可视化方向合集：智慧校园综合管理服务平台、游省心·文旅共富等大屏可视化项目视觉设计。',
    pagesDir: '/portfolio/data-viz/',
    pages: Array.from({ length: 2 }, (_, i) =>
      i === 0
        ? { src: '/portfolio/data-viz/cover.webp' }
        : { src: '/portfolio/data-viz/p01.webp' }
    ),
  },
];