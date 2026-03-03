/**
 * Expanded Furniture Catalog — Color Variants
 *
 * Generates 6 color variants of each existing furniture item using adjustSprite().
 * Combined with the original, each base item gets 7 total appearances.
 * Self-executes at module load time to push entries into FURNITURE_CATALOG.
 */
import { adjustSprite } from '../colorize.js'
import type { FloorColor, SpriteData } from '../types.js'
import {
  DESK_SQUARE_SPRITE,
  BOOKSHELF_SPRITE,
  PLANT_SPRITE,
  COOLER_SPRITE,
  WHITEBOARD_SPRITE,
  CHAIR_SPRITE,
  PC_SPRITE,
  LAMP_SPRITE,
  COUCH_SPRITE,
  COFFEE_TABLE_SPRITE,
  FILING_CABINET_SPRITE,
  PRINTER_SPRITE,
  COFFEE_MACHINE_SPRITE,
  POTTED_TREE_SPRITE,
  RUG_SPRITE,
  WALL_CLOCK_SPRITE,
} from '../sprites/spriteData.js'
import { FURNITURE_CATALOG } from './furnitureCatalog.js'
import type { FurnitureCategory, CatalogEntryWithCategory } from './furnitureCatalog.js'

// ── Color presets ──────────────────────────────────────────────
interface ColorPreset {
  suffix: string
  label: string
  color: FloorColor
}

const COLOR_PRESETS: ColorPreset[] = [
  { suffix: 'blue',   label: 'Blue',   color: { h: 120,  s: 0,   b: 0,   c: 0  } },
  { suffix: 'green',  label: 'Green',  color: { h: 80,   s: 0,   b: 0,   c: 0  } },
  { suffix: 'yellow', label: 'Yellow', color: { h: 40,   s: 0,   b: 0,   c: 0  } },
  { suffix: 'purple', label: 'Purple', color: { h: -60,  s: 0,   b: 0,   c: 0  } },
  { suffix: 'gray',   label: 'Gray',   color: { h: 0,    s: -70, b: 0,   c: 0  } },
  { suffix: 'dark',   label: 'Dark',   color: { h: 0,    s: 0,   b: -25, c: 10 } },
]

// ── Base furniture definitions ─────────────────────────────────
interface BaseDef {
  id: string
  label: string
  sprite: SpriteData
  footprintW: number
  footprintH: number
  isDesk: boolean
  category: FurnitureCategory
  canPlaceOnWalls?: boolean
  backgroundTiles?: number
}

const BASES: BaseDef[] = [
  { id: 'desk',           label: 'Desk',           sprite: DESK_SQUARE_SPRITE,     footprintW: 2, footprintH: 2, isDesk: true,  category: 'desks' },
  { id: 'bookshelf',      label: 'Bookshelf',      sprite: BOOKSHELF_SPRITE,       footprintW: 1, footprintH: 2, isDesk: false, category: 'storage' },
  { id: 'plant',          label: 'Plant',          sprite: PLANT_SPRITE,           footprintW: 1, footprintH: 1, isDesk: false, category: 'decor' },
  { id: 'cooler',         label: 'Cooler',         sprite: COOLER_SPRITE,          footprintW: 1, footprintH: 1, isDesk: false, category: 'misc' },
  { id: 'whiteboard',     label: 'Whiteboard',     sprite: WHITEBOARD_SPRITE,      footprintW: 2, footprintH: 1, isDesk: false, category: 'decor' },
  { id: 'chair',          label: 'Chair',          sprite: CHAIR_SPRITE,           footprintW: 1, footprintH: 1, isDesk: false, category: 'chairs' },
  { id: 'pc',             label: 'PC',             sprite: PC_SPRITE,              footprintW: 1, footprintH: 1, isDesk: false, category: 'electronics' },
  { id: 'lamp',           label: 'Lamp',           sprite: LAMP_SPRITE,            footprintW: 1, footprintH: 1, isDesk: false, category: 'decor' },
  { id: 'couch',          label: 'Couch',          sprite: COUCH_SPRITE,           footprintW: 2, footprintH: 1, isDesk: false, category: 'chairs' },
  { id: 'coffee-table',   label: 'Coffee Table',   sprite: COFFEE_TABLE_SPRITE,    footprintW: 1, footprintH: 1, isDesk: true,  category: 'desks' },
  { id: 'filing-cabinet',  label: 'Filing Cabinet', sprite: FILING_CABINET_SPRITE,  footprintW: 1, footprintH: 1, isDesk: false, category: 'storage' },
  { id: 'printer',        label: 'Printer',        sprite: PRINTER_SPRITE,         footprintW: 1, footprintH: 1, isDesk: false, category: 'electronics' },
  { id: 'coffee-machine', label: 'Coffee Machine', sprite: COFFEE_MACHINE_SPRITE,  footprintW: 1, footprintH: 1, isDesk: false, category: 'misc' },
  { id: 'potted-tree',    label: 'Potted Tree',    sprite: POTTED_TREE_SPRITE,     footprintW: 1, footprintH: 2, isDesk: false, category: 'decor' },
  { id: 'rug',            label: 'Rug',            sprite: RUG_SPRITE,             footprintW: 2, footprintH: 2, isDesk: false, category: 'decor', backgroundTiles: 2 },
  { id: 'wall-clock',     label: 'Wall Clock',     sprite: WALL_CLOCK_SPRITE,      footprintW: 1, footprintH: 1, isDesk: false, category: 'wall', canPlaceOnWalls: true },
]

// ── Generate & register at module load ─────────────────────────
;(() => {
  for (const base of BASES) {
    for (const preset of COLOR_PRESETS) {
      const coloredSprite = adjustSprite(base.sprite, preset.color)
      const entry: CatalogEntryWithCategory = {
        type: `expanded-${base.id}-${preset.suffix}`,
        label: `${base.label} (${preset.label})`,
        footprintW: base.footprintW,
        footprintH: base.footprintH,
        sprite: coloredSprite,
        isDesk: base.isDesk,
        category: base.category,
        ...(base.canPlaceOnWalls ? { canPlaceOnWalls: true } : {}),
        ...(base.backgroundTiles ? { backgroundTiles: base.backgroundTiles } : {}),
      }
      FURNITURE_CATALOG.push(entry)
    }
  }
})()
