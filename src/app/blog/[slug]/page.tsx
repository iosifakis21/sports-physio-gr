import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostTemplate } from "@/components/BlogPostTemplate";
import { blogPostHref, getBlogPost, getBlogPosts } from "@/lib/blog";
import { SITE_NAME } from "@/lib/site";
import { clampDescription } from "@/lib/meta";

/**
 * Σκόπιμα ΣΥΝΤΟΜΟΤΕΡΟ από το «Sports-Physio.gr — Μιχάλης Σιούλης» των
 * υπόλοιπων σελίδων.
 *
 * Οι τίτλοι των άρθρων είναι από τη φύση τους μεγάλοι (έως 108 χαρακτήρες).
 * Με το πλήρες επίθεμα των 37 χαρακτήρων, το `<title>` έφτανε τους 145 και η
 * Google έκοβε ακριβώς το θέμα του άρθρου, αφήνοντας ορατό το όνομα του site.
 */
const SITE_NAME_SUFFIX = "Sports-Physio.gr";

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
  // Τα excerpts των άρθρων φτάνουν τους 209 χαρακτήρες — πάνω από το όριο
  // εμφάνισης της Google. Κόβονται σε όριο λέξης, ποτέ στη μέση.
  const description = clampDescription(post.excerpt);
  // Σχετική διαδρομή: γίνεται απόλυτο URL μέσω του `metadataBase` του layout.
  const url = blogPostHref(post.slug);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
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
