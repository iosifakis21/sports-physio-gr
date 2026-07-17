import { Hero } from "@/sections/Hero";
import { InsuranceMarquee } from "@/sections/InsuranceMarquee";
import { Services } from "@/sections/Services";
import { Conditions } from "@/sections/Conditions";
import { Process } from "@/sections/Process";
import { About } from "@/sections/About";
import { Athletes } from "@/sections/Athletes";
import { Reviews } from "@/sections/Reviews";
import { FAQ } from "@/sections/FAQ";
import { Booking } from "@/sections/Booking";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full relative">
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
