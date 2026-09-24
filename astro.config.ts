import type { AstroIntegration } from "astro";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import { appendFileSync, existsSync, readFileSync } from "node:fs";

// Loaded through jiti, and this module imports nothing from `astro:*`, so the config can read the
// same origin everything else derives canonical and OG URLs from.
import { site } from "./src/data/site";

const outDir = "./dist";

/**
 * A URL that is both in the sitemap and `noindex` is a "Submitted URL marked 'noindex'" error in
 * Search Console, so the two have to agree, and the emitted page is the only source of which it
 * is: `/styleguide` sets `noindex` through the `Seo` prop, and a retired event becomes a redirect
 * page Astro emits with the same tag. Reading the HTML covers both without a second list.
 *
 * Safe to read here: `@astrojs/sitemap` filters in `astro:build:done`, after every page is on
 * disk. `astro:content` is not reachable from the config, so the collection cannot be consulted.
 */
const isIndexable = (page: string): boolean => {
  const { pathname } = new URL(page);
  const html = readFileSync(`${outDir}${pathname}index.html`, "utf8");
  return !/<meta(?=[^>]*\bname="robots")(?=[^>]*noindex)[^>]*>/u.test(html);
};

/**
 * Every redirect page Astro emits — a retired event's route, which `Astro.redirect` in a static
 * build writes as a meta-refresh stub — also becomes a 301 line in the deployed `_redirects`.
 * Cloudflare Pages applies that file before serving assets, so the unstyled stub never paints
 * and crawlers get a real status code; the stub stays as the fallback for any other host. The
 * rule is read off the emitted page, so it follows the event entry with no second list to keep.
 */
const redirectStubs = (): AstroIntegration => ({
  name: "redirect-stubs",
  hooks: {
    "astro:build:done": ({ dir, pages, logger }) => {
      const lines = pages.flatMap(({ pathname }) => {
        const page = new URL(`${pathname}index.html`, dir);
        if (!existsSync(page)) {
          return [];
        }
        const target = /<meta[^>]*\bhttp-equiv="refresh"[^>]*\bcontent="\d+;url=([^"]+)"/u.exec(
          readFileSync(page, "utf8"),
        )?.[1];
        if (target === undefined) {
          return [];
        }
        const from = `/${pathname.replace(/\/$/u, "")}`;
        return [`${from} ${target} 301`, `${from}/ ${target} 301`];
      });
      if (lines.length > 0) {
        appendFileSync(new URL("_redirects", dir), `\n${lines.join("\n")}\n`);
        logger.info(`${String(lines.length / 2)} redirect page(s) added to _redirects`);
      }
    },
  },
});

export default defineConfig({
  /**
   * Typed environment, so a page reads a variable rather than an untyped `import.meta.env`
   * lookup and a missing one fails the build instead of rendering `undefined` into markup.
   */
  env: {
    schema: {
      /**
       * The Turnstile widget's public site key — it ships in the page HTML by design, and the
       * secret half stays in the Pages Function's environment. The default is Cloudflare's
       * documented always-passes test key, so a fresh clone and every preview deploy have a
       * working form with no setup; production sets the real key in the Pages dashboard
       * (docs/tooling.md).
       */
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        access: "public",
        context: "client",
        default: "1x00000000000000000000AA",
      }),
      /**
       * Cloudflare Web Analytics' beacon token. Public by design — it ships in the page —
       * and empty by default, which is how a preview or a fresh clone runs with no beacon at all.
       * The production value is set in the Pages dashboard, beside the Turnstile keys; until it
       * is, GA4 is the only analytics the site has (`docs/analytics.md`).
       */
      PUBLIC_CF_BEACON_TOKEN: envField.string({
        access: "public",
        context: "client",
        default: "",
      }),
    },
  },
  integrations: [sitemap({ filter: isIndexable }), redirectStubs()],
  outDir,
  output: "static",
  site: site.url,
  vite: {
    plugins: [tailwindcss()],
  },
});
