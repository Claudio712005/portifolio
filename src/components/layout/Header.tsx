import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import type { Dictionary } from '@/types/dictionary'

interface HeaderProps {
  dict: Dictionary['nav']
  locale: string
}

export function Header({ dict, locale }: HeaderProps) {
  const navItems = [
    { href: '#about', label: dict.about },
    { href: '#skills', label: dict.skills },
    { href: '#projects', label: dict.projects },
    { href: '#experience', label: dict.experience },
    { href: '#education', label: dict.education },
    { href: '#contact', label: dict.contact },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <span className="font-mono text-lg font-bold text-indigo-600 dark:text-indigo-400">{dict.logo}</span>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              {label}
            </a>
          ))}
          <ThemeToggle />
          <LanguageSwitcher locale={locale} />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <LanguageSwitcher locale={locale} />
        </div>
      </nav>
    </header>
  )
}
