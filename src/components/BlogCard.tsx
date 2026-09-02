import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { blogPostHref, formatBlogDate, type BlogPost } from "@/lib/blog";

/**
 * Η κάρτα ενός άρθρου στη λίστα της `/blog` — ίδια οπτική γλώσσα με τις κάρτες
 * υπηρεσιών (`ServiceCard`): φωτογραφία σε πλήρη κάλυψη, σκούρα βαθμίδα από
 * κάτω και τίτλος/περίληψη πάνω της.
 */
export const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <Link
    href={blogPostHref(post.slug)}
    aria-label={`${post.title} — διαβάστε το άρθρο`}
    className="group relative block aspect-[3/4] lg:aspect-[4/3.85] w-full overflow-hidden rounded-card bg-ink-900 select-none focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
  >
    <Image
      src={post.image}
      alt={post.imageAlt ?? post.title}
      fill
      sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
      className="object-cover transition-transform duration-500 ease-out md:group-hover:scale-105"
    />

    <div
      className="absolute inset-x-0 bottom-0 h-2/3 md:h-3/5 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent pointer-events-none"
      aria-hidden="true"
    />

    {post.category && (
      <span className="absolute top-3 left-3 md:top-5 md:left-5 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 font-display text-[11px] md:text-xs font-semibold uppercase tracking-wider text-white">
        {post.category}
      </span>
    )}

    <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 lg:p-5 flex flex-col gap-1.5 md:gap-2">
      <time dateTime={post.date} className="font-sans text-[11px] md:text-xs text-white/70">
        {formatBlogDate(post.date)}
      </time>
      <h3 className="font-display font-bold text-white text-base md:text-xl lg:text-lg leading-tight tracking-tight line-clamp-2">
        {post.title}
      </h3>
      <p className="font-sans font-light text-white/80 text-xs md:text-sm leading-snug line-clamp-3">
        {post.excerpt}
      </p>
      <span className="mt-1 inline-flex items-center gap-1 font-sans font-semibold text-white text-xs md:text-sm underline underline-offset-4 decoration-white/40 md:group-hover:decoration-white transition-colors">
        Διαβάστε περισσότερα
        <span aria-hidden="true">→</span>
      </span>
    </div>
  </Link>
);

/** Το πλέγμα των καρτών — 1 στήλη σε κινητό, 2 σε tablet, 3 σε desktop. */
export const BlogCardGrid: React.FC<{ posts: BlogPost[] }> = ({ posts }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
    {posts.map((post, index) => (
      <AnimatedContainer
        key={post.slug}
        delay={index * 0.1}
        initial={{ opacity: 0, translateY: 16, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, translateY: 0, filter: "blur(0px)" }}
      >
        <BlogCard post={post} />
      </AnimatedContainer>
    ))}
  </div>
);
