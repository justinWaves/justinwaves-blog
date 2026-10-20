/**
 * Featured-release model for a real campaign.
 *
 * Separates editorial visibility (`published`) from completeness. A campaign
 * is shown in the opening only when title, artwork, and a listening link are
 * all present. Incomplete announcements are never rendered as a placeholder.
 */

export type FeatureState = "announcement" | "preorder" | "released";

export type FeaturedRelease = {
  id: string;
  published: boolean;
  state: FeatureState;
  heading: string;
  body?: string;
  label?: string;
  trackTitle?: string;
  artists?: readonly string[];
  releaseDateTime?: string;
  artwork?: { src: string; width: number; height: number; alt: string };
  links?: {
    preorder?: string;
    listen?: string;
    bandcamp?: string;
  };
  fallbackHref: string;
  fallbackLabel: string;
};

/**
 * All Day I Dream collaboration (Mass Digital & Rebelski, Justin Waves vocal).
 *
 * Kept internally. Public appearance requires verified title, artwork, credits,
 * date, and a listening or pre-save destination. Until then it is unpublished.
 */
export const adidFeature: FeaturedRelease = {
  id: "adid-2026",
  published: false,
  state: "announcement",
  heading: "",
  fallbackHref: "/music",
  fallbackLabel: "Listen",
};

export type FeatureCta = { label: string; href: string; external: boolean };

export function featureCta(feature: FeaturedRelease): FeatureCta {
  switch (feature.state) {
    case "preorder":
      if (feature.links?.preorder) {
        return { label: "Pre-save", href: feature.links.preorder, external: true };
      }
      break;
    case "released":
      if (feature.links?.listen) {
        return { label: "Stream / save", href: feature.links.listen, external: true };
      }
      if (feature.links?.bandcamp) {
        return { label: "Stream / save", href: feature.links.bandcamp, external: true };
      }
      break;
    default:
      break;
  }
  return { label: feature.fallbackLabel, href: feature.fallbackHref, external: false };
}

/** True when the feature may appear as a public campaign (hero or catalog item). */
export function isFeatureReady(feature: FeaturedRelease = adidFeature) {
  if (!feature.published || !feature.trackTitle || !feature.artwork) return false;
  if (feature.state === "preorder") return Boolean(feature.links?.preorder);
  if (feature.state === "released") return Boolean(feature.links?.listen || feature.links?.bandcamp);
  return false;
}
