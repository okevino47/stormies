import type { SpriteData } from '../types.js'

const _ = '' // transparent

// ── DESKS ────────────────────────────────────────────────────────────────────

/** EXP_SMALL_DESK — 16×16, single-tile desk, top-down wood */
export const EXP_SMALL_DESK: SpriteData = (() => {
  const W = '#8B6914' // wood edge
  const S = '#B8922E' // surface
  const L = '#C9A84C' // light grain
  const D = '#6B4E0A' // dark edge / shadow
  const H = '#D4B86A' // highlight
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, D, D, D, D, D, D, D, D, D, D, D, D, D, D, _],
    [_, D, H, H, H, H, H, H, H, H, H, H, H, H, W, _],
    [_, D, H, S, S, S, S, S, S, S, S, S, S, L, W, _],
    [_, D, H, S, L, S, S, S, S, S, S, L, S, S, W, _],
    [_, D, H, S, S, S, S, S, S, S, S, S, S, S, W, _],
    [_, D, H, S, S, S, L, L, L, L, S, S, S, S, W, _],
    [_, D, H, S, S, S, S, S, S, S, S, S, S, S, W, _],
    [_, D, H, S, L, S, S, S, S, S, S, L, S, S, W, _],
    [_, D, H, S, S, S, S, S, S, S, S, S, S, S, W, _],
    [_, D, H, S, S, S, S, S, S, S, S, S, S, S, W, _],
    [_, D, H, S, S, S, L, L, L, L, S, S, S, S, W, _],
    [_, D, H, S, S, S, S, S, S, S, S, S, S, S, W, _],
    [_, D, W, W, W, W, W, W, W, W, W, W, W, W, W, _],
    [_, _, D, D, _, _, _, _, _, _, _, _, D, D, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** EXP_L_DESK — 48×32, L-shaped desk (3×2 tiles), wood with darker accent edge */
export const EXP_L_DESK: SpriteData = (() => {
  const W = '#8B6914' // wood edge
  const S = '#B8922E' // surface
  const L = '#C9A84C' // light grain
  const D = '#6B4E0A' // dark edge
  const H = '#D4B86A' // highlight
  // Build 32 rows × 48 cols
  // The L-shape: full top two rows of tiles (48×32), but bottom-left tile is open (transparent)
  // Top half (rows 0–15): full width 48px desk surface
  // Bottom half (rows 16–31): right 32px only (cols 16–47), left 16px open
  const rows: string[][] = []

  // Row 0: transparent
  rows.push(new Array(48).fill(_))

  // Row 1: top edge full width
  rows.push([_, ...new Array(46).fill(D), _])

  // Rows 2–14: top surface, full width
  for (let r = 0; r < 13; r++) {
    const row: string[] = new Array(48).fill(_)
    row[0] = _; row[1] = D; row[47] = W; row[46] = W
    for (let c = 2; c <= 45; c++) {
      if (r === 0) row[c] = H
      else if (r % 4 === 2) row[c] = (c % 8 < 4) ? L : S
      else row[c] = S
    }
    rows.push(row)
  }

  // Row 15: bottom edge of top half — full width horizontal divider
  rows.push([_, D, ...new Array(44).fill(W), D, _])

  // Row 16: gap between halves — left 16 cols transparent, right 32 cols surface top edge
  {
    const r16 = new Array(48).fill(_) as string[]
    r16[17] = D; for (let c = 18; c <= 45; c++) r16[c] = D; r16[46] = W
    rows.push(r16)
  }

  // Rows 17–29: bottom surface, right 32 cols only
  for (let r = 0; r < 13; r++) {
    const row: string[] = new Array(48).fill(_)
    row[16] = _; row[17] = D; row[47] = W; row[46] = W
    for (let c = 18; c <= 45; c++) {
      if (r === 0) row[c] = H
      else if (r % 4 === 2) row[c] = (c % 6 < 3) ? L : S
      else row[c] = S
    }
    rows.push(row)
  }

  // Row 30: bottom edge of right section
  const bottomEdge: string[] = new Array(48).fill(_)
  for (let c = 17; c <= 46; c++) bottomEdge[c] = W
  rows.push(bottomEdge)

  // Row 31: legs bottom-right corner, transparent elsewhere
  const legRow: string[] = new Array(48).fill(_)
  legRow[18] = D; legRow[19] = D; legRow[44] = D; legRow[45] = D
  rows.push(legRow)

  return rows
})()

/** EXP_STANDING_DESK — 32×16, standing desk (2×1), metal legs, wood top */
export const EXP_STANDING_DESK: SpriteData = (() => {
  const W = '#8B6914' // wood edge
  const S = '#B8922E' // surface
  const L = '#C9A84C' // light grain
  const D = '#6B4E0A' // dark edge
  const M = '#707070' // metal legs
  const MH = '#989898' // metal highlight
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, _],
    [_, D, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, W, _],
    [_, D, L, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, L, W, _],
    [_, D, L, S, L, L, L, L, S, S, L, L, L, L, S, S, L, L, L, L, S, S, L, L, L, L, S, S, S, L, W, _],
    [_, D, L, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, L, W, _],
    [_, D, L, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, L, W, _],
    [_, D, L, S, L, L, L, L, S, S, L, L, L, L, S, S, L, L, L, L, S, S, L, L, L, L, S, S, S, L, W, _],
    [_, D, L, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, L, W, _],
    [_, D, L, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, L, W, _],
    [_, D, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, W, _],
    [_, D, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, _],
    [_, _, MH, M, M, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, M, MH, _, _],
    [_, _, MH, M, M, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, M, MH, _, _],
    [_, _, MH, M, M, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, M, MH, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** EXP_ROUND_TABLE — 16×16, circular table, wood, top-down */
export const EXP_ROUND_TABLE: SpriteData = (() => {
  const W = '#8B6914' // wood edge ring
  const S = '#B8922E' // surface
  const L = '#C9A84C' // light grain
  const D = '#6B4E0A' // shadow rim
  const H = '#D4B86A' // highlight center
  return [
    [_, _, _, _, _, D, D, D, D, D, D, _, _, _, _, _],
    [_, _, _, D, D, W, W, W, W, W, W, D, D, _, _, _],
    [_, _, D, W, W, S, S, S, S, S, S, W, W, D, _, _],
    [_, D, W, S, S, S, L, H, H, L, S, S, S, W, D, _],
    [_, D, W, S, L, H, H, H, H, H, H, L, S, W, D, _],
    [D, W, S, S, H, H, H, H, H, H, H, H, S, S, W, D],
    [D, W, S, L, H, H, H, L, L, H, H, H, L, S, W, D],
    [D, W, S, H, H, H, L, S, S, L, H, H, H, S, W, D],
    [D, W, S, H, H, H, L, S, S, L, H, H, H, S, W, D],
    [D, W, S, L, H, H, H, L, L, H, H, H, L, S, W, D],
    [D, W, S, S, H, H, H, H, H, H, H, H, S, S, W, D],
    [_, D, W, S, L, H, H, H, H, H, H, L, S, W, D, _],
    [_, D, W, S, S, S, L, H, H, L, S, S, S, W, D, _],
    [_, _, D, W, W, S, S, S, S, S, S, W, W, D, _, _],
    [_, _, _, D, D, W, W, W, W, W, W, D, D, _, _, _],
    [_, _, _, _, _, D, D, D, D, D, D, _, _, _, _, _],
  ]
})()

/** EXP_CONFERENCE_TABLE — 48×32, long meeting table (3×2 tiles), dark wood */
export const EXP_CONFERENCE_TABLE: SpriteData = (() => {
  const W = '#5C3D0A' // dark wood edge
  const S = '#7A5214' // dark surface
  const L = '#9A6B22' // lighter grain
  const D = '#3D2607' // deepest shadow
  const H = '#B8832E' // highlight line
  const rows: string[][] = []

  // Row 0: transparent
  rows.push(new Array(48).fill(_))

  // Row 1: top edge
  rows.push([_, ...new Array(46).fill(D), _])

  // Row 2: highlight strip
  rows.push([_, D, ...new Array(44).fill(H), W, _])

  // Rows 3–13: upper surface
  for (let r = 0; r < 11; r++) {
    const row: string[] = [_, D]
    for (let c = 0; c < 44; c++) {
      if (r % 5 === 2 && c % 12 < 2) row.push(L)
      else if (r % 5 === 4 && c % 12 >= 6 && c % 12 < 8) row.push(L)
      else row.push(S)
    }
    row.push(W); row.push(_)
    rows.push(row)
  }

  // Row 14: center divider
  rows.push([_, D, ...new Array(44).fill(W), W, _])

  // Row 15: highlight strip
  rows.push([_, D, ...new Array(44).fill(H), W, _])

  // Rows 16–28: lower surface
  for (let r = 0; r < 13; r++) {
    const row: string[] = [_, D]
    for (let c = 0; c < 44; c++) {
      if (r % 5 === 1 && c % 12 < 2) row.push(L)
      else if (r % 5 === 3 && c % 12 >= 6 && c % 12 < 8) row.push(L)
      else row.push(S)
    }
    row.push(W); row.push(_)
    rows.push(row)
  }

  // Row 29: bottom edge
  rows.push([_, D, ...new Array(44).fill(W), W, _])

  // Row 30: legs
  const legRow = new Array(48).fill(_) as string[]
  legRow[2] = D; legRow[3] = D; legRow[44] = D; legRow[45] = D
  rows.push(legRow)

  // Row 31: transparent
  rows.push(new Array(48).fill(_))

  return rows
})()

/** EXP_CORNER_DESK — 32×32, corner/wedge desk (2×2 tiles), wood + metal */
export const EXP_CORNER_DESK: SpriteData = (() => {
  const W = '#8B6914' // wood edge
  const S = '#B8922E' // surface
  const L = '#C9A84C' // light grain
  const D = '#6B4E0A' // dark edge
  const M = '#707070' // metal accent
  const MH = '#A0A0A0' // metal highlight
  const rows: string[][] = []

  // The corner desk is wedge-shaped: full top (row 0), then left edge steps inward each section.
  // Tile layout: top-right quadrant + bottom-right quadrant + bottom-left quadrant form an L,
  // but we fill as a triangle/corner wedge:
  // Rows 0–15: cols 0..31 (full width top section)
  // Rows 16–31: cols 16..31 only (right section)

  rows.push(new Array(32).fill(_))

  // Row 1: top edge full
  rows.push([_, ...new Array(30).fill(D), _])

  // Rows 2–14: top section full width (32 cols: _, D, 28 items, W, _)
  for (let r = 0; r < 13; r++) {
    const row: string[] = [_, D]
    for (let c = 0; c < 28; c++) {
      if (r === 0) row.push(L)
      else if (c >= 26) row.push(M)
      else if (r % 4 === 1 && c % 8 < 2) row.push(L)
      else row.push(S)
    }
    row.push(W); row.push(_)
    rows.push(row)
  }

  // Row 15: inner horizontal divider — 32 cols
  rows.push([_, D, ...new Array(29).fill(W), _])

  // Row 16: metal corner brace + right section starts
  const braceRow: string[] = new Array(32).fill(_)
  braceRow[16] = M; braceRow[17] = MH
  for (let c = 18; c <= 29; c++) braceRow[c] = D
  braceRow[30] = W
  rows.push(braceRow)

  // Rows 17–29: right section (cols 16..31 only)
  for (let r = 0; r < 13; r++) {
    const row: string[] = new Array(32).fill(_)
    row[16] = M; row[17] = D
    for (let c = 18; c <= 29; c++) {
      if (r === 0) row[c] = L
      else if (r % 4 === 2 && c % 6 < 2) row[c] = L
      else row[c] = S
    }
    row[30] = W
    rows.push(row)
  }

  // Row 30: bottom edge right section
  const botEdge = new Array(32).fill(_) as string[]
  for (let c = 16; c <= 30; c++) botEdge[c] = W
  rows.push(botEdge)

  // Row 31: legs
  const legRow = new Array(32).fill(_) as string[]
  legRow[18] = D; legRow[19] = D; legRow[28] = D; legRow[29] = D
  rows.push(legRow)

  return rows
})()

/** EXP_RECEPTION_DESK — 48×16, reception counter (3×1), polished wood */
export const EXP_RECEPTION_DESK: SpriteData = (() => {
  const W = '#8B6914' // wood edge
  const S = '#B8922E' // surface
  const L = '#C9A84C' // light grain
  const D = '#6B4E0A' // dark edge
  const H = '#E8D090' // polished highlight
  const F = '#5C3D0A' // front panel dark
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, _],
    [_, D, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, W, _],
    [_, D, H, S, S, S, L, S, S, S, S, L, S, S, S, S, L, S, S, S, S, L, S, S, S, S, L, S, S, S, S, L, S, S, S, S, L, S, S, S, S, L, S, S, S, S, W, _],
    [_, D, H, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, W, _],
    [_, D, H, S, L, S, S, S, L, S, S, S, L, S, S, S, L, S, S, S, L, S, S, S, L, S, S, S, L, S, S, S, L, S, S, S, L, S, S, S, L, S, S, S, L, S, W, _],
    [_, D, H, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, W, _],
    [_, D, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, _],
    [_, _, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _, _],
    [_, _, F, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, F, _, _],
    [_, _, F, W, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, W, F, _, _],
    [_, _, F, W, S, L, S, S, S, S, S, S, L, S, S, S, S, S, S, S, L, S, S, S, S, S, S, S, L, S, S, S, S, S, S, S, L, S, S, S, S, S, S, S, W, F, _, _],
    [_, _, F, W, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, W, F, _, _],
    [_, _, F, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, F, _, _],
    [_, _, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** EXP_COUNTER — 32×16, kitchen/bar counter (2×1), marble/white top */
export const EXP_COUNTER: SpriteData = (() => {
  const B = '#E8E8EC' // marble base white
  const V = '#C8C8D0' // marble vein light
  const K = '#A8A8B4' // marble vein dark
  const E = '#606070' // dark edge
  const F = '#888898' // front panel
  const H = '#F4F4F8' // highlight
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, _],
    [_, E, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, F, _],
    [_, E, H, B, B, V, B, B, K, B, B, V, B, B, B, K, B, B, V, B, B, K, B, B, V, B, B, B, B, B, F, _],
    [_, E, H, B, V, B, B, B, B, B, V, B, B, K, B, B, B, K, B, B, B, B, B, V, B, B, K, B, B, B, F, _],
    [_, E, H, B, B, B, K, B, B, V, B, B, B, B, B, V, B, B, B, B, K, B, B, B, B, B, B, V, B, B, F, _],
    [_, E, H, V, B, B, B, B, V, B, B, B, K, B, B, B, B, B, V, B, B, B, B, K, B, B, B, B, B, B, F, _],
    [_, E, H, B, B, K, B, B, B, B, B, V, B, B, B, B, K, B, B, B, V, B, B, B, B, B, K, B, B, B, F, _],
    [_, E, H, B, B, B, B, V, B, B, K, B, B, B, V, B, B, B, B, B, B, B, V, B, B, K, B, B, B, B, F, _],
    [_, E, H, B, V, B, B, B, B, K, B, B, V, B, B, B, B, B, K, B, B, V, B, B, B, B, B, B, K, B, F, _],
    [_, E, H, B, B, B, V, B, B, B, B, B, B, B, K, B, B, V, B, B, B, B, B, B, V, B, B, B, B, B, F, _],
    [_, E, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, F, _],
    [_, E, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _],
    [_, E, F, V, B, B, B, B, B, V, B, B, B, B, V, B, B, B, B, B, V, B, B, B, V, B, B, B, B, F, F, _],
    [_, E, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

// ── CHAIRS ───────────────────────────────────────────────────────────────────

/** EXP_ARMCHAIR — 16×16, cushioned armchair, warm fabric, top-down */
export const EXP_ARMCHAIR: SpriteData = (() => {
  const F = '#C4783A' // fabric base orange-brown
  const L = '#D99050' // fabric light
  const D = '#8A4E20' // fabric dark / shadow
  const A = '#6B3A10' // armrest dark
  const H = '#E8B070' // cushion highlight
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, A, A, A, A, A, A, A, A, A, A, A, A, A, A, _],
    [_, A, D, D, D, D, D, D, D, D, D, D, D, D, A, _],
    [_, A, D, H, H, H, H, H, H, H, H, H, H, D, A, _],
    [_, A, D, H, L, L, L, L, L, L, L, L, H, D, A, _],
    [_, A, D, H, L, F, F, F, F, F, F, L, H, D, A, _],
    [_, A, D, H, L, F, H, H, H, H, F, L, H, D, A, _],
    [_, A, D, H, L, F, H, F, F, H, F, L, H, D, A, _],
    [_, A, D, H, L, F, H, F, F, H, F, L, H, D, A, _],
    [_, A, D, H, L, F, H, H, H, H, F, L, H, D, A, _],
    [_, A, D, H, L, F, F, F, F, F, F, L, H, D, A, _],
    [_, A, D, H, L, L, L, L, L, L, L, L, H, D, A, _],
    [_, A, D, H, H, H, H, H, H, H, H, H, H, D, A, _],
    [_, A, D, D, D, D, D, D, D, D, D, D, D, D, A, _],
    [_, A, A, A, A, A, A, A, A, A, A, A, A, A, A, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** EXP_STOOL — 16×16, bar/kitchen stool, metal + wood seat, top-down */
export const EXP_STOOL: SpriteData = (() => {
  const W = '#B8922E' // wood seat
  const L = '#D4B86A' // wood light
  const D = '#6B4E0A' // wood dark rim
  const MH = '#909090' // metal highlight
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, D, D, D, D, D, D, _, _, _, _, _],
    [_, _, _, D, D, W, W, W, W, W, W, D, D, _, _, _],
    [_, _, D, W, L, L, L, L, L, L, L, L, W, D, _, _],
    [_, _, D, W, L, W, W, W, W, W, W, L, W, D, _, _],
    [_, _, D, W, L, W, L, L, L, L, W, L, W, D, _, _],
    [_, _, D, W, L, W, L, W, W, L, W, L, W, D, _, _],
    [_, _, D, W, L, W, L, W, W, L, W, L, W, D, _, _],
    [_, _, D, W, L, W, L, W, W, L, W, L, W, D, _, _],
    [_, _, D, W, L, W, L, L, L, L, W, L, W, D, _, _],
    [_, _, D, W, L, W, W, W, W, W, W, L, W, D, _, _],
    [_, _, D, W, L, L, L, L, L, L, L, L, W, D, _, _],
    [_, _, _, D, W, W, W, W, W, W, W, W, D, _, _, _],
    [_, _, _, _, D, D, D, D, D, D, D, D, _, MH, _, _],
    [_, MH, _, _, _, _, _, _, _, _, _, _, _, MH, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** EXP_BEAN_BAG — 16×16, bean bag, soft round shape, top-down */
export const EXP_BEAN_BAG: SpriteData = (() => {
  const B = '#6655CC' // base purple
  const L = '#8877EE' // light purple
  const D = '#443388' // dark shadow
  const H = '#BBAAFF' // highlight
  const S = '#221144' // deep shadow
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, S, S, S, S, S, S, _, _, _, _, _],
    [_, _, _, S, S, D, D, D, D, D, D, S, S, _, _, _],
    [_, _, S, D, D, B, B, B, B, B, B, D, D, S, _, _],
    [_, _, S, D, B, L, L, L, L, L, L, B, D, S, _, _],
    [_, S, D, B, L, H, H, H, H, H, H, L, B, D, S, _],
    [_, S, D, B, L, H, H, L, L, H, H, L, B, D, S, _],
    [_, S, D, B, L, H, L, B, B, L, H, L, B, D, S, _],
    [_, S, D, B, L, H, L, B, B, L, H, L, B, D, S, _],
    [_, S, D, B, L, H, H, L, L, H, H, L, B, D, S, _],
    [_, S, D, B, L, H, H, H, H, H, H, L, B, D, S, _],
    [_, _, S, D, B, L, L, L, L, L, L, B, D, S, _, _],
    [_, _, S, D, D, B, B, B, B, B, B, D, D, S, _, _],
    [_, _, _, S, S, D, D, D, D, D, D, S, S, _, _, _],
    [_, _, _, _, _, S, S, S, S, S, S, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** EXP_BENCH — 32×16, park/waiting bench, wood slats, top-down */
export const EXP_BENCH: SpriteData = (() => {
  const W = '#8B6914' // wood frame
  const S = '#B8922E' // slat surface
  const L = '#C9A84C' // slat light
  const D = '#6B4E0A' // shadow
  const G = '#404040' // metal bracket
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, _],
    [_, D, L, L, L, L, L, L, W, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, W, L, L, L, L, W, _],
    [_, D, S, S, S, S, S, S, W, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, W, S, S, S, S, W, _],
    [_, D, S, S, S, S, S, S, W, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, W, S, S, S, S, W, _],
    [_, D, S, S, S, S, S, S, D, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, D, S, S, S, S, W, _],
    [_, D, D, D, D, D, D, D, G, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, G, D, D, D, D, W, _],
    [_, D, L, L, L, L, L, L, W, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, W, L, L, L, L, W, _],
    [_, D, S, S, S, S, S, S, W, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, W, S, S, S, S, W, _],
    [_, D, S, S, S, S, S, S, W, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, W, S, S, S, S, W, _],
    [_, D, S, S, S, S, S, S, D, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, D, S, S, S, S, W, _],
    [_, D, D, D, D, D, D, D, G, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, G, D, D, D, D, W, _],
    [_, D, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, _],
    [_, _, G, G, _, _, _, _, G, _, _, _, _, _, _, _, G, _, _, _, _, _, _, _, G, _, _, _, _, G, G, _],
    [_, _, G, G, _, _, _, _, G, _, _, _, _, _, _, _, G, _, _, _, _, _, _, _, G, _, _, _, _, G, G, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** EXP_THREE_SEAT_SOFA — 48×16, three-seater sofa, fabric, top-down */
export const EXP_THREE_SEAT_SOFA: SpriteData = (() => {
  const F = '#4A7ACC' // fabric blue
  const L = '#6A9AEC' // fabric light
  const D = '#2A4A8A' // fabric dark
  const A = '#1A2A5A' // armrest dark
  const H = '#9ABCF0' // cushion highlight
  const C = '#3A6AAA' // seat crease
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, A, A, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, A, A, _],
    [_, A, D, H, H, H, H, H, H, H, H, H, H, H, H, H, C, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, C, H, H, H, H, H, H, H, H, H, H, H, H, D, A, _],
    [_, A, D, H, L, L, L, L, L, L, L, L, L, L, L, L, C, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, C, L, L, L, L, L, L, L, L, L, L, L, H, D, A, _],
    [_, A, D, H, L, F, F, F, F, F, F, F, F, F, F, L, C, L, F, F, F, F, F, F, F, F, F, F, F, F, L, C, C, L, F, F, F, F, F, F, F, F, F, L, H, D, A, _],
    [_, A, D, H, L, F, H, H, H, H, H, H, H, H, F, L, C, L, F, H, H, H, H, H, H, H, H, H, F, L, C, C, L, F, H, H, H, H, H, H, H, H, F, L, H, D, A, _],
    [_, A, D, H, L, F, H, F, F, F, F, F, F, H, F, L, C, L, F, H, F, F, F, F, F, F, F, H, F, L, C, C, L, F, H, F, F, F, F, F, F, H, F, L, H, D, A, _],
    [_, A, D, H, L, F, H, F, F, F, F, F, F, H, F, L, C, L, F, H, F, F, F, F, F, F, F, H, F, L, C, C, L, F, H, F, F, F, F, F, F, H, F, L, H, D, A, _],
    [_, A, D, H, L, F, H, H, H, H, H, H, H, H, F, L, C, L, F, H, H, H, H, H, H, H, H, H, F, L, C, C, L, F, H, H, H, H, H, H, H, H, F, L, H, D, A, _],
    [_, A, D, H, L, F, F, F, F, F, F, F, F, F, F, L, C, L, F, F, F, F, F, F, F, F, F, F, F, L, C, C, L, F, F, F, F, F, F, F, F, F, F, L, H, D, A, _],
    [_, A, D, H, L, L, L, L, L, L, L, L, L, L, L, L, C, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, C, L, L, L, L, L, L, L, L, L, L, L, H, D, A, _],
    [_, A, D, H, H, H, H, H, H, H, H, H, H, H, H, H, C, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, C, H, H, H, H, H, H, H, H, H, H, H, H, D, A, _],
    [_, A, A, D, D, D, D, D, D, D, D, D, D, D, D, D, C, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, C, D, D, D, D, D, D, D, D, D, D, D, D, A, A, _],
    [_, _, _, A, A, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, A, A, _, _],
    [_, _, _, A, A, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, A, A, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** EXP_RECLINER — 16×16, reclining chair with footrest hint, top-down */
export const EXP_RECLINER: SpriteData = (() => {
  const F = '#B86030' // warm leather base
  const L = '#D08050' // leather light
  const D = '#7A3A10' // leather dark
  const H = '#E8A870' // highlight
  const A = '#502010' // armrest very dark
  const R = '#C87040' // footrest
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, A, A, A, A, A, A, A, A, A, A, A, A, A, _, _],
    [_, A, D, D, D, D, D, D, D, D, D, D, D, A, _, _],
    [_, A, D, H, H, H, H, H, H, H, H, H, D, A, _, _],
    [_, A, D, H, L, L, L, L, L, L, L, H, D, A, _, _],
    [_, A, D, H, L, F, F, F, F, F, L, H, D, A, _, _],
    [_, A, D, H, L, F, H, H, H, F, L, H, D, A, _, _],
    [_, A, D, H, L, F, H, D, H, F, L, H, D, A, _, _],
    [_, A, D, H, L, F, H, D, H, F, L, H, D, A, _, _],
    [_, A, D, H, L, F, H, H, H, F, L, H, D, A, _, _],
    [_, A, D, H, L, F, F, F, F, F, L, H, D, A, _, _],
    [_, A, D, H, L, L, L, L, L, L, L, H, D, A, _, _],
    [_, A, D, D, D, D, D, D, D, D, D, D, D, A, _, _],
    [_, A, A, A, A, A, A, A, A, A, A, A, A, A, _, _],
    [_, _, R, R, R, R, R, R, R, R, R, R, R, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** EXP_FOLDING_CHAIR — 16×16, metal folding chair, thin frame, top-down */
export const EXP_FOLDING_CHAIR: SpriteData = (() => {
  const M = '#808080' // metal frame
  const MH = '#C0C0C0' // metal highlight
  const MD = '#404040' // metal dark
  const S = '#D0D0D8' // seat light
  const SD = '#A0A0AA' // seat shadow
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, _, _],
    [_, MD, MH, S, S, S, S, S, S, S, S, S, S, MH, MD, _],
    [_, MD, S, S, SD, SD, SD, SD, SD, SD, SD, SD, S, S, MD, _],
    [_, MD, S, SD, S, S, S, S, S, S, S, S, SD, S, MD, _],
    [_, MD, S, SD, S, MH, MH, MH, MH, MH, MH, S, SD, S, MD, _],
    [_, MD, S, SD, S, MH, S, S, S, S, MH, S, SD, S, MD, _],
    [_, MD, S, SD, S, MH, S, M, M, S, MH, S, SD, S, MD, _],
    [_, MD, S, SD, S, MH, S, M, M, S, MH, S, SD, S, MD, _],
    [_, MD, S, SD, S, MH, S, S, S, S, MH, S, SD, S, MD, _],
    [_, MD, S, SD, S, MH, MH, MH, MH, MH, MH, S, SD, S, MD, _],
    [_, MD, S, SD, S, S, S, S, S, S, S, S, SD, S, MD, _],
    [_, MD, S, S, SD, SD, SD, SD, SD, SD, SD, SD, S, S, MD, _],
    [_, MD, MH, S, S, S, S, S, S, S, S, S, S, MH, MD, _],
    [_, _, MD, MD, _, _, MD, _, _, _, MD, _, _, MD, MD, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** EXP_GAMING_CHAIR — 16×16, gaming chair with high back, black+red accent, top-down */
export const EXP_GAMING_CHAIR: SpriteData = (() => {
  const B = '#1A1A1A' // black base
  const R = '#CC1111' // red accent
  const G = '#282828' // dark gray seat
  const H = '#484848' // highlight gray
  const W = '#FFFFFF' // white accent stripe
  const S = '#CC3333' // red seat center
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _],
    [_, B, R, R, R, R, R, R, R, R, R, R, R, R, B, _],
    [_, B, R, W, W, W, W, W, W, W, W, W, W, R, B, _],
    [_, B, R, W, G, G, G, G, G, G, G, G, W, R, B, _],
    [_, B, R, W, G, H, H, H, H, H, H, G, W, R, B, _],
    [_, B, R, W, G, H, S, S, S, S, H, G, W, R, B, _],
    [_, B, R, W, G, H, S, R, R, S, H, G, W, R, B, _],
    [_, B, R, W, G, H, S, R, R, S, H, G, W, R, B, _],
    [_, B, R, W, G, H, S, S, S, S, H, G, W, R, B, _],
    [_, B, R, W, G, H, H, H, H, H, H, G, W, R, B, _],
    [_, B, R, W, G, G, G, G, G, G, G, G, W, R, B, _],
    [_, B, R, W, W, W, W, W, W, W, W, W, W, R, B, _],
    [_, B, R, R, R, R, R, R, R, R, R, R, R, R, B, _],
    [_, B, B, B, _, _, B, _, _, _, B, _, _, B, B, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()
