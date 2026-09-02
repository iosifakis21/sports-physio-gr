import type { BlogPostContent } from "./types";

/**
 * ΑΡΘΡΟ: /blog/epistrefei-stis-proponiseis-giorgos-tzanos-rixi-pxs
 *
 * Μεταφορά από το παλιό blog (sports-physio.gr/journal2/blog), αρχική
 * δημοσίευση 05/03/2021.
 */
export const epistrefeiStisProponiseisGiorgosTzanosRixiPxsPost: BlogPostContent = {
  slug: "epistrefei-stis-proponiseis-giorgos-tzanos-rixi-pxs",
  category: "nea",
  title: "Επιστρέφει στις Προπονήσεις ο Γιώργος Τζάνος. Παρελθόν η Ρήξη ΠΧΣ",
  excerpt:
    "Ο παγκόσμιος πρωταθλητής Karate Γιώργος Τζάνος επέστρεψε σε δυνατές προπονήσεις μετά τη ρήξη Πρόσθιου Χιαστού Συνδέσμου, έτοιμος να διεκδικήσει την πρόκριση στο προ-ολυμπιακό τουρνουά για το Τόκιο.",
  publishedAt: "2021-03-05",
  author: "Μιχάλης Σιούλης",

  coverImage: {
    src: "/images/blog/epistrefei-stis-proponiseis-giorgos-tzanos-rixi-pxs/cover.jpg",
    alt: "Ο Γιώργος Τζάνος στο βάθρο με το μετάλλιο της Εθνικής ομάδας Karate",
  },

  meta: {
    title: "Επιστρέφει στις Προπονήσεις ο Γιώργος Τζάνος. Παρελθόν η Ρήξη ΠΧΣ",
    description:
      "Μετά τη χειρουργική αποκατάσταση και το πολύμηνο πρόγραμμα φυσικοθεραπείας-Medical Training με τον Μιχάλη Σιούλη, ο παγκόσμιος πρωταθλητής Karate Γιώργος Τζάνος επιστρέφει σε δυνατές προπονήσεις.",
  },

  body: [
    {
      type: "heading",
      text: "Παρελθόν η ρήξη ΠΧΣ για τον Γιώργο Τζάνο. Επιστρέφει σε δυνατές προπονήσεις",
    },
    {
      type: "paragraph",
      text: "Ο παγκόσμιος πρωταθλητής και μέλος της Εθνικής ομάδας Karate από το 2003, Γιώργος Τζάνος, υπέστη Ρήξη Πρόσθιου Χιαστού Συνδέσμου τον Μάιο του 2020.",
    },
    {
      type: "paragraph",
      text: "Ακολούθησε χειρουργική αποκατάσταση και πολύμηνο πρόγραμμα φυσικοθεραπείας - Medical Training, για να επιστρέψει στο αγωνιστικό επίπεδο που ήταν προ τραυματισμού.",
    },
    {
      type: "paragraph",
      text: "Η συνεργασία του ιατρικού team και του φυσικοθεραπευτή του Γιώργου Τζάνου, Μιχάλη Σιούλη, έφερε άριστα αποτελέσματα και ο αθλητής επέστρεψε στις δυνατές προπονήσεις.",
    },
    {
      type: "paragraph",
      text: "Πλέον είναι έτοιμος να διεκδικήσει την πρόκριση στο προ-ολυμπιακό τουρνουά τον Ιούνιο, με στόχο την Ολυμπιάδα στο Τόκιο της Ιαπωνίας.",
    },
    {
      type: "paragraph",
      text: "Καλή επιτυχία στον πρωταθλητή μας.",
    },
  ],

  relatedServices: [
    { slug: "medical-training-therapy" },
    { slug: "manual-therapy" },
  ],
};
