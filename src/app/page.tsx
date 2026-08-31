import dynamic from "next/dynamic";
import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { Conditions } from "@/sections/Conditions";
import { Process } from "@/sections/Process";
import { About } from "@/sections/About";
import { Athletes } from "@/sections/Athletes";
import { FAQ } from "@/sections/FAQ";
import { Booking } from "@/sections/Booking";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { JsonLd } from "@/components/JsonLd";
import { buildHomeGraph } from "@/lib/schema";

// Both sections run an infinite marquee through motion/react and both sit well
// below the fold. Loading them as separate chunks keeps the animation library
// out of the initial payload; they are still server-rendered, so the markup
// (and the SEO/content value) is in the HTML exactly as before.
const InsuranceMarquee = dynamic(() =>
  import("@/sections/InsuranceMarquee").then((m) => m.InsuranceMarquee)
);
const Reviews = dynamic(() => import("@/sections/Reviews").then((m) => m.Reviews));

export default function Home() {
  return (
    <div className="flex flex-col w-full relative">
      {/* Ένα και μοναδικό `@graph` για όλη τη σελίδα: επιχείρηση (με
          aggregateRating και κατάλογο υπηρεσιών), ιστότοπος, θεραπευτής, οι
          υπηρεσίες, οι 9 κριτικές και το FAQ. Βλ. `src/lib/schema.ts`. */}
      <JsonLd data={buildHomeGraph()} />

      <Hero />
      <InsuranceMarquee />
      <Services />
      <Conditions />
      <Process />
      <About />
      <Athletes />
      <Reviews />
      <FAQ />
      <Booking />
      
      {/* Persistent floating CTA on mobile viewports */}
      <StickyMobileCTA />
    </div>
  );
}
