import type { IncomingHttpHeaders, ServerHttp2Stream } from "node:http2";

/**
 * Serves `dist/` like Cloudflare Pages (HTTP/2 over TLS, compressed) for the Lighthouse gate.
 * Lighthouse simulates Slow 4G from the observed protocol: over `astro preview`'s HTTP/1.1 every
 * parallel request is charged a connection handshake production never pays, about 450 ms of LCP.
 * The certificate is self-signed, so Lighthouse runs with `--ignore-certificate-errors`.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createSecureServer } from "node:http2";
import { extname, join } from "node:path";
import { gzipSync } from "node:zlib";

const DIST = "dist";
const EVENTS = join(".lighthouseci", "events");
const EVENT_PREFIX = "/__event-fixture/";
const PORT = Number(process.env.PORT ?? "4321");
const CERT_DIR = join(".lighthouseci", "tls");

const TYPES = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".json", "application/json"],
  [".webmanifest", "application/manifest+json"],
  [".xml", "application/xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".ico", "image/x-icon"],
  [".woff2", "font/woff2"],
  [".webm", "video/webm"],
  [".mp4", "video/mp4"],
]);

/** What Cloudflare compresses on the wire; images, fonts, and video are already compressed. */
const COMPRESSIBLE = new Set([
  ".html",
  ".css",
  ".js",
  ".mjs",
  ".json",
  ".webmanifest",
  ".xml",
  ".txt",
  ".svg",
]);

const certificate = () => {
  const cert = join(CERT_DIR, "cert.pem");
  const key = join(CERT_DIR, "key.pem");
  if (!existsSync(cert) || !existsSync(key)) {
    mkdirSync(CERT_DIR, { recursive: true });
    execFileSync(
      "openssl",
      [
        "req",
        "-x509",
        "-newkey",
        "rsa:2048",
        "-nodes",
        "-days",
        "2",
        "-subj",
        "/CN=localhost",
        "-addext",
        "subjectAltName=DNS:localhost,IP:127.0.0.1",
        "-keyout",
        key,
        "-out",
        cert,
      ],
      { stdio: "ignore" },
    );
  }
  return { cert: readFileSync(cert), key: readFileSync(key) };
};

type Resolved = { location: string } | { path: string; status: number };

/**
 * Cloudflare's HTML handling: `<path>.html` is served at `<path>`, and the slashed and `.html`
 * spellings of a page 308-redirect there.
 */
const resolve = (pathname: string): Resolved => {
  const eventPage = pathname.startsWith(EVENT_PREFIX);
  const prefix = eventPage ? EVENT_PREFIX.slice(0, -1) : "";
  const roots = eventPage ? [EVENTS] : pathname.startsWith("/_astro/") ? [DIST, EVENTS] : [DIST];
  const relative = decodeURIComponent(pathname.slice(prefix.length));
  const served = relative.replace(/(?:index)?\.html$/u, "").replace(/(?<=.)\/$/u, "");
  const page = served === "/" ? "/index.html" : `${served}.html`;
  for (const root of roots) {
    if (existsSync(join(root, page))) {
      return served === relative
        ? { path: join(root, page), status: 200 }
        : { location: `${prefix}${served}` };
    }
    const direct = join(root, relative);
    if (existsSync(direct) && !statSync(direct).isDirectory()) {
      return { path: direct, status: 200 };
    }
  }
  return { path: join(DIST, "404.html"), status: 404 };
};

const server = createSecureServer({ ...certificate(), allowHTTP1: true });

/** Read and compressed once: `dist/` does not change while this runs. */
const bodies = new Map<string, Buffer>();

const bodyOf = (path: string): Buffer => {
  let body = bodies.get(path);
  if (body === undefined) {
    body = readFileSync(path);
    if (COMPRESSIBLE.has(extname(path))) {
      body = gzipSync(body);
    }
    bodies.set(path, body);
  }
  return body;
};

server.on("stream", (stream: ServerHttp2Stream, headers: IncomingHttpHeaders) => {
  const pathname = new URL(headers[":path"] ?? "/", `https://localhost:${String(PORT)}`).pathname;
  const resolved = resolve(pathname);
  if ("location" in resolved) {
    stream.respond({ ":status": 308, location: resolved.location });
    stream.end();
    return;
  }
  const { path, status } = resolved;
  const extension = extname(path);
  const body = bodyOf(path);
  const response = new Map<string, string>([
    [":status", String(status)],
    ["content-type", TYPES.get(extension) ?? "application/octet-stream"],
    [
      "cache-control",
      pathname.startsWith("/_astro/")
        ? "public, max-age=31536000, immutable"
        : "public, max-age=0, must-revalidate",
    ],
  ]);
  if (COMPRESSIBLE.has(extension)) {
    response.set("content-encoding", "gzip");
  }
  response.set("content-length", String(body.length));
  stream.respond(Object.fromEntries(response));
  stream.end(headers[":method"] === "HEAD" ? undefined : body);
});

server.listen(PORT, () => {
  console.log(`serving ${DIST}/ over HTTP/2 at https://localhost:${String(PORT)}`);
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    server.close();
    process.exit(0);
  });
}
