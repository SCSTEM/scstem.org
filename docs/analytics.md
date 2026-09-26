# Analytics

Two collectors, both cookieless-by-default, both loading after `load`:

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

The snippet is gated on the production hostname, so a local check has to pretend to be that host:
build, rewrite the hostname in the emitted snippet to `localhost`, serve with `astro preview`, and
watch `dataLayer` after `load` — `["consent","default",{…}]`, `["js",Date]`, `["config",…]` in
that order, then `["event",…]` entries as links are clicked. In production, GA4's **DebugView** is
the equivalent check; `?gtm_debug=x` on a real page turns it on for that session.

## Owner tasks

These need account access this repository does not have.

- **Cloudflare Web Analytics.** Create the site in the Cloudflare dashboard, copy its beacon
  token, and set `PUBLIC_CF_BEACON_TOKEN` in the Pages project's build environment (production
  and preview). Until then the beacon is absent: the snippet skips it on an empty token.
- **GA4 property review.** Data retention (14 months is the default; 26 is available), an
  internal-traffic filter if the workshop has a static IP, and unwanted-referral exclusions for
  `paypal.com` and `docs.google.com` so a returning donor is not re-attributed to a referral.
- **Key events.** Mark all six events above as key events in GA4 → Admin → Events.

## The JS budget covers first-party script only

The 35 KB gzipped per-page JS budget (`lighthouserc.json`) excludes analytics: `gtag.js` is about
35 KB on its own. The Lighthouse gate measures the site without GA4 because the hostname check
keeps the tag out of every local run, preview deploy, and CI run. Production adds `gtag.js` after
`load`, so it never touches LCP or TBT; it does add to total transfer, which the 1 MB page-weight
assertion has room for.
