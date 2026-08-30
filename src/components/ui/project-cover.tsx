import { clsx } from 'clsx'
import { getCoverGradient } from '@/lib/project-cover'
import type { ProjectAccent } from '@/types/profile'

interface ProjectCoverProps {
  accent: ProjectAccent
  /** Zero-padded position marker rendered on the block. */
  index: string
  caption: string
  className?: string
}

/**
 * Gradient stand-in for a project screenshot: a colour block with a hairline
 * grid, the project index and a short caption. Purely decorative.
 *
 * @example <ProjectCover accent="signal" index="01" caption="Kotlin · MCP" />
 */
export function ProjectCover({ accent, index, caption, className }: ProjectCoverProps) {
  return (
    <div
      className={clsx(
        'relative isolate flex flex-col justify-between overflow-hidden bg-gradient-to-br p-5',
        getCoverGradient(accent),
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/25" />

      <span className="relative font-mono text-xs tracking-[0.2em] text-white/70">{index}</span>
      <span className="relative font-mono text-[11px] leading-relaxed text-white/85">{caption}</span>
    </div>
  )
}
