import dynamic from 'next/dynamic'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SkillCard } from './SkillCard'
import type { Dictionary } from '@/types/dictionary'
import type { GroupedSkills, SkillCategory } from '@/types/profile'

const SkillsThreeBg = dynamic(
  () => import('@/components/ui/skills-three-bg').then((m) => ({ default: m.SkillsThreeBg })),
  { ssr: false },
)

interface SkillsProps {
  dict: Dictionary['skills']
  groupedSkills: GroupedSkills
}

const categoryOrder: SkillCategory[] = [
  'backend',
  'frontend',
  'database',
  'devops',
  'cloud',
  'messaging',
  'architecture',
  'testing',
  'ai'
]

export function Skills({ dict, groupedSkills }: SkillsProps) {
  const entries = categoryOrder
    .filter((cat) => Boolean(groupedSkills[cat]?.length))
    .map((cat) => ({ category: cat, skills: groupedSkills[cat]! }))

  return (
    <section id="skills" className="relative overflow-hidden bg-slate-50 px-4 py-24 dark:bg-slate-800/20">
      <SkillsThreeBg />
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <SectionTitle title={dict.title} />
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map(({ category, skills }, index) => (
            <AnimatedSection key={category} delay={index * 0.08}>
              <SkillCard
                categoryLabel={dict.categories[category] ?? category}
                skills={skills}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
