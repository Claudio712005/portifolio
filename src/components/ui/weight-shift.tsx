'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion, registerGsap } from '@/lib/gsap/register'

interface WeightShiftProps {
  children: string
  className?: string
  from?: number
  to?: number
}

/**
 * Rides the display face's weight axis as the element crosses the viewport, so
 * the type itself carries the movement instead of a box sliding under it. Only
 * worth using on a variable face — which is why the display voice is one.
 *
 * @example <WeightShift from={200} to={700}>Backend</WeightShift>
 */
export function WeightShift({ children, className, from = 240, to = 700 }: WeightShiftProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion()) return

    const gsap = registerGsap()
    const axis = { weight: from }

    const context = gsap.context(() => {
      gsap.to(axis, {
        weight: to,
        ease: 'none',
        onUpdate: () => {
          element.style.fontVariationSettings = `'wght' ${Math.round(axis.weight)}`
        },
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          end: 'top 42%',
          scrub: 0.5,
        },
      })
    }, element)

    return () => {
      context.revert()
      element.style.fontVariationSettings = ''
    }
  }, [from, to])

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  )
}
