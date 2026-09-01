import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BootSequence } from '@/features/boot/components/boot-sequence'
import { TransitionProvider } from '@/features/transition/components/transition-provider'
import { TypeStageProvider } from '@/features/canvas/components/type-stage'
import { TypeStageLayer } from '@/features/canvas/components/type-stage-layer'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { getProfile } from '@/lib/get-profile'
import { getNavLinks } from '@/lib/nav-links'
import { locales } from '@/lib/i18n/config'
import { toHeadlineLines } from '@/lib/headline'
import type { Metadata } from 'next'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const dict = await getDictionary(params.locale)

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: 'profile',
    },
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const [dict, profile] = await Promise.all([
    getDictionary(params.locale),
    getProfile(params.locale),
  ])

  return (
    <TypeStageProvider initialLines={toHeadlineLines(profile.basics.name)}>
      <TransitionProvider>
        <div className="grain">
          <BootSequence
            dict={dict.boot}
            locale={params.locale}
            projectCount={profile.projects.length}
          />

          <TypeStageLayer />

          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[4px] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-fg"
          >
            {dict.nav.skip_to_content}
          </a>

          <Header
            dict={dict.nav}
            links={getNavLinks(dict.nav, params.locale)}
            locale={params.locale}
            place={profile.basics.location.split(',')[0]}
          />

          <main id="main" className="relative z-10">
            {children}
          </main>

          <Footer dict={dict.footer} name={profile.basics.name} year="2026" />
        </div>
      </TransitionProvider>
    </TypeStageProvider>
  )
}
