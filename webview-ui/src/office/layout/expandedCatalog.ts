/**
 * Expanded furniture catalog — 70 unique items, no color variants.
 * Side-effect import: registers all items into FURNITURE_CATALOG at load time.
 */
import { FURNITURE_CATALOG, type CatalogEntryWithCategory, type FurnitureCategory } from './furnitureCatalog.js'
import type { SpriteData } from '../types.js'

// ── Desks + Chairs ──────────────────────────────────────────────────────────
import {
  EXP_SMALL_DESK, EXP_L_DESK, EXP_STANDING_DESK, EXP_ROUND_TABLE,
  EXP_CONFERENCE_TABLE, EXP_CORNER_DESK, EXP_RECEPTION_DESK, EXP_COUNTER,
  EXP_ARMCHAIR, EXP_STOOL, EXP_BEAN_BAG, EXP_BENCH,
  EXP_THREE_SEAT_SOFA, EXP_RECLINER, EXP_FOLDING_CHAIR, EXP_GAMING_CHAIR,
} from '../sprites/expandedFurnitureSprites.js'

// ── Electronics + Decor ─────────────────────────────────────────────────────
import {
  EXP_LAPTOP, EXP_SERVER_RACK, EXP_TV_ON_STAND, EXP_DESK_PHONE,
  EXP_SPEAKER, EXP_ROUTER, EXP_PROJECTOR, EXP_ARCADE_MACHINE,
  EXP_SMALL_RUG, EXP_ROUND_RUG, EXP_PAINTING, EXP_PHOTO_FRAME,
  EXP_TROPHY, EXP_GLOBE, EXP_VASE, EXP_STATUE,
  EXP_AQUARIUM, EXP_FIREPLACE, EXP_CANDELABRA,
} from '../sprites/expandedSprites.js'

// ── Plants + Storage ────────────────────────────────────────────────────────
import {
  EXP_SUCCULENT, EXP_HANGING_PLANT, EXP_FLOWER_POT, EXP_CACTUS,
  EXP_BAMBOO, EXP_BONSAI, EXP_FERN, EXP_FLOWER_ARRANGEMENT, EXP_IVY,
  EXP_SMALL_SHELF, EXP_WIDE_BOOKSHELF, EXP_LOCKER,
  EXP_DRAWER_UNIT, EXP_SAFE, EXP_CRATE,
} from '../sprites/expandedPlantsStorageSprites.js'

// ── Wall + Misc ─────────────────────────────────────────────────────────────
import {
  EXP_WALL_SHELF, EXP_MOUNTED_TV, EXP_POSTER, EXP_BULLETIN_BOARD,
  EXP_MIRROR, EXP_LARGE_CLOCK,
  EXP_TRASH_CAN, EXP_FIRE_EXTINGUISHER, EXP_UMBRELLA_STAND, EXP_COAT_RACK,
  EXP_WATER_FOUNTAIN, EXP_VENDING_MACHINE, EXP_MICROWAVE, EXP_FRIDGE,
  EXP_FAN, EXP_TOOLBOX, EXP_OTTOMAN, EXP_BAR_TABLE, EXP_TABLET,
  EXP_DECORATIVE_WINDOW,
} from '../sprites/expandedWallMiscSprites.js'

// ── Base entry descriptor (before hydration) ────────────────────────────────
interface BaseEntry {
  type: string
  label: string
  sprite: SpriteData
  footprintW: number
  footprintH: number
  isDesk: boolean
  category: FurnitureCategory
  canPlaceOnSurfaces?: boolean
  canPlaceOnWalls?: boolean
  backgroundTiles?: number
}

const BASES: BaseEntry[] = [
  // ── Desks (8) ───────────────────────────────────────────────────────────
  { type: 'expanded-small-desk',       label: 'Small Desk',       sprite: EXP_SMALL_DESK,       footprintW: 1, footprintH: 1, isDesk: true,  category: 'desks' },
  { type: 'expanded-l-desk',           label: 'L-Shaped Desk',    sprite: EXP_L_DESK,           footprintW: 3, footprintH: 2, isDesk: true,  category: 'desks' },
  { type: 'expanded-standing-desk',    label: 'Standing Desk',    sprite: EXP_STANDING_DESK,    footprintW: 2, footprintH: 1, isDesk: true,  category: 'desks' },
  { type: 'expanded-round-table',      label: 'Round Table',      sprite: EXP_ROUND_TABLE,      footprintW: 1, footprintH: 1, isDesk: true,  category: 'desks' },
  { type: 'expanded-conference-table', label: 'Conference Table', sprite: EXP_CONFERENCE_TABLE, footprintW: 3, footprintH: 2, isDesk: true,  category: 'desks' },
  { type: 'expanded-corner-desk',      label: 'Corner Desk',      sprite: EXP_CORNER_DESK,      footprintW: 2, footprintH: 2, isDesk: true,  category: 'desks' },
  { type: 'expanded-reception-desk',   label: 'Reception Desk',   sprite: EXP_RECEPTION_DESK,   footprintW: 3, footprintH: 1, isDesk: true,  category: 'desks' },
  { type: 'expanded-counter',          label: 'Counter',          sprite: EXP_COUNTER,          footprintW: 2, footprintH: 1, isDesk: true,  category: 'desks' },

  // ── Chairs (8) ──────────────────────────────────────────────────────────
  { type: 'expanded-armchair',         label: 'Armchair',         sprite: EXP_ARMCHAIR,         footprintW: 1, footprintH: 1, isDesk: false, category: 'chairs' },
  { type: 'expanded-stool',            label: 'Stool',            sprite: EXP_STOOL,            footprintW: 1, footprintH: 1, isDesk: false, category: 'chairs' },
  { type: 'expanded-bean-bag',         label: 'Bean Bag',         sprite: EXP_BEAN_BAG,         footprintW: 1, footprintH: 1, isDesk: false, category: 'chairs' },
  { type: 'expanded-bench',            label: 'Bench',            sprite: EXP_BENCH,            footprintW: 2, footprintH: 1, isDesk: false, category: 'chairs' },
  { type: 'expanded-three-seat-sofa',  label: 'Three-Seat Sofa',  sprite: EXP_THREE_SEAT_SOFA,  footprintW: 3, footprintH: 1, isDesk: false, category: 'chairs' },
  { type: 'expanded-recliner',         label: 'Recliner',         sprite: EXP_RECLINER,         footprintW: 1, footprintH: 1, isDesk: false, category: 'chairs' },
  { type: 'expanded-folding-chair',    label: 'Folding Chair',    sprite: EXP_FOLDING_CHAIR,    footprintW: 1, footprintH: 1, isDesk: false, category: 'chairs' },
  { type: 'expanded-gaming-chair',     label: 'Gaming Chair',     sprite: EXP_GAMING_CHAIR,     footprintW: 1, footprintH: 1, isDesk: false, category: 'chairs' },

  // ── Plants (9) ──────────────────────────────────────────────────────────
  { type: 'expanded-succulent',           label: 'Succulent',           sprite: EXP_SUCCULENT,           footprintW: 1, footprintH: 1, isDesk: false, category: 'plants' },
  { type: 'expanded-hanging-plant',       label: 'Hanging Plant',       sprite: EXP_HANGING_PLANT,       footprintW: 1, footprintH: 1, isDesk: false, category: 'plants', canPlaceOnWalls: true },
  { type: 'expanded-flower-pot',          label: 'Flower Pot',          sprite: EXP_FLOWER_POT,          footprintW: 1, footprintH: 1, isDesk: false, category: 'plants' },
  { type: 'expanded-cactus',              label: 'Cactus',              sprite: EXP_CACTUS,              footprintW: 1, footprintH: 2, isDesk: false, category: 'plants' },
  { type: 'expanded-bamboo',              label: 'Bamboo',              sprite: EXP_BAMBOO,              footprintW: 1, footprintH: 2, isDesk: false, category: 'plants' },
  { type: 'expanded-bonsai',              label: 'Bonsai',              sprite: EXP_BONSAI,              footprintW: 1, footprintH: 1, isDesk: false, category: 'plants', canPlaceOnSurfaces: true },
  { type: 'expanded-fern',                label: 'Fern',                sprite: EXP_FERN,                footprintW: 1, footprintH: 1, isDesk: false, category: 'plants' },
  { type: 'expanded-flower-arrangement',  label: 'Flower Arrangement',  sprite: EXP_FLOWER_ARRANGEMENT,  footprintW: 1, footprintH: 1, isDesk: false, category: 'plants', canPlaceOnSurfaces: true },
  { type: 'expanded-ivy',                 label: 'Ivy',                 sprite: EXP_IVY,                 footprintW: 1, footprintH: 1, isDesk: false, category: 'plants', canPlaceOnWalls: true },

  // ── Storage (6) ─────────────────────────────────────────────────────────
  { type: 'expanded-small-shelf',      label: 'Small Shelf',      sprite: EXP_SMALL_SHELF,      footprintW: 1, footprintH: 1, isDesk: false, category: 'storage' },
  { type: 'expanded-wide-bookshelf',   label: 'Wide Bookshelf',   sprite: EXP_WIDE_BOOKSHELF,   footprintW: 2, footprintH: 2, isDesk: false, category: 'storage' },
  { type: 'expanded-locker',           label: 'Locker',           sprite: EXP_LOCKER,           footprintW: 1, footprintH: 2, isDesk: false, category: 'storage' },
  { type: 'expanded-drawer-unit',      label: 'Drawer Unit',      sprite: EXP_DRAWER_UNIT,      footprintW: 1, footprintH: 1, isDesk: false, category: 'storage' },
  { type: 'expanded-safe',             label: 'Safe',             sprite: EXP_SAFE,             footprintW: 1, footprintH: 1, isDesk: false, category: 'storage' },
  { type: 'expanded-crate',            label: 'Crate',            sprite: EXP_CRATE,            footprintW: 1, footprintH: 1, isDesk: false, category: 'storage' },

  // ── Electronics (8) ─────────────────────────────────────────────────────
  { type: 'expanded-laptop',           label: 'Laptop',           sprite: EXP_LAPTOP,           footprintW: 1, footprintH: 1, isDesk: false, category: 'electronics', canPlaceOnSurfaces: true },
  { type: 'expanded-server-rack',      label: 'Server Rack',      sprite: EXP_SERVER_RACK,      footprintW: 1, footprintH: 2, isDesk: false, category: 'electronics' },
  { type: 'expanded-tv-on-stand',      label: 'TV on Stand',      sprite: EXP_TV_ON_STAND,      footprintW: 2, footprintH: 2, isDesk: false, category: 'electronics' },
  { type: 'expanded-desk-phone',       label: 'Desk Phone',       sprite: EXP_DESK_PHONE,       footprintW: 1, footprintH: 1, isDesk: false, category: 'electronics', canPlaceOnSurfaces: true },
  { type: 'expanded-speaker',          label: 'Speaker',          sprite: EXP_SPEAKER,          footprintW: 1, footprintH: 1, isDesk: false, category: 'electronics' },
  { type: 'expanded-router',           label: 'Router',           sprite: EXP_ROUTER,           footprintW: 1, footprintH: 1, isDesk: false, category: 'electronics', canPlaceOnSurfaces: true },
  { type: 'expanded-projector',        label: 'Projector',        sprite: EXP_PROJECTOR,        footprintW: 1, footprintH: 1, isDesk: false, category: 'electronics' },
  { type: 'expanded-arcade-machine',   label: 'Arcade Machine',   sprite: EXP_ARCADE_MACHINE,   footprintW: 1, footprintH: 2, isDesk: false, category: 'electronics' },

  // ── Decor (11) ──────────────────────────────────────────────────────────
  { type: 'expanded-small-rug',        label: 'Small Rug',        sprite: EXP_SMALL_RUG,        footprintW: 1, footprintH: 1, isDesk: false, category: 'decor', backgroundTiles: 1 },
  { type: 'expanded-round-rug',        label: 'Round Rug',        sprite: EXP_ROUND_RUG,        footprintW: 2, footprintH: 2, isDesk: false, category: 'decor', backgroundTiles: 2 },
  { type: 'expanded-painting',         label: 'Painting',         sprite: EXP_PAINTING,         footprintW: 1, footprintH: 1, isDesk: false, category: 'decor', canPlaceOnWalls: true },
  { type: 'expanded-photo-frame',      label: 'Photo Frame',      sprite: EXP_PHOTO_FRAME,      footprintW: 1, footprintH: 1, isDesk: false, category: 'decor', canPlaceOnSurfaces: true },
  { type: 'expanded-trophy',           label: 'Trophy',           sprite: EXP_TROPHY,           footprintW: 1, footprintH: 1, isDesk: false, category: 'decor', canPlaceOnSurfaces: true },
  { type: 'expanded-globe',            label: 'Globe',            sprite: EXP_GLOBE,            footprintW: 1, footprintH: 1, isDesk: false, category: 'decor', canPlaceOnSurfaces: true },
  { type: 'expanded-vase',             label: 'Vase',             sprite: EXP_VASE,             footprintW: 1, footprintH: 1, isDesk: false, category: 'decor', canPlaceOnSurfaces: true },
  { type: 'expanded-statue',           label: 'Statue',           sprite: EXP_STATUE,           footprintW: 1, footprintH: 2, isDesk: false, category: 'decor' },
  { type: 'expanded-aquarium',         label: 'Aquarium',         sprite: EXP_AQUARIUM,         footprintW: 2, footprintH: 1, isDesk: false, category: 'decor' },
  { type: 'expanded-fireplace',        label: 'Fireplace',        sprite: EXP_FIREPLACE,        footprintW: 2, footprintH: 2, isDesk: false, category: 'decor' },
  { type: 'expanded-candelabra',       label: 'Candelabra',       sprite: EXP_CANDELABRA,       footprintW: 1, footprintH: 1, isDesk: false, category: 'decor', canPlaceOnSurfaces: true },

  // ── Wall (6) ────────────────────────────────────────────────────────────
  { type: 'expanded-wall-shelf',       label: 'Wall Shelf',       sprite: EXP_WALL_SHELF,       footprintW: 2, footprintH: 1, isDesk: false, category: 'wall', canPlaceOnWalls: true },
  { type: 'expanded-mounted-tv',       label: 'Mounted TV',       sprite: EXP_MOUNTED_TV,       footprintW: 2, footprintH: 1, isDesk: false, category: 'wall', canPlaceOnWalls: true },
  { type: 'expanded-poster',           label: 'Poster',           sprite: EXP_POSTER,           footprintW: 1, footprintH: 1, isDesk: false, category: 'wall', canPlaceOnWalls: true },
  { type: 'expanded-bulletin-board',   label: 'Bulletin Board',   sprite: EXP_BULLETIN_BOARD,   footprintW: 2, footprintH: 1, isDesk: false, category: 'wall', canPlaceOnWalls: true },
  { type: 'expanded-mirror',           label: 'Mirror',           sprite: EXP_MIRROR,           footprintW: 1, footprintH: 1, isDesk: false, category: 'wall', canPlaceOnWalls: true },
  { type: 'expanded-large-clock',      label: 'Large Clock',      sprite: EXP_LARGE_CLOCK,      footprintW: 1, footprintH: 1, isDesk: false, category: 'wall', canPlaceOnWalls: true },

  // ── Misc (14) ───────────────────────────────────────────────────────────
  { type: 'expanded-trash-can',        label: 'Trash Can',        sprite: EXP_TRASH_CAN,        footprintW: 1, footprintH: 1, isDesk: false, category: 'misc' },
  { type: 'expanded-fire-extinguisher',label: 'Fire Extinguisher',sprite: EXP_FIRE_EXTINGUISHER,footprintW: 1, footprintH: 1, isDesk: false, category: 'misc' },
  { type: 'expanded-umbrella-stand',   label: 'Umbrella Stand',   sprite: EXP_UMBRELLA_STAND,   footprintW: 1, footprintH: 1, isDesk: false, category: 'misc' },
  { type: 'expanded-coat-rack',        label: 'Coat Rack',        sprite: EXP_COAT_RACK,        footprintW: 1, footprintH: 1, isDesk: false, category: 'misc' },
  { type: 'expanded-water-fountain',   label: 'Water Fountain',   sprite: EXP_WATER_FOUNTAIN,   footprintW: 1, footprintH: 1, isDesk: false, category: 'misc' },
  { type: 'expanded-vending-machine',  label: 'Vending Machine',  sprite: EXP_VENDING_MACHINE,  footprintW: 1, footprintH: 2, isDesk: false, category: 'misc' },
  { type: 'expanded-microwave',        label: 'Microwave',        sprite: EXP_MICROWAVE,        footprintW: 1, footprintH: 1, isDesk: false, category: 'misc', canPlaceOnSurfaces: true },
  { type: 'expanded-fridge',           label: 'Fridge',           sprite: EXP_FRIDGE,           footprintW: 1, footprintH: 2, isDesk: false, category: 'misc' },
  { type: 'expanded-fan',              label: 'Fan',              sprite: EXP_FAN,              footprintW: 1, footprintH: 1, isDesk: false, category: 'misc' },
  { type: 'expanded-toolbox',          label: 'Toolbox',          sprite: EXP_TOOLBOX,          footprintW: 1, footprintH: 1, isDesk: false, category: 'misc' },
  { type: 'expanded-ottoman',          label: 'Ottoman',          sprite: EXP_OTTOMAN,          footprintW: 1, footprintH: 1, isDesk: false, category: 'misc' },
  { type: 'expanded-bar-table',        label: 'Bar Table',        sprite: EXP_BAR_TABLE,        footprintW: 1, footprintH: 1, isDesk: true,  category: 'misc' },
  { type: 'expanded-tablet',           label: 'Tablet',           sprite: EXP_TABLET,           footprintW: 1, footprintH: 1, isDesk: false, category: 'misc', canPlaceOnSurfaces: true },
  { type: 'expanded-decorative-window',label: 'Decorative Window',sprite: EXP_DECORATIVE_WINDOW,footprintW: 1, footprintH: 2, isDesk: false, category: 'misc', canPlaceOnWalls: true },
]

// ── Register all entries into the global catalog at import time ────────────
for (const base of BASES) {
  const entry: CatalogEntryWithCategory = {
    type: base.type,
    label: base.label,
    footprintW: base.footprintW,
    footprintH: base.footprintH,
    sprite: base.sprite,
    isDesk: base.isDesk,
    category: base.category,
    ...(base.canPlaceOnSurfaces ? { canPlaceOnSurfaces: true } : {}),
    ...(base.canPlaceOnWalls ? { canPlaceOnWalls: true } : {}),
    ...(base.backgroundTiles ? { backgroundTiles: base.backgroundTiles } : {}),
  }
  FURNITURE_CATALOG.push(entry)
}
