# Archived template code review

Reviewed 2026-11-17. Scope: both Master Blocks pages and all three email previews. The aim is to keep the historical work usable as a public archive, without adding production lead or email delivery systems.

## Master Blocks repairs

- Added a doctype, document language, UTF-8 metadata, titles and explicit head/body boundaries. Standards mode exposed a 320 px header overflow; the header now wraps.
- Kept the native radio selector, restored keyboard focus and visible phone labels, and made inactive panels inert. Selection still uses the original checked-state CSS.
- Replaced the click-only video overlay with a native dialog, named controls and a 44 px close button. Escape closes it, focus returns to the trigger, and the video unloads on close.
- Added proper form labels and autocomplete hints. The submit button starts disabled and is enabled only after the local-only handler is attached. Demo submission sends no lead request. Obsolete campaign consent links were replaced with a clear demo notice.
- Replaced the two remote behavior scripts with one local script. The old benefits-block click handler could cancel its child links; it is gone. The floating call control handles scrolling and jump scrolling.
- Bundled the existing S3 images, subject SVGs and existing Font Awesome script. Its original license notice is retained. Google Fonts and YouTube remain external media dependencies.
- Disabled the historical Genesys live-chat integration in the public example. Added reduced-motion rules, descriptive image text and safe new-tab link attributes.

## Email repairs

The existing table layout, inline presentation and Outlook-specific markup remain appropriate to the artifact's medium. Layout tables now have `role="presentation"`, decorative spacers have empty alt text, and new-tab links have safe rel attributes. The master has a descriptive document title; archive pages are excluded from search indexing. The previous 42 image-reference repairs remain in place.

Passing browser previews does not certify rendering in delivered Outlook, Gmail, Apple Mail or other inboxes. This review sent no campaigns and did not use preference links. Current Gmail supports style blocks and media queries; the old source comments about head CSS being stripped should not be read as a universal rule.

## Verification

`node scripts/check-legacy-demos.mjs [origin]` checks 15 layouts, standards mode, image loading, duplicate IDs, alt attributes, presentational email tables, radio keyboard behavior, dialog focus/close, floating-call behavior, local-only form action and the no-script button guard. POST attempts to the site origin fail the check; outbound media POSTs are blocked during testing.

References: [native dialog behavior](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog), [radio-group keyboard behavior](https://www.w3.org/WAI/ARIA/apg/patterns/radio/), [Gmail CSS support](https://developers.google.com/workspace/gmail/design/css).
