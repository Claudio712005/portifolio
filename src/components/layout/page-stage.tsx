import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import { StageHeadline } from '@/features/canvas/components/stage-headline'

interface PageStageProps {
  /** The real heading, kept in the DOM for search and assistive tech. */
  title: string
  /** The same words handed to the WebGL layer, one entry per line. */
  lines: string[]
  children?: ReactNode
  size?: 'full' | 'short'
}

/**
 * Opening viewport of every route. Deliberately almost empty: the headline is
 * rendered as material behind it, and only the supporting metadata sits in the
 * DOM so the type has room to be the subject.
 *
 * @example <PageStage title="Projects" lines={['Pro', 'jects']}>{meta}</PageStage>
 */
export function PageStage({ title, lines, children, size = 'full' }: PageStageProps) {
  return (
    <section
      className={clsx(
        'relative flex flex-col justify-end',
        size === 'full' ? 'min-h-svh' : 'min-h-[68svh]',
      )}
    >
      <StageHeadline lines={lines} size={size} />
      <h1 className="sr-only">{title}</h1>

      {children && (
        <div className="mx-auto w-full max-w-shell px-5 pb-14 lg:px-8">{children}</div>
      )}
    </section>
  )
}
