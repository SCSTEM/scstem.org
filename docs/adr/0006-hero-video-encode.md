# 0006 — The hero video is a hand-encoded pair of files in `public/`

- **Status:** accepted
- **Date:** 2026-09-01

## Context

D20 keeps the FRC hero's background footage and puts it under 3 MB. What shipped was a 44-second
1920×1080 H.264 take at 22.1 MB, beside a 14.7 MB WebM of the same thing — together, two thirds of
the 42 MB `public/` tree this phase set out to shrink.

The footage is a single continuous action-cam walk through a competition venue: soft, wide-angle,
no cuts. Nothing in it is sharp enough to reward a high resolution, and nothing in it needs to be
44 seconds long behind a heading and two buttons.

`astro:assets` has no video pipeline, so whatever the encode is, it is not something the build
performs.

## Decision

Encode by hand with ffmpeg, from the 1080p master, and commit both outputs to
`public/video/biohazard/`:

```sh
ffmpeg -ss 8.0 -t 10.5 -i home-video.mp4 -an -vf "scale=1280:720:flags=lanczos" \
  -c:v libx264 -profile:v high -preset slower -crf 21 -pix_fmt yuv420p \
  -g 60 -movflags +faststart home-video.mp4

ffmpeg -ss 8.0 -t 10.5 -i home-video.mp4 -an -vf "scale=1280:720:flags=lanczos" \
  -c:v libvpx-vp9 -crf 30 -b:v 0 -row-mt 1 -deadline good -cpu-used 1 \
  -g 60 -pix_fmt yuv420p home-video.webm
```

- **The 8.0–18.5 s window** is the one steady stretch: the view from the driver station out over
  the field. Either side of it the camera whip-pans. Its first and last frames frame the same
  scene, so the loop does not read as a cut.
- **720p, not 1080p.** A 1080p CRF 21 encode of this take is 2.82 MB — inside D20's budget, and
  visually identical to the 1.19 MB 720p one, because the source is out of focus. Frames from both
  were compared against the master before choosing.
- **VP9 rather than AV1** for the WebM. At 0.49 MB the format is not what is costing anything, and
  VP9 decodes wherever WebM does. Safari falls through to the MP4 either way.
- **No audio track**, and `+faststart` so the MP4's index precedes its data.

The poster is `src/assets/frc/hero-video-poster.webp`, the encoded MP4's own first frame, so the
reveal has nothing to cross-fade.

## Alternatives considered

- **`src/assets/` with a `?url` import**, for a fingerprinted `_astro/` path and immutable caching.
  `plan/09-assets-performance.md` §1 reserves `public/` for exactly this case, and a path in
  `site.ts` beside `site.icons` reads the same way at the call site.
- **A boomerang (forward + reversed) cut** for a seamless loop. Doubles the file, and reversed
  camera motion is obvious on a pan.

## Consequences

- Re-cutting the footage is a manual step, not `pnpm build`. This ADR is the record of what
  produced the committed files.
- The masters are gone from the working tree; git history holds them.
- `HeroVideo.astro` arms playback only after `load`, and only when the visitor has neither asked
  for reduced motion nor turned on Save-Data — so 1.7 MB is what an engaged desktop visitor
  spends, not what the page costs to open.
