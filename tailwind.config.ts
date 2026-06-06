import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        brand: {
          bg: '#f8fafc',
          card: '#ffffff',
          text: '#0f172a',
          muted: '#475569',
          line: '#e2e8f0',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'PingFang SC', 'Noto Sans SC', 'Source Han Sans SC', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.02)',
        popup: '0 25px 50px -12px rgba(0,0,0,0.15)',
      },
      transitionTimingFunction: {
        gentle: 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
}
