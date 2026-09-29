/**
 * 51LA 网站统计 V6 —— 通用接入（SSR 渲染）
 *
 * 用 useHead 把官方统计代码渲染进「服务端 HTML 源码」，而不是在浏览器里动态注入。
 * 这样 51LA 后台的「代码安装状态」检测（抓取首页 HTML 源码、搜索统计代码字符串）才能识别到代码。
 *
 * 官方原始代码（本文件等价输出，src 已由协议相对 // 改为显式 https，避免 http 回退被拦截）：
 *   <script charset="UTF-8" id="LA_COLLECT" src="https://sdk.51.la/js-sdk-pro.min.js"></script>
 *   <script>LA.init({ id: 'xxx', ck: 'xxx' })</script>
 *
 * 说明：
 * - 站点 ID / ck 默认写在 nuxt.config.ts 的 runtimeConfig.public.la51 中，可用环境变量覆盖。
 * - autoTrack 默认 false（只做流量统计，不注入事件脚本）；后续要做事件埋点时改为 true 并先在后台开通「事件分析」。
 * - 脚本放在 bodyClose（</body> 前），不阻塞首屏渲染，同时保留官方同步代码的初始化顺序。
 * - 本地开发默认不上报（避免污染线上数据），联调时设 NUXT_PUBLIC_LA51_DEBUG=true。
 */

function toBool(value: unknown, fallback: boolean): boolean {
  if (value === undefined || value === null || value === '') return fallback
  if (typeof value === 'boolean') return value
  return !['false', '0', 'no', 'off'].includes(String(value).trim().toLowerCase())
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public.la51
  const id = String(config.id ?? '').trim()

  // 未配置站点 ID（例如 CI 构建时置空）则整体不输出
  if (!id) return

  // 本地开发默认不上报，需要联调时设置 NUXT_PUBLIC_LA51_DEBUG=true
  if (import.meta.dev && !toBool(config.debug, false)) return

  const ck = String(config.ck ?? '').trim() || id
  const autoTrack = toBool(config.autoTrack, false)
  const hashMode = toBool(config.hashMode, false)

  useHead({
    script: [
      {
        key: 'la51-sdk',
        id: 'LA_COLLECT',
        // 显式 https：协议相对 // 在非 HTTPS 页面会回退到 http，部分浏览器/环境会拦截导致 SDK 加载失败
        src: 'https://sdk.51.la/js-sdk-pro.min.js',
        tagPosition: 'bodyClose'
      },
      {
        key: 'la51-init',
        innerHTML: `LA.init({ id: "${id}", ck: "${ck}", autoTrack: ${autoTrack}, hashMode: ${hashMode} })`,
        tagPosition: 'bodyClose'
      }
    ]
  })
})
