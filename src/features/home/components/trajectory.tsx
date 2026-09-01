import Link from 'next/link'
import { Icon } from '@/components/ui/icon'
import { Reveal } from '@/components/ui/reveal'
import { ScrambleText } from '@/components/ui/scramble-text'
import { SectionLabel } from '@/components/ui/section-label'
import { TimelineRail } from '@/components/ui/timeline-rail'
import type { Dictionary } from '@/types/dictionary'
import type { Experience } from '@/types/profile'

interface TrajectoryProps {
  dict: Dictionary
  experience: Experience[]
  locale: string
}

/** Condensed history. The full detail lives on the about route. */
export function Trajectory({ dict, experience, locale }: TrajectoryProps) {
  return (
    <section id="trajectory" className="mx-auto max-w-shell px-5 py-24 lg:px-8 lg:py-32">
      <SectionLabel index="03">{dict.home.trajectory_title}</SectionLabel>

      <TimelineRail className="mt-14">
        {experience.map((item, index) => (
          <Reveal key={`${item.company}-${item.period}`} index={index}>
            <article className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
              <span
                aria-hidden="true"
                className="absolute left-0 top-2 h-2 w-2 -translate-x-1/2 rounded-full border border-accent bg-bg"
              />

              <p className="type-meta text-fg-subtle">
                <ScrambleText text={item.period} auto />
              </p>

              <h3 className="type-display mt-3 text-xl text-fg lg:text-2xl">{item.role}</h3>
              <p className="mt-1 font-mono text-sm text-accent">{item.company}</p>
              <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-fg-muted">
                {item.summary}
              </p>
            </article>
          </Reveal>
        ))}
      </TimelineRail>

      <Link
        href={`/${locale}/about`}
        className="group mt-4 inline-flex items-center gap-3 text-base text-fg transition-colors hover:text-accent"
      >
        {dict.home.trajectory_all}
        <Icon
          name="arrow-right"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </section>
  )
}
