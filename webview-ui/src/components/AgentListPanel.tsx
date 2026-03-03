import { useState, useEffect } from 'react'
import type { ToolActivity } from '../office/types.js'
import type { OfficeState } from '../office/engine/officeState.js'
import type { SubagentCharacter } from '../hooks/useExtensionMessages.js'
import { getActivityText } from '../office/components/ToolOverlay.js'

interface AgentListPanelProps {
  officeState: OfficeState
  agents: number[]
  agentTools: Record<number, ToolActivity[]>
  subagentCharacters: SubagentCharacter[]
  onSelectAgent: (id: number) => void
}

const panelStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: 10,
  right: 10,
  zIndex: 'var(--pixel-controls-z)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 4,
}

const btnBase: React.CSSProperties = {
  padding: '5px 10px',
  fontSize: '24px',
  color: 'var(--pixel-text)',
  background: 'var(--pixel-btn-bg)',
  border: '2px solid transparent',
  borderRadius: 0,
  cursor: 'pointer',
}

export function AgentListPanel({
  officeState,
  agents,
  agentTools,
  subagentCharacters,
  onSelectAgent,
}: AgentListPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [btnHovered, setBtnHovered] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  // RAF tick to read hoveredAgentId from officeState (mutated outside React)
  const [, setTick] = useState(0)
  useEffect(() => {
    if (!isOpen) return
    let rafId = 0
    const tick = () => {
      setTick((n) => n + 1)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isOpen])

  // Sync panel hover to officeState
  useEffect(() => {
    officeState.panelHoveredAgentId = hoveredItem
  }, [hoveredItem, officeState])

  // Clear panel hover when closing
  const handleToggle = () => {
    if (isOpen) {
      officeState.panelHoveredAgentId = null
      setHoveredItem(null)
    }
    setIsOpen((v) => !v)
  }

  if (agents.length === 0) return null

  return (
    <div style={panelStyle}>
      {isOpen && (
        <div
          style={{
            background: 'var(--pixel-bg)',
            border: '2px solid var(--pixel-border)',
            borderRadius: 0,
            boxShadow: 'var(--pixel-shadow)',
            minWidth: 180,
            maxHeight: 300,
            overflowY: 'auto',
          }}
        >
          {agents.map((id) => {
            const ch = officeState.characters.get(id)
            if (!ch) return null

            const name = ch.name || `Agent #${id}`
            const activityText = getActivityText(id, agentTools, ch.isActive)

            // Dot color
            const tools = agentTools[id]
            const hasPermission = tools?.some((t) => t.permissionWait && !t.done)
            const hasActiveTools = tools?.some((t) => !t.done)

            let dotColor: string | null = null
            if (hasPermission) {
              dotColor = 'var(--pixel-status-permission)'
            } else if (ch.isActive && hasActiveTools) {
              dotColor = 'var(--pixel-status-active)'
            }

            const isCanvasHovered = officeState.hoveredAgentId === id
            const isItemHovered = hoveredItem === id
            const isHighlighted = isCanvasHovered || isItemHovered

            const pets = subagentCharacters.filter((s) => s.parentAgentId === id)

            return (
              <div key={id}>
                <div
                  onClick={() => onSelectAgent(id)}
                  onMouseEnter={() => setHoveredItem(id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    padding: '6px 10px',
                    cursor: 'pointer',
                    background: isHighlighted ? 'var(--pixel-btn-hover-bg)' : 'transparent',
                    borderBottom: '1px solid var(--pixel-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  {dotColor && (
                    <span
                      className={ch.isActive && !hasPermission ? 'pixel-agents-pulse' : undefined}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: dotColor,
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <div style={{ overflow: 'hidden', minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '20px',
                        color: 'var(--pixel-text)',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {name}
                    </div>
                    <div
                      style={{
                        fontSize: '16px',
                        color: 'var(--pixel-text-dim)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {activityText}
                    </div>
                  </div>
                </div>
                {pets.map((pet) => {
                  const petCh = officeState.characters.get(pet.id)
                  const petName = petCh?.name || pet.label || 'Pet'
                  const isPetHovered = hoveredItem === pet.id || officeState.hoveredAgentId === pet.id
                  return (
                    <div
                      key={pet.id}
                      onClick={() => onSelectAgent(id)}
                      onMouseEnter={() => setHoveredItem(pet.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      style={{
                        padding: '4px 10px 4px 24px',
                        cursor: 'pointer',
                        background: isPetHovered ? 'var(--pixel-btn-hover-bg)' : 'transparent',
                        borderBottom: '1px solid var(--pixel-border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <div style={{ overflow: 'hidden', minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: '18px',
                            color: 'var(--pixel-text)',
                            fontStyle: 'italic',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {petName}
                        </div>
                        {pet.label && (
                          <div
                            style={{
                              fontSize: '14px',
                              color: 'var(--pixel-text-dim)',
                              fontStyle: 'italic',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {pet.label}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      )}
      <div
        style={{
          background: 'var(--pixel-bg)',
          border: '2px solid var(--pixel-border)',
          borderRadius: 0,
          boxShadow: 'var(--pixel-shadow)',
          padding: '4px 6px',
        }}
      >
        <button
          onClick={handleToggle}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            ...btnBase,
            background: isOpen
              ? 'var(--pixel-active-bg)'
              : btnHovered
                ? 'var(--pixel-btn-hover-bg)'
                : btnBase.background,
            border: isOpen ? '2px solid var(--pixel-accent)' : '2px solid transparent',
          }}
        >
          Agents
        </button>
      </div>
    </div>
  )
}
