# Director: Case-Study Visuals

Prepared 2026-11-17. A lighter engineering presentation within the approved Portfolio article format. PushPad remains deferred.

## Article

- Preserve the existing Grok Bot chat capture as the single gallery image.
- Place three diagrams beside the relevant Markdown sections: worker architecture, a checkpoint example, and the recovery path.
- The ten-company example is illustrative, as stated in the article and image. It represents no customer data or production metric.
- Publish WebP images through the existing content generator and outlined SVG downloads under `public/demo/director/`.
- Preserve the personal story and site layout. This is an engineering explanation, with no design-system badge or invented interface screens.

## Evidence

Director Core's `recovery.ts`, `recovery-plan.ts`, `leases.ts` and `worker-sessions.ts` support the diagrams. The recovery database test covers lost sessions, saved checkpoints and resumed work. Role names and responsibilities follow the case study and employee definitions.

Recovery checks saved task state and current ownership. A replacement session receives instructions, passes alignment, acquires a valid lease and reopens the run with its checkpoint. A wake alone does not establish success. Early, stale and duplicate callbacks have separate handling; stalled recovery has bounded retries. The public article keeps its existing qualification that the full external worker path needs validation.

## Editable Deliverables

Client job: `BST_261117_director-visuals`. Three native VectorCraft files retain editable type and paths, with matching SVG and WebP exports. Inter regular/semibold matches the approved documentation style. Public SVGs outline the type to avoid font dependencies. The authoring script is retained with the working masters.

Review the actual exports and article in both themes at desktop and mobile widths. Confirm the single gallery image, three loaded/full-size-linked diagrams, working SVG downloads and current generated JSON.

Verified on 2026-11-17: production build, current generated JSON, three loaded/full-size-linked diagrams, working SVG downloads, and light/dark layouts at 1200, 390 and 320 pixels with no horizontal overflow. The rendered diagrams and article were reviewed; all native fonts resolve exactly with no import warnings. Director application code and the portfolio's shared UI were not changed.
