# 0021 — CI is two jobs, reports through each tool's own output, and skips drafts

- **Status:** accepted
- **Date:** 2026-09-26
- **Amends:** [0007](0007-lighthouse-ci-gate.md)

## Context

CI was three jobs: Check (55 s), Build (35 s), and Lighthouse (4 min 20 s), the last waiting on
Build for a `dist/` artifact and then setting the toolchain up a second time. Lighthouse was the
whole critical path; Check ran beside it and finished minutes earlier.

Every pull request ran all three, drafts included.

Reporting was uneven. ESLint findings reached the PR through a hand-written problem matcher whose
greedy message group kept the column padding of the stylish formatter, so every annotation ended
in spaces. `tsc`, `astro check`, Prettier, and knip reported only into the log.

The setup action ran a bare `mise install`, which installs every tool in `mise.toml`, including
`agent-browser`, a local tool no job uses. When pnpm 12 dropped a flag mise 2026.8.14 passed while
installing it, setup failed, and the later steps, which run after any failure so that one run
reports every problem, linted without dependencies and posted a screen of false errors.

## Decision

1. **Drafts run nothing.** The `pull_request` trigger adds `ready_for_review`, and both jobs skip
   when the pull request is a draft. Marking it ready starts the run.
2. **Two jobs.** Check is unchanged in content. Build now carries Lighthouse as its last steps,
   against the `dist/` it just built: no artifact round trip and no second toolchain setup.
   Lighthouse stays one sequential run of three per URL; parallel jobs would cut wall-clock time
   but repeat the setup for each shard.
3. **Lighthouse is skipped for a build that already passed.** The build is deterministic (two
   builds of one commit hash identically, file for file), so a `dist/` identical to one that
   passed, served by the same `tools/ci/` and measured by the same `lhci`, has nothing new to
   measure. A pass caches an empty marker under the hash of those inputs; a later run that finds
   the marker skips the audit and says so in the job summary. Pull requests that change only
   docs, tooling, or CI finish without the four-minute audit.
4. **The full-page screenshot is off.** It is only an image in the HTML report, and it was 1.3 s
   of each of eighteen runs.
5. **Each tool reports through its own output.** ESLint through `eslint-formatter-gha`, which
   writes workflow commands from ESLint's results rather than parsing text; knip through its
   built-in `github-actions` reporter; lychee through its action's job summary. `tsc` output is
   read by the matcher `actions/setup-node` ships, copied verbatim into
   `.github/typescript-matchers.json`; `astro check` has no machine-readable mode and colors its
   output regardless of TTY, so the same file carries a matcher that tolerates the color codes.
   Prettier reports no positions, so an unformatted file becomes one file-level annotation.
6. **Setup installs `node` and `pnpm` only**, and later steps run only when setup succeeded.

## Alternatives considered

- **Lighthouse as a matrix, one job per URL.** About two minutes of wall-clock time instead of
  five, for roughly a quarter more runner time. Declined in favour of the skip, which removes the
  audit entirely from the runs where it cannot find anything.
- **Splitting Check into parallel jobs.** Check is not on the critical path, and each job pays the
  setup again.
- **Fixing the ESLint matcher's regex.** Fixes the padding and keeps a parser of human-oriented
  output in the repo. The formatter reads ESLint's structured results.
- **ESLint and knip as SARIF into code scanning.** Both can emit it, and the repo is public so
  code scanning is free. It needs `security-events: write` and an upload action, and findings
  arrive as delayed code-scanning alerts rather than annotations on the run.
- **html-validate over `dist/`.** Astro does not validate the markup it emits, so content-model
  errors and duplicate IDs across composed components are the one class of bug it would add. On
  this site its recommended preset reported 54 findings and none was a defect: inline styles on
  `/styleguide/`, the doctype and refresh delay of the redirect stubs Astro writes, an input with
  no `type`, and a `role="region"` div. `astro check` types element attributes, `jsx-a11y` lints
  the source, and Lighthouse's accessibility audit catches duplicate IDs and ARIA misuse on the
  budgeted pages. Of the `verify-meta` checks it covers only the one-`<h1>` and one-`<title>`
  rules.
- **Skipping unneeded Lighthouse audits.** Measured: skipping `bf-cache` and the screenshot audits
  changed nothing. Each run is about 6.5 s of gathering, 2.4 s of it the navigation itself.

## Consequences

- Required status checks are Check and Build; Lighthouse no longer reports as its own check.
- A Chrome update on the runner cannot fail a build that already passed; it shows on the next
  change to the site. 0018's reasoning for measuring the runner's Chrome still holds for every
  build that is new.
- The pass marker lives in the Actions cache, so it is scoped the way caches are: a pull request
  sees its own passes and its base branch's, and an evicted marker only costs one more audit.
- GitHub renders at most ten annotations of each severity per step; a larger failure is complete
  in the log.
- Tool gaps that remain hand-rolled, because no maintained tool covers them: cross-page title and
  description uniqueness, description length, canonical presence, the `og:image` checks, and
  trailing-slash links (`tools/checks/verify-meta.ts`; lychee and html-validate were tested
  against each), and the Lighthouse job summary (`tools/ci/lighthouse-summary.ts`); `lhci` writes
  none.
