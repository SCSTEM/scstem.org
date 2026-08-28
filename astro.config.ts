import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  // /styleguide is a noindex review artifact; a URL that is both in the sitemap and
  // noindex is a "Submitted URL marked 'noindex'" error in Search Console.
  integrations: [sitemap({ filter: (page) => !page.includes("/styleguide") })],
  outDir: "./dist",
  output: "static",
  site: "https://scstem.org",
  vite: {
    plugins: [tailwindcss()],
  },
});
