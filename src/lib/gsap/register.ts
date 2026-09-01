import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

/**
 * Registers the plugins once per session and hands back the shared instance.
 * Safe to call from any client effect; never call during render.
 */
export function registerGsap(): typeof gsap {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }

  return gsap
}

/** House curves and durations, so timelines across the site read as one hand. */
export const MOTION = {
  ease: 'expo.out',
  easeInOut: 'power2.inOut',
  feedback: 0.15,
  state: 0.3,
  layout: 0.45,
  focal: 0.9,
} as const

/** Sibling offset for a list, capped so a long list never stalls. */
export function listDelay(index: number): number {
  return Math.min(index * 0.055, 0.28)
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
