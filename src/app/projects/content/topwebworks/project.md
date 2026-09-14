---
title: "Top Web Works Rebrand"
description: "A rebrand and rebuild of Top Web Works into a custom-built, lead-follow-up-focused web service for local businesses. I repositioned the offer, rebuilt the marketing site in Next.js, and built portal workflows for both clients and admin."
contentTitle: "Websites That Capture and Follow Up on Every Lead"
achievementTitle: ""
technologies:
  - "Next.js"
  - "React"
  - "TypeScript"
  - "Tailwind CSS"
  - "Supabase"
  - "Stripe"
  - "Sanity"
  - "Shopify"
category: "Website"
status:
featured: True
publishDate: "2026-03-27"
links:
  live: "https://topwebworks.com"
keyAchievements:
  - type: "impact"
    icon: "🔄"
    title: "Business Rebrand and Offer Simplification"
    description: "Repositioned Top Web Works from a broad WordPress hosting and website business into a custom-built, lead-follow-up-focused service for local businesses, with a clearer customer offer: a free homepage prototype, a conversion-focused build, and recurring plans that keep leads captured and followed up automatically."
    metrics:
      - "Shifted messaging from general web services to lead capture and automated follow-up"
      - "Built a cleaner service path from free preview to build to onboarding to long-term maintenance"
      - "Framed the business around ownership, transparency, and recurring support"
media:
  items:


---

## The Logo

Part of the rebrand was designing a new logo from scratch, a custom mark built from the TWW letterforms and paired with the Top Web Works wordmark. It appears in the site header, footer, client portal, and login screens, and carries the visual identity across every touchpoint of the business.

## The Starting Point

Top Web Works originally operated as a WordPress-focused business centered around hosting and building websites. That model worked, but it kept the business broad and didn't say anything about the problem that actually costs local businesses money: leads going cold with no follow-up.

Over time, a more focused offer made more sense: custom-built, conversion-focused websites for local businesses, paired with a lead capture and follow-up system Top Web Works runs on the client's behalf. Shopify remains available for clients who need a store, but it's one option inside a broader, lead-focused service, not the business's core positioning.

This wasn't a website refresh, it was a full repositioning of the business.

## Why Next.js Instead of Staying in WordPress

Because this rebrand was about moving forward, I did not want to rebuild the new business on the same foundation it was moving away from.

I rebuilt the site in Next.js because the rebrand was a platform shift, not just a redesign. A custom Next.js build gave me a cleaner foundation for the portal integrations and lead-capture workflows the business model required. Auth, client data, request tracking, CRM pipelines, and payment flows are a much better fit in a React app than bolted onto a WordPress install.

## What the Public Site Needed to Do

The live site centers the business around a clear offer: a free homepage prototype first, a conversion-focused custom build, and a lead capture and follow-up system built into every site from launch. The homepage, About, How It Works, Pricing, and Works pages all support that message from different angles.

The public-facing content had to do a few things well:

- Explain the lead-follow-up focus clearly: no inquiry slips through
- Show that the free prototype comes before any commitment
- Make the service tiers and what's included visible and easy to understand
- Reinforce that follow-up runs on planned workflows, not guesswork
- Give customers a clear next step into a free preview

That clarity required deliberate structure. A lot of small business service websites stay vague. This one needed to be plain, specific, and easy to trust.

## Building the Service Story

One of the strongest parts of the rebrand was turning the service into a simple step-by-step system: a free homepage prototype first, a deposit to start the full build once the client approves it, the balance due at launch, and a recurring plan that starts the following month. That structure makes the service feel real and operational instead of abstract, and it removes the risk of committing before seeing the work.

The build itself moves through audience positioning, messaging, site copy, and UI/UX design, resulting in either a custom conversion-focused site or a Shopify e-commerce store. Ongoing recurring plans then cover hosting, maintenance, and lead follow-up, so clients aren't left managing the site or chasing leads alone after launch.

A clear process is easier to trust, and easier to buy into.

## The Portal Side of the Project

A major part of the build was supporting the business with portal workflows.

The client portal lets clients submit requests, review quotes, track work status, and access monthly summaries. That supports the recurring-plan model without relying on scattered email threads.

The admin portal gives the business side a structured way to receive requests, manage workflow, handle quotes, and keep monthly work organized. Both portals are backed by Supabase for auth, data persistence, and request tracking.

Stripe handles payment collection for setup fees and recurring maintenance subscriptions.

## The Blog

The site also includes a full blog powered by Sanity as a headless CMS. Blog content is authored and published through Sanity's studio and rendered on the Next.js frontend, keeping content management separate from the codebase.

## Every Site Ships With the Lead System Built In

Every site ships with the lead system already configured and tested, before it goes live. Every form, chat message, and inquiry is captured into a centralized CRM pipeline with instant email notification and an automated confirmation, so nothing slips through from day one. Automated email follow-up runs at every tier; customer SMS follow-up is added on top of that workflow at Grow and above.

From there, I lead the ongoing operations that keep it running for clients: a dedicated business texting number, estimate and booking requests built into the follow-up flow, and post-job review requests. Text, email, and chat all land in one inbox clients can manage from their phone or desktop, instead of scattered across email threads and missed calls.

## Ongoing Growth Programs

That same pipeline supports growth programs that scale with each client:

- Social content published on a set monthly cadence across Facebook and Instagram
- Google Business posts keeping each client's profile active
- Monthly email campaigns to the client's customer list
- Meta ad campaigns, managed and optimized monthly
- Monthly campaign landing pages built around a client's best offer
- Monthly blog posts building local search rankings over time
- Local SEO rankings tracked and reviewed monthly
- Monthly performance reporting and strategy calls

## Internal Tools Behind the Scenes

Running the business day to day also meant building a couple of private internal tools. A prospect mailer tool manages the local outreach pipeline: manual calls, texts, and emails to new prospects, with duplicate detection and strict compliance rules around send limits and do-not-contact tracking. A separate monthly client report tool generates and emails PDF reports tied to each client's plan tier, replacing a manual checklist workflow. Neither is public-facing; both run locally to support operations, not client delivery.

## Design Matters Too

Getting found, capturing leads, and following up automatically are systems. But the site still has to look like the business it represents: no generic templates, no colors competing for attention, just a clean, modern build around each client's actual brand.

## SEO, AEO, and GEO

Search visibility couldn't just mean traditional SEO anymore. More buying research now happens inside AI answer engines like ChatGPT, Perplexity, and Google AI Overviews. I built the site to perform in both worlds at once: SEO for search engines, AEO (answer engine optimization) and GEO (generative engine optimization) for AI-driven discovery.

On the technical SEO side: sitemap.xml, robots.txt, canonical URLs, and attention to Core Web Vitals so pages are fast and fully crawlable.

For structured data, I added JSON-LD schema (Organization, Product, FAQ) so search engines and AI crawlers can parse exactly what the business offers instead of inferring it from unstructured page copy.

For AEO/GEO specifically, that meant writing content in a format AI systems can lift directly into an answer: clear semantic heading hierarchy, and service/pricing information framed as direct Q&A rather than marketing copy that has to be reinterpreted. The How It Works and Pricing pages are the clearest example: structured so an AI answer engine can quote the process and pricing verbatim.

I carried the same approach into client builds. Structured data and content formatting are part of the service, not a Top Web Works-only feature.

It's already working. People have told me they found Top Web Works through ChatGPT, not a Google search.

## What I Built Into the Experience

The finished project brings together several layers:

- A modern, lead-focused marketing site in Next.js and TypeScript
- Clear service positioning around a free prototype, a conversion-focused build, and managed follow-up
- Custom page structure for About, Pricing, Works, How It Works, and process content
- A client portal flow tied to onboarding and ongoing maintenance
- Admin-side portal support for managing client operations
- Supabase backend for auth and data
- Stripe for payments and subscriptions
- Sanity headless CMS for blog content
