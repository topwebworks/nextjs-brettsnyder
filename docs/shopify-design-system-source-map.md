# Shopify marketing-section source map

Located 2026-11-17. Local folders supply code evidence. AOP.com and IgniteChristianAcademy.com are the finished sites and supply the production visuals. Neither theme was edited or deployed.

The complete prefixed section inventory was checked: 15 physical files across both folders, representing eight section families and one alternate tabs snapshot. Schemas were extracted without publishing merchant content or configuration. These code snapshots are not asserted to be the current AOP deployment.

## Production landing pages

- [AOP Monarch](https://aop.com/pages/monarch): deployed MKTG CTA slider, jump navigation, image/text modules, benefits and subject tabs.
- [AOP LIFEPAC](https://aop.com/pages/lifepac) and [Horizons](https://aop.com/pages/horizons): additional product landing-page examples.
- [Ignite online-school overview](https://www.ignitechristianacademy.com/pages/online-school-overview): deployed MKTG slider, info block, comparison table, benefits, custom dropdown navigation and footer.

Use these shipped pages for screenshots and measured styles. The local snapshots explain schemas and section architecture; they are not the final visual references.

Check each candidate page's HTML for deployed `mktg` section identifiers. A shared visual treatment alone does not establish that a section came from this library.

## Historical subject-based product listing

Found the original URL: `https://aop.com/collections/subjects`. The archived MKTG Custom Dev page explicitly points to it as the filter-navigation demo.

As of 2026-11-17, the URL returns HTTP 301 with `Location: /collections/all-products`. The destination's current HTML contains no `mktg` references. The original subjects URL is absent from the current collection sitemap.

[Internet Archive snapshot, 2025-07-15](https://web.archive.org/web/20250715072337/https://aop.com/collections/subjects) returned HTTP 200 when fetched directly. Its HTML contains the `mktg_filter_navbar` section. The indexed page shows subject navigation for Language Arts, Math, Science, History, Bible and Electives, with a product listing and facets. This is historical production evidence; do not label it as a currently working listing or assume its archived dynamic filters still execute.

## Historical demo page

`https://aop.com/pages/mktg-custom-dev` and `/pages/mktg-custom` both return HTTP 301 with `Location: /` as of 2026-11-17. Neither appears in the published page sitemap; no obvious renamed demo was found among its 46 URLs.

The web index still retains a page titled **MKTG Custom Dev**, with repeated tab-layout examples and other section specimens. [The Internet Archive snapshot from 2026-03-17](https://web.archive.org/web/20260317161707/https://aop.com/pages/mktg-custom-dev) also returned HTTP 200 when fetched directly. Its HTML includes `mktg_tabs_block`, benefits, sliders, image/text sections, a base table, universal filter and filter navbar. Treat this as historical evidence, not a working production demo link.

## `shopify-dawn` sibling folder

Six distinct custom section types under `sections/`:

- `MKTG-base-table.liquid`
- `MKTG-benefits-block.liquid`
- `MKTG-cta-slider.liquid`
- `MKTG-info-block.liquid`
- `MKTG-jump-navbar.liquid`
- `MKTG-tabs-block.liquid`

There is also `MKTG-tabs-block copy.liquid`. Treat it as a separate candidate/draft until its use is verified.

`assets/section-mktg.css` contains a shared palette, Open Sans/Caladea roles and legacy theme hooks. Confirm it is loaded by the relevant templates before presenting every declaration as an active storefront token.

The info-block schema exposes media type/alignment, imagery or YouTube, text layout, typography content and separate desktop/mobile spacing. The tabs schema defines repeatable Tab Content blocks and section-scoped variables for navigation, content, media and accordion treatments. These are the main sources for explaining how editable schema settings become rendered sections.

## `shopify-horizon` sibling folder

Eight `MKTG-` sections: the six names above plus `MKTG-custom-footer.liquid` and `MKTG-dropdown-menu.liquid`.

The repository's build plan identifies a Horizon 1.0.4 adaptation with an intentional full-width `container-fluid` override pattern. Its info block uses an explicit background-color setting where the other version uses a color scheme. It also retains some compatibility hooks. The folder name alone is not evidence of the currently deployed store/theme version.

## Supplied development references

The full-page capture at `public/demo/shopify-custom-sections.jpg` preserves the original populated section gallery. The article uses focused crops and opens the complete original in a scrollable native dialog. The image is capped at its native 1438 px width, remains static on hover and loads only when opened. The original is unchanged.

Brett also supplied access to the protected TopWebWorks development-store page. Its section identifiers and horizontal, vertical, accordion and phone tab layouts were checked. Captures are labelled as development specimens, with placeholder content distinguished from the finished AOP and Ignite pages. Store credentials are excluded from documentation and assets.

## Published presentation

- Article: `src/app/projects/content/shopify-migrations/project.md`.
- The hero gallery starts with the original section video, followed by brand tokens, an editable benefit card, section variants, desktop/phone page mockups and a finished Ignite storefront example. The gallery is the design-system reading path; the full-section dialog is the catalog.
- Eight inline figures combine actual section crops with the section contract and page-layout study. The article connects shared rules, working behavior and finished pages, with client artwork/composition credit kept explicit.
- Downloads: `/demo/shopify/shopify-design-system.pdf` and `/demo/shopify/design-system-tokens.json`.
- Motion: `/demo/shopify/subject-tabs.mp4`, an actual AOP subject-panel recording. Surrounding sticky widgets are hidden for the capture; section content and handlers are preserved.
- The original YouTube hero uses a clean poster crop from its own thumbnail; the thumbnail's baked black sidebars are removed. Activating it loads the same video with playback controls. Landscape video frames retain 16:9 at phone and desktop widths.
- Working prototype: `/demo/shopify/tabs/index.html`, embedded inline. Native tabs switch three subject panels; layout and icon controls update the rendering and state readout. Arrow keys, Home/End, responsive stacking and reduced motion are implemented. Original public lesson previews, locally served Open Sans/Caladea fonts and their licenses are bundled. This is a browser study of the schema controls; the production implementation is Shopify Liquid.
- Native document: `BST_261117_shopify-system_v03.figcraft` in the client job's working folder. Twelve pages retain assets, measured-role variables, text styles, a layered benefit component with editable SVG artwork, an image-backed state comparison and the token-to-page studies. Native state comparisons do not execute Shopify logic; the browser prototype provides the working controls.
- Page mockups are selected section compositions and phone detail studies derived from actual AOP captures. They are not represented as historical pre-build designs or exact complete-page reproductions.
- `EnhancedHTMLContent` recognizes an opt-in `a[data-section-gallery]` in Markdown. Its native dialog is portalled outside article styles, preventing the shared inline-image hover rule from affecting the gallery. The original link remains usable without JavaScript.

The client job retains source inventory, screenshots, measurements, crop source and the presentation builder. Six shared section families and the Horizon navigation/footer adaptation are documented without claiming that either local folder is the current production deployment. Public material excludes prices, private merchant configuration and business operations. Client design/marketing ownership of artwork, copy and final composition remains explicit.

Verification: the four-page PDF has a consistent 1280-point width, embedded fonts, Brett Snyder as author and no document warnings. Every page was rendered and inspected. `node scripts/check-section-gallery.mjs` checks both themes at 1200, 390 and 320 px, hero preview activation, design-gallery selection, live prototype behavior, modal keyboard/focus/scrolling, the native-width cap, static hover and the no-JavaScript link fallback. Application checks are recorded in the build plan.
