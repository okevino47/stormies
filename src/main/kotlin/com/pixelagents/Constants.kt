package com.pixelagents

// ── Timing (ms) ──────────────────────────────────────────────
const val JSONL_POLL_INTERVAL_MS = 1000L
const val FILE_WATCHER_POLL_INTERVAL_MS = 500L
const val PROJECT_SCAN_INTERVAL_MS = 3000L
const val TOOL_DONE_DELAY_MS = 300L
const val PERMISSION_TIMER_DELAY_MS = 7000L
const val TEXT_IDLE_DELAY_MS = 5000L

// ── Display Truncation ──────────────────────────────────────
const val BASH_COMMAND_DISPLAY_MAX_LENGTH = 30
const val TASK_DESCRIPTION_DISPLAY_MAX_LENGTH = 40

// ── PNG / Asset Parsing ─────────────────────────────────────
const val PNG_ALPHA_THRESHOLD = 128
const val WALL_PIECE_WIDTH = 16
const val WALL_PIECE_HEIGHT = 32
const val WALL_GRID_COLS = 4
const val WALL_BITMASK_COUNT = 16
const val FLOOR_PATTERN_COUNT = 7
const val FLOOR_TILE_SIZE = 16
val CHARACTER_DIRECTIONS = arrayOf("down", "up", "right")
const val CHAR_FRAME_W = 16
const val CHAR_FRAME_H = 32
const val CHAR_FRAMES_PER_ROW = 7
const val CHAR_COUNT = 6

// ── User-Level Layout Persistence ─────────────────────────────
const val LAYOUT_FILE_DIR = ".pixel-agents"
const val LAYOUT_FILE_NAME = "layout.json"
const val LAYOUT_FILE_POLL_INTERVAL_MS = 2000L

// ── Settings Persistence ────────────────────────────────────
const val SETTING_KEY_SOUND_ENABLED = "pixel-agents.soundEnabled"
const val SETTING_KEY_AGENT_SEATS = "pixel-agents.agentSeats"
