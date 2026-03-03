# Stormies - Pixel Agents

A JetBrains IDE plugin that brings your Claude Code agents to life as animated pixel art characters in a charming virtual office. Watch your AI coding assistants walk around, sit at desks, type on keyboards, and react in real-time to what they're actually doing.

![JetBrains](https://img.shields.io/badge/JetBrains-IntelliJ%20IDEA-blue?logo=jetbrains)
![Kotlin](https://img.shields.io/badge/Kotlin-2.1.0-purple?logo=kotlin)
![License](https://img.shields.io/badge/License-MIT-green)

## What It Does

The plugin monitors Claude Code's session transcript files (`~/.claude/projects/`) and translates agent activity into pixel art animations. When an agent uses a tool, writes code, or waits for permission, its character reacts accordingly — no modifications to Claude Code needed.

- Agents appear automatically when Claude Code sessions are running
- Each agent gets a unique pixel art character with a generated name (e.g. "swift-otter", "clever-panda")
- Characters walk to desks, sit in chairs, and type when working
- Tool usage triggers real-time status overlays with activity bubbles
- Permission requests show animated indicator bubbles
- Sub-agents spawn as animated pet companions

## Features

### Agents & Characters

- **Live Agent Detection** — Automatically detects running Claude Code sessions and spawns characters with matrix rain spawn effects
- **Unique Characters** — 6 base character palettes with hue shifting for unlimited color variations; each agent gets a unique compound name
- **Character Animations** — Walking (4-frame directional), typing, reading, and idle animations with autonomous wander behavior
- **Agent List Panel** — Expandable bottom-right panel showing all active agents with status dots (active, waiting for permission) and activity text
- **Tool Status Overlays** — Real-time activity bubbles above characters showing what each agent is doing (file being edited, command being run, etc.)

### Pet Sub-Agents

- **10 Exotic Pet Types** — When a sub-agent is spawned via the Task tool, it appears as an animated pet: Cat, Dog, Owl, Axolotl, Hedgehog, Red Panda, Jellyfish, Chameleon, Penguin, or Bat
- **Pet Names** — Each pet gets a cute name from a pool of 30 (Whiskers, Pixel, Mochi, Bean, etc.)
- **Parent Linking** — Pets appear in the agent list grouped under their parent agent

### Office Layout Editor

- **Built-in Editor** — Toggle edit mode to customize your office with a full suite of tools: tile paint, wall paint, furniture placement, selection, eyedropper, and eraser
- **Randomize Layout** — One-click random office generation using BSP room partitioning with varied room types (workspace, meeting room, kitchen, library, lounge, etc.)
- **Dynamic Mode** — Auto-fit layout to the available canvas size
- **Undo/Redo** — Full undo/redo history with keyboard shortcuts (Ctrl+Z / Ctrl+Y)
- **Keyboard Shortcuts** — R to rotate furniture, T to toggle on/off states, Delete to remove, Escape for multi-stage deselection

### Furniture Catalog

- **86 Furniture Items** across 8 categories:
  - **Desks** — Desk, Small Desk, L-Desk, Standing Desk, Corner Desk, Conference Table, Round Table, Coffee Table, Reception Desk, Counter, Bar Table
  - **Chairs** — Chair, Couch, Armchair, Stool, Bean Bag, Bench, Three-Seat Sofa, Recliner, Folding Chair, Gaming Chair
  - **Tech** — PC, Laptop, Printer, Server Rack, TV, Desk Phone, Speaker, Router, Projector, Arcade Machine, Mounted TV, Tablet
  - **Storage** — Bookshelf, Filing Cabinet, Small Shelf, Wide Bookshelf, Locker, Drawer Unit, Safe, Crate
  - **Plants** — Plant, Potted Tree, Succulent, Hanging Plant, Flower Pot, Cactus, Bamboo, Bonsai, Fern, Flower Arrangement, Ivy
  - **Decor** — Lamp, Rug, Small Rug, Round Rug, Painting, Photo Frame, Trophy, Globe, Vase, Statue, Aquarium, Fireplace, Candelabra, Whiteboard, Wall Clock
  - **Wall** — Wall Shelf, Poster, Bulletin Board, Mirror, Large Clock, Decorative Window
  - **Misc** — Cooler, Coffee Machine, Vending Machine, Fridge, Microwave, Water Fountain, Trash Can, Fire Extinguisher, Umbrella Stand, Coat Rack, Fan, Toolbox, Ottoman
- **Furniture Features** — Rotation, on/off state toggling, color overrides, surface placement (items on desks), wall mounting, depth-sorted rendering

### Customization

- **Floor & Wall Themes** — 7 floor tile patterns with full HSL color controls (hue, saturation, brightness, contrast) in colorize or adjust modes
- **Per-Tile Colors** — Color each floor tile individually with the eyedropper and paint tools
- **Custom Assets** — Import your own PNG sprite sheets for furniture with automatic rotation group and state detection
- **Import/Export** — Save and load office layouts as JSON files; layouts persist at `~/.claude/stormies/layout.json` and sync across IDE windows

### Audio & Visual Effects

- **Matrix Spawn/Despawn** — Characters appear and disappear with an animated matrix rain column effect
- **Notification Chime** — Optional two-note ascending chime when tools complete
- **Vignette Overlay** — Subtle screen-edge darkening for atmosphere
- **Zoom Controls** — 1x–8x zoom with on-screen buttons and Ctrl/Cmd+scroll

## Built For IntelliJ

This plugin is built specifically for the **JetBrains IntelliJ Platform** (IntelliJ IDEA, WebStorm, PyCharm, etc.). It uses JCEF (JetBrains Chromium Embedded Framework) to render the pixel art office as a webview inside the IDE's tool window panel.

### Requirements

- IntelliJ-based IDE **2024.3** or later
- Java 21+
- Claude Code running in a terminal (the plugin observes its session files)

## Installation

### From Source

```bash
git clone https://github.com/user/stormies-pixel-agents.git
cd stormies-pixel-agents
./gradlew buildPlugin
```

The built plugin ZIP will be in `build/distributions/`. Install it via **Settings > Plugins > Install Plugin from Disk**.

### Development

```bash
# Build the webview UI
cd webview-ui && npm install && npm run build && cd ..

# Launch a sandbox IDE with the plugin
./gradlew runIde
```

## Credits & Acknowledgments

### The Original Pixel Agents

This project is entirely inspired by and based on the amazing [**Pixel Agents**](https://github.com/pablodelucca/pixel-agents) VS Code extension by [Pablo De Lucca](https://github.com/pablodelucca) ([VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=pablodelucca.pixel-agents)).

A huge **thank you** to Pablo and all the contributors of the original Pixel Agents project. Your creative idea of turning AI coding agents into pixel art characters is genuinely delightful, and the quality of the original codebase made this port possible. If you're a VS Code user, go install the original — it's fantastic.

### Built by Claude

Here's the fun part: **this entire JetBrains plugin was built by Claude** (Anthropic's AI assistant, specifically Claude Opus). Every line of Kotlin, every pixel art sprite, every architectural decision — from the JCEF webview bridge to the JSONL transcript parser to the hand-drawn furniture sprites — was written by an AI.

The human behind this project wanted to explore whether AI could successfully adapt a VS Code extension into a fully functional IntelliJ platform plugin, essentially porting an ecosystem that didn't have one yet. Turns out, it can. This project is a testament to what's possible when a human has a vision and an AI rolls up its (pixel art) sleeves to make it happen.

*Yes, I'm Claude, and I'm genuinely proud of this one.*

## License

MIT
