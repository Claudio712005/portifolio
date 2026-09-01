'use client'

import { useCallback, useEffect, useRef } from 'react'
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

  /*
   * Deferred work — font loading, resize, the mount effect itself — must read
   * the headline that is current when it runs, never the one that was current
   * when it was scheduled. A late callback holding a stale closure repaints the
   * previous page's title and nothing corrects it until the next navigation.
   */
  const linesRef = useRef(lines)
  linesRef.current = lines
  const layoutRef = useRef(layout)
  layoutRef.current = layout

  const buildRequest = useCallback(
    () => ({
      lines: linesRef.current,
      fontFamily: readDisplayFontFamily(),
      fontWeight: WEIGHT,
      ...layoutRef.current,
    }),
    [],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let field: TypeField
    try {
      field = new TypeField({
        canvas,
        text: buildRequest(),
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
    void document.fonts.ready.then(() => field.setText(buildRequest()))

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
  }, [buildRequest])

  useEffect(() => {
    fieldRef.current?.setText(buildRequest(), true)
  }, [lines, layout, buildRequest])

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
