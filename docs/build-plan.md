# Brett Snyder Portfolio — Build Plan

## Stack
Next.js 15 (App Router), TypeScript, CSS Modules + custom CSS, Markdown + gray-matter (content), Lucide React (icons), Vercel (deployment)

## Features (Complete)
- Homepage with work history, intro, CTAs
- Blog (Markdown-driven, `/blog/[slug]`)
- Projects showcase (Markdown-driven, `/projects/[slug]`)
- Tools/stack page (`/tools`)
- About page (`/about`)
- Resume HTML/PDF download flow (`public/resume-brett-snyder.html`, `public/resume-brett-snyder.pdf`)
- Media shortcode system for rich project descriptions (see `docs/MEDIA-SHORTCODE-REFERENCE.md`)
- Auto-generated content manifests (`src/lib/generated/`)
- Automated resume PDF generation (`npm run generate-resume`)

## Content Workflow
- Add blog post: create Markdown file → run `npm run generate-project-data`
- Add project: create Markdown file + media → run `npm run generate-project-data`
- Update resume: edit `public/resume-brett-snyder.html` → run `npm run generate-resume`

## Phase — Current: Maintenance & Content
No major features planned. Work is adding new blog posts, new projects, and keeping resume current.

## Deferred
- CMS integration — not needed, Markdown works fine
- Any backend, auth, or database features
- Native mobile app

## Legacy Cleanup
<!-- populated by /update-docs when direction changes -->
