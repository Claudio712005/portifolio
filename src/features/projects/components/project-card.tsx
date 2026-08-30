import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/icon'
import { getCoverGradient } from '@/lib/project-cover'
import type { Dictionary } from '@/types/dictionary'
import type { Project } from '@/types/profile'

interface ProjectCardProps {
  project: Project
  dict: Dictionary['projects']
}

export function ProjectCard({ project, dict }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col border border-line bg-surface transition-colors hover:border-line-strong">
      <div
        className={`h-1.5 w-full bg-gradient-to-r ${getCoverGradient(project.accent)}`}
        aria-hidden="true"
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-base font-semibold tracking-tight text-fg">{project.name}</h3>
          <span className="font-mono text-[10px] text-fg-subtle">{project.year}</span>
        </div>

        <p className="mt-2 text-pretty text-sm leading-relaxed text-fg-muted">{project.tagline}</p>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-fg-subtle">{project.problem}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.techs.slice(0, 5).map((tech) => (
            <li key={tech}>
              <Badge label={tech} variant="outline" />
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4">
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-[3px] font-mono text-xs text-fg-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              <Icon name="github" className="h-3.5 w-3.5" />
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
              className="inline-flex items-center gap-1.5 rounded-[3px] font-mono text-xs text-fg-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              <Icon name="arrow-up-right" className="h-3.5 w-3.5" />
              {dict.view_live}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
