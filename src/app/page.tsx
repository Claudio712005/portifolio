import { LocaleRedirect } from '@/components/layout/locale-redirect'
import { defaultLocale } from '@/lib/i18n/config'

export default function RootPage() {
  return <LocaleRedirect fallback={defaultLocale} />
}
