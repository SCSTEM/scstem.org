// `?raw` inlines the stylesheets at build time. `readFileSync` fails because the page is bundled
// before it is prerendered, so a module-relative path no longer reaches `src/`.
import { ACCENTS, type Accent } from "@/data/site";
import tailwindSource from "@/styles/global.css?raw";
import tokenSource from "@/styles/tokens.css?raw";

/**
 * Anything this reader cannot resolve throws: a half-understood value would reach the contrast
 * math as `NaN`, which passes every floor check.
 */

export type Mode = "dark" | "light";
export type Register = "shop" | "blueprint";

export interface Context {
  mode?: Mode;
  accent?: Accent;
  register?: Register;
}

export interface Rgba {
  hex: string;
  alpha: number;
}

// Comments are stripped first: a selector in prose would register as a block, and a commented-out
// declaration would read as live.
const strip = (css: string): string => css.replaceAll(/\/\*[\s\S]*?\*\//g, "");
const tokensCss = strip(tokenSource);
const tailwindCss = strip(tailwindSource);

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

export const accents = (): readonly Accent[] => ACCENTS;

const where = (context: Context): string =>
  `${context.mode ?? "dark"} / ${context.accent ?? "yellow"} / ${context.register ?? "shop"}`;

/** Precedence: accent block, then register, then root. */
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

export const rgba = (name: string, context: Context = {}): Rgba =>
  toRgba(resolve(declared(name, context), context), `--sc2-${name} (${where(context)})`);

export const color = (name: string, context: Context = {}): string => {
  const value = rgba(name, context);
  if (value.alpha !== 1) {
    throw new Error(`--sc2-${name} (${where(context)}) is translucent; read it with rgba()`);
  }
  return value.hex;
};

export const radius = (name: string): string => declared(`radius-${name}`, {});

export const duration = (name: string): string => declared(`duration-${name}`, {});

export const breakpoint = (name: string): string => {
  const value = declarations(blockAfter(tailwindCss, "@theme {")).get(`--breakpoint-${name}`);
  if (value === undefined) {
    throw new Error(`token --breakpoint-${name} not found in the @theme block of global.css`);
  }
  return value;
};
