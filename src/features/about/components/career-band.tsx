'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { Badge } from '@/components/ui/badge'
import { Disclosure } from '@/components/ui/disclosure'
import { Icon } from '@/components/ui/icon'
import type { Dictionary } from '@/types/dictionary'
import type { Experience } from '@/types/profile'

interface CareerBandProps {
  experience: Experience
  dict: Dictionary['about']
  detailsId: string
}

/**
 * One role as a full-width band with its period set at display scale. The home
 * page runs a dotted timeline for the same data; here the history is the whole
 * subject, so it gets the width and the type instead of a rail.
 */
export function CareerBand({ experience, dict, detailsId }: CareerBandProps) {
  const [open, setOpen] = useState(experience.current)

  return (
    <article className="border-t border-line py-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-12">
        <p className="type-display text-2xl leading-none text-fg-subtle lg:text-3xl">
          {experience.period}
        </p>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="type-display text-2xl text-fg lg:text-3xl">{experience.role}</h3>
            {experience.current && <Badge label={dict.current_label} variant="accent" />}
          </div>

          <p className="mt-2 font-mono text-sm text-accent">{experience.company}</p>
          <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-fg-muted">
            {experience.summary}
          </p>

          <button
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            aria-expanded={open}
            aria-controls={detailsId}
            className="type-meta mt-6 inline-flex items-center gap-2 rounded-[3px] text-fg-muted transition-colors hover:text-accent"
          >
            {open ? dict.show_less : dict.show_more}
            <Icon
              name="chevron-down"
              className={clsx('h-3.5 w-3.5 transition-transform duration-300', open && 'rotate-180')}
            />
          </button>

          <Disclosure id={detailsId} open={open} className="mt-7 max-w-2xl">
            <ul className="space-y-4">
              {experience.highlights.map((highlight, index) => (
                <li
                  key={highlight.slice(0, 40)}
                  className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2 text-sm leading-relaxed text-fg-muted"
                >
                  <span className="type-meta text-fg-subtle">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-pretty">{highlight}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 font-mono text-[11px] leading-relaxed text-fg-subtle">
              {experience.stack.join('  ·  ')}
            </p>
          </Disclosure>
        </div>
      </div>
    </article>
  )
}
