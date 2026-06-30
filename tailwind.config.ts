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
        // Arabic prayer text — 96px for classroom TV viewing; Cairo has ~65% optical efficiency
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
        surface: '#0a0a0a',
        panel: '#161616',
        overlay: '#1e1e1e',
        border: '#2a2a2a',
        accent: {
          DEFAULT: '#22c55e',
          hover: '#16a34a',
          dim: '#14532d',
        },
        text: {
          primary: '#f5f5f5',
          secondary: '#a3a3a3',
          muted: '#525252',
          inverse: '#0a0a0a',
        },
        focus: {
          ring: '#22c55e',
          shadow: '#166534',
        },
      },
      borderRadius: {
        'tv-sm': '0.5rem',
        tv: '1rem',
        'tv-lg': '1.5rem',
        'tv-xl': '2rem',
      },
      boxShadow: {
        'tv-focus': '0 0 0 4px #22c55e, 0 0 0 8px rgba(22, 101, 52, 0.4)',
        'tv-card': '0 4px 24px rgba(0, 0, 0, 0.5)',
        'tv-panel': '0 2px 12px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}

export default config
