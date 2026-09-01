# Analytics

Two collectors, both cookieless-by-default, both loading after `load` (D21):

| What                     | Where it comes from                                | Status                           |
| ------------------------ | -------------------------------------------------- | -------------------------------- |
| GA4 (`gtag.js`)          | `site.analytics.ga4MeasurementId` — `G-3TPD3DLYBR` | live                             |
| Cloudflare Web Analytics | `PUBLIC_CF_BEACON_TOKEN` (Pages dashboard)         | **unset — beacon does not load** |

`src/components/Analytics.astro` renders both, from `BaseLayout`, at the end of `<body>`.

## When it loads, and when it does not

Two gates, and both are load-bearing:

1. **`import.meta.env.PROD`** — the snippet is absent from `pnpm dev` output entirely.
2. **`location.hostname === "scstem.org"`** — evaluated in the browser, first line of the snippet.
   A `*.pages.dev` preview and `staging.scstem.org` serve _production_ builds from real hostnames,
   so gate 1 alone would send every preview deploy's traffic to the live property. This is also
   why the Lighthouse budgets never see `gtag.js`.

Everything else happens inside an `addEventListener("load")`, and `gtag.js` is injected `async`.
Nothing analytics-related is on the critical path, which is what keeps LCP and TBT clean.

**Consent Mode v2 defaults** are set before `config`:

```js
gtag("consent", "default", {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "granted",
});
```

`analytics_storage: "granted"` is the default because this is a US nonprofit with no ad products
and no EEA audience to speak of. Every advertising signal is denied outright rather than left
unset. Adding a banner later means changing these four values and calling `gtag("consent",
"update", …)` — the structure does not have to change.

## Event taxonomy

| Event                     | Fires when                                                  |
| ------------------------- | ----------------------------------------------------------- |
| `get_involved_click`      | a link to `/get-involved` is clicked, anywhere on the site  |
| `donate_click`            | a link to `/donate` or to the PayPal fundraiser is clicked  |
| `wishlist_click`          | a link to the wiki wishlist is clicked                      |
| `sponsor_packet_download` | a link to the sponsorship packet is clicked                 |
| `outbound_sponsor_click`  | a sponsor's own site is opened from a card or the strip     |
| `contact_submit`          | the contact form gets a successful response — not on submit |

One delegated `click` listener on `document` covers the links. It recognizes the first five by
**destination**, from a table `Analytics.astro` builds out of `src/data/site.ts`: a route is named
once in this codebase, and tagging twenty call sites with `data-track` would be a second list to
keep in step with it. `data-track` is still read first, for the clicks a URL cannot identify — a
sponsor's href is a per-entry value, so `SponsorCard` and `SponsorStrip` carry
`data-track="outbound_sponsor_click"`.

`contact_submit` has no click and no destination, so `ContactForm` dispatches it:
`document.dispatchEvent(new CustomEvent(TRACK_EVENT, { detail: "contact_submit" }))`, with the
event name imported from `src/lib/analytics.ts` by both ends.

**To add an event:** a link destination goes in `destinations` in `Analytics.astro`; anything else
dispatches `TRACK_EVENT` with its name. Then add the row above, and mark it a key event in GA4.

## Verifying it

The snippet is gated on the production hostname, so a local check has to say it is on that host.
Against a production build served by `astro preview`, with the hostname in the emitted snippet
temporarily rewritten to `localhost`, the following was observed in Chromium:

- `dataLayer` after `load`: `["consent","default",{…}]`, `["js",Date]`, `["config","G-3TPD3DLYBR"]`
  — in that order, with the consent defaults first.
- `gtag.js` injected `async` into `<head>`.
- Clicking the header CTA pushed `["event","get_involved_click"]`; a `/donate` link pushed
  `["event","donate_click"]`; an `/about` link pushed nothing.
- Dispatching `sc2:track` with `detail: "contact_submit"` pushed `["event","contact_submit"]`.
- On `localhost` without that rewrite: no `dataLayer`, no tag request, on any page.

In production, GA4's **DebugView** is the equivalent check; `?gtm_debug=x` on a real page turns it
on for that session.

## Owner tasks

These need account access this repository does not have. Tracked in `plan/todo.md`.

- **Cloudflare Web Analytics.** Create the site in the Cloudflare dashboard, copy its beacon
  token, and set `PUBLIC_CF_BEACON_TOKEN` in the Pages project's build environment (both
  production and preview — the hostname gate is what keeps previews out of GA4, and CF Analytics
  is per-site anyway). Until then the beacon is simply absent: the snippet skips it on an empty
  token.
- **GA4 property review.** Data retention (14 months is the default; 26 is available and worth
  taking), an internal-traffic filter if the workshop has a static IP, and unwanted-referral
  exclusions for `paypal.com` and `docs.google.com` so a returning donor is not re-attributed to
  a referral.
- **Key events.** Mark all six events above as key events in GA4 → Admin → Events.
- **Search Console.** Verify `scstem.org`, submit `https://scstem.org/sitemap-index.xml`, and link
  the property to GA4.
- **Bing Webmaster Tools.** Verify, and import from Search Console rather than re-verifying.
- **Structured data.** Run the five JSON-LD shapes (`NGO`, `WebSite`, `BreadcrumbList`, `Event`,
  `FAQPage`) through the Rich Results Test and the schema.org validator once the site is on a
  reachable URL. `tools/checks/verify-meta.mjs` covers parse-and-type in CI; it cannot cover
  Google's own eligibility rules.

## The JS budget covers first-party script only

`plan/00-overview.md` originally budgeted "total client JS < 35 KB gzipped per page **including
analytics**". `gtag.js` is about 35 KB gzipped on its own, so that wording and D21 could not both
hold. Settled by the project owner during Phase 10: **the budget excludes analytics**, and the
overview now says so.

What that means in practice. The Lighthouse gate measures the site without GA4 — not by omission
but by design, since the production-hostname check keeps the tag out of every local run, every
preview deploy, and CI. First-party JS is 0.7–3.1 KB per page, inline in the document, against a
35 KB budget. Production adds `gtag.js` after `load`, so it never touches LCP or TBT; it does add
to total transfer, which the 1 MB page-weight assertion has ample room for.

If that trade ever stops being worth it, Cloudflare Web Analytics' ~5 KB cookieless beacon would
satisfy the original literal reading on its own.
