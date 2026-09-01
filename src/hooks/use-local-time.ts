'use client'

import { useEffect, useState } from 'react'

/**
 * Wall-clock time in a fixed zone, refreshed each minute. Empty until mounted
 * so server and client agree on the first render.
 */
export function useLocalTime(timeZone: string, locale: string): string {
  const [time, setTime] = useState('')

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat(locale, {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date())

    setTime(format())
    const timer = window.setInterval(() => setTime(format()), 30_000)

    return () => window.clearInterval(timer)
  }, [timeZone, locale])

  return time
}
