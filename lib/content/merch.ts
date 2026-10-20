/**
 * Merchandise. Rendered only when a verified store URL or product list exists.
 * Transactions stay on the external store — this site does not check out.
 */

export type MerchProduct = {
  id: string;
  name: string;
  image: { src: string; width: number; height: number; alt: string };
  href: string;
  /** Include currency, e.g. "USD 35", only when supplied and maintainable. */
  price?: string;
};

export const merch = {
  /** External shop. When set without products, navigation links here. */
  shopUrl: undefined as string | undefined,
  products: [] as readonly MerchProduct[],
};

export function merchEnabled() {
  return Boolean(merch.shopUrl) || merch.products.length > 0;
}
