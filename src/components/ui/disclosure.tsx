'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { MOTION, prefersReducedMotion, registerGsap } from '@/lib/gsap/register'

interface DisclosureProps {
  /** Referenced by the trigger's `aria-controls`. */
  id: string
  open: boolean
  children: ReactNode
  className?: string
}

/**
 * Region that opens and closes with its own height, so content below moves once
 * and continuously. The collapsed state is CSS, not script, so the server HTML
 * is already correct; GSAP only takes over for the transition itself.
 *
 * @example <Disclosure id="details-1" open={open}>{details}</Disclosure>
 */
export function Disclosure({ id, open, children, className }: DisclosureProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mounted = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (!mounted.current) {
      mounted.current = true
      return
    }

    const gsap = registerGsap()
    const duration = prefersReducedMotion() ? 0 : MOTION.layout
    gsap.killTweensOf(element)

    if (open) {
      gsap.set(element, { visibility: 'visible' })
      gsap.to(element, { height: 'auto', opacity: 1, duration, ease: MOTION.ease })
      return
    }

    gsap.to(element, {
      height: 0,
      opacity: 0,
      duration,
      ease: MOTION.easeInOut,
      onComplete: () => gsap.set(element, { visibility: 'hidden' }),
    })
  }, [open])

  return (
    <div id={id} ref={ref} data-disclosure data-open={open ? 'true' : 'false'}>
      <div className={className}>{children}</div>
    </div>
  )
}
