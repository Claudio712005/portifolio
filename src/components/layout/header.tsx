'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { Icon } from '@/components/ui/icon'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LanguageSwitcher } from './language-switcher'
import { useScrolled } from '@/hooks/use-scrolled'
import { MOTION, prefersReducedMotion, registerGsap } from '@/lib/gsap/register'
import { homeHref, type NavLink } from '@/lib/nav-links'
import type { Dictionary } from '@/types/dictionary'

interface HeaderProps {
  dict: Dictionary['nav']
  links: NavLink[]
  locale: string
}

export function Header({ dict, links, locale }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled()
  const pathname = usePathname()

  const listRef = useRef<HTMLUListElement>(null)
  const markerRef = useRef<HTMLSpanElement>(null)
  const mobileRef = useRef<HTMLElement>(null)
  const mobileMounted = useRef(false)

  const activeIndex = links.findIndex(
    (link) => link.segment !== null && pathname.startsWith(`/${locale}/${link.segment}`),
  )

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    const panel = mobileRef.current
    if (!panel) return

    if (!mobileMounted.current) {
      mobileMounted.current = true
      return
    }

    const gsap = registerGsap()
    const duration = prefersReducedMotion() ? 0 : MOTION.layout
    gsap.killTweensOf(panel)

    if (menuOpen) {
      gsap.set(panel, { visibility: 'visible' })
      gsap.to(panel, { height: 'auto', opacity: 1, duration, ease: MOTION.ease })
      return
    }

    gsap.to(panel, {
      height: 0,
      opacity: 0,
      duration,
      ease: MOTION.easeInOut,
      onComplete: () => gsap.set(panel, { visibility: 'hidden' }),
    })
  }, [menuOpen])

  /* The marker travels between items so the change of route reads as movement. */
  useEffect(() => {
    const list = listRef.current
    const marker = markerRef.current
    if (!list || !marker) return

    const gsap = registerGsap()

    if (activeIndex < 0) {
      gsap.to(marker, { opacity: 0, duration: MOTION.feedback })
      return
    }

    const item = list.children[activeIndex]
    if (!(item instanceof HTMLElement)) return

    gsap.to(marker, {
      opacity: 1,
      x: item.offsetLeft,
      width: item.offsetWidth,
      duration: prefersReducedMotion() ? 0 : MOTION.state,
      ease: MOTION.ease,
    })
  }, [activeIndex, links.length])

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled || menuOpen
          ? 'border-line bg-bg/80 backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-shell items-center justify-between gap-4 px-5 lg:px-8">
        <Link
          href={homeHref(locale)}
          className="group flex items-center gap-2 rounded-[3px] font-mono text-sm font-medium tracking-tight text-fg"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-200 group-hover:scale-150" />
          {dict.logo}
        </Link>

        <nav aria-label={dict.primary_nav} className="hidden md:block">
          <ul ref={listRef} className="relative flex items-center gap-1">
            {links.map((link) => {
              const isActive =
                link.segment !== null && pathname.startsWith(`/${locale}/${link.segment}`)

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={clsx(
                      'block rounded-[4px] px-3 py-2 text-sm transition-colors',
                      isActive ? 'text-fg' : 'text-fg-muted hover:text-fg',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}

            <span
              ref={markerRef}
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-px bg-accent opacity-0"
            />
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle label={dict.theme_toggle} />
          <LanguageSwitcher locale={locale} label={dict.language_select} />
          <button
            type="button"
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label={menuOpen ? dict.close_menu : dict.open_menu}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg md:hidden"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      <nav
        ref={mobileRef}
        id="mobile-nav"
        aria-label={dict.primary_nav}
        data-disclosure
        data-open={menuOpen ? 'true' : 'false'}
        className="border-t border-line bg-bg md:hidden"
      >
        <ul className="mx-auto max-w-shell px-5 py-2">
          {links.map((link) => (
            <li key={link.href} className="border-b border-line/70 last:border-b-0">
              <Link
                href={link.href}
                className="block py-3.5 text-base text-fg-muted transition-colors hover:text-fg"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
