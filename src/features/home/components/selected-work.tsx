import Link from 'next/link'
import { Icon } from '@/components/ui/icon'
import { Reveal } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'
import { ProjectRow } from '@/features/work/components/project-row'
import type { ProjectEntry } from '@/lib/projects'
import type { Dictionary } from '@/types/dictionary'

interface SelectedWorkProps {
  dict: Dictionary
  projects: ProjectEntry[]
  total: number
  locale: string
}

export function SelectedWork({ dict, projects, total, locale }: SelectedWorkProps) {
  return (
    <section id="work" className="mx-auto max-w-shell px-5 py-24 lg:px-8 lg:py-32">
      <SectionLabel index="01">{dict.home.work_title}</SectionLabel>

      <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted lg:text-xl">
        {dict.home.work_lead}
      </p>

      <div className="mt-14">
        {projects.map((project, index) => (
          <Reveal key={project.slug} index={index}>
            <ProjectRow project={project} dict={dict.work} locale={locale} emphasis="lead" />
          </Reveal>
        ))}
      </div>

      <Link
        href={`/${locale}/projects`}
        className="group mt-12 inline-flex items-center gap-3 text-base text-fg transition-colors hover:text-accent"
      >
        {dict.home.work_all}
        <span className="font-mono text-xs text-fg-subtle">{total}</span>
        <Icon
          name="arrow-right"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </section>
  )
}
