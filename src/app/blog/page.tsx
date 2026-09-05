import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { BlogCardGrid } from "@/components/BlogCard";
import { buildBlogHubGraph } from "@/lib/schema";
import { BLOG_HUB_PATH, getBlogPosts } from "@/lib/blog";
import { SITE_NAME } from "@/lib/site";

const TITLE = "Blog | Sports-Physio.gr — Μιχάλης Σιούλης";
const DESCRIPTION =
  "Άρθρα και συμβουλές για τον πόνο, τους τραυματισμούς και την αποκατάσταση, από τον φυσικοθεραπευτή Μιχάλη Σιούλη — Sports-Physio.gr, Μεταμόρφωση Αττικής.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: BLOG_HUB_PATH,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BLOG_HUB_PATH,
    siteName: SITE_NAME,
    locale: "el_GR",
    type: "website",
  },
};

export default function Page() {
  const posts = getBlogPosts();

  return (
    <article className="flex flex-col w-full">
      <JsonLd data={buildBlogHubGraph()} />

      {/* ---------- Επικεφαλίδα σελίδας ---------- */}
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

          {/* Eyebrow — λευκό, όπως στις άλλες σελίδες-κόμβους, για αντίθεση
              πάνω στο ink-900. */}
          <span className="text-sm font-semibold tracking-wider uppercase text-white/70 font-display">
            Blog
          </span>

          <h1 className="font-display font-extrabold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
            Άρθρα &amp; Συμβουλές
          </h1>

          <p className="font-sans text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Πρακτικές, τεκμηριωμένες συμβουλές για τον πόνο, τους τραυματισμούς
            και την αποκατάσταση — γραμμένες με απλά λόγια, από την καθημερινή
            πράξη του φυσικοθεραπευτηρίου.
          </p>
        </div>
      </section>

      {/* ---------- Λίστα άρθρων ---------- */}
      <section className="py-[56px] md:py-[96px] bg-surface select-none">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          {posts.length > 0 ? (
            <>
              {/* Όπως και στο /ypiresies: οι κάρτες άρθρων είναι h3 και
                  ακολουθούσαν κατευθείαν το h1. Το h2 αποκαθιστά την ιεραρχία
                  χωρίς να αλλάξει η εμφάνιση — ο τίτλος φαίνεται ήδη στο hero. */}
              <h2 className="sr-only">Όλα τα άρθρα</h2>
              <BlogCardGrid posts={posts} />
            </>
          ) : (
            /* Κενή κατάσταση: δεν έχει δημοσιευτεί ακόμη κανένα άρθρο. Δείχνουμε
               καθαρό μήνυμα αντί για άδειο πλέγμα. */
            <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-4 rounded-card border border-ink-900/5 bg-surface-alt px-6 py-12 md:py-16">
              <span aria-hidden="true" className="text-4xl">
                ✍️
              </span>
              <h2 className="font-display font-bold text-xl md:text-2xl text-ink-900 tracking-tight">
                Σύντομα διαθέσιμο
              </h2>
              <p className="font-sans text-base text-ink-600 leading-relaxed">
                Ετοιμάζουμε τα πρώτα άρθρα με συμβουλές για τον πόνο, την
                πρόληψη τραυματισμών και την αποκατάσταση. Μέχρι τότε, δείτε τις
                υπηρεσίες μας ή κλείστε ένα ραντεβού αξιολόγησης.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                <Link
                  href="/ypiresies"
                  className="font-sans font-semibold text-primary-link hover:underline focus:outline focus:outline-2 focus:outline-primary rounded whitespace-nowrap"
                >
                  Δείτε τις υπηρεσίες μας →
                </Link>
                <Link
                  href="/pathiseis"
                  className="font-sans font-semibold text-primary-link hover:underline focus:outline focus:outline-2 focus:outline-primary rounded whitespace-nowrap"
                >
                  Δείτε τις παθήσεις που αντιμετωπίζουμε →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
