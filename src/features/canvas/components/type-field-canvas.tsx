'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { TypeField } from '@/lib/canvas/type-field'
import { readDisplayFontFamily, readThemePalette } from '@/lib/canvas/theme-palette'
import { useTypeStage } from './type-stage'

const WEIGHT = 800

/**
 * Mounts the WebGL layer once for the whole locale and keeps it alive across
 * navigations. Every effect here is a subscription; the rendering itself lives
 * in `TypeField`.
 */
interface TypeFieldCanvasProps {
  onReady?: () => void
}

export function TypeFieldCanvas({ onReady }: TypeFieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fieldRef = useRef<TypeField | null>(null)
  const { lines, layout } = useTypeStage()
  const { resolvedTheme } = useTheme()
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady
  const layoutRef = useRef(layout)
  layoutRef.current = layout

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let field: TypeField
    try {
      field = new TypeField({
        canvas,
        text: {
          lines,
          fontFamily: readDisplayFontFamily(),
          fontWeight: WEIGHT,
          ...layoutRef.current,
        },
        palette: readThemePalette(),
        onFirstFrame: () => onReadyRef.current?.(),
      })
    } catch {
      /* No WebGL: the DOM fallback beneath this canvas is already correct. */
      return
    }

    fieldRef.current = field
    field.start()

    /* The first paint can land before the display face is ready. */
    void document.fonts.ready.then(() => {
      field.setText({
        lines,
        fontFamily: readDisplayFontFamily(),
        fontWeight: WEIGHT,
        ...layoutRef.current,
      })
    })

    const onResize = () => field.resize()
    const onPointerMove = (event: PointerEvent) => {
      field.setPointer(event.clientX / window.innerWidth, 1 - event.clientY / window.innerHeight, 1)
    }
    const onPointerLeave = () => field.setPointer(0.5, 0.5, 0)
    const onScroll = () => {
      field.setProgress(Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1))
    }
    const onVisibility = () => (document.hidden ? field.stop() : field.start())

    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibility)
    onScroll()

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      field.dispose()
      fieldRef.current = null
    }
    /* Mount once: later headline and theme changes are pushed by the effects below. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fieldRef.current?.setText(
      {
        lines,
        fontFamily: readDisplayFontFamily(),
        fontWeight: WEIGHT,
        ...layout,
      },
      true,
    )
  }, [lines, layout])

  useEffect(() => {
    fieldRef.current?.setPalette(readThemePalette())
  }, [resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full"
    />
  )
}
