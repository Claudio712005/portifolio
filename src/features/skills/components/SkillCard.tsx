import { Badge } from '@/components/ui/Badge'
import type { Skill } from '@/types/profile'

interface SkillCardProps {
  categoryLabel: string
  skills: Skill[]
}

export function SkillCard({ categoryLabel, skills }: SkillCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
        {categoryLabel}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill.name} label={skill.name} />
        ))}
      </div>
    </div>
  )
}
