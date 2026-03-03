import { TileType, FurnitureType } from '../types.js'
import type { TileType as TileTypeVal, OfficeLayout, PlacedFurniture, FloorColor } from '../types.js'
import { getCatalogEntry, getActiveCatalog } from './furnitureCatalog.js'
import type { FurnitureCategory } from './furnitureCatalog.js'

// ── Room types & sizing ─────────────────────────────────────

type RoomType = 'workspace' | 'meeting' | 'kitchen' | 'library' | 'storage' | 'lounge' | 'manager'

interface RoomTypeDef {
  weight: number
  minW: number
  minH: number
}

const ROOM_TYPES: Record<RoomType, RoomTypeDef> = {
  workspace: { weight: 30, minW: 5, minH: 5 },
  meeting:   { weight: 15, minW: 5, minH: 5 },
  kitchen:   { weight: 10, minW: 4, minH: 4 },
  library:   { weight: 10, minW: 4, minH: 4 },
  storage:   { weight: 10, minW: 3, minH: 3 },
  lounge:    { weight: 15, minW: 5, minH: 5 },
  manager:   { weight: 10, minW: 4, minH: 4 },
}

// ── Furniture footprint lookup ───────────────────────────────

function fp(type: string): { w: number; h: number } | null {
  const entry = getCatalogEntry(type)
  if (!entry) return null
  return { w: entry.footprintW, h: entry.footprintH }
}

// ── Room color palettes ──────────────────────────────────────

const ROOM_PALETTES: FloorColor[] = [
  { h: 35, s: 30, b: 15, c: 0 },     // warm beige
  { h: 25, s: 45, b: 5, c: 10 },     // warm brown
  { h: 210, s: 20, b: 10, c: 0 },    // cool blue-gray
  { h: 120, s: 15, b: 5, c: 0 },     // sage green
  { h: 280, s: 20, b: -5, c: 0 },    // soft purple
  { h: 0, s: 10, b: 20, c: 0 },      // light gray
  { h: 50, s: 35, b: 10, c: 5 },     // golden oak
  { h: 15, s: 50, b: 0, c: 5 },      // terracotta
  { h: 190, s: 25, b: 5, c: 0 },     // teal
  { h: 340, s: 15, b: 5, c: 0 },     // dusty rose
]

// ── BSP partition tree ───────────────────────────────────────

interface Rect {
  x: number // col start (interior, wall-exclusive)
  y: number // row start
  w: number // width (interior tiles)
  h: number // height
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── Catalog-driven type picker ───────────────────────────────

function pickType(opts: {
  categories?: FurnitureCategory[]
  maxW?: number
  maxH?: number
  isDesk?: boolean
  canPlaceOnWalls?: boolean
  backgroundTiles?: boolean
}): string | null {
  let candidates = getActiveCatalog()
  if (opts.categories) candidates = candidates.filter(e => opts.categories!.includes(e.category))
  if (opts.maxW !== undefined) candidates = candidates.filter(e => e.footprintW <= opts.maxW!)
  if (opts.maxH !== undefined) candidates = candidates.filter(e => e.footprintH <= opts.maxH!)
  if (opts.isDesk !== undefined) candidates = candidates.filter(e => e.isDesk === opts.isDesk)
  if (opts.canPlaceOnWalls) candidates = candidates.filter(e => e.canPlaceOnWalls)
  if (opts.backgroundTiles) candidates = candidates.filter(e => (e.backgroundTiles ?? 0) > 0)
  return candidates.length > 0 ? randChoice(candidates).type : null
}

/**
 * Recursively split a rectangle into rooms using BSP.
 * Returns a flat list of leaf rectangles (the rooms).
 */
function bspSplit(rect: Rect, numSplits: number): Rect[] {
  if (numSplits <= 0 || (rect.w < 6 && rect.h < 6)) {
    return [rect]
  }

  // Prefer splitting the longer axis, with some randomness
  const preferVertical = rect.w > rect.h ? 0.75 : rect.w < rect.h ? 0.25 : 0.5
  const splitVertical = Math.random() < preferVertical

  if (splitVertical) {
    // Split vertically (left/right)
    const minSplit = 3 // minimum room interior width
    const maxSplit = rect.w - 3
    if (minSplit > maxSplit) return [rect] // too narrow to split

    const splitAt = randInt(minSplit, maxSplit)
    const left: Rect = { x: rect.x, y: rect.y, w: splitAt, h: rect.h }
    const right: Rect = { x: rect.x + splitAt + 1, y: rect.y, w: rect.w - splitAt - 1, h: rect.h }

    if (right.w < 2) return [rect]

    // Distribute remaining splits
    const leftSplits = Math.floor((numSplits - 1) / 2)
    const rightSplits = numSplits - 1 - leftSplits
    return [...bspSplit(left, leftSplits), ...bspSplit(right, rightSplits)]
  } else {
    // Split horizontally (top/bottom)
    const minSplit = 3
    const maxSplit = rect.h - 3
    if (minSplit > maxSplit) return [rect]

    const splitAt = randInt(minSplit, maxSplit)
    const top: Rect = { x: rect.x, y: rect.y, w: rect.w, h: splitAt }
    const bottom: Rect = { x: rect.x, y: rect.y + splitAt + 1, w: rect.w, h: rect.h - splitAt - 1 }

    if (bottom.h < 2) return [rect]

    const topSplits = Math.floor((numSplits - 1) / 2)
    const bottomSplits = numSplits - 1 - topSplits
    return [...bspSplit(top, topSplits), ...bspSplit(bottom, bottomSplits)]
  }
}

/**
 * Assign a room type based on weighted random selection, filtered by room size.
 */
function assignRoomType(roomW: number, roomH: number): RoomType {
  const eligible = (Object.entries(ROOM_TYPES) as [RoomType, RoomTypeDef][])
    .filter(([, def]) => roomW >= def.minW && roomH >= def.minH)

  if (eligible.length === 0) return 'storage' // smallest fallback

  const totalWeight = eligible.reduce((sum, [, def]) => sum + def.weight, 0)
  let roll = Math.random() * totalWeight
  for (const [type, def] of eligible) {
    roll -= def.weight
    if (roll <= 0) return type
  }
  return eligible[eligible.length - 1][0]
}

/**
 * Check if a footprint can be placed at (col, row) within a room.
 * The room interior is defined by rect. Occupied tiles are tracked.
 */
function canPlace(
  col: number, row: number, fw: number, fh: number,
  rect: Rect, occupied: Set<string>,
): boolean {
  for (let dr = 0; dr < fh; dr++) {
    for (let dc = 0; dc < fw; dc++) {
      const c = col + dc
      const r = row + dr
      if (c < rect.x || c >= rect.x + rect.w || r < rect.y || r >= rect.y + rect.h) return false
      if (occupied.has(`${c},${r}`)) return false
    }
  }
  return true
}

// ── Placement helpers ────────────────────────────────────────

type Pos = { col: number; row: number }
type Wall = 'top' | 'bottom' | 'left' | 'right'

function makeUid(): string {
  return `r-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function markOccupied(col: number, row: number, fw: number, fh: number, occupied: Set<string>): void {
  for (let dr = 0; dr < fh; dr++) {
    for (let dc = 0; dc < fw; dc++) {
      occupied.add(`${col + dc},${row + dr}`)
    }
  }
}

/** Try to place an item at an exact position. Returns placement position or null. */
function tryPlaceAt(
  col: number, row: number, type: string,
  rect: Rect, occupied: Set<string>, placed: PlacedFurniture[],
): Pos | null {
  const ft = fp(type)
  if (!ft) return null
  if (!canPlace(col, row, ft.w, ft.h, rect, occupied)) return null
  placed.push({ uid: makeUid(), type, col, row })
  markOccupied(col, row, ft.w, ft.h, occupied)
  return { col, row }
}

/** Place an item at a random valid position within the room. */
function placeRandom(
  rect: Rect, occupied: Set<string>, type: string,
  placed: PlacedFurniture[],
): Pos | null {
  const ft = fp(type)
  if (!ft || rect.w < ft.w || rect.h < ft.h) return null
  for (let attempt = 0; attempt < 30; attempt++) {
    const col = randInt(rect.x, rect.x + rect.w - ft.w)
    const row = randInt(rect.y, rect.y + rect.h - ft.h)
    const result = tryPlaceAt(col, row, type, rect, occupied, placed)
    if (result) return result
  }
  return null
}

/** Place an item along a specific wall edge. */
function placeAlongWall(
  rect: Rect, occupied: Set<string>, type: string,
  wall: Wall, placed: PlacedFurniture[],
): Pos | null {
  const ft = fp(type)
  if (!ft) return null
  const positions: Pos[] = []
  switch (wall) {
    case 'top':
      for (let c = rect.x; c <= rect.x + rect.w - ft.w; c++)
        positions.push({ col: c, row: rect.y })
      break
    case 'bottom':
      for (let c = rect.x; c <= rect.x + rect.w - ft.w; c++)
        positions.push({ col: c, row: rect.y + rect.h - ft.h })
      break
    case 'left':
      for (let r = rect.y; r <= rect.y + rect.h - ft.h; r++)
        positions.push({ col: rect.x, row: r })
      break
    case 'right':
      for (let r = rect.y; r <= rect.y + rect.h - ft.h; r++)
        positions.push({ col: rect.x + rect.w - ft.w, row: r })
      break
  }
  for (const pos of shuffle(positions)) {
    const result = tryPlaceAt(pos.col, pos.row, type, rect, occupied, placed)
    if (result) return result
  }
  return null
}

/** Place an item along any wall (tries all 4 in random order). */
function placeAlongAnyWall(
  rect: Rect, occupied: Set<string>, type: string,
  placed: PlacedFurniture[],
): Pos | null {
  for (const wall of shuffle<Wall>(['top', 'bottom', 'left', 'right'])) {
    const result = placeAlongWall(rect, occupied, type, wall, placed)
    if (result) return result
  }
  return null
}

/** Place an item in one of the room's corners, falling back to wall placement. */
function placeInCorner(
  rect: Rect, occupied: Set<string>, type: string,
  placed: PlacedFurniture[],
): Pos | null {
  const ft = fp(type)
  if (!ft) return null
  const corners: Pos[] = shuffle([
    { col: rect.x, row: rect.y },
    { col: rect.x + rect.w - ft.w, row: rect.y },
    { col: rect.x, row: rect.y + rect.h - ft.h },
    { col: rect.x + rect.w - ft.w, row: rect.y + rect.h - ft.h },
  ])
  for (const pos of corners) {
    const result = tryPlaceAt(pos.col, pos.row, type, rect, occupied, placed)
    if (result) return result
  }
  return placeAlongAnyWall(rect, occupied, type, placed)
}

/** Place an item near a target position, searching outward in Chebyshev distance rings. */
function placeNear(
  rect: Rect, occupied: Set<string>, type: string,
  targetCol: number, targetRow: number, radius: number,
  placed: PlacedFurniture[],
): Pos | null {
  const ft = fp(type)
  if (!ft) return null
  for (let dist = 0; dist <= radius; dist++) {
    const candidates: Pos[] = []
    for (let dr = -dist; dr <= dist; dr++) {
      for (let dc = -dist; dc <= dist; dc++) {
        if (Math.max(Math.abs(dr), Math.abs(dc)) !== dist) continue
        candidates.push({ col: targetCol + dc, row: targetRow + dr })
      }
    }
    for (const pos of shuffle(candidates)) {
      const result = tryPlaceAt(pos.col, pos.row, type, rect, occupied, placed)
      if (result) return result
    }
  }
  return null
}

/** Place at or near the center of the room. */
function placeCentered(
  rect: Rect, occupied: Set<string>, type: string,
  placed: PlacedFurniture[],
): Pos | null {
  const ft = fp(type)
  if (!ft) return null
  const centerCol = rect.x + Math.floor((rect.w - ft.w) / 2)
  const centerRow = rect.y + Math.floor((rect.h - ft.h) / 2)
  return placeNear(rect, occupied, type, centerCol, centerRow, Math.max(rect.w, rect.h), placed)
}

/** Place a workstation cluster: desk + adjacent chairs + optional PC. */
function placeWorkstation(
  rect: Rect, occupied: Set<string>, placed: PlacedFurniture[],
  deskType: string, chairType: string, pcType: string,
): boolean {
  const deskFt = fp(deskType)
  if (!deskFt || rect.w < deskFt.w || rect.h < deskFt.h) return false

  for (let attempt = 0; attempt < 20; attempt++) {
    const col = randInt(rect.x, rect.x + rect.w - deskFt.w)
    const row = randInt(rect.y, rect.y + rect.h - deskFt.h)
    if (!canPlace(col, row, deskFt.w, deskFt.h, rect, occupied)) continue

    // Place the desk
    placed.push({ uid: makeUid(), type: deskType, col, row })
    markOccupied(col, row, deskFt.w, deskFt.h, occupied)

    // Place 1–2 chairs adjacent to the desk (footprint-adaptive)
    const numChairs = randInt(1, 2)
    const chairSpots: Pos[] = []
    // Bottom edge
    for (let dc = 0; dc < deskFt.w; dc++) chairSpots.push({ col: col + dc, row: row + deskFt.h })
    // Top edge
    for (let dc = 0; dc < deskFt.w; dc++) chairSpots.push({ col: col + dc, row: row - 1 })
    // Left edge
    for (let dr = 0; dr < deskFt.h; dr++) chairSpots.push({ col: col - 1, row: row + dr })
    // Right edge
    for (let dr = 0; dr < deskFt.h; dr++) chairSpots.push({ col: col + deskFt.w, row: row + dr })

    let chairsPlaced = 0
    for (const spot of shuffle(chairSpots)) {
      if (chairsPlaced >= numChairs) break
      if (tryPlaceAt(spot.col, spot.row, chairType, rect, occupied, placed)) {
        chairsPlaced++
      }
    }

    // Optionally place electronics near the desk
    if (Math.random() < 0.6) {
      placeNear(rect, occupied, pcType, col, row, 2, placed)
    }

    return true
  }
  return false
}

// ── Per-room-type placement ──────────────────────────────────

function placeWorkspaceRoom(rect: Rect, occupied: Set<string>, placed: PlacedFurniture[]): void {
  const area = rect.w * rect.h
  const numWorkstations = Math.max(1, Math.floor(area / 25))

  const deskType = pickType({ categories: ['desks'], isDesk: true, maxW: rect.w, maxH: rect.h }) ?? FurnitureType.DESK
  const chairType = pickType({ categories: ['chairs'], maxW: 1, maxH: 1 }) ?? FurnitureType.CHAIR
  const pcType = pickType({ categories: ['electronics'], maxW: 1, maxH: 1 }) ?? FurnitureType.PC

  for (let i = 0; i < numWorkstations; i++) {
    placeWorkstation(rect, occupied, placed, deskType, chairType, pcType)
  }

  const accentType = pickType({ categories: ['plants', 'decor'], maxW: 1, maxH: 1 }) ?? FurnitureType.PLANT
  if (Math.random() < 0.5) placeInCorner(rect, occupied, accentType, placed)

  const elecType = pickType({ categories: ['electronics'], maxW: 1, maxH: 1 }) ?? FurnitureType.LAMP
  if (Math.random() < 0.3) placeInCorner(rect, occupied, elecType, placed)
}

function placeMeetingRoom(rect: Rect, occupied: Set<string>, placed: PlacedFurniture[]): void {
  const tableType = pickType({ categories: ['desks'], maxW: rect.w, maxH: rect.h }) ?? FurnitureType.DESK
  const chairType = pickType({ categories: ['chairs'], maxW: 1, maxH: 1 }) ?? FurnitureType.CHAIR

  // Center table with chairs around all sides
  const deskPos = placeCentered(rect, occupied, tableType, placed)
  if (deskPos) {
    const deskFt = fp(tableType)
    if (deskFt) {
      const numChairs = randInt(3, 6)
      const chairSpots: Pos[] = []
      // Bottom edge
      for (let dc = 0; dc < deskFt.w; dc++) chairSpots.push({ col: deskPos.col + dc, row: deskPos.row + deskFt.h })
      // Top edge
      for (let dc = 0; dc < deskFt.w; dc++) chairSpots.push({ col: deskPos.col + dc, row: deskPos.row - 1 })
      // Left edge
      for (let dr = 0; dr < deskFt.h; dr++) chairSpots.push({ col: deskPos.col - 1, row: deskPos.row + dr })
      // Right edge
      for (let dr = 0; dr < deskFt.h; dr++) chairSpots.push({ col: deskPos.col + deskFt.w, row: deskPos.row + dr })

      let chairsPlaced = 0
      for (const spot of shuffle(chairSpots)) {
        if (chairsPlaced >= numChairs) break
        if (tryPlaceAt(spot.col, spot.row, chairType, rect, occupied, placed)) {
          chairsPlaced++
        }
      }
    }
  }

  // Wall feature (whiteboard, decor, etc.) on top wall
  const wallFeatureType = pickType({ categories: ['decor'], maxW: 2, maxH: 1 }) ?? FurnitureType.WHITEBOARD
  if (Math.random() < 0.7) {
    placeAlongWall(rect, occupied, wallFeatureType, 'top', placed)
  }
}

function placeKitchenRoom(rect: Rect, occupied: Set<string>, placed: PlacedFurniture[]): void {
  const applianceType1 = pickType({ categories: ['misc'], maxW: 1, maxH: 1 }) ?? FurnitureType.COFFEE_MACHINE
  const applianceType2 = pickType({ categories: ['misc'], maxW: 1, maxH: 1 }) ?? FurnitureType.COOLER
  const seatingType = pickType({ categories: ['chairs'], maxW: 2 }) ?? FurnitureType.COUCH
  const tableType = pickType({ categories: ['desks'], maxW: 1, maxH: 1 }) ?? FurnitureType.COFFEE_TABLE

  // Appliances along walls
  placeAlongAnyWall(rect, occupied, applianceType1, placed)
  placeAlongAnyWall(rect, occupied, applianceType2, placed)

  // Optional seating + table nearby
  if (Math.random() < 0.6) {
    const seatPos = placeAlongWall(rect, occupied, seatingType, 'bottom', placed)
      ?? placeAlongAnyWall(rect, occupied, seatingType, placed)
    if (seatPos) {
      placeNear(rect, occupied, tableType, seatPos.col, seatPos.row - 1, 2, placed)
    }
  }

  // 1–2 tables in center area
  const numTables = randInt(1, 2)
  for (let i = 0; i < numTables; i++) {
    placeCentered(rect, occupied, tableType, placed)
  }
}

function placeLibraryRoom(rect: Rect, occupied: Set<string>, placed: PlacedFurniture[]): void {
  const shelvingType = pickType({ categories: ['storage'], maxH: rect.h }) ?? FurnitureType.BOOKSHELF
  const chairType = pickType({ categories: ['chairs'], maxW: 1, maxH: 1 }) ?? FurnitureType.CHAIR
  const accentType = pickType({ categories: ['decor', 'plants'], maxW: 1, maxH: 1 }) ?? FurnitureType.PLANT

  // Shelving lining walls
  const wallLength = 2 * (rect.w + rect.h)
  const numShelves = Math.max(2, Math.floor(wallLength / 4))
  const walls = shuffle<Wall>(['top', 'left', 'right', 'bottom'])
  for (let i = 0; i < numShelves; i++) {
    placeAlongWall(rect, occupied, shelvingType, walls[i % walls.length], placed)
  }

  // Reading chair in open space with lamp nearby
  const chairPos = placeRandom(rect, occupied, chairType, placed)
  if (chairPos && Math.random() < 0.7) {
    const lampType = pickType({ categories: ['decor'], maxW: 1, maxH: 1 }) ?? FurnitureType.LAMP
    placeNear(rect, occupied, lampType, chairPos.col, chairPos.row, 2, placed)
  }

  if (Math.random() < 0.6) placeInCorner(rect, occupied, accentType, placed)
}

function placeStorageRoom(rect: Rect, occupied: Set<string>, placed: PlacedFurniture[]): void {
  const storageType = pickType({ categories: ['storage'], maxW: 1 }) ?? FurnitureType.FILING_CABINET
  const shelfType = pickType({ categories: ['storage'] }) ?? FurnitureType.BOOKSHELF
  const elecType = pickType({ categories: ['electronics'], maxW: 1, maxH: 1 }) ?? FurnitureType.PRINTER

  // Storage units along walls (scales with perimeter)
  const perimeter = 2 * (rect.w + rect.h)
  const numCabinets = Math.max(2, Math.floor(perimeter / 6))
  const walls = shuffle<Wall>(['left', 'right', 'top', 'bottom'])
  for (let i = 0; i < numCabinets; i++) {
    placeAlongWall(rect, occupied, storageType, walls[i % walls.length], placed)
  }

  // Shelves along remaining wall space
  const numShelves = randInt(0, 2)
  for (let i = 0; i < numShelves; i++) {
    placeAlongAnyWall(rect, occupied, shelfType, placed)
  }

  // Electronics along wall
  if (Math.random() < 0.6) {
    placeAlongAnyWall(rect, occupied, elecType, placed)
  }
}

function placeLoungeRoom(rect: Rect, occupied: Set<string>, placed: PlacedFurniture[]): void {
  const rugType = pickType({ categories: ['decor'], backgroundTiles: true, maxW: rect.w, maxH: rect.h }) ?? FurnitureType.RUG
  const seatingType = pickType({ categories: ['chairs'], maxW: 3 }) ?? FurnitureType.COUCH
  const tableType = pickType({ categories: ['desks'], maxW: 1, maxH: 1 }) ?? FurnitureType.COFFEE_TABLE
  const treeType = pickType({ categories: ['plants'] })
    ?? pickType({ categories: ['decor'], maxW: 1, maxH: 2 })
    ?? FurnitureType.POTTED_TREE
  const plantType = pickType({ categories: ['plants'] })
    ?? pickType({ categories: ['decor'], maxW: 1, maxH: 1 })
    ?? FurnitureType.PLANT

  // Rug centered
  if (Math.random() < 0.6) placeCentered(rect, occupied, rugType, placed)

  // Seating along walls with tables nearby
  const numSeats = randInt(1, 2)
  for (let i = 0; i < numSeats; i++) {
    const seatPos = placeAlongAnyWall(rect, occupied, seatingType, placed)
    if (seatPos) {
      placeNear(rect, occupied, tableType, seatPos.col, seatPos.row, 2, placed)
    }
  }

  // Corner trees and plants
  if (Math.random() < 0.5) placeInCorner(rect, occupied, treeType, placed)
  const numPlants = randInt(0, 2)
  for (let i = 0; i < numPlants; i++) {
    placeInCorner(rect, occupied, plantType, placed)
  }
}

function placeManagerRoom(rect: Rect, occupied: Set<string>, placed: PlacedFurniture[]): void {
  const deskType = pickType({ categories: ['desks'], isDesk: true, maxW: rect.w, maxH: rect.h }) ?? FurnitureType.DESK
  const chairType = pickType({ categories: ['chairs'], maxW: 1, maxH: 1 }) ?? FurnitureType.CHAIR
  const shelfType = pickType({ categories: ['storage'] }) ?? FurnitureType.BOOKSHELF
  const accentType = pickType({ categories: ['plants', 'decor'], maxW: 1, maxH: 1 }) ?? FurnitureType.PLANT

  const deskFt = fp(deskType)
  if (!deskFt) return

  // Desk in back half (toward top wall, centered horizontally)
  const backRow = rect.y + Math.max(0, Math.floor((rect.h - deskFt.h) / 3))
  const centerCol = rect.x + Math.floor((rect.w - deskFt.w) / 2)
  const deskPos = placeNear(rect, occupied, deskType, centerCol, backRow, Math.max(rect.w, rect.h), placed)

  if (deskPos) {
    // Chairs in front of desk (footprint-adaptive)
    const numChairs = randInt(1, 2)
    const chairSpots: Pos[] = []
    for (let dc = 0; dc < deskFt.w; dc++) chairSpots.push({ col: deskPos.col + dc, row: deskPos.row + deskFt.h })
    chairSpots.push({ col: deskPos.col - 1, row: deskPos.row + deskFt.h - 1 })
    chairSpots.push({ col: deskPos.col + deskFt.w, row: deskPos.row + deskFt.h - 1 })

    let chairsPlaced = 0
    for (const spot of shuffle(chairSpots)) {
      if (chairsPlaced >= numChairs) break
      if (tryPlaceAt(spot.col, spot.row, chairType, rect, occupied, placed)) {
        chairsPlaced++
      }
    }
  }

  // Shelf along wall
  if (Math.random() < 0.6) placeAlongAnyWall(rect, occupied, shelfType, placed)

  // Corner accent + lamp
  if (Math.random() < 0.6) placeInCorner(rect, occupied, accentType, placed)
  if (Math.random() < 0.5) {
    const lampType = pickType({ categories: ['decor'], maxW: 1, maxH: 1 }) ?? FurnitureType.LAMP
    placeInCorner(rect, occupied, lampType, placed)
  }
}

// ── Main room placement dispatcher ───────────────────────────

function placeFurnitureInRoom(rect: Rect, roomType: RoomType): PlacedFurniture[] {
  const placed: PlacedFurniture[] = []
  const occupied = new Set<string>()

  switch (roomType) {
    case 'workspace': placeWorkspaceRoom(rect, occupied, placed); break
    case 'meeting':   placeMeetingRoom(rect, occupied, placed); break
    case 'kitchen':   placeKitchenRoom(rect, occupied, placed); break
    case 'library':   placeLibraryRoom(rect, occupied, placed); break
    case 'storage':   placeStorageRoom(rect, occupied, placed); break
    case 'lounge':    placeLoungeRoom(rect, occupied, placed); break
    case 'manager':   placeManagerRoom(rect, occupied, placed); break
  }

  return placed
}

/**
 * Place wall-mountable items on wall tiles adjacent to room interiors.
 */
function placeWallItems(
  rooms: Rect[],
  tiles: TileTypeVal[],
  cols: number,
  existingFurniture: PlacedFurniture[],
): PlacedFurniture[] {
  const items: PlacedFurniture[] = []
  const usedWalls = new Set<string>()

  // Mark existing furniture positions
  for (const f of existingFurniture) {
    const ft = fp(f.type)
    if (!ft) continue
    for (let dr = 0; dr < ft.h; dr++) {
      for (let dc = 0; dc < ft.w; dc++) {
        usedWalls.add(`${f.col + dc},${f.row + dr}`)
      }
    }
  }

  // Collect all wall-placeable item types from the active catalog
  const wallTypes = getActiveCatalog().filter(e => e.canPlaceOnWalls)
  if (wallTypes.length === 0) return items

  // For each room, consider top wall for wall-mounted items
  for (const room of rooms) {
    if (Math.random() > 0.5) continue // ~50% chance per room

    const numToPlace = randInt(1, 2)
    const wallRow = room.y - 1
    if (wallRow < 0) continue

    for (let n = 0; n < numToPlace; n++) {
      const entry = randChoice(wallTypes)
      const ft = fp(entry.type)
      if (!ft) continue

      // Find valid placement along top wall
      const maxStartCol = room.x + room.w - ft.w
      if (maxStartCol < room.x) continue
      const startCols = shuffle(Array.from({ length: maxStartCol - room.x + 1 }, (_, i) => room.x + i))

      for (const col of startCols) {
        // Check all tiles in the footprint are wall tiles and not used
        let valid = true
        for (let dc = 0; dc < ft.w; dc++) {
          const c = col + dc
          const idx = wallRow * cols + c
          if (tiles[idx] !== TileType.WALL || usedWalls.has(`${c},${wallRow}`)) {
            valid = false
            break
          }
        }
        if (!valid) continue

        const uid = `wi-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
        items.push({ uid, type: entry.type, col, row: wallRow })
        for (let dc = 0; dc < ft.w; dc++) {
          usedWalls.add(`${col + dc},${wallRow}`)
        }
        break
      }
    }
  }

  return items
}

/**
 * Generate a fully randomized office layout using BSP room partitioning.
 */
export function generateRandomLayout(width: number, height: number, numRooms: number): OfficeLayout {
  const cols = width
  const rows = height

  // Step 1: Fill with walls
  const tiles: TileTypeVal[] = new Array(cols * rows).fill(TileType.WALL)
  const tileColors: Array<FloorColor | null> = new Array(cols * rows).fill(null)

  // Step 2: Define interior rect (inside outer walls)
  const interior: Rect = { x: 1, y: 1, w: cols - 2, h: rows - 2 }

  // Fill interior with floor
  for (let r = interior.y; r < interior.y + interior.h; r++) {
    for (let c = interior.x; c < interior.x + interior.w; c++) {
      tiles[r * cols + c] = TileType.FLOOR_1
    }
  }

  // Step 3: BSP split to create rooms
  const numSplits = Math.max(0, numRooms - 1)
  const rooms = bspSplit(interior, numSplits)

  // Step 4: Place interior walls between rooms (with doorways)
  // Build a set of all wall positions from BSP splits
  const wallPositions = new Set<string>()

  // Find wall lines by looking at gaps between adjacent rooms
  const roomSet = new Map<string, number>() // tile → room index
  for (let ri = 0; ri < rooms.length; ri++) {
    const room = rooms[ri]
    for (let r = room.y; r < room.y + room.h; r++) {
      for (let c = room.x; c < room.x + room.w; c++) {
        roomSet.set(`${c},${r}`, ri)
      }
    }
  }

  // Any interior tile not in a room is a wall line
  for (let r = interior.y; r < interior.y + interior.h; r++) {
    for (let c = interior.x; c < interior.x + interior.w; c++) {
      if (!roomSet.has(`${c},${r}`)) {
        tiles[r * cols + c] = TileType.WALL
        tileColors[r * cols + c] = null
        wallPositions.add(`${c},${r}`)
      }
    }
  }

  // Step 5: Add doorways in interior walls
  // Find contiguous wall segments and punch 2-tile doorways
  const processedWalls = new Set<string>()

  for (const wallKey of wallPositions) {
    if (processedWalls.has(wallKey)) continue
    const [wc, wr] = wallKey.split(',').map(Number)

    // Find horizontal wall segments
    const hSegment: Array<{ c: number; r: number }> = []
    let sc = wc
    while (wallPositions.has(`${sc},${wr}`) && !processedWalls.has(`${sc},${wr}`)) {
      hSegment.push({ c: sc, r: wr })
      sc++
    }

    if (hSegment.length >= 3) {
      // It's a horizontal wall segment — add a doorway
      // Check that it actually separates two rooms (tiles above and below are floor)
      const doorStart = randInt(1, Math.max(1, hSegment.length - 2))
      const doorLen = Math.min(2, hSegment.length - 1)
      for (let di = 0; di < doorLen; di++) {
        const d = hSegment[doorStart + di]
        if (!d) continue
        const aboveIdx = (d.r - 1) * cols + d.c
        const belowIdx = (d.r + 1) * cols + d.c
        const hasFloorAbove = d.r > 0 && tiles[aboveIdx] !== TileType.WALL
        const hasFloorBelow = d.r < rows - 1 && tiles[belowIdx] !== TileType.WALL
        if (hasFloorAbove && hasFloorBelow) {
          tiles[d.r * cols + d.c] = TileType.FLOOR_4
          tileColors[d.r * cols + d.c] = { h: 35, s: 25, b: 10, c: 0 } // doorway tan
        }
      }
      for (const seg of hSegment) processedWalls.add(`${seg.c},${seg.r}`)
      continue
    }

    // Find vertical wall segments
    const vSegment: Array<{ c: number; r: number }> = []
    let sr = wr
    while (wallPositions.has(`${wc},${sr}`) && !processedWalls.has(`${wc},${sr}`)) {
      vSegment.push({ c: wc, r: sr })
      sr++
    }

    if (vSegment.length >= 3) {
      const doorStart = randInt(1, Math.max(1, vSegment.length - 2))
      const doorLen = Math.min(2, vSegment.length - 1)
      for (let di = 0; di < doorLen; di++) {
        const d = vSegment[doorStart + di]
        if (!d) continue
        const leftIdx = d.r * cols + (d.c - 1)
        const rightIdx = d.r * cols + (d.c + 1)
        const hasFloorLeft = d.c > 0 && tiles[leftIdx] !== TileType.WALL
        const hasFloorRight = d.c < cols - 1 && tiles[rightIdx] !== TileType.WALL
        if (hasFloorLeft && hasFloorRight) {
          tiles[d.r * cols + d.c] = TileType.FLOOR_4
          tileColors[d.r * cols + d.c] = { h: 35, s: 25, b: 10, c: 0 }
        }
      }
      for (const seg of vSegment) processedWalls.add(`${seg.c},${seg.r}`)
    }
  }

  // Step 6: Assign room types and floor patterns/colors
  const usedPalettes = new Set<number>()
  const roomTypes: RoomType[] = []

  for (const room of rooms) {
    const roomType = assignRoomType(room.w, room.h)
    roomTypes.push(roomType)

    // Pick a floor pattern (1-7)
    const floorPattern = randInt(1, 7) as TileTypeVal

    // Pick a color palette (avoid repeats when possible)
    let paletteIdx: number
    const available = ROOM_PALETTES.map((_, i) => i).filter((i) => !usedPalettes.has(i))
    if (available.length > 0) {
      paletteIdx = randChoice(available)
    } else {
      paletteIdx = randInt(0, ROOM_PALETTES.length - 1)
    }
    usedPalettes.add(paletteIdx)
    const color = ROOM_PALETTES[paletteIdx]

    // Fill room with pattern and color
    for (let r = room.y; r < room.y + room.h; r++) {
      for (let c = room.x; c < room.x + room.w; c++) {
        const idx = r * cols + c
        if (tiles[idx] !== TileType.WALL) {
          tiles[idx] = floorPattern
          tileColors[idx] = { ...color }
        }
      }
    }
  }

  // Step 7: Place furniture in each room
  let allFurniture: PlacedFurniture[] = []
  for (let ri = 0; ri < rooms.length; ri++) {
    const roomFurniture = placeFurnitureInRoom(rooms[ri], roomTypes[ri])
    allFurniture = allFurniture.concat(roomFurniture)
  }

  // Step 8: Place wall items
  const wallItems = placeWallItems(rooms, tiles, cols, allFurniture)
  allFurniture = allFurniture.concat(wallItems)

  return {
    version: 1,
    cols,
    rows,
    tiles,
    tileColors,
    furniture: allFurniture,
  }
}
