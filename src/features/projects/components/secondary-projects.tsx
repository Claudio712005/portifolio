'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { Icon } from '@/components/ui/icon'
import { Reveal } from '@/components/ui/reveal'
import { ProjectCard } from './project-card'
import type { Dictionary } from '@/types/dictionary'
import type { Project } from '@/types/profile'

const COLLAPSED_COUNT = 3

interface SecondaryProjectsProps {
  projects: Project[]
  dict: Dictionary['projects']
}

export function SecondaryProjects({ projects, dict }: SecondaryProjectsProps) {
  const [expanded, setExpanded] = useState(false)

  const visible = expanded ? projects : projects.slice(0, COLLAPSED_COUNT)
  const hasMore = projects.length > COLLAPSED_COUNT

  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">
        {dict.more_title}
      </h3>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => (
          <Reveal key={project.name} delay={(index % 3) * 0.05}>
            <ProjectCard project={project} dict={dict} />
          </Reveal>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((previous) => !previous)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-2 rounded-[4px] border border-line-strong px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
          >
            {expanded ? dict.view_less : dict.view_more}
            <Icon
              name="chevron-down"
              className={clsx('h-4 w-4 transition-transform', expanded && 'rotate-180')}
            />
          </button>
        </div>
      )}
    </div>
  )
}
