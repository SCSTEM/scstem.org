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
 *
 *     node tools/checks/content-references.ts    # from the repo root
 */
import { readdir, readFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

type Collection = "events" | "faq";

/** `collection: { field: referencedCollection }` — mirrors `src/content.config.ts`. */
const REFERENCE_FIELDS: Partial<Record<Collection, Record<string, Collection>>> = {
  events: { faq: "faq" },
};

const COLLECTION_DIRS: Record<Collection, string> = {
  events: "src/content/events",
  faq: "src/content/faq",
};

interface Reference {
  collection: Collection;
  field: string;
  target: Collection;
}
interface Entry {
  id: string;
  block: string;
}
interface Loaded {
  ids: Set<string>;
  entries: Entry[];
}

/** The frontmatter block, as raw text. */
const frontmatter = (source: string): string =>
  /^---\r?\n([\s\S]*?)\r?\n---/.exec(source)?.[1] ?? "";

/** Values of a YAML block-sequence field: `faq:` followed by `  - id` lines. */
const listField = (block: string, field: string): string[] => {
  const lines = block.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trimEnd() === `${field}:`);
  if (start === -1) {
    return [];
  }

  const values: string[] = [];
  for (const line of lines.slice(start + 1)) {
    const item = /^\s+-\s+(.+?)\s*$/.exec(line)?.[1];
    if (item === undefined) {
      break;
    }
    values.push(item.replaceAll(/^["']|["']$/g, ""));
  }
  return values;
};

const isCollection = (name: string): name is Collection => name in COLLECTION_DIRS;

const references: Reference[] = Object.entries(REFERENCE_FIELDS).flatMap(([collection, fields]) =>
  isCollection(collection)
    ? Object.entries(fields).map(([field, target]) => ({ collection, field, target }))
    : [],
);

const sources = new Set(references.map(({ collection }) => collection));
const targets = new Set(references.map(({ target }) => target));

const load = async (collection: Collection): Promise<[Collection, Loaded]> => {
  const dir = COLLECTION_DIRS[collection];
  const files = (await readdir(dir, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && extname(entry.name) === ".md")
    .map((entry) => entry.name);
  return [
    collection,
    {
      ids: new Set(files.map((file) => basename(file, ".md"))),
      // Frontmatter is only read where a reference field can appear.
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
};

const loaded = new Map(await Promise.all([...sources.union(targets)].map(load)));

const failures = references.flatMap(({ collection, field, target }) => {
  const known = loaded.get(target)?.ids ?? new Set<string>();
  return (loaded.get(collection)?.entries ?? []).flatMap((entry) =>
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
