import { PageStage } from '@/components/layout/page-stage'
import { Reveal } from '@/components/ui/reveal'
import { ProjectRow } from '@/features/work/components/project-row'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { getProfile } from '@/lib/get-profile'
import { toProjectEntries } from '@/lib/projects'
import { toHeadlineLines } from '@/lib/headline'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const dict = await getDictionary(params.locale)

  return { title: `${dict.work.title} — ${dict.meta.title}`, description: dict.work.lead }
}

export default async function ProjectsPage({ params }: PageProps) {
  const [dict, profile] = await Promise.all([
    getDictionary(params.locale),
    getProfile(params.locale),
  ])

  const entries = toProjectEntries(profile.projects)

  return (
    <>
      <PageStage
        title={dict.work.title}
        lines={toHeadlineLines(dict.work.title)}
        size="short"
      >
        <div className="flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">
            {dict.work.lead}
          </p>
          <p className="type-meta shrink-0 text-fg-subtle">
            {entries.length} {dict.work.count_label}
          </p>
        </div>
      </PageStage>

      <div className="relative bg-bg">
        <div className="mx-auto max-w-shell px-5 pb-32 lg:px-8">
          {entries.map((project, index) => (
            <Reveal key={project.slug} index={index}>
              <ProjectRow project={project} dict={dict.work} locale={params.locale} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  )
}
