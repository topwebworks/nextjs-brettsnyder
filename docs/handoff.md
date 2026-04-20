# Handoff Snapshot
Last updated by: Claude Code
Date: 2026-04-14

## Completed (Prior Sessions)
- Full portfolio site live: home, blog, projects, tools, about, resume
- Markdown-driven blog and project content with gray-matter frontmatter
- Auto-generated content manifests (`src/lib/generated/`) via `npm run generate-project-data`
- Resume HTML + automated PDF generation (`npm run generate-resume`)
- Media shortcode system for rich project descriptions (`docs/MEDIA-SHORTCODE-REFERENCE.md`)
- Vercel deployment live

## In Progress
Task: None — site in content maintenance phase
Status: All features complete
Resume at: Add new blog posts or project entries per Content Workflow in build-plan.md
Blocker: none

## Up Next
1. Add new blog posts (Markdown in content/blog/)
2. Add new project entries (Markdown + media in content/projects/)
3. Keep resume current — edit HTML, run generate-resume

## Decisions Made
- CSS Modules + existing custom CSS only — no Tailwind or new frameworks introduced
- Markdown is the CMS — no external CMS integration needed
- `public/resume-brett-snyder.pdf` is always generated, never edited directly

## Build Status
- npm run build: passes (Vercel live)
- Known issues: none

## Notes for Next Agent
- `docs/archive/` contains legacy session docs — do not treat as active plans
- After any content file change run `npm run generate-project-data` before committing
- Never edit the PDF directly — always edit the HTML source and regenerate
