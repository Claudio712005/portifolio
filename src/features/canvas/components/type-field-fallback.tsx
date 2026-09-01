'use client'

import { clsx } from 'clsx'
import { useTypeStage } from './type-stage'

interface TypeFieldFallbackProps {
  /** Set once the WebGL layer has painted, so the two never overlap. */
  hidden?: boolean
}

/**
 * The headline as real type when WebGL is unavailable, undesired, or not yet
 * painted. Keeps the same idea as the shader — ink with the accent bleeding out
 * of register — in a medium that costs nothing, and inside the same band.
 */
export function TypeFieldFallback({ hidden = false }: TypeFieldFallbackProps) {
  const { lines, layout } = useTypeStage()

  return (
    <div
      aria-hidden="true"
      className={clsx(
        'pointer-events-none fixed inset-x-0 flex -translate-y-1/2 items-center justify-center px-5 transition-opacity duration-500',
        hidden ? 'opacity-0' : 'opacity-100',
      )}
      style={{ top: `${layout.centerY * 100}%` }}
    >
      <p
        className="type-display text-center text-d1"
        style={{ lineHeight: layout.leading }}
      >
        {lines.map((line) => (
          <span key={line} className="relative block">
            <span
              className="absolute inset-0 translate-x-[0.014em] translate-y-[0.008em] text-accent/60"
              aria-hidden="true"
            >
              {line}
            </span>
            <span className="relative text-fg">{line}</span>
          </span>
        ))}
      </p>
    </div>
  )
}
