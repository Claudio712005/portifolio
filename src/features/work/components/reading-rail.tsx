'use client'

import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerGsap } from '@/lib/gsap/register'

export interface RailSection {
  id: string
  label: string
}

interface ReadingRailProps {
  sections: RailSection[]
}

/**
 * Sticky index of the case being read, with a rule that fills as the article
 * passes. Gives a long document a sense of position that a scroll bar alone
 * does not, and gives this route a fixture the other routes do not have.
 *
 * @example <ReadingRail sections={[{ id: 'problem', label: 'O problema' }]} />
 */
export function ReadingRail({ sections }: ReadingRailProps) {
  const [active, setActive] = useState(sections[0]?.id ?? '')
  const fillRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    registerGsap()
    const fill = fillRef.current
    const article = document.getElementById('case-body')
    if (!article) return

    const triggers = sections.map((section) =>
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: 'top 40%',
        end: 'bottom 40%',
        onToggle: (self) => {
          if (self.isActive) setActive(section.id)
        },
      }),
    )

    const progress = ScrollTrigger.create({
      trigger: article,
      start: 'top 60%',
      end: 'bottom 80%',
      onUpdate: (self) => {
        if (fill) fill.style.transform = `scaleY(${self.progress})`
      },
    })

    return () => {
      triggers.forEach((trigger) => trigger.kill())
      progress.kill()
    }
  }, [sections])

  return (
    <nav aria-label={sections[0]?.label} className="sticky top-28 hidden h-fit lg:block">
      <div className="relative pl-5">
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-line" />
        <span
          ref={fillRef}
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-accent"
        />

        <ul className="space-y-3">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active === section.id ? 'true' : undefined}
                className={clsx(
                  'type-meta block transition-colors',
                  active === section.id ? 'text-accent' : 'text-fg-subtle hover:text-fg-muted',
                )}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
