import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { buildBlogHubGraph } from "@/lib/schema";
import {
  BLOG_HUB_PATH,
  blogPostHref,
  blogPostsSortedByDate,
} from "@/content/blog-posts";
import { BLOG_CATEGORY_LABELS } from "@/content/blog-posts/types";
import { SITE_NAME } from "@/lib/site";

const TITLE = "Blog | Sports-Physio.gr — Μιχάλης Σιούλης";
const DESCRIPTION =
  "Άρθρα φυσικοθεραπείας και νέα από το Sports-Physio.gr: παθήσεις, αποκατάσταση, εξοπλισμός και η δράση του Μιχάλη Σιούλη στον χώρο του Cutman.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: BLOG_HUB_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BLOG_HUB_PATH,
    siteName: SITE_NAME,
    locale: "el_GR",
    type: "website",
  },
};

const formatPublishedDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString("el-GR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function Page() {
  const posts = blogPostsSortedByDate();

  return (
    <article className="flex flex-col w-full">
      <JsonLd data={buildBlogHubGraph()} />

      {/* ---------- Page header ---------- */}
      <section className="relative bg-ink-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/30 via-ink-900 to-ink-900"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-16 lg:py-20 flex flex-col gap-4 md:gap-5">
          <nav
            aria-label="Διαδρομή πλοήγησης"
            className="font-sans text-xs md:text-sm text-slate-400 flex items-center gap-2 flex-wrap"
          >
            <Link
              href="/"
              className="hover:text-white transition-colors focus:outline focus:outline-2 focus:outline-primary rounded"
            >
              Αρχική
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-300">Blog</span>
          </nav>
          <span className="text-sm font-semibold tracking-wider uppercase text-white/70 font-display">
            Blog
          </span>
          <h1 className="font-display font-extrabold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
            Άρθρα &amp; Νέα
          </h1>
          <p className="font-sans text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Άρθρα φυσικοθεραπείας για παθήσεις και αποκατάσταση, και νέα από
            το SportsPhysio του Μιχάλη Σιούλη.
          </p>
        </div>
      </section>

      {/* ---------- Λίστα άρθρων ---------- */}
      <section className="py-[56px] md:py-[96px] bg-surface">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={blogPostHref(post.slug)}
              className="group flex flex-col bg-surface-alt rounded-card border border-ink-900/5 overflow-hidden focus:outline focus:outline-2 focus:outline-primary"
            >
              {post.coverImage && (
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.coverImage.src}
                    alt={post.coverImage.alt}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex flex-col gap-3 p-6">
                <span className="text-xs font-semibold tracking-wider uppercase text-primary-link font-display">
                  {BLOG_CATEGORY_LABELS[post.category]}
                </span>
                <h2 className="font-display font-bold text-lg md:text-xl text-ink-900 leading-snug">
                  {post.title}
                </h2>
                <p className="font-sans text-sm md:text-base text-ink-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="font-sans text-xs text-ink-500 mt-1">
                  {formatPublishedDate(post.publishedAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
