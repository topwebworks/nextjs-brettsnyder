# PushPad: Platform Presentation

Prepared 2026-11-17 within the approved Portfolio article format.

## Article and Media

The case study focuses on supplemental learning: focused lesson pads, authored interactions, mastery checks and educator-controlled support. Brett's supplied homepage screenshot with the boy is the hero. Six inline boards cover the learning path editor, pad anatomy, Fair Shares simulation, mastery and support, learner home, and marketplace ownership.

The roughly 16-second recording shows an actual fraction piece being dragged into the model, followed by model and mode changes in the public preview. The six-page PDF and recording live under `public/demo/pushpad/`. The Markdown generator supplies the article JSON and image imports. Shared portfolio UI is unchanged.

The live demo link goes to the homepage's “Try a Lesson Pad” entry. The site opens `/demo?modal=1` inside its popup; the standalone `/demo` URL is not the portfolio entry point. The popup and its loaded illustration were verified without signing in.

## Evidence and Claims

Sources include Brett's new screenshots, PushPad's public demo, Help Center, How PushPad Works page, and current source documentation. The source application was read, not changed. Mastery, educator control and reading-support articles informed the explanation without importing research statistics or claiming product outcomes.

The public demo uses `PadRunThrough` and shared pad sections. `pad-scoring.ts` defines the equal Problems/Quiz weights and percentage normalization. Vocabulary, Concept, Example, Activity and Practice do not contribute to pad mastery. Assignment mastery requirements govern progression; the article does not claim every assignment is gated or that retries are unlimited.

Support decisions require educator confirmation and affect that learner's issued work. Source edits, learner assignments, frozen marketplace listings and buyer-owned copies remain distinct. Series labels describe pad order without exposing private learning paths. Screenshots show development accounts; their XP, time, counts and scores are not learning-outcome evidence. The recording does not access authenticated learner records.

The status remains Prototype. Current launch checks replace the old, dated debugging narrative. No clinical reading claims, learning gains, preparation-time savings or payment-readiness guarantees are made.

## Editable Source and Cleanup

Client job: `PPD_261117_platform-story`, under `PPD_pushpad`.

Native master: `PPD_261117_platform-story_v02.figcraft`. Eight pages retain the supplied boy hero, six presentation boards and Assets. Captured interface content stays faithful to the application; headings, annotations, section maps and artwork remain editable. The supplied logo retains native vector paths. Documentation uses Inter; screenshots retain PushPad's Urbanist typography. The six-page PDF excludes the hero and is unchanged by this correction.

PhotoCraft crop masters preserve the source pixels. Twenty raw uploads were copied and hash-verified before removing `public/new-pushpad-images/`. Ten obsolete portfolio gallery images were also preserved before removal. New public assets use the repository's existing naming conventions. The source manifest records original filenames, preserved copies, hashes and crop bounds.

## Verification

All six PDF pages were rendered and reviewed. Widths are consistently 1280 points, fonts are embedded, Brett Snyder is the author, and the parser reports no warnings. Native text bounds and the Assets page were checked. The PDF excludes prices and uses educator/learner terminology.

The production build and content generation pass. Resume and cover-letter PDFs were preserved byte for byte. Browser verification covers dark/light themes at 1200, 390 and 320 pixels, six loaded images with full-size links, recording playback, PDF delivery and the Projects listing card.
