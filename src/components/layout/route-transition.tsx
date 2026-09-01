'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { MOTION, prefersReducedMotion, registerGsap } from '@/lib/gsap/register'

interface RouteTransitionProps {
  children: ReactNode
}

/**
 * Brings a newly navigated page in. The headline itself is handled by the
 * WebGL layer, which melts and reforms on the same beat — this only moves the
 * page body so the two arrive together.
 */
export function RouteTransition({ children }: RouteTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion()) return

    const gsap = registerGsap()
    const tween = gsap.fromTo(
      element,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: MOTION.layout, ease: MOTION.ease },
    )

    return () => {
      tween.kill()
      gsap.set(element, { clearProps: 'opacity,transform' })
    }
  }, [pathname])

  return <div ref={ref}>{children}</div>
}
