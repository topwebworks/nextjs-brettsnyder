---
title: "Master Blocks Template"
description: "A flexible fluid responsive master template of landing page building blocks. This enabled our marketing team to create lead gen landing pages in a fraction of the time and still keep direct code flexibility available."
contentTitle: ""
achievementTitle: ""
technologies: 
  - "HTML"
  - "CSS"
  - "Javascript" 
  - "Web Design"
category: "Template"
status: "Prod"
featured: false
publishDate: "2022-03-15"
links:
  demo: "/demo/master-blocks/example-aop-lp.html"
  github: "https://github.com/topwebworks/master-lp-blocks"
  live: "/demo/master-blocks/aop-master-lp-blocks.html"
keyAchievements:
  - type: "impact"
    icon: "🚀"
    title: "Accelerated Landing Page Delivery"
    description: "Built a master template of reusable blocks so the marketing team could edit or even create landing pages. The simple HTML/CSS setup let them mix, match, and edit layouts right in the CMS—making campaigns faster to launch and easier to stay on brand."
    metrics:
      - "50% faster landing page development vs. previous workflow"
      - "Modular block system reused across 6+ product brands"
      - "Round 1 pages delivered within 2 business days"
      - "Flexible CMS-compatible HTML/CSS design for long-term scalability"
media:
  items:

---


## The Issue

Thursday afternoon, Marketing conveyed a dire need for landing pages - fast. Their busy season has started without them. The team requires the ability to edit site content, and even play with the layout blocks - the cms approach. Their platforms are WordPress and custom DotNet cms hosting up to 6 different product brands. Some brands will have more than one campaign. They gave me a wireframe to start building the first of many upcoming landing&nbsp;pages.

What would be the fastest most efficient path to churn these out? A template of course! The fact Marketing needs direct code access, and soon, removes any option of introducing new frameworks like Tailwind or a static site generator. The pages have to be in HTML/CSS so the team can edit and repurpose them in the future. The marketing team had been working with basic HTML in cms buckets and widgets for a while&nbsp;already.

## A Solution

By late afternoon, I threw together a quick [wireframe](https://www.figma.com/file/Touan7noP4nCCu9D7xioU2/Master-LP-Blocks-Graybox-(Copy)?type=design&node-id=0%3A1&t=iLDWaBbBw2Z5Y7jr-1) showing what a master template might look like - reflecting their provided wireframe elements - and then some. The concept was to create a flex template of modular content blocks that are portable. Flex is more forgiving of change than CSS Grid. Meaning each block and child element can be moved or deleted without breaking the layout on any cms, or even standalone. The template would include almost all elements they would ever need, then refactor the page from there. The pitch was approved and I was off to the&nbsp;races.

## Default Block Sequence

All blocks can be moved, but what is the best default sequence? Having done some UI a/b testing before, my heatmaps revealed most all conversions take place above the fold. A long page funnel does not work at least for this demographic. The Blocks template needs to be able to work with or without a cms header and footer - a CSS override section is needed to reset entrenched cms styles. It also needs to have modular branding, so use CSS variables. If I want to keep the content blocks portable, I would need global and individual CSS block separation. Lastly, a "user" style override section at the bottom so the core styles above are not erased and break the template upgrade&nbsp;path. 

### Default&nbsp;block&nbsp;sequence:

1. **Hero** block maxed out might have a simple lead-gen form, phone, logo, title, subtext, and 2 buttons. The hero background should contain a video background and modal. I prefer no nav links that send people off the page; kiss most of them goodbye. These landing pages are not microsites...but will include one nav link just in&nbsp;case.

2. **Centered Text** block is to welcome and reinforce what the hero did not say clearly. It could include jump links or buttons to bring them down the&nbsp;page.

3. **Benefits** and features, each with buttons and download links. Include a floating call now button that launches if the user clicks on a benefit icon...they always do. Show this floating call button below the&nbsp;fold.

4. **Tabs** to easily inform and encourage a conversion - images, content, and a&nbsp;button.

5. **Split L/R** content blocks for pacing. Establish value with a deeper expert explanation or pricing options. Mix in user testimonials and a call now&nbsp;button.

6. **CTA** shows a no-brainer offer. Of course, I will click this! I would be crazy not to. Freebies are always good. Forms do not pull at the&nbsp;bottom.

7. **Infobar** is not a large CTA block but a good content divider or small footer that shows a small button, text,&nbsp;etc.

8. **Chat Widget** integration - only used if no existing cms header is in&nbsp;play.

> **Performance Insight**: Now custom cms landing pages are developed twice as fast. They can also work as standalone pages, just have to add in the missing HTML head&nbsp;code.

## The Build

On Friday I started round 1, knocking out the blocks Marketing initially needed. Hero, Center Text, Benefits, Split L/R, CTA, and Infobar. For round 2 I would hit - tabs, videos, modal, floating button, and standalone chat. By Monday Round 1 was ready to test. To demo the template, I inspected elements in Chrome dev tools, moved and deleted blocks in-browser to create the initial wireframe they initially gave me - in just minutes. The beauty of using flex is how forgiving removing or duplicating elements is. I did not use grid as that may not cause too many issues. Kept it simple. Here is the page structure I used to get started. Brand styles and Core styles should be external CSS files. The rest of the styles are in-page&nbsp;overrides.

The goal was for either myself or the marketing team can cut and paste code blocks in-browser first to try out different layouts. Then to screen capture that inbrowser comp for approval. Then hand it off for asset creation or development using the master blocks template. Paste in the corresponding brand styles that include color variables and cms style overrides. To customize further, use in-browser style edits to try things out. Cut and paste from the browser into the "Your Override Styles"&nbsp;section.

```html
<style>

  @import url("../aop-brand.css");
  /* ----------------------------------------------- */
  /* ---------------- AOP BRAND START -------------- */
  /* ----------------------------------------------- */

  /* ------- IMPORT GOOGLE FONTS ------- */
  /* ------- AOP CSS VARIABLES ------- */
  /* ------- AOP HEADER/FOOTER - CMS PAGE OVERRIDES  */

  @import url("../core-styles.css");
  /* ----------------------------------------------- */
  /* --------------- CORE CSS STYLES --------------- */
  /* ----------------------------------------------- */

  /* ------- RESET ------- */
  /* ------- TESTING ------- */
  /* ------- GLOBAL PAGE ------- */
  /* ------- HERO BLOCK ------- */
  /* ------- CENTERED BLOCK ------- */
  /* ------- BENEFITS BLOCK ------- */
  /* ------- INFOLEFT BLOCK ------- */
  /* ------- INFORIGHT BLOCK ------- */
  /* ------- CTA BLOCK ------- */
  /* ------- INFOBAR BLOCK ------- */

  /* ------- RESPONSIVE ------- */

  /* ---------------------------------------------- */
  /* ------------ YOUR OVERRIDE STYLES ------------ */
  /* -------------Just Changed Styles!------------- */
  /* ---------------------------------------------- */
  ...

</style>


<!-- IMPORT FONTAWESOME (https://fontawesome.com/search) -->

<!-- HERO BLOCK START -->

<div class="hero-class"> Hero Content </div>

<!-- HERO BLOCK END -->

<!-- ETC START -->
<!-- ETC END -->
...

<script src = "../index.js"></script>

```

### Recommended&nbsp;approach:

1. Open template with VSCode > Live Server Extension in&nbsp;Chrome.
2. Inspect (F12) elements using Dev Tools > Elements - delete/edit/move elements to test custom&nbsp;layouts.
3. In VSCode, comment out (Ctrl /), move or delete collapsed elements. Review start/end&nbsp;tags.
4. Add new or copy existing "CORE CSS STYLES" to "YOUR OVERRIDE STYLES" at bottom of the&nbsp;CSS.

## Results

After the first round of landing pages were quickly churned out, I added round 2 features to the template. I also created an example to illustrate use for the designers. Links are shown [above](#top-links). Now custom cms landing pages are developed twice as fast. They can also work as standalone pages, just have to add in the missing HTML head&nbsp;code.


