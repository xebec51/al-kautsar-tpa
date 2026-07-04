import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Noto Naskh Arabic', 'Amiri', 'Traditional Arabic', 'Arabic', 'serif'],
      },
      fontSize: {
        'tv-xs': ['1.25rem', { lineHeight: '1.75rem' }],
        'tv-sm': ['1.5rem', { lineHeight: '2rem' }],
        'tv-base': ['2rem', { lineHeight: '2.75rem' }],
        'tv-lg': ['2.5rem', { lineHeight: '3.25rem' }],
        'tv-xl': ['3rem', { lineHeight: '3.75rem' }],
        'tv-2xl': ['4rem', { lineHeight: '4.75rem' }],
        'tv-3xl': ['5rem', { lineHeight: '5.75rem' }],
        'tv-arabic': ['6rem', { lineHeight: '1.6' }],
      },
      spacing: {
        'tv-1': '0.5rem',
        'tv-2': '1rem',
        'tv-3': '1.5rem',
        'tv-4': '2rem',
        'tv-6': '3rem',
        'tv-8': '4rem',
        'tv-12': '6rem',
        'tv-16': '8rem',
      },
      colors: {
        surface: 'var(--color-surface)',
        panel: 'var(--color-panel)',
        overlay: 'var(--color-overlay)',
        border: 'var(--color-border)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          dim: 'var(--color-accent-dim)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
        },
        focus: {
          ring: 'var(--color-focus-ring)',
          shadow: 'var(--color-focus-shadow)',
        },
      },
      borderRadius: {
        'tv-sm': '0.5rem',
        tv: '1rem',
        'tv-lg': '1.5rem',
        'tv-xl': '2rem',
      },
      boxShadow: {
        'tv-focus': '0 0 0 4px var(--color-focus-ring), 0 0 0 8px var(--color-focus-shadow)',
        'tv-card': '0 4px 24px rgba(0, 0, 0, 0.3)',
        'tv-panel': '0 2px 12px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}

export default config
