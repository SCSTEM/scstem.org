# Vendored: @nkzw/oxlint-config

Oxlint config from [nkzw-tech/oxlint-config](https://github.com/nkzw-tech/oxlint-config), MIT
licensed (see `LICENSE`). Converted from upstream's `index.js` at commit `755ad2c85b691778f137952b8932f8ca2e9b7221`
(package version 2.0.0).

Vendored rather than depended on, per the repo owner's instruction. Two consequences worth knowing:

- **`.oxlintrc.json` extends this file by path.** Upstream ships an ES module that calls
  `defineConfig`; oxlint's `extends` in a JSON config takes file paths, and its JS/TS config support
  is still flagged experimental. So the object is stored here as JSON — same rules, no new config
  format to adopt.
- **Upstream's `jsPlugins` reference npm packages.** Only `eslint-plugin-perfectionist` is kept; it
  was already a devDependency for ESLint's `.astro` pass. `@nkzw/eslint-plugin` and
  `eslint-plugin-no-only-tests` are not installed, so the rules needing them are removed rather
  than left dangling.

## What was removed, and why

Upstream has 185 rules; 146 are kept. Everything dropped is inapplicable here, not disagreed with:

| Dropped               | Count | Why                                                                                                  |
| --------------------- | ----- | ---------------------------------------------------------------------------------------------------- |
| `react/*`             | 35    | This site ships zero client-side framework runtime (`AGENTS.md`). The `react` plugin is dropped too. |
| `@nkzw/*`             | 3     | Relay and React-effect rules, plus `no-instanceof`; all need `@nkzw/eslint-plugin`.                  |
| `no-only-tests/*`     | 1     | No test suite, and the plugin is not installed.                                                      |
| `server/**` overrides | 2     | Upstream's own project layout; no such directory here.                                               |

Upstream's `.ts` override **is** kept: it turns off the correctness rules TypeScript already
covers (`no-undef`, `no-redeclare`, and similar), which is the config's "fast" principle.

Severity is `error` or `off` throughout — upstream contains no `warn`, which is the point of it.

## How this composes with the repo's own config

`.oxlintrc.json` extends this file and then adds:

- `categories`: upstream sets `correctness: "off"` and enumerates the rules it wants. This repo
  re-enables `correctness` and `suspicious` as a net for anything upstream does not name, and
  `perf` as an error rather than a warning. `style` stays off.
- The vendored anti-slop plugin and its rules.
- `no-restricted-imports` for `legacy/*`.
- An override turning `no-console` off under `functions/**`: a Cloudflare Worker's console is its
  log stream, which is not the unintended-logging case the rule exists for.

## To update

Re-clone upstream, re-run the same conversion (evaluate `index.js` with a stub `defineConfig`,
`JSON.stringify` the result), re-apply the removals in the table above, and record the new commit
here. Do not edit rules to taste — a disagreement with upstream belongs in `.oxlintrc.json` as an
explicit override, where it is visible.
