import { useState, useEffect } from 'react'
import type { OfficeState } from '../engine/officeState.js'
import { TILE_SIZE, CharacterState } from '../types.js'
import {
  TOOL_OVERLAY_VERTICAL_OFFSET,
  CHARACTER_SITTING_OFFSET_PX,
  THINKING_BUBBLE_FADE_SEC,
} from '../../constants.js'

interface ThoughtBubbleProps {
  officeState: OfficeState
  containerRef: React.RefObject<HTMLDivElement | null>
  zoom: number
  panRef: React.RefObject<{ x: number; y: number }>
}

export function ThoughtBubble({ officeState, containerRef, zoom, panRef }: ThoughtBubbleProps) {
  const [, setTick] = useState(0)
  useEffect(() => {
    let rafId = 0
    const tick = () => {
      setTick((n) => n + 1)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const el = containerRef.current
  if (!el) return null
  const rect = el.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1
  const canvasW = Math.round(rect.width * dpr)
  const canvasH = Math.round(rect.height * dpr)
  const layout = officeState.getLayout()
  const mapW = layout.cols * TILE_SIZE * zoom
  const mapH = layout.rows * TILE_SIZE * zoom
  const deviceOffsetX = Math.floor((canvasW - mapW) / 2) + Math.round(panRef.current.x)
  const deviceOffsetY = Math.floor((canvasH - mapH) / 2) + Math.round(panRef.current.y)

  const bubbles: Array<{
    id: number
    screenX: number
    screenY: number
    text: string
    opacity: number
  }> = []

  const selectedId = officeState.selectedAgentId
  const hoveredId = officeState.hoveredAgentId
  const panelHoveredId = officeState.panelHoveredAgentId

  for (const ch of officeState.characters.values()) {
    if (!ch.thinkingText) continue

    // Lower priority than tool overlay (hover/select) and permission/waiting bubbles
    if (ch.id === selectedId || ch.id === hoveredId || ch.id === panelHoveredId) continue
    if (ch.bubbleType) continue

    const sittingOffset = ch.state === CharacterState.TYPE ? CHARACTER_SITTING_OFFSET_PX : 0
    const screenX = (deviceOffsetX + ch.x * zoom) / dpr
    const screenY = (deviceOffsetY + (ch.y + sittingOffset - TOOL_OVERLAY_VERTICAL_OFFSET) * zoom) / dpr

    // Fade out in last THINKING_BUBBLE_FADE_SEC
    const opacity = ch.thinkingTimer < THINKING_BUBBLE_FADE_SEC
      ? Math.max(0, ch.thinkingTimer / THINKING_BUBBLE_FADE_SEC)
      : 1

    bubbles.push({ id: ch.id, screenX, screenY, text: ch.thinkingText, opacity })
  }

  if (bubbles.length === 0) return null

  return (
    <>
      {bubbles.map((b) => (
        <div
          key={b.id}
          style={{
            position: 'absolute',
            left: b.screenX,
            top: b.screenY - 52,
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
            zIndex: 45,
            opacity: b.opacity,
            transition: 'opacity 0.1s linear',
          }}
        >
          {/* Bubble body */}
          <div
            style={{
              background: 'rgba(30, 30, 50, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 8,
              padding: '4px 8px',
              maxWidth: 150,
            }}
          >
            <span
              style={{
                fontSize: '11px',
                color: '#fff',
                lineHeight: 1.3,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                wordBreak: 'break-word',
              }}
            >
              {b.text}
            </span>
          </div>
          {/* Cloud puff tail */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: -1 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'rgba(30, 30, 50, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                marginTop: 2,
              }}
            />
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'rgba(30, 30, 50, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginTop: 1,
              }}
            />
          </div>
        </div>
      ))}
    </>
  )
}
