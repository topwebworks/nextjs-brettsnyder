# Top Web Works / Agency and Client Design Systems

Updated 2026-11-17. The case study documents three reusable systems: the customized Tailwind UI agency system, the service-site foundation and the informational-site foundation. AMW is a finished output of the service system. Northfield Health is a fictional example of the informational system.

## Source and Boundaries

Brett confirmed `nextjs-reso-demo` as the service-system source and `nexjs-fin-demo` as the Health/informational source. The agency uses its customized Tailwind UI/Radiant foundation. The supplied design-system and homepage-first articles support the scope.

The service source separates brand configuration and last-loaded CSS overrides from TWW section modules. Its service data supplies categories, descriptions and cards; module logic handles selection, detail panels and swipe navigation. The recorded demo brand uses purple color roles and a 50 px base radius. AMW is a client implementation with a 4 px base and a 10 px detail panel.

The informational source separates TWW components and motion/style modules from the example identity, links, assets and theme. GoalSelector, CareJourney and HomeSections remain reusable. Health's palette and typography are an example theme, with its body token changing at 600 px. Sample people, reviews and business details are identified as fictional; no CRM form or chat is connected.

The public article, token snapshot and PDF exclude prices, plan tiers, marketing cadence, billing and internal operating plans. Public delivery scope includes CRM, conversion focus, SEO/AEO/GEO, schemas, targeted content, data-driven sitemaps, GA4/GTM consent and agreed digital marketing, branding and print services. The current platform direction favors Next.js/Vercel, Supabase for data-backed products and customized Shopify/Liquid for larger ecommerce. This does not claim that the marketing-site foundations require Supabase. No source application was edited and no form submitted.

## Deliverables

Nine boards cover system boundaries, tokens and theme overrides, agency components, the service library and AMW output, informational components and Health theme, example page composition, responsive layouts foundation-to-client assembly, and production delivery standards.

Client job: `TWW_261117_platform-story`, under `TWW_topwebworks`. Native master: `TWW_261117_platform-story_v05.figcraft`; earlier versions are retained. Fifteen pages include nine boards, Assets, three state studies and two editable composition pages. Separate collections record base values and replaceable service-demo branding; Health includes desktop/mobile modes.

The Health goal tile uses editable type and token-bound surfaces. Health service-card and AMW panel reconstructions retain separate photo, text, surface and control layers. FAQ and service-state studies use implementation captures. The live recording shows TWW disclosure behavior and Health goal-card feedback/navigation.

The original hero remains the sole hero item. Public deliverables under `public/demo/topwebworks/` include the nine-page PDF, scoped token JSON, interaction recording and poster. Nine inline boards link to full-size images. Documentation uses Inter/Consolas; native example components also use Georgia/Arial and DM Sans.

## Verification

The final production build passes. Lint and typecheck pass. Browser checks cover both themes at 1200, 390 and 320 px, nine loaded/full-size-linked boards, the 10.4-second recording, token/PDF delivery and CyWire as the sole featured project. No browser page errors were recorded. Resume and cover-letter PDFs retain their original bytes.

All nine PDF pages were rendered and reviewed. Each is 1280 points wide, fonts are embedded, Brett Snyder is the author and the parser reports no warnings. The PDF is optimized for web delivery. Extracted text excludes prices, plan tiers and operating-plan detail. Service base-token values were checked against the confirmed service-demo stylesheet.

## Final Content Review

The article, PDF text, figures, recording and token download were reviewed for disclosure and voice. Public content is limited to design/engineering methods and Brett-approved client capabilities. Prices, margins, tier details, billing, marketing cadence, acquisition tactics and account identifiers are excluded. Unreferenced preview downloads were removed; their client-job originals are retained. The copy uses shorter first-person explanations and specific implementation details, with repeated scope statements and generic transitions removed. This review covers the current TWW materials, not deployment or repository history.
