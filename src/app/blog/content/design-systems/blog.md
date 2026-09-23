---
title: "Design Systems"
description: "What a design system actually is, how I use tokens and components in practice, and why every system I've built started as the answer to a real deadline or a real limitation."
contentTitle: "Design Systems: The Habit I Never Named"
achievementTitle: "Where I've Used This"
tags:
  - "Design Systems"
  - "CSS"
  - "Shopify"
  - "React"
  - "Figma"
category: "Design"
status: ""
featured: true
readTime: "9 min read"
publishDate: "2026-09-23"
links:
  live: "https://aop.com/pages/mktg-custom-dev"
author: "Brett Snyder"
excerpt: "I was building design systems before anyone called them that. Here's what they are, how I use tokens, and why every one I've built started as the answer to a real deadline, not a trend."
keyAchievements:
  - type: "impact"
    icon: "🧱"
    title: "Five Systems Built Under Pressure"
    description: "Token-based design systems built and used across static HTML, Shopify Liquid, email, and Next.js, each one solving a specific production problem instead of following a trend."
    metrics:
      - "Master Blocks cut landing-page production time 40% across 50+ pages"
      - "One Liquid design system reused across 3 Shopify migrations and 2 theme frameworks, re-tokened per brand"
      - "TopWebWorks runs three separate systems, one marketing site and two client site types"
      - "This portfolio runs on the same token approach in CSS Modules"
media:
  items:

---

I was building design systems before anyone I worked with called them that. The first one was a master email template with every block variation already built in: header styles, content blocks, CTAs, footers, all built once and dropped into place instead of rebuilt for every campaign. Nobody handed me the term "design system." The approach just made&nbsp;sense.

A design system is a shared set of tokens, components, pacing rules, and conversion rules. Tokens are the values, color, spacing, type, defined once and reused everywhere instead of typed in over and over. Components are the parts built from those tokens: a button, a card, a hero block. The pacing rules are what tell you what order those parts go in down the page. The conversion rules are data-backed: which of those parts actually needs to be there, a form, a CTA, a testimonial, so a page built by someone else still converts, not just&nbsp;matches.

I didn't build any of mine because design systems sounded good, or because I read about them somewhere. A director gave me a deadline that building every page from scratch couldn't hit. A Shopify migration needed more than the theme's defaults could cover. A client base that couldn't afford months of custom work every time I built them a site. Five systems, five different problems, one repeated&nbsp;habit.

## My Tokens, Plainly

I'm not usually building across a dozen devices and platforms at once. I'm not running one token source that feeds native iOS, Android, and web apps at the same time. My work is web-first: HTML and CSS, Shopify Liquid, React and Next.js. So my tokens are, mainly, plain CSS custom properties. `--color-primary`, `--space-lg`, `--font-primary`. Set once at the root, referenced everywhere else. Change the value in one place and every component using it updates.

It's the right-sized tool for the job I actually have. This portfolio runs on exactly that: a token layer for color, spacing, and font driving both the light and dark theme off the same&nbsp;components.

The mechanism is the same everywhere I've used it, even when the platform changes. Plain CSS variables in Master Blocks. On this site, a Next.js build, the tokens live in one global stylesheet and every component pulls from it through its own CSS Module, so the values stay shared but the styles stay scoped to the component that uses them. Liquid's version of the same idea inside Shopify's style blocks. Tailwind's token layer on TopWebWorks, which is CSS variables under the hood no matter what utility classes sit on top of it. One approach, reused on purpose every&nbsp;time.

## When It Earns Its Keep

A design system earns its time when more than one person touches the same visual surface, when the same components repeat across more pages or brands than you can track in your head, or when the platform is going to outlive the current build and needs an upgrade path that survives theme changes and CMS migrations. Any piece of the system can mix and match into any page. That's the whole point of building it modular, down to swapping which features live inside the same component. You don't need a second full system just because two pages have different goals, that's what the modularity is&nbsp;for. You need one when the market itself is different enough that one system can't credibly speak to both, different audience, different expectations, different context walking in the&nbsp;door.

Skip it for a single page with one owner and no reuse coming. Skip it while requirements are still moving fast enough that locking tokens early just creates rework later. And if it's just you, with no handoff coming, a style guide in your head works fine right up until it&nbsp;doesn't.

But most real jobs outgrow that fast. Once brand consistency and turnaround speed both matter, and they usually both matter sooner than people expect, a design system stops being optional and becomes the only way to keep&nbsp;up.

## The Email Template That Started All of This

Before Master Blocks, before any of it, campaign emails at Imagine Learning were getting built one at a time by hand, with inconsistent results across email clients that still barely support CSS. So I built a master email template with every block variation already worked out: header styles, content blocks, CTAs, footers, all built once as reusable, CRM-ready pieces instead of rebuilt from scratch for every&nbsp;campaign.

Nobody called it a design system. It just meant I stopped solving the same layout problem every time a new campaign landed on my desk. It became the company&nbsp;standard.

## Master Blocks: The Deadline That Made It a Habit

A few years later at the same company, a new marketing director came in wanting more landing pages, faster, across six product brands, with no added headcount. I sat down and did the math on how long building each one from scratch would take, and the number didn't come close to fitting the&nbsp;timeline.

I already knew the fix, because I'd done it before with the email template. So I built [Master Blocks](/projects/master-blocks), a token-based HTML and CSS block library. CSS variables handled color, type, and spacing. I used flexbox instead of grid so blocks stayed forgiving to move or delete without breaking a layout. Global styles, brand styles, and an override section stayed layered separately, so marketing could edit pages directly in the CMS without ever touching or breaking the upgrade&nbsp;path.

The default block order wasn't a guess either. I'd run A/B tests on landing pages before, and the heatmaps were consistent: almost all conversions happened above the fold. So the pacing rules for the whole system got built around that data, hero and the strongest offer up top, a long scroll funnel doesn't hold this kind of&nbsp;traffic.

It cut landing-page production time 40% across more than 50 conversion-focused pages. What looked like an impossible ask on a Thursday afternoon turned into a process I could hand off and&nbsp;repeat.

## Shopify: One System, Three Storefronts, Two Theme Frameworks

Later, I was handed the job of migrating existing e-commerce sites to Shopify, including AOP.com. The theme's default marketing sections covered the basics, but not what these specific pages needed to&nbsp;convert.

Rather than stretch a default section further than it was meant to go, or add a paid app to cover the gap, I [built custom Liquid sections](/blog/shopify-tips) with shared tokens and schema settings marketing could configure on their own. I kept the work additive to the theme, so the upgrade path never broke. On AOP specifically, I stayed inside sections that were already approved for UI and UX, even while customizing them, so the new work never needed a fresh round of design approval. It was still inside what had already been signed&nbsp;off.

That system didn't stay on one storefront. I carried it across three separate Shopify migrations, swapping in each brand's own tokens, color, type, spacing, so each site looked like itself while the underlying sections and schema stayed the same. Two of those migrations landed on different theme frameworks entirely, which meant the system had to hold up against Shopify's own architecture changing underneath it, not just a fresh coat of&nbsp;brand.

## TopWebWorks: Fast Without Being Generic

Running TopWebWorks now, most clients don't want to spend months or a large budget getting a new website built. To offer a real custom site in a fraction of that time, I had to build the foundational structure ahead of the client work, before the client ever showed&nbsp;up.

That became [three separate design systems](/projects/topwebworks), each with a job. A custom Tailwind system runs the TopWebWorks marketing site itself. Two more Next.js systems run client builds, split by site type: one for service sites, one for informational sites. That split isn't about the pages wanting different things, it's about the clients being different demographics entirely. A local service business and its customers expect a different tone, pace, and set of trust signals than an informational site's audience does. One system stretched across both would end up generic on one side to stay credible on the&nbsp;other.

Both client systems are conversion-focused, built from shared components, and ship with the same lead capture and follow-up system underneath no matter which client it goes to. It's also the reason I can offer a free homepage prototype at all. I'm not putting it together from nothing. I'm pulling from blocks I've already proven convert, which is why I can turn it around fast without handing someone something&nbsp;generic.

This is the part of the job that isn't tokens on a page: deciding how many systems a business actually needs, and where the line between them&nbsp;goes.

## The Real Payoff

Ask most people why a design system matters and they'll say consistency. Fine answer, but it undersells what I actually get out of&nbsp;one.

I stop re-deciding the same conversion questions on every new page, because I already made that call once and built it into the block. The 40% number on Master Blocks wasn't a one-time win either. It held across 50-plus pages because I wasn't starting page 51 from zero, I was assembling it from pieces I'd already proven&nbsp;worked.

The stakeholder conversation changes shape too. Show a director or a client an actual working prototype and they approve something real. Show them a description or a mood board and they're still guessing at what they're agreeing to, and that guessing is what eats a&nbsp;timeline.

Sprints get shorter the longer the system's been running, not just on page one. And underneath all of it: a client or a director who can see the system trusts my timeline instead of padding it out of&nbsp;doubt.

## Figma Earns a Shortcut

Figma is a real, necessary part of how most web teams collaborate, and I still use it constantly. Prototyping in code before a design gets approved is normally a bad habit, and for good reason. On a from-scratch product, nothing is locked yet, and building ahead of approval just invites rework when the direction&nbsp;shifts.

But that rule assumes you're starting from nothing. Once a design system and an approved demo page already exist, you're not. A new feature built inside that system already inherits approved tokens, approved components, and in a case like AOP, sections that were already signed off for UI and UX. There's no open visual decision left for Figma to resolve first, because that decision already got made when the system itself was approved. So the order flips. The process still runs, it just doesn't need to re-open a decision that's already&nbsp;closed.

Once that's true, I'll build the new feature or prototype directly in the live system first. Then I get feedback one of two ways: I take a screen grab of the working version into Figma and drop in notes and revisions, or I make the change live in the browser and grab it again, whichever is faster for whoever's reviewing it. Figma stays in the loop as where feedback and annotation happen. It just isn't always where the thing started&nbsp;anymore.

The system's own demo page doubles as a sandbox for this. Open dev tools, move an element, delete one, duplicate one, and see the layout change in real time, instead of mocking that same variation in Figma first. This works on any platform: an HTML demo page, a Shopify theme, a Next.js build, whatever the system runs on, because the sandbox only works when the tokens and components underneath it are already real and already approved. Editing it live can't produce something off-brand, so there's nothing risky about testing that&nbsp;way.

I used this with Master Blocks directly. The original demo template was built to be inspected and edited live in the browser, which is part of why flexbox mattered more than grid to me: blocks stayed forgiving to rearrange without anything breaking. When marketing later needed a new concept for a Student Program, I put together a working prototype using the existing blocks in almost no time, instead of designing it in Figma first. Revisions came back as screen grabs with comments dropped straight into&nbsp;Figma.

None of this holds for work built from scratch. A new product or a new visual direction still goes through Figma first, every&nbsp;time.

## The Habit That Ports

Across the five systems in this post, the platform underneath changed: static HTML, Shopify Liquid, email markup, React components. But even inside one platform, a component doesn't stay frozen at whatever Figma first rendered. Feature updates, data-driven changes, bug fixes, all of it moves the component forward, sometimes past what the original design file still shows. What doesn't change, on a new platform or six feature updates into an old one, is the habit: define the values once, build the pieces from those values, and let the system carry the consistency as more people and more pages touch&nbsp;it.
