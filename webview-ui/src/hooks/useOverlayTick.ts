import { useState, useEffect, useRef } from 'react'

/**
 * Shared overlay tick hook — drives HTML overlay re-renders at ~20fps
 * instead of each overlay component running its own 60fps RAF loop.
 */
const OVERLAY_FRAME_INTERVAL_MS = 50 // ~20fps

export function useOverlayTick(): number {
  const [tick, setTick] = useState(0)
  const lastFrameRef = useRef(0)

  useEffect(() => {
    let rafId = 0
    const frame = (time: number) => {
      if (time - lastFrameRef.current >= OVERLAY_FRAME_INTERVAL_MS) {
        lastFrameRef.current = time
        setTick((n) => n + 1)
      }
      rafId = requestAnimationFrame(frame)
    }
    rafId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return tick
}
