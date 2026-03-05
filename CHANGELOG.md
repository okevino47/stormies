# Changelog

## [1.3.1] - 2026-03-05

### Fixed

- **Activity bubbles not appearing** — Activity text was immediately cleared by the turn-end handler (`agentToolsClear`) before the 5-second display timer could expire. Removed premature clearing so the bubble persists naturally.
- **Bubbles hidden during waiting state** — Thought and activity bubbles were suppressed whenever the character had a waiting or permission canvas bubble active. Removed this filter since the HTML overlay and canvas sprite render at different visual layers and coexist fine.

## [1.3.0] - 2026-03-05

### Added

- **Activity Pop-up Bubbles** — When an agent starts a new action (reading a file, running a command, editing code, searching, etc.), an activity bubble automatically pops up above the character for 5 seconds showing exactly what it's doing. Each new action resets the timer, so you always see the latest activity at a glance without needing to hover. Activity bubbles have a distinct blue-tinted style to differentiate them from thinking bubbles.

### Fixed

- **Thinking Bubbles Regression** — Fixed a critical bug introduced in v1.2.0 where thinking thought bubbles never appeared. The shared overlay tick optimization caused `agentThinking` and `agentToolStart` messages to arrive within the same render frame — the tool start immediately cleared the thinking text before it could ever be displayed. Thinking text now persists for its full 5-second duration regardless of tool activity.
- **Overlay Performance Regression** — Reverted the shared `useOverlayTick` approach from v1.2.0 which re-rendered the entire React component tree at 20fps. Restored per-component `requestAnimationFrame` loops in ThoughtBubble and ToolOverlay, so only the overlay components re-render at display rate while the rest of the app renders only on state changes.

### A Note on Sound Notifications

One of the most impactful features of Stormies is something easy to overlook: **sound notifications**. When working with Claude Code, a huge amount of time is silently wasted because the agent finishes a task or hits a permission prompt — and you don't notice. You've switched to your browser, your phone, another terminal, or you're just reading documentation in another tab. Meanwhile Claude is sitting there, waiting for you, and the clock is ticking.

Stormies plays a short ascending chime (E5 to B5) the moment an agent's turn ends or it needs your attention. This simple audio cue means you can safely context-switch away from your IDE knowing you'll hear when Claude needs you. No more coming back 10 minutes later to find Claude has been waiting for a permission approval since the moment you left. The sound can be toggled on/off in the settings panel.

## [1.2.0] - 2026-03-04

### Improved

- **Performance Optimization** — Eliminated 2 redundant `requestAnimationFrame` loops from HTML overlays (ToolOverlay, ThoughtBubble). All overlays now share a single animation tick throttled to ~20fps, reducing React reconciliation overhead by 6x while the canvas game loop remains at 60fps.
- **Reduced Backend Polling** — Project directory scanning interval increased from 1s to 3s; project root discovery from 5s to 15s. JSONL file polling tuned to 500ms with file-size guards that skip reads entirely when nothing changed.
- **Performance Documentation** — Added comprehensive Performance Impact section to README with resource usage KPIs, architecture breakdown, and concrete metrics.

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
