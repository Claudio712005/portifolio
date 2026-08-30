import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { SkillGroupCard } from './skill-group-card'
import type { Dictionary } from '@/types/dictionary'
import type { SkillGroup } from '@/types/profile'

interface SkillsProps {
  dict: Dictionary['skills']
  groups: SkillGroup[]
}

export function Skills({ dict, groups }: SkillsProps) {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="border-b border-line bg-surface-2/50 px-5 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-shell">
        <Reveal>
          <SectionHeading titleId="skills-title" index="02" kicker={dict.kicker} title={dict.title} subtitle={dict.subtitle} />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => (
            <Reveal key={group.category} delay={index * 0.04}>
              <SkillGroupCard
                group={group}
                label={dict.categories[group.category] ?? group.category}
                index={String(index + 1).padStart(2, '0')}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
