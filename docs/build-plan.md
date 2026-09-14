# Brett Snyder Portfolio: Build Plan

## Stack

Next.js 15 App Router, React 19, TypeScript, CSS Modules, custom CSS, Markdown, gray-matter, marked, Lucide React, and Vercel.

## Implemented Foundation

- Responsive homepage with work history, introduction, and calls to action.
- Markdown-driven Projects and Blog routes.
- Generated JSON content and TypeScript manifests.
- Universal detail-page template with inline images and media galleries.
- About and Tools pages.
- Light and dark themes with reduced-motion support.
- Editable resume and cover-letter sources with automated PDF generation.

## Content Workflow

- Add or edit a project in `src/app/projects/content/`, then run `npm run generate-project-data`.
- Add or edit a Blog post in `src/app/blog/content/`, then run `npm run generate-project-data`.
- Edit `public/resume-brett-snyder.html`, then run `npm run generate-resume`.
- Edit `public/cover-letter-brett-snyder.txt`, then run `npm run generate-cover-letter`.
- Never edit generated JSON, TypeScript manifests, or PDFs directly.

## Current Phase

Phases 0 and 2 of the approved [positioning alignment plan](positioning-refresh-plan.md) are complete. Phase 1 search work is next. This file is the single source for project status and next steps.

## Approved Implementation Order

1. Public repository documentation.
2. Homepage content alignment and the approved small icon-button treatment.
3. Crawlable HTML, metadata, sitemap, robots, canonicals, and structured data.
4. CyWire, AMW Hardscape, TopWebWorks, Shopify, and supporting project content.
5. Remaining About and Tools copy alignment.
6. Full functional, visual, content, and search verification.

Each phase stops for review before the next phase begins.

## Scope Boundaries

- Preserve the existing design, layouts, navigation, Blog, Projects, themes, and content engines.
- Use the current resume as the source of truth for career facts and supported metrics.
- Make the smallest safe content, metadata, schema, or CSS change that satisfies the approved plan.
- Do not add a CMS, backend, authentication, database, CSS framework, or icon library.
- Do not introduce service prices, fast-changing counts, hidden search copy, or unsupported metrics.

## Tracked Alignment Work

- Make the existing page content available in the initial HTML response without changing theme behavior.
- Replace generic metadata and add the missing search-discovery files and structured data.
- Replace the homepage Blog preview with the two latest projects using the existing card design.
- Update homepage work history and positioning copy to include current Cosaint work.
- Improve the small homepage section-heading icon buttons with the existing outlined treatment.
- Update stale About content without changing its layout.
- Update CyWire, TopWebWorks, Shopify, and Master Blocks content through the existing project workflow.
- Add AMW Hardscape through the existing project workflow.
- Replace the fast-changing CyWire prompt total with evergreen wording when the resume is next approved and regenerated.
- Refresh the personal-portfolio case study's launch-era statements and complete a targeted spelling and metadata pass across existing Markdown content.
- Confirm that the Master Blocks Figma link is publicly accessible when that project content is updated.
- Fix the hardcoded mobile copyright year.
