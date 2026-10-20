import localFont from "next/font/local";

// Open-licensed fonts bundled locally for reliable, private delivery.
export const grotesk = localFont({
  src: [
    { path: "./font-assets/archivo-400.ttf", weight: "400", style: "normal" },
    { path: "./font-assets/archivo-500.ttf", weight: "500", style: "normal" },
    { path: "./font-assets/archivo-600.ttf", weight: "600", style: "normal" },
    { path: "./font-assets/archivo-700.ttf", weight: "700", style: "normal" },
    { path: "./font-assets/archivo-800.ttf", weight: "800", style: "normal" },
],
  display: "swap",
  variable: "--font-grotesk",
});
export const mono = localFont({
  src: [
    { path: "./font-assets/plex-mono-400.ttf", weight: "400", style: "normal" },
    { path: "./font-assets/plex-mono-500.ttf", weight: "500", style: "normal" },
],
  display: "swap",
  variable: "--font-metadata",
});
