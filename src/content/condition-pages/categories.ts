/**
 * Οι κατηγορίες παθήσεων της σελίδας /pathiseis.
 *
 * ΠΡΟΣΟΧΗ: δεν έχει καμία σχέση με το `src/content/conditions.json`, που
 * τροφοδοτεί την ενότητα «Πού πονάει;» της αρχικής σελίδας. Οι κατηγορίες εδώ
 * ακολουθούν τη δομή του παλιού sports-physio.gr: 7 κατηγορίες, 21 παθήσεις.
 */

/** Το `id` μιας κατηγορίας παθήσεων — και το slug της στα δεδομένα. */
export type ConditionCategoryId =
  | "spondyliki-stili"
  | "gonato"
  | "omos"
  | "podoknimiki"
  | "agkonas"
  | "ischio"
  | "akra-cheira";

export interface ConditionCategory {
  id: ConditionCategoryId;
  /** Ο ελληνικός τίτλος της κατηγορίας, όπως εμφανίζεται στη σελίδα-κόμβο. */
  title: string;
}

/** Οι κατηγορίες με τη σειρά που εμφανίζονται στη σελίδα /pathiseis. */
export const conditionCategories: ConditionCategory[] = [
  { id: "spondyliki-stili", title: "Σπονδυλική Στήλη" },
  { id: "gonato", title: "Γόνατο" },
  { id: "omos", title: "Ώμος" },
  { id: "podoknimiki", title: "Ποδοκνημική" },
  { id: "agkonas", title: "Αγκώνας" },
  { id: "ischio", title: "Ισχίο" },
  { id: "akra-cheira", title: "Άκρα Χείρα" },
];
