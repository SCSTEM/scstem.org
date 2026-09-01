# Owner tasks

Work that Phases 09 and 10 set up but could not finish, because it needs an account, a dashboard,
or a URL that is actually reachable. Everything here is a deliberate gap, not an oversight — each
item says what is already in the repository waiting for it.

## Analytics

- [ ] **Create the Cloudflare Web Analytics site and set `PUBLIC_CF_BEACON_TOKEN`** in the Pages
      project's build environment (production and preview). Until it is set the beacon is not
      injected at all — the snippet skips it on an empty token — so GA4 is the only collector.
      `docs/analytics.md` has the details. *(D21 is not fully satisfied until this is done.)*
- [ ] **GA4 property review.** Data retention (default 14 months; 26 is available), an
      internal-traffic filter if the workshop has a static IP, and unwanted-referral exclusions
      for `paypal.com` and `docs.google.com`.
- [ ] **Mark the six taxonomy events as key events** in GA4 → Admin → Events:
      `get_involved_click`, `donate_click`, `wishlist_click`, `sponsor_packet_download`,
      `outbound_sponsor_click`, `contact_submit`. They fire already; GA4 just does not count them
      as conversions until they are marked.
- [ ] **Decide the analytics budget question.** `plan/00-overview.md` budgets total client JS at
      < 35 KB gzipped *including analytics*; `gtag.js` is about that on its own, and the Lighthouse
      gate never measures it because of the production-hostname check. Either the budget means the
      site without GA4 (write that down), or Cloudflare Web Analytics' ~5 KB beacon becomes the
      only collector. `docs/analytics.md` closes with the same note.

## Search engines

- [ ] **Verify `scstem.org` in Google Search Console**, submit
      `https://scstem.org/sitemap-index.xml`, and link the property to GA4.
- [ ] **Verify Bing Webmaster Tools**, importing from Search Console rather than re-verifying.
- [ ] **Run the five JSON-LD shapes through the Rich Results Test and the schema.org validator**
      once the site is on a reachable URL: `NGO`, `WebSite`, `BreadcrumbList`, `Event`, `FAQPage`.
      Both validators live on Google infrastructure, which this development environment's network
      policy blocks, so Phase 10 could only assert locally that every block parses, carries
      `@context: https://schema.org`, and has an `@type` — that check is in
      `tools/checks/verify-meta.mjs` and runs in CI. Google's own eligibility rules are what still
      need a run.
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
      2026-08-01) and still render. Either date the next season's entries forward or set
      `hidden: true` — that one field takes the page out of service *and* out of the sitemap and
      `/llms.txt`, with no code change. `docs/content.md` has the workflow.
- [ ] **Re-shoot or re-pick the hero video source if the softness bothers you.** The committed cut
      is 720p because the master is an out-of-focus wide-angle action-cam take, and a 1080p encode
      of it is 2.4x the bytes for no visible difference (`docs/adr/0006-hero-video-encode.md`).
      A sharper master would justify 1080p inside the same 3 MB budget.
- [ ] **Review the OG cards' photography.** The template is fixed
      (`docs/adr/0010-og-cards.md`); which photograph each section gets is a taste call, and the
      seven currently chosen are the best fit from `src/assets/`, not a considered shoot. Swap a
      path in `tools/assets/og-cards.mjs` and run `pnpm assets:og`.
- [ ] **Regenerating the OG cards needs a font step** that CI deliberately does not do:
      `pip install fonttools brotli`, then `pnpm assets:og-fonts` once per machine. Only relevant
      when the cards change.

## Known thin margin

- [ ] **LCP is bimodal under Lighthouse's simulation, and the slow cluster sits over the gate.**
      Five runs of `/programs/frc/robots/` on an idle machine: 1212, 1218, 2039, 2109, 2110 ms,
      against a blocking 2000 ms. `lighthouserc.json` asserts optimistically — best of three runs —
      which is stable and still catches a real regression, but two of the six budgeted pages do
      have runs above 2000 ms, so this is worth knowing rather than assuming green means fast.
      The one lever that would move the slow cluster is the 83 KB of webfont on the critical path
      (Inter, Orbitron and Source Code Pro between them — more than any hero image). Cutting a
      face, or instancing Inter's weight axis, is a DESIGN.md §3 decision, so it was left to you
      rather than made in Phase 09.
