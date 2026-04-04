'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface TrailDot {
  id: number
  x: number
  y: number
}

interface ClickRing {
  id: number
  x: number
  y: number
}

let dotCounter = 0
let ringCounter = 0

const TRAIL_LENGTH = 12
const DOT_LIFETIME_MS = 500

export function MouseTrail() {
  const [trail, setTrail] = useState<TrailDot[]>([])
  const [rings, setRings] = useState<ClickRing[]>([])
  const lastPos = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY

      if (
        lastPos.current &&
        Math.abs(x - lastPos.current.x) < 3 &&
        Math.abs(y - lastPos.current.y) < 3
      ) {
        return
      }

      lastPos.current = { x, y }
      const id = ++dotCounter

      setTrail((prev) => {
        const next = [...prev, { id, x, y }]
        return next.slice(-TRAIL_LENGTH)
      })

      setTimeout(() => {
        setTrail((prev) => prev.filter((d) => d.id !== id))
      }, DOT_LIFETIME_MS)
    }

    const handleClick = (e: MouseEvent) => {
      const id = ++ringCounter
      setRings((prev) => [...prev, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => {
        setRings((prev) => prev.filter((r) => r.id !== id))
      }, 700)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      <AnimatePresence>
        {trail.map((dot, i) => {
          const scale = 0.3 + (i / TRAIL_LENGTH) * 0.7
          const opacity = 0.15 + (i / TRAIL_LENGTH) * 0.55
          return (
            <motion.span
              key={dot.id}
              initial={{ opacity, scale }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                left: dot.x,
                top: dot.y,
                transform: `translate(-50%, -50%) scale(${scale})`,
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'rgb(99 102 241)',
                opacity,
              }}
            />
          )
        })}
      </AnimatePresence>

      <AnimatePresence>
        {rings.map((ring) => (
          <motion.span
            key={ring.id}
            initial={{ opacity: 0.8, scale: 0.2, x: '-50%', y: '-50%' }}
            animate={{ opacity: 0, scale: 2.5, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: ring.x,
              top: ring.y,
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '2px solid rgb(99 102 241)',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
