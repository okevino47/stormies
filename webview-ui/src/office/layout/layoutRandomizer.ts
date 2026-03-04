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

/** Scatter small surface items (laptops, phones, etc.) onto desk tiles. */
function placeSurfaceItems(
  rect: Rect, placed: PlacedFurniture[], coverage: number,
): void {
  const deskTiles: Pos[] = []
  for (const item of placed) {
    const entry = getCatalogEntry(item.type)
    if (!entry || !entry.isDesk) continue
    if (item.col < rect.x || item.col >= rect.x + rect.w) continue
    if (item.row < rect.y || item.row >= rect.y + rect.h) continue
    for (let dr = 0; dr < entry.footprintH; dr++) {
      for (let dc = 0; dc < entry.footprintW; dc++) {
        deskTiles.push({ col: item.col + dc, row: item.row + dr })
      }
    }
  }
  if (deskTiles.length === 0) return
  const surfaceTypes = getActiveCatalog().filter(e => e.canPlaceOnSurfaces && e.footprintW === 1 && e.footprintH === 1)
  if (surfaceTypes.length === 0) return
  for (const tile of shuffle(deskTiles)) {
    if (Math.random() > coverage) continue
    const entry = randChoice(surfaceTypes)
    placed.push({ uid: makeUid(), type: entry.type, col: tile.col, row: tile.row })
  }
}

/** Post-processing: fill empty corners and wall-adjacent tiles with small items. */
function fillGaps(
  rooms: Rect[], tiles: TileTypeVal[], cols: number,
  existingFurniture: PlacedFurniture[],
): PlacedFurniture[] {
  const items: PlacedFurniture[] = []
  const occupied = new Set<string>()
  for (const f of existingFurniture) {
    const ft = fp(f.type)
    if (!ft) continue
    for (let dr = 0; dr < ft.h; dr++) {
      for (let dc = 0; dc < ft.w; dc++) {
        occupied.add(`${f.col + dc},${f.row + dr}`)
      }
    }
  }
  const fillerTypes = getActiveCatalog().filter(
    e => e.footprintW === 1 && e.footprintH === 1 && !e.canPlaceOnWalls && !e.canPlaceOnSurfaces &&
      ['plants', 'decor', 'misc'].includes(e.category)
  )
  if (fillerTypes.length === 0) return items
  for (const room of rooms) {
    const corners: Pos[] = [
      { col: room.x, row: room.y },
      { col: room.x + room.w - 1, row: room.y },
      { col: room.x, row: room.y + room.h - 1 },
      { col: room.x + room.w - 1, row: room.y + room.h - 1 },
    ]
    for (const corner of corners) {
      if (Math.random() > 0.7) continue
      const key = `${corner.col},${corner.row}`
      if (occupied.has(key)) continue
      const idx = corner.row * cols + corner.col
      if (tiles[idx] === TileType.WALL) continue
      const entry = randChoice(fillerTypes)
      items.push({ uid: makeUid(), type: entry.type, col: corner.col, row: corner.row })
      occupied.add(key)
    }
    for (let c = room.x; c < room.x + room.w; c++) {
      for (let r = room.y; r < room.y + room.h; r++) {
        const key = `${c},${r}`
        if (occupied.has(key)) continue
        const idx = r * cols + c
        if (tiles[idx] === TileType.WALL) continue
        const isWallAdjacent =
          (c === room.x || c === room.x + room.w - 1 || r === room.y || r === room.y + room.h - 1)
        if (!isWallAdjacent) continue
        if (Math.random() > 0.25) continue
        const entry = randChoice(fillerTypes)
        items.push({ uid: makeUid(), type: entry.type, col: c, row: r })
        occupied.add(key)
      }
    }
  }
  return items
}

// ── Per-room-type placement ──────────────────────────────────

function placeWorkspaceRoom(rect: Rect, occupied: Set<string>, placed: PlacedFurniture[]): void {
  const area = rect.w * rect.h
  const numWorkstations = Math.max(2, Math.floor(area / 8))

  const deskType = pickType({ categories: ['desks'], isDesk: true, maxW: rect.w, maxH: rect.h }) ?? FurnitureType.DESK
  const chairType = pickType({ categories: ['chairs'], maxW: 1, maxH: 1 }) ?? FurnitureType.CHAIR
  const pcType = pickType({ categories: ['electronics'], maxW: 1, maxH: 1 }) ?? FurnitureType.PC

  for (let i = 0; i < numWorkstations; i++) {
    placeWorkstation(rect, occupied, placed, deskType, chairType, pcType)
  }

  // Printers/filing cabinets along walls
  const numWallItems = randInt(1, 2)
  for (let i = 0; i < numWallItems; i++) {
    const type = Math.random() < 0.5
      ? (pickType({ categories: ['electronics'], maxW: 1, maxH: 1 }) ?? FurnitureType.PRINTER)
      : (pickType({ categories: ['storage'], maxW: 1, maxH: 1 }) ?? FurnitureType.FILING_CABINET)
    placeAlongAnyWall(rect, occupied, type, placed)
  }

  // Plants in corners
  const numPlants = randInt(1, 2)
  for (let i = 0; i < numPlants; i++) {
    const plantType = pickType({ categories: ['plants', 'decor'], maxW: 1 }) ?? FurnitureType.PLANT
    placeInCorner(rect, occupied, plantType, placed)
  }

  // Trash can
  const trashType = pickType({ categories: ['misc'], maxW: 1, maxH: 1 }) ?? FurnitureType.COOLER
  placeAlongAnyWall(rect, occupied, trashType, placed)

  placeSurfaceItems(rect, placed, 0.4)
}

function placeMeetingRoom(rect: Rect, occupied: Set<string>, placed: PlacedFurniture[]): void {
  // Rug under meeting area (40%)
  if (Math.random() < 0.4) {
    const rugType = pickType({ categories: ['decor'], backgroundTiles: true, maxW: rect.w, maxH: rect.h }) ?? FurnitureType.RUG
    placeCentered(rect, occupied, rugType, placed)
  }

  // Conference table centered (always)
  const tableType = pickType({ categories: ['desks'], maxW: rect.w, maxH: rect.h }) ?? FurnitureType.DESK
  const chairType = pickType({ categories: ['chairs'], maxW: 1, maxH: 1 }) ?? FurnitureType.CHAIR

  const deskPos = placeCentered(rect, occupied, tableType, placed)
  if (deskPos) {
    const deskFt = fp(tableType)
    if (deskFt) {
      // Chairs on ALL sides (up to 6)
      const numChairs = Math.min(6, 2 * (deskFt.w + deskFt.h))
      const chairSpots: Pos[] = []
      for (let dc = 0; dc < deskFt.w; dc++) chairSpots.push({ col: deskPos.col + dc, row: deskPos.row + deskFt.h })
      for (let dc = 0; dc < deskFt.w; dc++) chairSpots.push({ col: deskPos.col + dc, row: deskPos.row - 1 })
      for (let dr = 0; dr < deskFt.h; dr++) chairSpots.push({ col: deskPos.col - 1, row: deskPos.row + dr })
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

  // ALWAYS whiteboard or mounted-tv on top wall
  const wallFeatureType = pickType({ categories: ['decor'], maxW: 2, maxH: 1 }) ?? FurnitureType.WHITEBOARD
  const featurePos = placeAlongWall(rect, occupied, wallFeatureType, 'top', placed)

  // Projector/electronics near wall feature
  if (featurePos) {
    const projType = pickType({ categories: ['electronics'], maxW: 1, maxH: 1 }) ?? FurnitureType.PC
    placeNear(rect, occupied, projType, featurePos.col, featurePos.row + 1, 2, placed)
  }

  // Plants in corners
  for (let i = 0; i < 2; i++) {
    const plantType = pickType({ categories: ['plants', 'decor'], maxW: 1 }) ?? FurnitureType.PLANT
    placeInCorner(rect, occupied, plantType, placed)
  }

  placeSurfaceItems(rect, placed, 0.3)
}

function placeKitchenRoom(rect: Rect, occupied: Set<string>, placed: PlacedFurniture[]): void {
  // Appliance wall — group fridge, counter, coffee-machine along one wall
  const applianceWall = randChoice<Wall>(['top', 'left', 'right'])
  const fridgeType = pickType({ categories: ['misc'], maxW: 1, maxH: 1 }) ?? FurnitureType.COOLER
  const counterType = pickType({ categories: ['desks'], maxW: 1, maxH: 1 }) ?? FurnitureType.COFFEE_TABLE
  const coffeeType = pickType({ categories: ['misc'], maxW: 1, maxH: 1 }) ?? FurnitureType.COFFEE_MACHINE

  const fridgePos = placeAlongWall(rect, occupied, fridgeType, applianceWall, placed)
  if (fridgePos) {
    placeNear(rect, occupied, counterType, fridgePos.col + 1, fridgePos.row, 2, placed)
    placeNear(rect, occupied, coffeeType, fridgePos.col + 2, fridgePos.row, 2, placed)
  } else {
    placeAlongAnyWall(rect, occupied, fridgeType, placed)
    placeAlongAnyWall(rect, occupied, counterType, placed)
    placeAlongAnyWall(rect, occupied, coffeeType, placed)
  }

  // Trash can nearby
  const trashType = pickType({ categories: ['misc'], maxW: 1, maxH: 1 }) ?? FurnitureType.COOLER
  if (fridgePos) {
    placeNear(rect, occupied, trashType, fridgePos.col, fridgePos.row + 1, 3, placed)
  } else {
    placeAlongAnyWall(rect, occupied, trashType, placed)
  }

  // Eating area — table + chairs
  const tableType = pickType({ categories: ['desks'], maxW: 1, maxH: 1 }) ?? FurnitureType.COFFEE_TABLE
  const chairType = pickType({ categories: ['chairs'], maxW: 1, maxH: 1 }) ?? FurnitureType.CHAIR
  const tablePos = placeCentered(rect, occupied, tableType, placed)
  if (tablePos) {
    const numChairs = randInt(2, 4)
    const spots: Pos[] = [
      { col: tablePos.col + 1, row: tablePos.row },
      { col: tablePos.col - 1, row: tablePos.row },
      { col: tablePos.col, row: tablePos.row + 1 },
      { col: tablePos.col, row: tablePos.row - 1 },
    ]
    let seatsPlaced = 0
    for (const spot of shuffle(spots)) {
      if (seatsPlaced >= numChairs) break
      if (tryPlaceAt(spot.col, spot.row, chairType, rect, occupied, placed)) seatsPlaced++
    }
  }

  // Extras
  if (Math.random() < 0.5) {
    const vendType = pickType({ categories: ['misc'], maxW: 1 }) ?? FurnitureType.COOLER
    placeAlongAnyWall(rect, occupied, vendType, placed)
  }
  const coolerType = pickType({ categories: ['misc'], maxW: 1, maxH: 1 }) ?? FurnitureType.COOLER
  placeAlongAnyWall(rect, occupied, coolerType, placed)

  // Plant in corner
  const plantType = pickType({ categories: ['plants', 'decor'], maxW: 1 }) ?? FurnitureType.PLANT
  placeInCorner(rect, occupied, plantType, placed)

  placeSurfaceItems(rect, placed, 0.3)
}

function placeLibraryRoom(rect: Rect, occupied: Set<string>, placed: PlacedFurniture[]): void {
  const shelvingType = pickType({ categories: ['storage'], maxH: rect.h }) ?? FurnitureType.BOOKSHELF
  const chairType = pickType({ categories: ['chairs'], maxW: 1, maxH: 1 }) ?? FurnitureType.CHAIR
  const lampType = pickType({ categories: ['decor'], maxW: 1, maxH: 1 }) ?? FurnitureType.LAMP
  const tableType = pickType({ categories: ['desks'], maxW: 1, maxH: 1 }) ?? FurnitureType.COFFEE_TABLE

  // Shelving lining 2-3 walls (denser: perimeter/3)
  const wallLength = 2 * (rect.w + rect.h)
  const numShelves = Math.max(3, Math.floor(wallLength / 3))
  const walls = shuffle<Wall>(['top', 'left', 'right'])
  for (let i = 0; i < numShelves; i++) {
    placeAlongWall(rect, occupied, shelvingType, walls[i % walls.length], placed)
  }

  // Rug under reading area (60%)
  if (Math.random() < 0.6) {
    const rugType = pickType({ categories: ['decor'], backgroundTiles: true, maxW: rect.w, maxH: rect.h }) ?? FurnitureType.RUG
    placeCentered(rect, occupied, rugType, placed)
  }

  // 2-3 reading chairs with lamps nearby
  const numChairs = randInt(2, 3)
  for (let i = 0; i < numChairs; i++) {
    const chairPos = placeRandom(rect, occupied, chairType, placed)
    if (chairPos) {
      placeNear(rect, occupied, lampType, chairPos.col + 1, chairPos.row, 2, placed)
    }
  }

  // Small table near chairs
  placeRandom(rect, occupied, tableType, placed)

  // Accent pieces
  const accentType = pickType({ categories: ['decor', 'plants'], maxW: 1, maxH: 1 }) ?? FurnitureType.PLANT
  placeInCorner(rect, occupied, accentType, placed)
  if (Math.random() < 0.5) {
    const accent2 = pickType({ categories: ['decor'], maxW: 1, maxH: 1 }) ?? FurnitureType.LAMP
    placeInCorner(rect, occupied, accent2, placed)
  }

  placeSurfaceItems(rect, placed, 0.3)
}

function placeStorageRoom(rect: Rect, occupied: Set<string>, placed: PlacedFurniture[]): void {
  // Storage units along walls (denser: perimeter/4, mixed types)
  const perimeter = 2 * (rect.w + rect.h)
  const numCabinets = Math.max(3, Math.floor(perimeter / 4))
  const walls = shuffle<Wall>(['left', 'right', 'top', 'bottom'])
  for (let i = 0; i < numCabinets; i++) {
    const storageType = Math.random() < 0.5
      ? (pickType({ categories: ['storage'], maxW: 1 }) ?? FurnitureType.FILING_CABINET)
      : (pickType({ categories: ['storage'] }) ?? FurnitureType.BOOKSHELF)
    placeAlongWall(rect, occupied, storageType, walls[i % walls.length], placed)
  }

  // Server rack (30% chance)
  if (Math.random() < 0.3) {
    const serverType = pickType({ categories: ['electronics'], maxW: 1 }) ?? FurnitureType.PC
    placeAlongAnyWall(rect, occupied, serverType, placed)
  }

  // Printer area
  const printerType = pickType({ categories: ['electronics'], maxW: 1, maxH: 1 }) ?? FurnitureType.PRINTER
  placeAlongAnyWall(rect, occupied, printerType, placed)

  // Fire extinguisher / misc in corner
  const miscType = pickType({ categories: ['misc', 'decor'], maxW: 1, maxH: 1 }) ?? FurnitureType.COOLER
  placeInCorner(rect, occupied, miscType, placed)
}

function placeLoungeRoom(rect: Rect, occupied: Set<string>, placed: PlacedFurniture[]): void {
  // ALWAYS rug centered
  const rugType = pickType({ categories: ['decor'], backgroundTiles: true, maxW: rect.w, maxH: rect.h }) ?? FurnitureType.RUG
  placeCentered(rect, occupied, rugType, placed)

  // Entertainment zone: TV on top wall
  const tvType = pickType({ categories: ['electronics', 'decor'], maxW: 2, maxH: 1 }) ?? FurnitureType.WHITEBOARD
  const tvPos = placeAlongWall(rect, occupied, tvType, 'top', placed)

  // Sofa facing TV, 2-3 tiles away
  const sofaType = pickType({ categories: ['chairs'], maxW: 3 }) ?? FurnitureType.COUCH
  let sofaPos: Pos | null = null
  if (tvPos) {
    sofaPos = placeNear(rect, occupied, sofaType, tvPos.col, tvPos.row + randInt(2, 3), 3, placed)
  }
  if (!sofaPos) {
    sofaPos = placeAlongWall(rect, occupied, sofaType, 'bottom', placed)
      ?? placeAlongAnyWall(rect, occupied, sofaType, placed)
  }

  // Coffee table between TV and sofa
  const tableType = pickType({ categories: ['desks'], maxW: 1, maxH: 1 }) ?? FurnitureType.COFFEE_TABLE
  if (sofaPos && tvPos) {
    const midRow = Math.floor((tvPos.row + sofaPos.row) / 2)
    placeNear(rect, occupied, tableType, sofaPos.col, midRow, 2, placed)
  } else if (sofaPos) {
    placeNear(rect, occupied, tableType, sofaPos.col, sofaPos.row - 1, 2, placed)
  }

  // 1-2 armchairs/bean-bags flanking sofa
  const chairType = pickType({ categories: ['chairs'], maxW: 1, maxH: 1 }) ?? FurnitureType.CHAIR
  const numChairs = randInt(1, 2)
  if (sofaPos) {
    for (let i = 0; i < numChairs; i++) {
      placeNear(rect, occupied, chairType, sofaPos.col + (i === 0 ? -1 : 2), sofaPos.row, 2, placed)
    }
  }

  // Lamp near seating
  const lampType = pickType({ categories: ['decor'], maxW: 1, maxH: 1 }) ?? FurnitureType.LAMP
  if (sofaPos) {
    placeNear(rect, occupied, lampType, sofaPos.col - 1, sofaPos.row, 3, placed)
  } else {
    placeInCorner(rect, occupied, lampType, placed)
  }

  // 2-3 plants (potted tree in corner, smaller plants elsewhere)
  const numPlants = randInt(2, 3)
  for (let i = 0; i < numPlants; i++) {
    const pType = i === 0
      ? (pickType({ categories: ['plants', 'decor'], maxW: 1, maxH: 2 }) ?? FurnitureType.POTTED_TREE)
      : (pickType({ categories: ['plants', 'decor'], maxW: 1, maxH: 1 }) ?? FurnitureType.PLANT)
    placeInCorner(rect, occupied, pType, placed)
  }

  // Extras: bookshelf (50%), arcade (20%)
  if (Math.random() < 0.5) {
    const shelfType = pickType({ categories: ['storage'] }) ?? FurnitureType.BOOKSHELF
    placeAlongAnyWall(rect, occupied, shelfType, placed)
  }
  if (Math.random() < 0.2) {
    const arcadeType = pickType({ categories: ['electronics', 'misc'], maxW: 1 }) ?? FurnitureType.PC
    placeAlongAnyWall(rect, occupied, arcadeType, placed)
  }

  placeSurfaceItems(rect, placed, 0.2)
}

function placeManagerRoom(rect: Rect, occupied: Set<string>, placed: PlacedFurniture[]): void {
  const deskType = pickType({ categories: ['desks'], isDesk: true, maxW: rect.w, maxH: rect.h }) ?? FurnitureType.DESK
  const chairType = pickType({ categories: ['chairs'], maxW: 1, maxH: 1 }) ?? FurnitureType.CHAIR

  const deskFt = fp(deskType)
  if (!deskFt) return

  // Rug under desk area (40%)
  if (Math.random() < 0.4) {
    const rugType = pickType({ categories: ['decor'], backgroundTiles: true, maxW: rect.w, maxH: rect.h }) ?? FurnitureType.RUG
    placeCentered(rect, occupied, rugType, placed)
  }

  // Desk in back third (toward top wall, centered horizontally)
  const backRow = rect.y + Math.max(0, Math.floor((rect.h - deskFt.h) / 3))
  const centerCol = rect.x + Math.floor((rect.w - deskFt.w) / 2)
  const deskPos = placeNear(rect, occupied, deskType, centerCol, backRow, Math.max(rect.w, rect.h), placed)

  if (deskPos) {
    // Executive chair behind desk (toward top wall)
    const behindPos = tryPlaceAt(deskPos.col, deskPos.row - 1, chairType, rect, occupied, placed)
    if (!behindPos) placeNear(rect, occupied, chairType, deskPos.col, deskPos.row - 1, 2, placed)

    // 2 visitor chairs in front of desk
    const visitorSpots: Pos[] = []
    for (let dc = 0; dc < deskFt.w; dc++) visitorSpots.push({ col: deskPos.col + dc, row: deskPos.row + deskFt.h })
    visitorSpots.push({ col: deskPos.col - 1, row: deskPos.row + deskFt.h })
    visitorSpots.push({ col: deskPos.col + deskFt.w, row: deskPos.row + deskFt.h })

    let chairsPlaced = 0
    for (const spot of shuffle(visitorSpots)) {
      if (chairsPlaced >= 2) break
      if (tryPlaceAt(spot.col, spot.row, chairType, rect, occupied, placed)) {
        chairsPlaced++
      }
    }

    // PC near desk
    const pcType = pickType({ categories: ['electronics'], maxW: 1, maxH: 1 }) ?? FurnitureType.PC
    placeNear(rect, occupied, pcType, deskPos.col + deskFt.w, deskPos.row, 2, placed)

    // Lamp near desk
    const lampType = pickType({ categories: ['decor'], maxW: 1, maxH: 1 }) ?? FurnitureType.LAMP
    placeNear(rect, occupied, lampType, deskPos.col - 1, deskPos.row, 3, placed)
  }

  // Bookshelf + filing cabinet along side wall
  const shelfType = pickType({ categories: ['storage'] }) ?? FurnitureType.BOOKSHELF
  placeAlongWall(rect, occupied, shelfType, Math.random() < 0.5 ? 'left' : 'right', placed)
  const cabinetType = pickType({ categories: ['storage'], maxW: 1, maxH: 1 }) ?? FurnitureType.FILING_CABINET
  placeAlongAnyWall(rect, occupied, cabinetType, placed)

  // Potted tree in 1-2 corners
  const numTrees = randInt(1, 2)
  for (let i = 0; i < numTrees; i++) {
    const treeType = pickType({ categories: ['plants', 'decor'], maxW: 1 }) ?? FurnitureType.POTTED_TREE
    placeInCorner(rect, occupied, treeType, placed)
  }

  // Wall art
  if (Math.random() < 0.5) {
    const artType = pickType({ categories: ['decor'], maxW: 1, maxH: 1 }) ?? FurnitureType.PLANT
    placeAlongWall(rect, occupied, artType, 'top', placed)
  }

  placeSurfaceItems(rect, placed, 0.5)
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
 * Processes every room's top wall plus left/right walls for 1-wide items.
 */
function placeWallItems(
  rooms: Rect[],
  tiles: TileTypeVal[],
  cols: number,
  existingFurniture: PlacedFurniture[],
  _roomTypes: RoomType[],
): PlacedFurniture[] {
  const items: PlacedFurniture[] = []
  const usedWalls = new Set<string>()
  const totalRows = Math.floor(tiles.length / cols)

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

  const wallTypes = getActiveCatalog().filter(e => e.canPlaceOnWalls)
  if (wallTypes.length === 0) return items

  const placeOnWallRow = (wallRow: number, startCol: number, endCol: number, maxItems: number) => {
    if (wallRow < 0 || wallRow >= totalRows) return
    for (let n = 0; n < maxItems; n++) {
      const entry = randChoice(wallTypes)
      const ft = fp(entry.type)
      if (!ft) continue
      const maxStartCol = endCol - ft.w
      if (maxStartCol < startCol) continue
      const startCols = shuffle(Array.from({ length: maxStartCol - startCol + 1 }, (_, i) => startCol + i))
      for (const col of startCols) {
        let valid = true
        for (let dc = 0; dc < ft.w; dc++) {
          const c = col + dc
          const idx = wallRow * cols + c
          if (idx < 0 || idx >= tiles.length || tiles[idx] !== TileType.WALL || usedWalls.has(`${c},${wallRow}`)) {
            valid = false
            break
          }
        }
        if (!valid) continue
        items.push({ uid: `wi-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, type: entry.type, col, row: wallRow })
        for (let dc = 0; dc < ft.w; dc++) {
          usedWalls.add(`${col + dc},${wallRow}`)
        }
        break
      }
    }
  }

  const oneWideWallTypes = wallTypes.filter(e => (fp(e.type)?.w ?? 0) === 1)

  // Process every room (no skip chance)
  for (const room of rooms) {
    // Top wall — higher density: max(2, floor(wallLength / 3))
    const topWallRow = room.y - 1
    const numTopItems = Math.max(2, Math.floor(room.w / 3))
    placeOnWallRow(topWallRow, room.x, room.x + room.w, numTopItems)

    // Left wall with 1-wide items
    if (oneWideWallTypes.length > 0) {
      const leftWallCol = room.x - 1
      if (leftWallCol >= 0) {
        for (let r = room.y; r < room.y + room.h; r++) {
          if (Math.random() > 0.3) continue
          const idx = r * cols + leftWallCol
          if (idx < 0 || idx >= tiles.length || tiles[idx] !== TileType.WALL) continue
          if (usedWalls.has(`${leftWallCol},${r}`)) continue
          const entry = randChoice(oneWideWallTypes)
          items.push({ uid: `wi-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, type: entry.type, col: leftWallCol, row: r })
          usedWalls.add(`${leftWallCol},${r}`)
        }
      }

      // Right wall with 1-wide items
      const rightWallCol = room.x + room.w
      if (rightWallCol < cols) {
        for (let r = room.y; r < room.y + room.h; r++) {
          if (Math.random() > 0.3) continue
          const idx = r * cols + rightWallCol
          if (idx < 0 || idx >= tiles.length || tiles[idx] !== TileType.WALL) continue
          if (usedWalls.has(`${rightWallCol},${r}`)) continue
          const entry = randChoice(oneWideWallTypes)
          items.push({ uid: `wi-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, type: entry.type, col: rightWallCol, row: r })
          usedWalls.add(`${rightWallCol},${r}`)
        }
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
  const wallItems = placeWallItems(rooms, tiles, cols, allFurniture, roomTypes)
  allFurniture = allFurniture.concat(wallItems)

  // Step 9: Fill gaps — post-processing pass for small filler items
  const gapItems = fillGaps(rooms, tiles, cols, allFurniture)
  allFurniture = allFurniture.concat(gapItems)

  return {
    version: 1,
    cols,
    rows,
    tiles,
    tileColors,
    furniture: allFurniture,
  }
}
