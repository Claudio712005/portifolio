'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion, registerGsap } from '@/lib/gsap/register'

interface StackGridProps {
  techs: string[]
}

/**
 * The stack as a numbered run. Each entry settles from slightly behind the
 * page, so the list assembles rather than appearing — a third entrance on a
 * route that already wipes and draws.
 *
 * @example <StackGrid techs={project.techs} />
 */
export function StackGrid({ techs }: StackGridProps) {
  const ref = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const list = ref.current
    if (!list || prefersReducedMotion()) return

    const gsap = registerGsap()
    const context = gsap.context(() => {
      gsap.from(list.children, {
        opacity: 0,
        scale: 0.86,
        filter: 'blur(6px)',
        duration: 0.6,
        ease: 'expo.out',
        stagger: 0.035,
        scrollTrigger: { trigger: list, start: 'top 88%', once: true },
      })
    }, list)

    return () => context.revert()
  }, [])

  return (
    <ol ref={ref} className="mt-6 border-t border-line">
      {techs.map((tech, index) => (
        <li
          key={tech}
          className="flex items-baseline gap-4 border-b border-line py-2.5 font-mono text-xs text-fg-muted"
        >
          <span className="text-fg-subtle">{String(index + 1).padStart(2, '0')}</span>
          <span>{tech}</span>
        </li>
      ))}
    </ol>
  )
}
