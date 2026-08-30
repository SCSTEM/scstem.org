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

const references = Object.entries(REFERENCE_FIELDS).flatMap(([collection, fields]) =>
  Object.entries(fields).map(([field, target]) => ({ collection, field, target })),
);

const sources = new Set(references.map(({ collection }) => collection));
const targets = new Set(references.map(({ target }) => target));

const loaded = new Map(
  await Promise.all(
    [...sources.union(targets)].map(async (collection) => {
      const dir = COLLECTION_DIRS[collection];
      const files = (await readdir(dir, { withFileTypes: true }))
        .filter((entry) => entry.isFile() && extname(entry.name) === ".md")
        .map((entry) => entry.name);
      return [
        collection,
        {
          ids: targets.has(collection) ? new Set(files.map((file) => basename(file, ".md"))) : null,
          entries: sources.has(collection)
            ? await Promise.all(
                files.map(async (file) => ({
                  id: basename(file, ".md"),
                  block: frontmatter(await readFile(join(dir, file), "utf8")),
                })),
              )
            : [],
        },
      ];
    }),
  ),
);

const failures = references.flatMap(({ collection, field, target }) => {
  const known = loaded.get(target).ids;
  return loaded.get(collection).entries.flatMap((entry) =>
    listField(entry.block, field)
      .filter((id) => !known.has(id))
      .map(
        (id) =>
          `${collection}/${entry.id}: ${field} references "${id}", ` +
          `which is not an entry in the ${target} collection`,
      ),
  );
});

if (failures.length > 0) {
  console.error("tools/checks/content-references: dangling content references");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log("all content references resolve");
