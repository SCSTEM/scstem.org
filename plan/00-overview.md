# scstem.org Overhaul — Plan Overview

This directory is the complete implementation plan for rewriting scstem.org from Next.js 16 to Astro. Each numbered file is a **self-contained agent brief**: an implementing agent should be able to execute a phase given only that file, this overview, and the repository.

## How to use this plan

- Execute phases **in order**. Each phase file lists its prerequisites; do not start a phase whose prerequisites are unmet.
- All implementation happens on the long-running branch **`astro-rewrite`** (created from `main` in Phase 01). Each phase is developed on a short-lived branch off `astro-rewrite` and merged into it via PR — one PR per phase, titled `overhaul: <phase name>`.
- `staging` and `main` are untouched until Phase 11 (cutover). Cloudflare Pages gives `astro-rewrite` an automatic preview URL (`astro-rewrite.<project>.pages.dev`), which the existing `public/_headers` rules keep noindexed.
- The old site lives in **`legacy/`** during the rewrite (moved there in Phase 01). It is the *reference* for content, copy, URLs, and behavior. **Never import from `legacy/`; never copy components.** Copy *content and intent*, rebuild the implementation.
- Before every commit: `pnpm check && pnpm build` must pass. A phase is done when its acceptance criteria are all checked and CI is green.
- When a phase makes a decision not covered here, record it in `docs/adr/NNNN-<slug>.md` and note it in the phase PR description.

## Objectives (from project owner)

1. Keep the brand (colors, dark look, voice) while making the design *genuinely better* — SEO + accessibility improvements, consistent brand feel, no "AI slop" aesthetic.
2. Content (sponsors, events, FAQ, robots, etc.) becomes markdown/data files — adding a sponsor should take 2 minutes and one small PR.
3. Astro, fully static, minimal dependencies, **zero client-side framework runtime**.
4. SEO across the board, including AI/agent SEO (llms.txt, structured data, semantic HTML).
5. Components split into `ui/` (composed, site-level) and `ui/primitives/` (low-level, shadcn-convention).
6. pnpm + mise + cnfast; strict linting via oxlint/oxfmt (TS/JS/JSON/CSS) and ESLint/Prettier (Astro/MD), ready to collapse onto oxc when it supports Astro.
7. Code health, DX, DRY — kill the page forks and triplicate carousels.
8. 10/10 mobile experience, enforced by Lighthouse CI budgets.
9. A well-defined `DESIGN.md`; design review gate before mass page porting.
10. Agent configs: format/lint hooks on every agent edit, concise `AGENTS.md`.

## Locked decisions (from planning interview)

| # | Decision |
|---|----------|
| D1 | Clean rewrite; `legacy/` in-tree for reference only; staging site used for verification before go-live. |
| D2 | Content via Astro Content Collections (zod-validated markdown). No CMS now; schemas kept flat/simple so a git-backed CMS (e.g. Keystatic) can be added later without restructuring. |
| D3 | Zero framework runtime. `.astro` components + vanilla `<script>` only. No React/Preact islands. |
| D4 | `ui/primitives/` = Astro-native, shadcn-*convention* primitives (CVA variants, shadcn token naming). A repo agent skill (`.claude/skills/shadcn-astro/`) codifies porting shadcn components to Astro. |
| D5 | `output: 'static'`, no adapter. Dynamic bits stay in Cloudflare Pages Functions (`functions/`). |
| D6 | Brand-faithful refresh: keep palette/logo/voice; rebuild type scale, spacing, and polish deliberately. Not jarring — intuitively better. |
| D7 | `cn()` comes from `cnfast` everywhere; `clsx`/`classnames`/`tailwind-merge` are banned imports. |
| D8 | Technical SEO fully in this overhaul, using existing marketing copy/images. Copy revision + content strategy is a phase-2 backlog (`12-content-strategy.md`). |
| D9 | Plan = this directory. |
| D10 | Maximum strictness: type-aware linting, `--max-warnings 0` semantics, strictest tsconfig, blocking CI. |
| D11 | Old source moved to `legacy/`, excluded from all tooling, deleted at cutover. |
| D12 | Vendor `dmmulroy/anti-slop` (oxlint jsPlugin; rules are ESLint-API-compatible). Import sorting/organizing required (oxfmt `sortImports` + ESLint sorting for `.astro`). |
| D13 | Zero test frameworks. Correctness = typecheck + zod content schemas + `astro check` + build-output verification (link check) + Lighthouse CI budgets. |
| D14 | Deploys stay on Cloudflare Pages dashboard git integration. GitHub Actions = PR gates only. |
| D15 | Dark-only. Tokens are semantic (`--color-background`, etc.) so a light theme / theme switcher is a future token-set addition, not a refactor. |
| D16 | Per-program accent themes kept, via `data-theme="frc" | "fll"` remapping accent tokens in pure CSS. |
| D17 | All current URLs preserved exactly; `_redirects`/`_headers` carried over. `/openhouse` and `/programs/frc/kickoff` become instances of a reusable event-landing pattern driven by an `events` collection — seasonal events are markdown files that are easy to update or hide. |
| D18 | Collections: `sponsors`, `events`, `faq`, `news` (scaffold), plus FRC/FLL-specific content nested under `frc/` and `fll/` directories (`frc/robots`, `frc/team-photos`, …). Typed `src/data/site.ts` replaces `legacy/data/config.ts` and hardcoded constants. Former sponsors migrate as `active: false`, not comments. |
| D19 | Calendar pages: vanilla-TS client script rendering a branded agenda, fed by a new Pages Function that proxies the public Google Calendar feed (keys/parsing server-side). Fallback link to Google Calendar for no-JS/agents. |
| D20 | Hero video kept but re-encoded to ≤3 MB with poster, `preload="none"`, `prefers-reduced-motion` respected. All motion is CSS-only; framer-motion/parallax/embla are gone. |
| D21 | Analytics: GA4 via direct deferred gtag (fixes the current GTM-loader-with-GA4-id oddity) **plus** Cloudflare Web Analytics; tracking audit + event taxonomy in Phase 10. |
| D22 | DESIGN.md written analytically first (Phase 02); homepage built against it (Phase 06); then a **visual review gate** with the owner before porting remaining pages. Bar: "start with great." |
| D23 | Branch flow per "How to use this plan" above. |
| D24 | Toolchain split (oxc-first hybrid): oxlint + oxfmt own `.ts/.js/.mjs/.cjs/.json/.jsonc/.css`; ESLint + Prettier own `.astro` and `.md`. When oxlint/oxfmt gain Astro support, migration = delete the ESLint/Prettier half (seam documented in `docs/adr/`). |

## Current-state facts (verified 2026-08)

- Next.js 16 App Router, static export to `build/`, React 19, HeroUI (dark-only, three theme variants: default yellow, FRC "bio" green, FLL), Tailwind v4 (CSS-first), framer-motion, embla (three carousel implementations), react-scroll-parallax, react-hook-form + valibot, Turnstile via React wrapper. ~5,100 LOC, 13 routes, 24 components.
- Hosting: Cloudflare Pages (dashboard-configured; no wrangler config in repo). `functions/api/form/submit.ts` = Turnstile verify + Slack webhook. `public/_redirects` and `public/_headers` (staging/pages.dev noindex, `/team/*` noindex) exist and must survive.
- Content is hardcoded: `data/sponsors.ts` (half commented-out), inline page arrays, JSX robot-history slides, hardcoded calendar IDs and kickoff config.
- Known duplication: `/openhouse` forks the homepage; `/programs/frc/kickoff` forks `/programs/frc`; FLL layout is a copy of FRC layout (still named `FRCLayout`).
- SEO gaps: no sitemap, no OG/twitter meta objects, no JSON-LD, no canonicals, several routes missing metadata entirely, robots.txt has no Sitemap directive, keyword-stuffed `keywords` meta.
- Perf gaps: 72 MB in `public/` (22 MB hero MP4, 11.3 MB parallax WebP, 26 files > 300 KB), `images.unoptimized: true`, no responsive images.
- Tooling today: npm + Biome (write-only scripts, no CI at all), `.nvmrc` v26.5.0.
- Analytics today: GA4 measurement ID `G-3TPD3DLYBR` passed to the Next GTM component.

## Target architecture

```
/
├── AGENTS.md                    # concise agent guide (CLAUDE.md -> symlink)
├── DESIGN.md                    # design system source of truth
├── mise.toml / mise.lock
├── pnpm-workspace.yaml          # install policy (release-age cooldown, allowBuilds)
├── astro.config.ts              # static, site: https://scstem.org, sitemap
├── .oxlintrc.json / .oxfmtrc.json
├── eslint.config.ts             # scoped to *.astro (+ md via Prettier)
├── .prettierrc / .prettierignore
├── .github/workflows/           # ci.yml (check+build+links), lighthouse.yml
├── .claude/
│   ├── settings.json            # PostToolUse format+lint hook
│   ├── hooks/format-lint.sh     # routes files to the right toolchain
│   └── skills/shadcn-astro/     # shadcn -> Astro porting skill
├── docs/                        # adr/, content.md, analytics.md, tooling.md
├── plan/                        # this plan
├── tools/lint/anti-slop/        # vendored oxlint rules
├── functions/                   # CF Pages Functions (form, calendar proxy)
├── public/                      # only true statics: favicons, og, robots, _redirects, _headers
├── src/
│   ├── assets/                  # processed images (brand/, frc/, fll/, sponsors/, team/)
│   ├── components/
│   │   ├── ui/primitives/       # Button, Card, Badge, Input, Accordion, Dialog, Carousel…
│   │   └── ui/                  # SponsorCard, Hero, FeatureGrid, Countdown, FaqList…
│   ├── content/                 # sponsors/, events/, faq/, news/, frc/{robots,team-photos}/, fll/
│   ├── content.config.ts
│   ├── data/site.ts             # org info, URLs, calendar IDs, analytics IDs
│   ├── layouts/                 # BaseLayout.astro, ProgramLayout.astro, EventLayout.astro
│   ├── lib/                     # cn re-export, jsonld helpers, misc
│   ├── pages/                   # routes incl. llms.txt.ts, styleguide (dev-only)
│   └── styles/global.css        # @theme tokens, dark color-scheme, program themes
└── legacy/                      # old site (reference only; deleted in Phase 11)
```

## Phases

| Phase | File | Gate |
|-------|------|------|
| 01 | `01-foundation.md` — branch, legacy move, pnpm/mise, Astro scaffold, full toolchain, hooks, AGENTS.md, CI | CI green on scaffold |
| 02 | `02-design-system.md` — DESIGN.md, tokens, fonts, program themes | DESIGN.md reviewed by owner |
| 03 | `03-primitives.md` — `ui/primitives`, shadcn-astro skill, styleguide page | — |
| 04 | `04-content-model.md` — collections, schemas, data migration, `site.ts` | — |
| 05 | `05-app-shell.md` — BaseLayout, SEO component, base JSON-LD, Navbar, Footer, 404 | — |
| 06 | `06-homepage.md` — homepage port | **Visual review gate: owner sign-off required before Phase 07** |
| 07 | `07-pages.md` — all remaining non-event pages | — |
| 08 | `08-events.md` — event-landing pattern, `/openhouse`, `/programs/frc/kickoff` | — |
| 09 | `09-assets-performance.md` — image/video pipeline, Lighthouse CI budgets | Budgets green in CI |
| 10 | `10-seo.md` — sitemap/robots/llms.txt/OG/JSON-LD completion, analytics | — |
| 11 | `11-cutover.md` — parity verification, staging QA, launch, legacy deletion | Owner approves staging → main |
| 12 | `12-content-strategy.md` — phase-2 backlog (copy revision, content SEO) | Not part of this overhaul |

## Global definition of done (applies to every phase)

- [ ] `pnpm check` passes (typecheck + oxlint + eslint + format checks + knip) with zero warnings.
- [ ] `pnpm build` succeeds.
- [ ] No imports from `legacy/`.
- [ ] New pages have `title` + `description` and pass `astro check`.
- [ ] Anything user-visible respects `DESIGN.md` (from Phase 02 onward).
- [ ] Phase file's acceptance checkboxes updated in the phase PR.

## Performance & quality budgets (enforced from Phase 09; targeted from Phase 01)

- Lighthouse (mobile emulation, throttled): Performance ≥ 95, Accessibility = 100, SEO = 100, Best Practices ≥ 95.
- LCP < 2.0 s, CLS < 0.05, TBT < 100 ms on every page.
- Total client JS < 35 KB gzipped per page including analytics; zero framework runtime.
- No image served larger than 300 KB at any rendered size; hero video ≤ 3 MB, never blocks LCP.
