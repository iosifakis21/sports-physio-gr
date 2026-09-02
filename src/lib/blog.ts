/**
 * Το blog (/blog και /blog/[slug]).
 *
 * Ακολουθεί το ίδιο μοτίβο «αρχείο περιεχομένου + template» με τις σελίδες
 * υπηρεσιών (`src/content/service-pages/`) και παθήσεων
 * (`src/content/condition-pages/`), με μία διαφορά: τα άρθρα δεν δηλώνονται σε
 * κεντρικό `index.ts`. Ο φάκελος `src/content/blog/` σαρώνεται κατά το build,
 * ώστε ένα νέο άρθρο να χρειάζεται **μόνο** ένα νέο αρχείο `.json` εκεί.
 *
 * Η ανάγνωση γίνεται αποκλειστικά σε server components / build-time (σελίδες,
 * `sitemap.ts`) — όπως ακριβώς και ο έλεγχος ύπαρξης φωτογραφίας στο
 * `ServicePageTemplate`.
 */
import fs from "node:fs";
import path from "node:path";

/** Ένα «μπλοκ» κειμένου στο σώμα ενός άρθρου — ίδιο με υπηρεσίες/παθήσεις. */
export type BlogBodyBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  /** Το τμήμα του URL: /blog/<slug> */
  slug: string;
  title: string;
  /** Ημερομηνία δημοσίευσης σε μορφή ISO, π.χ. "2026-09-02". */
  date: string;
  /** Προαιρετική ετικέτα/κατηγορία, π.χ. "Αποκατάσταση". */
  category?: string;
  /** Σύντομη περίληψη — στην κάρτα της /blog και ως meta description. */
  excerpt: string;
  /** Διαδρομή αρχείου μέσα στο `public/`, π.χ. "/images/back.jpg". */
  image: string;
  /** Προαιρετικό alt· αν λείπει, χρησιμοποιείται ο τίτλος. */
  imageAlt?: string;
  body: BlogBodyBlock[];
}

export { BLOG_HUB_PATH, blogPostHref } from "./blog-paths";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

/** Στοιχειώδης έλεγχος ότι ένα αρχείο περιεχομένου έχει τα υποχρεωτικά πεδία. */
const isValidPost = (value: unknown): value is BlogPost => {
  const post = value as Partial<BlogPost> | null;
  return Boolean(
    post &&
      typeof post.slug === "string" &&
      typeof post.title === "string" &&
      typeof post.date === "string" &&
      typeof post.excerpt === "string" &&
      typeof post.image === "string" &&
      Array.isArray(post.body)
  );
};

/**
 * Όλα τα άρθρα, από το νεότερο προς το παλαιότερο. Επιστρέφει κενό πίνακα όταν
 * δεν υπάρχει ακόμη κανένα άρθρο — η `/blog` δείχνει τότε «Σύντομα διαθέσιμο».
 */
export function getBlogPosts(): BlogPost[] {
  let files: string[];
  try {
    files = fs.readdirSync(BLOG_CONTENT_DIR);
  } catch {
    return [];
  }

  return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_CONTENT_DIR, file), "utf8");
      const parsed: unknown = JSON.parse(raw);
      if (!isValidPost(parsed)) {
        throw new Error(
          `Το αρχείο src/content/blog/${file} δεν έχει τα υποχρεωτικά πεδία ενός άρθρου (βλ. src/content/blog/README.md).`
        );
      }
      return parsed;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Ένα άρθρο με βάση το slug του, ή `undefined` αν δεν υπάρχει. */
export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((post) => post.slug === slug);
}

/** Η ημερομηνία δημοσίευσης σε ελληνική μορφή, π.χ. «2 Σεπτεμβρίου 2026». */
export function formatBlogDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("el-GR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}
