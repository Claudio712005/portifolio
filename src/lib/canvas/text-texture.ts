export interface TextTextureRequest {
  lines: string[]
  /** CSS font-family stack the page is actually using. */
  fontFamily: string
  fontWeight: number
  /** Share of the canvas width the longest line should occupy, 0–1. */
  fill: number
  /** Share of the canvas height the whole block may occupy, 0–1. */
  band: number
  /** Vertical centre of the block, as a share of canvas height. */
  centerY: number
  /** Multiplier applied to the natural line height. */
  leading: number
}

const REFERENCE_SIZE = 200

/**
 * Draws the headline into an offscreen 2D canvas as pure coverage: white on
 * transparent, no colour. The shader treats the result as a material to bend,
 * so the colour decision stays in one place — the fragment stage.
 *
 * The block is fitted to both the width share and the reserved band, so a long
 * three-line title scales down rather than running into the page below it.
 */
export function paintTextTexture(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  request: TextTextureRequest,
): void {
  const context = canvas.getContext('2d')
  if (!context) return

  canvas.width = Math.max(1, Math.round(width))
  canvas.height = Math.max(1, Math.round(height))

  context.clearRect(0, 0, canvas.width, canvas.height)
  if (request.lines.length === 0) return

  const font = (size: number) => `${request.fontWeight} ${size}px ${request.fontFamily}`

  context.font = font(REFERENCE_SIZE)
  const widest = request.lines.reduce(
    (max, line) => Math.max(max, context.measureText(line).width),
    0,
  )
  if (widest === 0) return

  const byWidth = (canvas.width * request.fill * REFERENCE_SIZE) / widest
  const blockUnits = REFERENCE_SIZE * request.leading * request.lines.length
  const byHeight = (canvas.height * request.band * REFERENCE_SIZE) / blockUnits
  const size = Math.min(byWidth, byHeight)

  context.font = font(size)
  context.fillStyle = '#ffffff'
  context.textAlign = 'center'
  context.textBaseline = 'middle'

  const step = size * request.leading
  const top = canvas.height * request.centerY - (step * (request.lines.length - 1)) / 2

  request.lines.forEach((line, index) => {
    context.fillText(line, canvas.width / 2, top + step * index)
  })
}
