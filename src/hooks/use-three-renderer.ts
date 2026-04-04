'use client'

import { useEffect, useRef } from 'react'
import type { SceneFactory } from '@/lib/three/types'

export function useThreeRenderer(createScene: SceneFactory) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let animationId = 0
    let disposed = false
    let fullCleanup: (() => void) | undefined

    const init = async () => {
      const THREE = await import('three')
      if (disposed) return

      const w = canvas.clientWidth || window.innerWidth
      const h = canvas.clientHeight || window.innerHeight

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(w, h, false)
      renderer.setClearColor(0x000000, 0)

      const { scene, camera, update, dispose: disposeScene } = createScene(w, h)
      const clock = new THREE.Clock()

      const animate = () => {
        if (disposed) return
        animationId = requestAnimationFrame(animate)
        update(clock.getElapsedTime())
        renderer.render(scene, camera)
      }
      animate()

      const handleResize = () => {
        const nw = canvas.clientWidth
        const nh = canvas.clientHeight
        if (nw === 0 || nh === 0) return
        camera.aspect = nw / nh
        camera.updateProjectionMatrix()
        renderer.setSize(nw, nh, false)
      }

      const observer = new ResizeObserver(handleResize)
      observer.observe(canvas)

      fullCleanup = () => {
        disposed = true
        cancelAnimationFrame(animationId)
        observer.disconnect()
        disposeScene()
        renderer.dispose()
      }
    }

    init()

    return () => {
      disposed = true
      fullCleanup?.()
    }
  }, [createScene])

  return { canvasRef }
}
