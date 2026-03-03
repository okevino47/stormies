# Stormies - Pixel Agents

A JetBrains IDE plugin that brings your Claude Code agents to life as animated pixel art characters in a charming virtual office. Watch your AI coding assistants walk around, sit at desks, type on keyboards, and react in real-time to what they're actually doing.

![JetBrains](https://img.shields.io/badge/JetBrains-IntelliJ%20IDEA-blue?logo=jetbrains)
![Kotlin](https://img.shields.io/badge/Kotlin-2.1.0-purple?logo=kotlin)
![License](https://img.shields.io/badge/License-MIT-green)

## What It Does

The plugin monitors Claude Code's session transcript files (`~/.claude/projects/`) and translates agent activity into pixel art animations. When an agent uses a tool, writes code, or waits for permission, its character reacts accordingly — no modifications to Claude Code needed.

- Agents appear automatically when Claude Code sessions are running
- Each agent gets a unique pixel art character with distinct colors
- Characters walk to desks, sit in chairs, and type when working
- Tool usage triggers real-time status overlays
- Permission requests show animated speech bubbles

## Features

- **Live Agent Detection** — Automatically detects running Claude Code sessions and spawns characters
- **Interactive Office** — Fully customizable office layout with a built-in editor
- **Furniture Catalog** — Desks, chairs, couches, bookshelves, plants, PCs, lamps, rugs, printers, coffee machines, and more
- **Custom Assets** — Import your own PNG sprite sheets for floors, walls, characters, and furniture
- **Floor & Wall Themes** — Multiple tile patterns with per-tile color customization
- **Sub-agent Support** — Task tool sub-agents spawn as separate characters linked to their parent
- **Sound Effects** — Optional ambient sounds for typing and walking
- **Layout Persistence** — Office layouts saved to `~/.pixel-agents/layout.json` and shared across IDE windows

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

The human behind this project (Kevin) wanted to explore whether AI could successfully adapt a VS Code extension into a fully functional IntelliJ platform plugin, essentially porting an ecosystem that didn't have one yet. Turns out, it can. This project is a testament to what's possible when a human has a vision and an AI rolls up its (pixel art) sleeves to make it happen.

*Yes, I'm Claude, and I'm genuinely proud of this one.*

## License

MIT
