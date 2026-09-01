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
 *     pnpm build && node tools/checks/verify-meta.mjs
 */
import { readdir, readFile, stat } from "node:fs/promises";
import { extname, join } from "node:path";

const DIST = "dist";
/** Google truncates a description around 160 characters and ignores one too short to be useful. */
const DESCRIPTION_RANGE = [50, 160];

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(path);
      }
      return extname(entry.name) === ".html" ? [path] : [];
    }),
  );
  return nested.flat();
};

/** Every `<meta>`/`<link>` on the page as `{ name|property|rel, content|href }` pairs. */
const tags = (html) => [...html.matchAll(/<(?:meta|link)\b[^>]*>/gu)].map((match) => match[0]);

const attribute = (tag, name) => {
  const match = new RegExp(`\\b${name}="([^"]*)"`, "u").exec(tag);
  return match?.[1];
};

/** `<meta name="description">` → its content, for every tag matching one key/value pair. */
const contentsOf = (html, key, value) =>
  tags(html)
    .filter((tag) => attribute(tag, key) === value)
    .map((tag) => attribute(tag, "content") ?? attribute(tag, "href"));

const count = (html, pattern) => [...html.matchAll(pattern)].length;

/** `dist/programs/frc/index.html` → `/programs/frc/`. */
const routeOf = (path) =>
  `/${path.slice(DIST.length + 1).replace(/(?:^|\/)index\.html$/u, "")}/`.replace("//", "/");

const exists = async (path) => {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
};

const paths = (await walk(DIST)).toSorted();
const pages = await Promise.all(
  paths.map(async (path) => ({ html: await readFile(path, "utf8"), route: routeOf(path) })),
);

const failures = [];
const seen = { description: new Map(), title: new Map() };
/** og:image checks are deferred so the reads run together rather than one per page. */
const images = [];

for (const { html, route } of pages) {
  const fail = (message) => failures.push(`${route}: ${message}`);

  if (/<meta[^>]*\bhttp-equiv="refresh"/u.test(html)) {
    continue;
  }

  const titles = [...html.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gu)].map((match) => match[1]);
  if (titles.length !== 1) {
    fail(`${String(titles.length)} <title> elements, expected exactly 1`);
  } else {
    const title = titles[0];
    const other = seen.title.get(title);
    if (other !== undefined) {
      fail(`<title> is identical to ${other}'s`);
    }
    seen.title.set(title, route);
  }

  const descriptions = contentsOf(html, "name", "description");
  if (descriptions.length !== 1) {
    fail(`${String(descriptions.length)} meta descriptions, expected exactly 1`);
  } else {
    const description = descriptions[0];
    const [min, max] = DESCRIPTION_RANGE;
    if (description.length < min || description.length > max) {
      fail(
        `meta description is ${String(description.length)} characters, ` +
          `outside ${String(min)}-${String(max)}`,
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
    let data;
    try {
      data = JSON.parse(block);
    } catch {
      fail("JSON-LD does not parse");
      continue;
    }
    if (data["@context"] !== "https://schema.org") {
      fail(`JSON-LD @context is ${String(data["@context"])}, expected https://schema.org`);
    }
    if (!(data["@type"]?.length > 0)) {
      fail("JSON-LD has no @type");
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
