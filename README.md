# scstem.org

The website of the South Central STEM Collective (SC2), a 501(c)(3) running FIRST robotics and
hands-on STEM programs in Franklin County, PA. Astro, static, no client-side framework, deployed
by Cloudflare Pages.

```sh
mise install      # pinned node + pnpm
pnpm install
pnpm dev          # http://localhost:4321
pnpm check        # everything CI checks, minus the build
pnpm build        # static build to dist/
```

| Read                | For                                                         |
| ------------------- | ----------------------------------------------------------- |
| `AGENTS.md`         | Architecture, rules, and commands, on one screen            |
| `DESIGN.md`         | The design system; when code and the doc disagree, doc wins |
| `docs/content.md`   | Editing content: sponsors, events, FAQ, robots, team photos |
| `docs/tooling.md`   | Toolchain, CI, performance budgets, environment variables   |
| `docs/analytics.md` | GA4 and Cloudflare Web Analytics, and the event taxonomy    |
| `docs/adr/`         | Decisions and the reasoning behind them                     |

Cloudflare Pages builds from git: `main` is scstem.org, `staging` is staging.scstem.org, and every
other branch gets a noindexed preview URL. Changes land on `staging` first and merge to `main` once
verified there. The contact form and the calendar proxy are Pages Functions in `functions/`.
