# Brett Snyder Portfolio - Codex Instructions

## Read Order
1. `docs/build-plan.md`
2. `docs/northstar.md`
3. `c:\Users\topwe\OneDrive\Apps\remotely-save\My KB\docs\agent-operating-system.md`
4. `c:\Users\topwe\OneDrive\Apps\remotely-save\My KB\projects\brettsnyder\Current state.md`
5. `c:\Users\topwe\OneDrive\Apps\remotely-save\My KB\projects\brettsnyder\Decision log.md`

## Cross-Agent Rules
- Codex and Claude Code alternate on this repo.
- Keep `AGENTS.md` and `CLAUDE.md` identical except for skill syntax.
- Before stopping, update `docs/build-plan.md` if phase, next tasks, or direction changed.
- Distill durable project-level insight into KB project notes first. Use `memory.md` only when the insight matters across the whole vault.

## Skills Rhythm
- `@ponytail` is auto-active every coding session (full mode). Do not disable it.
- Run `@ponytail-review` after adding a feature or making meaningful code changes.
- Run `@ponytail-audit` at the start of a new build phase, not every session.
- Do not invoke ponytail for blog content, copy, or config-only changes.
## Project-Specific Rules
- CSS Modules and existing custom CSS only - no Tailwind or new CSS frameworks.
- No inline styles.
- Follow existing component patterns before creating new ones.
- Content stays in Markdown files.
- After content file changes, run `npm run generate-project-data`.
- Resume changes: edit `public/resume-brett-snyder.html`, then run `npm run generate-resume` - never edit the PDF directly.

## Token Discipline
- Read only the files needed for the current task.
- Do not scan the whole repo unless explicitly asked.
- Ask before reading more than 5 files.
- Ignore `node_modules`, `.next`, `build`, `dist`, lock files, and generated files.
- Keep explanations brief. Make the smallest safe change.

## Compact Instructions
When compacting, preserve: current task, any content or CSS decisions made this session, file paths changed, and hard boundaries. Drop: full file contents already read, tool output, and intermediate reasoning.

## Hard Boundaries
- No backend, auth, or database features.
- No CMS integration unless explicitly requested.
- No new icon libraries - use existing Lucide React.
