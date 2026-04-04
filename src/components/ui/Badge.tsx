import { clsx } from 'clsx'

interface BadgeProps {
  label: string
  variant?: 'default' | 'primary'
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-block rounded-full px-3 py-1 text-sm font-medium',
        variant === 'default' &&
          'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
        variant === 'primary' &&
          'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300',
      )}
    >
      {label}
    </span>
  )
}
