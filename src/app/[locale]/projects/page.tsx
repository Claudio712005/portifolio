import { PageStage } from '@/components/layout/page-stage'
import { ProjectLedger } from '@/features/work/components/project-ledger'
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
  const years = Array.from(new Set(entries.map((entry) => entry.year))).sort().reverse()

  return (
    <>
      <PageStage title={dict.work.title} lines={toHeadlineLines(dict.work.title)} size="short">
        <p className="max-w-xl text-pretty leading-relaxed text-fg-muted">{dict.work.lead}</p>
      </PageStage>

      <div className="relative bg-bg">
        <div className="mx-auto max-w-shell px-5 pb-32 lg:px-8">
          {/* Column header: this page is an index, and says so before the first row. */}
          <div className="grid gap-x-10 lg:grid-cols-[6rem_minmax(0,1fr)]">
            <span className="type-meta hidden text-fg-subtle lg:block">
              {dict.work.year_label}
            </span>
            <div className="flex items-baseline justify-between border-b border-line-strong pb-3">
              <span className="type-meta text-fg-subtle">{dict.work.title}</span>
              <span className="type-meta text-fg-subtle">
                {years.join('  ·  ')}
                <span className="ml-6 text-accent">
                  {entries.length} {dict.work.count_label}
                </span>
              </span>
            </div>
          </div>

          <div className="mt-3">
            <ProjectLedger projects={entries} dict={dict.work} locale={params.locale} />
          </div>
        </div>
      </div>
    </>
  )
}
