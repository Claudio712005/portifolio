import { PageStage } from '@/components/layout/page-stage'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'
import { TimelineRail } from '@/components/ui/timeline-rail'
import { ExperienceEntry } from '@/features/about/components/experience-entry'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { getProfile } from '@/lib/get-profile'
import { groupSkillsByCategory } from '@/lib/group-skills'
import { toHeadlineLines } from '@/lib/headline'
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

  return (
    <>
      <PageStage title={dict.about.title} lines={toHeadlineLines(dict.nav.about)} size="short">
        <p className="type-display max-w-4xl border-t border-line pt-8 text-pretty text-d3 text-fg">
          {dict.about.title}
        </p>
      </PageStage>

      <div className="relative bg-bg">
        <div className="mx-auto max-w-shell px-5 pb-32 lg:px-8">
          <div className="grid gap-16 border-t border-line pt-20 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-20">
            <div className="space-y-7">
              {dict.about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-pretty text-lg leading-loose text-fg-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <aside>
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

          <section className="mt-28">
            <SectionLabel index="01">{dict.about.experience_title}</SectionLabel>

            <TimelineRail className="mt-14">
              {profile.experience.map((item, index) => (
                <Reveal key={`${item.company}-${item.period}`} index={index}>
                  <ExperienceEntry
                    experience={item}
                    dict={dict.about}
                    detailsId={`experience-details-${index}`}
                  />
                </Reveal>
              ))}
            </TimelineRail>
          </section>

          <section className="mt-28">
            <SectionLabel index="02">{dict.about.education_title}</SectionLabel>

            <ul className="mt-10">
              {profile.education.map((item, index) => (
                <li key={`${item.institution}-${item.degree}`}>
                  <Reveal index={index}>
                    <div className="grid gap-3 border-t border-line py-7 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8">
                      <p className="type-meta text-fg-subtle">{item.period}</p>
                      <div>
                        <h3 className="text-base font-medium text-fg">{item.degree}</h3>
                        <p className="mt-1.5 text-sm text-fg-muted">{item.institution}</p>
                      </div>
                      <Badge label={item.status} variant="outline" />
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-28">
            <SectionLabel index="03">{dict.about.skills_title}</SectionLabel>
            <p className="mt-8 max-w-2xl text-pretty text-lg text-fg-muted">
              {dict.about.skills_lead}
            </p>

            <dl className="mt-12">
              {groups.map((group, index) => (
                <Reveal key={group.category} index={index}>
                  <div className="grid grid-cols-1 items-baseline gap-2 border-t border-line py-7 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-10">
                    <dt className="flex items-baseline gap-3">
                      <span className="type-display text-2xl text-fg lg:text-3xl">
                        {dict.skills.categories[group.category] ?? group.category}
                      </span>
                      <span className="type-meta text-fg-subtle">
                        {String(group.skills.length).padStart(2, '0')}
                      </span>
                    </dt>
                    <dd className="font-mono text-sm leading-loose text-fg-muted">
                      {group.skills.map((skill, position) => (
                        <span key={skill.name}>
                          {position > 0 && <span className="text-line-strong">{'  ·  '}</span>}
                          {skill.name}
                        </span>
                      ))}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </>
  )
}
