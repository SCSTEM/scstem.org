import type { HastNode, HastPluginDefinition } from "satteri";

import { z } from "astro/zod";

/** The prose column's width at its widest, in CSS px. */
const FIGURE_WIDTH = 704;

const leader =
  '<span aria-hidden="true" class="flex h-lh shrink-0 items-center"><svg class="h-2 w-8" fill="none" viewBox="0 0 32 8"><circle cx="1.5" cy="4" fill="currentColor" r="1.5"></circle><line stroke="currentColor" stroke-width="1" x1="3" x2="32" y1="4" y2="4"></line></svg></span>';

const caption = z.string().trim().min(1);
const classNames = z.array(z.string()).catch([]);

const isBlank = (node: HastNode): boolean => node.type === "text" && node.value.trim() === "";

/**
 * Markdown gets the same figure and link grammar as the components. A paragraph holding only an
 * image with a title becomes a numbered figure captioned with that title, and opens in the
 * lightbox; an untitled image stays inline. Links off the site take the external marker.
 */
export const proseMarkdown = {
  name: "prose-markdown",
  element: [
    {
      filter: ["p"],
      visit(node, ctx) {
        const content = node.children.filter((child) => !isBlank(child));
        const [image] = content;
        if (content.length !== 1 || image?.type !== "element" || image.tagName !== "img") {
          return;
        }
        const { title, ...properties } = image.properties;
        const parsed = caption.safeParse(title);
        if (!parsed.success) {
          return;
        }
        ctx.replaceNode(node, {
          type: "element",
          tagName: "figure",
          properties: {},
          children: [
            {
              ...image,
              properties: {
                ...properties,
                "data-zoomable": "",
                densities: ["1x", "2x"],
                width: FIGURE_WIDTH,
              },
            },
            {
              type: "element",
              tagName: "figcaption",
              properties: {
                className: ["mt-3", "flex", "items-start", "gap-2", "spec-label", "text-muted"],
              },
              children: [
                { type: "raw", value: leader },
                {
                  type: "element",
                  tagName: "span",
                  properties: {},
                  children: [
                    {
                      type: "element",
                      tagName: "span",
                      properties: { className: ["fig-number"] },
                      children: [],
                    },
                    { type: "text", value: ` - ${parsed.data}` },
                  ],
                },
              ],
            },
          ],
        });
      },
    },
    {
      filter: ["a"],
      visit(node, ctx) {
        if (!z.httpUrl().safeParse(node.properties.href).success) {
          return;
        }
        ctx.setProperty(node, "className", [
          ...classNames.parse(node.properties.className),
          "external-link",
        ]);
        ctx.setProperty(node, "rel", ["noopener"]);
      },
    },
  ],
} satisfies HastPluginDefinition;
