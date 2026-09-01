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
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
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
        shell: '82rem',
      },
      fontSize: {
        /* Display steps. Clamped so the lockup holds from 360px to 2560px. */
        d1: ['clamp(3.5rem, 19vw, 11rem)', { lineHeight: '0.9' }],
        d2: ['clamp(2.5rem, 7.5vw, 6rem)', { lineHeight: '0.9' }],
        d3: ['clamp(1.85rem, 4vw, 3.25rem)', { lineHeight: '0.95' }],
      },
    },
  },
  plugins: [],
}

export default config
