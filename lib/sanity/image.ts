import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityConfig } from "./config";

const builder = createImageUrlBuilder({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
});

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}

/** Square artwork at a given size with hotspot-aware cropping. */
export function artworkUrl(source: SanityImageSource, size: number) {
  return builder.image(source).auto("format").width(size).height(size).fit("crop").quality(80).url();
}
