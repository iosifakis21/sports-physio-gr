import {
  contentType,
  renderServiceOgImage,
  serviceOgAlt,
  size,
} from "@/app/_og/service-og-image";

/** Δυναμική εικόνα Open Graph (PNG) — βλ. `src/app/_og/service-og-image.tsx`. */
const SLUG = "dry-needling";

export const alt = serviceOgAlt(SLUG);
export { size, contentType };

export default async function Image() {
  return renderServiceOgImage(SLUG);
}
