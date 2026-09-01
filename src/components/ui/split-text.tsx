'use client'

import { useEffect, useRef } from 'react'
import { MOTION, prefersReducedMotion, registerGsap } from '@/lib/gsap/register'

interface SplitTextProps {
  text: string
  className?: string
}

/**
 * Sets a statement word by word so it arrives as speech rather than as a block
 * fading in. The full string stays in the DOM as normal text, so selection,
 * translation and screen readers are unaffected.
 *
 * @example <SplitText text={basics.valueProp} className="text-d2" />
 */
export function SplitText({ text, className }: SplitTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion()) return

    const gsap = registerGsap()
    const words = element.querySelectorAll('[data-word]')

    const context = gsap.context(() => {
      gsap.from(words, {
        opacity: 0,
        yPercent: 60,
        duration: 0.85,
        ease: MOTION.ease,
        stagger: 0.028,
        scrollTrigger: { trigger: element, start: 'top 78%', once: true },
      })
    }, element)

    return () => context.revert()
  }, [text])

  return (
    <p ref={ref} className={className}>
      {text.split(' ').map((word, position) => (
        <span key={`${word}-${position}`} className="inline-block overflow-hidden align-bottom">
          <span data-word className="inline-block">
            {word}
            {position < text.split(' ').length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </p>
  )
}
