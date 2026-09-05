import { renderOgImage, size, contentType } from "@/app/_og/og-image";

/** Εικόνα Open Graph της σελίδας-κόμβου των υπηρεσιών. */
export const alt =
  "Οι υπηρεσίες μας — Sports-Physio.gr, Μιχάλης Σιούλης, Φυσικοθεραπευτής.";
export { size, contentType };

export default async function Image() {
  return renderOgImage({
    badge: "Υπηρεσία",
    title: "Οι Υπηρεσίες μας",
    tagline:
      "Επτά εξειδικευμένες θεραπείες φυσικοθεραπείας και αθλητικής αποκατάστασης.",
  });
}
