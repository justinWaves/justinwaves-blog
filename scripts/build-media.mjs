/**
 * Media build pipeline.
 *
 * Generates optimized delivery assets into public/media from the original
 * sources in public/ (which are kept intact). Requires ffmpeg on PATH.
 *
 *   npm run media:build
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, copyFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const pub = path.join(root, "public");
const out = path.join(pub, "media");
const pack = path.join(pub, "Justin_Waves_Transparent_PNG_Asset_Pack");
const privatePress = path.join(root, "_private", "press");

for (const dir of ["hero", "photos", "motifs", "og"]) {
  mkdirSync(path.join(out, dir), { recursive: true });
}
mkdirSync(privatePress, { recursive: true });

const kb = (p) => `${Math.round(statSync(p).size / 1024)} KB`;
const run = (args) => execFileSync("ffmpeg", ["-v", "error", "-y", ...args], { stdio: "inherit" });

/* ---------------------------------------------------------------------------
 * Hero performance loop
 *
 * Source: public/jw-bg-vid.mp4 (720x576, 12.356 s, H.264). The first and
 * last frames do not match, so we build a seamless loop: the body of the clip
 * (1.0 s → end) cross-fades over its final second into the clip's opening
 * second, so the last output frame equals the first.
 *
 * A restrained cinematic grade is applied (slightly darker, warmer) so the
 * daylight footage sits inside the nocturnal palette. Vignetting and contrast
 * gradients are applied in CSS so they can be tuned without re-encoding.
 * ------------------------------------------------------------------------- */
const src = path.join(pub, "jw-bg-vid.mp4");
const T = 12.3; // usable duration
const HEAD = 1.0; // seconds used for the cross-fade
const body = T - HEAD; // 11.3 s
const grade =
  "eq=brightness=-0.06:contrast=1.06:saturation=0.82," +
  "colorbalance=rs=0.06:gs=0.01:bs=-0.06:rm=0.03:bm=-0.04";

function loopFilter(extra = "") {
  return (
    `[0:v]trim=${HEAD}:${T},setpts=PTS-STARTPTS,${grade}${extra}[main];` +
    `[0:v]trim=0:${HEAD},setpts=PTS-STARTPTS,${grade}${extra}[head];` +
    `[main][head]xfade=transition=fade:duration=${HEAD}:offset=${(body - HEAD).toFixed(2)},fps=24,format=yuv420p[v]`
  );
}

const renditions = [
  // Desktop: native 5:4 frame, lightly sharpened to hold up at larger sizes.
  { name: "hero-loop-desktop", extra: ",unsharp=3:3:0.4", crf264: 24, crfvp9: 36 },
  // Mobile: 3:4 crop centred on the performer (subject sits right of centre).
  { name: "hero-loop-mobile", extra: ",crop=432:576:254:0", crf264: 25, crfvp9: 37 },
];

for (const r of renditions) {
  const mp4 = path.join(out, "hero", `${r.name}.mp4`);
  const webm = path.join(out, "hero", `${r.name}.webm`);
  run([
    "-i", src,
    "-filter_complex", loopFilter(r.extra),
    "-map", "[v]", "-an",
    "-c:v", "libx264", "-preset", "slow", "-crf", String(r.crf264),
    "-profile:v", "high", "-level", "4.0",
    "-movflags", "+faststart",
    mp4,
  ]);
  run([
    "-i", src,
    "-filter_complex", loopFilter(r.extra),
    "-map", "[v]", "-an",
    "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", String(r.crfvp9),
    "-row-mt", "1", "-deadline", "good", "-cpu-used", "1",
    webm,
  ]);
  console.log(`${r.name}: mp4 ${kb(mp4)}, webm ${kb(webm)}`);
}

// Poster: a graded frame from the loop so the still matches the first video frame.
const posterPng = path.join(out, "hero", "poster-src.png");
run([
  "-i", path.join(out, "hero", "hero-loop-desktop.mp4"),
  "-ss", "0", "-frames:v", "1", posterPng,
]);
await sharp(posterPng).resize(1440).jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(out, "hero", "poster-desktop.jpg"));
await sharp(posterPng).resize(1440).webp({ quality: 74 }).toFile(path.join(out, "hero", "poster-desktop.webp"));
const posterMobilePng = path.join(out, "hero", "poster-mobile-src.png");
run([
  "-i", path.join(out, "hero", "hero-loop-mobile.mp4"),
  "-ss", "0", "-frames:v", "1", posterMobilePng,
]);
await sharp(posterMobilePng).resize(864).jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(out, "hero", "poster-mobile.jpg"));
await sharp(posterMobilePng).resize(864).webp({ quality: 74 }).toFile(path.join(out, "hero", "poster-mobile.webp"));
execFileSync("rm", ["-f", posterPng, posterMobilePng]);

/* ---------------------------------------------------------------------------
 * Photography
 * ------------------------------------------------------------------------- */
async function photo(srcName, baseName, widths, opts = {}) {
  const input = path.join(pub, srcName);
  const results = [];
  for (const w of widths) {
    const base = sharp(input).rotate().resize({ width: w, withoutEnlargement: true, ...opts });
    const webp = path.join(out, "photos", `${baseName}-${w}.webp`);
    const avif = path.join(out, "photos", `${baseName}-${w}.avif`);
    await base.clone().webp({ quality: 80 }).toFile(webp);
    await base.clone().avif({ quality: 58 }).toFile(avif);
    results.push(`${w}: webp ${kb(webp)}, avif ${kb(avif)}`);
  }
  console.log(`${baseName} → ${results.join(" | ")}`);
}

// Warm nighttime portrait (3613x2410). Homepage/catalog photography.
await photo("jw-hero-web.jpg", "portrait-night", [640, 1280, 1920]);
// Outdoor piano / vocal performance (1500x814). Live page.
await photo("waves-donner.jpg", "performance-piano-shore", [800, 1500]);
// Vertical night / performance photograph (2652x3976). Opening visual.
await photo("2025-web-bg.jpg", "night-stage-vertical", [720, 1200]);

/* ---------------------------------------------------------------------------
 * Press-only originals live outside public serving.
 * ------------------------------------------------------------------------- */
const press = [
  ["jw-hero-web.jpg", "justin-waves-portrait-night.jpg"],
  ["waves-donner.jpg", "justin-waves-piano-performance.jpg"],
  ["2025-web-bg.jpg", "justin-waves-night-stage.jpg"],
];
for (const [from, to] of press) {
  const dest = path.join(privatePress, to);
  if (!existsSync(dest)) copyFileSync(path.join(pub, from), dest);
}
console.log("press: originals stored in _private/press (not publicly served)");

/* ---------------------------------------------------------------------------
 * Selected motifs from the transparent asset pack (line illustrations).
 * Only the assets used by the design are exported.
 * ------------------------------------------------------------------------- */
const motifs = [
  ["JW_Orbital_Arc.png", "orbital-arc"],
  ["JW_Horizon_Flare.png", "horizon-flare"],
  ["JW_Harmonic_Waveform.png", "harmonic-waveform"],
  ["JW_Capsule_Window.png", "capsule-window"],
  ["JW_Signal_Trace.png", "signal-trace"],
  ["JW_Frequency_Beacon.png", "frequency-beacon"],
  ["JW_Owl_Totem.png", "owl-totem"],
  ["JW_Coordinate_Frame.png", "coordinate-frame"],
];
for (const [from, to] of motifs) {
  const input = path.join(pack, from);
  if (!existsSync(input)) {
    console.warn(`motif missing: ${from}`);
    continue;
  }
  const dest = path.join(out, "motifs", `${to}.webp`);
  await sharp(input).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 82, alphaQuality: 90 }).toFile(dest);
  console.log(`motif ${to}: ${kb(dest)}`);
}

/* ---------------------------------------------------------------------------
 * Open Graph image (1200x630): night portrait with a quiet wordmark band.
 * ------------------------------------------------------------------------- */
const ogBase = await sharp(path.join(pub, "jw-hero-web.jpg"))
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .modulate({ brightness: 0.92 })
  .toBuffer();
const wordmarkSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
     <defs>
       <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0" stop-color="#0B1018" stop-opacity="0"/>
         <stop offset="1" stop-color="#0B1018" stop-opacity="0.92"/>
       </linearGradient>
     </defs>
     <rect width="1200" height="630" fill="url(#g)"/>
     <text x="72" y="548" font-family="Helvetica, Arial, sans-serif" font-size="30" letter-spacing="8" fill="#A9BCD0">RECORDING ARTIST · SONGWRITER · LIVE PERFORMER</text>
     <text x="72" y="500" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="64" letter-spacing="6" fill="#EEE9E0">JUSTIN WAVES</text>
   </svg>`,
);
await sharp(ogBase).composite([{ input: wordmarkSvg }]).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(out, "og", "default.jpg"));
console.log(`og: ${kb(path.join(out, "og", "default.jpg"))}`);

console.log("media build complete");
