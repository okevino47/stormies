# Changelog

## [1.1.0] - 2026-03-04

### Added

- **Thinking Thought Bubbles** — When Claude Code enters its extended thinking/reasoning phase, a cloud-style thought bubble appears above the character displaying a short ~8-10 word summary of what the agent is pondering. The bubble fades out after 5 seconds or disappears immediately when tool use begins. Lower priority than tool overlays and permission/waiting bubbles.
- **Activity Animation Templates** — New sprite template system with dedicated animations for each tool type: typing, reading, writing, searching, browsing, thinking, phone, presenting, coffee, and celebrating.
- **UI Visibility Toggle** — New eye icon button (top-right) to hide/show all UI overlays (zoom controls, toolbar, agent list, tool overlays) for a clean viewing experience.
- **Project-scoped Agent Detection** — Agent detection is now scoped to the current IntelliJ project path, so each IDE window only shows agents working in that project's directory.

### Changed

- Transcript parser now processes `thinking` content blocks from Claude's assistant messages.
- Improved plugin JAR resource loading with multiple fallback strategies using PluginManagerCore API for more reliable webview resolution after install.

### Fixed

- Fixed plugin loading issue when installed from disk (webview resources not found in certain classloader configurations).

## [1.0.1] - Initial bugfix release

- Fixed plugin loading issue after install

## [1.0.0] - Initial release

- Live agent detection with matrix rain spawn/despawn effects
- 6 character palettes with hue shifting for unlimited variations
- 10 exotic pet types for sub-agents (Cat, Dog, Owl, Axolotl, etc.)
- Full office layout editor with 86 furniture items across 8 categories
- BSP-based random office generation
- Dynamic mode (auto-fit layout to window)
- Floor & wall themes with HSL color controls
- Custom PNG asset import
- Notification chime, zoom controls, vignette overlay
