'use client'

import { useEffect, useState } from 'react'

/**
 * Subscribes to a media query. Returns false until mounted so server and client
 * agree on the first render.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const list = window.matchMedia(query)
    setMatches(list.matches)

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches)
    list.addEventListener('change', onChange)

    return () => list.removeEventListener('change', onChange)
  }, [query])

  return matches
}
