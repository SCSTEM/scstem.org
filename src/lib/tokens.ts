// `?raw` inlines the stylesheets' source at build time. `readFileSync` cannot be used here:
// the page is bundled before it is prerendered, so a path relative to this module no longer
// points at `src/`.
import { ACCENTS, type Accent } from "@/data/site";
import tailwindSource from "@/styles/global.css?raw";
import tokenSource from "@/styles/tokens.css?raw";

/**
 * Reads the design tokens out of `src/styles/tokens.css` at build time, so anything verifying
 * them verifies the values the site actually ships. The stylesheet is authoritative
 * (DESIGN.md §11) and this module is its only reader: a consumer restating a value as a
 * literal can drift from the stylesheet with a green build.
 *
 * A token resolves for one context (finish, accent, register) to what a viewer sees there, and
 * anything this reader cannot resolve throws. A value it half-understood would reach the
 * contrast math as `NaN`, which passes every floor check.
 */

export type Mode = "dark" | "light";
export type Register = "shop" | "blueprint";

export interface Context {
  mode?: Mode;
  accent?: Accent;
  register?: Register;
}

/** A resolved color: six-digit hex plus its alpha, 1 for an opaque token. */
export interface Rgba {
  hex: string;
  alpha: number;
}

// Comments are stripped before parsing: a selector mentioned in prose would otherwise register
// as a block, and a commented-out declaration would read as live.
const strip = (css: string): string => css.replaceAll(/\/\*[\s\S]*?\*\//g, "");
const tokensCss = strip(tokenSource);
const tailwindCss = strip(tailwindSource);

/** Body of the first `{ … }` following `header`, or undefined when the header is absent. */
const blockAfter = (css: string, header: string): string | undefined => {
  const start = css.indexOf(header);
  if (start === -1) {
    return undefined;
  }

  const open = css.indexOf("{", start);
  if (open === -1) {
    return undefined;
  }

  let depth = 0;
  for (let index = open; index < css.length; index += 1) {
    const char = css[index];
    if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return css.slice(open + 1, index);
      }
    }
  }
  return undefined;
};

const declarations = (body: string | undefined): ReadonlyMap<string, string> => {
  const found = new Map<string, string>();
  for (const match of (body ?? "").matchAll(/(--[\w-]+):\s*([^;]+);/g)) {
    const [, name, value] = match;
    if (name !== undefined && value !== undefined) {
      found.set(name, value.trim());
    }
  }
  return found;
};

const root = declarations(blockAfter(tokensCss, ":root"));
const blueprint = declarations(blockAfter(tokensCss, '[data-register="blueprint"]'));

const declaredAccents = [
  ...new Set(
    [...tokensCss.matchAll(/\[data-accent="([\w-]+)"]/g)].flatMap((match) => match[1] ?? []),
  ),
];

const accentBlocks = new Map(
  ACCENTS.filter((accent) => accent !== "yellow").map((accent) => {
    if (!declaredAccents.includes(accent)) {
      throw new Error(`accent "${accent}" has no [data-accent] block in src/styles/tokens.css`);
    }
    return [accent, declarations(blockAfter(tokensCss, `[data-accent="${accent}"]`))] as const;
  }),
);

const listed: readonly string[] = ACCENTS;
for (const name of declaredAccents) {
  if (!listed.includes(name)) {
    throw new Error(`[data-accent="${name}"] in src/styles/tokens.css is missing from ACCENTS`);
  }
}

/** Every accent, the unset default first. */
export const accents = (): readonly Accent[] => ACCENTS;

const where = (context: Context): string =>
  `${context.mode ?? "dark"} / ${context.accent ?? "yellow"} / ${context.register ?? "shop"}`;

/** The declared value of `--sc2-<name>` in a context: accent block, then register, then root. */
const declared = (name: string, context: Context): string => {
  const property = `--sc2-${name}`;
  const accent = context.accent ?? "yellow";
  const value =
    (accent === "yellow" ? undefined : accentBlocks.get(accent)?.get(property)) ??
    (context.register === "blueprint" ? blueprint.get(property) : undefined) ??
    root.get(property);
  if (value === undefined) {
    throw new Error(`token ${property} not found in src/styles/tokens.css`);
  }
  return value;
};

/** Splits on commas that are not inside parentheses. */
const topLevelArguments = (inner: string): string[] => {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const char of inner) {
    if (char === "(") depth += 1;
    if (char === ")") depth -= 1;
    if (char === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  parts.push(current.trim());
  return parts;
};

/** Substitutes `var(--sc2-*)` references and picks the finish's side of `light-dark()`. */
const resolve = (value: string, context: Context, depth = 0): string => {
  if (depth > 8) {
    throw new Error(`token reference loop while resolving "${value}" (${where(context)})`);
  }
  const substituted = value.replaceAll(/var\(--sc2-([\w-]+)\)/g, (_, name: string) =>
    resolve(declared(name, context), context, depth + 1),
  );
  const lightDark = /^light-dark\((.*)\)$/s.exec(substituted.trim());
  if (lightDark?.[1] === undefined) {
    return substituted.trim();
  }
  const [light, dark, extra] = topLevelArguments(lightDark[1]);
  if (light === undefined || dark === undefined || extra !== undefined) {
    throw new Error(`light-dark() needs exactly two arguments: "${substituted}"`);
  }
  return context.mode === "light" ? light : dark;
};

const HEX = /^#([\da-f]{6})$/i;
const RGB = /^rgb\(\s*(\d+)\s+(\d+)\s+(\d+)\s*(?:\/\s*([\d.]+)\s*)?\)$/i;

const toRgba = (value: string, label: string): Rgba => {
  const hex = HEX.exec(value);
  if (hex?.[1] !== undefined) {
    return { hex: `#${hex[1].toLowerCase()}`, alpha: 1 };
  }
  const rgb = RGB.exec(value);
  if (rgb !== null) {
    const channels = [rgb[1], rgb[2], rgb[3]].map((channel) => Number(channel));
    if (channels.every((channel) => Number.isInteger(channel) && channel >= 0 && channel <= 255)) {
      return {
        hex: `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`,
        alpha: rgb[4] === undefined ? 1 : Number(rgb[4]),
      };
    }
  }
  throw new Error(`${label} resolves to "${value}", which is not a six-digit hex or rgb() color`);
};

/** A color token in a context, with its alpha (the dark finish's swipes are translucent). */
export const rgba = (name: string, context: Context = {}): Rgba =>
  toRgba(resolve(declared(name, context), context), `--sc2-${name} (${where(context)})`);

/** An opaque color token in a context, as a six-digit hex. */
export const color = (name: string, context: Context = {}): string => {
  const value = rgba(name, context);
  if (value.alpha !== 1) {
    throw new Error(`--sc2-${name} (${where(context)}) is translucent; read it with rgba()`);
  }
  return value.hex;
};

/** A `--sc2-radius-*` token. */
export const radius = (name: string): string => declared(`radius-${name}`, {});

/** A `--sc2-duration-*` token. */
export const duration = (name: string): string => declared(`duration-${name}`, {});

/** A `--breakpoint-*` token from the layout `@theme` block in `global.css`. */
export const breakpoint = (name: string): string => {
  const value = declarations(blockAfter(tailwindCss, "@theme {")).get(`--breakpoint-${name}`);
  if (value === undefined) {
    throw new Error(`token --breakpoint-${name} not found in the @theme block of global.css`);
  }
  return value;
};
