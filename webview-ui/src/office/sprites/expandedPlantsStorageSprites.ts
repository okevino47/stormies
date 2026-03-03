import type { SpriteData } from '../types.js'

const _ = '' // transparent

// ── PLANTS ───────────────────────────────────────────────────────────────────

/** Succulent in tiny pot: 16×16 — top-down green rosette */
export const EXP_SUCCULENT: SpriteData = (() => {
  const G = '#5DB84A' // bright leaf green
  const D = '#3A8A2C' // dark leaf green
  const H = '#8FD47C' // highlight green
  const P = '#C8724A' // terracotta pot
  const R = '#A05238' // pot shadow/rim
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, D, D, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, D, G, G, D, _, _, _, _, _, _, _],
    [_, _, _, _, D, G, H, G, G, D, _, _, _, _, _, _],
    [_, _, _, D, G, H, G, G, H, G, D, _, _, _, _, _],
    [_, _, _, D, G, G, H, H, G, G, D, _, _, _, _, _],
    [_, _, D, G, G, G, H, H, G, G, G, D, _, _, _, _],
    [_, _, D, G, G, H, G, G, H, G, G, D, _, _, _, _],
    [_, _, _, D, G, G, G, G, G, G, D, _, _, _, _, _],
    [_, _, _, _, D, G, G, G, G, D, _, _, _, _, _, _],
    [_, _, _, _, _, D, D, D, D, _, _, _, _, _, _, _],
    [_, _, _, _, _, R, P, P, R, _, _, _, _, _, _, _],
    [_, _, _, _, R, P, P, P, P, R, _, _, _, _, _, _],
    [_, _, _, _, R, P, P, P, P, R, _, _, _, _, _, _],
    [_, _, _, _, _, R, R, R, R, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Hanging plant: 16×16 — trailing vines, wall-mountable */
export const EXP_HANGING_PLANT: SpriteData = (() => {
  const G = '#4DB340' // vine green
  const D = '#2E7A23' // dark green
  const H = '#79CC69' // highlight
  const W = '#8B6620' // wood bracket
  const S = '#5C4010' // bracket shadow
  return [
    [_, _, _, _, _, S, W, W, W, W, S, _, _, _, _, _],
    [_, _, _, _, _, W, W, W, W, W, W, _, _, _, _, _],
    [_, _, _, _, _, _, W, S, S, W, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, G, G, _, _, _, _, _, _, _],
    [_, _, _, D, G, _, _, G, G, _, _, G, D, _, _, _],
    [_, _, D, G, G, D, _, G, G, _, D, G, G, D, _, _],
    [_, _, G, H, G, G, D, G, G, D, G, H, G, G, _, _],
    [_, D, G, G, G, G, _, G, G, _, G, G, G, G, D, _],
    [_, G, H, G, D, _, _, G, G, _, _, D, G, H, G, _],
    [_, G, G, D, _, _, _, G, G, _, _, _, D, G, G, _],
    [_, D, G, _, _, _, D, G, G, D, _, _, _, G, D, _],
    [_, _, G, D, _, D, G, G, G, G, D, _, D, G, _, _],
    [_, _, D, G, D, G, H, G, G, H, G, D, G, D, _, _],
    [_, _, _, D, G, G, G, G, G, G, G, G, D, _, _, _],
    [_, _, _, _, D, G, H, G, G, H, G, D, _, _, _, _],
    [_, _, _, _, _, D, D, D, D, D, D, _, _, _, _, _],
  ]
})()

/** Flower pot: 16×16 — colorful blooms in terracotta pot */
export const EXP_FLOWER_POT: SpriteData = (() => {
  const P = '#C8724A' // terracotta
  const R = '#A05238' // pot rim/shadow
  const G = '#3D8B37' // stem green
  const Y = '#F2C530' // yellow bloom
  const M = '#E0508A' // magenta bloom
  const V = '#9055CC' // violet bloom
  const H = '#FFFFFF' // bloom highlight
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, Y, _, _, _, M, _, _, Y, _, _, _, _],
    [_, _, _, H, Y, Y, _, M, M, M, _, Y, H, _, _, _],
    [_, _, _, Y, Y, H, G, M, H, M, G, Y, Y, _, _, _],
    [_, _, _, _, Y, _, G, G, G, G, G, _, Y, _, _, _],
    [_, _, _, _, V, _, G, G, G, G, G, _, V, _, _, _],
    [_, _, _, H, V, V, G, G, G, G, G, V, H, _, _, _],
    [_, _, _, V, V, H, G, G, G, G, G, H, V, _, _, _],
    [_, _, _, _, _, _, G, G, G, G, G, _, _, _, _, _],
    [_, _, _, _, _, R, R, R, R, R, R, R, _, _, _, _],
    [_, _, _, _, R, P, P, P, P, P, P, P, R, _, _, _],
    [_, _, _, _, R, P, P, P, P, P, P, P, R, _, _, _],
    [_, _, _, _, R, P, P, P, P, P, P, P, R, _, _, _],
    [_, _, _, _, _, R, P, P, P, P, P, R, _, _, _, _],
    [_, _, _, _, _, _, R, R, R, R, R, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Cactus: 16×24 — classic desert cactus with arms in pot */
export const EXP_CACTUS: SpriteData = (() => {
  const G = '#4A9A3A' // cactus green
  const D = '#2E6B24' // dark green
  const H = '#72C05C' // highlight ridge
  const P = '#C8724A' // terracotta pot
  const R = '#A05238' // pot rim
  const S = '#F5D070' // spine/thorn
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, D, G, G, D, _, _, _, _, _, _],
    [_, _, _, D, G, G, D, G, G, D, _, _, _, _, _, _],
    [_, _, D, G, H, G, D, G, G, D, G, D, _, _, _, _],
    [_, _, D, G, G, D, _, G, G, _, D, D, _, _, _, _],
    [_, _, D, G, H, D, S, G, G, S, _, _, _, _, _, _],
    [_, _, _, D, D, _, _, D, G, D, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, D, G, D, _, _, _, _, _, _],
    [_, _, _, _, _, S, _, D, G, D, _, S, _, _, _, _],
    [_, _, _, _, _, _, _, D, G, D, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, D, G, D, _, _, _, _, _, _],
    [_, _, _, _, _, _, S, D, G, D, S, _, _, _, _, _],
    [_, _, _, _, _, _, _, D, G, D, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, D, D, D, _, _, _, _, _, _],
    [_, _, _, _, _, R, R, R, R, R, R, R, _, _, _, _],
    [_, _, _, _, R, P, P, P, P, P, P, P, R, _, _, _],
    [_, _, _, _, R, P, P, P, P, P, P, P, R, _, _, _],
    [_, _, _, _, R, P, P, P, P, P, P, P, R, _, _, _],
    [_, _, _, _, R, P, P, P, P, P, P, P, R, _, _, _],
    [_, _, _, _, _, R, P, P, P, P, P, R, _, _, _, _],
    [_, _, _, _, _, _, R, P, P, P, R, _, _, _, _, _],
    [_, _, _, _, _, _, _, R, R, R, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Bamboo: 16×32 (1×2 tiles) — tall bamboo stalks in planter */
export const EXP_BAMBOO: SpriteData = (() => {
  const G = '#7DB83A' // bamboo stalk light
  const D = '#4E8020' // bamboo dark
  const N = '#A8CC50' // node highlight
  const L = '#5ABF30' // leaf green
  const K = '#3A8A18' // leaf dark
  const P = '#6B5C3A' // planter brown
  const B = '#4A3E24' // planter dark
  const rows: string[][] = []
  rows.push(new Array(16).fill(_))
  rows.push([_, _, _, L, K, _, _, _, _, _, L, K, _, _, _, _])
  rows.push([_, _, L, K, L, L, _, _, _, L, K, L, _, _, _, _])
  rows.push([_, _, K, L, L, K, _, _, _, K, L, L, K, _, _, _])
  rows.push([_, _, _, D, G, N, _, _, _, D, G, N, _, _, _, _])
  rows.push([_, _, _, D, G, G, _, _, _, D, G, G, _, _, _, _])
  rows.push([_, _, _, D, G, G, _, _, _, D, G, G, _, _, _, _])
  rows.push([_, _, _, D, N, N, _, _, _, D, N, N, _, _, _, _])
  rows.push([_, L, K, D, G, G, L, K, L, D, G, G, K, _, _, _])
  rows.push([_, K, L, D, G, G, K, L, K, D, G, G, L, K, _, _])
  rows.push([_, _, _, D, G, N, _, _, _, D, G, N, _, _, _, _])
  rows.push([_, _, _, D, G, G, _, _, _, D, G, G, _, _, _, _])
  rows.push([_, _, _, D, G, G, _, _, _, D, G, G, _, _, _, _])
  rows.push([_, _, _, D, N, N, _, _, _, D, N, N, _, _, _, _])
  rows.push([_, _, _, D, G, G, _, _, _, D, G, G, _, _, _, _])
  rows.push([_, _, _, D, G, G, _, _, _, D, G, G, _, _, _, _])
  rows.push([_, _, _, D, N, N, _, _, _, D, N, N, _, _, _, _])
  rows.push([_, _, L, D, G, G, L, K, K, D, G, G, K, _, _, _])
  rows.push([_, _, K, D, G, G, K, L, L, D, G, G, L, _, _, _])
  rows.push([_, _, _, D, G, N, _, _, _, D, G, N, _, _, _, _])
  rows.push([_, _, _, D, G, G, _, _, _, D, G, G, _, _, _, _])
  rows.push([_, _, _, D, G, G, _, _, _, D, G, G, _, _, _, _])
  rows.push([_, _, _, D, N, N, _, _, _, D, N, N, _, _, _, _])
  rows.push([_, _, _, D, G, G, _, _, _, D, G, G, _, _, _, _])
  rows.push([_, _, _, D, G, G, _, _, _, D, G, G, _, _, _, _])
  rows.push([_, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _])
  for (let r = 0; r < 3; r++) {
    rows.push([_, B, P, P, P, P, P, P, P, P, P, P, P, P, B, _])
  }
  rows.push([_, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _])
  rows.push(new Array(16).fill(_))
  rows.push(new Array(16).fill(_))
  return rows
})()

/** Bonsai: 16×16 — miniature bonsai tree, canPlaceOnSurfaces */
export const EXP_BONSAI: SpriteData = (() => {
  const G = '#3DA832' // canopy green
  const D = '#267020' // dark canopy
  const H = '#68CC58' // highlight
  const T = '#7B4F1E' // trunk brown
  const K = '#4E3010' // trunk dark
  const P = '#C8A06A' // shallow pot
  const R = '#8B6830' // pot rim
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, D, G, G, _, _, _, _, _, _, _],
    [_, _, _, _, _, D, G, H, G, D, _, _, _, _, _, _],
    [_, _, _, D, G, G, H, G, G, H, G, D, _, _, _, _],
    [_, _, D, G, H, G, G, G, G, G, H, G, D, _, _, _],
    [_, _, G, H, G, D, G, G, G, D, G, H, G, _, _, _],
    [_, _, D, G, G, G, D, G, D, G, G, G, D, _, _, _],
    [_, _, _, D, G, G, G, D, G, G, G, D, _, _, _, _],
    [_, _, _, _, D, D, G, T, G, D, D, _, _, _, _, _],
    [_, _, _, _, _, _, T, K, T, _, _, _, _, _, _, _],
    [_, _, _, _, _, T, K, T, K, T, _, _, _, _, _, _],
    [_, _, _, _, R, R, R, R, R, R, R, _, _, _, _, _],
    [_, _, _, _, R, P, P, P, P, P, R, _, _, _, _, _],
    [_, _, _, _, R, P, P, P, P, P, R, _, _, _, _, _],
    [_, _, _, _, _, R, R, R, R, R, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Fern: 16×16 — bushy fern with many fronds in pot */
export const EXP_FERN: SpriteData = (() => {
  const G = '#3FA82E' // frond green
  const D = '#25701A' // dark frond
  const H = '#72CC5A' // frond highlight
  const P = '#C8724A' // terracotta
  const R = '#A05238' // pot rim
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, D, G, _, _, _, _, _, _, _, G, D, _, _, _],
    [_, D, G, H, G, D, _, _, _, D, G, H, G, D, _, _],
    [_, G, H, G, G, G, D, _, D, G, G, G, H, G, _, _],
    [_, D, G, G, D, G, G, D, G, G, D, G, G, D, _, _],
    [_, _, G, H, G, G, H, G, H, G, G, H, G, _, _, _],
    [_, _, D, G, G, H, G, G, G, H, G, G, D, _, _, _],
    [_, _, _, D, G, G, G, G, G, G, G, D, _, _, _, _],
    [_, _, _, G, H, G, D, G, D, G, H, G, _, _, _, _],
    [_, _, D, G, G, G, G, G, G, G, G, G, D, _, _, _],
    [_, _, _, _, _, D, G, G, G, D, _, _, _, _, _, _],
    [_, _, _, _, _, R, R, R, R, R, R, _, _, _, _, _],
    [_, _, _, _, R, P, P, P, P, P, P, R, _, _, _, _],
    [_, _, _, _, R, P, P, P, P, P, P, R, _, _, _, _],
    [_, _, _, _, _, R, R, R, R, R, R, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Flower arrangement: 16×16 — bouquet in vase, canPlaceOnSurfaces */
export const EXP_FLOWER_ARRANGEMENT: SpriteData = (() => {
  const R = '#E03050' // red bloom
  const Y = '#F2C530' // yellow bloom
  const V = '#9055CC' // violet bloom
  const W = '#F8F0F0' // white bloom
  const G = '#3D8B37' // stem green
  const B = '#5599CC' // vase blue
  const L = '#88BBDD' // vase highlight
  const K = '#2A5A7A' // vase dark
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, R, _, _, Y, _, _, V, _, _, R, _, _, _],
    [_, _, R, R, R, G, Y, Y, G, V, V, R, R, R, _, _],
    [_, _, _, R, _, G, Y, G, G, V, _, R, _, _, _, _],
    [_, _, _, W, _, G, G, G, G, G, _, W, _, _, _, _],
    [_, _, W, W, W, G, G, G, G, G, W, W, W, _, _, _],
    [_, _, _, W, _, G, G, G, G, G, _, W, _, _, _, _],
    [_, _, _, _, _, G, G, G, G, G, _, _, _, _, _, _],
    [_, _, _, _, _, K, B, B, B, K, _, _, _, _, _, _],
    [_, _, _, _, K, L, B, B, B, B, K, _, _, _, _, _],
    [_, _, _, _, K, B, B, B, B, B, K, _, _, _, _, _],
    [_, _, _, _, K, B, B, B, B, B, K, _, _, _, _, _],
    [_, _, _, _, K, L, B, B, B, B, K, _, _, _, _, _],
    [_, _, _, _, _, K, B, B, B, K, _, _, _, _, _, _],
    [_, _, _, _, _, _, K, K, K, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Ivy on wall trellis: 16×16 — canPlaceOnWalls */
export const EXP_IVY: SpriteData = (() => {
  const G = '#44A830' // ivy green
  const D = '#2A6E18' // dark ivy
  const H = '#72CC50' // highlight
  const T = '#8B7050' // trellis wood
  const S = '#5C4830' // trellis shadow
  return [
    [_, T, _, _, _, _, _, _, _, _, _, _, _, _, T, _],
    [_, T, _, G, H, _, _, D, G, _, _, H, G, _, T, _],
    [_, T, G, H, G, D, D, G, H, G, D, G, H, G, T, _],
    [_, T, H, G, D, G, G, H, G, D, G, G, D, H, T, _],
    [_, S, G, D, G, H, G, G, G, H, G, D, G, D, S, _],
    [_, T, D, G, H, G, G, G, G, G, H, G, G, D, T, _],
    [_, T, G, H, G, D, G, H, G, D, G, H, G, G, T, _],
    [_, S, G, G, D, G, G, G, G, G, G, D, G, G, S, _],
    [_, T, D, G, G, H, G, D, G, H, G, G, D, G, T, _],
    [_, T, G, D, G, G, H, G, H, G, G, D, G, G, T, _],
    [_, S, G, G, H, G, G, G, G, G, G, H, G, D, S, _],
    [_, T, D, G, G, D, G, H, G, D, G, G, H, G, T, _],
    [_, T, G, H, G, G, D, G, D, G, G, H, G, D, T, _],
    [_, S, H, G, D, G, G, G, G, G, D, G, G, H, S, _],
    [_, T, G, D, G, H, G, D, G, H, G, D, G, G, T, _],
    [_, T, _, _, _, _, _, _, _, _, _, _, _, _, T, _],
  ]
})()

// ── STORAGE ──────────────────────────────────────────────────────────────────

/** Small shelf: 16×16 — low storage shelf with items */
export const EXP_SMALL_SHELF: SpriteData = (() => {
  const W = '#8B6420' // wood
  const D = '#5C4010' // dark wood
  const L = '#C8A060' // light wood surface
  const R = '#CC4444' // red item
  const B = '#4477BB' // blue item
  const G = '#44AA55' // green item
  const Y = '#DDAA22' // yellow item
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, D, D, D, D, D, D, D, D, D, D, D, D, D, D, _],
    [_, D, R, R, R, D, B, B, B, D, G, G, D, Y, D, _],
    [_, D, R, R, R, D, B, B, B, D, G, G, D, Y, D, _],
    [_, D, R, R, R, D, B, B, B, D, G, G, D, Y, D, _],
    [_, D, R, R, R, D, B, B, B, D, G, G, D, Y, D, _],
    [_, W, W, W, W, W, W, W, W, W, W, W, W, W, W, _],
    [_, D, L, L, L, L, L, L, L, L, L, L, L, L, D, _],
    [_, D, L, L, L, L, L, L, L, L, L, L, L, L, D, _],
    [_, D, L, L, L, L, L, L, L, L, L, L, L, L, D, _],
    [_, D, L, L, L, L, L, L, L, L, L, L, L, L, D, _],
    [_, W, W, W, W, W, W, W, W, W, W, W, W, W, W, _],
    [_, D, D, W, _, _, _, _, _, _, _, _, W, D, D, _],
    [_, D, D, W, _, _, _, _, _, _, _, _, W, D, D, _],
    [_, D, D, W, _, _, _, _, _, _, _, _, W, D, D, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Wide bookshelf: 32×32 (2×2 tiles) — packed with colored books */
export const EXP_WIDE_BOOKSHELF: SpriteData = (() => {
  const W = '#7A5818' // wood frame
  const D = '#4E3808' // dark wood
  const L = '#B08840' // light wood
  const R = '#CC4444' // red books
  const B = '#4477AA' // blue books
  const G = '#44AA66' // green books
  const Y = '#CCAA33' // yellow books
  const P = '#9955AA' // purple books
  const O = '#CC7733' // orange books
  const rows: string[][] = []
  rows.push(new Array(32).fill(_))
  rows.push([_, ...new Array(30).fill(W), _])
  rows.push([_, W, ...new Array(28).fill(D), W, _])
  const topShelf = [R, R, B, B, G, G, Y, Y, P, P, R, R, O, O, B, B, G, G, Y, Y, R, R, P, P, B, B, G, G]
  for (let r = 0; r < 6; r++) {
    rows.push([_, W, D, ...topShelf, D, W, _])
  }
  rows.push([_, W, ...new Array(28).fill(L), W, _])
  rows.push([_, W, ...new Array(28).fill(D), W, _])
  const shelf2 = [G, G, Y, Y, P, P, B, B, O, O, G, G, R, R, Y, Y, B, B, P, P, G, G, O, O, R, R, Y, Y]
  for (let r = 0; r < 6; r++) {
    rows.push([_, W, D, ...shelf2, D, W, _])
  }
  rows.push([_, W, ...new Array(28).fill(L), W, _])
  rows.push([_, W, ...new Array(28).fill(D), W, _])
  const shelf3 = [P, P, R, R, O, O, G, G, B, B, Y, Y, P, P, R, R, G, G, O, O, B, B, R, R, Y, Y, P, P]
  for (let r = 0; r < 6; r++) {
    rows.push([_, W, D, ...shelf3, D, W, _])
  }
  rows.push([_, W, ...new Array(28).fill(L), W, _])
  rows.push([_, W, ...new Array(28).fill(D), W, _])
  const shelf4 = [O, O, O, B, B, B, R, R, R, G, G, G, Y, Y, Y, P, P, P, O, O, O, B, B, B, R, R, R, G]
  for (let r = 0; r < 3; r++) {
    rows.push([_, W, D, ...shelf4, D, W, _])
  }
  rows.push([_, ...new Array(30).fill(W), _])
  rows.push(new Array(32).fill(_))
  return rows
})()

/** Locker: 16×32 (1×2 tiles) — tall metal locker, gray/blue */
export const EXP_LOCKER: SpriteData = (() => {
  const F = '#8899AA' // metal frame
  const B = '#99AACC' // metal body
  const D = '#6677AA' // darker body
  const H = '#BBCCDD' // highlight
  const K = '#445566' // dark shadow
  const S = '#777777' // vent slot
  const N = '#CCCCCC' // handle silver
  const rows: string[][] = []
  rows.push(new Array(16).fill(_))
  rows.push([_, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _])
  rows.push([_, F, H, H, H, H, H, H, H, H, H, H, H, H, F, _])
  for (let r = 0; r < 10; r++) {
    if (r === 0) {
      rows.push([_, F, H, D, D, D, D, D, D, D, D, D, D, H, F, _])
    } else if (r >= 3 && r <= 5) {
      rows.push([_, F, B, D, S, S, S, S, S, S, S, S, D, B, F, _])
    } else if (r === 7) {
      rows.push([_, F, B, D, D, D, D, N, N, D, D, D, D, B, F, _])
    } else {
      rows.push([_, F, B, D, D, D, D, D, D, D, D, D, D, B, F, _])
    }
  }
  rows.push([_, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _])
  rows.push([_, F, H, H, H, H, H, H, H, H, H, H, H, H, F, _])
  rows.push([_, F, H, D, D, D, D, D, D, D, D, D, D, H, F, _])
  for (let r = 0; r < 10; r++) {
    if (r >= 2 && r <= 4) {
      rows.push([_, F, B, D, S, S, S, S, S, S, S, S, D, B, F, _])
    } else if (r === 6) {
      rows.push([_, F, B, D, D, D, D, N, N, D, D, D, D, B, F, _])
    } else {
      rows.push([_, F, B, D, D, D, D, D, D, D, D, D, D, B, F, _])
    }
  }
  rows.push([_, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _])
  for (let r = 0; r < 3; r++) {
    const row = new Array(16).fill(_) as string[]
    row[2] = K; row[3] = K; row[12] = K; row[13] = K
    rows.push(row)
  }
  rows.push(new Array(16).fill(_))
  rows.push(new Array(16).fill(_))
  return rows
})()

/** Drawer unit: 16×16 — small wood drawer unit with handles */
export const EXP_DRAWER_UNIT: SpriteData = (() => {
  const W = '#9B7030' // wood
  const D = '#6B4A18' // dark wood
  const L = '#C8A060' // light wood
  const N = '#CCCCCC' // handle silver
  const K = '#888888' // handle dark
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, D, D, D, D, D, D, D, D, D, D, D, D, D, D, _],
    [_, D, L, L, L, L, L, L, L, L, L, L, L, L, D, _],
    [_, D, L, L, L, L, L, L, L, L, L, L, L, L, D, _],
    [_, D, W, W, W, W, W, W, W, W, W, W, W, W, D, _],
    [_, D, W, W, W, W, N, N, N, N, W, W, W, W, D, _],
    [_, D, W, W, W, W, K, K, K, K, W, W, W, W, D, _],
    [_, D, W, W, W, W, W, W, W, W, W, W, W, W, D, _],
    [_, D, D, D, D, D, D, D, D, D, D, D, D, D, D, _],
    [_, D, W, W, W, W, W, W, W, W, W, W, W, W, D, _],
    [_, D, W, W, W, W, N, N, N, N, W, W, W, W, D, _],
    [_, D, W, W, W, W, K, K, K, K, W, W, W, W, D, _],
    [_, D, W, W, W, W, W, W, W, W, W, W, W, W, D, _],
    [_, D, D, D, D, D, D, D, D, D, D, D, D, D, D, _],
    [_, D, D, _, _, _, _, _, _, _, _, _, _, D, D, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Safe: 16×16 — heavy safe with dial, dark metal */
export const EXP_SAFE: SpriteData = (() => {
  const F = '#444455' // metal frame dark
  const B = '#5C5C70' // body
  const H = '#8888AA' // highlight
  const D = '#333340' // shadow
  const N = '#CCCCCC' // dial silver
  const C = '#999988' // dial ring
  const R = '#CC3333' // dial indicator
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, D, D, D, D, D, D, D, D, D, D, D, D, D, D, _],
    [_, D, F, F, F, F, F, F, F, F, F, F, F, F, D, _],
    [_, D, F, H, H, H, H, H, H, H, H, H, H, F, D, _],
    [_, D, F, H, B, B, B, B, B, B, B, B, H, F, D, _],
    [_, D, F, H, B, C, C, C, C, C, C, B, H, F, D, _],
    [_, D, F, H, B, C, N, N, N, N, C, B, H, F, D, _],
    [_, D, F, H, B, C, N, R, R, N, C, B, H, F, D, _],
    [_, D, F, H, B, C, N, R, R, N, C, B, H, F, D, _],
    [_, D, F, H, B, C, N, N, N, N, C, B, H, F, D, _],
    [_, D, F, H, B, C, C, C, C, C, C, B, H, F, D, _],
    [_, D, F, H, B, B, B, B, B, B, B, B, H, F, D, _],
    [_, D, F, H, H, H, H, H, H, H, H, H, H, F, D, _],
    [_, D, F, F, F, F, F, F, F, F, F, F, F, F, D, _],
    [_, D, D, D, D, D, D, D, D, D, D, D, D, D, D, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Wooden shipping crate: 16×16 — slats and corner posts */
export const EXP_CRATE: SpriteData = (() => {
  const W = '#C89A50' // wood light
  const D = '#8B6428' // wood dark slat
  const K = '#5C4010' // corner post
  const H = '#E0BC78' // highlight plank
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, K, K, K, K, K, K, K, K, K, K, K, K, K, K, _],
    [_, K, H, H, H, H, H, H, H, H, H, H, H, H, K, _],
    [_, K, H, W, W, W, W, W, W, W, W, W, W, H, K, _],
    [_, K, D, D, D, D, D, D, D, D, D, D, D, D, K, _],
    [_, K, W, W, W, W, W, W, W, W, W, W, W, W, K, _],
    [_, K, W, W, W, W, W, W, W, W, W, W, W, W, K, _],
    [_, K, D, D, D, D, D, D, D, D, D, D, D, D, K, _],
    [_, K, W, W, W, W, K, K, K, K, W, W, W, W, K, _],
    [_, K, W, W, W, W, K, W, W, K, W, W, W, W, K, _],
    [_, K, D, D, D, D, K, W, W, K, D, D, D, D, K, _],
    [_, K, W, W, W, W, K, K, K, K, W, W, W, W, K, _],
    [_, K, W, W, W, W, W, W, W, W, W, W, W, W, K, _],
    [_, K, D, D, D, D, D, D, D, D, D, D, D, D, K, _],
    [_, K, K, K, K, K, K, K, K, K, K, K, K, K, K, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()
