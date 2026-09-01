export type StageSize = 'full' | 'short'

export interface StageLayout {
  /** Share of the viewport width the longest line may occupy. */
  fill: number
  /** Share of the viewport height the whole block may occupy. */
  band: number
  /** Vertical centre of the block, as a share of viewport height. */
  centerY: number
  /** Multiplier on the natural line height. */
  leading: number
}

/**
 * Reserved bands for the material headline. Every stage keeps its supporting
 * metadata outside these, so long titles scale down instead of colliding.
 */
export const STAGE_LAYOUTS: Record<StageSize, StageLayout> = {
  full: { fill: 0.8, band: 0.5, centerY: 0.42, leading: 0.9 },
  short: { fill: 0.74, band: 0.3, centerY: 0.32, leading: 0.92 },
}
