const GLYPHS = '01<>[]{}/\\|=+*#$%&_~^:;'

/** Deterministic 0–1 noise, so a frame can be derived instead of stored. */
function noise(seed: number): number {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

/**
 * The moment character `index` settles, spread across the run so the word
 * resolves left to right with an uneven edge rather than in lockstep.
 */
function settleAt(index: number, length: number): number {
  return (index / Math.max(length, 1)) * 0.6 + noise(index) * 0.32
}

/**
 * One frame of a scramble-to-resolve pass. Pure: the same progress and tick
 * always produce the same string, so nothing has to be kept between frames.
 *
 * @param progress 0 at the start of the run, 1 once every character has settled.
 * @param tick Frame counter; only drives which junk glyph an unsettled slot shows.
 */
export function scrambleFrame(target: string, progress: number, tick: number): string {
  let out = ''

  for (let index = 0; index < target.length; index += 1) {
    const character = target[index]

    if (character === ' ') {
      out += ' '
      continue
    }

    if (progress >= settleAt(index, target.length)) {
      out += character
      continue
    }

    out += GLYPHS[Math.floor(noise(index * 7.13 + tick * 0.37) * GLYPHS.length)]
  }

  return out
}

/** Run length for a string, so short labels do not linger. */
export function scrambleDuration(target: string): number {
  return Math.min(0.35 + target.length * 0.022, 0.9)
}
