import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// Loaded through jiti, and this module imports nothing from `astro:*`, so the config can read the
// same origin everything else derives canonical and OG URLs from.
import { site } from "./src/data/site";

export default defineConfig({
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
