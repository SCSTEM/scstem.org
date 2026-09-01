import { readFileSync } from "node:fs";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

// Loaded through jiti, and this module imports nothing from `astro:*`, so the config can read the
// same origin everything else derives canonical and OG URLs from.
import { site } from "./src/data/site";

const outDir = "./dist";

/**
 * A URL that is both in the sitemap and `noindex` is a "Submitted URL marked 'noindex'" error in
 * Search Console, so the two have to agree — and the page itself is the only honest source of
 * which it is. `/styleguide` sets `noindex` through the `Seo` prop; an event retired with
 * `hidden: true` (D17) becomes a redirect page Astro emits with the same tag. Reading the emitted
 * HTML covers both, and anything else that grows a `noindex`, without a second list to maintain.
 *
 * Safe to read here: `@astrojs/sitemap` filters in `astro:build:done`, after every page is on
 * disk. `astro:content` is *not* reachable from the config, which is why the events collection
 * cannot be consulted directly.
 */
const isIndexable = (page: string): boolean => {
  const { pathname } = new URL(page);
  const html = readFileSync(`${outDir}${pathname}index.html`, "utf8");
  return !/<meta(?=[^>]*\bname="robots")(?=[^>]*noindex)[^>]*>/u.test(html);
};

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
       * Cloudflare Web Analytics' beacon token (D21). Public by design — it ships in the page —
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
  integrations: [sitemap({ filter: isIndexable })],
  outDir,
  output: "static",
  site: site.url,
  vite: {
    plugins: [tailwindcss()],
  },
});
