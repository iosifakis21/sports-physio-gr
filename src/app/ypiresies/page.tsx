import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ServiceCardGrid, type ServiceItem } from "@/components/ServiceCard";
import { buildServicesHubGraph } from "@/lib/schema";
import { SERVICES_HUB_PATH } from "@/content/service-pages";
import { SITE_NAME } from "@/lib/site";
import servicesData from "@/content/services.json";

const TITLE = "Υπηρεσίες | Sports-Physio.gr — Μιχάλης Σιούλης";
const DESCRIPTION =
  "Όλες οι υπηρεσίες του Sports-Physio.gr: Manual Therapy, Medical Training Therapy, Κρουστικός Υπέρηχος (PiezoWave2), Πελματογράφος, Dry Needling και Kinesiotaping στη Μεταμόρφωση Αττικής.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: SERVICES_HUB_PATH,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SERVICES_HUB_PATH,
    siteName: SITE_NAME,
    locale: "el_GR",
    type: "website",
  },
};

export default function Page() {
  const services = servicesData as ServiceItem[];

  return (
    <article className="flex flex-col w-full">
      <JsonLd data={buildServicesHubGraph()} />

      {/* ---------- Page header ---------- */}
      <section className="relative bg-ink-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/30 via-ink-900 to-ink-900"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-16 lg:py-20 flex flex-col gap-4 md:gap-5">
          {/* Breadcrumb — ίδιο μοτίβο με τις σελίδες υπηρεσιών */}
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
            <span className="text-slate-300">Υπηρεσίες</span>
          </nav>

          {/* Eyebrow — λευκό αντί για `text-primary`, που πάνω στο ink-900 της
              επικεφαλίδας δεν θα είχε επαρκή αντίθεση. */}
          <span className="text-sm font-semibold tracking-wider uppercase text-white/70 font-display">
            Υπηρεσίες
          </span>

          <h1 className="font-display font-extrabold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
            Οι Υπηρεσίες μας
          </h1>

          <p className="font-sans text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Επτά εξειδικευμένες θεραπείες φυσικοθεραπείας και αθλητικής
            αποκατάστασης — επιλέξτε μια υπηρεσία για να δείτε αναλυτικά πώς
            λειτουργεί και σε ποιες περιπτώσεις βοηθά.
          </p>
        </div>
      </section>

      {/* ---------- Grid με τις επτά υπηρεσίες ---------- */}
      <section className="py-[56px] md:py-[96px] bg-surface select-none">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <ServiceCardGrid services={services} />
        </div>
      </section>
    </article>
  );
}
