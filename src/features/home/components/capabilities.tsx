import { Reveal } from '@/components/ui/reveal'
import { WeightShift } from '@/components/ui/weight-shift'
import { SectionLabel } from '@/components/ui/section-label'
import type { Dictionary } from '@/types/dictionary'
import type { SkillGroup } from '@/types/profile'

interface CapabilitiesProps {
  dict: Dictionary
  groups: SkillGroup[]
}

/**
 * The stack as a reference table rather than a grid of chips in cards: the
 * layer on the left, everything that runs in it on the right.
 */
export function Capabilities({ dict, groups }: CapabilitiesProps) {
  return (
    <section id="capabilities" className="border-t border-line bg-surface/40">
      <div className="mx-auto max-w-shell px-5 py-24 lg:px-8 lg:py-32">
        <SectionLabel index="02">{dict.home.capabilities_title}</SectionLabel>

        <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted lg:text-xl">
          {dict.home.capabilities_lead}
        </p>

        <dl className="mt-14">
          {groups.map((group, index) => (
            <Reveal key={group.category} index={index}>
              <div className="grid grid-cols-1 items-baseline gap-2 border-t border-line py-7 last:border-b md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-10">
                <dt className="flex items-baseline gap-3">
                  <WeightShift className="type-display text-2xl text-fg lg:text-3xl">
                    {dict.skills.categories[group.category] ?? group.category}
                  </WeightShift>
                  <span className="type-meta text-fg-subtle">
                    {String(group.skills.length).padStart(2, '0')}
                  </span>
                </dt>

                <dd className="font-mono text-sm leading-loose text-fg-muted">
                  {group.skills.map((skill, position) => (
                    <span key={skill.name}>
                      {position > 0 && <span className="text-line-strong">{'  ·  '}</span>}
                      <span className="transition-colors hover:text-accent">{skill.name}</span>
                    </span>
                  ))}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
