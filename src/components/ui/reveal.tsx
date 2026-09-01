'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { MOTION, listDelay, prefersReducedMotion, registerGsap } from '@/lib/gsap/register'

interface RevealProps {
  children: ReactNode
  /** Position in a list; the sibling offset it produces is capped. */
  index?: number
  className?: string
}

/**
 * Scroll-triggered arrival. Animates *from* the finished state, so the server
 * HTML is already correct and a blocked script leaves the content visible.
 *
 * @example <Reveal index={2}><ProjectRow … /></Reveal>
 */
export function Reveal({ children, index = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion()) return

    const gsap = registerGsap()
    const context = gsap.context(() => {
      gsap.from(element, {
        opacity: 0,
        y: 24,
        duration: MOTION.focal,
        ease: MOTION.ease,
        delay: listDelay(index),
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      })
    }, element)

    return () => context.revert()
  }, [index])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
