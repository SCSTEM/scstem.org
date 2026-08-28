import type { APIRoute } from "astro";

import { site } from "@/data/site";

/**
 * The web app manifest, built from `src/data/site.ts`.
 *
 * It used to be a static `public/site.webmanifest` restating the org name, a third variant of the
 * description, and the two brand colours as literals — none of which could follow a rename or a
 * token change. Emitting it from the same constants everything else reads means it cannot drift.
 */
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        name: site.name,
        short_name: site.shortName,
        description: site.description,
        start_url: "/",
        display: "standalone",
        background_color: site.chrome.backgroundColor,
        theme_color: site.chrome.themeColor,
        icons: [
          { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
          { src: "/icon-192.png", type: "image/png", sizes: "192x192" },
          { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
          /**
           * A separate, padded render. The unpadded mark spans ~88% of its box, so a launcher's
           * circular mask — which keeps only the central 80%-diameter circle — clipped the outer
           * stroke and the gear teeth. Reusing the plain icon here was strictly worse than
           * declaring no maskable icon at all, since without one the browser letterboxes instead
           * of cropping.
           */
          {
            src: "/icon-maskable-512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
      },
      undefined,
      2,
    ),
    { headers: { "content-type": "application/manifest+json" } },
  );
