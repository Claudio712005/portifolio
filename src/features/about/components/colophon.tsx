import type { Dictionary } from '@/types/dictionary'
import type { SkillGroup } from '@/types/profile'

interface ColophonProps {
  dict: Dictionary
  groups: SkillGroup[]
}

/**
 * The stack as one continuous run of text, categories marked inline. The home
 * page already sets the same data as a reference table; repeating that table
 * here would make the two pages read as one. A colophon reads as the end of a
 * document instead.
 */
export function Colophon({ dict, groups }: ColophonProps) {
  return (
    <p className="max-w-4xl font-mono text-sm leading-loose text-fg-subtle">
      {groups.map((group, groupIndex) => (
        <span key={group.category}>
          {groupIndex > 0 && <span className="text-line-strong">{'  —  '}</span>}
          <span className="uppercase tracking-[0.16em] text-accent">
            {dict.skills.categories[group.category] ?? group.category}
          </span>{' '}
          {group.skills.map((skill, index) => (
            <span key={skill.name}>
              {index > 0 && <span className="text-line-strong">{' · '}</span>}
              <span className="text-fg-muted">{skill.name}</span>
            </span>
          ))}
        </span>
      ))}
    </p>
  )
}
