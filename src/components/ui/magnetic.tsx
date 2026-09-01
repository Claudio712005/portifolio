'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { prefersReducedMotion, registerGsap } from '@/lib/gsap/register'

interface MagneticProps {
  children: ReactNode
  /** Share of the cursor offset the element follows. */
  strength?: number
  className?: string
}

/**
 * Lets an element lean toward the cursor while it is nearby, then spring back.
 * Pointer-device only: on touch there is no hover to reward, and on reduced
 * motion the element simply stays put.
 *
 * @example <Magnetic strength={0.4}><ArrowButton /></Magnetic>
 */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion()) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const gsap = registerGsap()
    const moveX = gsap.quickTo(element, 'x', { duration: 0.5, ease: 'power3.out' })
    const moveY = gsap.quickTo(element, 'y', { duration: 0.5, ease: 'power3.out' })

    const onMove = (event: PointerEvent) => {
      const box = element.getBoundingClientRect()
      moveX((event.clientX - (box.left + box.width / 2)) * strength)
      moveY((event.clientY - (box.top + box.height / 2)) * strength)
    }

    const onLeave = () => {
      moveX(0)
      moveY(0)
    }

    const zone = element.parentElement ?? element
    zone.addEventListener('pointermove', onMove)
    zone.addEventListener('pointerleave', onLeave)

    return () => {
      zone.removeEventListener('pointermove', onMove)
      zone.removeEventListener('pointerleave', onLeave)
      gsap.killTweensOf(element)
    }
  }, [strength])

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  )
}
