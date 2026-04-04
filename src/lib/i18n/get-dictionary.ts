import type { Dictionary } from '@/types/dictionary'
import type { Locale } from './config'
import { defaultLocale } from './config'

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./locales/en.json').then((m) => m.default as Dictionary),
  'pt-BR': () => import('./locales/pt-BR.json').then((m) => m.default as Dictionary),
  es: () => import('./locales/es.json').then((m) => m.default as Dictionary),
}

export async function getDictionary(locale: string): Promise<Dictionary> {
  const loader = dictionaries[locale as Locale] ?? dictionaries[defaultLocale]
  return loader()
}
