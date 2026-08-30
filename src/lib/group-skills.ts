import type { Skill, SkillCategory, SkillGroup } from '@/types/profile'

/** Display order of skill categories — most relevant to the role first. */
const CATEGORY_ORDER: SkillCategory[] = [
  'backend',
  'architecture',
  'database',
  'messaging',
  'devops',
  'cloud',
  'testing',
  'observability',
  'ai',
  'frontend',
]

/**
 * Groups a flat skill list into ordered category buckets, dropping
 * categories with no skills so the grid never renders an empty card.
 */
export function groupSkillsByCategory(skills: Skill[]): SkillGroup[] {
  return CATEGORY_ORDER.map((category) => ({
    category,
    skills: skills.filter((skill) => skill.category === category),
  })).filter((group) => group.skills.length > 0)
}
