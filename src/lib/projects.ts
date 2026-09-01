import type { Project } from '@/types/profile'

export interface ProjectEntry extends Project {
  slug: string
  /** Zero-padded position in the full list, e.g. `04`. */
  index: string
}

/** Stable across locales: project names are identical in every dictionary. */
export function toProjectSlug(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function toProjectEntries(projects: Project[]): ProjectEntry[] {
  return projects.map((project, position) => ({
    ...project,
    slug: toProjectSlug(project.name),
    index: String(position + 1).padStart(2, '0'),
  }))
}

export function findProjectEntry(
  entries: ProjectEntry[],
  slug: string,
): ProjectEntry | undefined {
  return entries.find((entry) => entry.slug === slug)
}

/** The entry after `slug`, wrapping to the first — powers "next project". */
export function nextProjectEntry(
  entries: ProjectEntry[],
  slug: string,
): ProjectEntry | undefined {
  const position = entries.findIndex((entry) => entry.slug === slug)
  if (position === -1 || entries.length < 2) return undefined

  return entries[(position + 1) % entries.length]
}

export function featuredEntries(entries: ProjectEntry[]): ProjectEntry[] {
  return entries.filter((entry) => entry.featured)
}
