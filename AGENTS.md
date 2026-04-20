# Brett Snyder Portfolio - Codex Instructions

## Read Order
1. `docs/handoff.md` if it exists
2. `docs/build-plan.md`
3. `docs/northstar.md`
4. `c:\Users\topwe\OneDrive\Apps\remotely-save\My KB\docs\agent-operating-system.md`
5. `c:\Users\topwe\OneDrive\Apps\remotely-save\My KB\projects\brettsnyder\Current state.md`
6. `c:\Users\topwe\OneDrive\Apps\remotely-save\My KB\projects\brettsnyder\Decision log.md`

## Cross-Agent Rules
- Codex and Claude Code alternate on this repo.
- Keep `AGENTS.md` and `CLAUDE.md` identical except for skill syntax.
- Before stopping, update `docs/build-plan.md` if phase, next tasks, or direction changed.
- Run `$handoff` when switching agents or ending meaningful work.
- Distill durable project-level insight into KB project notes first. Use `memory.md` only when the insight matters across the whole vault.

## Local Skill
- `$handoff` is the only required repo-local skill.
- The rest of the operating flow now lives in `c:\Users\topwe\OneDrive\Apps\remotely-save\My KB\docs\agent-operating-system.md`.

## Project-Specific Rules
- CSS Modules and existing custom CSS only - no Tailwind or new CSS frameworks.
- No inline styles.
- Follow existing component patterns before creating new ones.
- Content stays in Markdown files.
- After content file changes, run `npm run generate-project-data`.
- Resume changes: edit `public/resume-brett-snyder.html`, then run `npm run generate-resume` - never edit the PDF directly.

## Hard Boundaries
- No backend, auth, or database features.
- No CMS integration unless explicitly requested.
- No new icon libraries - use existing Lucide React.
