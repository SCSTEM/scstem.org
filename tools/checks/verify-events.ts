import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

/** A separate build keeps future fixture dates out of source content and production dist/. */
const root = process.cwd();
const fixture = mkdtempSync(join(tmpdir(), "scstem-events-"));
const output = resolve(".lighthouseci/events");
const routes = [
  { id: "openhouse", path: "/openhouse/", faq: true, cta: "Get involved", register: true },
  {
    id: "frc-kickoff",
    path: "/programs/frc/kickoff/",
    faq: false,
    cta: "Watch on FIRST website",
    register: false,
  },
];
const start = "2099-08-01T13:00:00-04:00";
const end = "2099-08-01T16:00:00-04:00";

try {
  for (const path of ["src", "public", "astro.config.ts", "tsconfig.json", "package.json"]) {
    cpSync(join(root, path), join(fixture, path), { recursive: true });
  }
  symlinkSync(join(root, "node_modules"), join(fixture, "node_modules"), "dir");
  for (const { id, register } of routes) {
    const path = join(fixture, "src/content/events", `${id}.md`);
    const content = readFileSync(path, "utf8")
      .replace(/^start:.*$/mu, `start: ${start}`)
      .replace(/^end:.*$/mu, `end: ${end}`)
      .replace(/^registrationUrl:.*\n/mu, "")
      .replace(/^hidden:.*\n/mu, "");
    writeFileSync(
      path,
      register
        ? content.replace("\n---\n", "\nregistrationUrl: https://example.org/register\n---\n")
        : content,
    );
  }
  execFileSync(process.execPath, [join(root, "node_modules/astro/bin/astro.mjs"), "build"], {
    cwd: fixture,
    stdio: "inherit",
  });
  const dist = join(fixture, "dist");
  execFileSync(process.execPath, [join(root, "tools/checks/verify-meta.ts"), dist], {
    cwd: root,
    stdio: "inherit",
  });
  const sitemap = readFileSync(join(dist, "sitemap-0.xml"), "utf8");
  const redirects = readFileSync(join(dist, "_redirects"), "utf8");
  const llms = readFileSync(join(dist, "llms.txt"), "utf8");
  for (const { path, faq, cta, register } of routes) {
    const html = readFileSync(join(dist, path, "index.html"), "utf8");
    assert.ok(html.includes('"@type":"Event"'), `${path} renders its Event schema`);
    assert.ok(html.includes(`"startDate":"${new Date(start).toISOString()}"`));
    assert.ok(html.includes(`"endDate":"${new Date(end).toISOString()}"`));
    assert.ok(!html.includes('http-equiv="refresh"'), `${path} is a live page`);
    assert.ok(sitemap.includes(path), `${path} is discoverable in the sitemap`);
    assert.ok(llms.includes(path), `${path} is discoverable in llms.txt`);
    assert.ok(!redirects.split("\n").some((line) => line.startsWith(`${path} `)));
    const hero = html.slice(html.indexOf("<main"), html.indexOf('<hr class="accent-rule"'));
    assert.ok(hero.includes(cta), `${path} preserves its primary hero action`);
    assert.equal(
      />\s*Register\s*<\/a>/u.test(hero),
      register,
      `${path} renders registration only when supplied`,
    );
    if (faq) assert.ok(html.includes('"@type":"FAQPage"'), `${path} renders its FAQ schema`);
  }
  mkdirSync(resolve(".lighthouseci"), { recursive: true });
  rmSync(output, { recursive: true, force: true });
  cpSync(dist, output, { recursive: true });
  console.log("future event pages verified; Lighthouse fixtures in .lighthouseci/events/");
} finally {
  rmSync(fixture, { recursive: true, force: true });
}
