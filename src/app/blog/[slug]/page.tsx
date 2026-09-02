import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostTemplate } from "@/components/BlogPostTemplate";
import { blogPostHref, getBlogPost, getBlogPosts } from "@/lib/blog";
import { SITE_NAME } from "@/lib/site";

const SITE_NAME_SUFFIX = "Sports-Physio.gr — Μιχάλης Σιούλης";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Ένα άρθρο ανά αρχείο στο `src/content/blog/`. Οι διαδρομές παράγονται στο
 * build, οπότε ένα νέο αρχείο αρκεί για να υπάρξει η σελίδα του — καμία άλλη
 * αλλαγή κώδικα.
 */
export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

/** Κανένα slug εκτός των αρχείων περιεχομένου: ό,τι άλλο είναι 404. */
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const title = `${post.title} | ${SITE_NAME_SUFFIX}`;
  // Σχετική διαδρομή: γίνεται απόλυτο URL μέσω του `metadataBase` του layout.
  const url = blogPostHref(post.slug);

  return {
    title,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: post.excerpt,
      url,
      siteName: SITE_NAME,
      locale: "el_GR",
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return <BlogPostTemplate post={post} />;
}
