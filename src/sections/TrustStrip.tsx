import React from "react";

export const TrustStrip: React.FC = () => {
  const trustItems = [
    { text: "Συμβεβλημένος με ΕΟΠΥΥ", icon: "🤝" },
    { text: "Αποδεκτές όλες οι ιδιωτικές ασφαλιστικές", icon: "🛡️" },
    { text: "10+ χρόνια εμπειρίας", icon: "⭐" },
    { text: "73 αξιολογήσεις Google — όλες 5 αστέρια", icon: "💬" },
  ];

  return (
    <section className="bg-surface-alt border-y border-ink-900/5 py-5 md:py-6 w-full select-none">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 text-center">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 text-ink-900 font-sans font-medium text-sm md:text-base"
            >
              <span className="text-xl md:text-2xl" aria-hidden="true">
                {item.icon}
              </span>
              <span className="text-center sm:text-left leading-tight">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
