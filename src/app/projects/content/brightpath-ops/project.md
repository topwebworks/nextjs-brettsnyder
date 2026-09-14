---
title: "Brightpath Operations"
description: "A functional UI prototype for an internal operations tool designed to surface only what needs attention across events and courses, built to triage alerts from multiple platforms with AI-assisted notes once connected to live data."
contentTitle: "Only What Needs Attention"
achievementTitle: ""
technologies:
  - "Next.js"
  - "TypeScript"
category: "Prototype"
status: "Prototype"
featured: false
publishDate: "2026-09-14"
links:
  live: "https://nextjs-nr-ops.vercel.app"
keyAchievements:
  - type: "technical"
    icon: "🚨"
    title: "Prioritized Operations Inbox"
    description: "A functional UI prototype for consolidating alerts from multiple platforms into a single inbox, sorted by urgency, designed to plug into live data once connected."
    metrics:
      - "Now / Soon / Routine tabs segment open issues by urgency"
      - "Grouped view designed to trace related exceptions back to a single upstream cause"
      - "War Room, Playbooks, and Access Review interfaces round out the operational workflow"
media:
  items: []
---

## Only What Needs Attention

This was originally built as an internal tool for another company. Since it's internal, the names here have been changed for this demo.

Most of the noise in an operations inbox isn't worth a person's attention. Brightpath Operations is a UI prototype for a dashboard that would pull alerts from every connected platform and sort them into Now, Soon, and Routine, so a team could see what's actually urgent instead of triaging everything by hand.

## Where the Alerts Would Come From

The dashboard is built to monitor and integrate with Kajabi, Zoom, ClickFunnels, n8n, and Zapier, catching issues like registration failures, join-delivery problems, email bounces, duplicate automation processing, and data inconsistencies across those systems. No backend or API connections are live yet, so everything shown runs on test data only, no real customer or operational data involved. The interaction design, including a grouped view meant to trace several related exceptions back to a single upstream cause, is built and ready to wire up.

## Notes, Not Just Alerts

Each issue card includes an AI-generated note, powered by Anthropic's Claude, that explains a likely root cause and a recommended next step. Action buttons on each card, like retry delivery or confirm, are built into the interface and ready to trigger real actions once connected to live systems.

## Pricing Governance and Access Review

Beyond the inbox, the prototype includes Pricing Governance controls for managing pricing-related policies, and an Access Review interface for auditing user permissions.

## Built in an Afternoon

The whole dashboard took a couple hours to put together, start to finish. That's the pace AI-assisted development makes possible when the shape of the problem is already clear.
