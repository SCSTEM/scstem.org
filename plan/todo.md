# Owner tasks

Remaining content decisions, account configuration, and deployed checks for the migration.

## Cutover

The order is `plan/11-cutover.md` §2–§6; these are the steps only an owner can take.

- [ ] **Three copy differences to decide on**, found in the Phase 11 parity pass and logged in no
      earlier phase: the homepage hero reads "Robots are in Franklin County. So are we." where
      legacy read "Robots are cool. So are we."; the Programs panel lost legacy's two program
      taglines; the footer lost its sponsor logos and "Special thanks to our sponsors for powering
      our mission." Each is one edit to keep or revert. `/programs/fll` is also worth a read: legacy
      had a placeholder there, so its copy is the only page written fresh rather than ported.
- [ ] **Cloudflare Pages build settings**, applied to a preview deploy of the top stack branch
      first: build command `pnpm build`, output directory `dist` (was `build`), and a Node/pnpm
      pin matching `mise.toml` if Pages does not read it. Environment: `PUBLIC_TURNSTILE_SITE_KEY`
      (real key for production), `PUBLIC_CF_BEACON_TOKEN`, and the Function secrets `TS_SECRET_KEY`
      and `SLACK_FORM_POST_GENERIC` still bound. `docs/tooling.md` lists all four.
- [ ] **Land the stack**: merge the top-of-stack PR so the cascade lands everything in `staging`.
      Never merge a layer on its own (D23).
- [ ] **Staging soak** on https://staging.scstem.org: phone, tablet, desktop; keyboard-only pass;
      screen-reader smoke on the nav and the contact form; Lighthouse against real Cloudflare
      serving; the contact form end to end with production Turnstile (a Slack message arrives);
      the joining Google Form loaded by scrolling, its direct-link fallback, and submission;
      both calendars live; GA4 DebugView confirming staging does **not** report. Then sign off.
- [ ] **Launch**: merge `staging` into `main`, spot-check pages, redirects, the form, calendars,
      and GA4 Realtime. Submit the sitemap to Search Console and Bing; run the Rich Results test
      and a card debugger on production URLs (the items under Search engines below).
- [ ] **Post-launch watch, two weeks**: Search Console coverage and 404 reports (add `_redirects`
      entries for any missed URL), GA4 continuity against the pre-launch baseline, Function error
      rates in the Cloudflare dashboard. Record the baselines in `docs/analytics.md`.
- [ ] **Decide where `plan/` lives** once launched: it stays as history, or moves under `docs/`.

## Analytics

- [ ] **Create the Cloudflare Web Analytics site and set `PUBLIC_CF_BEACON_TOKEN`** in the Pages
      project's build environment (production and preview). Until it is set the beacon is not
      injected at all — the snippet skips it on an empty token — so GA4 is the only collector.
      `docs/analytics.md` has the details. _(D21 is not fully satisfied until this is done.)_
- [ ] **GA4 property review.** Confirm event-data retention (standard GA4 offers 2 or 14 months), an
      internal-traffic filter if the workshop has a static IP, and unwanted-referral exclusions
      for `paypal.com` and `docs.google.com`.
- [ ] **Mark the six taxonomy events as key events** in GA4 → Admin → Events:
      `get_involved_click`, `donate_click`, `wishlist_click`, `sponsor_packet_download`,
      `outbound_sponsor_click`, `contact_submit`. They fire already; GA4 just does not count them
      as conversions until they are marked.

## Search engines

- [ ] **Verify `scstem.org` in Google Search Console**, submit
      `https://scstem.org/sitemap-index.xml`, and link the property to GA4.
- [ ] **Verify Bing Webmaster Tools**, importing from Search Console rather than re-verifying.
- [ ] **Run the five JSON-LD shapes through the Rich Results Test and the schema.org validator**
      once the site is on a reachable URL: `NGO`, `WebSite`, `BreadcrumbList`, `Event`, `FAQPage`.
      `tools/checks/verify-meta.ts` validates the site's five schema contracts locally, and
      `check:events` exercises future event pages even out of season. Google's eligibility rules
      and the deployed URLs still need an external validation pass. Use a real upcoming event
      for the Event check; the future fixture dates are only for CI.
- [ ] **Check the OG cards in a card debugger** (opengraph.xyz, Facebook's Sharing Debugger,
      LinkedIn's Post Inspector) against the preview deploy. `verify-meta` already proves every
      `og:image` is absolute and resolves to a built file; what it cannot prove is how a given
      network crops and renders it.

## Cloudflare

- [ ] **Spot-check every redirect on the preview deploy**: `/join`, `/biohazard/get-involved`,
      `/biohazard/calendar`, `/biohazard/<anything>`, `/calendar`, `/wiki`, `/wiki/<anything>`.
      `public/_redirects` is carried over verbatim, but Pages evaluates it, not the build.
- [ ] **Confirm the preview/staging noindex header actually lands**:
      `curl -sI https://<branch>.scstem-org.pages.dev/ | grep -i x-robots-tag` should show
      `noindex`. `public/_headers` now carries only those three rules (D25).
- [ ] **Verify apex/www canonical behaviour** in the Cloudflare dashboard — that `www.scstem.org`
      redirects to the apex rather than serving a duplicate. This is dashboard configuration, not
      repository content, which is why nothing in the repo can assert it.

## Content and media

- [ ] **Both events in `src/content/events/` are in the past** (kickoff 2026-01-10, open house
      2026-08-01), so as of this build neither page renders: each redirects to its parent and is
      absent from the sitemap and `/llms.txt`. That is automatic now — an event retires itself once
      its `end` passes, on the first deploy after it. Nothing is broken; the site simply has no
      live event. **Date the next season's entries forward when you have real dates** and both
      pages come back on the next deploy. Refresh the kickoff title, description, body, teasers,
      and hints for the new season as well. `docs/content.md` has the workflow.
- [ ] **Refresh the robot history.** Replace the 2025 placeholder with the real robot's name,
      story, and photograph; add the 2026 season once its details are ready. These entries live in
      `src/content/frc/robots/`. The FRC hero feature chooses the newest photographed entry.
- [ ] **Confirm joining copy.** Check the shared age ranges and dues answer in `src/content/faq/`
      against current team policy. The answers now appear on the program and get-involved pages.
- [ ] **Assign an SC2 calendar owner.** Publish general STEM/community events to the existing SC2
      Google Calendar as the pipeline becomes available. The site combines it with Biohazard
      automatically; avoid independently duplicating events across both calendars. On staging,
      confirm source labels, event descriptions, and the combined Google Calendar fallback.
- [ ] **Re-shoot or re-pick the hero video source if the softness bothers you.** The committed cut
      is 720p because the master is an out-of-focus wide-angle action-cam take, and a 1080p encode
      of it is 2.4x the bytes for no visible difference.
      A sharper master would justify 1080p inside the same 3 MB budget.
- [ ] **Review the OG cards' photography.** The template is fixed;
      which photograph each section gets is a taste call, and the
      seven currently chosen are the best fit from `src/assets/`, not a considered shoot. Swap a
      path in `tools/assets/og-cards.ts` and run `pnpm assets:og`.

## Performance

- [ ] **Watch item, not an open problem: the LCP budget is met, tightest median 1577 ms against
      2000 ms.** The gate had been red on every CI run since Phase 09: the runner's Chrome 152
      fetches below-the-fold images during the initial load where Chrome 141 did not, and
      `astro preview`'s HTTP/1.1 was costing 450 ms of simulated handshakes that Cloudflare's
      HTTP/2 never pays. Closed by measuring over HTTP/2,
      subsetting the fonts, and a 672px image ladder step. If CI
      goes red here again, the job log now prints each URL's LCP element, phases, and request
      waterfall; start there. The levers left on the fonts are the Source Code Pro and Orbitron
      weight axes, measured at 3.2 KB and 0.7 KB.

## Design

- [ ] **Blueprint frame or soft margins outside the wiki.** The 2026-09 review settled the drawing
      frame (DESIGN.md §2, the blueprint register) as the default everywhere, and as the right
      call for the wiki in particular. For the site's other blueprint pages — 404,
      under-construction, special pages — soft margins (the grid fading out before the content
      column, with no frame line) were the close alternative. Revisit once those pages exist in
      the register: keep the frame, or give non-wiki pages soft margins.
- [ ] **Move the design-language guide to the wiki.** `/design-language/` is an unlinked, noindexed
      draft on the site until the team wiki exists. Once it moves, delete
      `src/pages/design-language.astro` and its two `X-Robots-Tag` rules in `public/_headers`.
