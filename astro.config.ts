import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

// Loaded through jiti, and this module imports nothing from `astro:*`, so the config can read the
// same origin everything else derives canonical and OG URLs from.
import { site } from "./src/data/site";

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
    },
  },
  // /styleguide is a noindex review artifact; a URL that is both in the sitemap and
  // noindex is a "Submitted URL marked 'noindex'" error in Search Console.
  integrations: [sitemap({ filter: (page) => !page.includes("/styleguide") })],
  outDir: "./dist",
  output: "static",
  site: site.url,
  vite: {
    plugins: [tailwindcss()],
  },
});
