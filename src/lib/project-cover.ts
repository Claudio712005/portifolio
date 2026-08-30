import type { ProjectAccent } from '@/types/profile'

/**
 * CSS gradient stand-ins for project screenshots. Each accent is a fixed
 * pairing so a project keeps the same cover across locales and reloads.
 */
const COVER_GRADIENTS: Record<ProjectAccent, string> = {
  signal: 'from-[#ff5f78] via-[#c81e46] to-[#5c0f22]',
  copper: 'from-[#f4a463] via-[#c26a22] to-[#57300f]',
  graphite: 'from-[#b9b9c6] via-[#5c5c6a] to-[#24242c]',
  depth: 'from-[#6198da] via-[#2b5487] to-[#132437]',
  moss: 'from-[#74cca1] via-[#2f7358] to-[#12291f]',
}

export function getCoverGradient(accent: ProjectAccent): string {
  return COVER_GRADIENTS[accent]
}

/** Zero-padded index shown on the cover block, e.g. `03`. */
export function formatProjectIndex(index: number): string {
  return String(index + 1).padStart(2, '0')
}
