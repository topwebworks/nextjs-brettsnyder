---
name: handoff
description: Write a dated handoff snapshot to docs/handoff.md and archive a timed copy to the personal KB so session history is never lost.
argument-hint: "[optional: notes for the next agent]"
---

# Handoff Snapshot

$ARGUMENTS

You are writing a handoff snapshot for the next agent or session picking up this work. They have zero memory of this session. Be concrete and specific.

## When to run this
- When the user says they are switching agents
- After any significant milestone mid-session
- Any time the handoff doc feels stale

**Treat docs/handoff.md like a living whiteboard, not an end-of-session report.**

## Steps

1. Check `docs/build-plan.md` or equivalent planning doc and note current phase plus next tasks.
2. Review what changed this session.
3. Determine today's date (YYYY-MM-DD), current time (HHMM, 24-hour), and the repo folder name.
4. Write the handoff content to two locations:
   a. `docs/handoff.md` - overwrite completely so it always reflects current state
   b. `c:\Users\topwe\OneDrive\Apps\remotely-save\My KB\handoff\YYYY-MM-DD-HHMM-[project-name].md` - timed archive copy, never overwritten
5. Tell the user: "Handoff doc updated and archived to KB. Commit before switching agents if this is a final handoff."

## Write this into both locations

```
# Handoff Snapshot
Last updated by: Codex
Date: [today's date]
Project: [repo folder name]

## Completed This Session
- [file path]: [what changed and why]
- ...

## In Progress (if anything is partially done)
Task: [exact task name]
Status: [what's done, what remains]
Resume at: [file path:line or next concrete step]
Blocker: [anything the next agent needs to know, or "none"]

## Up Next
1. [next task] - [one line on what it involves]
2. [task after that]

## Decisions Made This Session
- [decision]: [why so the next agent does not re-litigate it]

## Build Status
- npm run build: [passes / fails / not checked]
- Known issues: [describe or "none"]

## Notes for Next Agent
[Gotchas, context, anything that is not obvious from the code]
```
