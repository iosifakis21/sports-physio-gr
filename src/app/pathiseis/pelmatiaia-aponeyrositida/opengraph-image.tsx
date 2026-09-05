import {
  conditionOgAlt,
  contentType,
  renderConditionOgImage,
  size,
} from "@/app/_og/condition-og-image";

/** Δυναμική εικόνα Open Graph (PNG) — βλ. `src/app/_og/condition-og-image.tsx`. */
const SLUG = "pelmatiaia-aponeyrositida";

export const alt = conditionOgAlt(SLUG);
export { size, contentType };

export default async function Image() {
  return renderConditionOgImage(SLUG);
}
