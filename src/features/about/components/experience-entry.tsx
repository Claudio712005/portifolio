'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { Badge } from '@/components/ui/badge'
import { Disclosure } from '@/components/ui/disclosure'
import { Icon } from '@/components/ui/icon'
import type { Dictionary } from '@/types/dictionary'
import type { Experience } from '@/types/profile'

interface ExperienceEntryProps {
  experience: Experience
  dict: Dictionary['about']
  detailsId: string
}

export function ExperienceEntry({ experience, dict, detailsId }: ExperienceEntryProps) {
  const [open, setOpen] = useState(experience.current)

  return (
    <article className="relative pb-14 pl-8 last:pb-0 sm:pl-12">
      <span
        aria-hidden="true"
        className="absolute left-0 top-2 h-2 w-2 -translate-x-1/2 rounded-full border border-accent bg-bg"
      />

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <p className="type-meta text-fg-subtle">{experience.period}</p>
        {experience.current && <Badge label={dict.current_label} variant="accent" />}
      </div>

      <h3 className="type-display mt-3 text-xl text-fg lg:text-2xl">{experience.role}</h3>
      <p className="mt-1 font-mono text-sm text-accent">{experience.company}</p>
      <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-fg-muted">
        {experience.summary}
      </p>

      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-controls={detailsId}
        className="type-meta mt-5 inline-flex items-center gap-2 rounded-[3px] text-fg-muted transition-colors hover:text-accent"
      >
        {open ? dict.show_less : dict.show_more}
        <Icon
          name="chevron-down"
          className={clsx('h-3.5 w-3.5 transition-transform duration-300', open && 'rotate-180')}
        />
      </button>

      <Disclosure id={detailsId} open={open} className="mt-6 max-w-2xl border-l border-line pl-6">
        <ul className="space-y-3">
          {experience.highlights.map((highlight) => (
            <li
              key={highlight.slice(0, 40)}
              className="flex gap-3.5 text-sm leading-relaxed text-fg-muted"
            >
              <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-line-strong" />
              <span className="text-pretty">{highlight}</span>
            </li>
          ))}
        </ul>

        <p className="type-meta mt-7 text-fg-subtle">{dict.stack_label}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {experience.stack.map((tech) => (
            <li key={tech}>
              <Badge label={tech} />
            </li>
          ))}
        </ul>
      </Disclosure>
    </article>
  )
}
