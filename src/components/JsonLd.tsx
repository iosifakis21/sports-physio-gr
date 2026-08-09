import React from "react";

/**
 * Εκπέμπει ΕΝΑ `<script type="application/ld+json">` με τον γράφο δομημένων
 * δεδομένων της σελίδας.
 *
 * Κάθε σελίδα πρέπει να χρησιμοποιεί αυτό το component ακριβώς μία φορά — ο
 * γράφος χτίζεται συγκεντρωτικά στο `src/lib/schema.ts`.
 *
 * Το `</` στο JSON γίνεται escape ώστε ένα `</script>` μέσα σε κείμενο (π.χ.
 * σε κριτική) να μην μπορεί να κλείσει πρόωρα το tag.
 */
export const JsonLd: React.FC<{ data: unknown }> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    }}
  />
);
