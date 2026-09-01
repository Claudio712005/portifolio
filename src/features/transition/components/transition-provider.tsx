'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { prefersReducedMotion, registerGsap } from '@/lib/gsap/register'

interface TransitionValue {
  navigate: (href: string, label?: string) => void
}

const TransitionContext = createContext<TransitionValue | null>(null)

const COVER = 0.52
const REVEAL = 0.62

interface TransitionProviderProps {
  children: ReactNode
}

/**
 * Carries the page out before the next one arrives. A panel sweeps up over the
 * page, the route is pushed while it is covered, and the same panel keeps
 * travelling off the top to reveal what landed — one continuous movement rather
 * than a fade out followed by an unrelated fade in.
 *
 * Internal links are intercepted at the document, so any anchor added later is
 * covered without being rewritten.
 */
export function TransitionProvider({ children }: TransitionProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const pending = useRef<string | null>(null)
  const covered = useRef(false)

  const navigate = useCallback(
    (href: string, next?: string) => {
      if (href === pathname) return

      if (prefersReducedMotion()) {
        router.push(href)
        return
      }

      const panel = panelRef.current
      if (!panel) {
        router.push(href)
        return
      }

      setLabel(next ?? href)
      pending.current = href
      covered.current = false

      const commit = () => {
        if (!pending.current) return
        covered.current = true
        const target = pending.current
        router.push(target)
      }

      /*
       * Navigation must not depend on an animation completing. If the tween is
       * interrupted or never runs, this still gets the visitor to the page.
       */
      const guard = window.setTimeout(commit, COVER * 1000 + 220)

      const gsap = registerGsap()
      gsap.killTweensOf(panel)
      gsap.fromTo(
        panel,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: COVER,
          ease: 'expo.inOut',
          onComplete: () => {
            window.clearTimeout(guard)
            commit()
          },
        },
      )
    },
    [pathname, router],
  )

  /* The panel leaves only once the new route has actually rendered. */
  useEffect(() => {
    const panel = panelRef.current
    if (!panel || !pending.current || !covered.current) return

    pending.current = null
    covered.current = false

    const gsap = registerGsap()
    gsap.to(panel, {
      yPercent: -100,
      duration: REVEAL,
      ease: 'expo.inOut',
      onComplete: () => gsap.set(panel, { yPercent: 100 }),
    })
  }, [pathname])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as Element | null)?.closest?.('a')
      if (!anchor) return
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('mailto:')) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname) return

      /*
       * location.pathname carries the basePath, usePathname does not — the
       * difference between them is the prefix the router must not be given.
       */
      const base = window.location.pathname.slice(
        0,
        window.location.pathname.length - pathname.length,
      )
      const target = url.pathname.startsWith(base)
        ? url.pathname.slice(base.length) || '/'
        : url.pathname

      event.preventDefault()
      navigate(target, anchor.dataset.transitionLabel ?? target)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate, pathname])

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}

      <div
        ref={panelRef}
        aria-hidden="true"
        style={{ transform: 'translateY(100%)' }}
        className="pointer-events-none fixed inset-0 z-[90] border-t-2 border-accent bg-bg"
      >
        <p className="type-meta mx-auto w-full max-w-shell px-5 pt-8 text-fg-subtle lg:px-8">
          <span className="text-accent">{'->'}</span> {label}
        </p>
      </div>
    </TransitionContext.Provider>
  )
}

export function useTransition(): TransitionValue {
  const value = useContext(TransitionContext)

  if (!value) throw new Error('useTransition must be used inside a TransitionProvider')

  return value
}
