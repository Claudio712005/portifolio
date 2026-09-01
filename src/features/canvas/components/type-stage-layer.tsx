'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useArmed } from '@/hooks/use-armed'
import { useMediaQuery } from '@/hooks/use-media-query'
import { TypeFieldFallback } from './type-field-fallback'

/* three.js is pulled in only once WebGL is actually going to be used. */
const TypeFieldCanvas = dynamic(
  () => import('./type-field-canvas').then((module) => module.TypeFieldCanvas),
  { ssr: false },
)

/**
 * Chooses the medium for the headline. WebGL only earns its place on a pointer
 * device with motion allowed; everywhere else the type version is the design,
 * not an apology for one.
 */
export function TypeStageLayer() {
  const armed = useArmed()
  const compact = useMediaQuery('(max-width: 767px)')
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const coarse = useMediaQuery('(pointer: coarse)')
  const [painted, setPainted] = useState(false)

  const useWebgl = armed && !compact && !reduced && !coarse

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <TypeFieldFallback hidden={useWebgl && painted} />
      {useWebgl && <TypeFieldCanvas onReady={() => setPainted(true)} />}
    </div>
  )
}
