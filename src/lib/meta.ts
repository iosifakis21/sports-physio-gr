/**
 * Βοηθητικά για τα μήκη των meta tags.
 *
 * Η Google κόβει τα `<title>` γύρω στους 60 χαρακτήρες και τις meta
 * descriptions γύρω στους 155–160. Ό,τι περισσεύει δεν βλάπτει την κατάταξη,
 * αλλά χάνεται από το αποτέλεσμα αναζήτησης — και στα άρθρα του blog αυτό που
 * χανόταν ήταν το θέμα του άρθρου, ενώ επιβίωνε το όνομα του site.
 */

/** Το μέγιστο μήκος μιας meta description πριν την κόψει η Google. */
export const META_DESCRIPTION_MAX = 155;

/**
 * Κόβει μια περιγραφή στο όριο, πάντα σε όριο λέξης και ποτέ στη μέση λέξης.
 * Αν χωράει ολόκληρη, επιστρέφεται αυτούσια.
 */
export function clampDescription(
  text: string,
  max = META_DESCRIPTION_MAX
): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const window = clean.slice(0, max - 1);
  const lastSpace = window.lastIndexOf(" ");
  const cut = lastSpace > 0 ? window.slice(0, lastSpace) : window;
  return `${cut.replace(/[\s,·—-]+$/u, "")}…`;
}
