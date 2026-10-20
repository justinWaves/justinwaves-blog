import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Photography is pre-encoded by scripts/build-media.mjs into sized AVIF/WebP
      // srcsets with explicit dimensions, so plain <img> is intentional there.
      // CMS artwork and motifs still go through next/image.
      "@next/next/no-img-element": "off",
    },
  },
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "jwavesblog/**",
      "next-env.d.ts",
      "public/**",
    ],
  },
];

export default config;
