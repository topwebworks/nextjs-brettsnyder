# Brett Snyder Portfolio: Build Plan

## Stack

Next.js 16 App Router, React 19, TypeScript, CSS Modules, custom CSS, Markdown, gray-matter, marked, Lucide React, and Vercel.

## Implemented Foundation

- Responsive homepage with work history, introduction, and calls to action.
- Markdown-driven Projects and Blog routes.
- Generated JSON content and TypeScript manifests.
- Universal detail-page template with inline images and media galleries. Hero images fill the gallery width at their natural proportions; gallery swaps fade in, respecting reduced motion.
- Detail pages open with an "All projects" or "All posts" link plus Previous and Next in list order. Previous and Next become icon-only 44px buttons at 480px and below, and the button for a missing neighbor is hidden at the ends of the list. Previous/Next slide the content below the header in the direction of travel (shared view-transition name `detail-content`, transition types `detail-prev` / `detail-next`).
- Keyboard-accessible gallery thumbnails with a visible selected state. Left and Right arrows select the previous or next thumbnail, load it into the hero, and scroll the strip to keep it in view.
- Shared-element view transitions: a `/projects` or `/blog` card image morphs into the detail hero via React `<ViewTransition>`, named `project-<id>` or `blog-<id>`. The morph runs only for card clicks (Link `transitionTypes={['card-to-hero']}`). Browser Back stays instant because React renders it synchronously for scroll restoration. The first hero image skips its fade so the morph lands on an opaque image.
- About and Tools pages. Tools opens with a "Tools I Use" H1, and all four tab panels are in the HTML (inactive ones `hidden`), so every tool is crawlable. About ends with a "Questions" FAQ: native `<details>` items with a 250ms open animation where the browser supports it. Questions live in `src/app/about/faq.ts`, which also feeds the page's `FAQPage` JSON-LD, so the visible text and the structured data stay identical. Add a question by adding an entry there.
- Listen button (`src/components/ui/ListenButton.tsx`, ported from Top Web Works) reads text aloud with the browser's built-in speech and a curated voice picker. The shared detail template places it beside the category on every Project and Blog page. It also sits under the About heading and reads the personal story.
- Light and dark themes with reduced-motion support. Dark is the default for new visitors regardless of OS setting. A visitor's saved choice (`localStorage` key `theme`) is applied by an inline script in the layout before first paint.
- Homepage and About profile markup share Brett's identity and portrait. The shared `Person` record in `src/lib/profile.ts` carries his employer (Cosaint, Inc. and TopWebWorks), skills, and city (Queen Creek, AZ, matching the public resume) to tell him apart from other Brett Snyders. The homepage H1 opens with his name in the badge style above the typed role. Visible portrait images, social metadata, and image sitemap entries use the named public portrait; search metadata permits large image previews.
- Editable resume and cover-letter sources with automated PDF generation.
- Search and AI discovery:
  - Every page sets its own Open Graph image. Detail pages use their hero, and other pages use `shareImage` from `src/lib/profile.ts`. A page's `openGraph` replaces the layout's, so each page must pass an image.
  - Twitter tags fall back to Open Graph.
  - Project and Blog JSON-LD credit the shared `Person` entity (`/#person`) as author and include dates plus a `BreadcrumbList`.
  - The bottom summary card (`keyAchievements`) feeds JSON-LD `abstract`, the tags feed `keywords`, and CyWire's metrics feed `featureList`. The card is a `<section>` inside the main article, and its metric bullets appear under each `/llms.txt` entry. FAQs stay on About only.
  - The sitemap carries content dates.
  - `/llms.txt` is built from the content loaders at build time.

## Content Workflow

- Add or edit a project in `src/app/projects/content/`, then run `npm run generate-project-data`.
- Add or edit a Blog post in `src/app/blog/content/`, then run `npm run generate-project-data`.
- After a meaningful revision to a project or post, add or update `updatedDate: "YYYY-MM-DD"` in its frontmatter. It feeds `dateModified`, Open Graph `modified_time`, and the sitemap `lastmod`. Without it, those fall back to `publishDate`.
- Edit `public/resume-brett-snyder.html`, keep `public/resume-brett-snyder.txt` in sync, then run `npm run generate-resume`.
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
