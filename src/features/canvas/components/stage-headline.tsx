'use client'

import { useEffect } from 'react'
import type { StageSize } from '@/lib/canvas/stage-layout'
import { useTypeStage } from './type-stage'

interface StageHeadlineProps {
  /** Rendered as material by the canvas, one entry per line. */
  lines: string[]
  /** Which reserved band the headline has to fit inside. */
  size?: StageSize
}

/**
 * Publishes a page's headline to the WebGL layer. Renders nothing: the visible
 * heading stays in the DOM as real text elsewhere on the page.
 *
 * @example <StageHeadline lines={['Cláudio', 'Araújo']} size="full" />
 */
export function StageHeadline({ lines, size = 'full' }: StageHeadlineProps) {
  const { setStage } = useTypeStage()
  const key = lines.join('\u0000')

  useEffect(() => {
    setStage({ lines: key.split('\u0000'), size })
  }, [key, size, setStage])

  return null
}
