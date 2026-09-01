import Link from 'next/link'
import { Icon } from '@/components/ui/icon'
import type { ProjectEntry } from '@/lib/projects'

interface NextProjectProps {
  project: ProjectEntry
  label: string
  locale: string
}

/**
 * Handoff at the foot of a case. The accent floods the block from the bottom on
 * hover, so the link reads as a door rather than as one more row.
 *
 * @example <NextProject project={next} label={dict.work.next_label} locale="en" />
 */
export function NextProject({ project, label, locale }: NextProjectProps) {
  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      data-transition-label={project.name}
      className="group relative mt-28 block overflow-hidden border-t border-line py-16 lg:py-20"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
      />

      <span className="relative mx-auto block w-full max-w-shell px-5 lg:px-8">
        <span className="type-meta text-fg-subtle transition-colors group-hover:text-accent-fg/70">
          {label}
        </span>

        <span className="mt-5 flex items-center justify-between gap-8">
          <span className="type-display text-d3 text-fg transition-colors group-hover:text-accent-fg">
            {project.name}
          </span>
          <Icon
            name="arrow-right"
            className="h-7 w-7 shrink-0 text-fg-subtle transition-all duration-500 group-hover:translate-x-3 group-hover:text-accent-fg"
          />
        </span>
      </span>
    </Link>
  )
}
