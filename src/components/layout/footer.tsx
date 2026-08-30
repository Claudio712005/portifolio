import type { Dictionary } from '@/types/dictionary'

interface FooterProps {
  dict: Dictionary['footer']
  name: string
  year: string
}

export function Footer({ dict, name, year }: FooterProps) {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-shell flex-col gap-2 px-5 py-8 font-mono text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p>
          © {year} {name}. {dict.rights}
        </p>
        <p>{dict.built_with}</p>
      </div>
    </footer>
  )
}
