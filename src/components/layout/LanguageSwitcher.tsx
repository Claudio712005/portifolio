'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { locales, type Locale } from '@/lib/i18n/config'

const shortLabels: Record<Locale, string> = {
  'pt-BR': 'PT',
  en: 'EN',
  es: 'ES',
}

const fullLabels: Record<Locale, string> = {
  'pt-BR': 'Português',
  en: 'English',
  es: 'Español',
}

interface LanguageSwitcherProps {
  locale: string
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const handleSelect = (next: Locale) => {
    setOpen(false)
    router.push(pathname.replace(`/${locale}`, `/${next}`))
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        aria-label="Select language"
        aria-expanded={open}
        className="flex items-center gap-1 rounded-md border border-slate-300 px-3 py-1 text-sm font-medium text-slate-600 transition-colors hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-600 dark:text-slate-400 dark:hover:border-indigo-500 dark:hover:text-white"
      >
        {shortLabels[locale as Locale] ?? locale.toUpperCase()}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={clsx('h-3 w-3 transition-transform', open && 'rotate-180')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute right-0 top-full z-50 mt-1 min-w-[120px] overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
          {locales.map((loc) => (
            <li key={loc}>
              <button
                onMouseDown={() => handleSelect(loc)}
                className={clsx(
                  'w-full px-4 py-2 text-left text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-700',
                  loc === locale
                    ? 'font-semibold text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-700 dark:text-slate-300',
                )}
              >
                {fullLabels[loc]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
