/* oxlint-disable eslint/no-await-in-loop -- six cards, run by hand; sequential keeps one decoded
   bitmap in memory at a time and the log readable. */
/**
 * Renders the social cards (plan/10 §3, DESIGN.md §7): one template — photograph, scrim, eyebrow,
 * Orbitron title, lockup — at 1200x630, in the six variants the site links to.
 *
 * Run by hand, from the repo root, and commit the output. Orbitron has to be a system font first,
 * because librsvg resolves `font-family` through fontconfig and cannot read the woff2 the site
 * ships:
 *
 *     node tools/assets/og-fonts.mjs      # instances the variable woff2 into ~/.fonts
 *     node tools/assets/og-cards.mjs
 *
 * `docs/adr/0010-og-cards.md` covers why these are committed artifacts rather than a build step.
 */
import { readFile, writeFile } from "node:fs/promises";

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

const FONT = "OGOrbitron Bold";
/** The monochrome light lockup, which is the variant a dark ground calls for (DESIGN.md §7). */
const LOCKUP = "src/assets/brand/logo-white-full.svg";
const LOCKUP_WIDTH = 300;

const cards = [
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

const escape = (text) =>
  text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

/**
 * Orbitron is wide, so a long title has to wrap. 0.62em per character is the measured average
 * advance for this face at these sizes — close enough to break lines that fit the copy column.
 */
const wrap = (title, size, limit) => {
  const perLine = Math.floor(limit / (size * 0.62));
  const lines = [];
  let current = "";
  for (const word of title.split(" ")) {
    const candidate = current === "" ? word : `${current} ${word}`;
    if (candidate.length > perLine && current !== "") {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  lines.push(current);
  return lines;
};

const PAD = 72;
const COLUMN = 760;

const overlay = (card) => {
  const size = card.title.length > 24 ? 58 : 72;
  const lines = wrap(card.title, size, COLUMN);
  const blockHeight = lines.length * size * 1.18;
  const top = (HEIGHT - blockHeight) / 2 + size * 0.9;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="scrim" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="${color.background}" stop-opacity="1"/>
      <stop offset="0.5" stop-color="${color.background}" stop-opacity="0.94"/>
      <stop offset="1" stop-color="${color.background}" stop-opacity="0.25"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#scrim)"/>
  <rect x="0" y="0" width="10" height="${HEIGHT}" fill="${card.accent}"/>
  <text x="${PAD}" y="${top - size * 0.95}" font-family="${FONT}" font-size="22"
        letter-spacing="3" fill="${card.accent}">${escape(card.eyebrow.toUpperCase())}</text>
  ${lines
    .map(
      (line, index) =>
        `<text x="${PAD}" y="${top + index * size * 1.18}" font-family="${FONT}" ` +
        `font-size="${size}" fill="${color.foreground}">${escape(line)}</text>`,
    )
    .join("\n  ")}
  <text x="${PAD}" y="${HEIGHT - PAD + 6}" font-family="${FONT}" font-size="20" fill="${color.muted}">scstem.org</text>
</svg>`;
};

const lockup = await sharp(await readFile(LOCKUP))
  .resize({ width: LOCKUP_WIDTH })
  .png()
  .toBuffer();

for (const card of cards) {
  const photo = await sharp(card.photo)
    .resize({ width: WIDTH, height: HEIGHT, fit: "cover", position: "attention" })
    .toBuffer();

  const image = await sharp(photo)
    .composite([
      { input: Buffer.from(overlay(card)), top: 0, left: 0 },
      {
        input: lockup,
        top: PAD - 10,
        left: PAD,
      },
    ])
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer();

  await writeFile(card.out, image);
  console.log(`${card.out}  ${(image.length / 1024).toFixed(0)} kB`);
}
