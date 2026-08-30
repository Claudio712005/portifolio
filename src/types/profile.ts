export type SkillCategory =
  | 'backend'
  | 'frontend'
  | 'architecture'
  | 'database'
  | 'messaging'
  | 'devops'
  | 'cloud'
  | 'testing'
  | 'observability'
  | 'ai'

export interface Skill {
  name: string
  category: SkillCategory
}

/** Visual identity of a project cover block (solid/gradient placeholder). */
export type ProjectAccent = 'signal' | 'copper' | 'graphite' | 'depth' | 'moss'

export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  name: string
  /** One line describing what the project is. */
  tagline: string
  /** The concrete problem the project solves. */
  problem: string
  /** Longer narrative shown on the card. */
  description: string
  techs: string[]
  year: string
  accent: ProjectAccent
  featured: boolean
  repoUrl: string | null
  liveUrl: string | null
}

export interface Experience {
  company: string
  role: string
  period: string
  /** Short one-line summary rendered in the condensed timeline. */
  summary: string
  highlights: string[]
  stack: string[]
  current: boolean
}

export interface ProfileBasics {
  name: string
  /** Short role label, e.g. "Backend Engineer". */
  role: string
  /** Current position with company. */
  title: string
  /** Compelling one-sentence value proposition shown in the hero. */
  valueProp: string
  summary: string
  location: string
  availability: string
  email: string
  github: string
  linkedin: string
}

export interface Education {
  institution: string
  degree: string
  period: string
  status: string
}

export interface Profile {
  basics: ProfileBasics
  skills: Skill[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
}

export interface SkillGroup {
  category: SkillCategory
  skills: Skill[]
}
