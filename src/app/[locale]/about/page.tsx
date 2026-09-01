import { PageStage } from '@/components/layout/page-stage'
import { Badge } from '@/components/ui/badge'
import { FocusIn } from '@/components/ui/focus-in'
import { SectionLabel } from '@/components/ui/section-label'
import { CareerBand } from '@/features/about/components/career-band'
import { Colophon } from '@/features/about/components/colophon'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { getProfile } from '@/lib/get-profile'
import { groupSkillsByCategory } from '@/lib/group-skills'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const dict = await getDictionary(params.locale)

  return { title: `${dict.nav.about} — ${dict.meta.title}`, description: dict.about.lead }
}

export default async function AboutPage({ params }: PageProps) {
  const [dict, profile] = await Promise.all([
    getDictionary(params.locale),
    getProfile(params.locale),
  ])

  const groups = groupSkillsByCategory(profile.skills)
  /* The person, not the professional: the home page carries the full name. */
  const firstName = profile.basics.name.split(' ')[0]

  return (
    <>
      <PageStage title={dict.about.title} lines={[firstName]} size="short">
        <p className="type-display max-w-4xl text-pretty text-d3 text-fg">{dict.about.title}</p>
      </PageStage>

      <div className="relative bg-bg">
        <div className="mx-auto max-w-shell px-5 pb-32 lg:px-8">
          <div className="grid gap-14 border-t border-line pt-20 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)] lg:gap-24">
            <div className="space-y-8">
              {dict.about.paragraphs.map((paragraph, index) => (
                <FocusIn key={paragraph.slice(0, 40)} index={index}>
                  <p className="text-pretty text-lg leading-loose text-fg-muted">{paragraph}</p>
                </FocusIn>
              ))}
            </div>

            <aside className="lg:sticky lg:top-28 lg:h-fit">
              <SectionLabel>{dict.about.facts_title}</SectionLabel>
              <dl className="mt-2">
                {dict.about.facts.map((fact) => (
                  <div key={fact.label} className="border-b border-line py-5">
                    <dt className="type-meta text-fg-subtle">{fact.label}</dt>
                    <dd className="mt-2 text-sm text-fg">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>

          <section className="mt-32">
            <SectionLabel index="01">{dict.about.experience_title}</SectionLabel>

            <div className="mt-12">
              {profile.experience.map((item, index) => (
                <FocusIn key={`${item.company}-${item.period}`}>
                  <CareerBand
                    experience={item}
                    dict={dict.about}
                    detailsId={`experience-details-${index}`}
                  />
                </FocusIn>
              ))}
            </div>
          </section>

          <section className="mt-28">
            <SectionLabel index="02">{dict.about.education_title}</SectionLabel>

            <ul className="mt-10">
              {profile.education.map((item) => (
                <li key={`${item.institution}-${item.degree}`}>
                  <FocusIn>
                    <div className="grid gap-3 border-t border-line py-7 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8">
                      <p className="type-meta text-fg-subtle">{item.period}</p>
                      <div>
                        <h3 className="text-base font-medium text-fg">{item.degree}</h3>
                        <p className="mt-1.5 text-sm text-fg-muted">{item.institution}</p>
                      </div>
                      <Badge label={item.status} variant="outline" />
                    </div>
                  </FocusIn>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-28">
            <SectionLabel index="03">{dict.about.skills_title}</SectionLabel>
            <div className="mt-10">
              <FocusIn>
                <Colophon dict={dict} groups={groups} />
              </FocusIn>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
