import type { Dictionary } from '@/types/dictionary'

export interface NavSection {
  id: string
  label: string
}

/** Section anchors rendered in the sticky navigation, in page order. */
export function getNavSections(dict: Dictionary['nav']): NavSection[] {
  return [
    { id: 'about', label: dict.about },
    { id: 'skills', label: dict.skills },
    { id: 'projects', label: dict.projects },
    { id: 'experience', label: dict.experience },
    { id: 'education', label: dict.education },
    { id: 'contact', label: dict.contact },
  ]
}
