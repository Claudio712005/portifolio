import { Badge } from '@/components/ui/badge'
import { ExpandableText } from '@/components/ui/expandable-text'
import { Icon } from '@/components/ui/icon'
import { ProjectCover } from '@/components/ui/project-cover'
import type { Dictionary } from '@/types/dictionary'
import type { Project } from '@/types/profile'

interface FeaturedProjectCardProps {
  project: Project
  index: string
  dict: Dictionary['projects']
}

export function FeaturedProjectCard({ project, index, dict }: FeaturedProjectCardProps) {
  return (
    <article className="grid overflow-hidden border border-line bg-surface transition-colors hover:border-line-strong md:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
      <ProjectCover
        accent={project.accent}
        index={index}
        caption={project.techs.slice(0, 3).join(' · ')}
        className="min-h-[168px] md:min-h-full"
      />

      <div className="flex flex-col p-6 lg:p-8">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-fg-subtle">
          <Badge label={dict.featured_label} variant="accent" />
          <span>{project.year}</span>
        </div>

        <h3 className="mt-4 text-xl font-semibold tracking-tight text-fg lg:text-2xl">
          {project.name}
        </h3>
        <p className="mt-1.5 text-pretty text-sm text-fg-muted">{project.tagline}</p>

        <div className="mt-5 border-l-2 border-accent/60 bg-surface-2/70 py-3 pl-4 pr-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            {dict.problem_label}
          </p>
          <p className="mt-1.5 text-pretty text-sm leading-relaxed text-fg-muted">{project.problem}</p>
        </div>

        <div className="mt-5">
          <ExpandableText
            text={project.description}
            showMoreLabel={dict.read_more}
            showLessLabel={dict.read_less}
            maxLength={230}
          />
        </div>

        <div className="mt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
            {dict.stack_label}
          </p>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {project.techs.map((tech) => (
              <li key={tech}>
                <Badge label={tech} />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5">
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[3px] text-sm font-medium text-fg underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              <Icon name="github" className="h-4 w-4" />
              {dict.view_code}
            </a>
          ) : (
            <span className="font-mono text-xs text-fg-subtle">{dict.no_repo}</span>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[3px] text-sm font-medium text-fg underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              <Icon name="arrow-up-right" className="h-4 w-4" />
              {dict.view_live}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
