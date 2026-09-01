import Link from 'next/link'
import { clsx } from 'clsx'
import { Icon } from '@/components/ui/icon'
import { Magnetic } from '@/components/ui/magnetic'
import { ScrambleText } from '@/components/ui/scramble-text'
import type { ProjectEntry } from '@/lib/projects'
import type { Dictionary } from '@/types/dictionary'

interface ProjectRowProps {
  project: ProjectEntry
  dict: Dictionary['work']
  locale: string
  /** Featured rows on the home page carry more weight than the full index. */
  emphasis?: 'lead' | 'index'
}

const VISIBLE_TECHS = 4

/**
 * One project as a full-width editorial row rather than a card. Hovering it
 * resolves the title out of noise, brings the rest of the stack into view and
 * pulls the arrow toward the cursor — three different rewards, not one fade.
 *
 * @example <ProjectRow project={entry} dict={dict.work} locale="pt-BR" />
 */
export function ProjectRow({ project, dict, locale, emphasis = 'index' }: ProjectRowProps) {
  const shown = project.techs.slice(0, VISIBLE_TECHS)
  const hidden = project.techs.length - shown.length

  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      data-scramble-group
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
            <ScrambleText text={project.name} group />
          </h3>

          <p className="mt-2.5 max-w-2xl text-pretty text-sm leading-relaxed text-fg-muted lg:text-base">
            {project.tagline}
          </p>

          <p className="mt-3 font-mono text-[11px] leading-relaxed text-fg-subtle transition-colors group-hover:text-fg-muted">
            {shown.join('  ·  ')}
            {hidden > 0 && (
              <span className="ml-2 inline-block text-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                +{hidden}
              </span>
            )}
          </p>
        </div>

        <span className="type-meta col-start-2 text-fg-subtle lg:col-start-3 lg:pt-1">
          {project.year}
        </span>

        <Magnetic strength={0.45} className="col-start-2 justify-self-end lg:col-start-4">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg-subtle transition-colors duration-500 ease-out group-hover:border-accent group-hover:text-accent"
          >
            <Icon name="arrow-right" className="h-4 w-4" />
          </span>
        </Magnetic>
      </div>
    </Link>
  )
}
