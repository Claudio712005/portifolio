import { clsx } from 'clsx'

interface BadgeProps {
  label: string
  variant?: 'default' | 'accent' | 'outline'
}

/**
 * Compact monospaced tag used for technology chips and status labels.
 *
 * @example <Badge label="Kotlin" /> · <Badge label="Featured" variant="accent" />
 */
export function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-[3px] border px-2 py-[3px] font-mono text-[11px] leading-4 tracking-tight',
        variant === 'default' && 'border-line bg-surface-2 text-fg-muted',
        variant === 'outline' && 'border-line-strong bg-transparent text-fg-muted',
        variant === 'accent' && 'border-accent/40 bg-accent-soft text-accent',
      )}
    >
      {label}
    </span>
  )
}
