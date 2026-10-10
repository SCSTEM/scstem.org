import type { AstroIntegration } from "astro";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import { appendFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";

// The config is loaded through jiti, so this module must import nothing from `astro:*`.
import { site } from "./src/data/site";

const outDir = "./dist";

/**
 * A URL both in the sitemap and `noindex` is a Search Console error. Indexability is read off the
 * emitted HTML, which covers explicit `noindex` pages and redirect stubs without a second list;
 * the sitemap filter runs in `astro:build:done`, after every page is on disk.
 */
const isIndexable = (page: string): boolean => {
  const { pathname } = new URL(page);
  const html = readFileSync(`${outDir}${pathname}index.html`, "utf8");
  return !/<meta(?=[^>]*\bname="robots")(?=[^>]*noindex)[^>]*>/u.test(html);
};

/**
 * Every emitted meta-refresh redirect page also becomes a 302 line in `_redirects`. Cloudflare
 * Pages applies that file before serving assets, so the unstyled stub never paints and crawlers
 * get a real status; the stub stays as the fallback on other hosts. The redirects are temporary
 * because the seasonal URLs return. Astro delays a 302 stub's refresh by two seconds, so the stub
 * is rewritten to refresh immediately.
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
        const html = readFileSync(page, "utf8");
        const refresh = /(<meta[^>]*\bhttp-equiv="refresh"[^>]*\bcontent=")\d+;url=([^"]+)"/u;
        const target = refresh.exec(html)?.[2];
        if (target === undefined) {
          return [];
        }
        writeFileSync(
          page,
          html.replace(refresh, (_, meta: string) => `${meta}0;url=${target}"`),
        );
        const from = `/${pathname.replace(/\/$/u, "")}`;
        return [`${from} ${target} 302`, `${from}/ ${target} 302`];
      });
      if (lines.length > 0) {
        appendFileSync(new URL("_redirects", dir), `\n${lines.join("\n")}\n`);
        logger.info(`${String(lines.length / 2)} redirect page(s) added to _redirects`);
      }
    },
  },
});

/**
 * Two bands side by side read as one slab with a seam. Surfaces are read in document order off the
 * emitted HTML, the only place the final sequence is known, conditional sections included. The
 * footer is a band, so a page whose last section is one fails too.
 */
const bandsNeverTouch = (): AstroIntegration => ({
  name: "bands-never-touch",
  hooks: {
    "astro:build:done": ({ dir, pages }) => {
      const touching = pages.flatMap(({ pathname }) => {
        const page = new URL(`${pathname}index.html`, dir);
        if (!existsSync(page)) {
          return [];
        }
        const surfaces = [
          ...readFileSync(page, "utf8").matchAll(/\bdata-surface="([a-z]+)"/gu),
        ].map((match) => match[1]);
        return surfaces.some(
          (surface, index) => surface === "band" && surfaces[index + 1] === "band",
        )
          ? [`/${pathname}`]
          : [];
      });
      if (touching.length > 0) {
        throw new Error(
          `Two band surfaces touch on ${touching.join(", ")} — put a sheet section between them (DESIGN.md §2).`,
        );
      }
    },
  },
});

export default defineConfig({
  env: {
    schema: {
      /**
       * Public by design; the secret half stays in the Pages Function's environment. The default
       * is Cloudflare's always-passes test key, so previews work with no setup; production sets
       * the real key in the Pages dashboard.
       */
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        access: "public",
        context: "client",
        default: "1x00000000000000000000AA",
      }),
    },
  },
  integrations: [sitemap({ filter: isIndexable }), redirectStubs(), bandsNeverTouch()],
  outDir,
  output: "static",
  site: site.url,
  /**
   * Cloudflare Pages serves `<path>/index.html` at `<path>/`; matching that makes
   * `Astro.url.pathname` the served form canonical URLs are read from. `astro dev` and `astro
   * preview` 404 a bare page path where Cloudflare 308-redirects it; endpoints with an extension
   * are exempt.
   */
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
});
