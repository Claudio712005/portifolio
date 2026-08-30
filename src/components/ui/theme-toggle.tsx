'use client'

import { useTheme } from 'next-themes'
import { Icon } from './icon'

interface ThemeToggleProps {
  label: string
}

/**
 * Switches between the Clean Light and Clean Dark palettes.
 * Both icons are rendered and swapped by CSS so it stays SSR-safe.
 */
export function ThemeToggle({ label }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      <Icon name="sun" className="hidden h-4 w-4 dark:block" />
      <Icon name="moon" className="block h-4 w-4 dark:hidden" />
    </button>
  )
}
