import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { renderOgImage, size, contentType } from "@/app/_og/og-image";

/**
 * Δυναμική εικόνα Open Graph (PNG) για τα άρθρα του blog.
 *
 * Σε αντίθεση με τις υπηρεσίες και τις παθήσεις, το blog είναι ΕΝΑ δυναμικό
 * segment (`[slug]`), οπότε αρκεί αυτό το ένα αρχείο για όλα τα άρθρα.
 *
 * Το `generateStaticParams` χρειάζεται ρητά εδώ: το `opengraph-image` είναι
 * ξεχωριστό route handler και δεν κληρονομεί το `generateStaticParams` του
 * `page.tsx` του ίδιου segment. Χωρίς αυτό οι εικόνες δεν προπαράγονται.
 */

export const alt = "Άρθρο — Sports-Physio.gr, Μιχάλης Σιούλης, Φυσικοθεραπευτής.";
export { size, contentType };

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  return renderOgImage({
    badge: "Άρθρο",
    title: post?.title ?? "Άρθρο",
    tagline: post?.excerpt ?? "",
  });
}
