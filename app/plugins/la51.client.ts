/**
 * 51LA 网站统计 V6 客户端接入
 *
 * 官方控制台给出的原始代码（本文件是它的等价实现，改为动态注入以便按环境开关）：
 *   <script charset="UTF-8" id="LA_COLLECT" src="//sdk.51.la/js-sdk-pro.min.js"></script>
 *   <script>LA.init({ id: 'xxx', ck: 'xxx', autoTrack: true, hashMode: true })</script>
 *
 * 说明：
 * - 站点 ID / ck 默认写在 nuxt.config.ts 的 runtimeConfig.public.la51 中，可用环境变量覆盖。
 * - 当前只做网页流量统计（PV/UV、访客来源、地域等），autoTrack 关闭。
 *   后续要做事件埋点时，把 autoTrack 改为 true，SDK 才会注入 js-sdk-event.min.js 并提供 LA.track；
 *   若为 false，LA.track 会退化成只打印 console.warn 的占位函数。
 * - 统计脚本不参与首屏关键路径，等 window load 后再注入。
 */

interface La51Sdk {
  init: (config: Record<string, unknown>) => void
  /** autoTrack 为 true 时由事件 SDK 提供；为 false 时是 console.warn 占位函数 */
  track?: (eventName: string, attributes?: Record<string, string | number | boolean>) => void
}

declare global {
  interface Window {
    LA?: La51Sdk
  }
}

const SDK_SRC = '//sdk.51.la/js-sdk-pro.min.js'
const SCRIPT_ID = 'LA_COLLECT'

/** 兼容环境变量传入的字符串布尔值（如 'false' 需要判定为 false） */
function toBool(value: unknown, fallback: boolean): boolean {
  if (value === undefined || value === null || value === '') return fallback
  if (typeof value === 'boolean') return value
  return !['false', '0', 'no', 'off'].includes(String(value).trim().toLowerCase())
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public.la51
  const id = String(config.id ?? '').trim()

  // 未配置站点 ID（例如 CI 构建时置空）则整体不加载
  if (!id) return

  // 本地开发默认不上报，避免污染线上数据；需要联调时设置 NUXT_PUBLIC_LA51_DEBUG=true
  if (import.meta.dev && !toBool(config.debug, false)) return

  function inject() {
    // 幂等：HMR 或重复执行时避免二次注入
    if (document.getElementById(SCRIPT_ID) || window.LA) return

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = SDK_SRC
    script.async = true
    script.setAttribute('charset', 'UTF-8')
    script.onload = () => {
      window.LA?.init({
        id,
        ck: String(config.ck ?? '').trim() || id,
        autoTrack: toBool(config.autoTrack, true),
        hashMode: toBool(config.hashMode, true)
      })
    }
    document.head.appendChild(script)
  }

  if (document.readyState === 'complete') {
    inject()
  } else {
    window.addEventListener('load', inject, { once: true })
  }
})
