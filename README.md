# Brett Snyder Portfolio

Static-first portfolio site for Brett Snyder, built with Next.js 15, TypeScript, CSS Modules, and Markdown-driven content.

## Stack

- Next.js 15 App Router
- TypeScript
- CSS Modules and custom CSS
- Markdown with gray-matter
- Lucide React
- Vercel deployment

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content Workflow

### Add or update a project

1. Edit or add files under `src/app/projects/content/<slug>/`
2. Update `project.md`
3. Run `npm run generate-project-data`

### Add or update a blog post

1. Edit or add files under `src/app/blog/content/<slug>/`
2. Update `blog.md`
3. Run `npm run generate-project-data`

### Update the resume

1. Edit `public/resume-brett-snyder.html`
2. Run `npm run generate-resume`

Do not edit `public/resume-brett-snyder.pdf` directly.

## Common Commands

```bash
npm run dev
npm run generate-project-data
npm run generate-resume
npm run build
npm run lint
```

`npm run build` runs the content generator and resume generator first via `prebuild`.

## Environment Notes

- Copy values from `.env.example` into `.env.local`
- `NEXT_PUBLIC_SHOW_RESUME=false` hides resume entry points across the site
- GTM, contact, site URL, and other public settings are read from environment variables

## Project Notes

- This is a static content site: no backend, auth, database, or CMS
- Reusable UI lives in `src/components/`
- Generated manifests live in `src/lib/generated/`
- Media shortcode usage is documented in `docs/MEDIA-SHORTCODE-REFERENCE.md`
