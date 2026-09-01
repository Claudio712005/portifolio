import Link from 'next/link'
import { clsx } from 'clsx'
import { Icon } from '@/components/ui/icon'
import type { ProjectEntry } from '@/lib/projects'
import type { Dictionary } from '@/types/dictionary'

interface ProjectRowProps {
  project: ProjectEntry
  dict: Dictionary['work']
  locale: string
  /** Featured rows on the home page carry more weight than the full index. */
  emphasis?: 'lead' | 'index'
}

/**
 * One project as a full-width editorial row rather than a card. The whole row
 * is the link; the accent rule underneath is what confirms the hover.
 *
 * @example <ProjectRow project={entry} dict={dict.work} locale="pt-BR" />
 */
export function ProjectRow({ project, dict, locale, emphasis = 'index' }: ProjectRowProps) {
  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      className="group relative block border-t border-line py-7 transition-colors last:border-b hover:border-line-strong lg:py-9"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-3 lg:grid-cols-[3rem_1fr_auto_auto] lg:gap-x-8">
        <span className="type-meta pt-1 text-fg-subtle transition-colors group-hover:text-accent">
          {project.index}
        </span>

        <div className="min-w-0">
          <h3
            className={clsx(
              'type-display text-fg transition-transform duration-500 ease-out group-hover:translate-x-1.5',
              emphasis === 'lead' ? 'text-d3' : 'text-2xl lg:text-3xl',
            )}
          >
            {project.name}
          </h3>
          <p className="mt-2.5 max-w-2xl text-pretty text-sm leading-relaxed text-fg-muted lg:text-base">
            {project.tagline}
          </p>
          <p className="mt-3 font-mono text-[11px] leading-relaxed text-fg-subtle">
            {project.techs.slice(0, 4).join('  ·  ')}
          </p>
        </div>

        <span className="type-meta col-start-2 text-fg-subtle lg:col-start-3 lg:pt-1">
          {project.year}
        </span>

        <span
          aria-hidden="true"
          className="col-start-2 flex h-9 w-9 items-center justify-center justify-self-end rounded-full border border-line text-fg-subtle transition-all duration-500 ease-out group-hover:border-accent group-hover:text-accent lg:col-start-4"
        >
          <Icon name="arrow-right" className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
