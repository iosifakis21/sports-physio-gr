import { MetadataRoute } from "next";
import { servicePages, servicePageHref } from "@/content/service-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sports-physio.gr";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    // One entry per service page (/ypiresies/[slug])
    ...servicePages.map((page) => ({
      url: `${baseUrl}${servicePageHref(page.slug)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/politiki-aporritou`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
