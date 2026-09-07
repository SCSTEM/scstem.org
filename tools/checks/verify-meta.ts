import { z } from "astro/zod";
/**
 * Asserts the head of every built page (plan/10 §2).
 *
 * `astro check` proves a page passed `title` and `description` to `BaseLayout`; it cannot prove
 * two pages did not pass the *same* ones, that a description is a length a search engine will
 * print, or that an `og:image` resolves to a file that exists. Those only become visible in
 * `dist/`, which is why this runs after the build rather than inside `pnpm check`.
 *
 * Redirect pages are skipped: Astro writes them, they carry `noindex`, and none of this applies.
 *
 *     pnpm build && node tools/checks/verify-meta.ts
 */
import { readdir, readFile, stat } from "node:fs/promises";
import { extname, join } from "node:path";

const DIST = "dist";

/** Every file under `dir`, recursively, whose name passes `keep`. */
const walk = async (dir: string, keep: (name: string) => boolean): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(path, keep);
      }
      return keep(entry.name) ? [path] : [];
    }),
  );
  return nested.flat();
};
/** Google truncates a description around 160 characters and ignores one too short to be useful. */
const DESCRIPTION_MIN = 50;
const DESCRIPTION_MAX = 160;

/** Every `<meta>`/`<link>` tag on the page, as raw text. */
const tags = (html: string): string[] =>
  [...html.matchAll(/<(?:meta|link)\b[^>]*>/gu)].map((match) => match[0]);

const attribute = (tag: string, name: string): string | undefined =>
  new RegExp(`\\b${name}="([^"]*)"`, "u").exec(tag)?.[1];

/** `<meta name="description">` → its content, for every tag matching one key/value pair. */
const contentsOf = (html: string, key: string, value: string): string[] =>
  tags(html)
    .filter((tag) => attribute(tag, key) === value)
    .flatMap((tag) => attribute(tag, "content") ?? attribute(tag, "href") ?? []);

const count = (html: string, pattern: RegExp): number => [...html.matchAll(pattern)].length;

/** `dist/programs/frc/index.html` → `/programs/frc/`. */
const routeOf = (path: string): string =>
  `/${path.slice(DIST.length + 1).replace(/(?:^|\/)index\.html$/u, "")}/`.replace("//", "/");

const exists = async (path: string): Promise<boolean> => {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
};

/** The keys asserted on every JSON-LD block; the rest of the object is opaque here. */
const JsonLd = z.looseObject({
  "@context": z.literal("https://schema.org"),
  "@type": z.string().min(1),
});

const paths = (await walk(DIST, (name) => extname(name) === ".html")).toSorted();
const pages = await Promise.all(
  paths.map(async (path) => ({ html: await readFile(path, "utf8"), route: routeOf(path) })),
);

const failures: string[] = [];
const seen = { description: new Map<string, string>(), title: new Map<string, string>() };
/** og:image checks are deferred so the reads run together rather than one per page. */
const images: { image: string; route: string }[] = [];

for (const { html, route } of pages) {
  const fail = (message: string) => failures.push(`${route}: ${message}`);

  if (/<meta[^>]*\bhttp-equiv="refresh"/u.test(html)) {
    continue;
  }

  const titles = [...html.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gu)].flatMap(
    (match) => match[1] ?? [],
  );
  const [title] = titles;
  if (title === undefined || titles.length !== 1) {
    fail(`${String(titles.length)} <title> elements, expected exactly 1`);
  } else {
    const other = seen.title.get(title);
    if (other !== undefined) {
      fail(`<title> is identical to ${other}'s`);
    }
    seen.title.set(title, route);
  }

  const descriptions = contentsOf(html, "name", "description");
  const [description] = descriptions;
  if (description === undefined || descriptions.length !== 1) {
    fail(`${String(descriptions.length)} meta descriptions, expected exactly 1`);
  } else {
    if (description.length < DESCRIPTION_MIN || description.length > DESCRIPTION_MAX) {
      fail(
        `meta description is ${String(description.length)} characters, ` +
          `outside ${String(DESCRIPTION_MIN)}-${String(DESCRIPTION_MAX)}`,
      );
    }
    const other = seen.description.get(description);
    if (other !== undefined) {
      fail(`meta description is identical to ${other}'s`);
    }
    seen.description.set(description, route);
  }

  const canonicals = count(html, /<link\b[^>]*\brel="canonical"/gu);
  if (canonicals !== 1) {
    fail(`${String(canonicals)} canonical links, expected exactly 1`);
  }

  const headings = count(html, /<h1\b/gu);
  if (headings !== 1) {
    fail(`${String(headings)} <h1> elements, expected exactly 1`);
  }

  const [image] = contentsOf(html, "property", "og:image");
  if (image === undefined) {
    fail("no og:image");
  } else if (URL.canParse(image)) {
    images.push({ image, route });
  } else {
    fail(`og:image is not absolute: ${image}`);
  }

  const [alt] = contentsOf(html, "property", "og:image:alt");
  if (alt === undefined || alt.length === 0) {
    fail("no og:image:alt");
  }

  // Structured data is serialized by hand in `src/lib/jsonld.ts`; a block that stops parsing, or
  // loses its type, is invisible until a rich-results run months later.
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gu)];
  if (blocks.length === 0) {
    fail("no JSON-LD");
  }
  for (const [, block] of blocks) {
    let data: unknown;
    try {
      data = JSON.parse(block ?? "");
    } catch {
      fail("JSON-LD does not parse");
      continue;
    }
    const parsed = JsonLd.safeParse(data);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        fail(`JSON-LD ${issue.path.join(".") || "block"}: ${issue.message}`);
      }
    }
  }
}

const resolved = await Promise.all(
  images.map(async ({ image, route }) => ({
    found: await exists(join(DIST, new URL(image).pathname)),
    image,
    route,
  })),
);
for (const { found, image, route } of resolved) {
  if (!found) {
    failures.push(`${route}: og:image does not resolve to a built file: ${image}`);
  }
}

if (failures.length > 0) {
  console.error(`tools/checks/verify-meta: ${String(failures.length)} problem(s)`);
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`every page's head verified (${String(pages.length)} files)`);
