'use client'

import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, registerGsap } from '@/lib/gsap/register'

interface StatusDotProps {
  className?: string
}

/**
 * Availability indicator. Breathes only while on screen, and holds steady for
 * visitors who ask for reduced motion.
 *
 * @example <StatusDot className="h-1.5 w-1.5 rounded-full bg-accent" />
 */
export function StatusDot({ className }: StatusDotProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const dot = ref.current
    if (!dot || prefersReducedMotion()) return

    const gsap = registerGsap()
    const context = gsap.context(() => {
      const pulse = gsap.to(dot, {
        opacity: 0.35,
        scale: 0.78,
        duration: 1.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      ScrollTrigger.create({
        trigger: dot,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (self.isActive ? pulse.play() : pulse.pause()),
      })
    }, dot)

    return () => context.revert()
  }, [])

  return <span ref={ref} aria-hidden="true" className={className} />
}
