import type { Config } from 'tailwindcss'

// 视觉 Token 桥接层：将 Tailwind 类映射到 main.css 的 CSS 变量（单一事实来源）
// 真值定义见 app/assets/css/main.css 的 :root，规范见 docs/visual-token.md
export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        brand: {
          bg: 'var(--color-bg)',
          card: 'var(--color-surface)',
          text: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          line: 'var(--color-border)',
        },
        info: 'var(--color-info)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        vip: 'var(--color-vip)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'PingFang SC', 'Noto Sans SC', 'Source Han Sans SC', 'sans-serif'],
      },
      borderRadius: {
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-soft': 'var(--shadow-card-soft)',
        'card-hover': 'var(--shadow-card-hover)',
        'tool-active': 'var(--shadow-tool-active)',
        popup: 'var(--shadow-popup)',
        vip: 'var(--shadow-vip)',
      },
      transitionTimingFunction: {
        gentle: 'var(--ease-gentle)',
      },
    },
  },
}
