'use client'

import { useThreeRenderer } from '@/hooks/use-three-renderer'
import { createParticleConstellationScene } from '@/lib/three/scenes/particle-constellation'

export function HeroThreeBg() {
  const { canvasRef } = useThreeRenderer(createParticleConstellationScene)
  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      aria-hidden="true"
    />
  )
}
