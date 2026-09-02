import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/Button";
import { InlineBookingCalendar } from "@/components/InlineBookingCalendar";
import { JsonLd } from "@/components/JsonLd";
import { buildBlogPostGraph } from "@/lib/schema";
import { servicePageHref } from "@/content/service-pages";
import servicesData from "@/content/services.json";
import { BLOG_CATEGORY_LABELS } from "@/content/blog-posts/types";
import type { BlogPostContent } from "@/content/blog-posts/types";

const CalendarIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
    />
  </svg>
);

const formatPublishedDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString("el-GR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/**
 * Shared layout for every `/blog/[slug]` page — the blog counterpart of
 * `ConditionPageTemplate`. All copy comes from the post's own content file in
 * `src/content/blog-posts/`.
 */
export const BlogPostTemplate: React.FC<{ content: BlogPostContent }> = ({
  content,
}) => {
  const { title, category, publishedAt, author, coverImage, body } = content;

  // Οι σχετικές υπηρεσίες, με τον τίτλο τους από το `services.json` όταν το
  // αρχείο περιεχομένου δεν δίνει δικό του `label`. Υπηρεσίες που δεν υπάρχουν
  // στο `services.json` απορρίπτονται, ώστε να μη βγει ποτέ σπασμένος σύνδεσμος.
  const relatedServices = (content.relatedServices ?? [])
    .map((related) => {
      const service = servicesData.find((item) => item.slug === related.slug);
      if (!service) return null;
      return { slug: related.slug, label: related.label ?? service.title };
    })
    .filter((item): item is { slug: string; label: string } => item !== null);

  return (
    <article className="flex flex-col w-full">
      <JsonLd data={buildBlogPostGraph(content)} />

      {/* ---------- Page hero: τίτλος + ημερομηνία/κατηγορία ---------- */}
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
            <Link
              href="/blog"
              className="hover:text-white transition-colors focus:outline focus:outline-2 focus:outline-primary rounded"
            >
              Blog
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-300">{title}</span>
          </nav>

          <span className="text-sm font-semibold tracking-wider uppercase text-white/70 font-display">
            {BLOG_CATEGORY_LABELS[category]}
          </span>

          <h1 className="font-display font-extrabold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
            {title}
          </h1>

          <p className="font-sans text-sm md:text-base text-slate-400">
            {formatPublishedDate(publishedAt)}
            {author ? ` · ${author}` : ""}
          </p>
        </div>
      </section>

      {/* ---------- Εικόνα εξωφύλλου ---------- */}
      {coverImage && (
        <section className="bg-surface">
          <div className="max-w-[800px] mx-auto px-4 md:px-8 -mt-8 md:-mt-12 relative z-10">
            <div className="relative w-full aspect-[16/9] rounded-card overflow-hidden shadow-lg">
              <Image
                src={coverImage.src}
                alt={coverImage.alt}
                fill
                sizes="(min-width: 800px) 800px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* ---------- Σώμα άρθρου ---------- */}
      <section className="py-[56px] md:py-[96px] bg-surface">
        <div className="max-w-[800px] mx-auto px-4 md:px-8 flex flex-col gap-5">
          {body.map((block, index) => {
            switch (block.type) {
              case "heading":
                return (
                  <h2
                    key={index}
                    className="font-display font-extrabold text-xl md:text-2xl text-ink-900 tracking-tight mt-4"
                  >
                    {block.text}
                  </h2>
                );
              case "paragraph":
                return (
                  <p
                    key={index}
                    className="text-base md:text-lg text-ink-600 font-sans leading-relaxed"
                  >
                    {block.text}
                  </p>
                );
              case "list": {
                const ListTag = block.ordered ? "ol" : "ul";
                return (
                  <ListTag
                    key={index}
                    className={`flex flex-col gap-2 text-base md:text-lg text-ink-600 font-sans leading-relaxed pl-5 ${
                      block.ordered ? "list-decimal" : "list-disc"
                    }`}
                  >
                    {block.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ListTag>
                );
              }
              case "image":
                return (
                  <figure key={index} className="flex flex-col gap-2 my-2">
                    <div className="relative w-full aspect-[4/3] rounded-card overflow-hidden">
                      <Image
                        src={block.src}
                        alt={block.alt}
                        fill
                        sizes="(min-width: 800px) 800px, 100vw"
                        className="object-cover"
                      />
                    </div>
                    {block.caption && (
                      <figcaption className="text-sm text-ink-500 font-sans text-center">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              default:
                return null;
            }
          })}

          {relatedServices.length > 0 && (
            <div className="flex flex-col gap-3 mt-4">
              <h3 className="font-display font-bold text-lg text-ink-900">
                Σχετικές υπηρεσίες
              </h3>
              <ul className="flex flex-col gap-2">
                {relatedServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={servicePageHref(service.slug)}
                      className="font-sans font-semibold text-primary-link hover:underline focus:outline focus:outline-2 focus:outline-primary rounded"
                    >
                      {service.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4">
            <Button
              variant="primary"
              label="Κλείστε Ραντεβού"
              calPopup
              href="#kleiste-rantevou"
              icon={<CalendarIcon />}
            />
          </div>
        </div>
      </section>

      {/* ---------- Inline booking calendar ---------- */}
      <InlineBookingCalendar />
    </article>
  );
};
