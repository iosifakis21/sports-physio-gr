import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { buildServiceMetadata } from "@/content/service-pages";
import { metegxeiritikiApokatastasiPage } from "@/content/service-pages/metegxeiritiki-apokatastasi";

export const metadata: Metadata = buildServiceMetadata(metegxeiritikiApokatastasiPage);

export default function Page() {
  return <ServicePageTemplate content={metegxeiritikiApokatastasiPage} />;
}
