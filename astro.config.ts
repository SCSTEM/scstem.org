import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [sitemap()],
  outDir: "./dist",
  output: "static",
  site: "https://scstem.org",
  vite: {
    plugins: [tailwindcss()],
  },
});
