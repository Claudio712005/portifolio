import type { TypeFieldPalette } from './type-field'

const FALLBACK: [number, number, number] = [1, 1, 1]

/** Reads an `R G B` custom property and normalises it to 0–1 sRGB. */
function readTriplet(styles: CSSStyleDeclaration, name: string): [number, number, number] {
  const parts = styles.getPropertyValue(name).trim().split(/\s+/).map(Number)

  if (parts.length < 3 || parts.some((part) => Number.isNaN(part))) return FALLBACK

  return [parts[0] / 255, parts[1] / 255, parts[2] / 255]
}

/**
 * The canvas takes its colours from the same tokens the CSS uses, so switching
 * theme repaints the WebGL layer without a second palette to maintain.
 */
export function readThemePalette(): TypeFieldPalette {
  const styles = getComputedStyle(document.documentElement)

  return {
    ink: readTriplet(styles, '--fg'),
    accent: readTriplet(styles, '--accent'),
  }
}

/** The display stack actually resolved by next/font, for the 2D text pass. */
export function readDisplayFontFamily(): string {
  const family = getComputedStyle(document.documentElement)
    .getPropertyValue('--font-display')
    .trim()

  return family ? `${family}, ui-serif, Georgia, serif` : 'ui-serif, serif'
}
