/**
 * ⚠️ TODO — ΑΛΛΑΓΗ ΣΕ ΠΡΑΓΜΑΤΙΚΟ DOMAIN ⚠️
 * ---------------------------------------------------------------------------
 * ΟΛΑ τα `@id` και τα URL αυτού του αρχείου χτίζονται πάνω στο `SITE_URL` του
 * `src/lib/site.ts`, που αυτή τη στιγμή δείχνει στο προσωρινό
 * https://sports-physio-gr.vercel.app — το sports-physio.gr δεν έχει συνδεθεί
 * ακόμη.
 *
 * Δεν χρειάζεται καμία αλλαγή ΕΔΩ: αλλάξτε μόνο το `SITE_URL` στο
 * `src/lib/site.ts` και κάθε `@id` ακολουθεί αυτόματα. Η πλήρης λίστα των
 * αρχείων που επηρεάζονται βρίσκεται στο σχόλιο του `src/lib/site.ts`.
 *
 * ΠΡΟΣΟΧΗ: τα `@id` είναι σταθερά αναγνωριστικά οντοτήτων για τη Google. Όταν
 * αλλάξει το domain θα αλλάξουν και αυτά — αυτό είναι αναμενόμενο και
 * αναπόφευκτο, αλλά σημαίνει ότι η Google θα ξαναχτίσει τη γνώση της για την
 * οντότητα. Γι' αυτό η αλλαγή πρέπει να γίνει ΜΙΑ φορά, όταν το domain είναι
 * οριστικό.
 * ---------------------------------------------------------------------------
 *
 * Κεντρικό σημείο κατασκευής όλων των δομημένων δεδομένων (JSON-LD).
 *
 * Κάθε σελίδα εκπέμπει ΕΝΑ `<script type="application/ld+json">` με ένα ενιαίο
 * `@graph`, αντί για πολλά ασύνδετα blocks. Οι οντότητες συνδέονται μεταξύ τους
 * με αναφορές `{ "@id": ... }` — ποτέ με διπλότυπα inline αντικείμενα — ώστε η
 * Google να βλέπει μία επιχείρηση, έναν ιστότοπο και ένα πρόσωπο.
 */
import { SITE_NAME, SITE_URL } from "./site";
import reviewsData from "@/content/reviews.json";
import servicesData from "@/content/services.json";
import faqData from "@/content/faq.json";
import {
  servicePages,
  servicePageHref,
  SERVICES_HUB_PATH,
} from "@/content/service-pages";
import type { ServicePageContent } from "@/content/service-pages/types";
import {
  conditionPageHref,
  CONDITIONS_HUB_PATH,
} from "@/content/condition-pages";
import type { ConditionPageContent } from "@/content/condition-pages/types";

/* -------------------------------------------------------------------------- */
/*  Σταθερά αναγνωριστικά οντοτήτων                                           */
/* -------------------------------------------------------------------------- */

/**
 * Τα κανονικά `@id` του γράφου. Κάθε αναφορά σε μια οντότητα περνά από εδώ,
 * ώστε να μην υπάρξει ποτέ αναντιστοιχία ανάμεσα σε ορισμό και αναφορά.
 */
export const SCHEMA_IDS = {
  business: `${SITE_URL}/#physiotherapy`,
  website: `${SITE_URL}/#website`,
  person: `${SITE_URL}/#michalis-sioulis`,
  /** Μία οντότητα Service ανά υπηρεσία, με βάση το slug της σελίδας της. */
  service: (slug: string) => `${SITE_URL}${servicePageHref(slug)}#service`,
  breadcrumb: (slug: string) => `${SITE_URL}${servicePageHref(slug)}#breadcrumb`,
  /** Η διαδρομή πλοήγησης της σελίδας-κόμβου των υπηρεσιών. */
  servicesHubBreadcrumb: `${SITE_URL}${SERVICES_HUB_PATH}#breadcrumb`,
  /** Μία οντότητα MedicalCondition ανά πάθηση, με βάση το slug της σελίδας. */
  condition: (slug: string) =>
    `${SITE_URL}${conditionPageHref(slug)}#condition`,
  conditionBreadcrumb: (slug: string) =>
    `${SITE_URL}${conditionPageHref(slug)}#breadcrumb`,
  /** Η διαδρομή πλοήγησης της σελίδας-κόμβου των παθήσεων. */
  conditionsHubBreadcrumb: `${SITE_URL}${CONDITIONS_HUB_PATH}#breadcrumb`,
  faq: (path: string) => `${SITE_URL}${path}#faq`,
  review: (id: string) => `${SITE_URL}/#${id}`,
} as const;

/** Συντομογραφία για μια αναφορά σε υπάρχουσα οντότητα του γράφου. */
const ref = (id: string) => ({ "@id": id });

/* -------------------------------------------------------------------------- */
/*  Στοιχεία επιχείρησης                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Τα επίσημα προφίλ της επιχείρησης — χρησιμοποιούνται στο `sameAs` του
 * γράφου και στα ορατά εικονίδια του υποσέλιδου.
 */
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/sportsphysiomsioulis/",
  instagram: "https://www.instagram.com/physio_sioulis_cutman/",
} as const;

/** Το Google Business Profile — το ισχυρότερο `sameAs` για τοπικό SEO. */
export const GOOGLE_BUSINESS_PROFILE_URL =
  "https://www.google.com/maps/place/SportsPhysio+Michalis+Sioulis+%CE%A6%CF%85%CF%83%CE%B9%CE%BA%CE%BF%CE%B8%CE%B5%CF%81%CE%B1%CF%80%CE%B5%CF%85%CF%84%CE%AE%CF%82+-+%CE%A7%CE%B5%CE%B9%CF%81%CE%BF%CE%B8%CE%B5%CF%81%CE%B1%CF%80%CE%B5%CF%85%CF%84%CE%AE%CF%82/@38.0635736,23.7635202,17z/data=!3m1!4b1!4m6!3m5!1s0x14a198a8a2813a6d:0xd9d5b39abdfa83ff!8m2!3d38.0635736!4d23.7660951!16s%2Fg%2F11g889688n";

/**
 * Οι φορείς στους οποίους είναι πιστοποιημένο ή συμμετέχει ο Μιχάλης Σιούλης.
 * Ίδια λίστα με το `CredentialsStrip` της ενότητας «Γνωρίστε με».
 */
const MEMBER_ORGANISATIONS = [
  "Πανελλήνιος Σύλλογος Φυσικοθεραπευτών Ελλάδος",
  "Πανελλήνιος Σύλλογος Χειροθεραπευτών Ελλάδος",
  "Ελληνική Εταιρεία Αλγολογίας (ΕΦΕΑ)",
  "Παγκόσμια Ομοσπονδία KinesioTaping (KTA)",
  "International Cutmen Association (ICA)",
  "World Cutman Association (WCA)",
] as const;

/* -------------------------------------------------------------------------- */
/*  Βοηθητικά                                                                 */
/* -------------------------------------------------------------------------- */

/** Ανώτατο μήκος για το `reviewBody` μιας κριτικής. */
const REVIEW_EXCERPT_MAX = 200;

/**
 * Κόβει μια κριτική σε απόσπασμα κάτω από `REVIEW_EXCERPT_MAX` χαρακτήρες,
 * τερματίζοντας καθαρά: κατά προτίμηση στο τέλος πρότασης, αλλιώς στο τελευταίο
 * ολόκληρο λέξη με αποσιωπητικά. Ποτέ στη μέση λέξης.
 */
export function truncateReview(text: string, max = REVIEW_EXCERPT_MAX): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  // Κρατάμε όσες ΟΛΟΚΛΗΡΕΣ προτάσεις χωρούν στο όριο, ώστε το απόσπασμα να
  // τελειώνει πάντα σε φυσικό σημείο. Στα ελληνικά το «;» είναι ερωτηματικό.
  const sentences = clean.match(/[^.!;]+[.!;]+|[^.!;]+$/g) ?? [clean];
  let excerpt = "";
  for (const sentence of sentences) {
    if ((excerpt + sentence).trim().length > max) break;
    excerpt += sentence;
  }
  excerpt = excerpt.trim();
  if (excerpt.length > 0) return excerpt;

  // Εφεδρικό: ακόμη και η πρώτη πρόταση ξεπερνά το όριο — κόβουμε στο τελευταίο
  // ολόκληρο λέξη και προσθέτουμε αποσιωπητικά. Ποτέ στη μέση λέξης.
  const window = clean.slice(0, max - 1);
  const lastSpace = window.lastIndexOf(" ");
  const cut = lastSpace > 0 ? window.slice(0, lastSpace) : window;
  return `${cut.replace(/[\s,·—-]+$/u, "")}…`;
}

/** Το απλό κείμενο μιας απάντησης FAQ, ανεξαρτήτως μορφής στο JSON. */
type FaqAnswer = { blocks: unknown[]; plainText: string } | string;
const faqPlainText = (answer: FaqAnswer): string =>
  typeof answer === "string" ? answer : answer.plainText;

/* -------------------------------------------------------------------------- */
/*  Οντότητες του γράφου                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Η κεντρική οντότητα: το φυσικοθεραπευτήριο. Όλες οι υπόλοιπες οντότητες
 * δείχνουν σε αυτήν μέσω του `SCHEMA_IDS.business`.
 */
function buildBusiness() {
  return {
    "@type": "Physiotherapy",
    "@id": SCHEMA_IDS.business,
    name: "Μιχάλης Σιούλης - Sports-Physio.gr",
    url: SITE_URL,
    // Πραγματική φωτογραφία του θεραπευτή/χώρου — προτιμότερη από το λογότυπο
    // για το πεδίο `image` μιας τοπικής επιχείρησης (Google Business listing).
    image: `${SITE_URL}/images/hero.webp`,
    telephone: "+302128488984",
    email: "msioulis@yahoo.gr",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ιερού Λόχου 3",
      addressLocality: "Μεταμόρφωση",
      postalCode: "14451",
      addressCountry: "GR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 38.0626,
      longitude: 23.7486,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "13:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Wednesday", "Thursday"],
        opens: "16:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Tuesday",
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    sameAs: [
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.instagram,
      GOOGLE_BUSINESS_PROFILE_URL,
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "73",
      bestRating: "5",
    },
    // Ο θεραπευτής ως εργαζόμενος — αναφορά, όχι διπλότυπο αντικείμενο.
    employee: ref(SCHEMA_IDS.person),
    // Ο κατάλογος υπηρεσιών δείχνει στις οντότητες Service του ίδιου γράφου.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Υπηρεσίες φυσικοθεραπείας",
      itemListElement: servicePages.map((page) => ({
        "@type": "Offer",
        itemOffered: ref(SCHEMA_IDS.service(page.slug)),
      })),
    },
  };
}

/** Η οντότητα του ιστότοπου, με εκδότη την επιχείρηση. */
function buildWebSite() {
  return {
    "@type": "WebSite",
    "@id": SCHEMA_IDS.website,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "el",
    publisher: ref(SCHEMA_IDS.business),
  };
}

/** Ο Μιχάλης Σιούλης ως πρόσωπο — φορέας του E-E-A-T της σελίδας. */
function buildPerson() {
  return {
    "@type": "Person",
    "@id": SCHEMA_IDS.person,
    name: "Μιχάλης Σιούλης",
    jobTitle:
      "Αθλητικός Χειροθεραπευτής – Φυσικοθεραπευτής – Medical Training Therapist",
    url: SITE_URL,
    worksFor: ref(SCHEMA_IDS.business),
    memberOf: MEMBER_ORGANISATIONS.map((name) => ({
      "@type": "Organization",
      name,
    })),
  };
}

/**
 * Μία οντότητα Service ανά υπηρεσία. Ορίζονται σε κάθε σελίδα ώστε ο
 * `hasOfferCatalog` της επιχείρησης να μην αφήνει ποτέ αναφορά «στον αέρα».
 */
function buildServices() {
  return servicePages.map((page) => {
    const service = servicesData.find((s) => s.id === page.serviceId);
    return {
      "@type": "Service",
      "@id": SCHEMA_IDS.service(page.slug),
      name: service?.title ?? page.meta.title,
      serviceType: service?.title ?? page.meta.title,
      description: page.meta.description,
      url: `${SITE_URL}${servicePageHref(page.slug)}`,
      provider: ref(SCHEMA_IDS.business),
      areaServed: "Αθήνα",
    };
  });
}

/** Οι πραγματικές κριτικές Google, ως ξεχωριστές οντότητες Review. */
function buildReviews() {
  return reviewsData.map((review) => ({
    "@type": "Review",
    "@id": SCHEMA_IDS.review(review.id),
    itemReviewed: ref(SCHEMA_IDS.business),
    // Μόνο όνομα — καμία φωτογραφία ή προφίλ στο schema (GDPR).
    author: {
      "@type": "Person",
      name: review.authorName,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(review.rating),
      bestRating: "5",
    },
    reviewBody: truncateReview(review.text),
  }));
}

/** Το FAQ της αρχικής σελίδας. */
function buildHomeFaq() {
  const faqs = faqData as { question: string; answer: FaqAnswer }[];
  return {
    "@type": "FAQPage",
    "@id": SCHEMA_IDS.faq("/"),
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faqPlainText(item.answer),
      },
    })),
  };
}

/** Το FAQ μιας σελίδας υπηρεσίας, αν έχει. */
function buildServiceFaq(content: ServicePageContent) {
  if (!content.faq || content.faq.length === 0) return null;
  return {
    "@type": "FAQPage",
    "@id": SCHEMA_IDS.faq(servicePageHref(content.slug)),
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** Διαδρομή πλοήγησης: Αρχική → Υπηρεσίες → [Υπηρεσία]. */
function buildBreadcrumb(content: ServicePageContent) {
  const service = servicesData.find((s) => s.id === content.serviceId);
  return {
    "@type": "BreadcrumbList",
    "@id": SCHEMA_IDS.breadcrumb(content.slug),
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Αρχική",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Υπηρεσίες",
        item: `${SITE_URL}${SERVICES_HUB_PATH}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service?.title ?? content.meta.title,
        item: `${SITE_URL}${servicePageHref(content.slug)}`,
      },
    ],
  };
}

/** Διαδρομή πλοήγησης της σελίδας-κόμβου: Αρχική → Υπηρεσίες. */
function buildServicesHubBreadcrumb() {
  return {
    "@type": "BreadcrumbList",
    "@id": SCHEMA_IDS.servicesHubBreadcrumb,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Αρχική",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Υπηρεσίες",
        item: `${SITE_URL}${SERVICES_HUB_PATH}`,
      },
    ],
  };
}

/* -------------------------------------------------------------------------- */
/*  Γράφοι ανά σελίδα                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Οι οντότητες που υπάρχουν σε κάθε σελίδα: η επιχείρηση, ο ιστότοπος, ο
 * θεραπευτής και οι έξι υπηρεσίες. Χάρη σε αυτές, καμία αναφορά `@id` δεν
 * μένει ασύνδετη σε καμία σελίδα.
 */
function baseEntities() {
  return [buildBusiness(), buildWebSite(), buildPerson(), ...buildServices()];
}

type Graph = { "@context": "https://schema.org"; "@graph": unknown[] };

/** Τυλίγει τις οντότητες σε ένα ενιαίο `@graph`. */
const graph = (entities: unknown[]): Graph => ({
  "@context": "https://schema.org",
  "@graph": entities,
});

/** Ο γράφος της αρχικής σελίδας. */
export function buildHomeGraph(): Graph {
  return graph([...baseEntities(), ...buildReviews(), buildHomeFaq()]);
}

/** Ο γράφος της σελίδας-κόμβου των υπηρεσιών (/ypiresies). */
export function buildServicesHubGraph(): Graph {
  return graph([...baseEntities(), buildServicesHubBreadcrumb()]);
}

/** Ο γράφος μιας σελίδας υπηρεσίας. */
export function buildServiceGraph(content: ServicePageContent): Graph {
  const faq = buildServiceFaq(content);
  return graph([
    ...baseEntities(),
    buildBreadcrumb(content),
    ...(faq ? [faq] : []),
  ]);
}

/* -------------------------------------------------------------------------- */
/*  Σελίδες παθήσεων (/pathiseis)                                             */
/* -------------------------------------------------------------------------- */

/** Η διαδρομή πλοήγησης μιας σελίδας πάθησης: Αρχική → Παθήσεις → <πάθηση>. */
function buildConditionBreadcrumb(content: ConditionPageContent) {
  return {
    "@type": "BreadcrumbList",
    "@id": SCHEMA_IDS.conditionBreadcrumb(content.slug),
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Αρχική",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Παθήσεις",
        item: `${SITE_URL}${CONDITIONS_HUB_PATH}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: content.name,
        item: `${SITE_URL}${conditionPageHref(content.slug)}`,
      },
    ],
  };
}

function buildConditionsHubBreadcrumb() {
  return {
    "@type": "BreadcrumbList",
    "@id": SCHEMA_IDS.conditionsHubBreadcrumb,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Αρχική",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Παθήσεις",
        item: `${SITE_URL}${CONDITIONS_HUB_PATH}`,
      },
    ],
  };
}

/**
 * Η ίδια η πάθηση, ως `MedicalCondition` (schema.org/MedicalCondition — μέρος
 * της επέκτασης health-lifesci, την οποία η Google αναγνωρίζει). Τα συμπτώματα
 * μπαίνουν ως `MedicalSignOrSymptom` και οι σχετικές υπηρεσίες ως
 * `possibleTreatment`, με αναφορά στις υπάρχουσες οντότητες Service του γράφου.
 */
function buildMedicalCondition(content: ConditionPageContent) {
  const treatments = content.howWeHelp.relatedServices
    .filter((service) => servicePages.some((page) => page.slug === service.slug))
    .map((service) => ref(SCHEMA_IDS.service(service.slug)));

  return {
    "@type": "MedicalCondition",
    "@id": SCHEMA_IDS.condition(content.slug),
    name: content.name,
    description: content.meta.description,
    url: `${SITE_URL}${conditionPageHref(content.slug)}`,
    ...(content.symptoms.length > 0
      ? {
          signOrSymptom: content.symptoms.map((symptom) => ({
            "@type": "MedicalSignOrSymptom",
            name: symptom,
          })),
        }
      : {}),
    ...(treatments.length > 0 ? { possibleTreatment: treatments } : {}),
  };
}

/** Ο γράφος της σελίδας-κόμβου των παθήσεων (/pathiseis). */
export function buildConditionsHubGraph(): Graph {
  return graph([...baseEntities(), buildConditionsHubBreadcrumb()]);
}

/** Ο γράφος μιας σελίδας πάθησης. */
export function buildConditionGraph(content: ConditionPageContent): Graph {
  return graph([
    ...baseEntities(),
    buildConditionBreadcrumb(content),
    buildMedicalCondition(content),
  ]);
}
