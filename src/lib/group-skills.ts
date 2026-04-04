import type { GroupedSkills, Skill, SkillCategory } from '@/types/profile'

export function groupSkillsByCategory(skills: Skill[]): GroupedSkills {
  return skills.reduce<GroupedSkills>((acc, skill) => {
    const key = skill.category as SkillCategory
    const existing = acc[key] ?? []
    return { ...acc, [key]: [...existing, skill] }
  }, {})
}
