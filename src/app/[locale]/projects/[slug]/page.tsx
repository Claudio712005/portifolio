import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageStage } from '@/components/layout/page-stage'
import { Icon } from '@/components/ui/icon'
import { SectionLabel } from '@/components/ui/section-label'
import { WipeIn } from '@/components/ui/wipe-in'
import { ReadingRail } from '@/features/work/components/reading-rail'
import { StackGrid } from '@/features/work/components/stack-grid'
import { NextProject } from '@/features/work/components/next-project'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { getProfile } from '@/lib/get-profile'
import { findProjectEntry, nextProjectEntry, toProjectEntries } from '@/lib/projects'
import { toHeadlineLines } from '@/lib/headline'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string; slug: string }
}

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const profile = await getProfile(params.locale)

  return toProjectEntries(profile.projects).map((entry) => ({ slug: entry.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const profile = await getProfile(params.locale)
  const project = findProjectEntry(toProjectEntries(profile.projects), params.slug)

  if (!project) return {}

  return { title: `${project.name} — ${profile.basics.name}`, description: project.tagline }
}

export default async function ProjectPage({ params }: PageProps) {
  const [dict, profile] = await Promise.all([
    getDictionary(params.locale),
    getProfile(params.locale),
  ])

  const entries = toProjectEntries(profile.projects)
  const project = findProjectEntry(entries, params.slug)

  if (!project) notFound()

  const next = nextProjectEntry(entries, params.slug)

  const spec = [
    { label: dict.work.index_label, value: project.index },
    { label: dict.work.year_label, value: project.year },
    { label: dict.work.stack_label, value: String(project.techs.length) },
    { label: dict.work.featured_label, value: project.repoUrl ? 'GitHub' : dict.work.no_repo },
  ]

  const sections = [
    { id: 'problem', label: dict.work.problem_title },
    { id: 'approach', label: dict.work.approach_title },
    { id: 'stack', label: dict.work.stack_label },
  ]

  return (
    <>
      <PageStage title={project.name} lines={toHeadlineLines(project.name)} size="short">
        {/* A specification block, not the role-and-status line the home page runs. */}
        <dl className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
          {spec.map((cell) => (
            <div key={cell.label} className="bg-bg px-4 py-4">
              <dt className="type-meta text-fg-subtle">{cell.label}</dt>
              <dd className="mt-2 font-mono text-sm text-fg">{cell.value}</dd>
            </div>
          ))}
        </dl>
      </PageStage>

      <div className="relative bg-bg">
        <div className="mx-auto max-w-shell px-5 lg:px-8">
          <Link
            href={`/${params.locale}/projects`}
            data-transition-label={dict.work.title}
            className="group inline-flex items-center gap-2.5 py-8 font-mono text-xs text-fg-muted transition-colors hover:text-accent"
          >
            <Icon
              name="arrow-right"
              className="h-3.5 w-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-x-1"
            />
            {dict.work.back}
          </Link>

          <div className="grid gap-12 border-t border-line pt-16 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:gap-20">
            <ReadingRail sections={sections} />

            <article id="case-body" className="space-y-20">
              <p className="type-display text-pretty text-d3 text-fg">{project.tagline}</p>

              <section id="problem" className="scroll-mt-28">
                <SectionLabel>{dict.work.problem_title}</SectionLabel>
                <WipeIn scrub className="mt-8">
                  <p className="text-pretty text-xl leading-relaxed text-fg lg:text-2xl">
                    {project.problem}
                  </p>
                </WipeIn>
              </section>

              <section id="approach" className="scroll-mt-28">
                <SectionLabel>{dict.work.approach_title}</SectionLabel>
                <WipeIn className="mt-8">
                  <p className="max-w-2xl text-pretty leading-loose text-fg-muted lg:text-lg">
                    {project.description}
                  </p>
                </WipeIn>
              </section>

              <section id="stack" className="scroll-mt-28">
                <SectionLabel>{dict.work.stack_label}</SectionLabel>
                <div className="grid gap-10 sm:grid-cols-[minmax(0,1fr)_minmax(0,14rem)]">
                  <StackGrid techs={project.techs} />

                  <div className="pt-6">
                    {project.repoUrl ? (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-3 border-b border-line pb-3 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
                      >
                        <span className="flex items-center gap-3">
                          <Icon name="github" className="h-4 w-4" />
                          {dict.work.view_code}
                        </span>
                        <Icon
                          name="arrow-up-right"
                          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    ) : (
                      <p className="font-mono text-xs text-fg-subtle">{dict.work.no_repo}</p>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-5 flex items-center justify-between gap-3 border-b border-line pb-3 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
                      >
                        <span className="flex items-center gap-3">
                          <Icon name="arrow-up-right" className="h-4 w-4" />
                          {dict.work.view_live}
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </section>
            </article>
          </div>
        </div>

        {next && (
          <NextProject
            project={next}
            label={dict.work.next_label}
            locale={params.locale}
          />
        )}
      </div>
    </>
  )
}
