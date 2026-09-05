import { renderOgImage, size, contentType } from "@/app/_og/og-image";

/** Εικόνα Open Graph της σελίδας-κόμβου των παθήσεων. */
export const alt =
  "Οι παθήσεις που αντιμετωπίζουμε — Sports-Physio.gr, Μιχάλης Σιούλης, Φυσικοθεραπευτής.";
export { size, contentType };

export default async function Image() {
  return renderOgImage({
    badge: "Πάθηση",
    title: "Παθήσεις που Αντιμετωπίζουμε",
    tagline:
      "Οσφυαλγία, δισκοκήλη, τενοντοπάθειες, διαστρέμματα και άλλες παθήσεις — αιτίες, συμπτώματα και αποκατάσταση.",
  });
}
