'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import { Icon } from '@/components/ui/icon'
import { locales, type Locale } from '@/lib/i18n/config'

const SHORT_LABELS: Record<Locale, string> = { 'pt-BR': 'PT', en: 'EN', es: 'ES' }
const FULL_LABELS: Record<Locale, string> = {
  'pt-BR': 'Português',
  en: 'English',
  es: 'Español',
}

interface LanguageSwitcherProps {
  locale: string
  label: string
}

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const handleSelect = (next: Locale) => {
    setOpen(false)
    router.push(pathname.replace(`/${locale}`, `/${next}`))
  }

  return (
    <div className="relative" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
    }}>
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex h-9 items-center gap-1.5 rounded-[4px] border border-line px-2.5 font-mono text-xs text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
      >
        {SHORT_LABELS[locale as Locale] ?? locale.toUpperCase()}
        <Icon name="chevron-down" className={clsx('h-3 w-3 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1.5 min-w-[136px] overflow-hidden rounded-[4px] border border-line bg-surface shadow-lg shadow-black/5"
        >
          {locales.map((option) => (
            <li key={option} role="option" aria-selected={option === locale}>
              <button
                type="button"
                onClick={() => handleSelect(option)}
                className={clsx(
                  'w-full px-3 py-2 text-left text-sm transition-colors hover:bg-surface-2',
                  option === locale ? 'font-medium text-accent' : 'text-fg-muted',
                )}
              >
                {FULL_LABELS[option]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
