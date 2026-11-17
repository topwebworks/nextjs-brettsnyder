# Portfolio Design System: Build Outline

## Goal

Document the existing portfolio as an editable design system in FigCraft, presented inline in its Markdown case study through native exports and working component demos on Vercel.

## Authoring & Publishing

- Create and edit all design pages, components, and prototypes in FigCraft. Keep the `.figcraft` document as the master.
- Keep authoring-software names out of public case-study copy, tags, and exported board labels. Credit Brett and describe the system itself.
- Export WebP/SVG boards, a PDF overview, and JSON/CSS tokens directly from FigCraft.
- Keep the existing project story concise and place foundations, components, screens, and motion examples inline beside their explanations. Add enlargement or modal viewing only where a detailed board needs it.
- Reuse the site's React components for interactive browser demos. FigCraft can generate layer code in HTML/React/CSS, but the installed CLI has no standalone animated prototype export; browser behavior needs implementation.
- Host the public boards, downloads, and demos with the Vercel site. FigCraft supplies the editable design source and local prototype preview.

## Inline Content Workflow

- Author the case study in `src/app/projects/content/personal-portfolio/project.md`; keep exported board images beside it and use standard Markdown image syntax.
- Put recordings in `public/demo/portfolio/` and reference them with HTML `<video>` elements. Embed interactive demos with titled `<iframe>` elements pointing to same-site demo routes that reuse the actual React components.
- Run `npm run generate-project-data`. The existing converter preserves the inline HTML in `content.overviewHtml`; the project loader and renderer display it in document order.
- Add shared responsive video/iframe styling and build the demo routes during the pilot. Curate `media.items` so the top gallery complements the inline figures.
- Keep generated JSON as build output. This approach uses the existing Markdown/JSON flow; live React runs inside the demo route.

## Working Rules

- Preserve the current visual direction, content, and site behavior.
- Use the rendered site and current code as evidence. Keep decisions and outcomes factual; describe the system in present tense.
- Map design names to source files and CSS variables. Flag proposed tokens and improvements separately.
- Build working component prototypes in FigCraft. Keep motion purposeful and consistent; label new motion explorations for review before site implementation.
- Work through one stage at a time. Review each stage before continuing.
- Keep native design files and exports in the client job workspace. Keep project status in [build-plan.md](build-plan.md).

## Stages and FigCraft Pages

| Stage | Page | Deliverable |
| --- | --- | --- |
| 0 | Setup | Inventory routes, assets, active styles, and components. Validate one component's FigCraft prototype, WebP/SVG board, and JSON/CSS token exports. Test the board, a recording, and a matching React demo inline through Markdown generation and browser rendering before scaling. |
| 1 | Brief & Structure | Audience, portfolio goals, constraints, sitemap, primary visitor paths, and low-fidelity wireframes of the existing layouts. |
| 2 | Assets & Brand | Approved identity, portrait crops, project imagery, Lucide icons, and asset usage rules. |
| 3 | Foundations & Tokens | Color primitives and semantic roles; light/dark modes; typography, spacing, sizing, radii, borders, shadows, glass effects, and layout. Define motion durations, easing, transition types, and reduced-motion alternatives. |
| 4 | Components | Editable components with auto layout, properties, variants, and supported states: buttons, navigation, theme toggle, cards, tabs, FAQ, gallery controls, and Listen control. Include a playable prototype beside each interactive component and map it to its implementation. |
| 5 | Patterns & Templates | Hero, timeline, card collections, shared detail layout, gallery, article content, and footer. Document composition and responsive rules. |
| 6 | Screens | Assemble Home, Projects, Blog, a shared detail example, About, and Tools from the system. Cover desktop, mobile, both themes, and meaningful intermediate layouts. |
| 7 | Motion & Prototypes | Create a component playground and connected page flows. Demonstrate hover/press feedback, state changes, navigation, and transitions. Annotate keyboard behavior, focus, reduced motion, and responsive changes; distinguish simulated behavior from browser behavior. |
| 8 | Handoff & Presentation | Token/component source mappings, usage notes, short rationale, verified observations, selected system boards, PDF, and token exports. Refine the project story and place the system evidence and matching demos inline in the case study. |

## Prototype Set

- Buttons and cards: hover, press, focus, and selected feedback where applicable.
- Navigation, tabs, and FAQ: menu transitions, active indicators, and expand/collapse.
- Theme toggle and gallery: theme changes, image crossfades, and thumbnail selection.
- Listen control: feedback for its supported playback states.
- Page flows: card-to-detail transitions, previous/next navigation, and restrained hero/background motion.

Record each interaction's trigger, start/end states, duration, easing, and reduced-motion alternative. Use FigCraft's supported animation tools; verify actual playback before presenting it.

## Completion Check

- Screens use shared components and styles or variables; exceptions are documented.
- Compare rendered design screens with the running site at matching widths and themes.
- Compare FigCraft prototype playback with the browser demos. Verify state changes, motion timing, themes, and reduced-motion alternatives.
- Verify inline media on desktop and mobile, including iframe sizing, playback controls, keyboard access, theme behavior, and downloads. Check focus and dismissal for any optional enlargement modal.
- Present real decisions and supported outcomes without inventing research, chronology, or metrics.

## Next Step

The Portfolio case-study presentation is approved; see [the source inventory](design-system-inventory.md). Continue with the remaining projects, newest first by publish date, using the same Markdown and inline visual workflow. Follow [the main build plan](build-plan.md) for the next case.
