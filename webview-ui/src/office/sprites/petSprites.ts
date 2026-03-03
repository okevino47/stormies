import type { Direction, SpriteData } from '../types.js'
import { Direction as Dir } from '../types.js'
import type { CharacterSprites } from './spriteData.js'

const _ = '' // transparent

// ── Helpers ──────────────────────────────────────────────────────

/** Create an empty 16×32 frame (transparent) */
function emptyFrame(): string[][] {
  return Array.from({ length: 32 }, () => new Array(16).fill(_))
}

/** Stamp pixel rows onto a 16×32 frame, bottom-aligned with optional x offset */
function stamp(art: string[][], xOff = 0): SpriteData {
  const frame = emptyFrame()
  const yStart = 32 - art.length
  for (let r = 0; r < art.length; r++) {
    for (let c = 0; c < art[r].length; c++) {
      if (art[r][c] !== _) {
        frame[yStart + r][xOff + c] = art[r][c]
      }
    }
  }
  return frame
}

/** Flip a SpriteData horizontally */
function flip(sprite: SpriteData): SpriteData {
  return sprite.map((row) => [...row].reverse())
}

/** Build a CharacterSprites set from down/up/right frame arrays (7 frames each) */
function buildSprites(
  down: SpriteData[],
  up: SpriteData[],
  right: SpriteData[],
): CharacterSprites {
  return {
    walk: {
      [Dir.DOWN]: [down[0], down[1], down[2], down[1]] as [SpriteData, SpriteData, SpriteData, SpriteData],
      [Dir.UP]: [up[0], up[1], up[2], up[1]] as [SpriteData, SpriteData, SpriteData, SpriteData],
      [Dir.RIGHT]: [right[0], right[1], right[2], right[1]] as [SpriteData, SpriteData, SpriteData, SpriteData],
      [Dir.LEFT]: [flip(right[0]), flip(right[1]), flip(right[2]), flip(right[1])] as [SpriteData, SpriteData, SpriteData, SpriteData],
    } as Record<Direction, [SpriteData, SpriteData, SpriteData, SpriteData]>,
    typing: {
      [Dir.DOWN]: [down[3], down[4]] as [SpriteData, SpriteData],
      [Dir.UP]: [up[3], up[4]] as [SpriteData, SpriteData],
      [Dir.RIGHT]: [right[3], right[4]] as [SpriteData, SpriteData],
      [Dir.LEFT]: [flip(right[3]), flip(right[4])] as [SpriteData, SpriteData],
    } as Record<Direction, [SpriteData, SpriteData]>,
    reading: {
      [Dir.DOWN]: [down[5], down[6]] as [SpriteData, SpriteData],
      [Dir.UP]: [up[5], up[6]] as [SpriteData, SpriteData],
      [Dir.RIGHT]: [right[5], right[6]] as [SpriteData, SpriteData],
      [Dir.LEFT]: [flip(right[5]), flip(right[6])] as [SpriteData, SpriteData],
    } as Record<Direction, [SpriteData, SpriteData]>,
  }
}

// ── Pet 0: Cat ───────────────────────────────────────────────────
// ~10px tall, 10px wide, orange tabby
function catSprites(): CharacterSprites {
  const B = '#FF8844' // body
  const L = '#FFB866' // light/belly
  const S = '#553311' // stripes/dark
  const E = '#333333' // eyes
  const N = '#FF6688' // nose
  const W = '#FFFFFF' // whiskers

  // DOWN frames
  const downWalk1 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, S, S, B, B, _, _],
    [_, _, B, E, B, B, E, B, _, _],
    [_, _, B, B, N, N, B, B, _, _],
    [_, _, W, B, B, B, B, W, _,_],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, B, _, B, B, _, B, _, _],
    [_, _, B, _, _, _, _, B, _, _],
  ], 3)
  const downWalk2 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, S, S, B, B, _, _],
    [_, _, B, E, B, B, E, B, _, _],
    [_, _, B, B, N, N, B, B, _, _],
    [_, _, W, B, B, B, B, W, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
  ], 3)
  const downWalk3 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, S, S, B, B, _, _],
    [_, _, B, E, B, B, E, B, _, _],
    [_, _, B, B, N, N, B, B, _, _],
    [_, _, W, B, B, B, B, W, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, B, _, _, B, B, _, _, B, _],
    [_, B, _, _, _, _, _, _, B, _],
  ], 3)
  // Sitting (typing) — curled up
  const downSit1 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, S, S, B, B, _, _],
    [_, _, B, E, B, B, E, B, _, _],
    [_, _, B, B, N, N, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, L, L, B, B, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 3)
  const downSit2 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, S, S, B, B, _, _],
    [_, _, B, _, B, B, _, B, _, _],
    [_, _, B, B, N, N, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, L, L, B, B, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 3)

  // UP frames
  const upWalk1 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, S, S, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, S, S, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, _, B, B, _, B, _, _],
    [_, _, B, _, _, _, _, B, _, _],
  ], 3)
  const upWalk2 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, S, S, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, S, S, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
  ], 3)
  const upWalk3 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, S, S, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, S, S, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, B, _, _, B, B, _, _, B, _],
    [_, B, _, _, _, _, _, _, B, _],
  ], 3)
  const upSit1 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, S, S, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, S, S, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 3)
  const upSit2 = upSit1

  // RIGHT frames
  const rightWalk1 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, N, _, _, _, _],
    [_, _, _, B, B, B, W, _, _, _],
    [_, _, _, B, L, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, L, B, S, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
    [_, _, _, B, _, _, _, _, _, _],
  ], 3)
  const rightWalk2 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, N, _, _, _, _],
    [_, _, _, B, B, B, W, _, _, _],
    [_, _, _, B, L, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, L, B, S, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
  ], 3)
  const rightWalk3 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, N, _, _, _, _],
    [_, _, _, B, B, B, W, _, _, _],
    [_, _, _, B, L, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, L, B, S, _, _, _],
    [_, _, B, _, _, _, _, B, _, _],
    [_, _, _, _, _, _, _, B, _, _],
  ], 3)
  const rightSit1 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, N, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, L, B, _, _, _, _],
    [_, _, B, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, S, _, _, _],
  ], 3)
  const rightSit2 = rightSit1

  const down = [downWalk1, downWalk2, downWalk3, downSit1, downSit2, downSit1, downSit2]
  const up = [upWalk1, upWalk2, upWalk3, upSit1, upSit2, upSit1, upSit2]
  const right = [rightWalk1, rightWalk2, rightWalk3, rightSit1, rightSit2, rightSit1, rightSit2]
  return buildSprites(down, up, right)
}

// ── Pet 1: Dog ───────────────────────────────────────────────────
// ~10px tall, brown with floppy ears
function dogSprites(): CharacterSprites {
  const B = '#996633' // body
  const L = '#CC9966' // light belly
  const D = '#664422' // ears/dark
  const E = '#333333' // eyes
  const N = '#222222' // nose
  const T = '#FF6666' // tongue

  const downWalk1 = stamp([
    [_, _, _, D, B, B, D, _, _, _],
    [_, _, D, B, B, B, B, D, _, _],
    [_, _, _, B, E, E, B, _, _, _],
    [_, _, _, B, N, N, B, _, _, _],
    [_, _, _, B, T, B, B, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, B, _, B, B, _, B, _, _],
    [_, _, B, _, _, _, _, B, _, _],
  ], 3)
  const downWalk2 = stamp([
    [_, _, _, D, B, B, D, _, _, _],
    [_, _, D, B, B, B, B, D, _, _],
    [_, _, _, B, E, E, B, _, _, _],
    [_, _, _, B, N, N, B, _, _, _],
    [_, _, _, B, T, B, B, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
  ], 3)
  const downWalk3 = stamp([
    [_, _, _, D, B, B, D, _, _, _],
    [_, _, D, B, B, B, B, D, _, _],
    [_, _, _, B, E, E, B, _, _, _],
    [_, _, _, B, N, N, B, _, _, _],
    [_, _, _, B, T, B, B, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, B, _, _, B, B, _, _, B, _],
    [_, B, _, _, _, _, _, _, B, _],
  ], 3)
  const downSit1 = stamp([
    [_, _, _, D, B, B, D, _, _, _],
    [_, _, D, B, B, B, B, D, _, _],
    [_, _, _, B, E, E, B, _, _, _],
    [_, _, _, B, N, N, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, L, L, B, B, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 3)
  const downSit2 = stamp([
    [_, _, _, D, B, B, D, _, _, _],
    [_, _, D, B, B, B, B, D, _, _],
    [_, _, _, B, _, _, B, _, _, _],
    [_, _, _, B, N, N, B, _, _, _],
    [_, _, _, B, T, B, B, _, _, _],
    [_, _, B, B, L, L, B, B, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 3)

  const upWalk1 = stamp([
    [_, _, _, D, B, B, D, _, _, _],
    [_, _, D, B, B, B, B, D, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, D, D, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, _, B, B, _, B, _, _],
    [_, _, B, _, _, _, _, B, _, _],
  ], 3)
  const upWalk2 = stamp([
    [_, _, _, D, B, B, D, _, _, _],
    [_, _, D, B, B, B, B, D, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, D, D, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
  ], 3)
  const upWalk3 = stamp([
    [_, _, _, D, B, B, D, _, _, _],
    [_, _, D, B, B, B, B, D, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, D, D, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, B, _, _, B, B, _, _, B, _],
    [_, B, _, _, _, _, _, _, B, _],
  ], 3)
  const upSit1 = stamp([
    [_, _, _, D, B, B, D, _, _, _],
    [_, _, D, B, B, B, B, D, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, D, D, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 3)
  const upSit2 = upSit1

  const rightWalk1 = stamp([
    [_, _, _, _, B, B, D, _, _, _],
    [_, _, _, B, B, B, B, D, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, N, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, L, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, L, B, _, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
    [_, _, _, B, _, _, _, _, _, _],
  ], 3)
  const rightWalk2 = stamp([
    [_, _, _, _, B, B, D, _, _, _],
    [_, _, _, B, B, B, B, D, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, N, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, L, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, L, B, _, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
  ], 3)
  const rightWalk3 = stamp([
    [_, _, _, _, B, B, D, _, _, _],
    [_, _, _, B, B, B, B, D, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, N, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, L, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, L, B, _, _, _, _],
    [_, _, B, _, _, _, _, B, _, _],
    [_, _, _, _, _, _, _, B, _, _],
  ], 3)
  const rightSit1 = stamp([
    [_, _, _, _, B, B, D, _, _, _],
    [_, _, _, B, B, B, B, D, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, N, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, L, B, _, _, _, _],
    [_, _, B, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
  ], 3)
  const rightSit2 = rightSit1

  const down = [downWalk1, downWalk2, downWalk3, downSit1, downSit2, downSit1, downSit2]
  const up = [upWalk1, upWalk2, upWalk3, upSit1, upSit2, upSit1, upSit2]
  const right = [rightWalk1, rightWalk2, rightWalk3, rightSit1, rightSit2, rightSit1, rightSit2]
  return buildSprites(down, up, right)
}

// ── Pet 2: Owl ───────────────────────────────────────────────────
// ~10px tall, round with big eyes
function owlSprites(): CharacterSprites {
  const B = '#8B6914' // body
  const F = '#DDCC88' // face/belly
  const E = '#FFD700' // eyes
  const P = '#333333' // pupils
  const K = '#6B4E0A' // beak/dark

  const downWalk1 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, E, P, P, E, B, _, _],
    [_, _, B, E, P, P, E, B, _, _],
    [_, _, _, B, K, K, B, _, _, _],
    [_, _, _, B, F, F, B, _, _, _],
    [_, _, B, B, F, F, B, B, _, _],
    [_, _, _, B, F, F, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
  ], 3)
  const downWalk2 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, E, P, P, E, B, _, _],
    [_, _, B, E, P, P, E, B, _, _],
    [_, _, _, B, K, K, B, _, _, _],
    [_, _, _, B, F, F, B, _, _, _],
    [_, _, B, B, F, F, B, B, _, _],
    [_, _, _, B, F, F, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
  ], 3)
  const downWalk3 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, E, P, P, E, B, _, _],
    [_, _, B, E, P, P, E, B, _, _],
    [_, _, _, B, K, K, B, _, _, _],
    [_, _, _, B, F, F, B, _, _, _],
    [_, _, B, B, F, F, B, B, _, _],
    [_, _, _, B, F, F, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, B, _, _, _, _, B, _, _],
  ], 3)
  const downSit1 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, E, P, P, E, B, _, _],
    [_, _, B, E, P, P, E, B, _, _],
    [_, _, _, B, K, K, B, _, _, _],
    [_, _, B, B, F, F, B, B, _, _],
    [_, _, B, B, F, F, B, B, _, _],
    [_, _, _, _, B, B, _, _, _, _],
  ], 3)
  const downSit2 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, P, E, E, P, B, _, _],
    [_, _, B, P, E, E, P, B, _, _],
    [_, _, _, B, K, K, B, _, _, _],
    [_, _, B, B, F, F, B, B, _, _],
    [_, _, B, B, F, F, B, B, _, _],
    [_, _, _, _, B, B, _, _, _, _],
  ], 3)

  const upWalk1 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ], 3)
  const upWalk2 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ], 3)
  const upWalk3 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, B, _, _, _, _, B, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ], 3)
  const upSit1 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, _, B, B, _, _, _, _],
  ], 3)
  const upSit2 = upSit1

  const rightWalk1 = stamp([
    [_, _, _, _, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, E, P, B, _, _, _],
    [_, _, _, B, E, P, _, _, _, _],
    [_, _, _, B, K, B, _, _, _, _],
    [_, _, _, B, F, B, _, _, _, _],
    [_, _, _, B, F, B, B, _, _, _],
    [_, _, _, B, F, B, _, _, _, _],
    [_, _, _, _, B, _, B, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ], 3)
  const rightWalk2 = stamp([
    [_, _, _, _, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, E, P, B, _, _, _],
    [_, _, _, B, E, P, _, _, _, _],
    [_, _, _, B, K, B, _, _, _, _],
    [_, _, _, B, F, B, _, _, _, _],
    [_, _, _, B, F, B, B, _, _, _],
    [_, _, _, B, F, B, _, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ], 3)
  const rightWalk3 = stamp([
    [_, _, _, _, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, E, P, B, _, _, _],
    [_, _, _, B, E, P, _, _, _, _],
    [_, _, _, B, K, B, _, _, _, _],
    [_, _, _, B, F, B, _, _, _, _],
    [_, _, _, B, F, B, B, _, _, _],
    [_, _, _, B, F, B, _, _, _, _],
    [_, _, _, B, _, _, _, B, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ], 3)
  const rightSit1 = stamp([
    [_, _, _, _, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, E, P, B, _, _, _],
    [_, _, _, B, E, P, _, _, _, _],
    [_, _, _, B, K, B, _, _, _, _],
    [_, _, _, B, F, B, B, _, _, _],
    [_, _, _, B, F, B, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
  ], 3)
  const rightSit2 = rightSit1

  const down = [downWalk1, downWalk2, downWalk3, downSit1, downSit2, downSit1, downSit2]
  const up = [upWalk1, upWalk2, upWalk3, upSit1, upSit2, upSit1, upSit2]
  const right = [rightWalk1, rightWalk2, rightWalk3, rightSit1, rightSit2, rightSit1, rightSit2]
  return buildSprites(down, up, right)
}

// ── Pet 3: Axolotl ───────────────────────────────────────────────
// ~10px tall, pink with external gills
function axolotlSprites(): CharacterSprites {
  const B = '#FFB6C1' // body
  const G = '#FF69B4' // gills
  const E = '#333333' // eyes
  const M = '#FF8FAB' // mouth area

  const downWalk1 = stamp([
    [_, _, G, _, B, B, _, G, _, _],
    [_, _, G, B, B, B, B, G, _, _],
    [_, _, _, B, E, E, B, _, _, _],
    [_, _, _, B, M, M, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, _, B, B, _, B, _, _],
    [_, _, B, _, _, _, _, B, _, _],
  ], 3)
  const downWalk2 = stamp([
    [_, _, G, _, B, B, _, G, _, _],
    [_, _, G, B, B, B, B, G, _, _],
    [_, _, _, B, E, E, B, _, _, _],
    [_, _, _, B, M, M, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
  ], 3)
  const downWalk3 = stamp([
    [_, _, G, _, B, B, _, G, _, _],
    [_, _, G, B, B, B, B, G, _, _],
    [_, _, _, B, E, E, B, _, _, _],
    [_, _, _, B, M, M, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, B, _, _, B, B, _, _, B, _],
    [_, B, _, _, _, _, _, _, B, _],
  ], 3)
  const downSit1 = stamp([
    [_, _, G, _, B, B, _, G, _, _],
    [_, _, G, B, B, B, B, G, _, _],
    [_, _, _, B, E, E, B, _, _, _],
    [_, _, _, B, M, M, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 3)
  const downSit2 = stamp([
    [_, _, G, _, B, B, _, G, _, _],
    [_, _, G, B, B, B, B, G, _, _],
    [_, _, _, B, _, _, B, _, _, _],
    [_, _, _, B, M, M, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 3)

  const upWalk1 = stamp([
    [_, _, G, _, B, B, _, G, _, _],
    [_, _, G, B, B, B, B, G, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, _, B, B, _, B, _, _],
    [_, _, B, _, _, _, _, B, _, _],
  ], 3)
  const upWalk2 = stamp([
    [_, _, G, _, B, B, _, G, _, _],
    [_, _, G, B, B, B, B, G, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
  ], 3)
  const upWalk3 = stamp([
    [_, _, G, _, B, B, _, G, _, _],
    [_, _, G, B, B, B, B, G, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, B, _, _, B, B, _, _, B, _],
    [_, B, _, _, _, _, _, _, B, _],
  ], 3)
  const upSit1 = stamp([
    [_, _, G, _, B, B, _, G, _, _],
    [_, _, G, B, B, B, B, G, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 3)
  const upSit2 = upSit1

  const rightWalk1 = stamp([
    [_, _, _, _, B, B, G, _, _, _],
    [_, _, _, B, B, B, G, _, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, M, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
    [_, _, _, B, _, _, _, _, _, _],
  ], 3)
  const rightWalk2 = stamp([
    [_, _, _, _, B, B, G, _, _, _],
    [_, _, _, B, B, B, G, _, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, M, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
  ], 3)
  const rightWalk3 = stamp([
    [_, _, _, _, B, B, G, _, _, _],
    [_, _, _, B, B, B, G, _, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, M, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, B, _, _, _, _, B, _, _],
    [_, _, _, _, _, _, _, B, _, _],
  ], 3)
  const rightSit1 = stamp([
    [_, _, _, _, B, B, G, _, _, _],
    [_, _, _, B, B, B, G, _, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, M, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
  ], 3)
  const rightSit2 = rightSit1

  const down = [downWalk1, downWalk2, downWalk3, downSit1, downSit2, downSit1, downSit2]
  const up = [upWalk1, upWalk2, upWalk3, upSit1, upSit2, upSit1, upSit2]
  const right = [rightWalk1, rightWalk2, rightWalk3, rightSit1, rightSit2, rightSit1, rightSit2]
  return buildSprites(down, up, right)
}

// ── Pet 4: Hedgehog ──────────────────────────────────────────────
// ~8px tall, round with spiky back
function hedgehogSprites(): CharacterSprites {
  const Q = '#8B7355' // quills
  const B = '#DEB887' // belly
  const E = '#333333' // eyes
  const N = '#333333' // nose

  const downWalk1 = stamp([
    [_, _, _, Q, Q, Q, Q, _, _, _],
    [_, _, Q, Q, Q, Q, Q, Q, _, _],
    [_, _, Q, B, E, E, B, Q, _, _],
    [_, _, _, B, N, N, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, Q, B, B, B, B, Q, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, _, _, _, _, B, _, _],
  ], 4)
  const downWalk2 = stamp([
    [_, _, _, Q, Q, Q, Q, _, _, _],
    [_, _, Q, Q, Q, Q, Q, Q, _, _],
    [_, _, Q, B, E, E, B, Q, _, _],
    [_, _, _, B, N, N, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, Q, B, B, B, B, Q, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
  ], 4)
  const downWalk3 = stamp([
    [_, _, _, Q, Q, Q, Q, _, _, _],
    [_, _, Q, Q, Q, Q, Q, Q, _, _],
    [_, _, Q, B, E, E, B, Q, _, _],
    [_, _, _, B, N, N, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, Q, B, B, B, B, Q, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, B, _, _, _, _, _, _, B, _],
  ], 4)
  const downSit1 = stamp([
    [_, _, _, Q, Q, Q, Q, _, _, _],
    [_, _, Q, Q, Q, Q, Q, Q, _, _],
    [_, _, Q, B, E, E, B, Q, _, _],
    [_, _, _, B, N, N, B, _, _, _],
    [_, _, Q, B, B, B, B, Q, _, _],
    [_, _, Q, B, B, B, B, Q, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 4)
  const downSit2 = stamp([
    [_, _, _, Q, Q, Q, Q, _, _, _],
    [_, _, Q, Q, Q, Q, Q, Q, _, _],
    [_, _, Q, B, _, _, B, Q, _, _],
    [_, _, _, B, N, N, B, _, _, _],
    [_, _, Q, B, B, B, B, Q, _, _],
    [_, _, Q, B, B, B, B, Q, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 4)

  const upWalk1 = stamp([
    [_, _, _, Q, Q, Q, Q, _, _, _],
    [_, _, Q, Q, Q, Q, Q, Q, _, _],
    [_, _, Q, Q, Q, Q, Q, Q, _, _],
    [_, _, _, Q, Q, Q, Q, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, Q, B, B, B, B, Q, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, _, _, _, _, B, _, _],
  ], 4)
  const upWalk2 = stamp([
    [_, _, _, Q, Q, Q, Q, _, _, _],
    [_, _, Q, Q, Q, Q, Q, Q, _, _],
    [_, _, Q, Q, Q, Q, Q, Q, _, _],
    [_, _, _, Q, Q, Q, Q, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, Q, B, B, B, B, Q, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
  ], 4)
  const upWalk3 = stamp([
    [_, _, _, Q, Q, Q, Q, _, _, _],
    [_, _, Q, Q, Q, Q, Q, Q, _, _],
    [_, _, Q, Q, Q, Q, Q, Q, _, _],
    [_, _, _, Q, Q, Q, Q, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, Q, B, B, B, B, Q, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, B, _, _, _, _, _, _, B, _],
  ], 4)
  const upSit1 = stamp([
    [_, _, _, Q, Q, Q, Q, _, _, _],
    [_, _, Q, Q, Q, Q, Q, Q, _, _],
    [_, _, Q, Q, Q, Q, Q, Q, _, _],
    [_, _, _, Q, Q, Q, Q, _, _, _],
    [_, _, Q, B, B, B, B, Q, _, _],
    [_, _, Q, B, B, B, B, Q, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 4)
  const upSit2 = upSit1

  const rightWalk1 = stamp([
    [_, _, _, Q, Q, Q, _, _, _, _],
    [_, _, Q, Q, Q, B, B, _, _, _],
    [_, _, Q, Q, B, E, B, _, _, _],
    [_, _, _, Q, B, N, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, Q, B, B, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
  ], 4)
  const rightWalk2 = stamp([
    [_, _, _, Q, Q, Q, _, _, _, _],
    [_, _, Q, Q, Q, B, B, _, _, _],
    [_, _, Q, Q, B, E, B, _, _, _],
    [_, _, _, Q, B, N, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, Q, B, B, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
  ], 4)
  const rightWalk3 = stamp([
    [_, _, _, Q, Q, Q, _, _, _, _],
    [_, _, Q, Q, Q, B, B, _, _, _],
    [_, _, Q, Q, B, E, B, _, _, _],
    [_, _, _, Q, B, N, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, Q, B, B, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, B, _, _, _, _, B, _, _],
  ], 4)
  const rightSit1 = stamp([
    [_, _, _, Q, Q, Q, _, _, _, _],
    [_, _, Q, Q, Q, B, B, _, _, _],
    [_, _, Q, Q, B, E, B, _, _, _],
    [_, _, _, Q, B, N, _, _, _, _],
    [_, _, Q, B, B, B, _, _, _, _],
    [_, _, Q, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
  ], 4)
  const rightSit2 = rightSit1

  const down = [downWalk1, downWalk2, downWalk3, downSit1, downSit2, downSit1, downSit2]
  const up = [upWalk1, upWalk2, upWalk3, upSit1, upSit2, upSit1, upSit2]
  const right = [rightWalk1, rightWalk2, rightWalk3, rightSit1, rightSit2, rightSit1, rightSit2]
  return buildSprites(down, up, right)
}

// ── Pet 5: Red Panda ─────────────────────────────────────────────
// ~10px tall, russet with striped tail
function redPandaSprites(): CharacterSprites {
  const B = '#CC4422' // body
  const F = '#FFE4B5' // face
  const D = '#553311' // dark markings
  const E = '#333333' // eyes
  const N = '#222222' // nose

  const downWalk1 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, F, B, B, F, B, _, _],
    [_, _, B, F, E, E, F, B, _, _],
    [_, _, _, F, N, N, F, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, F, F, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, F, F, B, _, _, _],
    [_, _, B, _, B, B, _, B, _, _],
    [_, _, B, _, _, _, _, B, _, _],
  ], 3)
  const downWalk2 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, F, B, B, F, B, _, _],
    [_, _, B, F, E, E, F, B, _, _],
    [_, _, _, F, N, N, F, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, F, F, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, F, F, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
  ], 3)
  const downWalk3 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, F, B, B, F, B, _, _],
    [_, _, B, F, E, E, F, B, _, _],
    [_, _, _, F, N, N, F, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, F, F, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, F, F, B, _, _, _],
    [_, B, _, _, B, B, _, _, B, _],
    [_, B, _, _, _, _, _, _, B, _],
  ], 3)
  const downSit1 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, F, B, B, F, B, _, _],
    [_, _, B, F, E, E, F, B, _, _],
    [_, _, _, F, N, N, F, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, F, F, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 3)
  const downSit2 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, F, B, B, F, B, _, _],
    [_, _, B, F, _, _, F, B, _, _],
    [_, _, _, F, N, N, F, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, F, F, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 3)

  const upWalk1 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, D, D, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, D, D, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, _, B, B, _, B, _, _],
    [_, _, B, _, _, _, _, B, _, _],
  ], 3)
  const upWalk2 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, D, D, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, D, D, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
  ], 3)
  const upWalk3 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, D, D, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, D, D, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, B, _, _, B, B, _, _, B, _],
    [_, B, _, _, _, _, _, _, B, _],
  ], 3)
  const upSit1 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, D, D, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, D, D, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 3)
  const upSit2 = upSit1

  const rightWalk1 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, F, B, _, _, _],
    [_, _, _, B, F, E, F, _, _, _],
    [_, _, _, B, F, N, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, F, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, F, B, D, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
    [_, _, _, B, _, _, _, _, _, _],
  ], 3)
  const rightWalk2 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, F, B, _, _, _],
    [_, _, _, B, F, E, F, _, _, _],
    [_, _, _, B, F, N, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, F, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, F, B, D, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
  ], 3)
  const rightWalk3 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, F, B, _, _, _],
    [_, _, _, B, F, E, F, _, _, _],
    [_, _, _, B, F, N, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, F, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, F, B, D, _, _, _],
    [_, _, B, _, _, _, _, B, _, _],
    [_, _, _, _, _, _, _, B, _, _],
  ], 3)
  const rightSit1 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, F, B, _, _, _],
    [_, _, _, B, F, E, F, _, _, _],
    [_, _, _, B, F, N, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, F, B, _, _, _, _],
    [_, _, B, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, D, _, _, _],
  ], 3)
  const rightSit2 = rightSit1

  const down = [downWalk1, downWalk2, downWalk3, downSit1, downSit2, downSit1, downSit2]
  const up = [upWalk1, upWalk2, upWalk3, upSit1, upSit2, upSit1, upSit2]
  const right = [rightWalk1, rightWalk2, rightWalk3, rightSit1, rightSit2, rightSit1, rightSit2]
  return buildSprites(down, up, right)
}

// ── Pet 6: Jellyfish ─────────────────────────────────────────────
// ~10px tall, translucent blue bell with tentacles
function jellyfishSprites(): CharacterSprites {
  const B = '#88CCFF' // body/bell
  const L = '#AADDFF' // light
  const T = '#6699CC' // tentacles
  const E = '#335577' // eyes

  // Jellyfish bobs up/down instead of walking — tentacles sway
  const downWalk1 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, B, L, E, E, L, B, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, T, _, _, T, _, _, _],
    [_, _, T, _, T, T, _, T, _, _],
    [_, _, _, _, T, T, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ], 3)
  const downWalk2 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, B, L, E, E, L, B, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, _, T, T, _, _, _, _],
    [_, _, _, T, _, _, T, _, _, _],
    [_, _, _, T, _, _, T, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ], 3)
  const downWalk3 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, B, L, E, E, L, B, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, T, _, _, _, _, T, _, _],
    [_, _, _, T, _, _, T, _, _, _],
    [_, _, _, _, T, T, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ], 3)
  const downSit1 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, B, L, E, E, L, B, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, T, _, _, T, _, _, _],
    [_, _, _, T, _, _, T, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ], 3)
  const downSit2 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, B, L, _, _, L, B, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, _, T, T, _, _, _, _],
    [_, _, _, T, _, _, T, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ], 3)

  // UP/RIGHT reuse similar forms — jellyfish is mostly symmetric
  const upWalk1 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, T, _, _, T, _, _, _],
    [_, _, T, _, T, T, _, T, _, _],
    [_, _, _, _, T, T, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ], 3)
  const upWalk2 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, _, T, T, _, _, _, _],
    [_, _, _, T, _, _, T, _, _, _],
    [_, _, _, T, _, _, T, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ], 3)
  const upWalk3 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, T, _, _, _, _, T, _, _],
    [_, _, _, T, _, _, T, _, _, _],
    [_, _, _, _, T, T, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ], 3)
  const upSit1 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, T, _, _, T, _, _, _],
    [_, _, _, T, _, _, T, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ], 3)
  const upSit2 = upSit1

  const rightWalk1 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, _, B, L, E, L, B, _, _],
    [_, _, _, B, L, L, L, B, _, _],
    [_, _, _, _, B, B, B, _, _, _],
    [_, _, _, _, T, _, T, _, _, _],
    [_, _, _, T, _, T, _, _, _, _],
    [_, _, _, _, T, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ], 3)
  const rightWalk2 = stamp([
    [_, _, _, _, B, B, B, _, _, _],
    [_, _, _, B, L, L, L, B, _, _],
    [_, _, _, B, L, E, L, B, _, _],
    [_, _, _, _, B, L, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, _, T, _, _, _, _],
    [_, _, _, _, T, _, T, _, _, _],
    [_, _, _, _, T, _, T, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ], 3)
  const rightWalk3 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, _, B, L, E, L, B, _, _],
    [_, _, _, B, L, L, L, B, _, _],
    [_, _, _, _, B, B, B, _, _, _],
    [_, _, _, T, _, _, _, T, _, _],
    [_, _, _, _, T, _, T, _, _, _],
    [_, _, _, _, _, T, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ], 3)
  const rightSit1 = stamp([
    [_, _, _, _, B, B, B, _, _, _],
    [_, _, _, B, L, L, L, B, _, _],
    [_, _, _, B, L, E, L, B, _, _],
    [_, _, _, _, B, L, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, _, T, _, _, _, _],
    [_, _, _, _, T, _, T, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ], 3)
  const rightSit2 = rightSit1

  const down = [downWalk1, downWalk2, downWalk3, downSit1, downSit2, downSit1, downSit2]
  const up = [upWalk1, upWalk2, upWalk3, upSit1, upSit2, upSit1, upSit2]
  const right = [rightWalk1, rightWalk2, rightWalk3, rightSit1, rightSit2, rightSit1, rightSit2]
  return buildSprites(down, up, right)
}

// ── Pet 7: Chameleon ─────────────────────────────────────────────
// ~8px tall, green with curled tail
function chameleonSprites(): CharacterSprites {
  const B = '#44AA44' // body
  const L = '#66CC66' // belly/lighter
  const E = '#FF4444' // eyes
  const D = '#338833' // dark

  const downWalk1 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, E, B, B, E, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, B, _, B, B, _, B, _, _],
    [_, _, B, _, _, _, _, B, _, _],
  ], 3)
  const downWalk2 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, E, B, B, E, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
  ], 3)
  const downWalk3 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, E, B, B, E, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, B, _, _, B, B, _, _, B, _],
    [_, B, _, _, _, _, _, _, B, _],
  ], 3)
  const downSit1 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, E, B, B, E, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 3)
  const downSit2 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, _, B, B, _, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, L, L, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, L, L, L, L, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 3)

  const upWalk1 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, D, D, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, D, D, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, D, D, B, _, _, _],
    [_, _, B, _, B, B, _, B, _, _],
    [_, _, B, _, _, _, _, B, _, _],
  ], 3)
  const upWalk2 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, D, D, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, D, D, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, D, D, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
  ], 3)
  const upWalk3 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, D, D, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, D, D, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, D, D, B, _, _, _],
    [_, B, _, _, B, B, _, _, B, _],
    [_, B, _, _, _, _, _, _, B, _],
  ], 3)
  const upSit1 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, D, D, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, D, D, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, D, D, D, D, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 3)
  const upSit2 = upSit1

  const rightWalk1 = stamp([
    [_, _, _, _, _, B, _, _, _, _],
    [_, _, _, _, B, B, B, _, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, L, B, _, _, _, _],
    [_, _, _, B, B, B, D, _, _, _],
    [_, _, _, B, L, B, D, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
    [_, _, _, B, _, _, _, _, _, _],
  ], 3)
  const rightWalk2 = stamp([
    [_, _, _, _, _, B, _, _, _, _],
    [_, _, _, _, B, B, B, _, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, L, B, _, _, _, _],
    [_, _, _, B, B, B, D, _, _, _],
    [_, _, _, B, L, B, D, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
  ], 3)
  const rightWalk3 = stamp([
    [_, _, _, _, _, B, _, _, _, _],
    [_, _, _, _, B, B, B, _, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, L, B, _, _, _, _],
    [_, _, _, B, B, B, D, _, _, _],
    [_, _, _, B, L, B, D, _, _, _],
    [_, _, B, _, _, _, _, B, _, _],
    [_, _, _, _, _, _, _, B, _, _],
  ], 3)
  const rightSit1 = stamp([
    [_, _, _, _, _, B, _, _, _, _],
    [_, _, _, _, B, B, B, _, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, L, B, _, _, _, _],
    [_, _, _, B, B, B, D, _, _, _],
    [_, _, B, B, L, B, D, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
  ], 3)
  const rightSit2 = rightSit1

  const down = [downWalk1, downWalk2, downWalk3, downSit1, downSit2, downSit1, downSit2]
  const up = [upWalk1, upWalk2, upWalk3, upSit1, upSit2, upSit1, upSit2]
  const right = [rightWalk1, rightWalk2, rightWalk3, rightSit1, rightSit2, rightSit1, rightSit2]
  return buildSprites(down, up, right)
}

// ── Pet 8: Penguin ───────────────────────────────────────────────
// ~10px tall, classic tuxedo
function penguinSprites(): CharacterSprites {
  const B = '#222222' // back/dark
  const W = '#FFFFFF' // belly white
  const K = '#FF8844' // beak
  const E = '#333333' // eyes
  const F = '#FF6633' // feet

  const downWalk1 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, W, E, E, W, B, _, _],
    [_, _, B, W, K, K, W, B, _, _],
    [_, _, B, W, W, W, W, B, _, _],
    [_, B, B, W, W, W, W, B, B, _],
    [_, _, B, W, W, W, W, B, _, _],
    [_, _, _, B, W, W, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, F, _, _, F, _, _, _],
  ], 3)
  const downWalk2 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, W, E, E, W, B, _, _],
    [_, _, B, W, K, K, W, B, _, _],
    [_, _, B, W, W, W, W, B, _, _],
    [_, B, B, W, W, W, W, B, B, _],
    [_, _, B, W, W, W, W, B, _, _],
    [_, _, _, B, W, W, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, F, F, _, _, _, _],
  ], 3)
  const downWalk3 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, W, E, E, W, B, _, _],
    [_, _, B, W, K, K, W, B, _, _],
    [_, _, B, W, W, W, W, B, _, _],
    [_, B, B, W, W, W, W, B, B, _],
    [_, _, B, W, W, W, W, B, _, _],
    [_, _, _, B, W, W, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, F, _, _, _, _, F, _, _],
  ], 3)
  const downSit1 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, W, E, E, W, B, _, _],
    [_, _, B, W, K, K, W, B, _, _],
    [_, _, B, W, W, W, W, B, _, _],
    [_, _, B, W, W, W, W, B, _, _],
    [_, _, B, W, W, W, W, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 3)
  const downSit2 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, W, _, _, W, B, _, _],
    [_, _, B, W, K, K, W, B, _, _],
    [_, _, B, W, W, W, W, B, _, _],
    [_, _, B, W, W, W, W, B, _, _],
    [_, _, B, W, W, W, W, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 3)

  const upWalk1 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, B, B, B, B, B, B, B, B, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, F, _, _, F, _, _, _],
  ], 3)
  const upWalk2 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, B, B, B, B, B, B, B, B, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, F, F, _, _, _, _],
  ], 3)
  const upWalk3 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, B, B, B, B, B, B, B, B, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, F, _, _, _, _, F, _, _],
  ], 3)
  const upSit1 = stamp([
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, B, B, B, B, B, B, _, _],
    [_, _, _, B, B, B, B, _, _, _],
  ], 3)
  const upSit2 = upSit1

  const rightWalk1 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, W, E, B, _, _, _],
    [_, _, _, B, W, K, _, _, _, _],
    [_, _, _, B, W, W, B, _, _, _],
    [_, _, _, B, W, W, B, B, _, _],
    [_, _, _, B, W, W, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, F, _, F, _, _, _],
  ], 3)
  const rightWalk2 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, W, E, B, _, _, _],
    [_, _, _, B, W, K, _, _, _, _],
    [_, _, _, B, W, W, B, _, _, _],
    [_, _, _, B, W, W, B, B, _, _],
    [_, _, _, B, W, W, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, _, F, _, _, _, _],
  ], 3)
  const rightWalk3 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, W, E, B, _, _, _],
    [_, _, _, B, W, K, _, _, _, _],
    [_, _, _, B, W, W, B, _, _, _],
    [_, _, _, B, W, W, B, B, _, _],
    [_, _, _, B, W, W, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, F, _, _, _, F, _, _],
  ], 3)
  const rightSit1 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, W, E, B, _, _, _],
    [_, _, _, B, W, K, _, _, _, _],
    [_, _, _, B, W, W, B, _, _, _],
    [_, _, _, B, W, W, B, _, _, _],
    [_, _, _, B, W, W, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
  ], 3)
  const rightSit2 = rightSit1

  const down = [downWalk1, downWalk2, downWalk3, downSit1, downSit2, downSit1, downSit2]
  const up = [upWalk1, upWalk2, upWalk3, upSit1, upSit2, upSit1, upSit2]
  const right = [rightWalk1, rightWalk2, rightWalk3, rightSit1, rightSit2, rightSit1, rightSit2]
  return buildSprites(down, up, right)
}

// ── Pet 9: Bat ───────────────────────────────────────────────────
// ~8px tall, dark purple with wings
function batSprites(): CharacterSprites {
  const B = '#443355' // body
  const W = '#665577' // wings
  const E = '#FF4444' // eyes
  const D = '#332244' // dark

  // Wings spread while walking, folded while sitting
  const downWalk1 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, E, E, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, W, W, B, B, B, B, W, W, _],
    [_, _, W, B, D, D, B, W, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
  ], 3)
  const downWalk2 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, E, E, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, W, B, B, B, B, W, _, _],
    [_, _, W, B, D, D, B, W, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
  ], 3)
  const downWalk3 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, E, E, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [W, W, W, B, B, B, B, W, W, W],
    [_, _, _, B, D, D, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, B, _, _, _, _, B, _, _],
  ], 3)
  const downSit1 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, E, E, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, W, B, B, B, B, W, _, _],
    [_, _, W, B, D, D, B, W, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
  ], 3)
  const downSit2 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, W, B, B, B, B, W, _, _],
    [_, _, W, B, D, D, B, W, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
  ], 3)

  const upWalk1 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, W, W, B, B, B, B, W, W, _],
    [_, _, W, B, D, D, B, W, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, _, _, B, _, _, _],
  ], 3)
  const upWalk2 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, W, B, B, B, B, W, _, _],
    [_, _, W, B, D, D, B, W, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
  ], 3)
  const upWalk3 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [W, W, W, B, B, B, B, W, W, W],
    [_, _, _, B, D, D, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, B, _, _, _, _, B, _, _],
  ], 3)
  const upSit1 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, W, B, B, B, B, W, _, _],
    [_, _, W, B, D, D, B, W, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
  ], 3)
  const upSit2 = upSit1

  const rightWalk1 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, B, B, W, W, _, _],
    [_, _, _, B, D, B, W, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, _, B, _, _, _, _, _],
    [_, _, _, _, B, _, B, _, _, _],
  ], 3)
  const rightWalk2 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, B, B, W, _, _, _],
    [_, _, _, B, D, B, W, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, _, B, _, _, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
  ], 3)
  const rightWalk3 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, B, B, W, W, W, _],
    [_, _, _, B, D, B, _, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, _, B, _, _, _, _, _],
    [_, _, _, B, _, _, _, B, _, _],
  ], 3)
  const rightSit1 = stamp([
    [_, _, _, _, B, B, _, _, _, _],
    [_, _, _, B, B, B, B, _, _, _],
    [_, _, _, B, B, E, B, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, B, B, B, W, _, _, _],
    [_, _, _, B, D, B, W, _, _, _],
    [_, _, _, B, B, B, _, _, _, _],
    [_, _, _, _, B, B, _, _, _, _],
  ], 3)
  const rightSit2 = rightSit1

  const down = [downWalk1, downWalk2, downWalk3, downSit1, downSit2, downSit1, downSit2]
  const up = [upWalk1, upWalk2, upWalk3, upSit1, upSit2, upSit1, upSit2]
  const right = [rightWalk1, rightWalk2, rightWalk3, rightSit1, rightSit2, rightSit1, rightSit2]
  return buildSprites(down, up, right)
}

// ── Pet sprite registry + cache ──────────────────────────────────

const PET_BUILDERS: Array<() => CharacterSprites> = [
  catSprites,       // 0
  dogSprites,       // 1
  owlSprites,       // 2
  axolotlSprites,   // 3
  hedgehogSprites,  // 4
  redPandaSprites,  // 5
  jellyfishSprites, // 6
  chameleonSprites, // 7
  penguinSprites,   // 8
  batSprites,       // 9
]

const petSpriteCache = new Map<number, CharacterSprites>()

export function getPetSprites(petType: number): CharacterSprites {
  const cached = petSpriteCache.get(petType)
  if (cached) return cached
  const builder = PET_BUILDERS[petType % PET_BUILDERS.length]
  const sprites = builder()
  petSpriteCache.set(petType, sprites)
  return sprites
}
