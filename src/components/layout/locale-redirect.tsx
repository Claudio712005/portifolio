'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n/config'

interface LocaleRedirectProps {
  fallback: Locale
}

function preferredLocale(fallback: Locale): Locale {
  if (typeof navigator === 'undefined') return fallback

  for (const candidate of navigator.languages ?? [navigator.language]) {
    const exact = locales.find((locale) => locale.toLowerCase() === candidate.toLowerCase())
    if (exact) return exact

    const base = candidate.split('-')[0]?.toLowerCase()
    const partial = locales.find((locale) => locale.split('-')[0].toLowerCase() === base)
    if (partial) return partial
  }

  return fallback
}

/**
 * Entry point for the site root. A static export has no server to redirect on,
 * so the choice is made in the browser — and the same links stay in the markup
 * for anyone arriving without scripts.
 */
export function LocaleRedirect({ fallback }: LocaleRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    router.replace(`/${preferredLocale(fallback)}`)
  }, [fallback, router])

  return (
    <div className="flex min-h-svh items-center justify-center px-5">
      <nav className="flex gap-5 font-mono text-sm text-fg-muted">
        {locales.map((locale) => (
          <a key={locale} href={`/portifolio/${locale}`} className="hover:text-accent">
            {locale}
          </a>
        ))}
      </nav>
    </div>
  )
}
