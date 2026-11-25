# Brett Snyder Portfolio: Build Plan

## Stack

Next.js 16 App Router, React 19, TypeScript, CSS Modules, custom CSS, Markdown, gray-matter, marked, Lucide React, and Vercel.

## Implemented Foundation

- Responsive homepage with work history, introduction, and calls to action.
- Markdown-driven Projects and Blog routes.
- Generated JSON content and TypeScript manifests.
- Universal detail-page template with inline images and media galleries. Hero images fill the gallery width at their natural proportions; gallery swaps fade in, respecting reduced motion.
- Landscape hero videos retain 16:9 at all widths. A video media item can supply a local `poster`; its accessible play preview loads the original YouTube player on activation. Markdown can opt into a full-section viewer with `a[data-section-gallery]`. The native dialog scrolls, supports keyboard dismissal/focus return, and keeps its image static at a maximum 1438 px width.
- Detail pages open with an "All projects" or "All posts" link plus Previous and Next in list order. Previous and Next become icon-only 44px buttons at 480px and below, and the button for a missing neighbor is hidden at the ends of the list. Previous/Next slide the content below the header in the direction of travel (shared view-transition name `detail-content`, transition types `detail-prev` / `detail-next`).
- Keyboard-accessible gallery thumbnails with a visible selected state. Left and Right arrows select the previous or next thumbnail, load it into the hero, and scroll the strip to keep it in view.
- Shared-element view transitions: a `/projects` or `/blog` card image morphs into the detail hero via React `<ViewTransition>`, named `project-<id>` or `blog-<id>`. The morph runs only for card clicks (Link `transitionTypes={['card-to-hero']}`). Browser Back stays instant because React renders it synchronously for scroll restoration. The first hero image skips its fade so the morph lands on an opaque image.
- About and Tools pages. Tools opens with a "Tools I Use" H1, and all four tab panels are in the HTML (inactive ones `hidden`), so every tool is crawlable. About ends with a "Questions" FAQ: native `<details>` items with a 250ms open animation where the browser supports it. Questions live in `src/app/about/faq.ts`, which also feeds the page's `FAQPage` JSON-LD, so the visible text and the structured data stay identical. Add a question by adding an entry there.
- Listen button (`src/components/ui/ListenButton.tsx`, ported from Top Web Works) reads text aloud with the browser's built-in speech and a curated voice picker. The shared detail template places it beside the category on every Project and Blog page, and listing cards show a small speaker icon after the date as a hint. It also sits under the About heading and reads the personal story.
- Light and dark themes with reduced-motion support. Dark is the default for new visitors regardless of OS setting. A visitor's saved choice (`localStorage` key `theme`) is applied by an inline script in the layout before first paint.
- Homepage and About profile markup share Brett's identity and portrait. The shared `Person` record in `src/lib/profile.ts` carries his employer (Cosaint, Inc. and TopWebWorks), skills, and city (Queen Creek, AZ, matching the public resume) to tell him apart from other Brett Snyders. The homepage H1 opens with his name in the badge style above the typed role. Visible portrait images, social metadata, and image sitemap entries use the named public portrait; search metadata permits large image previews.
- The current portrait has 9:16, 3:4, and square exports in `public/`. The 3:4 version at `brett-snyder-portrait.jpg` supplies the desktop homepage, About, and social metadata; the mobile homepage avatar uses `brett-snyder-portrait-square.jpg`. The uploaded source is kept at `src/images/portrait/professional-portrait.jpg`.
- Editable resume and cover-letter sources with automated PDF generation.
- Search and AI discovery:
  - Every page sets its own Open Graph image. Detail pages use their hero, and other pages use `shareImage` from `src/lib/profile.ts`. A page's `openGraph` replaces the layout's, so each page must pass an image.
  - Twitter tags fall back to Open Graph.
  - Project and Blog JSON-LD credit the shared `Person` entity (`/#person`) as author and include dates plus a `BreadcrumbList`.
  - The bottom summary card (`keyAchievements`) feeds JSON-LD `abstract`, the tags feed `keywords`, and CyWire's metrics feed `featureList`. The card is a `<section>` inside the main article, and its metric bullets appear under each `/llms.txt` entry. FAQs stay on About only.
  - The sitemap carries content dates.
  - `/llms.txt` is built from the content loaders at build time.
  - The `Person` record also lists custom AI features, hosting and maintenance, branding, and print design, and the About FAQ names the full TopWebWorks range (added 2026-11-22). The homepage `WebSite` carries `alternateName`. Experience claims stay at the resume's 15+ years; TopWebWorks alone uses 30+ years in marketing.
  - IndexNow key: `public/51e022182b8eacc762b429f76d86170d.txt`. After content deploys, POST changed URLs (host `www.brettsnyder.me`) to https://api.indexnow.org/indexnow so Bing recrawls.

## Recommendations and Review Proof

Lead with Brett Snyder's [22 LinkedIn recommendations](https://www.linkedin.com/in/topwebworks) from clients and colleagues. Top Web Works' 5 stars on Google provide supporting business proof; attribute that rating to the studio. Do not promote Yelp or emphasize the Google review count. Keep the homepage, About FAQ, metadata, Person/Organization descriptions, and `/llms.txt` consistent. Maintain the recommendation count and Google rating manually. Brett confirmed the updated count and emphasis on 2026-11-25.

## Content Workflow

- Add or edit a project in `src/app/projects/content/`, then run `npm run generate-project-data`.
- Add or edit a Blog post in `src/app/blog/content/`, then run `npm run generate-project-data`.
- After a meaningful revision to a project or post, add or update `updatedDate: "YYYY-MM-DD"` in its frontmatter. It feeds `dateModified`, Open Graph `modified_time`, and the sitemap `lastmod`. Without it, those fall back to `publishDate`.
- Edit `public/resume-brett-snyder.html`, keep `public/resume-brett-snyder.txt` in sync, then run `npm run generate-resume`.
- Edit `public/cover-letter-brett-snyder.txt`, then run `npm run generate-cover-letter`.
- Never edit generated JSON, TypeScript manifests, or PDFs directly.

## Current Phase: Local SEO, AEO, and GEO

Approved on 2026-11-25: implement all seven East Valley city pages: Queen Creek, Gilbert, Chandler, Tempe, San Tan Valley, Mesa, and Apache Junction. Use the About layout and existing CSS Modules for dedicated top-level pages, separate from Projects and Blog. City navigation belongs near the footer copyright, with the copyright retained.

Position Brett's individual web design, Next.js/React, Shopify/Liquid, frontend, and design-system expertise for freelance and contract inquiries. Keep both platforms established and equally visible. Preserve the homepage's hiring/remote audience, all existing routes/titles, project/blog content, and PDF bytes. Attribute enterprise work accurately and use the real Queen Creek base for every city. Link relevant case studies and articles; do not assign those employers or clients a fictional city location. Use direct portfolio email/resume contact; TWW's managed website and marketing plans remain a distinct linked option. Keep prices out of the portfolio.

SEO/AEO/GEO: descriptive metadata, crawlable content, useful buyer FAQs, consistent Person/Service identity, truthful areas served, sitemap/internal links, and generated llms.txt. Use 22 LinkedIn recommendations and attribute Google stars to Top Web Works. Explain search foundations through factual evidence, without promising rankings or AI citations.

Baseline: docs/seo-baseline-2026-11-25.json records all 22 live sitemap URLs and existing PDF hashes. Check original metadata/content preservation, all new pages, FAQ/schema agreement, email/resume links, and dark/light responsive rendering. Run lint, typecheck, production build, and explicit local SEO checks. Keep development checks excluded from Vercel; retain required project-data and PDF generation. After publication, use the signed-in portfolio GSC, update IndexNow, and monitor complete reporting periods.

Implementation and local verification complete. All seven pages are statically generated with a shared server-rendered About-style view; the phone layout leads with the city headline and direct contact. The footer links all seven cities and retains copyright.

Validation: lint, typecheck, production build, 29-page SEO/content preservation, and 42 city/theme/viewport combinations pass. Native FAQ controls, resume preview opening/closing, and the city footer were checked. All 22 original titles and original project/blog/page main content remain, apart from the approved Home/About trust and FAQ changes. The existing resume and cover-letter PDFs were restored byte-for-byte after the required local generation. All 19 production file traces contain zero tests or baseline fixtures. The local check is explicitly excluded by .vercelignore; build/install/deployment hooks contain no development tests.

GSC pre-release baseline: selected last three months show 38 web clicks, 571 impressions, and 15 Google Generative AI feature impressions. The reported name query accounts for 33 clicks; remaining clicks cannot all be assigned to disclosed queries. Raw web and AI exports and observations are in docs/seo-gsc-baseline-2026-11-25/. These are existing results, not outcomes of the new city pages. Preserve broad hiring/product content while measuring the new local-client intent.

Published on 2026-11-25 through the existing main-branch Vercel connection. Implementation commit: 6d29a84; deployment: dpl_BZEnKJh8W6vfXPzGuChoWNpm5pzX (Ready). Public checks confirmed all seven city pages return 200 with the expected copy, all 22 original URLs remain in the 29-URL sitemap, and both public PDFs retain their original bytes. Requests using Googlebot, Bingbot, and OAI-SearchBot user agents received the page content; local test/fixture URLs return 404. Vercel logs show required generation and next build, with no development test execution. Pre-release rollback reference: dpl_FtvKxprE8sgMVPrhfu6ozLR6YDca.

Discovery: Google accepted the resubmitted sitemap and IndexNow accepted nine URLs (HTTP 200: Home, About, and all seven cities). GSC already lists Queen Creek as discovered through the sitemap, currently not indexed. Its manual indexing request reached Google's daily quota, so it was not queued; stop further manual requests until the quota resets. Retry Queen Creek/Gilbert after reset if needed. All city pages are discoverable through the sitemap and footer links. No immediate ranking or index-inclusion claim is made.

Implementation is complete. Remaining work is normal discovery/indexing follow-up and measurement: monitor weekly and compare complete 28-day periods after recrawling. The first full post-release window is November 26 through December 23, allowing for reporting delay. Use the saved daily chart to compare the matching pre-release period and distinguish city/client intent from existing branded/hiring visibility.

## Prior Presentation Status

Design Systems blog revision is awaiting Brett's visual approval. Keep the original hero. The illustrated Google Flow pipeline, accepted by Brett on 2026-11-18, shows Brand → Figma → Tokens → Components → Working components → Modular library. It matches the other inline images at a maximum 800 px width. The article uses actual campaign and site captures, the portfolio's shared React component and recordings of the original Master Blocks and production AOP tabs. White presentation boards and the reconstructed Shopify browser study are removed from this blog.

Source excerpts come from the portfolio CSS, shared AOP stylesheet and local `MKTG-tabs-block.liquid`. Most web style tokens use `:root` CSS variables; distinguish those shared values from component and section overrides. Keep theme snapshots distinct from current storefront code. Recordings retain the original icons, styling and handlers; do not invent replacements. The diagram explains a build sequence, rather than claiming historical Figma artifacts exist for every example. Preserve client-design credits, the 40% production-time result and the distinction between email constants and web variables.

Email chronology: the custom Pearson campaigns predate the master template, which was used for AOP emails. The blog links the two stages separately and uses the original AOP sheet (1768 × 1080 px). Brett separately authorized Email and Print updates on 2026-11-18. Their matching high-resolution images are restored; Email also receives the corrected chronology, original Bradley design/HTML evidence and an original-layout comparison. Print receives selected identity, editorial, campaign and illustration work.

Keep this revision for review before publication. Email and Print are authorized now; changes to the other project presentations remain deferred. Use original artwork, source code and working examples, following the approved Portfolio project. Other blogs remain separate work. Sources and versioned exports are retained in client jobs `BST_261118_design-systems-blog` and `BST_261118_portfolio-archive`.

Archive review: the [shortlist](portfolio-archive-shortlist.md) identifies matching Email/Print originals and Pearson design/HTML examples. Brett prefers recent work for hiring, so do not add RioCompass to the project grid. Keep its older enterprise work as background evidence. Email and Print are supporting craft examples; recent SaaS, Shopify and design-system work should lead.

Verification: generated content, lint, typecheck and production build pass. The blog passes dark/light checks at 1200, 390 and 320 px with no horizontal overflow or page errors. The actual button's size/disabled controls, both recordings and local links work. The chart is 800 px on desktop and fits phone widths. Public image URLs remain native images instead of becoming unresolved imports; unhighlighted code blocks scroll within the article. Project content and resume/cover-letter PDF bytes are unchanged.

The project presentation phase is complete. On 2026-11-17, Brett approved the presentations and authorized a final accuracy, repetition and voice review across all 13 projects, followed by a push to `main`.

The final editorial pass removed repeated summary cards and scope descriptions, retained the personal narratives and design/implementation credits, corrected the print captions, and normalized live-project status metadata. Prototype, sample-data and archive-testing limits remain explicit. CyWire stays the sole featured project and is described as a Master Prompt workspace.

Final validation: all 13 generated project records are current. Lint, typecheck and the production build passed. All project pages passed 39 desktop/phone layout checks; image references, 69 local links and 18 public destinations resolve. The canonical AMW URL is used. Resume and cover-letter PDF bytes are preserved during builds.

- Approved: Personal Portfolio case study and v08 presentation, approved by Brett on 2026-11-16. See the [source inventory](design-system-inventory.md).
- Approved: Analytics Workbench (2026-10-22). The illustrated article now includes six boards, a real workflow recording, token downloads, vector controls and a six-page PDF. Editable assets and control prototypes are documented in the [source inventory](analytics-workbench-design-system.md).
- Approved: Grok Bot / Director's illustrated engineering presentation, approved by Brett on 2026-11-17. See the [visual inventory](director-visuals.md).
- Approved: Brightpath Operations' illustrated prototype presentation, accepted by Brett on 2026-11-17. See the [visual inventory](brightpath-interface-notes.md).
- Approved: AMW Hardscape's illustrated design-engineering case study and v02 arrow-spacing correction, accepted by Brett on 2026-11-17. See the [source inventory](amw-design-system.md).
- Approved: PushPad's supplemental learning presentation, with Brett's selected boy hero and the homepage demo entry, accepted for continuation on 2026-11-17. See the [source inventory](pushpad-platform-notes.md).
- Approved: CyWire's Master Prompt workspace. The article explains authoring, tested-output review, versioning, discovery and application-owned integration, with five boards, a public-guide recording and a five-page PDF. The YouTube video is the only hero media, with no thumbnail gallery. See the [source inventory](cywire-platform-notes.md).
- Featured project: CyWire is the sole featured project; all other project metadata remains unfeatured.
- Approved: Top Web Works design-system reconstruction, final disclosure/copy review and explicit credit for the logo lockup Brett designed for the rebrand. Show the customized Tailwind UI agency system and two reusable client foundations, sourced from Brett's confirmed demos, from tokens through modules, page composition and responsive behavior. AMW is an output of the service-site library; Northfield Health is an example of the informational foundation. Preserve the original hero and exclude prices. Ten inline boards, a ten-page PDF, scoped token snapshots, component prototypes and a live interaction recording support the hiring-focused story. Include production CRM, conversion focus, SEO/AEO/GEO, schemas, targeted content, generated sitemaps, GA4/GTM consent and agreed marketing/branding/print services. Platform direction favors Next.js/Vercel, Supabase for data-backed products and Shopify/Liquid for larger ecommerce; keep pricing, cadence and internal plans private. See the [source inventory](topwebworks-design-system.md).
- Approved: Master Blocks, from declared brand variables and shared rules through editable components, modules, states, responsive campaign composition and CMS handoff. Six inline boards, a six-page PDF, a token snapshot and a live subject-tab recording. The subsequent archive review repaired keyboard/mobile labels, dialog focus, demo-form handling and external dependencies. See the [source inventory](master-blocks-design-system.md).
- Approved: Master Email, from inline style constants through reusable table rows, fluid layouts, brand recipes and Pearson campaign examples. Repaired 42 image references using bundled assets. Six inline boards, a six-page PDF, editable components and a style snapshot. Browser checks do not imply delivered email-client certification. See the [source inventory](email-design-system.md).
- Verification: generated project data, lint, typecheck and production build passed. Both project pages passed light/dark checks at 1200, 390 and 320 px, with six distinct boards, working downloads and no overflow. All three email archives loaded their images at the same widths. Both PDFs have six pages at a consistent 1280-point width, embedded fonts and no document warnings.
- Approved: Monarch catalog prototype, with supplied-design attribution, shared CSS/Material rules, six inline studies, editable components, a six-page PDF and an actual UI recording. The companion WordPress microsite and retired/sample-data scope remain clear. See the [source inventory](monarch-prototype-notes.md).
- Located: the Shopify marketing library in both `shopify-dawn` and `shopify-horizon`. Six distinct section types in the first folder; eight in Horizon. See the [source map](shopify-design-system-source-map.md). No theme source was changed.
- Production references confirmed: AOP and Ignite landing-page HTML contains deployed MKTG sections. Use the finished sites for visuals and local folders for code evidence. Recovered archived copies of the former AOP MKTG Custom Dev page and its linked subject-based product listing; both original routes now redirect. Historical examples must be labelled as archived. Details are in the [source map](shopify-design-system-source-map.md).
- Approved: Shopify Plus Migrations follows measured tokens, editable components, section variants, a working browser prototype, responsive page mockups and finished storefronts. The hero gallery presents the system stages; the scrollable modal presents the complete saved section catalog. Eight inline figures keep actual section examples visible. The original video has a clean play preview, alongside a four-page PDF, token/schema download and actual AOP tab recording. Client artwork/composition credit and source-version boundaries remain explicit. See the [source map](shopify-design-system-source-map.md).
- Shopify verification: generated content, lint, typecheck and production build passed. The page passed light/dark checks at 1200, 390 and 320 px with eight distinct images and no overflow or page errors. Gallery selection, 16:9 video preview/activation, prototype layout/icon controls, subject-panel keyboard navigation, iframe sizing, modal focus/scrolling/dismissal, the 1438 px width cap, static hover and no-JavaScript fallback passed. The four PDF pages were rendered and inspected; all are 1280 points wide, fonts are embedded and there are no document warnings. Resume and cover-letter PDFs were restored byte-for-byte after builds.
- Approved: Graphic Design, with the original catalog, mailer, logo, advertisement and brochure artwork. Captions identify the client work and distinguish Zip disks from drives.
- Delivery: final editorial refinements are authorized for `main`; no additional project work is queued. Source applications and Shopify themes were not changed during this pass.
- Latest verification: the archive regression check passed 15 layouts plus keyboard, dialog, form, no-script and reduced-motion checks. All four revised project pages passed 24 light/dark viewport checks. Recordings and downloads work. Lint, typecheck and production build passed; the resume and cover-letter PDFs were preserved. Final PDFs have consistent page widths, embedded fonts and no document warnings.
- Scope: use each project's existing design and actual behavior. Keep stories in Markdown and place relevant visuals beside the explanation. Preserve the site's layouts, navigation, and themes.

## Scope Boundaries

- Preserve the existing design, layouts, navigation, Blog, Projects, themes, and content engines.
- Use the current resume as the source of truth for career facts and supported metrics.
- Make the smallest safe change that satisfies the request.
- Do not add a CMS, backend, authentication, database, CSS framework, or icon library.
- Do not introduce service prices, unsupported counts, hidden search copy, or unsupported metrics. The confirmed LinkedIn recommendation count and Top Web Works Google rating above are approved trust proof.

## Build and Test Workflow

Development tests run locally only, outside build/install/deployment hooks. The existing production `prebuild` generates project data, the resume, and the cover letter; keep those required content steps. See `AGENTS.md` and `CLAUDE.md`.
