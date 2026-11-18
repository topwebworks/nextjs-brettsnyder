# Master email design system

Source: `src/app/projects/content/email/project.md` and the HTML/asset archives in `public/demo/emails/`.

The master is AOP Fluid Responsive Email Template v2.2.8. Its shared styles are literal inline CSS, table attributes and repeated values, not CSS custom properties. The optional Typekit script is commented out; the browser preview uses the font fallback. Brand recipes come from the source comments. Kent State and UF Online are separate Pearson custom builds.

Repaired 42 image references representing 17 distinct remote URLs in `master-email/index.html`. Existing local assets replace old S3 image paths. `hero.jpg` replaces the wide placeholder URLs; `square-image.jpg` replaces square placeholder sizes. Relative paths preserve the archive's portability and work on Vercel. The two Pearson samples already had valid local images.

Public assets: six inline WebP boards, `design-system-tokens.json` and `email-system-notes.pdf`. The three original gallery images remain. Editable source includes style aliases, a live-text CTA, a layered image/content row and the original assets. Documentation aliases are explicitly labelled; they do not imply a different historical implementation.

Archive checks passed at 1200, 390 and 320 px for all three demos: every image loaded, no horizontal overflow and no page errors. A separate 390 px check removed head CSS. The subsequent [code review](legacy-demo-review.md) added presentational table semantics, decorative alt text and archive metadata while preserving inline/Outlook layout rules. These are browser checks, not delivered email-client testing. No messages were sent and no preference links were used.

All six final PDF pages were reviewed: consistent 1280-point widths, embedded fonts and no document warnings. Both portfolio themes passed at 1200, 390 and 320 px with six distinct boards, working downloads and no overflow. Generated data, lint, typecheck and build passed. No new conversion, delivery or current compatibility claims are made. Native source and evidence belong to the Brett Snyder client job.
