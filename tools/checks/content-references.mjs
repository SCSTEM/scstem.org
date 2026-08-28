/**
 * Verifies every `reference()` in a content collection resolves.
 *
 * Astro logs a dangling reference and still exits 0, so a mistyped `faq` id silently drops an
 * answer from the page that lists it. "A reference resolves" is an invariant of the collection
 * that declares the reference, not of each page that reads it — enforcing it here means no
 * consumer has to remember to throw.
 *
 * Reads the markdown directly rather than going through `astro:content`, so it runs as a plain
 * `pnpm check` step with no build.
 */
import { readdir, readFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

/** `collection: { field: referencedCollection }` — mirrors `src/content.config.ts`. */
const REFERENCE_FIELDS = {
  events: { faq: "faq" },
};

const COLLECTION_DIRS = {
  events: "src/content/events",
  faq: "src/content/faq",
};

const ids = async (collection) => {
  const dir = COLLECTION_DIRS[collection];
  const entries = await readdir(dir, { withFileTypes: true });
  return new Set(
    entries
      .filter((entry) => entry.isFile() && extname(entry.name) === ".md")
      .map((entry) => basename(entry.name, ".md")),
  );
};

/** The frontmatter block, as raw text. */
const frontmatter = (source) => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
  return match?.[1] ?? "";
};

/** Values of a YAML block-sequence field: `faq:` followed by `  - id` lines. */
const listField = (block, field) => {
  const lines = block.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trimEnd() === `${field}:`);
  if (start === -1) {
    return [];
  }

  const values = [];
  for (const line of lines.slice(start + 1)) {
    const item = /^\s+-\s+(.+?)\s*$/.exec(line);
    if (item?.[1] === undefined) {
      break;
    }
    values.push(item[1].replaceAll(/^["']|["']$/g, ""));
  }
  return values;
};

/** Every collection's ids, and every entry's frontmatter, read once up front. */
const knownIds = new Map(
  await Promise.all(Object.keys(COLLECTION_DIRS).map(async (name) => [name, await ids(name)])),
);

const entriesByCollection = new Map(
  await Promise.all(
    Object.entries(REFERENCE_FIELDS).map(async ([collection]) => {
      const dir = COLLECTION_DIRS[collection];
      const files = (await readdir(dir)).filter((name) => extname(name) === ".md");
      const entries = await Promise.all(
        files.map(async (file) => ({
          id: basename(file, ".md"),
          block: frontmatter(await readFile(join(dir, file), "utf8")),
        })),
      );
      return [collection, entries];
    }),
  ),
);

const failures = [];

for (const [collection, fields] of Object.entries(REFERENCE_FIELDS)) {
  for (const [field, target] of Object.entries(fields)) {
    const known = knownIds.get(target) ?? new Set();
    for (const entry of entriesByCollection.get(collection) ?? []) {
      for (const id of listField(entry.block, field)) {
        if (!known.has(id)) {
          failures.push(
            `${collection}/${entry.id}: ${field} references "${id}", ` +
              `which is not an entry in the ${target} collection`,
          );
        }
      }
    }
  }
}

if (failures.length > 0) {
  console.error("tools/checks/content-references: dangling content references");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log("all content references resolve");
