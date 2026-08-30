import type { Config } from 'tailwindcss'

const withAlpha = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`

const config: Config = {
  darkMode: 'class',
  content: [
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        bg: withAlpha('--bg'),
        surface: withAlpha('--surface'),
        'surface-2': withAlpha('--surface-2'),
        line: withAlpha('--line'),
        'line-strong': withAlpha('--line-strong'),
        fg: withAlpha('--fg'),
        'fg-muted': withAlpha('--fg-muted'),
        'fg-subtle': withAlpha('--fg-subtle'),
        accent: {
          DEFAULT: withAlpha('--accent'),
          fg: withAlpha('--accent-fg'),
          soft: withAlpha('--accent-soft'),
        },
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      maxWidth: {
        shell: '76rem',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.82)' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
