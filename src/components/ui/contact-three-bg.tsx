'use client'

import { useThreeRenderer } from '@/hooks/use-three-renderer'
import { createFloatingGeometryScene } from '@/lib/three/scenes/floating-geometry'

export function ContactThreeBg() {
  const { canvasRef } = useThreeRenderer(createFloatingGeometryScene)
  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
      aria-hidden="true"
    />
  )
}
