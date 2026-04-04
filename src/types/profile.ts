export type SkillCategory =
  | 'backend'
  | 'frontend'
  | 'database'
  | 'devops'
  | 'cloud'
  | 'messaging'
  | 'architecture'
  | 'testing'
  | 'ai'

export interface Skill {
  name: string
  category: SkillCategory
}

export interface Project {
  name: string
  description: string
  techs: string[]
  repoUrl: string | null
  stars: number | null
}

export interface Experience {
  company: string
  role: string
  period: string
  description: string | null
}

export interface ProfileBasics {
  name: string
  title: string
  summary: string
  location: string
  github: string
  linkedin: string
}

export interface Education {
  institution: string
  degree: string
  period: string
}

export interface Profile {
  basics: ProfileBasics
  skills: Skill[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
}

export type GroupedSkills = Partial<Record<SkillCategory, Skill[]>>
