# Brightpath Operations: Interface Notes

Prepared 2026-11-17 within the approved Portfolio article format. The presentation uses the existing public, anonymized prototype and its test data.

## Article and Assets

- Refreshed War Room hero; four inline boards cover scoped inbox triage, action verification, event/channel status, and mobile/disconnected states.
- The actual browser recording shows urgency filtering, table/card switching, queued work, rechecking, and simulated Verified / Still failing results.
- Four-page PDF, outlined action-board SVG and recording live under `public/demo/brightpath/`.
- The source remains Markdown, with generated JSON and image imports. Shared portfolio UI stays unchanged.

## Source Evidence

The public prototype uses `MockDataSource` and `MockActionRunner`. Seeded triage notes illustrate the assistant UI; the article's old claim of live Claude-generated notes was removed. No customer data or live provider execution appears in the case study.

`InboxList` scopes filters to the selected brand/event and groups repeated check/channel pairs. Table and card layouts share `exception-body` and `ActionButton`. The default switches to cards below 1024 pixels; the manual view choice persists in browser storage.

`ActionButton` exposes queued, overdue, rechecking, confirmed, recheck mismatch, still failing and rejected outcomes. A reported success is independently checked before displaying Verified. Higher-impact actions require confirmation; check types have an allowed action set. Draft review is a local UI state, separate from execution.

The War Room separates observed status and verification age from inferred and unconnected sources. The disconnection test is a browser-scoped mock state; an unavailable store has distinct copy from a healthy empty inbox.

## Editable Handoff

Client job: `BST_261117_brightpath-system`; native master: `BST_261117_brightpath-system_v01.figcraft`.

Four native pages retain editable annotations, sequence artwork and embedded screenshots. Eight source color roles have light/dark values. The dark border retains its ten-percent white alpha. Documentation uses Inter regular/semibold; the app screenshots retain Geist. The PDF credits Brett Snyder and uses the same 1280-point width on all pages.

Verification includes actual board/PDF renders, generated content, public downloads, recording playback, and desktop/mobile layouts in both portfolio themes. The source application is unchanged.

Verified on 2026-11-17: production build, four loaded/full-size-linked boards, PDF/SVG downloads, 10.8-second recording playback, and light/dark layouts at 1200, 390 and 320 pixels with no horizontal overflow or page errors. All four PDF pages were rendered and reviewed; widths, embedded fonts and author metadata pass. The current resume and cover-letter PDFs were preserved.
