import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://scstem.org",
  output: "static",
  outDir: "./dist",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
