import type { Dictionary } from '@/types/dictionary'

export interface NavLink {
  href: string
  label: string
  /** Matched against the pathname to mark the active route. */
  segment: string | null
}

/** Builds the locale-prefixed primary navigation, in reading order. */
export function getNavLinks(dict: Dictionary['nav'], locale: string): NavLink[] {
  return [
    { href: `/${locale}/projects`, label: dict.work, segment: 'projects' },
    { href: `/${locale}/about`, label: dict.about, segment: 'about' },
    { href: `/${locale}#contact`, label: dict.contact, segment: null },
  ]
}

export function homeHref(locale: string): string {
  return `/${locale}`
}
