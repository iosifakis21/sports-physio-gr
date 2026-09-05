import { renderOgImage, size, contentType } from "@/app/_og/og-image";

/** Εικόνα Open Graph της σελίδας-κόμβου του blog. */
export const alt =
  "Άρθρα & Συμβουλές — Sports-Physio.gr, Μιχάλης Σιούλης, Φυσικοθεραπευτής.";
export { size, contentType };

export default async function Image() {
  return renderOgImage({
    badge: "Άρθρο",
    title: "Άρθρα & Συμβουλές",
    tagline:
      "Πρακτικές, τεκμηριωμένες συμβουλές για τον πόνο, τους τραυματισμούς και την αποκατάσταση.",
  });
}
