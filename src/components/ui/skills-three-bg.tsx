'use client'

import { useThreeRenderer } from '@/hooks/use-three-renderer'
import { createWaveMeshScene } from '@/lib/three/scenes/wave-mesh'

export function SkillsThreeBg() {
  const { canvasRef } = useThreeRenderer(createWaveMeshScene)
  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
      aria-hidden="true"
    />
  )
}
