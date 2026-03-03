import type { SpriteData } from '../types.js'

const _ = '' // transparent

// ── WALL ITEMS ───────────────────────────────────────────────────────────────

/** Wall shelf: 32×16 (2×1 tiles), wall-mounted shelf with books */
export const EXP_WALL_SHELF: SpriteData = (() => {
  const W = '#8B6914' // wood frame
  const S = '#A07828' // shelf surface
  const L = '#B8922E' // light highlight
  const D = '#6B4E0A' // dark shadow / bracket
  const R = '#CC4444' // red book
  const B = '#4477AA' // blue book
  const G = '#44AA66' // green book
  const Y = '#CCAA33' // yellow book
  const P = '#9955AA' // purple book
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, _],
    [_, W, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, W, _],
    [_, W, D, R, R, R, D, B, B, B, D, G, G, G, D, Y, Y, Y, D, P, P, P, D, R, R, D, B, B, D, D, W, _],
    [_, W, D, R, R, R, D, B, B, B, D, G, G, G, D, Y, Y, Y, D, P, P, P, D, R, R, D, B, B, D, D, W, _],
    [_, W, D, R, R, R, D, B, B, B, D, G, G, G, D, Y, Y, Y, D, P, P, P, D, R, R, D, B, B, D, D, W, _],
    [_, W, D, R, R, R, D, B, B, B, D, G, G, G, D, Y, Y, Y, D, P, P, P, D, R, R, D, B, B, D, D, W, _],
    [_, W, D, R, R, R, D, B, B, B, D, G, G, G, D, Y, Y, Y, D, P, P, P, D, R, R, D, B, B, D, D, W, _],
    [_, W, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, W, _],
    [_, W, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, W, _],
    [_, W, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, W, _],
    [_, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, _],
    [_, _, D, D, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, D, D, _, _, _, _, _],
    [_, _, D, D, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, D, D, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Mounted TV: 32×16 (2×1 tiles), wall-mounted flatscreen */
export const EXP_MOUNTED_TV: SpriteData = (() => {
  const F = '#222222' // bezel frame
  const D = '#111111' // dark outer edge
  const S = '#0D1A2E' // screen dark bg
  const B = '#3366CC' // blue UI content
  const C = '#66BBFF' // cyan highlight
  const W = '#DDDDDD' // white bar
  const G = '#444444' // gray bracket
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, _],
    [_, D, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, D, _],
    [_, D, F, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, F, D, _],
    [_, D, F, S, B, B, B, B, C, C, C, C, C, S, S, S, S, S, S, S, W, W, W, W, W, W, W, S, S, F, D, _],
    [_, D, F, S, B, B, B, B, C, C, C, C, C, S, S, S, S, S, S, S, W, W, W, W, W, W, W, S, S, F, D, _],
    [_, D, F, S, B, B, C, B, B, B, C, C, C, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, F, D, _],
    [_, D, F, S, B, C, B, B, B, B, B, C, C, S, S, S, S, S, S, S, S, B, B, B, B, B, S, S, S, F, D, _],
    [_, D, F, S, C, C, C, C, C, C, C, C, C, S, S, S, S, S, S, S, S, B, B, B, B, B, S, S, S, F, D, _],
    [_, D, F, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, F, D, _],
    [_, D, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, D, _],
    [_, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, G, G, G, G, G, G, G, G, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, G, G, G, G, G, G, G, G, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Poster: 16×16, decorative poster in frame */
export const EXP_POSTER: SpriteData = (() => {
  const F = '#222222' // frame
  const M = '#555555' // mat border
  const K = '#1A3A6A' // poster bg dark blue
  const Y = '#FFDD44' // yellow accent
  const R = '#CC4444' // red accent
  const W = '#EEEEFF' // white center
  const A = '#FF8833' // orange accent
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _],
    [_, F, M, M, M, M, M, M, M, M, M, M, M, M, F, _],
    [_, F, M, K, K, K, K, K, K, K, K, K, K, M, F, _],
    [_, F, M, K, Y, Y, Y, Y, Y, Y, Y, Y, K, M, F, _],
    [_, F, M, K, Y, R, R, R, R, R, R, Y, K, M, F, _],
    [_, F, M, K, Y, R, A, A, A, A, R, Y, K, M, F, _],
    [_, F, M, K, Y, R, A, W, W, A, R, Y, K, M, F, _],
    [_, F, M, K, Y, R, A, W, W, A, R, Y, K, M, F, _],
    [_, F, M, K, Y, R, A, A, A, A, R, Y, K, M, F, _],
    [_, F, M, K, Y, R, R, R, R, R, R, Y, K, M, F, _],
    [_, F, M, K, Y, Y, Y, Y, Y, Y, Y, Y, K, M, F, _],
    [_, F, M, K, K, K, K, K, K, K, K, K, K, M, F, _],
    [_, F, M, M, M, M, M, M, M, M, M, M, M, M, F, _],
    [_, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Bulletin board: 32×16 (2×1 tiles), cork board with pinned notes */
export const EXP_BULLETIN_BOARD: SpriteData = (() => {
  const F = '#8B5E2A' // wood frame
  const K = '#C4944A' // cork base
  const C = '#D4A45A' // cork light
  const N1 = '#FFFFCC' // yellow note
  const N2 = '#CCFFCC' // green note
  const N3 = '#FFCCCC' // pink note
  const N4 = '#CCCCFF' // blue note
  const P = '#CC3333' // pin
  const L = '#444444' // text line
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _],
    [_, F, K, C, K, K, C, K, N1,N1,N1,N1,N1,K, K, C, K, N2,N2,N2,N2,K, K, C, K, K, C, K, K, F, _],
    [_, F, K, K, C, K, K, C, P, N1,N1,N1,N1,K, K, K, K, P, N2,N2,N2,K, C, K, K, K, K, C, K, F, _],
    [_, F, C, K, K, K, C, K, N1,L, L, L, N1,K, C, K, K, N2,L, L, N2,K, K, K, C, K, K, K, C, F, _],
    [_, F, K, K, C, K, K, C, N1,L, L, N1,N1,K, K, K, K, N2,N2,L, N2,K, K, C, K, K, C, K, K, F, _],
    [_, F, K, C, K, K, K, K, N1,N1,N1,N1,N1,K, K, C, K, N2,N2,N2,N2,K, C, K, K, K, K, K, C, F, _],
    [_, F, C, K, K, N3,N3,N3,N3,K, K, K, C, K, K, N4,N4,N4,N4,K, K, C, K, K, C, K, K, K, K, F, _],
    [_, F, K, K, K, P, N3,N3,N3,K, C, K, K, K, K, P, N4,N4,N4,K, K, K, C, K, K, K, K, C, K, F, _],
    [_, F, K, C, K, N3,L, L, N3,K, K, K, C, K, K, N4,L, N4,N4,K, C, K, K, K, C, K, K, K, C, F, _],
    [_, F, K, K, K, N3,N3,N3,N3,K, C, K, K, K, K, N4,N4,N4,N4,K, K, K, C, K, K, K, C, K, K, F, _],
    [_, F, C, K, K, K, C, K, K, K, K, C, K, K, K, K, C, K, K, K, K, C, K, K, K, K, C, K, K, F, _],
    [_, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Mirror: 16×16, wall mirror with frame */
export const EXP_MIRROR: SpriteData = (() => {
  const F = '#C8A84E' // gold frame
  const D = '#A08030' // dark frame edge
  const L = '#D4B868' // frame highlight
  const R = '#DDEEFF' // reflection bright
  const M = '#BBCCDD' // mirror surface
  const S = '#8899AA' // mirror shadow
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, D, D, D, D, D, D, D, D, D, D, D, D, _, _],
    [_, D, L, F, F, F, F, F, F, F, F, F, F, L, D, _],
    [_, D, F, R, R, R, R, R, R, R, R, R, R, F, D, _],
    [_, D, F, R, M, M, M, M, M, M, M, M, R, F, D, _],
    [_, D, F, R, M, R, R, R, R, R, M, M, R, F, D, _],
    [_, D, F, R, M, R, R, S, S, M, M, M, R, F, D, _],
    [_, D, F, M, M, R, S, S, S, M, M, M, M, F, D, _],
    [_, D, F, M, M, M, S, S, M, M, M, M, M, F, D, _],
    [_, D, F, M, M, M, M, M, M, M, M, M, M, F, D, _],
    [_, D, F, M, M, M, M, M, M, M, M, M, M, F, D, _],
    [_, D, F, M, M, M, M, M, M, M, M, M, M, F, D, _],
    [_, D, L, F, F, F, F, F, F, F, F, F, F, L, D, _],
    [_, _, D, D, D, D, D, D, D, D, D, D, D, D, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Large clock: 16×16, wall clock with hands */
export const EXP_LARGE_CLOCK: SpriteData = (() => {
  const F = '#8B6914' // wood frame
  const D = '#6B4E0A' // dark frame edge
  const W = '#F5F0E8' // clock face
  const G = '#CCCCCC' // tick marks
  const H = '#222222' // hour/minute hand
  const R = '#CC3333' // second hand
  const N = '#555555' // center nub
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, D, D, D, D, D, D, D, D, D, D, _, _, _],
    [_, _, D, F, F, F, F, F, F, F, F, F, F, D, _, _],
    [_, D, F, W, W, G, W, W, W, W, G, W, W, F, D, _],
    [_, D, F, W, W, W, W, W, W, W, W, W, W, F, D, _],
    [_, D, F, G, W, W, W, W, W, W, W, W, G, F, D, _],
    [_, D, F, W, W, W, H, H, W, W, W, W, W, F, D, _],
    [_, D, F, W, W, W, H, N, R, W, W, W, W, F, D, _],
    [_, D, F, W, W, W, W, N, R, R, R, W, W, F, D, _],
    [_, D, F, W, W, W, W, N, W, W, W, W, W, F, D, _],
    [_, D, F, G, W, W, W, N, W, W, W, W, G, F, D, _],
    [_, D, F, W, W, W, W, W, W, W, W, W, W, F, D, _],
    [_, _, D, F, W, G, W, W, W, W, G, W, F, D, _, _],
    [_, _, _, D, D, D, D, D, D, D, D, D, D, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

// ── MISC ITEMS ───────────────────────────────────────────────────────────────

/** Trash can: 16×16, office trash bin */
export const EXP_TRASH_CAN: SpriteData = (() => {
  const G = '#777777' // gray rim
  const M = '#666666' // medium metal
  const D = '#444444' // dark interior
  const L = '#999999' // light metal
  const W = '#BBBBBB' // highlight
  const B = '#333333' // base shadow
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, G, G, G, G, G, G, _, _, _, _, _],
    [_, _, _, _, G, L, W, W, W, W, L, G, _, _, _, _],
    [_, _, _, G, L, M, M, M, M, M, M, L, G, _, _, _],
    [_, _, _, G, M, M, D, D, D, D, M, M, G, _, _, _],
    [_, _, _, G, M, D, D, D, D, D, D, M, G, _, _, _],
    [_, _, _, G, M, D, D, D, D, D, D, M, G, _, _, _],
    [_, _, _, G, M, D, D, D, D, D, D, M, G, _, _, _],
    [_, _, _, G, M, D, D, D, D, D, D, M, G, _, _, _],
    [_, _, _, G, M, D, D, D, D, D, D, M, G, _, _, _],
    [_, _, _, G, M, M, D, D, D, D, M, M, G, _, _, _],
    [_, _, _, G, L, M, M, M, M, M, M, L, G, _, _, _],
    [_, _, _, _, G, B, B, B, B, B, B, G, _, _, _, _],
    [_, _, _, _, _, B, B, B, B, B, B, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Fire extinguisher: 16×16, red fire extinguisher */
export const EXP_FIRE_EXTINGUISHER: SpriteData = (() => {
  const R = '#CC2222' // red body
  const D = '#991111' // dark red
  const H = '#EE5555' // highlight
  const S = '#CC9900' // gold band
  const G = '#888888' // gray nozzle
  const B = '#555555' // dark base
  const W = '#FFFFFF' // white label
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, G, G, G, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, G, G, G, G, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, G, G, G, G, G, _, _, _, _],
    [_, _, _, _, _, _, D, D, D, D, _, _, _, _, _, _],
    [_, _, _, _, _, D, R, R, R, R, D, _, _, _, _, _],
    [_, _, _, _, _, D, H, R, R, R, D, _, _, _, _, _],
    [_, _, _, _, _, D, W, W, W, W, D, _, _, _, _, _],
    [_, _, _, _, _, D, W, W, W, W, D, _, _, _, _, _],
    [_, _, _, _, _, D, R, R, R, R, D, _, _, _, _, _],
    [_, _, _, _, _, S, S, S, S, S, S, _, _, _, _, _],
    [_, _, _, _, _, D, R, R, R, R, D, _, _, _, _, _],
    [_, _, _, _, _, D, R, R, R, R, D, _, _, _, _, _],
    [_, _, _, _, _, D, D, D, D, D, D, _, _, _, _, _],
    [_, _, _, _, _, _, B, B, B, B, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Umbrella stand: 16×16, stand with umbrellas */
export const EXP_UMBRELLA_STAND: SpriteData = (() => {
  const M = '#888888' // metal stand
  const D = '#555555' // dark metal
  const L = '#AAAAAA' // light metal
  const B = '#4477AA' // blue umbrella
  const R = '#CC4444' // red umbrella
  const G = '#44AA66' // green umbrella
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, B, B, R, R, G, G, _, _, _, _, _, _],
    [_, _, _, B, B, B, R, R, G, G, G, _, _, _, _, _],
    [_, _, B, B, L, B, R, R, G, L, G, G, _, _, _, _],
    [_, _, _, B, B, B, R, R, G, G, G, _, _, _, _, _],
    [_, _, _, _, B, B, M, M, M, G, G, _, _, _, _, _],
    [_, _, _, _, _, _, M, M, M, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, M, M, M, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, M, L, M, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, M, M, M, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, M, M, M, _, _, _, _, _, _, _],
    [_, _, _, _, _, D, D, D, D, D, _, _, _, _, _, _],
    [_, _, _, _, D, M, M, M, M, M, D, _, _, _, _, _],
    [_, _, _, _, D, M, M, M, M, M, D, _, _, _, _, _],
    [_, _, _, _, _, D, D, D, D, D, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Coat rack: 16×16, standing coat rack */
export const EXP_COAT_RACK: SpriteData = (() => {
  const W = '#A07828' // wood pole
  const D = '#6B4E0A' // dark wood
  const L = '#C9A84C' // light wood
  const O = '#CC8844' // orange coat
  const B = '#4477AA' // blue jacket
  const K = '#333333' // dark base
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, D, _, _, _, _, _, _, _, _, _, _, D, _, _],
    [_, D, W, D, _, _, _, _, _, _, _, _, D, W, D, _],
    [_, _, D, _, D, _, _, _, _, _, _, D, _, D, _, _],
    [_, _, _, _, _, D, _, _, _, _, D, _, _, _, _, _],
    [_, _, _, _, _, O, D, D, D, B, B, _, _, _, _, _],
    [_, _, _, _, O, O, O, L, L, B, B, B, _, _, _, _],
    [_, _, _, O, O, O, O, L, L, B, B, B, B, _, _, _],
    [_, _, _, _, O, O, _, L, L, _, B, B, _, _, _, _],
    [_, _, _, _, _, _, _, L, L, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, L, L, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, L, L, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, L, L, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, D, D, D, D, _, _, _, _, _, _],
    [_, _, _, _, _, D, K, K, K, K, D, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Water fountain: 16×16, drinking water fountain */
export const EXP_WATER_FOUNTAIN: SpriteData = (() => {
  const M = '#AAAAAA' // metal body
  const D = '#777777' // dark metal
  const L = '#CCCCCC' // light metal
  const B = '#4499CC' // water blue
  const W = '#88CCEE' // water highlight
  const S = '#555555' // base shadow
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, D, D, D, D, D, D, _, _, _, _, _],
    [_, _, _, _, D, L, L, L, L, L, L, D, _, _, _, _],
    [_, _, _, _, D, M, M, M, M, M, M, D, _, _, _, _],
    [_, _, _, _, D, M, B, B, B, M, M, D, _, _, _, _],
    [_, _, _, _, D, M, W, B, B, M, M, D, _, _, _, _],
    [_, _, _, _, D, D, D, D, D, D, D, D, _, _, _, _],
    [_, _, _, _, D, M, M, M, M, M, M, D, _, _, _, _],
    [_, _, _, _, D, M, M, M, M, M, M, D, _, _, _, _],
    [_, _, _, D, D, D, D, D, D, D, D, D, D, _, _, _],
    [_, _, _, D, M, M, M, M, M, M, M, M, D, _, _, _],
    [_, _, _, D, M, M, M, M, M, M, M, M, D, _, _, _],
    [_, _, _, D, D, D, D, D, D, D, D, D, D, _, _, _],
    [_, _, _, _, S, S, S, S, S, S, S, S, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Vending machine: 16×32 (1×2 tiles), snack/drink vending machine */
export const EXP_VENDING_MACHINE: SpriteData = (() => {
  const Fr = '#2244AA' // frame blue
  const D = '#112266' // dark frame
  const G = '#AACCEE' // glass panel
  const Gl = '#CCEEFF' // glass highlight
  const R = '#CC3333' // red snack
  const Y = '#CCAA22' // yellow snack
  const Or = '#DD7722' // orange snack
  const Gn = '#44AA44' // green snack
  const Pu = '#8855BB' // purple snack
  const S = '#888888' // metal side
  const B = '#555555' // dark base
  const W = '#FFFFFF' // logo white
  const N = '#FFDD44' // coin slot gold
  const rows: string[][] = []
  rows.push(new Array(16).fill(_))
  rows.push([_, D, D, D, D, D, D, D, D, D, D, D, D, D, D, _])
  rows.push([_, D, Fr,Fr,Fr,Fr,Fr,Fr,Fr,Fr,Fr,Fr,Fr,Fr, D, _])
  rows.push([_, D, Fr, W, W, W, W, W, W, W, W, W, W, Fr, D, _])
  rows.push([_, D, Fr, W, Fr,Fr,Fr,Fr,Fr,Fr,Fr,Fr, W, Fr, D, _])
  rows.push([_, D, Fr, W, W, W, W, W, W, W, W, W, W, Fr, D, _])
  rows.push([_, D, D, D, D, D, D, D, D, D, D, D, D, D, D, _])
  rows.push([_, D, G, R, R, G, Y, Y, G, Or,Or, G, Gn,Gn, D, _])
  rows.push([_, D, G, R, R, G, Y, Y, G, Or,Or, G, Gn,Gn, D, _])
  rows.push([_, D, Gl,Gl,Gl,Gl,Gl,Gl,Gl,Gl,Gl,Gl,Gl,Gl, D, _])
  rows.push([_, D, G, Pu,Pu, G, R, R, G, Y, Y, G, Or,Or, D, _])
  rows.push([_, D, G, Pu,Pu, G, R, R, G, Y, Y, G, Or,Or, D, _])
  rows.push([_, D, Gl,Gl,Gl,Gl,Gl,Gl,Gl,Gl,Gl,Gl,Gl,Gl, D, _])
  rows.push([_, D, G, Gn,Gn, G, Pu,Pu, G, R, R, G, Y, Y, D, _])
  rows.push([_, D, G, Gn,Gn, G, Pu,Pu, G, R, R, G, Y, Y, D, _])
  rows.push([_, D, Gl,Gl,Gl,Gl,Gl,Gl,Gl,Gl,Gl,Gl,Gl,Gl, D, _])
  rows.push([_, D, D, D, D, D, D, D, D, D, D, D, D, D, D, _])
  rows.push([_, D, S, S, S, S, S, S, S, S, S, S, S, S, D, _])
  rows.push([_, D, S, B, B, B, B, B, B, B, B, B, B, S, D, _])
  rows.push([_, D, S, S, S, S, S, S, S, S, S, S, S, S, D, _])
  rows.push([_, D, Fr,Fr,Fr,Fr,Fr,Fr,Fr,Fr,Fr,Fr,Fr,Fr, D, _])
  rows.push([_, D, Fr, N, N, Fr, R, Fr,Gn, Fr,Fr,Fr,Fr,Fr, D, _])
  rows.push([_, D, Fr, N, N, Fr, R, Fr,Gn, Fr,Fr,Fr,Fr,Fr, D, _])
  rows.push([_, D, Fr,Fr,Fr,Fr,Fr,Fr,Fr,Fr,Fr,Fr,Fr,Fr, D, _])
  rows.push([_, D, D, D, D, D, D, D, D, D, D, D, D, D, D, _])
  rows.push([_, D, S, S, S, S, S, S, S, S, S, S, S, S, D, _])
  rows.push([_, D, S, S, S, S, S, S, S, S, S, S, S, S, D, _])
  rows.push([_, D, S, B, B, B, B, B, B, B, B, B, B, S, D, _])
  rows.push([_, D, D, D, D, D, D, D, D, D, D, D, D, D, D, _])
  rows.push([_, _, B, B, _, _, _, _, _, _, _, _, B, B, _, _])
  rows.push([_, _, B, B, _, _, _, _, _, _, _, _, B, B, _, _])
  rows.push(new Array(16).fill(_))
  return rows
})()

/** Microwave: 16×16, microwave oven (canPlaceOnSurfaces) */
export const EXP_MICROWAVE: SpriteData = (() => {
  const B = '#888888' // gray body
  const D = '#555555' // dark edge
  const L = '#AAAAAA' // light body
  const G = '#1A1A1A' // door glass
  const W = '#88BBCC' // glass tint
  const Gn = '#44AA44' // green LED
  const R = '#CC3333' // red LED
  const H = '#CCCCCC' // handle
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, D, D, D, D, D, D, D, D, D, D, D, D, _, _],
    [_, D, B, B, B, B, B, B, B, B, B, B, B, B, D, _],
    [_, D, B, G, G, G, G, G, G, G, B, L, L, B, D, _],
    [_, D, B, G, W, W, W, W, W, G, B, Gn, R, B, D, _],
    [_, D, B, G, W, W, W, W, W, G, B, H, H, B, D, _],
    [_, D, B, G, W, W, W, W, W, G, B, H, H, B, D, _],
    [_, D, B, G, W, W, W, W, W, G, B, L, L, B, D, _],
    [_, D, B, G, W, W, W, W, W, G, B, L, L, B, D, _],
    [_, D, B, G, W, W, W, W, W, G, B, L, L, B, D, _],
    [_, D, B, G, W, W, W, W, W, G, B, L, L, B, D, _],
    [_, D, B, G, G, G, G, G, G, G, B, L, L, B, D, _],
    [_, D, B, B, B, B, B, B, B, B, B, B, B, B, D, _],
    [_, _, D, D, D, D, D, D, D, D, D, D, D, D, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Fridge: 16×32 (1×2 tiles), tall refrigerator */
export const EXP_FRIDGE: SpriteData = (() => {
  const W = '#DDDDEE' // white body
  const L = '#EEEEFF' // highlight
  const D = '#AAAAAA' // door shadow
  const G = '#888888' // frame
  const H = '#CCCCCC' // handle
  const S = '#BBBBCC' // main surface
  const B = '#999999' // base
  const N = '#88AACC' // freezer tint
  const rows: string[][] = []
  rows.push(new Array(16).fill(_))
  rows.push([_, _, G, G, G, G, G, G, G, G, G, G, G, _, _, _])
  rows.push([_, G, W, L, L, L, L, L, L, L, L, W, W, G, _, _])
  rows.push([_, G, W, W, W, W, W, W, W, W, W, W, W, G, _, _])
  rows.push([_, G, W, N, N, N, N, N, N, N, N, N, W, G, _, _])
  rows.push([_, G, W, N, N, N, N, N, N, N, N, N, W, G, _, _])
  rows.push([_, G, W, N, N, N, N, N, N, N, N, N, W, G, _, _])
  rows.push([_, G, W, N, N, N, N, N, N, N, N, N, W, G, _, _])
  rows.push([_, G, W, N, N, N, N, H, H, N, N, N, W, G, _, _])
  rows.push([_, G, W, N, N, N, N, N, N, N, N, N, W, G, _, _])
  rows.push([_, G, W, N, N, N, N, N, N, N, N, N, W, G, _, _])
  rows.push([_, G, W, N, N, N, N, N, N, N, N, N, W, G, _, _])
  rows.push([_, G, G, G, G, G, G, G, G, G, G, G, G, G, _, _])
  rows.push([_, G, D, D, D, D, D, D, D, D, D, D, D, G, _, _])
  rows.push([_, G, W, S, S, S, S, S, S, S, S, S, W, G, _, _])
  rows.push([_, G, W, S, S, S, S, S, S, S, S, S, W, G, _, _])
  rows.push([_, G, W, S, S, S, S, H, H, S, S, S, W, G, _, _])
  rows.push([_, G, W, S, S, S, S, S, S, S, S, S, W, G, _, _])
  rows.push([_, G, W, S, S, S, S, S, S, S, S, S, W, G, _, _])
  rows.push([_, G, W, S, S, S, S, S, S, S, S, S, W, G, _, _])
  rows.push([_, G, W, S, S, S, S, S, S, S, S, S, W, G, _, _])
  rows.push([_, G, W, S, S, S, S, S, S, S, S, S, W, G, _, _])
  rows.push([_, G, W, S, S, S, S, S, S, S, S, S, W, G, _, _])
  rows.push([_, G, W, S, S, S, S, S, S, S, S, S, W, G, _, _])
  rows.push([_, G, W, S, S, S, S, S, S, S, S, S, W, G, _, _])
  rows.push([_, G, W, S, S, S, S, S, S, S, S, S, W, G, _, _])
  rows.push([_, G, W, S, S, S, S, S, S, S, S, S, W, G, _, _])
  rows.push([_, G, W, S, S, S, S, S, S, S, S, S, W, G, _, _])
  rows.push([_, G, W, W, W, W, W, W, W, W, W, W, W, G, _, _])
  rows.push([_, _, G, G, G, G, G, G, G, G, G, G, G, _, _, _])
  rows.push([_, _, _, B, B, _, _, _, _, _, _, B, B, _, _, _])
  rows.push(new Array(16).fill(_))
  return rows
})()

/** Fan: 16×16, desk fan */
export const EXP_FAN: SpriteData = (() => {
  const G = '#888888' // gray cage
  const D = '#555555' // dark
  const L = '#BBBBBB' // light
  const W = '#DDDDDD' // blade
  const B = '#333333' // base
  const C = '#AAAAAA' // hub
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, G, G, G, G, G, G, _, _, _, _, _],
    [_, _, _, _, G, L, W, W, W, W, L, G, _, _, _, _],
    [_, _, _, G, W, W, W, C, C, W, W, W, G, _, _, _],
    [_, _, _, G, W, W, C, D, D, C, W, W, G, _, _, _],
    [_, _, _, G, W, C, D, G, G, D, C, W, G, _, _, _],
    [_, _, _, G, W, C, G, G, G, G, C, W, G, _, _, _],
    [_, _, _, G, W, C, G, G, G, G, C, W, G, _, _, _],
    [_, _, _, G, W, C, D, G, G, D, C, W, G, _, _, _],
    [_, _, _, G, W, W, C, D, D, C, W, W, G, _, _, _],
    [_, _, _, G, W, W, W, C, C, W, W, W, G, _, _, _],
    [_, _, _, _, G, L, W, W, W, W, L, G, _, _, _, _],
    [_, _, _, _, _, G, G, G, G, G, G, _, _, _, _, _],
    [_, _, _, _, _, _, D, G, G, D, _, _, _, _, _, _],
    [_, _, _, _, _, B, B, B, B, B, B, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Toolbox: 16×16, red toolbox with handle */
export const EXP_TOOLBOX: SpriteData = (() => {
  const R = '#CC3333' // red body
  const D = '#991111' // dark red
  const H = '#EE5555' // highlight
  const G = '#888888' // gray trim
  const L = '#BBBBBB' // light metal
  const B = '#555555' // handle
  const Y = '#CCAA22' // latch
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, B, B, B, B, _, _, _, _, _, _],
    [_, _, _, _, _, _, B, B, B, B, _, _, _, _, _, _],
    [_, _, _, G, G, G, G, G, G, G, G, G, G, _, _, _],
    [_, _, G, R, R, R, R, R, R, R, R, R, R, G, _, _],
    [_, _, G, H, R, R, R, Y, Y, R, R, R, R, G, _, _],
    [_, _, G, R, R, R, R, Y, Y, R, R, R, R, G, _, _],
    [_, _, G, R, R, R, R, R, R, R, R, R, R, G, _, _],
    [_, _, G, R, L, R, R, R, R, R, R, L, R, G, _, _],
    [_, _, G, R, R, R, R, R, R, R, R, R, R, G, _, _],
    [_, _, G, R, R, R, R, R, R, R, R, R, R, G, _, _],
    [_, _, G, R, R, R, R, R, R, R, R, R, R, G, _, _],
    [_, _, G, D, D, D, D, D, D, D, D, D, D, G, _, _],
    [_, _, _, G, G, G, G, G, G, G, G, G, G, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Ottoman: 16×16, cushioned ottoman */
export const EXP_OTTOMAN: SpriteData = (() => {
  const F = '#7755AA' // purple fabric
  const D = '#553388' // dark edge
  const L = '#9977CC' // light fabric
  const H = '#AA88DD' // highlight
  const B = '#442266' // button
  const S = '#664499' // seam
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, D, D, D, D, D, D, D, D, _, _, _, _],
    [_, _, _, D, F, F, F, F, F, F, F, F, D, _, _, _],
    [_, _, D, F, L, H, H, H, H, H, L, F, F, D, _, _],
    [_, _, D, F, H, H, H, H, H, H, H, F, F, D, _, _],
    [_, _, D, F, H, H, S, S, S, H, H, F, F, D, _, _],
    [_, _, D, F, H, S, S, B, B, S, H, F, F, D, _, _],
    [_, _, D, F, H, S, B, B, B, S, H, F, F, D, _, _],
    [_, _, D, F, H, S, B, B, B, S, H, F, F, D, _, _],
    [_, _, D, F, H, H, S, S, S, H, H, F, F, D, _, _],
    [_, _, D, F, H, H, H, H, H, H, H, F, F, D, _, _],
    [_, _, D, F, L, H, H, H, H, H, L, F, F, D, _, _],
    [_, _, _, D, F, F, F, F, F, F, F, F, D, _, _, _],
    [_, _, _, _, D, D, D, D, D, D, D, D, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Bar table: 16×16, tall bar-height table (isDesk: true) */
export const EXP_BAR_TABLE: SpriteData = (() => {
  const W = '#C8A84E' // wood top
  const E = '#A08030' // edge
  const L = '#D4B868' // highlight
  const D = '#8B6914' // dark grain
  const M = '#666666' // metal stem
  const B = '#333333' // base
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, E, E, E, E, E, E, E, E, E, E, _, _, _],
    [_, _, E, L, L, L, L, L, L, L, L, L, W, E, _, _],
    [_, _, E, L, W, W, W, W, W, W, W, W, W, E, _, _],
    [_, _, E, L, W, W, W, W, W, W, W, W, W, E, _, _],
    [_, _, E, L, W, W, W, W, W, W, W, W, W, E, _, _],
    [_, _, E, W, W, W, W, W, W, W, W, W, W, E, _, _],
    [_, _, E, W, W, W, W, W, W, W, W, W, W, E, _, _],
    [_, _, E, W, W, W, W, W, W, W, W, W, W, E, _, _],
    [_, _, E, D, W, W, W, W, W, W, W, D, W, E, _, _],
    [_, _, E, D, W, W, W, W, W, W, W, D, W, E, _, _],
    [_, _, E, D, D, D, D, D, D, D, D, D, D, E, _, _],
    [_, _, _, E, E, E, E, E, E, E, E, E, E, _, _, _],
    [_, _, _, _, _, _, M, M, M, M, _, _, _, _, _, _],
    [_, _, _, _, _, B, B, B, B, B, B, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Tablet on stand: 16×16, tablet device (canPlaceOnSurfaces) */
export const EXP_TABLET: SpriteData = (() => {
  const F = '#333333' // frame
  const D = '#222222' // dark edge
  const S = '#1A2A4A' // screen bg
  const B = '#3366CC' // app blue
  const G = '#44AA44' // app green
  const W = '#EEEEEE' // white UI
  const H = '#6699BB' // screen highlight
  const M = '#888888' // stand
  const L = '#BBBBBB' // stand light
  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, D, D, D, D, D, D, D, D, D, D, _, _, _],
    [_, _, D, F, F, F, F, F, F, F, F, F, F, D, _, _],
    [_, _, D, F, S, S, S, S, S, S, S, S, F, D, _, _],
    [_, _, D, F, S, H, H, H, H, H, H, S, F, D, _, _],
    [_, _, D, F, S, H, B, B, G, G, H, S, F, D, _, _],
    [_, _, D, F, S, H, B, B, G, G, H, S, F, D, _, _],
    [_, _, D, F, S, H, W, W, W, W, H, S, F, D, _, _],
    [_, _, D, F, S, H, W, W, W, W, H, S, F, D, _, _],
    [_, _, D, F, S, H, B, G, B, G, H, S, F, D, _, _],
    [_, _, D, F, S, H, H, H, H, H, H, S, F, D, _, _],
    [_, _, D, F, F, F, F, F, F, F, F, F, F, D, _, _],
    [_, _, _, D, D, D, D, D, D, D, D, D, D, _, _, _],
    [_, _, _, _, _, _, M, L, L, M, _, _, _, _, _, _],
    [_, _, _, _, _, M, M, M, M, M, M, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ]
})()

/** Decorative window: 16×32 (1×2 tiles), tall window (canPlaceOnWalls) */
export const EXP_DECORATIVE_WINDOW: SpriteData = (() => {
  const F = '#8B6914' // wood frame
  const D = '#6B4E0A' // dark frame
  const L = '#A07828' // sill
  const G = '#AACCEE' // glass blue
  const H = '#CCEEFF' // glass highlight
  const S = '#88AACC' // glass shadow
  const O = '#FFAA44' // sunlight orange
  const Y = '#FFDD88' // sunlight yellow
  const rows: string[][] = []
  rows.push(new Array(16).fill(_))
  rows.push([_, _, D, D, D, D, D, D, D, D, D, D, D, D, _, _])
  rows.push([_, D, F, F, F, F, F, F, F, F, F, F, F, F, D, _])
  rows.push([_, D, F, H, H, H, H, H, H, H, H, H, H, F, D, _])
  rows.push([_, D, F, H, G, G, G, G, G, G, G, G, G, F, D, _])
  rows.push([_, D, F, G, F, F, F, F, F, F, F, F, G, F, D, _])
  rows.push([_, D, F, G, F, G, G, G, G, G, G, F, G, F, D, _])
  rows.push([_, D, F, G, F, G, H, H, H, H, G, F, G, F, D, _])
  rows.push([_, D, F, G, F, G, H, O, O, H, G, F, G, F, D, _])
  rows.push([_, D, F, G, F, G, Y, O, O, Y, G, F, G, F, D, _])
  rows.push([_, D, F, G, F, G, G, Y, Y, G, G, F, G, F, D, _])
  rows.push([_, D, F, G, F, G, G, G, G, G, G, F, G, F, D, _])
  rows.push([_, D, F, G, F, G, G, G, G, G, G, F, G, F, D, _])
  rows.push([_, D, F, G, F, F, F, F, F, F, F, F, G, F, D, _])
  rows.push([_, D, F, F, F, F, F, F, F, F, F, F, F, F, D, _])
  rows.push([_, D, F, G, F, F, F, F, F, F, F, F, G, F, D, _])
  rows.push([_, D, F, G, F, G, G, G, G, G, G, F, G, F, D, _])
  rows.push([_, D, F, G, F, G, G, G, G, G, G, F, G, F, D, _])
  rows.push([_, D, F, G, F, G, S, S, G, G, G, F, G, F, D, _])
  rows.push([_, D, F, G, F, G, S, G, G, G, G, F, G, F, D, _])
  rows.push([_, D, F, G, F, G, G, G, G, G, G, F, G, F, D, _])
  rows.push([_, D, F, G, F, G, G, G, G, S, S, F, G, F, D, _])
  rows.push([_, D, F, G, F, G, G, G, G, G, G, F, G, F, D, _])
  rows.push([_, D, F, G, F, F, F, F, F, F, F, F, G, F, D, _])
  rows.push([_, D, F, F, F, F, F, F, F, F, F, F, F, F, D, _])
  rows.push([_, D, L, L, L, L, L, L, L, L, L, L, L, L, D, _])
  rows.push([_, _, D, D, D, D, D, D, D, D, D, D, D, D, _, _])
  rows.push([_, _, D, _, _, _, _, _, _, _, _, _, _, D, _, _])
  rows.push([_, _, D, _, _, _, _, _, _, _, _, _, _, D, _, _])
  rows.push(new Array(16).fill(_))
  rows.push(new Array(16).fill(_))
  rows.push(new Array(16).fill(_))
  return rows
})()
