import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageStage } from '@/components/layout/page-stage'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/icon'
import { Reveal } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'
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

  return (
    <>
      <PageStage title={project.name} lines={toHeadlineLines(project.name)} size="short">
        <div className="flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">
            {project.tagline}
          </p>
          <div className="flex shrink-0 items-center gap-3">
            {project.featured && <Badge label={dict.work.featured_label} variant="accent" />}
            <span className="type-meta text-fg-subtle">{project.year}</span>
          </div>
        </div>
      </PageStage>

      <div className="relative bg-bg">
        <div className="mx-auto max-w-shell px-5 pb-32 lg:px-8">
          <Link
            href={`/${params.locale}/projects`}
            className="group inline-flex items-center gap-2.5 py-8 font-mono text-xs text-fg-muted transition-colors hover:text-accent"
          >
            <Icon
              name="arrow-right"
              className="h-3.5 w-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-x-1"
            />
            {dict.work.back}
          </Link>

          <div className="grid gap-16 border-t border-line pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-20">
            <div className="space-y-16">
              <Reveal>
                <section>
                  <SectionLabel>{dict.work.problem_title}</SectionLabel>
                  <p className="mt-7 text-pretty text-xl leading-relaxed text-fg lg:text-2xl">
                    {project.problem}
                  </p>
                </section>
              </Reveal>

              <Reveal>
                <section>
                  <SectionLabel>{dict.work.approach_title}</SectionLabel>
                  <p className="mt-7 text-pretty text-base leading-loose text-fg-muted lg:text-lg">
                    {project.description}
                  </p>
                </section>
              </Reveal>
            </div>

            <aside className="space-y-12 lg:sticky lg:top-24 lg:self-start">
              <section>
                <SectionLabel>{dict.work.stack_label}</SectionLabel>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {project.techs.map((tech) => (
                    <li key={tech}>
                      <Badge label={tech} />
                    </li>
                  ))}
                </ul>
              </section>

              <section className="border-t border-line pt-8">
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 text-sm text-fg transition-colors hover:text-accent"
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
                    className="group mt-5 flex items-center justify-between gap-3 text-sm text-fg transition-colors hover:text-accent"
                  >
                    <span className="flex items-center gap-3">
                      <Icon name="arrow-up-right" className="h-4 w-4" />
                      {dict.work.view_live}
                    </span>
                  </a>
                )}
              </section>
            </aside>
          </div>

          {next && (
            <Link
              href={`/${params.locale}/projects/${next.slug}`}
              className="group mt-28 block border-t border-line pt-10"
            >
              <span className="type-meta text-fg-subtle">{dict.work.next_label}</span>
              <span className="mt-4 flex items-baseline justify-between gap-6">
                <span className="type-display text-d3 text-fg transition-colors group-hover:text-accent">
                  {next.name}
                </span>
                <Icon
                  name="arrow-right"
                  className="h-6 w-6 shrink-0 self-center text-fg-subtle transition-all duration-500 group-hover:translate-x-2 group-hover:text-accent"
                />
              </span>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
