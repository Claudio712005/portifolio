'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { Icon } from '@/components/ui/icon'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LanguageSwitcher } from './language-switcher'
import { useActiveSection } from '@/hooks/use-active-section'
import { useScrolled } from '@/hooks/use-scrolled'
import type { NavSection } from '@/lib/nav-sections'
import type { Dictionary } from '@/types/dictionary'

interface HeaderProps {
  dict: Dictionary['nav']
  sections: NavSection[]
  locale: string
}

const SECTION_IDS_FALLBACK: string[] = []

export function Header({ dict, sections, locale }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled()
  const activeId = useActiveSection(sections.map((section) => section.id) ?? SECTION_IDS_FALLBACK)

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 border-b transition-colors duration-300',
        scrolled || menuOpen
          ? 'border-line bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-shell items-center justify-between gap-4 px-5 lg:px-8">
        <a
          href="#hero"
          className="group flex items-center gap-2 rounded-[3px] font-mono text-sm font-medium tracking-tight text-fg"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform group-hover:scale-125" aria-hidden="true" />
          {dict.logo}
        </a>

        <nav aria-label={dict.primary_nav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {sections.map((section, index) => {
              const isActive = activeId === section.id
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={clsx(
                      'group flex items-baseline gap-1.5 rounded-[4px] px-3 py-2 text-sm transition-colors',
                      isActive ? 'text-fg' : 'text-fg-muted hover:text-fg',
                    )}
                  >
                    <span
                      className={clsx(
                        'font-mono text-[10px] transition-colors',
                        isActive ? 'text-accent' : 'text-fg-subtle group-hover:text-accent',
                      )}
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {section.label}
                  </a>
                </li>
              )
            })}
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
            className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg lg:hidden"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label={dict.primary_nav} className="border-t border-line bg-bg lg:hidden">
          <ul className="mx-auto max-w-shell px-5 py-2">
            {sections.map((section, index) => (
              <li key={section.id} className="border-b border-line/70 last:border-b-0">
                <a
                  href={`#${section.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-3 py-3 text-base text-fg-muted transition-colors hover:text-fg"
                >
                  <span className="font-mono text-[10px] text-accent" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
