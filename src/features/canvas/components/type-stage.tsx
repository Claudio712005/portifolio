'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { STAGE_LAYOUTS, type StageLayout, type StageSize } from '@/lib/canvas/stage-layout'

interface StageState {
  lines: string[]
  size: StageSize
}

interface TypeStageValue extends StageState {
  layout: StageLayout
  setStage: (next: StageState) => void
}

const TypeStageContext = createContext<TypeStageValue | null>(null)

interface TypeStageProviderProps {
  children: ReactNode
  initialLines: string[]
}

/**
 * Holds the headline the WebGL layer is currently rendering, plus the band it
 * has to live in. Routes publish into it, the canvas subscribes — which is what
 * lets one canvas survive a navigation instead of rebuilding per page.
 */
export function TypeStageProvider({ children, initialLines }: TypeStageProviderProps) {
  const [state, setState] = useState<StageState>({ lines: initialLines, size: 'full' })

  const setStage = useCallback((next: StageState) => {
    setState((current) =>
      current.size === next.size &&
      current.lines.length === next.lines.length &&
      current.lines.every((line, i) => line === next.lines[i])
        ? current
        : next,
    )
  }, [])

  const value = useMemo(
    () => ({ ...state, layout: STAGE_LAYOUTS[state.size], setStage }),
    [state, setStage],
  )

  return <TypeStageContext.Provider value={value}>{children}</TypeStageContext.Provider>
}

export function useTypeStage(): TypeStageValue {
  const value = useContext(TypeStageContext)

  if (!value) throw new Error('useTypeStage must be used inside a TypeStageProvider')

  return value
}
