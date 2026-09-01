'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { prefersReducedMotion, registerGsap } from '@/lib/gsap/register'

interface WipeInProps {
  children: ReactNode
  className?: string
  /** Tie the wipe to scroll position rather than playing it once on entry. */
  scrub?: boolean
}

/**
 * Uncovers a block left to right, as though it were being printed. Deliberately
 * not a fade or a rise: on a page that already uses both, the difference is the
 * point.
 *
 * @example <WipeIn scrub><p className="text-2xl">{project.problem}</p></WipeIn>
 */
export function WipeIn({ children, className, scrub = false }: WipeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion()) return

    const gsap = registerGsap()
    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          ease: scrub ? 'none' : 'expo.out',
          duration: scrub ? 1 : 1.1,
          scrollTrigger: scrub
            ? { trigger: element, start: 'top 85%', end: 'bottom 62%', scrub: 0.5 }
            : { trigger: element, start: 'top 85%', once: true },
        },
      )
    }, element)

    return () => context.revert()
  }, [scrub])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
