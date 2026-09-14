# Brett Snyder Portfolio

Source code for [brettsnyder.me](https://brettsnyder.me), the portfolio and resume site for Brett Snyder, a Design Engineer and Product-Focused Frontend Developer.

The site presents product, Shopify, CMS, design-system, and marketing web work through Markdown-driven projects and blog posts. It is intentionally static-first so the experience stays fast, portable, and simple to maintain.

## Stack

- Next.js 15 App Router
- React 19 and TypeScript
- CSS Modules and custom CSS
- Markdown with gray-matter frontmatter
- Generated JSON content manifests
- Lucide React icons
- Vercel deployment

## How Content Works

Project and blog content lives in Markdown under `src/app/projects/content/` and `src/app/blog/content/`. The project-data generator processes the Markdown into JSON and creates TypeScript manifests under `src/lib/generated/` for the application to use.

Resume and cover-letter PDFs are generated from their editable source files. Generated PDFs should not be edited directly.

## Local Setup

```bash
npm install
```

Copy `.env.example` to `.env.local`, then start the site:

```bash
npm run dev
```

The local site runs at `http://localhost:3000`.

## Common Commands

```bash
npm run dev                     # Start the local development server
npm run lint                    # Run ESLint
npm run typecheck               # Run TypeScript checks
npm run generate-project-data   # Rebuild project and blog manifests
npm run generate-resume         # Regenerate the resume PDF
npm run generate-cover-letter   # Regenerate the cover-letter PDF
npm run build                   # Generate content and create a production build
```

## Project Structure

```text
src/app/                 Routes, page content, and page styles
src/components/          Shared layout and interface components
src/app/projects/content Project case studies and project media
src/app/blog/content/    Blog posts and blog media
src/lib/generated/       Generated content manifests
scripts/                 Content and document generation scripts
public/                  Static assets and application documents
docs/                    Product direction, current plan, and technical references
```

## Working Principles

- Preserve the established visual design and responsive layout.
- Prefer small, evidence-based changes over unnecessary systems.
- Keep public claims consistent with the resume and visible project evidence.
- Maintain semantic markup, keyboard support, reduced-motion support, and useful alternative text.
- Keep content portable through Markdown and generated static data.

## Documentation

- [Product direction](docs/northstar.md)
- [Current build plan](docs/build-plan.md)
- [Positioning alignment plan](docs/positioning-refresh-plan.md)
- [Media shortcode reference](docs/MEDIA-SHORTCODE-REFERENCE.md)
