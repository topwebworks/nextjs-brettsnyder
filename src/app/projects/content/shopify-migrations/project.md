---
title: "Shopify Plus Migrations"
description: "A Shopify Plus marketing design system of reusable Liquid sections and schemas, built for designers and developers across two enterprise migrations."
contentTitle: "Two Migrations to Shopify Plus"
achievementTitle: ""
technologies:
  - "Shopify Plus"
  - "Liquid"
category: "E-commerce"
status: "Production"
featured: false
designSystem: true
publishDate: "2022-06-01"
links:
  live: "https://aop.com"
keyAchievements:
  - type: "technical"
    icon: "🤝"
    title: "Collaboration, Analytics, and Production Support"
    description: "Worked directly with designers and business stakeholders as the developer on each migration, then supported each store after launch."
    metrics:
      - "Design system live on AOP.com and IgniteChristianAcademy.com, across two theme frameworks (Kalles and Horizon)"
      - "Built conversion-focused custom marketing sections in direct collaboration with designers and stakeholders"
      - "Analytics stack: Google Tag Manager, GA4, Shopify Analytics, Shoplift, and Crazy Egg"
      - "Ensured ADA-compliant markup and accessibility on every custom marketing section built"
      - "Ongoing bug fixes and production support after each launch"
media:
  items:
    - type: "video"
      title: "Custom Shopify Sections"
      src: "https://www.youtube.com/watch?v=GvHgPfRyoe4"
---

## Two Migrations, One Platform

I planned and led migrations of two enterprise e-commerce properties to Shopify Plus, [AOP.com](https://www.aop.com) and [Ignite Christian Academy](https://www.ignitechristianacademy.com). Each migration replaced paid third-party apps with custom Liquid sections and configurable Shopify schemas, built from a custom marketing [design system](/blog/design-systems), giving marketing teams the ability to build and edit sections directly instead of depending on app-store functionality.

Both stores are live on the design system today: AOP.com on the Kalles theme and Ignite Christian Academy on Shopify's Horizon theme. AOP's team added the content and&nbsp;images.

## A Design System, Built in Liquid

Rather than leaning on the app ecosystem for marketing functionality, I built a design system of reusable, schema-driven Liquid sections tailored to each property's content needs: shared brand tokens, a consistent section library, and schema settings that exposed layout and content controls to marketing and design without touching code. The underlying sections stayed consistent and maintainable across storefronts, so designers and marketers could compose new pages from existing pieces instead of requesting one-off builds.

This is a separate design system from [Master Blocks](/projects/master-blocks), the HTML/CMS block system built for WordPress and standalone pages. The Shopify sections are Liquid-native and schema-driven, built specifically for the Shopify theme architecture, but the same principle carries across both: shared tokens and components that designers and developers can both work&nbsp;from.

## Collaboration and Ongoing Support

As the developer on each migration, I worked directly with designers and business stakeholders to build conversion-focused custom marketing sections, responsive across devices and consistent with each brand's design system. I made sure the markup I built was ADA-compliant; a third-party accessibility widget (AccessiBe) covered site-wide accessibility beyond what the custom sections handled directly. Analytics ran through Google Tag Manager, GA4, Shopify Analytics, Shoplift, and Crazy Egg. After each launch, I stayed on for bug fixes and production support.

## Working Across Platform Constraints

The [Shopify Tips](/blog/shopify-tips) write-up covers the practical side of this work in more depth: theme selection, staging workflows, and the tradeoffs of customizing versus extending Shopify's default Horizon theme. Across both migrations, the priority was the same: keep the upgrade path open, build additively, and avoid core theme changes that would leave a store stuck on an unsupported foundation.
