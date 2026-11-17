# Analytics Workbench: Design System

## Presentation

First draft prepared on 2026-11-17 using the approved Portfolio case-study format. Keep the existing app identity and interface; this work documents them.

- Six inline boards: workflow, timeline, finding anatomy, light/dark foundations, control states, and charts/mobile layout.
- Real screenshots and a short browser recording use the two supplied samples. Their comparison counts describe those recordings only.
- Markdown remains the source for the project article. The existing generator produces its JSON and image imports.
- Downloads live under `public/demo/analytics/`: six-page PDF, vector control board, token JSON/CSS and MP4.

## Editable Source

Client job: `BST_261117_analytics-system`; native master: `BST_261117_analytics-system_v01.figcraft`.

Eight pages hold the workflow, foundations, controls, session, findings, charts/mobile, prototype and assets. The asset page retains the supplied light/dark logos as vector paths. The public PDF contains the six documentation boards; assets and the duplicate prototype view remain in the native file.

- Fourteen measured color roles in light/dark modes and ten control/motion values.
- Sixteen button variants: primary/secondary × default/hover/focus/disabled × light/dark.
- Shared Segoe UI text styles represent the system font on Windows. The app itself uses the platform font stack.
- Focus frames hug their surfaces with four-pixel padding and a two-pixel inside stroke, leaving a two-pixel gap.
- Hover/leave prototype links use the existing 150 ms easing. The CLI checks the wiring and static states; native animated playback still needs a graphical review.
- Handoff CSS removes quotes from durations and keeps disabled opacity unitless; token JSON retains native types.

## Evidence and Limits

App sources: `tracking-inspector.js` (tokens, controls, findings, shared session view), `sessions.mjs` (desktop recorder), `charts.jsx`, `index.html` (responsive layout), `nav.js` (theme/consent), `report.mjs` and `embed-kit/`.

The browser edition supports sample/imported recordings and tools that need no server. Full cross-origin recording belongs to the unreleased desktop edition. Optional site analytics follows consent; the old claim of no cookies or analytics was removed.

The source application's rules and screenshots support the case-study claims. Its code was not changed. Portfolio verification covers generated content, rendered pages, downloads, media, both themes and responsive widths. PDF review checks all six pages for consistent 1280-point width, clean margins and Brett Snyder author metadata.

Verified on 2026-11-17: production build; six linked, loaded article images; public downloads; 8.6-second video playback; and light/dark layouts at 1200, 390 and 320 pixels without horizontal overflow. The native document contains 16 components, eight hover/leave links and two prototype instances. All six PDF pages were rendered and reviewed; Segoe UI regular/semibold are embedded, with no PDF repair warnings.
