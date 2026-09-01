# 0009 — Everything is crawlable, AI crawlers included

- **Status:** accepted
- **Date:** 2026-09-01

## Context

The legacy site shipped this `robots.txt`:

```
User-agent: *
Disallow: /image
Disallow: /video
```

and these per-path headers on the production host:

```
https://scstem.org/image/*   X-Robots-Tag: noindex
https://scstem.org/video/*   X-Robots-Tag: noindex
```

Nobody now remembers what those were guarding. What they actually did was keep every photograph
of the team, and the hero footage, out of Google Images and video search — the two surfaces where
a robotics nonprofit's own photography is its best organic reach.

Two questions had to be settled together: whether anything on the domain justifies blocking a
crawler, and what to say to the AI crawlers that did not exist when the legacy file was written.

## Decision

**Nothing on `scstem.org` is disallowed.** `robots.txt` is an allow-all with a `Sitemap:`
directive. The `/image` and `/video` rules are gone from both the file and `_headers`, per D25.

**No AI crawler is blocked** — not GPTBot, ClaudeBot, PerplexityBot, CCBot, or any successor.
Being cited in an AI answer is objective 4 of this overhaul, not a leak to defend against. That
is also what `/llms.txt` and the structured-data work in this phase are for; blocking the crawlers
while publishing a manifest for them would be incoherent.

**The precondition for both is D25: no private or internal content lives on this domain.** Checked
before landing this — `src/content/` and `src/pages/` hold marketing copy, sponsor records, robot
history, a published FAQ, and a public event's published schedule. Rosters, meeting notes, and
anything else internal live on the wiki, off this domain, and must stay there.

`_headers` keeps only the three preview/staging `X-Robots-Tag: noindex` rules, so a
`*.pages.dev` or `staging.scstem.org` copy of the site never competes with production.

## Alternatives considered

- **Keep blocking AI crawlers, allow search crawlers.** A defensible posture for a publisher whose
  business is its text. This organization's interest is being found by a parent in Franklin County
  who asks an assistant where their kid can do robotics.
- **Keep the media `Disallow` rules "just in case".** They cost image and video search traffic
  today for a risk nobody could name. If a specific asset ever must not be indexed, the answer is
  not to publish it here.

## Consequences

- Team photography is indexable. Everything under `src/assets/` should be looked at as public
  material, because it is.
- Reversing this for a specific crawler is a `robots.txt` edit, but reversing it for the media
  paths would undo the reach this is meant to gain. Revisit only with a named reason.
