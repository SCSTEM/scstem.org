/**
 * Renders the social cards (DESIGN.md §7): one template — photograph, scrim, eyebrow, Orbitron
 * title, lockup — at 1200x630, in the seven variants the site links to.
 *
 * Satori lays the card out and embeds the type from `./fonts/Orbitron-Bold.ttf`, resvg
 * rasterizes it, and sharp writes the JPEG. Nothing is looked up on the machine, so this runs
 * anywhere `pnpm install` has. By hand, from the repo root; commit the output:
 *
 *     pnpm assets:og
 *
 * `docs/adr/0010-og-cards.md` covers why these are committed artifacts rather than a build step,
 * and `docs/adr/0015-og-cards-satori.md` the renderer.
 */
import { Resvg } from "@resvg/resvg-js";
import { readFile, writeFile } from "node:fs/promises";
import satori from "satori";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
/** JPEG, not PNG: a photographic card is ~5x smaller, and no scraper has ever wanted otherwise. */
const QUALITY = 82;

/** DESIGN.md §2 palette, and the two program accents from `[data-theme]` in global.css. */
const color = {
  background: "#262626",
  foreground: "#fafafa",
  muted: "#d4d4d4",
  primary: "#facc15",
  frc: "#3ecf6e",
  fll: "#fb923c",
};

/** A static 700 instance from Google Fonts: Satori reads TTF/OTF/WOFF and no variable axis. */
const FONT_FILE = "tools/assets/fonts/Orbitron-Bold.ttf";
const FONT = "Orbitron";
/** The monochrome light lockup, which is the variant a dark ground calls for (DESIGN.md §7). */
const LOCKUP = "src/assets/brand/logo-white-full.svg";
const LOCKUP_WIDTH = 300;

const PAD = 72;
const COLUMN = 760;

interface Card {
  out: string;
  photo: string;
  eyebrow: string;
  title: string;
  accent: string;
}

const cards: Card[] = [
  {
    out: "public/og/default.jpg",
    photo: "src/assets/sc2/students.webp",
    eyebrow: "Franklin County, Pennsylvania",
    title: "South Central STEM Collective",
    accent: color.primary,
  },
  {
    out: "src/assets/og/programs.jpg",
    photo: "src/assets/sc2/hands-on-1.webp",
    eyebrow: "Ages 9 to 18",
    title: "Our programs",
    accent: color.primary,
  },
  {
    out: "src/assets/og/frc.jpg",
    photo: "src/assets/frc/frc-driveteam.webp",
    eyebrow: "Team 4050 Biohazard",
    title: "FIRST Robotics Competition",
    accent: color.frc,
  },
  {
    out: "src/assets/og/fll.jpg",
    photo: "src/assets/fll/lego-robots.webp",
    eyebrow: "Ages 9 to 16",
    title: "FIRST LEGO League",
    accent: color.fll,
  },
  {
    out: "src/assets/og/sponsors.jpg",
    photo: "src/assets/sc2/parts-notes.webp",
    eyebrow: "Partners in building the future",
    title: "Sponsors",
    accent: color.primary,
  },
  {
    out: "src/assets/og/events.jpg",
    photo: "src/assets/events/morethanrobots.webp",
    eyebrow: "Come and see for yourself",
    title: "Events",
    accent: color.primary,
  },
  {
    out: "src/assets/og/donate.jpg",
    photo: "src/assets/sc2/drill-bits.webp",
    eyebrow: "501(c)(3) nonprofit",
    title: "Donate",
    accent: color.primary,
  },
];

/** The CSS Satori is given; every container declares `display: flex`, as Satori requires. */
interface Style {
  position?: "absolute" | "relative";
  display?: "flex";
  flexDirection?: "column";
  justifyContent?: "center";
  top?: number;
  left?: number;
  bottom?: number;
  width?: number;
  height?: number;
  backgroundColor?: string;
  backgroundImage?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  lineHeight?: number;
  letterSpacing?: number;
  marginBottom?: number;
}

/** Satori's element shape without a JSX runtime: the two element kinds this template uses. */
interface Element {
  type: "div" | "img";
  props: {
    style: Style;
    src?: string;
    width?: number;
    height?: number;
    children?: Element[] | string | undefined;
  };
}

const div = (style: Style, children?: Element[] | string): Element => ({
  type: "div",
  props: { style, children },
});

const img = (src: string, style: Style, width: number, height: number): Element => ({
  type: "img",
  props: { src, style, width, height },
});

const dataUri = (mime: string, data: Buffer): string =>
  `data:${mime};base64,${data.toString("base64")}`;

const rgba = (hex: string, alpha: number): string => {
  const [r, g, b] = [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16));
  return `rgba(${String(r)}, ${String(g)}, ${String(b)}, ${String(alpha)})`;
};

const scrim = `linear-gradient(to right, ${rgba(color.background, 1)} 0%, ${rgba(color.background, 0.94)} 50%, ${rgba(color.background, 0.25)} 100%)`;

const font = await readFile(FONT_FILE);

const lockupPng = await sharp(await readFile(LOCKUP))
  .resize({ width: LOCKUP_WIDTH })
  .png()
  .toBuffer({ resolveWithObject: true });
const lockup = img(
  dataUri("image/png", lockupPng.data),
  { position: "absolute", left: PAD, top: PAD - 10 },
  lockupPng.info.width,
  lockupPng.info.height,
);

const card = (spec: Card, photo: Buffer): Element => {
  const size = spec.title.length > 24 ? 58 : 72;
  return div(
    {
      position: "relative",
      display: "flex",
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: color.background,
      fontFamily: FONT,
      fontWeight: 700,
    },
    [
      img(dataUri("image/jpeg", photo), { position: "absolute", left: 0, top: 0 }, WIDTH, HEIGHT),
      div({
        position: "absolute",
        display: "flex",
        left: 0,
        top: 0,
        width: WIDTH,
        height: HEIGHT,
        backgroundImage: scrim,
      }),
      div({
        position: "absolute",
        display: "flex",
        left: 0,
        top: 0,
        width: 10,
        height: HEIGHT,
        backgroundColor: spec.accent,
      }),
      lockup,
      div(
        {
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          left: PAD,
          top: 0,
          width: COLUMN,
          height: HEIGHT,
        },
        [
          div(
            {
              display: "flex",
              fontSize: 22,
              letterSpacing: 3,
              color: spec.accent,
              marginBottom: 6,
            },
            spec.eyebrow.toUpperCase(),
          ),
          div(
            { display: "flex", fontSize: size, lineHeight: 1.18, color: color.foreground },
            spec.title,
          ),
        ],
      ),
      div(
        {
          position: "absolute",
          display: "flex",
          left: PAD,
          bottom: PAD - 12,
          fontSize: 20,
          color: color.muted,
        },
        "scstem.org",
      ),
    ],
  );
};

for (const spec of cards) {
  const photo = await sharp(spec.photo)
    .resize({ width: WIDTH, height: HEIGHT, fit: "cover", position: "attention" })
    .jpeg({ quality: 90 })
    .toBuffer();

  const svg = await satori(card(spec, photo), {
    width: WIDTH,
    height: HEIGHT,
    fonts: [{ name: FONT, data: font, weight: 700, style: "normal" }],
  });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } }).render().asPng();
  const image = await sharp(png).jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();

  await writeFile(spec.out, image);
  console.log(`${spec.out}  ${(image.length / 1024).toFixed(0)} kB`);
}
