# Brett Snyder Portfolio: Agent Instructions

## Read Order

1. `docs/build-plan.md`
2. `docs/northstar.md`

## Shared Workflow

- Codex and Claude Code may alternate on this repository.
- Keep `AGENTS.md` and `CLAUDE.md` aligned except for tool-specific skill syntax.
- Preserve user changes and inspect the current diff before editing overlapping files.
- Use `docs/build-plan.md` as the single source for the current phase, next task, and implementation status.
- Keep project decisions in repository documentation. Do not add private notes, credentials, or workstation-specific instructions.
- Make the smallest safe change that satisfies the approved plan.

## Skills Rhythm

- `@ponytail` is active during coding sessions in full mode.
- Run `@ponytail-review` after a feature or meaningful code change.
- Run `@ponytail-audit` only at the start of a new build phase that changes code structure.
- Do not invoke Ponytail for Blog content, copy, documentation, or configuration-only changes.

## Project Rules

- Use CSS Modules and the existing custom CSS. Do not add Tailwind or another CSS framework.
- Do not use inline styles.
- Follow existing component patterns before creating a new component.
- Keep project and Blog content in Markdown.
- Run `npm run generate-project-data` after content changes.
- Edit `public/resume-brett-snyder.html`, then run `npm run generate-resume` for resume changes. Never edit the generated PDF directly.
- Edit `public/cover-letter-brett-snyder.txt`, then run `npm run generate-cover-letter` for cover-letter changes. Never edit the generated PDF directly.
- Preserve the existing visual design, layouts, navigation, themes, Blog, Projects, and content engines during the positioning alignment.

## Verification

- Match verification to the risk of the change.
- Use `npm run lint`, `npm run typecheck`, and `npm run build` for application changes.
- Confirm generated content is current after Markdown changes.
- Check light and dark themes and relevant responsive widths after visual changes.
- Keep public documentation accurate, portable, and consistent with implemented behavior.

## Hard Boundaries

- No backend, authentication, or database features.
- No CMS integration unless explicitly requested.
- No new icon libraries. Use the existing Lucide React dependency.
- No redesign or replacement of working site systems during the positioning alignment.
