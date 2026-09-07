import type { IncomingHttpHeaders, ServerHttp2Stream } from "node:http2";

/**
 * Serves `dist/` the way Cloudflare Pages does — HTTP/2 over TLS, compressed — for the Lighthouse
 * gate (`docs/adr/0018-lighthouse-over-http2.md`).
 *
 * Lighthouse simulates its Slow 4G link from the protocol it observes. Over `astro preview`'s
 * HTTP/1.1 every parallel request is charged its own connection handshake, which production
 * never pays; against this server the same build measures about 450 ms less LCP. The certificate
 * is self-signed, generated with `openssl` on first run, and Lighthouse is launched with
 * `--ignore-certificate-errors` (`tools/ci/lighthouserc.json`).
 *
 *     pnpm build && node tools/ci/serve.ts        # https://localhost:4321
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createSecureServer } from "node:http2";
import { extname, join } from "node:path";
import { gzipSync } from "node:zlib";

const DIST = "dist";
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

/** A self-signed certificate for `localhost`, made once and kept beside the Lighthouse reports. */
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

/** The file a request path resolves to, and the status it deserves. */
const resolve = (pathname: string) => {
  const direct = join(DIST, decodeURIComponent(pathname));
  if (existsSync(direct)) {
    if (!statSync(direct).isDirectory()) {
      return { path: direct, status: 200 };
    }
    const index = join(direct, "index.html");
    if (existsSync(index)) {
      return { path: index, status: 200 };
    }
  }
  return { path: join(DIST, "404.html"), status: 404 };
};

const server = createSecureServer({ ...certificate(), allowHTTP1: true });

server.on("stream", (stream: ServerHttp2Stream, headers: IncomingHttpHeaders) => {
  const pathname = new URL(headers[":path"] ?? "/", `https://localhost:${String(PORT)}`).pathname;
  const { path, status } = resolve(pathname);
  const extension = extname(path);
  let body = readFileSync(path);
  const response = new Map<string, string>([
    [":status", String(status)],
    ["content-type", TYPES.get(extension) ?? "application/octet-stream"],
    ["cache-control", "public, max-age=0, must-revalidate"],
  ]);
  if (COMPRESSIBLE.has(extension)) {
    body = gzipSync(body);
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
