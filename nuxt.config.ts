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