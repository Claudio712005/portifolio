'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { MOTION, prefersReducedMotion, registerGsap } from '@/lib/gsap/register'

interface TimelineRailProps {
  children: ReactNode
  className?: string
}

/**
 * Vertical rule that draws downward as the run scrolls past, so the entries
 * beside it read as one continuous history rather than separate blocks.
 *
 * @example <TimelineRail className="mt-16">{entries}</TimelineRail>
 */
export function TimelineRail({ children, className }: TimelineRailProps) {
  const railRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const rail = railRef.current
    if (!rail || prefersReducedMotion()) return

    const gsap = registerGsap()
    const context = gsap.context(() => {
      gsap.from(rail, {
        scaleY: 0,
        duration: 1.2,
        ease: MOTION.ease,
        scrollTrigger: { trigger: rail, start: 'top 85%', once: true },
      })
    }, rail)

    return () => context.revert()
  }, [])

  return (
    <div className={className ? `relative ${className}` : 'relative'}>
      <span
        ref={railRef}
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-px origin-top bg-line"
      />
      {children}
    </div>
  )
}
