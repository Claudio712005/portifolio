'use client'

import { useEffect, useState } from 'react'

/**
 * False on the server and on the first client render, true once React has
 * mounted. Lets a component ship its finished state in the server HTML and arm
 * the entrance only afterwards, so a blocked or failed script leaves the
 * content visible rather than stuck at its hidden starting frame.
 */
export function useArmed(): boolean {
  const [armed, setArmed] = useState(false)

  useEffect(() => setArmed(true), [])

  return armed
}
