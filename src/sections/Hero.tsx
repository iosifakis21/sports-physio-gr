import React from "react";
import { Button } from "@/components/Button";
import { CheckItem } from "@/components/CheckItem";
import { RatingBadge } from "@/components/RatingBadge";

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden min-h-[500px] lg:min-h-[600px] flex items-center py-10 md:py-20 z-10">
      {/* Background Gradient & Placeholder Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950 z-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-black/50 z-0" aria-hidden="true" /> {/* 50% overlay */}

      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-8 relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
        {/* Left column - Text, Checklist, and CTA */}
        <div className="w-full lg:max-w-[62%] flex flex-col gap-4 md:gap-6 text-left">
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-display leading-tight text-white tracking-tight">
            Εξειδικευμένη Φυσικοθεραπεία για Πόνους, Τραυματισμούς και Αποκατάσταση.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-sans leading-relaxed max-w-xl">
            Εξειδικευμένη θεραπεία για οσφυαλγία, αυχενικό σύνδρομο, τενοντίτιδες, αθλητικές κακώσεις και μετεγχειρητική αποκατάσταση με στόχο την πλήρη επανένταξη στις καθημερινές σας δραστηριότητες.
          </p>

          {/* 4 Trust Checkmarks (Styled with cascading white text color) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3.5 text-slate-200 my-2 [&_span]:!text-slate-200">
            <CheckItem text="10+ χρόνια εμπειρίας στην αθλητική φυσικοθεραπεία" />
            <CheckItem text="Συμβεβλημένος με τον ΕΟΠΥΥ" />
            <CheckItem text="Δεκτές όλες οι ιδιωτικές ασφαλιστικές" />
            <CheckItem text="Κράτηση σε λιγότερο από 1 λεπτό" />
          </div>
          
          {/* Action Button & Rating Badge on Mobile/Tablet */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-start xl:items-center gap-4 mt-2">
            <Button
              variant="primary"
              label="Κλείστε Ραντεβού"
              href="#kleiste-rantevou"
              icon={
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
              }
            />
            {/* Rating Badge shown below/alongside CTA on mobile and tablet */}
            <RatingBadge className="lg:hidden" />
          </div>
        </div>

        {/* Right column - Floating Rating Badge on Desktop */}
        <div className="hidden lg:flex items-center justify-center flex-shrink-0">
          <RatingBadge />
        </div>
      </div>
    </section>
  );
};
