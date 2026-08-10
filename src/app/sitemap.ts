import { MetadataRoute } from "next";
import {
  servicePages,
  servicePageHref,
  SERVICES_HUB_PATH,
} from "@/content/service-pages";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Το sitemap απαιτεί απόλυτα URL — το `metadataBase` δεν ισχύει εδώ.
  const baseUrl = SITE_URL;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    // Η σελίδα-κόμβος με όλες τις υπηρεσίες
    {
      url: `${baseUrl}${SERVICES_HUB_PATH}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // One entry per service page (/ypiresies/[slug])
    ...servicePages.map((page) => ({
      url: `${baseUrl}${servicePageHref(page.slug)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Η /politiki-aporritou δεν περιλαμβάνεται σκόπιμα: είναι `noindex`
    // (βλ. `src/app/politiki-aporritou/page.tsx`), οπότε η καταχώρισή της εδώ
    // θα έστελνε αντιφατικό σήμα στις μηχανές αναζήτησης.
  ];
}
