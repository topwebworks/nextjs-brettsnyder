# Portfolio Positioning Alignment

Status: Phases 0 and 2 complete. Phase 1 is next.

## Objective

Align the existing portfolio with Brett Snyder's current positioning as a Design Engineer and Product-Focused Frontend Developer.

The site should provide clear evidence across:

- React, Next.js, and TypeScript product development.
- Shopify Plus and Liquid implementation.
- WordPress, custom CMS, and static content workflows.
- Conversion-focused marketing experiences and lead systems.
- UI/UX, functional prototypes, and design systems.
- AI-assisted and agentic development with human review and ownership.

## Non-Destructive Boundaries

- Preserve the current visual design and glass styling.
- Preserve the current page layouts and responsive behavior.
- Preserve navigation, Blog, Projects, themes, and content engines.
- Keep Markdown as the content source and generated JSON and TypeScript as application data.
- Keep the existing component system and custom CSS.
- Do not add a CMS, backend, database, framework, or unnecessary dependency.
- Prefer small data, copy, metadata, schema, and CSS changes over structural rewrites.
- Use visible evidence and supported metrics. Do not add hidden search copy or keyword stuffing.

## Content Principles

1. Use the current resume as the source of truth for roles, dates, metrics, and technologies.
2. Lead with current product, frontend, Shopify, and conversion work.
3. Show the problem, Brett's role, the solution, and the result.
4. Show how broad ownership supports collaboration across design, marketing, product, and engineering.
5. Keep the voice direct, personal, and easy to explain in an interview.
6. Do not introduce new public-facing em dashes.

## Phase 0: Public Repository Documentation - Done

Review every tracked document as part of the public portfolio.

- Strengthen the README with the live site, stack, architecture, workflows, commands, and working principles.
- Keep AGENTS.md and CLAUDE.md portable, aligned, and free of private workstation references.
- Keep the North Star and build plan concise and current.
- Document only media and Markdown behavior implemented by the codebase.
- Keep `.env.example` limited to environment variables the application reads.
- Keep public package metadata aligned with the repository name.
- Check tracked Markdown for private paths, placeholder claims, broken links, stale facts, and inconsistent metrics.
- Make documentation-only changes during this phase.

Completed 2026-09-14. Application code, site layouts, and generated site content were unchanged.

Review checkpoint: public documentation only.

## Phase 1: Search Foundation - In Progress

SEO, AEO, and GEO use the same accurate technical and content foundation. Schema.org does not define separate AEO or GEO schema types.

### Crawlability and Metadata

- Make existing page content available in the initial HTML response with the smallest safe theme-related change.
- Add accurate metadata to Home, About, Projects, project details, Tools, Blog, and Blog posts.
- Add `metadataBase`, canonical URLs, Open Graph data, and Twitter card data.
- Add sitemap and robots routes from existing static and generated routes.
- Confirm heading order, descriptive links, and image alternative text.

### Structured Data

Use only types supported by visible page content:

- Home: `ProfilePage`, `Person`, and `WebSite`.
- Projects: `CollectionPage` with an `ItemList`.
- Project details: `CreativeWork` or a more specific valid type when appropriate.
- CyWire: `SoftwareApplication` only where visible content supports the product details.
- Blog: `Blog` or `CollectionPage`.
- Blog posts: `BlogPosting` with accurate author, date, title, description, and image.
- Use `sameAs` only for Brett's controlled public profiles.

Do not add review, rating, FAQ, service, or organization claims that are absent from visible content.

### Supporting Content

- State Brett's current role and specialties clearly on Home and About.
- Use consistent names for Brett, Cosaint, CyWire, TopWebWorks, Imagine Learning, Shopify, and referenced technologies.
- Give metrics enough context to be understood.
- Keep important facts in visible HTML. Structured data reinforces content but does not replace it.

Review checkpoint: search changes with no intentional visual difference.

## Phase 2: Homepage Alignment - Done

Keep the exact layout and visual treatment.

- Keep the hero structure, rotating titles, buttons, background, colors, spacing, and animation.
- Adjust hero or badge wording only where needed to match the resume and LinkedIn title.
- Replace the `Latest Blogs` column with `Latest Projects`.
- Show the two latest projects from the existing generated project data.
- Adapt project fields to the existing card design. Do not create a new card system.
- Keep the Blog page, navigation entry, posts, and content engine unchanged.
- Keep the `Recent Work` timeline layout and update its data to include current Cosaint work.
- Give the small Latest Projects, LinkedIn, and Resume icon buttons a visible outline and comfortable hit area using the existing button treatment.

Review checkpoint: homepage only, compared with light and dark desktop and mobile baselines.

Completed 2026-09-14. Brett approved the smaller outlined icon-button treatment and will complete the visual check.

## Phase 3: Project Content

Use the existing Markdown and project-data workflow for every addition or revision.

### CyWire

- Show the B2B AI product moving from concept to production in three months.
- Explain the three major engine revisions made to reach the intended product behavior.
- Describe the model-agnostic Master Prompt system, structured JSON output, and product architecture.
- Cover the visual builder, marketplace, document-backed knowledge base, Labs, membership-tier governance, teams, dashboards, authentication, and leaderboards.
- Include Next.js, React, TypeScript, Tailwind CSS, Supabase, and Vercel.
- Avoid a prompt count because it changes.

### AMW Hardscape

- Add a case study through the current project template.
- Cover research, site copy, functional prototyping, UX, visual direction, assets, and the Next.js build.
- Explain service selection, estimate paths, CRM notifications, and follow-up workflows.
- Include supported content, SEO, email, social, and campaign work.
- Omit traffic percentages and campaign comparisons until their definitions and reporting periods are confirmed.

### TopWebWorks

- Replace the older Shopify-only description with the current productized service model.
- Cover functional prototypes, positioning, messaging, copy, UI/UX, assets, Next.js and Shopify builds, hosting, and maintenance.
- Explain CRM-routed form and chat leads, email and SMS follow-up, booking or estimate requests, reviews, content, local SEO, email, and paid campaign support.
- Do not publish service prices.

### Shopify

- Lead with three enterprise Shopify migrations, Shopify Plus, and Liquid customization.
- Cover reusable schema-driven sections and the separate Shopify marketing design-block system.
- Include collaboration, conversion, responsive behavior, accessibility, analytics, and production support.
- Keep the Shopify block system distinct from Master Blocks.

### Supporting Work

- Correct Master Blocks from 50 percent to the resume-supported 40 percent improvement.
- Clarify that Master Blocks supported WordPress and standalone HTML/CMS pages.
- Tighten Monarch functional-prototype copy if needed without changing its template.
- Refresh the personal-portfolio case study so its architecture and workflow descriptions match the current implementation.
- Complete a targeted spelling and media-metadata pass without changing Blog or project layouts.
- Keep older email, print, graphic design, and Blog content available.

Review checkpoint: each new or substantially revised project.

## Phase 4: Remaining Content

- Update stale About content without changing its layout.
- Add current CyWire and TopWebWorks context.
- Explain the progression from design into UI/UX and frontend development.
- Keep the narrative focused on relevant experience and collaboration.
- Update Tools descriptions only where they are inaccurate or omit current professional workflows.
- Keep the Tools layout and personal content.
- Fix the hardcoded mobile copyright year.

Skill percentage meters and broader personal-content changes are outside the approved initial scope.

Review checkpoint: About, Tools, and remaining copy.

## Phase 5: Verification

- Run the project-data generator after Markdown changes.
- Run lint, type checking, and the production build.
- Compare desktop and mobile screenshots in light and dark themes.
- Verify initial HTML, metadata, canonicals, sitemap, robots, and JSON-LD.
- Confirm every structured claim appears in visible content.
- Check links, project order, downloads, keyboard navigation, and reduced motion.
- Compare career claims with the current resume and cover letter.
- Confirm public documentation still matches the implemented system.

## Completion Criteria

- The site retains its existing design, layout, navigation, Blog, Projects, themes, and content engines.
- Home, About, and priority projects match the current resume and LinkedIn positioning.
- The homepage shows two latest projects instead of two latest Blog posts.
- Small section-heading icon buttons are easier to see and use.
- Useful content is present in the initial HTML response.
- Metadata, structured data, sitemap, robots, and canonical URLs are accurate and valid.
- Public documentation is accurate, portable, concise, and consistent with the code.
- No unsupported metrics, service prices, hidden search content, or new public-facing em dashes are introduced.
