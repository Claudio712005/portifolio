import { Badge } from '@/components/ui/badge'
import type { SkillGroup } from '@/types/profile'

interface SkillGroupCardProps {
  group: SkillGroup
  label: string
  index: string
}

export function SkillGroupCard({ group, label, index }: SkillGroupCardProps) {
  return (
    <div className="flex h-full flex-col border border-line bg-surface p-5 transition-colors hover:border-line-strong">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-fg">{label}</h3>
        <span className="font-mono text-[10px] text-fg-subtle" aria-hidden="true">
          {index}
        </span>
      </div>

      <div className="mt-4 h-px w-full bg-line" aria-hidden="true" />

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {group.skills.map((skill) => (
          <li key={skill.name}>
            <Badge label={skill.name} />
          </li>
        ))}
      </ul>
    </div>
  )
}
