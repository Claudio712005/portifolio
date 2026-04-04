import { Badge } from '@/components/ui/Badge'
import { ExpandableText } from '@/components/ui/expandable-text'
import type { Project } from '@/types/profile'

interface ProjectCardProps {
  project: Project
  labels: {
    view_code: string
    no_repo: string
    read_more: string
    read_less: string
  }
}

export function ProjectCard({ project, labels }: ProjectCardProps) {
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-indigo-500/50 dark:border-slate-700 dark:bg-slate-800/50">
      <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">{project.name}</h3>

      <div className="mb-5 flex-1">
        <ExpandableText
          text={project.description}
          showMoreLabel={labels.read_more}
          showLessLabel={labels.read_less}
          maxLength={160}
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {project.techs.map((tech) => (
          <Badge key={tech} label={tech} variant="primary" />
        ))}
      </div>

      {project.repoUrl ? (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          {labels.view_code}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      ) : (
        <span className="text-sm text-slate-400 dark:text-slate-600">{labels.no_repo}</span>
      )}
    </article>
  )
}
