// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],

  // GitHub Pages SSG 部署配置
  ssr: false,
  nitro: {
    preset: 'static',
  },
  app: {
    // 仅在 GitHub Actions 构建时使用子路径，本地开发保持根路径
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    buildAssetsDir: '/_nuxt/',
    head: {
      title: '图像压缩工具 - IPlay',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: '减小文件体积，更快地分享图像，且不损失画质。所有处理在本地完成，图片不上传。' },
        { name: 'theme-color', content: '#0f172a' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }
      ]
    }
  }
})