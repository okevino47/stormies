import { TileType, FurnitureType } from '../types.js'
import type { TileType as TileTypeVal, OfficeLayout, PlacedFurniture, FloorColor } from '../types.js'

// ── Room types & furniture recipes ───────────────────────────

type RoomType = 'workspace' | 'meeting' | 'kitchen' | 'library' | 'storage' | 'lounge' | 'manager'

interface RoomTypeDef {
  weight: number
  minW: number
  minH: number
  furniture: Array<{ type: string; count: number | [number, number]; wallOnly?: boolean; cornerOnly?: boolean }>
}

const ROOM_TYPES: Record<RoomType, RoomTypeDef> = {
  workspace: {
    weight: 30,
    minW: 5, minH: 5,
    furniture: [
      { type: FurnitureType.DESK, count: [1, 3] },
      { type: FurnitureType.CHAIR, count: [2, 6] },
      { type: FurnitureType.PC, count: [1, 2] },
      { type: FurnitureType.LAMP, count: [0, 1] },
    ],
  },
  meeting: {
    weight: 15,
    minW: 5, minH: 5,
    furniture: [
      { type: FurnitureType.DESK, count: 1 },
      { type: FurnitureType.CHAIR, count: [3, 6] },
      { type: FurnitureType.WHITEBOARD, count: [0, 1] },
    ],
  },
  kitchen: {
    weight: 10,
    minW: 4, minH: 4,
    furniture: [
      { type: FurnitureType.COFFEE_MACHINE, count: 1 },
      { type: FurnitureType.COFFEE_TABLE, count: [1, 2] },
      { type: FurnitureType.COUCH, count: [0, 1] },
      { type: FurnitureType.COOLER, count: 1 },
    ],
  },
  library: {
    weight: 10,
    minW: 4, minH: 4,
    furniture: [
      { type: FurnitureType.BOOKSHELF, count: [2, 4] },
      { type: FurnitureType.CHAIR, count: [1, 2] },
      { type: FurnitureType.LAMP, count: [0, 1] },
      { type: FurnitureType.PLANT, count: [0, 1] },
    ],
  },
  storage: {
    weight: 10,
    minW: 3, minH: 3,
    furniture: [
      { type: FurnitureType.FILING_CABINET, count: [2, 4] },
      { type: FurnitureType.PRINTER, count: [0, 1] },
      { type: FurnitureType.BOOKSHELF, count: [0, 2] },
    ],
  },
  lounge: {
    weight: 15,
    minW: 5, minH: 5,
    furniture: [
      { type: FurnitureType.COUCH, count: [1, 2] },
      { type: FurnitureType.RUG, count: [0, 1] },
      { type: FurnitureType.COFFEE_TABLE, count: [1, 2] },
      { type: FurnitureType.POTTED_TREE, count: [0, 1] },
      { type: FurnitureType.PLANT, count: [0, 2] },
    ],
  },
  manager: {
    weight: 10,
    minW: 4, minH: 4,
    furniture: [
      { type: FurnitureType.DESK, count: 1 },
      { type: FurnitureType.CHAIR, count: [1, 2] },
      { type: FurnitureType.BOOKSHELF, count: [0, 1] },
      { type: FurnitureType.PLANT, count: [0, 1] },
      { type: FurnitureType.LAMP, count: [0, 1] },
    ],
  },
}

// ── Furniture footprint lookup ───────────────────────────────

const FOOTPRINTS: Record<string, { w: number; h: number }> = {
  [FurnitureType.DESK]: { w: 2, h: 2 },
  [FurnitureType.BOOKSHELF]: { w: 1, h: 2 },
  [FurnitureType.PLANT]: { w: 1, h: 1 },
  [FurnitureType.COOLER]: { w: 1, h: 1 },
  [FurnitureType.WHITEBOARD]: { w: 2, h: 1 },
  [FurnitureType.CHAIR]: { w: 1, h: 1 },
  [FurnitureType.PC]: { w: 1, h: 1 },
  [FurnitureType.LAMP]: { w: 1, h: 1 },
  [FurnitureType.COUCH]: { w: 2, h: 1 },
  [FurnitureType.COFFEE_TABLE]: { w: 1, h: 1 },
  [FurnitureType.FILING_CABINET]: { w: 1, h: 1 },
  [FurnitureType.PRINTER]: { w: 1, h: 1 },
  [FurnitureType.COFFEE_MACHINE]: { w: 1, h: 1 },
  [FurnitureType.POTTED_TREE]: { w: 1, h: 2 },
  [FurnitureType.RUG]: { w: 2, h: 2 },
  [FurnitureType.WALL_CLOCK]: { w: 1, h: 1 },
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

/**
 * Try to place furniture in the room. Returns the placed items.
 */
function placeFurnitureInRoom(
  rect: Rect,
  roomType: RoomType,
): PlacedFurniture[] {
  const def = ROOM_TYPES[roomType]
  const placed: PlacedFurniture[] = []
  const occupied = new Set<string>()

  for (const recipe of def.furniture) {
    const countVal = Array.isArray(recipe.count)
      ? randInt(recipe.count[0], recipe.count[1])
      : recipe.count
    const fp = FOOTPRINTS[recipe.type]
    if (!fp) continue

    for (let i = 0; i < countVal; i++) {
      // Try random positions within the room
      let didPlace = false
      for (let attempt = 0; attempt < 30; attempt++) {
        const col = randInt(rect.x, rect.x + rect.w - fp.w)
        const row = randInt(rect.y, rect.y + rect.h - fp.h)
        if (canPlace(col, row, fp.w, fp.h, rect, occupied)) {
          const uid = `r-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
          placed.push({ uid, type: recipe.type, col, row })
          // Mark tiles as occupied
          for (let dr = 0; dr < fp.h; dr++) {
            for (let dc = 0; dc < fp.w; dc++) {
              occupied.add(`${col + dc},${row + dr}`)
            }
          }
          didPlace = true
          break
        }
      }
      if (!didPlace) break // can't fit more of this type
    }
  }

  return placed
}

/**
 * Place wall clocks on wall tiles adjacent to room interiors.
 */
function placeWallClocks(
  rooms: Rect[],
  tiles: TileTypeVal[],
  cols: number,
  existingFurniture: PlacedFurniture[],
): PlacedFurniture[] {
  const clocks: PlacedFurniture[] = []
  const usedWalls = new Set<string>()

  // Mark existing furniture positions
  for (const f of existingFurniture) {
    const fp = FOOTPRINTS[f.type]
    if (!fp) continue
    for (let dr = 0; dr < fp.h; dr++) {
      for (let dc = 0; dc < fp.w; dc++) {
        usedWalls.add(`${f.col + dc},${f.row + dr}`)
      }
    }
  }

  // For each room, consider top wall for clocks
  for (const room of rooms) {
    if (Math.random() > 0.5) continue // ~50% chance per room
    const wallRow = room.y - 1
    if (wallRow < 0) continue

    // Pick a random column along the top wall
    const col = randInt(room.x, room.x + room.w - 1)
    const idx = wallRow * cols + col
    if (tiles[idx] !== TileType.WALL) continue
    if (usedWalls.has(`${col},${wallRow}`)) continue

    const uid = `wc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    clocks.push({ uid, type: FurnitureType.WALL_CLOCK, col, row: wallRow })
    usedWalls.add(`${col},${wallRow}`)
  }

  return clocks
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

  // Step 8: Place wall clocks
  const wallClocks = placeWallClocks(rooms, tiles, cols, allFurniture)
  allFurniture = allFurniture.concat(wallClocks)

  return {
    version: 1,
    cols,
    rows,
    tiles,
    tileColors,
    furniture: allFurniture,
  }
}
