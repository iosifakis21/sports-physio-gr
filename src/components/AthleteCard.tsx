import React from "react";

export interface Athlete {
  id: string;
  name: string;
  nickname?: string;
  sport: string;
  accomplishment: string;
  photo?: string;
  priority: number;
  consent: boolean;
}

interface AthleteCardProps {
  athlete: Athlete;
}

export const AthleteCard: React.FC<AthleteCardProps> = ({ athlete }) => {
  return (
    <div
      tabIndex={0}
      className="flex-shrink-0 w-[280px] sm:w-[320px] bg-slate-900 border border-white/10 rounded-card overflow-hidden flex flex-col focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary select-none group cursor-pointer transition-all duration-200 hover:border-primary/40 snap-start"
      aria-label={`Αθλητής: ${athlete.name}. ${athlete.sport}, ${athlete.accomplishment}`}
    >
      {/* Photo Container with Blue Duotone Overlay */}
      <div className="relative h-[220px] sm:h-[260px] w-full bg-slate-800 flex items-center justify-center overflow-hidden">
        
        {/* Grey background placeholder */}
        <div className="absolute inset-0 bg-slate-700 flex items-center justify-center text-white/30" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-16 h-16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>

        {/* CSS Blue Duotone Overlay: Black/White + Blue blend layers */}
        <div className="absolute inset-0 bg-blue-700/35 mix-blend-color group-hover:bg-blue-600/40 transition-colors duration-200" aria-hidden="true" />
        <div className="absolute inset-0 bg-indigo-950/40 mix-blend-multiply" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" aria-hidden="true" />

        {/* Priority Badge */}
        <div className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full z-20 select-none shadow">
          {athlete.sport.split(" ")[0]}
        </div>
      </div>

      {/* Athlete Information */}
      <div className="p-5 flex flex-col gap-2 flex-grow">
        <h3 className="font-display font-bold text-base md:text-lg text-white leading-tight flex flex-wrap items-center gap-1.5">
          {athlete.name}
          {athlete.nickname && (
            <span className="text-primary text-xs sm:text-sm font-normal">
              "{athlete.nickname}"
            </span>
          )}
        </h3>

        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-sans">
          {athlete.sport}
        </span>

        <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mt-1 flex-grow">
          {athlete.accomplishment}
        </p>
      </div>
    </div>
  );
};
