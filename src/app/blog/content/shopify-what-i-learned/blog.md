---
title: "Shopify, What I Learned"
description: "While my suggestion to explore BigCommerce was bypassed in favor of other headless solutions, the decision ultimately landed on Shopify."
contentTitle: "What I learned after a year in Shopify"
achievementTitle: "Key Takeaways"
tags: 
  - "Liquid"
  - "Shopify" 
category: "Technology"
status: ""
featured: true
readTime: "8 min read"
publishDate: "2025-03-31"
author: "Brett Snyder"
excerpt: "During my due diligence, I identified BigCommerce and Shopify Pro as the leading contenders."
links:
  canonical: "https://brettsnyderdev.com/blog/modern-web-trends-2025"
  external: "https://web.dev/vitals/"
keyAchievements:
  - type: "impact"
    icon: "🌱"
    title: "Shopify Content Development Tips"
    description: "Key solo development lessons for scalable, maintainable Shopify builds"
    metrics:
      - "Use Horizon theme — stable, updated, and safer for long-term upgrades"
      - "Additive approach and preserve Shop store upgrade paths. Do not change core files."
      - "Templates = content, Pages = URL wrappers"
      - "Clone templates for new content, assign to temp pages for approvals, then swap live"
      - "Adopt date-based naming for templates to track versions and iterations"
      - "Clone themes to safely test frontend without affecting live content"
      - "Use Matrixify for targeted, transfers between staging and production"

media:
  items:

---

##

Our previous custom CMS, built on .NET, served us well for many years with its bespoke features and adaptive responsive capabilities. However, the aging system's limitations became increasingly apparent as time passed, holding us back from scaling and modernizing effectively. It was clear we needed to explore new&nbsp;options.

During my due diligence, I identified BigCommerce and Shopify Pro as the leading contenders. While my suggestion to explore BigCommerce was bypassed in favor of other headless solutions, the decision ultimately landed on Shopify. I was surprised by this choice, given my preparation for a more developer-centric platform like Next.js. However, Shopify proved to be a robust solution for our&nbsp;needs.


## The Transition to Shopify

When I first explored Shopify through a sandbox environment, I found it to be a basic CMS compared to other headless setups. Despite this simplicity, it offered significant potential for customization and scalability. To meet our tight migration timeline, we selected one of the highest-rated themes available on Shopify and began rebuilding marketing pages while maintaining updates on our legacy sites. This was far from a simple lift-and-shift process; it required careful planning and execution due to the complexity of our current custom e-commerce&nbsp;setup.

The transition involved juggling logistics managed by various teams while I focused on marketing pages, menus, collections, apps, and branding elements. With collaboration across departments, we successfully launched our new Shopify site—a major&nbsp;milestone.

## Would I Recommend Shopify?

Yes, for businesses with a large product catalog or plans to scale! Shopify's collections and product metadata features are incredibly powerful. Even for smaller catalogs, knowing that Shopify is built to handle enterprise-level operations provides peace of mind. Its SaaS model ensures consistent updates and maintenance while offering flexibility through themes and apps within reasonable&nbsp;boundaries.

## Theme Selection: A Cautionary Tale

While we initially opted for a top-rated 3rd party theme, I wouldn’t make the same choice again. While not inherently a bad choice, heavily customizing third-party themes can lead to unintended consequences down the road. Shopify stuffs many backend shop system features into the theme itself. If core customizations are critical, you may have chosen the wrong feature path. Eventually, you may be stuck on a sandy foundation of core changes that affect another core system,&nbsp;etc., and your upgrade path&nbsp;is&nbsp;gone. 

Instead, I recommend starting with Shopify’s new default Horizon theme. Constantly updated first by Shopify. It’s minimalist yet feature-rich out of the box and pairs well with Shopify’s official free apps. While third-party apps can be useful, they introduce potential conflicts and dependencies that may hinder long-term&nbsp;stability.

## Horizon = CSS Grid

If you have legacy sections that do not use css Grid, here is my approach to override Shopify's Horizon theme grid system. I usually prefer using **flexbox** instead of the constrained css grid&nbsp;system.

```css
{%- style -%}
  /* Override Horizon grid system for full width layout */
  {% if stt_layout == 'container-fluid' %}
  html body .shopify-section.section.section-all.centered-slider#shopify-section-{{ sid }} {
    display: block !important; /* Override grid display with maximum specificity */
    grid-template-columns: none !important; /* Remove grid columns */
  }

  html body .shopify-section.section.section-all.centered-slider#shopify-section-{{ section.id }} > * {
  grid-column: unset !important; /* Remove grid column constraints */
  }
  {% endif %}
{%- endstyle -%}
```

## Embracing Liquid and Schema

Initially skeptical about Shopify's Liquid templating language and schema-based settings approach, I’ve grown to appreciate the power and flexibility. Within weeks of experimenting with Liquid after the initial migration, I designed and [developed](https://aop.com/pages/mktg-custom-dev) several modular marketing sections that replaced two paid apps while greatly enhancing functionality. I have already refactored them into Shopify's new Horizon&nbsp;theme.

Liquid allows you to create reusable components (sections) that streamline development without extensive coding knowledge. Better to build your theme marketing sections from scratch than try to shoehorn the existing template sections. Add to - not replace theme sections... and you do not break your upgrade&nbsp;path.

## Static Site Generation vs. Shopify

While platforms like Next.js offer unparalleled speed and flexibility (and remain my go-to for smaller personal projects), here are some&nbsp;tips:

- CLI Workflow: Shopify’s CLI allows you to push/pull code changes but lacks robust multi-environment workflows (e.g., Dev/Staging/Prod). My recommendation is to maintain a staging environment for testing apps/products and use&nbsp;production for marketing content. Think of GitHub as just a backup resource instead of a deployment hub like you might with&nbsp;Vercel.
- Theme Cloning: Cloning themes for feature testing is a game-changer in Shopify. You can safely test new features by creating theme clones named after specific feature requests without affecting live&nbsp;content.
- Matrixify: Use this app to transfer targeted data between staging tests and production environments efficiently.

## Marketing Content Development Tips

- Templates = Unique Content. Templates house your actual&nbsp;content.
- Pages = URL Wrappers. Pages act as wrappers that link templates to specific&nbsp;URLs.
- To create new content for an existing landing page: Clone the content template, make your changes, then assign it to a temporary page wrapper for approvals. After approval, swap the new content theme out with the old in your live page wrapper. Suggest a date-based naming convention for all content&nbsp;templates.
- Use hidden pages during review cycles or create reusable temporary wrapper pages for ongoing testing or scheduled iterations. I rotate through several temp page wrappers each&nbsp;month.

## Final Thoughts

Shopify offers a balanced mix of simplicity and power for e-commerce businesses of all sizes. By leveraging default Shopify, building custom Liquid/Schema components from scratch, and free official Shopify apps while avoiding over-customization pitfalls, you can build a scalable store that remains easy to maintain over time. Shopify is my favorite e-commerce platform, and I hope my basic review helps anyone looking into&nbsp;Shopify.

> When you become a Shopify Dev partner, you can also first develop your theme free of charge until you are ready to transfer it to a public paid&nbsp;account. 
