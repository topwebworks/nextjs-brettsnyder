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

No active initiative. The prior positioning alignment work is complete and the site reflects Brett's current resume and positioning. This file is the single source for project status and next steps.

## Scope Boundaries

- Preserve the existing design, layouts, navigation, Blog, Projects, themes, and content engines.
- Use the current resume as the source of truth for career facts and supported metrics.
- Make the smallest safe change that satisfies the request.
- Do not add a CMS, backend, authentication, database, CSS framework, or icon library.
- Do not introduce service prices, fast-changing counts, hidden search copy, or unsupported metrics.
