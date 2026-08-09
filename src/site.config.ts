// ============================================================
// 站点内容配置
// 修改文案 / 邮箱 / 社交链接 / 技能 / 经历 只需动这一个文件
// 组件只负责展示，从本文件读取数据。
// ============================================================

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroMeta {
  label: string;
  value: string;
  href?: string;
}

export interface TimelineItem {
  period: string;
  role: string;
  company: string;
  note: string;
}

// 基础信息（其它配置复用它）
const name = "杨晓文";
const email = "hello@example.com";
const location = "中国 · 深圳";
const direction = "UI / UX / 设计系统";

export const site: {
  name: string;
  email: string;
  location: string;
  direction: string;
  seo: { title: string; description: string };
  nav: { items: NavLink[]; cta: NavLink };
  hero: {
    eyebrow: string;
    intro: string;
    name: string;
    titlePrefix: string;
    highlight: string;
    description: string;
    primaryCta: NavLink;
    secondaryCta: NavLink;
    meta: HeroMeta[];
  };
  about: {
    lead: { greeting: string; emphasis: string; suffix: string };
    paragraphs: string[];
    skills: string[];
    timeline: TimelineItem[];
  };
  contact: {
    heading: string;
    subheading: string;
    email: string;
    ctaLabel: string;
    socials: NavLink[];
  };
} = {
  name,
  email,
  location,
  direction,

  seo: {
    title: "杨晓文 · UI 设计师作品集",
    description: "5 年经验的 UI 设计师作品集，专注于界面设计与用户体验。",
  },

  nav: {
    items: [
      { label: "作品", href: "#work" },
      { label: "关于", href: "#about" },
      { label: "联系", href: "#contact" },
    ],
    cta: { label: "找我聊聊", href: "#contact" },
  },

  hero: {
    eyebrow: "UI 设计师 · 5 年经验",
    intro: "你好，我是",
    name,
    titlePrefix: "我用设计",
    highlight: "解决问题",
    description:
      "专注于界面设计与用户体验，擅长将复杂的业务需求转化为简洁、优雅、可落地的产品设计。曾服务于 B 端、C 端与移动端产品。",
    primaryCta: { label: "查看作品", href: "#work" },
    secondaryCta: { label: "联系我", href: "#contact" },
    meta: [
      { label: "所在地", value: location },
      { label: "邮箱", value: email, href: `mailto:${email}` },
      { label: "方向", value: direction },
    ],
  },

  about: {
    lead: {
      greeting: `你好，我叫${name}，一名拥有 5 年经验的 UI 设计师。我相信好的设计是`,
      emphasis: "克制而精准",
      suffix: " 的——在理解用户与业务之后，用最简洁的形式呈现最清晰的体验。",
    },
    paragraphs: [
      "我热衷于设计系统与组件化思维，喜欢通过流程化、可复用的方式提升设计效率与产品一致性。工作之外，我也在持续探索 AI 辅助设计与新交互形态的可能性。",
    ],
    skills: [
      "界面设计 UI Design",
      "交互设计 UX Design",
      "设计系统 Design System",
      "产品思维",
      "Figma / Sketch",
      "原型与动效 Prototyping",
    ],
    timeline: [
      {
        period: "2023 — 至今",
        role: "高级 UI 设计师",
        company: "某某科技",
        note: "负责核心产品设计体系搭建与界面设计。",
      },
      {
        period: "2021 — 2023",
        role: "UI 设计师",
        company: "某某互联网公司",
        note: "参与 B 端中台与移动端产品设计。",
      },
      {
        period: "2020 — 2021",
        role: "初级设计师",
        company: "某某设计工作室",
        note: "从 0 到 1 接触完整设计流程。",
      },
    ],
  },

  contact: {
    heading: "有项目想法？",
    subheading: "让我们一起聊聊。",
    email,
    ctaLabel: "发送邮件 →",
    socials: [
      { label: "Email", href: `mailto:${email}` },
      { label: "Dribbble", href: "https://dribbble.com" },
      { label: "Behance", href: "https://behance.net" },
      { label: "GitHub", href: "https://github.com" },
    ],
  },
};
