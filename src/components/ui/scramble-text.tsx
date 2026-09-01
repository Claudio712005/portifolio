'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/gsap/register'
import { scrambleDuration, scrambleFrame } from '@/lib/text/scramble'

interface ScrambleTextProps {
  text: string
  className?: string
  /** Run once when scrolled into view instead of waiting for a hover. */
  auto?: boolean
  /**
   * Trigger from the nearest `[data-scramble-group]` ancestor rather than from
   * this element, so hovering anywhere on a row resolves its title.
   */
  group?: boolean
}

/**
 * Resolves a label out of noise. The real string always stays in the DOM for
 * assistive tech and search; only a mirrored, hidden-from-AT copy scrambles.
 *
 * Pair with `group` on an ancestor to drive it from a row-wide hover.
 *
 * @example <ScrambleText text={project.name} className="type-display" />
 */
export function ScrambleText({ text, className, auto = false, group = false }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef(0)
  const hostRef = useRef<HTMLSpanElement>(null)

  useEffect(() => setDisplay(text), [text])

  const run = useCallback(() => {
    if (prefersReducedMotion()) return

    cancelAnimationFrame(frameRef.current)

    const duration = scrambleDuration(text) * 1000
    const start = performance.now()
    let tick = 0

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      tick += 1
      setDisplay(scrambleFrame(text, progress, tick))

      if (progress < 1) frameRef.current = requestAnimationFrame(step)
      else setDisplay(text)
    }

    frameRef.current = requestAnimationFrame(step)
  }, [text])

  useEffect(() => {
    const host = hostRef.current
    if (!host || !group) return

    const zone = host.closest('[data-scramble-group]')
    if (!zone) return

    const onEnter = () => run()
    zone.addEventListener('pointerenter', onEnter)

    return () => zone.removeEventListener('pointerenter', onEnter)
  }, [group, run])

  useEffect(() => {
    const host = hostRef.current
    if (!host || !auto) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          run()
          observer.disconnect()
        }
      },
      { rootMargin: '-15% 0px' },
    )

    observer.observe(host)
    return () => observer.disconnect()
  }, [auto, run])

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  return (
    <span
      ref={hostRef}
      className={className}
      onPointerEnter={auto || group ? undefined : run}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  )
}
