import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { locales } from '@/lib/i18n/config'
import type { Locale } from '@/lib/i18n/config'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const dict = await getDictionary(params.locale)

  return (
    <>
      <Header dict={dict.nav} locale={params.locale as Locale} />
      <main className="pt-16">{children}</main>
      <Footer dict={dict.footer} />
    </>
  )
}
