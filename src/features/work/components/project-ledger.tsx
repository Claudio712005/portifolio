'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/ui/icon'
import { prefersReducedMotion, registerGsap } from '@/lib/gsap/register'
import type { ProjectEntry } from '@/lib/projects'
import type { Dictionary } from '@/types/dictionary'

interface ProjectLedgerProps {
  projects: ProjectEntry[]
  dict: Dictionary['work']
  locale: string
}

/**
 * The full catalogue, set as a ledger rather than as the generous rows the home
 * page uses for its selection. One line per project, the year pinned at the
 * left while its run scrolls past, and the problem statement carried in a panel
 * that follows the cursor — the detail lives in the pointer, not in the row.
 *
 * @example <ProjectLedger projects={entries} dict={dict.work} locale="pt-BR" />
 */
export function ProjectLedger({ projects, dict, locale }: ProjectLedgerProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [year, setYear] = useState(projects[0]?.year ?? '')
  const [preview, setPreview] = useState<ProjectEntry | null>(null)

  /* Rows print in from the left instead of fading up like every other list. */
  useEffect(() => {
    const list = listRef.current
    if (!list || prefersReducedMotion()) return

    const gsap = registerGsap()
    const context = gsap.context(() => {
      gsap.from(list.querySelectorAll('[data-row]'), {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
        duration: 0.75,
        ease: 'expo.out',
        stagger: 0.045,
        scrollTrigger: { trigger: list, start: 'top 80%', once: true },
      })
    }, list)

    return () => context.revert()
  }, [])

  /* The pinned year follows whichever run of projects is on screen. */
  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const rows = Array.from(list.querySelectorAll<HTMLElement>('[data-row]'))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        const first = visible[0]?.target as HTMLElement | undefined
        if (first?.dataset.year) setYear(first.dataset.year)
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )

    rows.forEach((row) => observer.observe(row))
    return () => observer.disconnect()
  }, [])

  /* The panel trails the cursor rather than snapping to it. */
  useEffect(() => {
    const panel = panelRef.current
    if (!panel || prefersReducedMotion()) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const gsap = registerGsap()
    const moveX = gsap.quickTo(panel, 'x', { duration: 0.55, ease: 'power3.out' })
    const moveY = gsap.quickTo(panel, 'y', { duration: 0.55, ease: 'power3.out' })

    const onMove = (event: PointerEvent) => {
      moveX(event.clientX + 24)
      moveY(event.clientY - 12)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div className="relative grid gap-x-10 lg:grid-cols-[6rem_minmax(0,1fr)]">
      <p className="type-meta sticky top-24 hidden h-fit text-accent lg:block">{year}</p>

      <div ref={listRef} onPointerLeave={() => setPreview(null)}>
        {projects.map((project) => (
          <Link
            key={project.slug}
            data-row
            data-year={project.year}
            data-transition-label={project.name}
            href={`/${locale}/projects/${project.slug}`}
            onPointerEnter={() => setPreview(project)}
            className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-x-5 border-t border-line py-5 transition-colors last:border-b hover:border-line-strong lg:gap-x-8"
          >
            <span className="type-meta text-fg-subtle transition-colors group-hover:text-accent">
              {project.index}
            </span>

            <span className="min-w-0">
              <span className="type-display block text-balance text-xl lg:truncate text-fg transition-transform duration-500 ease-out group-hover:translate-x-2 lg:text-2xl">
                {project.name}
              </span>
              <span className="mt-1.5 block font-mono text-[11px] text-fg-subtle lg:hidden">
                {project.techs.slice(0, 3).join('  ·  ')}
              </span>
            </span>

            <span className="flex shrink-0 items-baseline gap-6">
              <span className="hidden font-mono text-[11px] text-fg-subtle lg:inline">
                {project.techs.length} · {project.repoUrl ? 'repo' : dict.no_repo}
              </span>
              <span className="type-meta text-fg-subtle lg:hidden">{project.year}</span>
              <Icon
                name="arrow-right"
                className="h-4 w-4 shrink-0 text-fg-subtle opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent group-hover:opacity-100"
              />
            </span>
          </Link>
        ))}
      </div>

      <div
        ref={panelRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[22rem] border-l-2 border-accent bg-surface/95 p-5 backdrop-blur-sm transition-opacity duration-300 lg:block"
        style={{ opacity: preview ? 1 : 0 }}
      >
        <p className="type-meta text-accent">{dict.problem_title}</p>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-fg-muted">
          {preview?.problem}
        </p>
      </div>
    </div>
  )
}
