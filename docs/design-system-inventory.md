# Portfolio Design System: Source Inventory

## Pilot

- Portfolio case-study presentation approved by Brett on 2026-11-16.
- Editable v08 document: brief/inventory, light/dark foundations, button states/playground, and site-pattern pages. The pattern page includes real desktop/mobile screens and an editable content-engine diagram.
- Foundations: seven semantic colors in two modes, eight button measurements, and five motion values, including the existing 45-second floating-panel cycle.
- Button: primary, secondary, and ghost variants; default, hover, pressed, focus, and disabled states; shared label style and editable Label property. Arrow viewports preserve the live SVG sizing and stroke, including its internal space. Focus outlines use auto layout with 4 px padding and a 2 px inside stroke, preserving equal 2 px gaps as labels grow. Hover/press prototype links connect the variants.
- Public evidence: five native board exports, token JSON/CSS, a seven-page overview PDF, a recording of the actual React buttons, and an inline component demo with button-based preview controls.
- PDF v08: seven pages at 1280 points wide, one Inter family, regular/semibold documentation styles, and a consistent type scale. Button arrows match the live component; content-flow arrows remain centered between their cards. The duplicate playground sheet stays in the editable document and is omitted from the PDF. Paired portrait screens retain the measured 400 ms delay, 3 s fade, and 65% opacity.

## Source Map

| Area | Source | Notes |
| --- | --- | --- |
| Audience and goals | `docs/northstar.md` | Hiring teams first; clear work, resume, and contact paths. |
| Routes | `src/app/` | Home, About, Tools, Projects, Blog, shared detail pages, Privacy, Terms. |
| Theme roles | `src/styles/variables.css` | Use computed values; later declarations override some earlier theme values. |
| Typography | `src/app/globals.css`, `src/styles/variables.css` | Local Inter Variable and JetBrains Mono. Buttons use `--font-primary`, matching the registered face. Article prose has a 68ch measure, 16 px minimum size, and stronger heading hierarchy. |
| Brand assets | `public/brett-snyder-portrait*.jpg`, `src/images/portrait/`, Lucide React | Existing approved portrait crops and icon system. Asset-board production remains pending. |
| Layout | `Header`, `Footer`, `Container`, `Section` | Existing components; documentation remains pending. |
| Buttons | `src/components/ui/Button.tsx`, `Button.module.css` | Active gradients, sizes, and state rules override some legacy `--btn-*` variables. |
| Other interactions | `ThemeToggle`, `ResumeButton`, `ListenButton`, `ProjectDetailUniversal`, About FAQ, Tools tabs | Covered in the site-pattern overview; detailed component families remain later work. |
| Glass and ambient motion | `AtmosphericBackground`, `LineRibbons`, `src/styles/components.css`, page CSS | Shared glass hierarchy, moving orbs/ribbons, floating panels, and portrait reveal. |
| Navigation and collections | `Header`, `ToolsPageClient`, `ProjectScripts`, `BlogScripts` | Desktop navigation, mobile drawer, scrolling category tabs, filters, and incremental pagination. |
| Content | `scripts/generate-project-data.js`, `projectLoader`, `EnhancedHTMLContent` | Markdown becomes `overviewHtml` in generated JSON. Native HTML video/iframe elements retain their position. |
| Browser pilot | `src/app/demo/portfolio/components/` | Uses the existing Button and theme context. Specs read computed CSS and update with size, disabled state, and reduced-motion preferences. |

## Export Notes

- FigCraft supplies editable components, variables, prototype links, WebP/SVG boards, PDF, and token data.
- Browser recordings capture the working React component; they are not exports of FigCraft's prototype player.
- FigCraft quotes string values in CSS exports. The handoff CSS normalizes motion durations and easing to valid unquoted CSS values; JSON retains the original variable types.
- The native document retains the prototype wiring. Its animated playback requires a graphical FigCraft review; the CLI export verifies static states, not animated playback.

## Verification

Verified on 2026-11-16 with Next.js 16.4.6: lint, type checking, production build, and the browser check pass. Browser coverage includes both themes at 1200, 390, and 320 pixels; button behavior, responsive embeds, full-size image links, video playback, downloads, mobile navigation, scrolling tabs, and native FAQ disclosures.

The v06 review also checks the loaded Inter font, article readability on an existing project and Blog post, all seven PDF page widths and export edges, and focus-outline resizing after a longer label is applied. The scrolled header uses a 60% theme tint with 25 px backdrop blur. The browser recording and paired homepage captures use the corrected font.

Run a site server, then `node scripts/check-design-system.js [base-url]`. The check exercises the generated article, actual component behavior, themes, responsive embeds, recorded video, and downloads; screenshots go to the system temporary directory.
