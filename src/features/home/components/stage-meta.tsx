import { StatusDot } from '@/components/ui/status-dot'
import type { Dictionary } from '@/types/dictionary'
import type { ProfileBasics } from '@/types/profile'

interface StageMetaProps {
  dict: Dictionary['home']
  basics: ProfileBasics
}

/**
 * The only DOM text in the opening viewport: who and where, set small so the
 * material headline behind it stays the subject.
 */
export function StageMeta({ dict, basics }: StageMetaProps) {
  return (
    <div className="flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-base text-fg sm:text-lg">{basics.role}</p>
        <p className="mt-1 font-mono text-xs text-fg-muted">{basics.title}</p>
      </div>

      <div className="flex flex-col gap-3 sm:items-end">
        <p className="flex items-center gap-2 font-mono text-[11px] text-fg-muted">
          <StatusDot className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          {basics.availability}
        </p>
        <p className="type-meta text-fg-subtle">{dict.scroll_cue}</p>
      </div>
    </div>
  )
}
