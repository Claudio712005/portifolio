import type { Profile } from '@/types/profile'
import type { Locale } from './i18n/config'
import { defaultLocale } from './i18n/config'

const profiles: Record<Locale, () => Promise<Profile>> = {
  'pt-BR': () => import('../../data/profile.pt-BR.json').then((m) => m.default as Profile),
  en: () => import('../../data/profile.en.json').then((m) => m.default as Profile),
  es: () => import('../../data/profile.es.json').then((m) => m.default as Profile),
}

export async function getProfile(locale: string): Promise<Profile> {
  const loader = profiles[locale as Locale] ?? profiles[defaultLocale]
  return loader()
}
