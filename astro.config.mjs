// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    server: {
      // 允许 CloudStudio 预览域名的 host 校验（开发环境用）
      // .cloudstudio.work 通配所有 CloudStudio 端口代理域名
      allowedHosts: ['.cloudstudio.work'],
    },
  },
});
