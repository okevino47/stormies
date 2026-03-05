/** Map status prefixes back to tool names for animation selection.
 *  Ordered from longest to shortest prefix so more specific matches win. */
const STATUS_TO_TOOL: [string, string][] = [
  ['Searching web', 'WebSearch'],
  ['Searching', 'Grep'],
  ['Reading', 'Read'],
  ['Globbing', 'Glob'],
  ['Fetching', 'WebFetch'],
  ['Writing', 'Write'],
  ['Editing', 'Edit'],
  ['Running', 'Bash'],
  ['Task', 'Task'],
]

export function extractToolName(status: string): string | null {
  for (const [prefix, tool] of STATUS_TO_TOOL) {
    if (status.startsWith(prefix)) return tool
  }
  const first = status.split(/[\s:]/)[0]
  return first || null
}

import { ZOOM_DEFAULT_DPR_FACTOR, ZOOM_MIN } from '../constants.js'

/** Compute a default integer zoom level (device pixels per sprite pixel) */
export function defaultZoom(): number {
  const dpr = window.devicePixelRatio || 1
  return Math.max(ZOOM_MIN, Math.round(ZOOM_DEFAULT_DPR_FACTOR * dpr))
}
