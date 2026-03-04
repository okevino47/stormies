# Changelog

## [1.1.0] - 2026-03-04

### Added

- **Thinking Thought Bubbles** — When Claude Code enters its extended thinking/reasoning phase, a cloud-style thought bubble appears above the character displaying a short ~8-10 word summary of what the agent is pondering. The bubble fades out after 5 seconds or disappears immediately when tool use begins.
- **Activity Animation Templates** — New sprite template system for richer character activity animations (typing, reading, writing, searching, browsing, thinking, phone, presenting, coffee, celebrating).

### Changed

- Thinking bubbles have lower priority than tool status overlays (hover/select) and permission/waiting bubbles — they won't overlap existing UI.
- Transcript parser now processes `thinking` content blocks from Claude's assistant messages.

## [1.0.1] - Initial release

- Live agent detection with matrix rain spawn/despawn effects
- 6 character palettes with hue shifting for unlimited variations
- 10 exotic pet types for sub-agents (Cat, Dog, Owl, Axolotl, etc.)
- Full office layout editor with 86 furniture items across 8 categories
- BSP-based random office generation
- Dynamic mode (auto-fit layout to window)
- Floor & wall themes with HSL color controls
- Custom PNG asset import
- Notification chime, zoom controls, vignette overlay
