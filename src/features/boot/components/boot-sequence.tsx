'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { MOTION, registerGsap } from '@/lib/gsap/register'
import type { Dictionary } from '@/types/dictionary'

interface BootSequenceProps {
  dict: Dictionary['boot']
  locale: string
  projectCount: number
}

/** Nothing resolves faster than this, so the sequence reads rather than blinks. */
const MIN_DURATION = 2500
/** Where each line lands inside that window, as a share of it. */
const BEATS = [0.14, 0.38, 0.62, 0.86]

/**
 * The site starting up. Every line names something the page genuinely needed —
 * the face, a WebGL context, the resolved locale, the catalogue — and the
 * sequence will not leave until the fonts have actually loaded, however fast
 * the beats read. On a warm cache that wait is nothing; on a cold one it is
 * the reason the intro exists.
 */
export function BootSequence({ dict, locale, projectCount }: BootSequenceProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const [done, setDone] = useState(0)
  const [gone, setGone] = useState(false)
  const leaving = useRef(false)

  const steps = [
    { label: dict.typeface, value: 'Zodiak' },
    { label: dict.renderer, value: 'WebGL' },
    { label: dict.locale, value: locale },
    { label: dict.projects, value: String(projectCount) },
  ]
  const total = BEATS.length

  const leave = useCallback(() => {
    const host = hostRef.current
    if (!host || leaving.current) return
    leaving.current = true

    document.documentElement.style.overflow = ''

    try {
      sessionStorage.setItem('boot', '1')
    } catch {
      /* Private mode: the intro simply plays again next time. */
    }

    registerGsap().to(host, {
      yPercent: -100,
      duration: 0.9,
      ease: 'expo.inOut',
      onComplete: () => setGone(true),
    })
  }, [])

  useEffect(() => {
    if (document.documentElement.classList.contains('boot-done')) {
      setGone(true)
      return
    }

    document.documentElement.style.overflow = 'hidden'

    const timers = BEATS.map((beat, index) =>
      window.setTimeout(() => setDone(index + 1), MIN_DURATION * beat),
    )

    let ready = false
    void document.fonts.ready.then(() => {
      ready = true
    })

    /* The floor is the minimum duration; the ceiling is real font readiness. */
    let poll = 0
    const settle = window.setTimeout(function waitForReady() {
      if (ready) leave()
      else poll = window.setTimeout(waitForReady, 90)
    }, MIN_DURATION)

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') leave()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      timers.forEach(window.clearTimeout)
      window.clearTimeout(settle)
      window.clearTimeout(poll)
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [leave])

  /* The number chases the beats instead of counting a clock of its own. */
  useEffect(() => {
    const counter = counterRef.current
    if (!counter) return

    const value = { n: Number(counter.dataset.value ?? 0) }

    const tween = registerGsap().to(value, {
      n: Math.round((done / total) * 100),
      duration: MOTION.layout,
      ease: 'power2.out',
      onUpdate: () => {
        counter.dataset.value = String(value.n)
        counter.textContent = String(Math.round(value.n)).padStart(3, '0')
      },
    })

    return () => {
      tween.kill()
    }
  }, [done, total])

  if (gone) return null

  return (
    <div
      ref={hostRef}
      data-boot
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg py-8"
    >
      <div className="mx-auto w-full max-w-shell px-5 lg:px-8">
        <p className="type-meta text-fg-subtle">
          <span className="text-accent">{'//'}</span> {dict.title}
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-shell flex-col gap-10 px-5 sm:flex-row sm:items-end sm:justify-between lg:px-8">
        <ul className="space-y-2 font-mono text-xs sm:text-sm">
          {steps.map((step, index) => (
            <li
              key={step.label}
              className="flex items-center gap-3 transition-opacity duration-500"
              style={{ opacity: index < done ? 1 : 0.22 }}
            >
              <span className={index < done ? 'text-accent' : 'text-fg-subtle'}>
                {index < done ? '[ok]' : '[..]'}
              </span>
              <span className="min-w-[8rem] uppercase tracking-[0.14em] text-fg-muted">
                {step.label}
              </span>
              <span className="text-fg">{step.value}</span>
            </li>
          ))}
        </ul>

        <p className="type-display text-d2 leading-none text-fg">
          <span ref={counterRef} data-value="0">
            000
          </span>
          <span className="text-accent">%</span>
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-shell items-center justify-between px-5 lg:px-8">
        <span className="type-meta text-fg-subtle">{done === total ? dict.ready : ''}</span>
        <button
          type="button"
          onClick={leave}
          className="type-meta rounded-[3px] text-fg-subtle transition-colors hover:text-accent"
        >
          {dict.skip}
        </button>
      </div>
    </div>
  )
}
