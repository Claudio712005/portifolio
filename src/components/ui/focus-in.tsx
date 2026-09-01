'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { prefersReducedMotion, registerGsap } from '@/lib/gsap/register'

interface FocusInProps {
  children: ReactNode
  className?: string
  index?: number
}

/**
 * Brings a block into focus rather than moving it: blur resolves to sharp with
 * no travel at all. Calm enough to sit under long-form reading, and distinct
 * from every other entrance on the site.
 *
 * @example <FocusIn index={1}><p>{paragraph}</p></FocusIn>
 */
export function FocusIn({ children, className, index = 0 }: FocusInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion()) return

    const gsap = registerGsap()
    const context = gsap.context(() => {
      gsap.from(element, {
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1,
        ease: 'power2.out',
        delay: Math.min(index * 0.08, 0.32),
        scrollTrigger: { trigger: element, start: 'top 85%', once: true },
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
