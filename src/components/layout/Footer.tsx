import type { Dictionary } from '@/types/dictionary'

interface FooterProps {
  dict: Dictionary['footer']
}

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 py-8 text-center dark:border-slate-800">
      <p className="text-sm text-slate-500">{dict.built_with}</p>
    </footer>
  )
}
