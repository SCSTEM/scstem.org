# Phase 12 — Content strategy (post-overhaul backlog)

**Status:** NOT part of the overhaul. This is the phase-2 backlog (D8): the overhaul ships with existing marketing copy; this file outlines the content work that actually wins search + AI-answer share afterward. Treat each item as a candidate issue, not a spec.

## Why this matters

Technical SEO (Phases 05/10) makes the site *eligible* to rank. Content is what ranks. For a regional STEM nonprofit the competition is thin — consistent, specific content can dominate local queries ("FIRST robotics team near Hanover PA", "youth STEM programs South Central PA", "FLL team for kids York County") and be the cited source when AI assistants answer them.

## Backlog

### Copy revision pass
- Rewrite page copy against DESIGN.md voice: specific over generic (numbers of students, seasons, awards; real names with permission), one clear next action per page. The overhaul deliberately ported legacy copy verbatim — this is where it gets good.
- Audit headings as search intents: each page's h1/h2s should answer a question someone actually asks.

### News/updates cadence (`news` collection is already scaffolded)
- Publish 1–2 posts/month: competition recaps, sponsor spotlights (they'll share/link them — genuine backlinks), season announcements, student stories (with media releases).
- Add `news` index + detail routes, RSS feed, `Article` JSON-LD, news entries in llms.txt when the collection goes live.

### Program landing depth
- Expand `/programs/frc` and `/programs/fll` to genuinely answer: what is it, ages/grades, season calendar, costs, time commitment, how to join — the questions parents search. Consider a page per common query (e.g. "What is FIRST LEGO League?") only if it earns its own intent.
- Location signals: consistent NAP (name/address) in footer + org schema; consider a Google Business Profile if eligible; get listed on FIRST's official team directories with links back.

### FAQ expansion
- Grow the `faq` collection from real inbound questions (contact form themes); FAQPage schema already wired.

### Link building (nonprofit advantage)
- Sponsor logos should be reciprocal: ask each sponsor for a link from their community/sponsorship page.
- Local press for competition results; school district newsletters; FIRST/Chesapeake district listings; chamber-of-commerce and volunteer directories.

### Media
- Replace remaining stock/unDraw imagery with team photography (photo-day checklist per DESIGN.md art direction); build an approved-photo library with releases noted.

### Measurement
- Quarterly review against GA4 key events + Search Console queries; steer topics toward queries with impressions-but-low-CTR.

### Future infrastructure (only when justified)
- Keystatic (git-backed CMS UI) once a non-git editor actually needs it — schemas are already compatible (D2).
- Per-page generated OG images (satori) if news volume makes curated OGs tedious.
- Light theme + theme switcher (tokens already structured for it, D15).
- oxc migration when oxlint/oxfmt support Astro (`docs/adr/0001-toolchain-split.md` has the seam).
- Playwright smoke tests if manual QA starts missing regressions (D13 said zero tests; revisit only with evidence).
