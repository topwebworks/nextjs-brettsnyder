# Blog Build Plan

Planning doc for individual blog posts before writing content. One post is planned per section below. Reused for every major blog post so content stays intentional instead of drafted cold.

## Process

1. Add a new `## Post: <slug>` section here before writing any Markdown.
2. Fill in Angle, Proof, Structure, and Cut List.
3. Write the post in `src/app/blog/content/<slug>/blog.md`.
4. Run `npm run generate-project-data`.
5. Mark the section status as Published.

---

## Post: design-systems

**Status:** Published — written to `src/app/blog/content/design-systems/blog.md`, generated, lint/typecheck clean. Inline links and `featured: true` confirmed.

### Angle

What a design system actually is, why it matters, and when it's worth building one — told through the actual situations that forced each one into existence, not as an abstract definition. First person, personal. Every system started as a response to a specific problem someone put in front of him: a new director's tight deadline, a bad migration handed to him, clients who couldn't afford a slow build. No fluff, no AI-speak, no generic "design systems improve consistency" filler.

### Audience & Purpose

Hiring managers and recruiters evaluating design engineer / frontend roles. This post is evidence, not education — it should read like someone who has built five of these under real pressure, in different situations, not someone who read a Figma blog post. The personal "why now" behind each one is what makes it read as lived experience instead of a listicle.

### Opening Hook

Leads with "I was building design systems before anyone called them that." The actual first one, chronologically, was the master email template at Imagine Learning: every block variation (headers, content blocks, CTAs, footers) already built and reusable, the same approach Master Blocks would later apply to landing pages. Both predate "design system" as common industry vocabulary. This reframes the whole post from "here's a skill I have" to "this was instinct before it had a name," which reads more credible than opening on a textbook definition. Reflected in the excerpt too. The Email section moved ahead of Master Blocks in the post to match this real chronology, and Master Blocks now explicitly says he already knew the fix from having done it with email first.

### Thesis

A design system is a shared set of tokens, components, and rules for combining them, built so the same visual language survives across pages, platforms, and people who touch the code. He didn't build any of them because a design system sounded good — each one was the answer to a specific problem: a deadline that made hand-coding every page impossible, a default that didn't hold up, a business model that couldn't absorb a slow custom build every time. Beyond just brand consistency, a design system locks in conversion best practices so they don't have to be re-decided per page, cuts production time, brings stakeholders into agreement earlier because they're reacting to real components instead of describing preferences, and shortens sprint length over time because the team is assembling from known, trusted pieces instead of estimating unknowns. Less uncertainty, more trust in the timeline. Mature enough, the system also changes the design process itself — new features get prototyped directly in the system and pushed into Figma for review after, instead of always starting design in Figma first.

### What Tokens Actually Are, Scoped Honestly

Needs its own short beat early in the post, right after the definition, before the proof points. Explain tokens concretely instead of leaving "tokens" as a buzzword:

- A token is a named value — a color, a spacing unit, a font size, a border radius — defined once and referenced everywhere instead of hard-coded per component. Change the token, everything using it updates.
- His tokens are, mainly, CSS custom properties (`--color-primary`, `--space-lg`, `--font-primary`, etc.) — plain CSS variables, not a compiled multi-platform token pipeline. This portfolio's own `globals.css` is a live example: color, spacing, and font variables driving both light and dark themes off the same components.
- Scope this honestly: he isn't usually building across many devices/platforms at once (e.g., one token source feeding native iOS, Android, and web simultaneously). The work is web-first — HTML/CSS, Shopify Liquid, React/Next.js — so CSS variables are the right-sized tool for the job, not a limitation to apologize for. Don't oversell into "cross-platform design token pipeline" language that isn't true of the work.
- The same CSS-variable approach is what ports across every proof point below: plain CSS custom properties in Master Blocks and this portfolio, Liquid's equivalent (CSS variables inside `{% style %}` blocks) on Shopify, and Tailwind's token layer (which is CSS variables under the hood) on TopWebWorks. One mechanism, reused deliberately, not reinvented per platform.

### Proof Points (real projects, already shipped — situation first, then the system)

1. **HTML Email System (Senior Designer role, Imagine Learning, before Master Blocks)** — The actual origin point, chronologically first. Campaign emails were getting hand-built one at a time with inconsistent results across email clients that barely support CSS. He built a master email template with every block variation already worked out (headers, content blocks, CTAs, footers), the same block-variation design-system approach used later in Master Blocks, just applied to email instead of landing pages. Became the company standard. Nobody called it a design system at the time — the term wasn't common vocabulary yet.
2. **Master Blocks (Marketing Web Developer role, 2022–2025, Imagine Learning, a few years after the email system)** — A new marketing director came in with tight turnaround expectations, more landing pages, faster, across 6 product brands, no added headcount. Hand-coding each page wasn't going to hold up against that deadline. He already knew the fix from having done it with the email template, so he built a token-based HTML/CSS block library: CSS variables for color/type/spacing, flexbox over grid so blocks stay forgiving to edit, global/brand/override CSS layering so marketing could edit pages directly in a CMS without breaking the upgrade path. Cut landing-page production time 40% across 50+ pages, and turned an unrealistic deadline into a repeatable process. Source: [master-blocks/project.md](../src/app/projects/content/master-blocks/project.md). **Corrected during review:** the project.md `publishDate` was wrong (said 2019-03-15, inside the earlier Senior Designer window) and has been fixed to 2022-06-15 to match the resume's Marketing Web Developer bullet, which is the actual source of truth for this timeline.
3. **Shopify Liquid/Schema sections, AOP.com + 2 more storefronts (same Marketing Web Developer role, 2022–2025, Imagine Learning e-commerce migrations)** — He was handed the job of migrating existing sites to Shopify, and the default marketing sections in the themes he inherited covered the basics but not what these pages needed to convert. Rather than stretch a default section past what it was built for, or bolt on a paid app, he built custom Liquid sections with shared tokens and schema settings marketing could configure themselves, additive to the theme so the upgrade path stayed intact. On AOP specifically, he stayed inside already-approved UI/UX sections even while customizing them, so new work never needed a fresh round of design approval — it was still within accepted scope. **Stronger than originally scoped:** this wasn't a single-site system. He carried the same Liquid design system across all 3 Shopify migrations, re-tokening it per brand (different colors, type, spacing) while keeping the same sections and schema underneath, including across 2 different theme frameworks. That's real portability evidence, not just one clever build. Source: [shopify-migrations/project.md](../src/app/projects/content/shopify-migrations/project.md), [shopify-tips/blog.md](../src/app/blog/content/shopify-tips/blog.md).
4. **This portfolio (Next.js/React)** — Proof the same tokens-and-components approach ports to a modern component framework, not just static HTML/CMS platforms: CSS Modules plus a global token layer (`--color-*`, `--space-*`, `--font-*` custom properties) driving both light and dark themes.
5. **TopWebWorks.com (current, agency/client work)** — Running a service business, most clients don't want to spend months or a large budget on a from-scratch custom site. To offer a real custom build in a fraction of the time, he had to build foundational modular structures ahead of the client work, not invent one during it. That became two separate Next.js design systems for client builds, split by site type: one for service sites, one for informational sites, plus a third custom Tailwind system for the TopWebWorks marketing site itself. A service site (book a job, get a quote) and an informational site (explain a product, build trust) convert differently, so forcing them through one shared system would mean compromising one side or the other. Both client systems are conversion-focused, built from shared components, and ship with the same lead-capture/follow-up system underneath. This is also what makes the free homepage prototype offer possible: it isn't vibe-coded from nothing, it's pulled together from already-established conversion-focused blocks, which is why it can be turned around fast without being generic. Source: [topwebworks/project.md](../src/app/projects/content/topwebworks/project.md) ("Three Design Systems, Each With a Job"). Strongest proof point — it shows deciding *how many* systems a business needs and *where the boundary* between them goes, not just building one.

### When It's Worth It (the "why" the user wants emphasized)

- More than one person edits the same visual surface (marketing + dev, or multiple devs).
- The same components repeat across more than a handful of pages or brands.
- The platform will outlive the current build (theme upgrades, CMS migrations, multi-brand reuse).
- Constraints are tight enough that hand-coding each instance breaks consistency fast (landing pages under deadline, email clients, multi-brand CMS).
- Two kinds of pages convert differently enough (service vs. informational, marketing vs. client-facing) that one shared system would mean compromising one of them — that's a signal to split into more than one system, not a signal to skip having one.

### What It Actually Pays Back (beyond "it's consistent")

- **Conversion practices get locked in once**, instead of re-decided, re-argued, or forgotten on every new page.
- **Production speed compounds** — the 40% number on Master Blocks wasn't a one-time win, it held across 50+ pages because each new page assembled from proven pieces.
- **Stakeholders react to real components instead of describing preferences.** Bringing a director or client into a design system early means they're approving something concrete, not a mood board, which cuts the back-and-forth that eats a timeline.
- **Sprint length drops over time**, not just on the first page — a team estimating from known, tested components has a shorter distance between "started" and "shipped" than a team estimating from scratch each time.
- **Less uncertainty, more trust.** A predictable system is what lets a stakeholder or client trust a quoted timeline instead of padding it out of doubt.

### How a Mature System Changes the Figma Workflow (distinct insight, own section — needs careful framing, see below)

**Framing requirement:** this section has to land as "here's what changes once a system is mature," not "Figma is slow, skip it." Figma is a crucial collaboration step at most web houses, and for good reason — say that plainly before making the exception. Prototyping in code first, before design approval, is normally taboo, and for good reason: it invites rework when the product is being built from scratch, because nothing is locked yet and a developer can build the wrong thing fast. That objection is correct *in the general case*. The point of this section is narrow: it's a different case, not a rejection of the rule.

The normal, preferred sequence is Figma first, then build. Design the screens, get approval, then code them into the system. That's still how new visual direction gets set, and it's still the right sequence for a from-scratch product or a new visual system with no prior approval to inherit.

The exception is narrow and specific: once a design system and an approved demo page already exist, a *new feature or prototype built inside that system* isn't starting from scratch. It's already inheriting approved tokens, approved components, and in cases like AOP, already-approved UI/UX sections. There's no open visual decision left for Figma to resolve first, because those decisions were already made and signed off when the system itself was approved. That's what flips the timeline — not skipping design rigor, but not re-litigating decisions that were already closed.

In practice, once that condition is met:

- Build the new feature/prototype directly in the live system first, since it already inherits the approved tokens and components.
- Use the system's own demo page as an in-browser sandbox: open dev tools, move, delete, or duplicate elements live in the DOM to try layout variations, instead of mocking those variations in Figma first. This isn't specific to one platform — it works on any design system's demo page, HTML/CSS, a Shopify theme, a Next.js/React build, whatever the system runs on, because the sandbox property comes from the tokens and components being real and approved, not from the platform underneath them. Editing it live can't produce an invalid or off-brand result, so there's nothing risky about testing that way.
- Get feedback either by taking it into Figma after the fact (screen grab the working version, drop it in, add annotated comments/text for revisions) or by making changes live in-browser and re-grabbing, whichever is faster for the reviewer.
- Figma stays in the loop as the *review and annotation surface* for that feature, not the originating design tool for it.

Concrete examples of this working:

- **Master Blocks, Student Program concept** — spun up a new landing-page concept for a Student Program using the existing block system. Because the tokens and blocks already existed and were already approved, it took hardly any time to send over a working prototype instead of designing it in Figma first. Revisions came back as screen grabs with comments dropped into Figma, not a redesign cycle.
- **Master Blocks, in-browser dev tools sandbox** — the original demo/template page itself was built to be inspected and edited live: open dev tools, move or delete blocks in-browser to test a layout in minutes, because flexbox (not grid) made blocks forgiving to rearrange without breaking anything. That same demo page is what let the Student Program concept, and every layout variation after it, get tried out live before anything was sent anywhere. The same sandbox habit carried into later systems on other platforms too — the specific trick (flex over grid) was a Master Blocks implementation detail, but "the demo page is a live sandbox you can safely poke at" holds for any design system's demo page, not just that one.
- **AOP.com** — customizations stayed inside already-approved UI/UX sections, so new section work never left the scope of what was already signed off, which is part of why it didn't need to re-enter a Figma-first approval loop.
- **TopWebWorks free homepage prototype** — the reason the free-prototype offer is viable at all: it's assembled from established, conversion-focused blocks, not built from scratch or "vibe-coded." Fast turnaround is a direct result of the system already existing, not a shortcut taken on quality.

Close the section by restating the boundary so it doesn't read as absolute: this only holds once a system and its demo page are already established and approved. Building a product from scratch still goes through Figma first, every time — the system is what earns the shortcut, not skipping the step.

### When It's Not Worth It (the "why not," keeps this from reading like marketing copy)

- One-off page, one owner, no reuse expected.
- Requirements are still moving fast enough that locking tokens/components early creates rework.
- Team of one with no handoff — a style guide in your head is fine until it isn't.

### Structure

1. Lead with the definition in plain terms — tokens, components, rules for combining them — no framework-specific jargon up front.
2. What a token actually is, concretely, and how he uses them: mainly CSS custom properties, web-first, not a cross-device token pipeline. Sets up every proof point without overselling scope.
3. When it's worth building one vs. not (the judgment call, not just the upside).
5. Five real examples, oldest to newest, each told situation-first: what problem/pressure was in front of him, why hand-coding or the default wouldn't hold up, what he built, what it paid back. TopWebWorks closes the list since it's current and adds the "how many systems, where's the boundary" judgment call on top of the earlier examples' "build one system" baseline.
6. What it actually pays back, generalized from the examples: conversion practices locked in, production speed, earlier stakeholder buy-in, shorter sprints, trust from reduced uncertainty.
7. How a mature system changes the Figma workflow itself — open by affirming Figma's role in collaboration and why prototype-first is normally taboo (rework risk on a from-scratch product), then narrow to the specific exception: once a system and its approved demo page exist, a new feature inherits decisions already signed off, so it can be prototyped in-system first and taken to Figma for review/annotation instead of origination. Include the demo page itself as an in-browser dev-tools sandbox — a general property of any design system's demo page (not platform-specific), safe to edit live because it's already built on approved tokens. Close by restating the boundary — this doesn't apply to from-scratch work. Backed by Student Program concept, the Master Blocks in-browser sandbox, AOP scoped customization, TopWebWorks free prototype offer.
8. Close on the portable principle: the same tokens-and-components approach works in HTML/CSS, Liquid, email, or React — the platform changes, the discipline doesn't.

### Cut List (per memory rules — do not include)

- No trailing "not X" hedge clauses ([[feedback_no_ai_hedge_tails]]).
- No "built" for platforms he configured rather than coded (Shopify is "implemented," per [[feedback_built_vs_implemented]]) — Master Blocks and the email system were hand-coded, so "built" stays accurate there.
- No closing "why it's built this way" recap section restating earlier points ([[feedback_no_closing_recap]]).
- No mock/invented metrics — only the 40% figure and specifics already documented in project/resume content ([[feedback_no_mock_data]]).
- No generic design-system marketing language ("single source of truth," "scales your brand," etc.).
- The "not vibe-coded" line on the TopWebWorks free prototype stays factual and brief — state what it's built from (established conversion-focused blocks), don't turn it into a swipe at competitors or an extended contrast section.
- The Figma section must not read as anti-Figma or anti-process. State plainly that Figma is a crucial collaboration step and that prototyping before design approval is normally taboo for good reason (rework risk on from-scratch work). The exception is scoped to systems with an already-approved demo page — never generalize it to "skip Figma."
- Don't oversell the tokens as a cross-platform/multi-device token pipeline (e.g., a single token source feeding native iOS, Android, and web). The honest scope is web-first CSS custom properties (and Liquid/Tailwind equivalents) — state that plainly rather than implying broader multi-device tooling that isn't part of the actual work.

### Decisions

- Name real product/brand names (e.g. AOP) — consistent with existing project.md and blog.md content.
- Cross-link the Master Blocks project page, the Shopify Tips post, and the TopWebWorks project page inline as supporting evidence.
- Write in first person throughout ("I," not "he built"), grounded in the actual situation before each system — a new director's deadline, a bad Shopify default he inherited, clients who couldn't afford a slow custom build. Personal without turning into a career-story narrative; the situation is one or two sentences of setup per example, not a scene.

---
