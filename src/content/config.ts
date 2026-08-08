import { defineCollection, z } from 'astro:content';

// 作品集合 schema：每个项目一个 markdown 文件
// Astro 5 通用写法（content collections 经典 API，教程最多、最稳定）
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    // 项目标题（必填）
    title: z.string(),
    // 卡片上的一句话简介（可选）
    description: z.string().optional(),
    // 项目分类，如：APP / Web / 设计系统（可选）
    category: z.string().optional(),
    // 年份，如 2025（可选，用于排序）
    year: z.string().optional(),
    // 封面图：放在 public/ 下，写 /xxx.jpg 或 /projects/xxx.jpg（可选，缺省显示渐变占位）
    cover: z.string().optional(),
    // 项目标签（可选）
    tags: z.array(z.string()).optional(),
    // 在线链接（可选）
    link: z.string().url().optional(),
  }),
});

export const collections = { projects };
