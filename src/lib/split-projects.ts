import type { Project } from '@/types/profile'

export interface SplitProjects {
  featured: Project[]
  rest: Project[]
}

/** Splits the project list into the highlighted set and the secondary list. */
export function splitProjects(projects: Project[]): SplitProjects {
  return {
    featured: projects.filter((project) => project.featured),
    rest: projects.filter((project) => !project.featured),
  }
}
