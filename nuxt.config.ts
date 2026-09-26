// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/mcp-toolkit', 'nuxt-mcp-dev'],

  // MCP 配置：@nuxtjs/mcp-toolkit 与 nuxt-mcp-dev 共用 configKey 'mcp'，字段互不冲突
  mcp: {
    // @nuxtjs/mcp-toolkit（为应用暴露 MCP Server）
    name: 'IPlay-Compression MCP',
    route: '/mcp',
    dir: 'mcp',
    // nuxt-mcp-dev（开发期辅助理解项目结构，关闭自动写配置，由本仓库手动维护 .vscode/mcp.json）
    updateConfig: false,
    includeNuxtDocsMcp: true,
  },
  css: ['~/assets/css/main.css'],

  app: {
    // 仅在 GitHub Actions 构建时使用子路径，本地开发保持根路径
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      title: '在线图像压缩工具 - IPlay',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        {
          name: 'description',
          content: 'IPlay 在线图像压缩工具：在浏览器本地压缩 JPG / PNG / WebP 图片，减小文件体积、不损失画质，图片不上传。'
        },
        { name: 'keywords', content: '图像压缩, 图片压缩, 在线压缩, JPG压缩, PNG压缩, WebP压缩, IPlay' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'Geekmister' },
        { name: 'theme-color', content: '#0f172a' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'IPlay 图像压缩' },
        { property: 'og:title', content: '在线图像压缩工具 - IPlay' },
        {
          property: 'og:description',
          content: '在浏览器本地压缩 JPG / PNG / WebP 图片，减小文件体积、不损失画质，图片不上传。'
        },
        { property: 'og:locale', content: 'zh_CN' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: '在线图像压缩工具 - IPlay' },
        {
          name: 'twitter:description',
          content: '在浏览器本地压缩 JPG / PNG / WebP 图片，减小文件体积、不损失画质，图片不上传。'
        }
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }
      ]
    }
  }
})