# Brett Snyder Portfolio — Codex Instructions

## Reference Documents
Read before every build task — live source of truth:
- `docs/northstar.md` — mission, audience, non-negotiables
- `docs/build-plan.md` — stack, features, content workflow

---

## Skills — When to Use Them

Global skills are available in every session. Suggest the right one proactively — do not wait to be asked.

| Skill | Use when |
|-------|----------|
| `$start [task]` | Before writing any code for a new task, page, or feature |
| `$checkpoint` | Mid-task when something feels off or scope has grown |
| `$review-page [feature]` | Before marking any page or feature complete |
| `$debug [problem]` | Something is broken and the cause is not obvious |
| `$update-docs [what changed]` | Direction, scope, or approach has changed |
| `$health` | After a batch of features, or when starting a new phase |

**Proactive prompts — use without being asked:**
- User describes a new task → suggest `$start` before proceeding
- Scope has expanded or work has gone long → suggest `$checkpoint`
- Feature declared done → suggest `$review-page` before moving on
- Error appears → suggest `$debug` for systematic diagnosis
- Direction change mentioned → suggest `$update-docs` before continuing
- Batch of features done or phase boundary reached → suggest `$health`

---

## Design Rules
- CSS Modules + custom CSS only — no Tailwind, no new CSS frameworks
- No inline styles
- Follow existing component patterns — check `src/components/` before creating anything new
- Performance first — optimise images, no unnecessary dependencies

## Content Rules
- All blog and project content lives in Markdown files
- After adding or modifying content files, run `npm run generate-project-data` to rebuild manifests
- Resume changes: edit `public/resume-brett-snyder.html` then run `npm run generate-resume` — never edit the PDF directly
- Media in project descriptions uses shortcode syntax — see `docs/MEDIA-SHORTCODE-REFERENCE.md`

## Hard Boundaries
- No backend, no auth, no database — this is a static content site
- No CMS integration
- No new icon libraries — Lucide React is already installed
