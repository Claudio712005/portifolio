/** Longest line the material headline stays legible at, in characters. */
const MAX_LINE = 13

/**
 * Breaks a headline into the lines the WebGL layer will set. Words are kept
 * whole; a single over-long word becomes its own line rather than being cut.
 */
export function toHeadlineLines(text: string, maxLine: number = MAX_LINE): string[] {
  const lines: string[] = []
  let current = ''

  for (const word of text.trim().split(/\s+/)) {
    if (!current) {
      current = word
      continue
    }

    if (`${current} ${word}`.length <= maxLine) {
      current = `${current} ${word}`
      continue
    }

    lines.push(current)
    current = word
  }

  if (current) lines.push(current)

  return lines.length > 0 ? lines : [text]
}
