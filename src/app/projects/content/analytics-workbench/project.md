---
title: "Analytics Workbench"
description: "A tool that records what a page and its embedded iframes send to GTM, GA4 and ad platforms, checks the site around them, and explains each problem as a fix."
contentTitle: "Finding Where Tracking Breaks"
achievementTitle: "Recording, Checks & Tools"
technologies:
  - "JavaScript"
  - "Node.js"
  - "Chrome DevTools Protocol"
  - "Vite"
  - "GTM"
  - "GA4"
  - "Vercel"
category: "Developer Tool"
status: "Production"
featured: true
publishDate: "2026-10-22"
links:
  live: "https://analytics.rockitcode.com/"

keyAchievements:
  - type: "technical"
    icon: "🔧"
    title: "Workbench Summary"
    description: "Records the page and every iframe on one timeline, checks it against the published GTM container and GA4 settings, and explains each problem with where it lives and how to fix it."
    metrics:
      - "dataLayer pushes, clicks and GA4, Google Ads and Meta requests from every frame"
      - "Checks for tags, ecommerce, campaigns, consent, cookies and ad conversions"
      - "Seven site tools: campaign links, email, DNS, security policy, server-side tagging, site basics, page speed"
      - "Tested on 11 real sites; errors cut by more than half after tuning"
      - "Online edition runs entirely in the browser, with no accounts or cookies"

media:
  items: []
---

Ad campaigns drive traffic, the store or booking system shows sales, and GA4 credits almost none of them to the ads. The tags fire and Tag Assistant looks fine. I kept running into this, and the cause was usually somewhere most tools don't look: an embedded checkout or form running in an iframe from another domain.

To the visitor it's one page. To the browser it's two sites, each with its own dataLayer and cookies. Events inside the iframe never reach the page's GTM, the campaign on the landing URL doesn't make it into the iframe, and sometimes the purchase is counted twice, once from each side.

Analytics Workbench is the tool I built to see that, and to turn what it finds into fixes.

## What it does

- **Records a session**: dataLayer pushes, clicks, page loads, failed requests, and the requests sent to GA4, Google Ads and Meta, from the page and every iframe, on one timeline.
- **Checks** it against the published GTM container and GA4's public settings. No login needed.
- **Compares** a flow with a GA4 purchase standard or with a recording you know is good.
- **Explains** every problem: where it lives, numbered steps to fix it, and a prompt for an AI coding assistant when code has to change.
- **Exports** a Markdown report you can drop into a ticket or send to a client.

## Seeing inside iframes

Browsers keep sites apart, so an ordinary web page can't see into another site's iframe or its network traffic. The desktop edition gets around that by running its own Chrome through the DevTools Protocol, with a small recorder in every frame. It works on localhost, staging and pages behind a login, and each session starts with a clean profile, like a first-time visitor from an ad.

Each click shows what it triggered within a second and a half. "No dataLayer event or tag hit followed" is the quickest way I know to find a button analytics can't see.

## What the checks catch

- GTM triggers waiting for an event name the site never sends, and variables reading the wrong key.
- Purchases missing value, currency or transaction ID, or sending the value as text.
- Events stuck inside an iframe, and campaigns that never reach it.
- The same purchase sent to GA4 by two senders.
- Ad conversions that won't get credit, with a verdict per platform: credited, at risk or lost.
- Consent problems, tracking cookies set before the visitor agreed, and Safari's 7-day limit on cookies set by script.
- Failed requests, and how much script each tag vendor loads.
- Page basics that affect marketing: a missing title, a leftover noindex, a canonical tag pointing elsewhere, social preview tags and structured data.

## Tools for the rest of the site

Tracking problems often start outside the tags, so I added a Tools menu. Each tool checks one site or domain and gives the same kind of findings:

- **Campaign links**: builds tagged links and catches mixed case, missing source or medium, hard-coded click IDs, and redirects that drop the campaign.
- **Email deliverability**: SPF (including the 10-lookup limit), DMARC, DKIM, MX and MTA-STS.
- **Domain overview**: DNS records, DNSSEC, IPv6 and CAA, plus a snapshot you can compare after a DNS change.
- **Security policy for tags**: what a Content-Security-Policy blocks for GTM, GA4, Google Ads or Meta, and the lines to add.
- **Server-side tagging**: whether Safari will keep the cookies your tagging subdomain sets.
- **Site basics**: certificate, redirects, security headers, robots.txt, the sitemap and broken links on a page.
- **Page speed**: Core Web Vitals from Google's PageSpeed Insights.

They're for checking your own sites. There's nothing in there for scanning other people's.

## Testing it on real sites

Before calling it done, I ran it against eleven real sites: online stores, SaaS companies, a news site, and my own CyWire site. The first pass was too noisy. It reported a dataLayer reset on three large sites because a pattern matched inside minified code. It judged a page that had blocked the audit as if it were the real site. And it warned SaaS companies about missing purchase tracking when they convert on sign-ups.

I fixed each one. A reset now needs proof from the running page, blocked pages are reported as blocked, and purchase checks only apply to sites that sell. Errors across the eleven sites dropped by more than half, and what's left holds up when I check it by hand.

## The embed kit

For products that run inside an iframe, I wrote two small scripts that close the gap from the vendor's side, so site owners don't have to change anything. One runs inside the embedded app and sends each standard event to the page. The other runs on the page, checks where each message came from, and pushes it into the page's dataLayer with the campaign attached. The demo booking form on the site runs on them.

## Online and desktop

The online version at [analytics.rockitcode.com](https://analytics.rockitcode.com/) runs entirely in your browser. You can open the sample recordings, import your own, run Checks and Compare, use the tools, download reports, and record any page with a bookmark. The parts that need to drive a browser, like recording iframes and tag requests or reading another site's certificate, are in the desktop edition, which isn't publicly released yet.

There are no accounts, cookies or analytics on the site. Recordings stay in your browser. When a check needs outside data, your browser asks Google or Cloudflare directly, and the Legal page lists exactly what goes where.

## What it doesn't do

It doesn't change GTM, GA4 or ad accounts, and it doesn't monitor sites over time. Its findings cover what it could see on the pages you checked, not every page of a site.
