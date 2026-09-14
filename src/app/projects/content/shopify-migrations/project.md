---
title: "Shopify Plus Migrations"
description: "Three enterprise e-commerce migrations to Shopify Plus, replacing paid apps with custom Liquid sections and configurable Shopify schemas."
contentTitle: "Three Migrations to Shopify Plus"
achievementTitle: ""
technologies:
  - "Shopify Plus"
  - "Liquid"
category: "E-commerce"
status: "Production"
featured: false
publishDate: "2022-06-01"
links:
keyAchievements:
  - type: "technical"
    icon: "🤝"
    title: "Collaboration, Analytics, and Production Support"
    description: "Worked directly with designers and business stakeholders as the developer on each migration, then supported each store after launch."
    metrics:
      - "Built conversion-focused custom marketing sections in direct collaboration with designers and stakeholders"
      - "Analytics stack: Google Tag Manager, GA4, Shopify Analytics, Shoplift, and Crazy Egg"
      - "Ensured ADA-compliant markup and accessibility on every custom marketing section built"
      - "Ongoing bug fixes and production support after each launch"
media:
  items: []
---

## Three Migrations, One Platform

I planned and led migrations of three enterprise e-commerce properties to Shopify Plus. Each migration replaced paid third-party apps with custom Liquid sections and configurable Shopify schemas, giving marketing teams the ability to build and edit sections directly instead of depending on app-store functionality.

## Custom Sections Over Paid Apps

Rather than leaning on the app ecosystem for marketing functionality, I built reusable, schema-driven Liquid sections tailored to each property's content needs. Schema settings exposed layout and content controls to marketing without touching code, while the underlying sections stayed consistent and maintainable across storefronts.

This is a separate system from [Master Blocks](/projects/master-blocks), the HTML/CMS block system built for WordPress and standalone pages. The Shopify sections are Liquid-native and schema-driven, built specifically for the Shopify theme architecture.

## Collaboration and Ongoing Support

As the developer on each migration, I worked directly with designers and business stakeholders to build conversion-focused custom marketing sections, responsive across devices and consistent with each brand's design system. I made sure the markup I built was ADA-compliant; a third-party accessibility widget (AccessiBe) covered site-wide accessibility beyond what the custom sections handled directly. Analytics ran through Google Tag Manager, GA4, Shopify Analytics, Shoplift, and Crazy Egg. After each launch, I stayed on for bug fixes and production support.

## Working Across Platform Constraints

The [Shopify Tips](/blog/shopify-tips) write-up covers the practical side of this work in more depth: theme selection, staging workflows, and the tradeoffs of customizing versus extending Shopify's default Horizon theme. Across all three migrations, the priority was the same: keep the upgrade path open, build additively, and avoid core theme changes that would leave a store stuck on an unsupported foundation.
