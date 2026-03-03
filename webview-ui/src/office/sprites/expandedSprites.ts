import type { SpriteData } from '../types.js'

const _ = '' // transparent

// ── ELECTRONICS ──────────────────────────────────────────────────────────────

/** EXP_LAPTOP — 16×16, open laptop, top-down, canPlaceOnSurfaces */
export const EXP_LAPTOP: SpriteData = (() => {
  const C = '#2A2A2A' // dark casing
  const S = '#1A1AFF' // screen glow blue
  const G = '#4FC3F7' // screen highlight
  const H = '#555555' // hinge / mid
  const K = '#3A3A3A' // keyboard
  const L = '#88CCFF' // screen light
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, ],
    [_, C, C, C, C, C, C, C, C, C, C, C, C, C, C, _],
    [_, C, S, S, S, S, S, S, S, S, S, S, S, S, C, _],
    [_, C, S, G, G, G, G, G, G, G, G, G, G, S, C, _],
    [_, C, S, G, L, L, L, L, L, L, L, L, G, S, C, _],
    [_, C, S, G, L, L, L, L, L, L, L, L, G, S, C, _],
    [_, C, S, G, L, L, L, L, L, L, L, L, G, S, C, _],
    [_, C, S, G, G, G, G, G, G, G, G, G, G, S, C, _],
    [_, C, C, C, C, C, C, H, H, C, C, C, C, C, C, _],
    [_, C, K, K, K, K, K, K, K, K, K, K, K, K, C, _],
    [_, C, K, K, K, K, K, K, K, K, K, K, K, K, C, _],
    [_, C, K, K, K, K, K, K, K, K, K, K, K, K, C, _],
    [_, C, K, K, K, K, K, K, K, K, K, K, K, K, C, _],
    [_, C, K, K, K, K, K, K, K, K, K, K, K, K, C, _],
    [_, C, C, C, C, C, C, C, C, C, C, C, C, C, C, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, ],
  ]
})()

/** EXP_SERVER_RACK — 16×32 (1×2 tiles), tall server rack with blinking LEDs */
export const EXP_SERVER_RACK: SpriteData = (() => {
  const F = '#222222' // frame dark
  const M = '#333333' // mid panel
  const B = '#444444' // bezel
  const G = '#00FF44' // green LED
  const R = '#FF3311' // red LED
  const Y = '#FFCC00' // yellow LED
  const V = '#1A1A3A' // drive bay dark
  const L = '#555566' // drive bay light
  const rows: string[][] = []
  // Row 0: empty border
  rows.push(new Array(16).fill(_))
  // Row 1: top rail
  rows.push([_, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _])
  // Rows 2–7: first server unit
  rows.push([_, F, B, B, B, B, B, B, B, B, B, B, B, B, F, _])
  rows.push([_, F, B, V, V, V, V, V, V, V, V, V, V, B, F, _])
  rows.push([_, F, B, V, L, L, L, L, L, L, L, L, V, B, F, _])
  rows.push([_, F, B, V, V, V, V, V, V, V, V, V, V, B, F, _])
  rows.push([_, F, B, B, B, G, B, B, B, R, B, B, B, B, F, _])
  rows.push([_, F, M, M, M, M, M, M, M, M, M, M, M, M, F, _])
  // Rows 8–13: second server unit
  rows.push([_, F, B, B, B, B, B, B, B, B, B, B, B, B, F, _])
  rows.push([_, F, B, V, V, V, V, V, V, V, V, V, V, B, F, _])
  rows.push([_, F, B, V, L, L, L, L, L, L, L, L, V, B, F, _])
  rows.push([_, F, B, V, V, V, V, V, V, V, V, V, V, B, F, _])
  rows.push([_, F, B, B, B, G, B, G, B, B, B, R, B, B, F, _])
  rows.push([_, F, M, M, M, M, M, M, M, M, M, M, M, M, F, _])
  // Rows 14–19: third server unit (storage array look)
  rows.push([_, F, B, B, B, B, B, B, B, B, B, B, B, B, F, _])
  rows.push([_, F, B, V, V, B, V, V, B, V, V, B, V, B, F, _])
  rows.push([_, F, B, V, V, B, V, V, B, V, V, B, V, B, F, _])
  rows.push([_, F, B, V, V, B, V, V, B, V, V, B, V, B, F, _])
  rows.push([_, F, B, B, G, B, B, Y, B, B, G, B, B, B, F, _])
  rows.push([_, F, M, M, M, M, M, M, M, M, M, M, M, M, F, _])
  // Rows 20–25: fourth unit (patch panel style)
  rows.push([_, F, B, B, B, B, B, B, B, B, B, B, B, B, F, _])
  rows.push([_, F, B, M, M, M, M, M, M, M, M, M, M, B, F, _])
  rows.push([_, F, B, M, G, M, G, M, G, M, G, M, M, B, F, _])
  rows.push([_, F, B, M, M, M, M, M, M, M, M, M, M, B, F, _])
  rows.push([_, F, B, B, B, B, B, B, B, B, B, B, B, B, F, _])
  rows.push([_, F, M, M, M, M, M, M, M, M, M, M, M, M, F, _])
  // Row 26: bottom rail
  rows.push([_, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _])
  // Rows 27–30: floor stand / feet
  rows.push([_, _, F, F, _, _, _, _, _, _, _, _, F, F, _, _])
  rows.push([_, _, F, F, _, _, _, _, _, _, _, _, F, F, _, _])
  rows.push([_, _, F, F, _, _, _, _, _, _, _, _, F, F, _, _])
  rows.push([_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _])
  rows.push([_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _])
  return rows
})()

/** EXP_TV_ON_STAND — 32×32 (2×2 tiles), flatscreen TV on stand/legs */
export const EXP_TV_ON_STAND: SpriteData = (() => {
  const F = '#1A1A1A' // frame/bezel
  const S = '#0A1A4A' // screen dark
  const G = '#4488FF' // screen glow
  const H = '#88BBFF' // screen highlight
  const W = '#AACCFF' // brightest screen
  const T = '#333333' // stand
  const L = '#555555' // stand light
  const rows: string[][] = []
  // Row 0: transparent top
  rows.push(new Array(32).fill(_))
  // Row 1: top bezel edge
  rows.push([_, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _])
  // Rows 2–19: TV body with screen
  for (let r = 0; r < 18; r++) {
    if (r === 0) {
      rows.push([_, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _])
    } else if (r >= 1 && r <= 14) {
      const inner: string[] = [_, F, F]
      for (let c = 0; c < 26; c++) {
        if (r === 1 || c === 0 || c === 25) inner.push(G)
        else if (r <= 4 && c <= 8) inner.push(W)
        else if (r <= 3) inner.push(H)
        else inner.push(r % 2 === 0 ? G : S)
      }
      inner.push(F, F, _)
      rows.push(inner)
    } else {
      rows.push([_, F, F, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, F, F, _])
    }
  }
  // Row 20: bottom bezel
  rows.push([_, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _])
  // Row 21: transparent gap
  rows.push(new Array(32).fill(_))
  // Rows 22–23: neck of stand
  rows.push([_, _, _, _, _, _, _, _, _, _, _, _, _, _, T, T, T, T, _, _, _, _, _, _, _, _, _, _, _, _, _, _])
  rows.push([_, _, _, _, _, _, _, _, _, _, _, _, _, _, T, L, L, T, _, _, _, _, _, _, _, _, _, _, _, _, _, _])
  // Rows 24–27: stand base
  rows.push([_, _, _, _, _, _, _, _, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, _, _, _, _, _, _, _, _])
  rows.push([_, _, _, _, _, _, _, T, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, T, _, _, _, _, _, _, _])
  rows.push([_, _, _, _, _, _, _, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, _, _, _, _, _, _, _])
  rows.push(new Array(32).fill(_))
  // Rows 28–31: empty
  for (let r = 0; r < 4; r++) rows.push(new Array(32).fill(_))
  return rows
})()

/** EXP_DESK_PHONE — 16×16, office desk phone, canPlaceOnSurfaces */
export const EXP_DESK_PHONE: SpriteData = (() => {
  const C = '#222222' // body dark
  const B = '#444444' // body mid
  const L = '#666666' // body light
  const G = '#00CC44' // green button
  const R = '#CC2200' // red button
  const H = '#888888' // handset
  const S = '#CCCCCC' // handset highlight
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, H, H, H, H, H, H, _, _, _, _, _, _, _, _],
    [_, _, H, S, S, S, H, H, H, _, _, _, _, _, _, _],
    [_, _, H, H, H, H, H, H, H, H, _, _, _, _, _, _],
    [_, _, _, _, H, H, H, H, H, H, _, _, _, _, _, _],
    [_, _, _, _, _, _, H, H, H, _, _, _, _, _, _, _],
    [_, C, C, C, C, C, C, C, C, C, C, C, C, C, C, _],
    [_, C, B, B, B, B, B, B, B, B, B, B, B, B, C, _],
    [_, C, B, L, L, B, L, L, B, L, L, B, L, B, C, _],
    [_, C, B, L, L, B, L, L, B, L, L, B, L, B, C, _],
    [_, C, B, B, B, B, B, B, B, B, B, B, B, B, C, _],
    [_, C, B, G, G, B, L, L, B, L, L, B, R, B, C, _],
    [_, C, B, G, G, B, L, L, B, L, L, B, R, B, C, _],
    [_, C, B, B, B, B, B, B, B, B, B, B, B, B, C, _],
    [_, C, C, C, C, C, C, C, C, C, C, C, C, C, C, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** EXP_SPEAKER — 16×16, small desktop/bluetooth speaker */
export const EXP_SPEAKER: SpriteData = (() => {
  const C = '#1A1A1A' // casing dark
  const M = '#2A2A2A' // casing mid
  const G = '#333333' // grille
  const L = '#555555' // grille light (holes)
  const B = '#4488FF' // blue LED
  const H = '#444444' // body highlight
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, C, C, C, C, C, C, C, C, C, C, _, _, _],
    [_, _, C, M, M, M, M, M, M, M, M, M, M, C, _, _],
    [_, _, C, M, G, L, G, L, G, L, G, L, M, C, _, _],
    [_, _, C, H, G, L, G, L, G, L, G, L, H, C, _, _],
    [_, _, C, M, G, L, G, L, G, L, G, L, M, C, _, _],
    [_, _, C, M, G, L, G, L, G, L, G, L, M, C, _, _],
    [_, _, C, H, G, L, G, L, G, L, G, L, H, C, _, _],
    [_, _, C, M, G, L, G, L, G, L, G, L, M, C, _, _],
    [_, _, C, M, G, L, G, L, G, L, G, L, M, C, _, _],
    [_, _, C, M, M, M, M, M, M, M, M, M, M, C, _, _],
    [_, _, C, M, B, M, M, M, M, M, M, M, M, C, _, _],
    [_, _, C, M, M, M, M, M, M, M, M, M, M, C, _, _],
    [_, _, _, C, C, C, C, C, C, C, C, C, C, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** EXP_ROUTER — 16×16, wifi router with antennas, canPlaceOnSurfaces */
export const EXP_ROUTER: SpriteData = (() => {
  const C = '#111111' // body dark
  const B = '#222222' // body mid
  const L = '#333333' // body light
  const G = '#00FF66' // green LED active
  const Y = '#FFCC00' // yellow LED
  const A = '#444444' // antenna
  const W = '#AAAAAA' // antenna tip
  return [
    [_, _, _, A, _, _, _, _, _, _, _, A, A, _, _, _],
    [_, _, _, A, _, _, _, _, _, _, _, A, A, _, _, _],
    [_, _, _, A, _, _, _, _, _, _, _, A, _, _, _, _],
    [_, _, _, A, _, _, _, _, _, _, _, A, _, _, _, _],
    [_, _, _, A, _, _, _, _, _, _, _, A, _, _, _, _],
    [_, _, _, W, _, _, _, _, _, _, _, W, _, _, _, _],
    [_, C, C, C, C, C, C, C, C, C, C, C, C, C, C, _],
    [_, C, B, B, B, B, B, B, B, B, B, B, B, B, C, _],
    [_, C, B, G, B, G, B, G, B, Y, B, B, B, B, C, _],
    [_, C, B, G, B, G, B, G, B, B, B, B, B, B, C, _],
    [_, C, B, B, B, B, B, B, B, B, B, B, B, B, C, _],
    [_, C, L, L, L, L, L, L, L, L, L, L, L, L, C, _],
    [_, C, C, C, C, C, C, C, C, C, C, C, C, C, C, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** EXP_PROJECTOR — 16×16, ceiling/desk projector */
export const EXP_PROJECTOR: SpriteData = (() => {
  const C = '#1A1A1A' // casing
  const M = '#2F2F2F' // mid
  const L = '#88AAFF' // lens glow blue
  const W = '#DDEEFF' // lens highlight
  const G = '#00CC44' // power LED
  const V = '#555555' // vent
  const B = '#333333' // body base
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, C, C, C, C, C, C, C, C, C, C, C, C, _, _],
    [_, C, M, M, M, M, M, M, M, M, M, M, M, M, C, _],
    [_, C, M, V, V, M, V, V, M, V, V, M, M, M, C, _],
    [_, C, M, V, V, M, V, V, M, V, V, M, M, M, C, _],
    [_, C, M, M, M, M, M, M, M, M, M, M, M, M, C, _],
    [_, C, B, B, B, B, B, B, B, B, B, L, L, L, C, _],
    [_, C, B, B, B, B, B, B, B, B, B, L, W, L, C, _],
    [_, C, B, B, B, B, B, B, B, B, B, L, L, L, C, _],
    [_, C, M, M, M, M, M, M, M, M, M, M, M, M, C, _],
    [_, C, M, G, M, M, M, M, M, M, M, M, M, M, C, _],
    [_, C, M, M, M, M, M, M, M, M, M, M, M, M, C, _],
    [_, _, C, C, C, C, C, C, C, C, C, C, C, C, _, _],
    [_, _, _, _, _, _, C, C, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, C, C, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** EXP_ARCADE_MACHINE — 16×32 (1×2 tiles), retro arcade cabinet, colorful */
export const EXP_ARCADE_MACHINE: SpriteData = (() => {
  const C = '#111111' // cabinet dark
  const P = '#CC2266' // pink accent
  const B = '#2244CC' // blue accent
  const Y = '#FFCC00' // yellow trim
  const G = '#00CC44' // green LED
  const S = '#0A0A1A' // screen dark
  const L = '#44AAFF' // screen glow
  const W = '#AADDFF' // screen bright
  const R = '#CC4400' // red button
  const rows: string[][] = []
  // Row 0: empty
  rows.push(new Array(16).fill(_))
  // Rows 1–2: top marquee
  rows.push([_, C, C, C, C, C, C, C, C, C, C, C, C, C, C, _])
  rows.push([_, C, Y, P, P, P, P, B, B, P, P, P, Y, Y, C, _])
  rows.push([_, C, Y, P, B, B, B, B, B, B, B, P, Y, Y, C, _])
  // Rows 4–5: marquee light strip
  rows.push([_, C, G, G, G, G, G, G, G, G, G, G, G, G, C, _])
  rows.push([_, C, C, C, C, C, C, C, C, C, C, C, C, C, C, _])
  // Rows 6–14: screen area
  rows.push([_, C, S, S, S, S, S, S, S, S, S, S, S, S, C, _])
  rows.push([_, C, S, L, L, L, L, L, L, L, L, L, L, S, C, _])
  rows.push([_, C, S, L, W, W, W, W, W, W, W, W, L, S, C, _])
  rows.push([_, C, S, L, W, W, L, L, L, W, W, W, L, S, C, _])
  rows.push([_, C, S, L, W, L, L, W, L, L, W, W, L, S, C, _])
  rows.push([_, C, S, L, W, W, L, W, W, L, W, W, L, S, C, _])
  rows.push([_, C, S, L, W, W, W, W, W, W, W, W, L, S, C, _])
  rows.push([_, C, S, L, L, L, L, L, L, L, L, L, L, S, C, _])
  rows.push([_, C, S, S, S, S, S, S, S, S, S, S, S, S, C, _])
  // Row 15: bezel
  rows.push([_, C, C, C, C, C, C, C, C, C, C, C, C, C, C, _])
  // Rows 16–17: speaker grille
  rows.push([_, C, C, Y, C, Y, C, Y, C, Y, C, Y, C, C, C, _])
  rows.push([_, C, C, Y, C, Y, C, Y, C, Y, C, Y, C, C, C, _])
  // Row 18: divider
  rows.push([_, C, C, C, C, C, C, C, C, C, C, C, C, C, C, _])
  // Rows 19–22: control panel
  rows.push([_, C, C, C, C, C, C, C, C, C, C, C, C, C, C, _])
  rows.push([_, C, C, R, C, B, C, B, C, B, C, R, C, C, C, _])
  rows.push([_, C, C, R, C, B, C, B, C, B, C, R, C, C, C, _])
  rows.push([_, C, P, P, P, P, P, P, P, P, P, P, P, P, C, _])
  // Rows 23–25: lower cabinet
  rows.push([_, C, C, C, C, C, C, C, C, C, C, C, C, C, C, _])
  rows.push([_, C, B, B, B, B, B, B, B, B, B, B, B, B, C, _])
  rows.push([_, C, C, C, C, C, C, C, C, C, C, C, C, C, C, _])
  // Rows 26–28: coin slot area
  rows.push([_, C, C, C, C, C, Y, Y, Y, Y, C, C, C, C, C, _])
  rows.push([_, C, C, C, C, C, C, C, C, C, C, C, C, C, C, _])
  // Rows 29–31: base/feet
  rows.push([_, C, C, C, C, C, C, C, C, C, C, C, C, C, C, _])
  rows.push([_, C, C, _, _, _, _, _, _, _, _, _, _, C, C, _])
  rows.push([_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _])
  return rows
})()

// ── DECOR ─────────────────────────────────────────────────────────────────────

/** EXP_SMALL_RUG — 16×16, small decorative rug, backgroundTiles: 1 */
export const EXP_SMALL_RUG: SpriteData = (() => {
  const B = '#7B3F20' // border dark red-brown
  const M = '#A0522D' // mid border
  const F = '#D2691E' // field warm orange
  const P = '#C8A87A' // pattern tan
  const A = '#8B1A1A' // accent deep red
  return [
    [B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B],
    [B, M, M, M, M, M, M, M, M, M, M, M, M, M, M, B],
    [B, M, F, F, F, F, F, F, F, F, F, F, F, F, M, B],
    [B, M, F, A, A, F, P, P, P, P, F, A, A, F, M, B],
    [B, M, F, A, F, F, F, P, P, F, F, F, A, F, M, B],
    [B, M, F, F, F, P, F, F, F, F, P, F, F, F, M, B],
    [B, M, F, P, F, F, A, A, A, A, F, F, P, F, M, B],
    [B, M, F, P, F, F, A, F, F, A, F, F, P, F, M, B],
    [B, M, F, P, F, F, A, F, F, A, F, F, P, F, M, B],
    [B, M, F, P, F, F, A, A, A, A, F, F, P, F, M, B],
    [B, M, F, F, F, P, F, F, F, F, P, F, F, F, M, B],
    [B, M, F, A, F, F, F, P, P, F, F, F, A, F, M, B],
    [B, M, F, A, A, F, P, P, P, P, F, A, A, F, M, B],
    [B, M, F, F, F, F, F, F, F, F, F, F, F, F, M, B],
    [B, M, M, M, M, M, M, M, M, M, M, M, M, M, M, B],
    [B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B],
  ]
})()

/** EXP_ROUND_RUG — 32×32 (2×2 tiles), circular patterned rug, backgroundTiles: 2 */
export const EXP_ROUND_RUG: SpriteData = (() => {
  const _ = '' // transparent (shadow over local _ = '')
  const O = '#8B0000' // outer ring dark red
  const R = '#CC2200' // ring red
  const T = '#E87040' // ring tan-orange
  const F = '#F4C07A' // field gold
  const P = '#D4880A' // pattern amber
  const C = '#FFEECC' // center cream
  const rows: string[][] = []
  // Build 32x32 circle rug by distance-from-center logic
  for (let row = 0; row < 32; row++) {
    const r: string[] = []
    for (let col = 0; col < 32; col++) {
      const dx = col - 15.5
      const dy = row - 15.5
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > 15.5)       r.push(_)
      else if (dist > 14.0)  r.push(O)
      else if (dist > 12.5)  r.push(R)
      else if (dist > 11.0)  r.push(T)
      else if (dist > 9.5)   r.push(F)
      else if (dist > 8.0)   r.push(P)
      else if (dist > 6.0)   r.push(F)
      else if (dist > 4.5)   r.push(T)
      else if (dist > 2.5)   r.push(R)
      else                   r.push(C)
    }
    rows.push(r)
  }
  return rows
})()

/** EXP_PAINTING — 16×16, framed painting on wall, canPlaceOnWalls: true */
export const EXP_PAINTING: SpriteData = (() => {
  const F = '#6B3A0A' // wood frame dark
  const L = '#A0622A' // wood frame light
  const S = '#DDEEFF' // sky blue
  const G = '#3A9A3A' // foliage green
  const D = '#286028' // dark green
  const Y = '#EECC55' // sun/highlight
  const W = '#FFFFFF' // white highlight
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _],
    [_, F, L, L, L, L, L, L, L, L, L, L, L, L, F, _],
    [_, F, L, S, S, S, S, S, S, S, S, S, S, L, F, _],
    [_, F, L, S, Y, Y, S, S, S, S, S, S, S, L, F, _],
    [_, F, L, S, Y, W, S, S, S, S, S, S, S, L, F, _],
    [_, F, L, S, S, S, S, S, S, S, G, G, S, L, F, _],
    [_, F, L, S, S, S, G, G, G, G, D, G, S, L, F, _],
    [_, F, L, S, S, G, D, G, G, D, G, D, G, L, F, _],
    [_, F, L, G, G, D, G, G, D, G, G, G, G, L, F, _],
    [_, F, L, D, G, G, D, G, G, D, G, G, D, L, F, _],
    [_, F, L, G, D, G, G, G, G, G, G, D, G, L, F, _],
    [_, F, L, L, L, L, L, L, L, L, L, L, L, L, F, _],
    [_, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** EXP_PHOTO_FRAME — 16×16, small photo frame, canPlaceOnSurfaces: true */
export const EXP_PHOTO_FRAME: SpriteData = (() => {
  const F = '#888888' // silver frame
  const L = '#BBBBBB' // frame highlight
  const S = '#AACCFF' // photo sky
  const K = '#FFDDAA' // skin tone
  const H = '#553311' // hair
  const G = '#88CC88' // background green
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, F, F, F, F, F, F, F, F, F, F, _, _, _],
    [_, _, F, L, L, L, L, L, L, L, L, L, L, F, _, _],
    [_, _, F, L, S, S, S, S, S, S, S, S, L, F, _, _],
    [_, _, F, L, S, S, S, H, H, S, S, S, L, F, _, _],
    [_, _, F, L, S, S, H, K, K, H, S, S, L, F, _, _],
    [_, _, F, L, S, S, S, K, K, S, S, S, L, F, _, _],
    [_, _, F, L, S, G, G, G, G, G, G, S, L, F, _, _],
    [_, _, F, L, G, G, G, G, G, G, G, G, L, F, _, _],
    [_, _, F, L, G, G, G, G, G, G, G, G, L, F, _, _],
    [_, _, F, L, L, L, L, L, L, L, L, L, L, F, _, _],
    [_, _, F, F, F, F, F, F, F, F, F, F, F, F, _, _],
    [_, _, _, _, _, F, F, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, F, F, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** EXP_TROPHY — 16×16, gold trophy/cup, canPlaceOnSurfaces: true */
export const EXP_TROPHY: SpriteData = (() => {
  const G = '#FFCC00' // gold
  const D = '#CC9900' // dark gold
  const H = '#FFE566' // highlight
  const S = '#886600' // shadow
  const W = '#FFFFFF' // star/shine
  const B = '#BBBBBB' // base silver
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, G, G, G, G, G, G, G, G, G, G, _, _, _],
    [_, _, G, H, H, D, G, G, G, G, D, H, H, G, _, _],
    [_, G, D, H, W, H, G, G, G, G, H, W, H, D, G, _],
    [_, G, D, H, H, G, G, G, G, G, G, H, H, D, G, _],
    [_, _, G, G, G, G, G, G, G, G, G, G, G, G, _, _],
    [_, _, _, G, D, G, G, G, G, G, G, D, G, _, _, _],
    [_, _, _, _, G, D, G, G, G, G, D, G, _, _, _, _],
    [_, _, _, _, _, G, D, G, G, D, G, _, _, _, _, _],
    [_, _, _, _, _, _, G, G, G, G, _, _, _, _, _, _],
    [_, _, _, _, _, S, G, G, G, G, S, _, _, _, _, _],
    [_, _, _, S, S, S, S, G, G, S, S, S, S, _, _, _],
    [_, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** EXP_GLOBE — 16×16, desktop globe on stand, canPlaceOnSurfaces: true */
export const EXP_GLOBE: SpriteData = (() => {
  const B = '#1A6AC8' // ocean blue
  const L = '#4499EE' // ocean light
  const G = '#44AA44' // land green
  const D = '#2A7A2A' // land dark
  const S = '#888888' // stand
  const T = '#AAAAAA' // stand highlight
  const H = '#AADDFF' // globe highlight
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, B, B, B, B, B, B, _, _, _, _, _],
    [_, _, _, _, B, H, B, B, B, B, B, B, _, _, _, _],
    [_, _, _, B, H, B, G, G, B, B, B, B, B, _, _, _],
    [_, _, _, B, B, G, D, G, B, G, G, B, B, _, _, _],
    [_, _, _, B, B, G, G, B, B, D, G, B, B, _, _, _],
    [_, _, _, B, B, B, B, B, G, G, G, B, B, _, _, _],
    [_, _, _, B, L, B, B, G, D, G, B, B, B, _, _, _],
    [_, _, _, B, B, L, B, B, G, G, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, B, B, B, B, B, B, _, _, _],
    [_, _, _, _, B, B, B, B, B, B, B, B, _, _, _, _],
    [_, _, _, _, _, B, B, B, B, B, B, _, _, _, _, _],
    [_, _, _, _, _, _, T, S, S, T, _, _, _, _, _, _],
    [_, _, _, _, _, S, S, S, S, S, S, _, _, _, _, _],
    [_, _, _, S, S, S, S, S, S, S, S, S, S, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** EXP_VASE — 16×16, decorative vase, canPlaceOnSurfaces: true */
export const EXP_VASE: SpriteData = (() => {
  const C = '#1A5C8A' // cobalt blue
  const L = '#4488BB' // lighter blue
  const H = '#88BBDD' // highlight
  const D = '#0A3A5A' // dark shadow
  const W = '#DDEEFF' // white highlight
  const P = '#CCAA66' // pattern gold
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, C, C, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, C, L, L, C, _, _, _, _, _, _, _],
    [_, _, _, _, C, H, W, L, L, C, _, _, _, _, _, _],
    [_, _, _, C, H, W, L, L, L, D, C, _, _, _, _, _],
    [_, _, C, H, P, P, L, L, L, L, D, C, _, _, _, _],
    [_, _, C, H, L, P, P, L, L, L, D, C, _, _, _, _],
    [_, _, C, L, L, L, L, L, L, P, P, C, _, _, _, _],
    [_, _, C, H, L, L, L, L, L, L, D, C, _, _, _, _],
    [_, _, _, C, H, L, L, L, L, D, C, _, _, _, _, _],
    [_, _, _, C, H, L, L, L, L, D, C, _, _, _, _, _],
    [_, _, _, _, C, H, L, D, D, C, _, _, _, _, _, _],
    [_, _, _, _, _, C, D, D, C, _, _, _, _, _, _, _],
    [_, _, _, C, C, C, C, C, C, C, C, C, _, _, _, _],
    [_, _, _, C, C, C, C, C, C, C, C, C, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** EXP_STATUE — 16×32 (1×2 tiles), standing statue/sculpture */
export const EXP_STATUE: SpriteData = (() => {
  const S = '#C8C0B0' // stone light
  const M = '#A09888' // stone mid
  const H = '#E0D8CC' // highlight
  const B = '#504840' // base dark
  const rows: string[][] = []
  // Row 0: empty
  rows.push(new Array(16).fill(_))
  // Rows 1–3: head
  rows.push([_, _, _, _, _, _, M, M, M, M, _, _, _, _, _, _])
  rows.push([_, _, _, _, _, M, H, S, S, M, M, _, _, _, _, _])
  rows.push([_, _, _, _, _, M, S, H, S, S, M, _, _, _, _, _])
  rows.push([_, _, _, _, _, M, S, S, M, S, M, _, _, _, _, _])
  rows.push([_, _, _, _, _, _, M, M, M, M, _, _, _, _, _, _])
  // Rows 6–7: neck & shoulders
  rows.push([_, _, _, _, _, _, M, M, M, _, _, _, _, _, _, _])
  rows.push([_, _, _, _, M, M, S, S, S, M, M, _, _, _, _, _])
  // Rows 8–16: torso
  rows.push([_, _, _, M, H, S, S, S, S, S, M, M, _, _, _, _])
  rows.push([_, _, _, M, S, H, S, S, S, S, S, M, _, _, _, _])
  rows.push([_, _, _, M, S, S, S, S, S, S, S, M, _, _, _, _])
  rows.push([_, _, _, M, S, S, M, S, S, M, S, M, _, _, _, _])
  rows.push([_, _, _, M, S, S, S, S, S, S, S, M, _, _, _, _])
  rows.push([_, _, _, M, S, H, S, S, S, S, S, M, _, _, _, _])
  rows.push([_, _, _, M, S, S, S, S, S, S, S, M, _, _, _, _])
  rows.push([_, _, _, _, M, M, M, M, M, M, M, _, _, _, _, _])
  // Rows 17–22: lower body / hips
  rows.push([_, _, _, M, M, M, S, S, S, M, M, M, _, _, _, _])
  rows.push([_, _, _, M, S, S, S, S, S, S, S, M, _, _, _, _])
  rows.push([_, _, _, M, S, H, S, S, S, S, S, M, _, _, _, _])
  rows.push([_, _, _, M, S, S, S, S, S, S, S, M, _, _, _, _])
  rows.push([_, _, _, M, S, S, M, S, S, M, S, M, _, _, _, _])
  rows.push([_, _, _, M, S, S, S, S, S, S, S, M, _, _, _, _])
  // Rows 23–27: legs
  rows.push([_, _, _, M, S, M, M, _, M, M, S, M, _, _, _, _])
  rows.push([_, _, _, M, S, M, _, _, _, M, S, M, _, _, _, _])
  rows.push([_, _, _, M, H, M, _, _, _, M, H, M, _, _, _, _])
  rows.push([_, _, _, M, S, M, _, _, _, M, S, M, _, _, _, _])
  rows.push([_, _, _, M, M, M, _, _, _, M, M, M, _, _, _, _])
  // Rows 28–30: plinth
  rows.push([_, _, M, M, M, M, M, M, M, M, M, M, M, _, _, _])
  rows.push([_, _, B, B, B, B, B, B, B, B, B, B, B, _, _, _])
  rows.push([_, B, B, B, B, B, B, B, B, B, B, B, B, B, _, _])
  rows.push([_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _])
  return rows
})()

/** EXP_AQUARIUM — 32×16 (2×1 tiles), fish tank on cabinet */
export const EXP_AQUARIUM: SpriteData = (() => {
  const F = '#225588' // frame dark blue
  const G = '#44AACC' // glass tint
  const W = '#88DDFF' // water bright
  const D = '#114466' // water dark
  const S = '#CCDDEE' // glass highlight
  const R = '#FF5522' // orange fish
  const Y = '#FFDD00' // yellow fish
  const P = '#33BB55' // plant green
  const E = '#CC8844' // sand/substrate
  const K = '#8B7355' // cabinet dark
  const L = '#AA9977' // cabinet light
  const rows: string[][] = []
  // Row 0: glass top edge
  rows.push([_, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _])
  // Rows 1–9: water and fish
  rows.push([_, F, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, F, _])
  rows.push([_, F, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, G, F, _])
  rows.push([_, F, G, W, P, W, W, R, R, W, W, W, W, W, W, W, W, W, Y, Y, W, W, W, W, W, P, W, W, W, G, F, _])
  rows.push([_, F, G, D, P, D, W, W, R, W, W, D, D, W, W, W, W, Y, W, Y, W, W, D, D, W, P, W, W, D, G, F, _])
  rows.push([_, F, G, D, P, D, D, W, W, W, W, D, D, W, W, W, W, W, Y, W, W, W, D, D, W, P, W, D, D, G, F, _])
  rows.push([_, F, G, D, P, W, D, D, W, W, W, W, D, D, W, W, W, W, W, W, W, D, D, W, W, P, D, D, W, G, F, _])
  rows.push([_, F, G, W, P, W, W, W, W, R, W, W, W, W, W, W, W, Y, Y, W, W, W, W, W, W, P, W, W, W, G, F, _])
  rows.push([_, F, G, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, G, F, _])
  // Row 9: glass bottom
  rows.push([_, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _])
  // Rows 10–15: cabinet base
  rows.push([_, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, _])
  rows.push([_, K, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, K, _])
  rows.push([_, K, L, K, K, K, K, K, K, K, K, K, K, K, K, L, L, K, K, K, K, K, K, K, K, K, K, K, K, K, K, _])
  rows.push([_, K, L, K, L, L, L, L, L, L, L, L, L, K, K, L, L, K, L, L, L, L, L, L, L, L, L, K, K, K, K, _])
  rows.push([_, K, L, K, L, L, L, L, L, L, L, L, L, K, K, L, L, K, L, L, L, L, L, L, L, L, L, K, K, K, K, _])
  rows.push([_, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, K, _])
  return rows
})()

/** EXP_FIREPLACE — 32×32 (2×2 tiles), brick fireplace with fire */
export const EXP_FIREPLACE: SpriteData = (() => {
  const B = '#8B3A1A' // brick red
  const L = '#CC5522' // brick light
  const M = '#6B2A0A' // mortar dark
  const F = '#FF8800' // fire orange
  const Y = '#FFDD00' // fire yellow
  const W = '#FFFF88' // fire white-hot
  const E = '#222222' // firebox interior
  const A = '#333333' // ash
  const S = '#AA7744' // mantel wood
  const H = '#CC9966' // mantel highlight
  const rows: string[][] = []

  // Helper: brick row (alternating offsets)
  const brickRow = (offset: boolean): string[] => {
    const row: string[] = [_, M]
    for (let i = 0; i < 14; i++) {
      const phase = offset ? (i + 1) % 4 : i % 4
      row.push(phase < 3 ? (i % 2 === 0 ? B : L) : M)
    }
    row.push(M, M)
    for (let i = 0; i < 12; i++) {
      const phase = offset ? i % 4 : (i + 1) % 4
      row.push(phase < 3 ? (i % 2 === 0 ? L : B) : M)
    }
    row.push(M, _)
    return row
  }

  // Row 0: empty
  rows.push(new Array(32).fill(_))
  // Row 1: mantel top
  rows.push([_, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, _])
  rows.push([_, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, _])
  rows.push([_, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, _])
  // Rows 4–5: brick with fireplace opening start
  rows.push(brickRow(false))
  rows.push(brickRow(true))
  // Rows 6–22: main body with opening
  for (let r = 0; r < 17; r++) {
    const row: string[] = new Array(32).fill(_)
    // Left brick pillar (cols 1–8)
    for (let c = 1; c <= 8; c++) {
      const phase = (r + c) % 4
      row[c] = phase < 3 ? (c % 2 === 0 ? B : L) : M
    }
    // Right brick pillar (cols 23–30)
    for (let c = 23; c <= 30; c++) {
      const phase = (r + c) % 4
      row[c] = phase < 3 ? (c % 2 === 0 ? L : B) : M
    }
    // Interior firebox (cols 9–22)
    if (r < 14) {
      for (let c = 9; c <= 22; c++) row[c] = E
      // Fire in rows 7–16
      if (r >= 3) {
        const fireHeight = 14 - r
        const mid = 15
        for (let c = 9; c <= 22; c++) {
          const dx = Math.abs(c - mid)
          if (dx < fireHeight - 1 && r >= 5) row[c] = W
          else if (dx < fireHeight + 1) row[c] = Y
          else row[c] = r > 5 ? F : E
        }
      }
    } else {
      // Ash bed
      for (let c = 9; c <= 22; c++) row[c] = A
    }
    rows.push(row)
  }
  // Rows 23–25: bottom brick
  rows.push(brickRow(false))
  rows.push(brickRow(true))
  rows.push(brickRow(false))
  // Rows 26–29: hearth floor
  for (let r = 0; r < 4; r++) {
    const row: string[] = new Array(32).fill(_)
    for (let c = 1; c <= 30; c++) {
      row[c] = r % 2 === 0 ? (c % 4 < 2 ? B : L) : M
    }
    rows.push(row)
  }
  // Rows 30–31: empty
  rows.push(new Array(32).fill(_))
  rows.push(new Array(32).fill(_))
  return rows
})()

/** EXP_CANDELABRA — 16×16, ornate candelabra with candles, canPlaceOnSurfaces: true */
export const EXP_CANDELABRA: SpriteData = (() => {
  const G = '#BBAA44' // gold
  const D = '#886600' // dark gold
  const H = '#EEDD88' // highlight
  const C = '#EEEECC' // candle wax
  const F = '#FF9922' // flame orange
  const Y = '#FFEE44' // flame yellow
  const W = '#FFFF99' // flame tip
  return [
    [_, _, _, F, _, _, _, F, _, _, _, F, _, _, _, _],
    [_, _, F, Y, F, _, F, Y, F, _, F, Y, F, _, _, _],
    [_, _, _, W, _, _, _, W, _, _, _, W, _, _, _, _],
    [_, _, _, C, _, _, _, C, _, _, _, C, _, _, _, _],
    [_, _, _, C, _, _, _, C, _, _, _, C, _, _, _, _],
    [_, _, G, G, G, _, G, G, G, _, G, G, G, _, _, _],
    [_, _, D, H, D, _, D, H, D, _, D, H, D, _, _, _],
    [_, _, G, G, G, G, G, G, G, G, G, G, G, _, _, _],
    [_, _, _, D, H, G, G, H, G, G, H, D, _, _, _, _],
    [_, _, _, _, D, G, G, G, G, G, D, _, _, _, _, _],
    [_, _, _, _, _, D, G, G, G, D, _, _, _, _, _, _],
    [_, _, _, _, _, _, G, G, G, _, _, _, _, _, _, _],
    [_, _, _, _, _, G, G, G, G, G, _, _, _, _, _, _],
    [_, _, _, D, D, D, G, G, D, D, D, D, _, _, _, _],
    [_, _, _, D, H, D, H, H, D, H, D, D, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()
