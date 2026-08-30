'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/icon'
import type { Dictionary } from '@/types/dictionary'
import type { Experience } from '@/types/profile'

interface ExperienceEntryProps {
  experience: Experience
  dict: Dictionary['experience']
  detailsId: string
}

export function ExperienceEntry({ experience, dict, detailsId }: ExperienceEntryProps) {
  const [open, setOpen] = useState(experience.current)

  return (
    <article className="relative pl-8 sm:pl-10">
      <span
        className="absolute left-0 top-[7px] h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-accent bg-bg"
        aria-hidden="true"
      />

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <p className="font-mono text-xs text-fg-subtle">{experience.period}</p>
        {experience.current && <Badge label={dict.current_label} variant="accent" />}
      </div>

      <h3 className="mt-2 text-lg font-semibold tracking-tight text-fg">{experience.role}</h3>
      <p className="mt-0.5 text-sm font-medium text-accent">{experience.company}</p>
      <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-fg-muted">
        {experience.summary}
      </p>

      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-controls={detailsId}
        className="mt-4 inline-flex items-center gap-1.5 rounded-[3px] font-mono text-[11px] uppercase tracking-wider text-fg-muted transition-colors hover:text-accent"
      >
        {open ? dict.show_less : dict.show_more}
        <Icon name="chevron-down" className={clsx('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
      </button>

      <div id={detailsId} hidden={!open} className="mt-5 max-w-2xl border-l border-line pl-5">
        <ul className="space-y-2.5">
          {experience.highlights.map((highlight) => (
            <li key={highlight.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
              <span className="mt-[9px] h-px w-3 shrink-0 bg-line-strong" aria-hidden="true" />
              <span className="text-pretty">{highlight}</span>
            </li>
          ))}
        </ul>

        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
          {dict.stack_label}
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {experience.stack.map((tech) => (
            <li key={tech}>
              <Badge label={tech} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
