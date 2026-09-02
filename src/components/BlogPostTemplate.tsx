import fs from "node:fs";
import path from "node:path";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { InlineBookingCalendar } from "@/components/InlineBookingCalendar";
import { JsonLd } from "@/components/JsonLd";
import { buildBlogPostGraph } from "@/lib/schema";
import { BLOG_HUB_PATH, formatBlogDate, type BlogPost } from "@/lib/blog";

/**
 * Ίδιος έλεγχος με το `ServicePageTemplate`: αν η φωτογραφία δεν υπάρχει ακόμη
 * στο `public/`, η σελίδα την παραλείπει αντί να δείξει σπασμένη εικόνα.
 * Τρέχει στο build (server component + προ-παραγόμενες σελίδες).
 */
const imageExists = (image: string): boolean => {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", image));
  } catch {
    return false;
  }
};

/** Ένα μπλοκ κειμένου του άρθρου — ίδια τυπογραφία με υπηρεσίες/παθήσεις. */
const BodyBlock: React.FC<{ block: BlogPost["body"][number] }> = ({ block }) => {
  if (block.type === "heading") {
    return (
      <h2 className="font-display font-bold text-xl md:text-2xl text-ink-900 tracking-tight mt-4">
        {block.text}
      </h2>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="list-disc pl-5 flex flex-col gap-2 text-base text-ink-600 font-sans leading-relaxed">
        {block.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <p className="text-base md:text-lg text-ink-600 font-sans leading-relaxed">
      {block.text}
    </p>
  );
};

/**
 * Κοινό layout για κάθε `/blog/[slug]`. Όλο το κείμενο έρχεται από το αρχείο
 * του άρθρου στο `src/content/blog/` — βλ. το README εκεί.
 */
export const BlogPostTemplate: React.FC<{ post: BlogPost }> = ({ post }) => {
  const hasImage = imageExists(post.image);

  return (
    <article className="flex flex-col w-full">
      {/* Ενιαίο `@graph`: επιχείρηση, ιστότοπος, θεραπευτής, υπηρεσίες, η
          διαδρομή πλοήγησης (Αρχική → Blog → άρθρο) και το ίδιο το άρθρο. */}
      <JsonLd data={buildBlogPostGraph(post)} />

      {/* ---------- Επικεφαλίδα: διαδρομή, τίτλος, ημερομηνία, φωτογραφία ---------- */}
      <section className="relative bg-ink-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/30 via-ink-900 to-ink-900"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div className="flex flex-col gap-4 md:gap-5">
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
              <Link
                href={BLOG_HUB_PATH}
                className="hover:text-white transition-colors focus:outline focus:outline-2 focus:outline-primary rounded"
              >
                Blog
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-slate-300">{post.title}</span>
            </nav>

            {post.category && (
              <span className="self-start rounded-full bg-white/10 px-3 py-1 font-display text-xs font-semibold uppercase tracking-wider text-white/80">
                {post.category}
              </span>
            )}

            <h1 className="font-display font-extrabold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
              {post.title}
            </h1>

            <time
              dateTime={post.date}
              className="font-sans text-sm text-slate-400"
            >
              {formatBlogDate(post.date)}
            </time>

            <p className="font-sans text-base md:text-lg text-slate-300 leading-relaxed max-w-xl">
              {post.excerpt}
            </p>
          </div>

          {/* Φωτογραφία — πάνω από το κείμενο σε κινητό, δίπλα του σε desktop */}
          <div className="relative w-full aspect-[16/10] lg:aspect-[4/3] rounded-card overflow-hidden ring-1 ring-white/10 shadow-2xl order-first lg:order-last bg-gradient-to-br from-white/10 via-white/5 to-transparent">
            {hasImage && (
              <Image
                src={post.image}
                alt={post.imageAlt ?? post.title}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </section>

      {/* ---------- Κυρίως κείμενο ---------- */}
      <section className="py-[56px] md:py-[96px] bg-surface">
        <div className="max-w-[800px] mx-auto px-4 md:px-8 flex flex-col gap-5">
          {post.body.map((block, index) => (
            <BodyBlock key={index} block={block} />
          ))}

          <Link
            href={BLOG_HUB_PATH}
            className="mt-6 font-sans font-semibold text-primary-link hover:underline focus:outline focus:outline-2 focus:outline-primary rounded self-start"
          >
            ← Όλα τα άρθρα
          </Link>
        </div>
      </section>

      {/* ---------- Κλείσιμο ραντεβού (ίδιο component με υπηρεσίες/παθήσεις) ---------- */}
      <InlineBookingCalendar />
    </article>
  );
};
