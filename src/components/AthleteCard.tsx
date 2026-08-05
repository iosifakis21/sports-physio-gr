"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface Athlete {
  id: string;
  name: string;
  nickname?: string;
  sport: string;
  accomplishment: string;
  photo?: string;
  /** Optional second photo, crossfaded in while the card is hovered (pointer)
      or tapped (touch). Athletes without it keep a single static photo. */
  hoverPhoto?: string;
  /** Optional clip played inline, with sound, after an explicit click/tap.
      Mutually exclusive with hoverPhoto: an athlete has one or the other. */
  hoverVideo?: string;
  priority: number;
  consent: boolean;
}

interface AthleteCardProps {
  athlete: Athlete;
  /** Id of the athlete whose clip is currently playing, if any. Lifted to the
      row so starting one card's video stops whichever was playing before. */
  playingId?: string | null;
  onPlayingChange?: (id: string | null) => void;
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 ml-0.5" aria-hidden="true">
    <path d="M8 5.14v13.72a.5.5 0 00.76.43l11.1-6.86a.5.5 0 000-.86L8.76 4.71a.5.5 0 00-.76.43z" />
  </svg>
);

const StopIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M8 5.5h2.5v13H8zM13.5 5.5H16v13h-2.5z" />
  </svg>
);

export const AthleteCard: React.FC<AthleteCardProps> = ({
  athlete,
  playingId = null,
  onPlayingChange,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showHoverPhoto, setShowHoverPhoto] = useState(false);

  // Consent gate: the alternate media is subject to the same rule as the
  // primary photo — it never renders for an athlete without consent.
  const consented = athlete.consent === true;
  const hoverPhoto = consented ? athlete.hoverPhoto : undefined;
  const hoverVideo = consented ? athlete.hoverVideo : undefined;

  const isPlaying = hoverVideo != null && playingId === athlete.id;

  // Touch: a tap swaps the photo and it stays swapped until the user taps
  // somewhere else (another card, or anywhere outside this one). Reverting on
  // touchend would make the swap invisible on a phone, since the finger lifts
  // almost immediately.
  useEffect(() => {
    if (!hoverPhoto || !showHoverPhoto) return;
    const onTouchElsewhere = (event: TouchEvent) => {
      const target = event.target;
      if (target instanceof Node && cardRef.current?.contains(target)) return;
      setShowHoverPhoto(false);
    };
    document.addEventListener("touchstart", onTouchElsewhere);
    return () => document.removeEventListener("touchstart", onTouchElsewhere);
  }, [hoverPhoto, showHoverPhoto]);

  // Another card took over (or the row cleared the selection): rewind this one
  // so the next click starts from the beginning rather than mid-clip.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isPlaying) return;
    if (!video.paused) video.pause();
    if (video.currentTime !== 0) video.currentTime = 0;
  }, [isPlaying]);

  // play() has to be called synchronously inside the click handler, on the
  // element itself: routing it through a state update first would break the
  // user-gesture chain that lets the clip start unmuted.
  const handlePlay = (event: React.MouseEvent) => {
    // The card sits inside a horizontal scroller with its own arrow controls;
    // playing a clip must never read as a navigation click.
    event.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.muted = false;
    video.volume = 1;
    const started = video.play();
    onPlayingChange?.(athlete.id);
    // If the browser still refuses unmuted playback, fall back to the photo
    // rather than leaving a stalled black frame in the card.
    started?.catch(() => onPlayingChange?.(null));
  };

  const handleStop = (event: React.MouseEvent) => {
    event.stopPropagation();
    videoRef.current?.pause();
    onPlayingChange?.(null);
  };

  // Pointer handlers are only attached when there is something to swap to, so
  // cards without a hoverPhoto behave exactly as before.
  const swapHandlers = hoverPhoto
    ? {
        onMouseEnter: () => setShowHoverPhoto(true),
        onMouseLeave: () => setShowHoverPhoto(false),
        onTouchStart: () => setShowHoverPhoto(true),
      }
    : undefined;

  return (
    <div
      ref={cardRef}
      {...swapHandlers}
      tabIndex={0}
      className="flex-shrink-0 w-[280px] sm:w-[320px] h-[420px] sm:h-[520px] bg-slate-900 border border-white/10 rounded-card overflow-hidden flex flex-col focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary select-none group/card cursor-pointer transition-all duration-200 hover:border-primary/40"
      aria-label={`Αθλητής: ${athlete.name}. ${athlete.sport}, ${athlete.accomplishment}`}
    >
      {/* Photo Container */}
      <div className="relative h-[220px] sm:h-[260px] w-full bg-slate-800 flex items-center justify-center overflow-hidden">

        {/* Fallback placeholder (shown only when no photo is set) */}
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

        {/* Athlete Photo */}
        {athlete.photo && (
          <Image
            src={athlete.photo}
            alt={athlete.name}
            fill
            sizes="(max-width: 640px) 280px, 320px"
            className={`object-cover transition-opacity duration-300 ease-out ${
              athlete.id === "pilidis" ? "[object-position:center_15%]" : "object-top"
            } ${hoverPhoto && showHoverPhoto ? "opacity-0" : "opacity-100"}`}
          />
        )}

        {/* Alternate photo — crossfaded in on hover (pointer) or tap (touch). */}
        {hoverPhoto && (
          <Image
            src={hoverPhoto}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 640px) 280px, 320px"
            className={`object-cover transition-opacity duration-300 ease-out ${
              athlete.id === "kiatipis" ? "[object-position:center_5%]" : "object-top"
            } ${showHoverPhoto ? "opacity-100" : "opacity-0"}`}
          />
        )}

        {/* Inline clip. preload="none" keeps it at zero bytes until the user
            actually asks for it; the poster is the photo already on screen, so
            the swap to video is seamless while the first frames buffer.
            loop is off on purpose: these are short highlight clips, so they
            play once and hand the card back to the static photo.
            object-position shifted down (center 35%) to keep faces visible
            instead of cropping them out at the top. */}
        {hoverVideo && (
          <video
            ref={videoRef}
            src={hoverVideo}
            poster={athlete.photo}
            preload="none"
            playsInline
            loop={false}
            controls={false}
            onEnded={() => onPlayingChange?.(null)}
            onPause={() => {
              // Only the card that owns the current selection may clear it —
              // otherwise the pause we trigger when another card takes over
              // would cancel that other card immediately.
              if (playingId === athlete.id) onPlayingChange?.(null);
            }}
            className={`absolute inset-0 w-full h-full object-cover [object-position:center_35%] z-10 transition-opacity duration-200 ${
              isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        )}

        {/* Bottom fade for text/badge legibility only — no color tint on the photo. */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-20" aria-hidden="true" />

        {/* Priority Badge */}
        <div className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full z-30 select-none shadow">
          {athlete.sport.split(" ")[0]}
        </div>

        {/* Click/tap target for the clip. It covers the whole photo, so the
            visible play glyph is a hint rather than the only hit area; on
            pointer devices the glyph fades in on hover, on touch (no hover) it
            stays visible so the card reads as playable. */}
        {hoverVideo && !isPlaying && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Αναπαραγωγή βίντεο με ήχο: ${athlete.name}`}
            className="absolute inset-0 z-40 flex items-center justify-center cursor-pointer focus:outline focus:outline-2 focus:outline-offset-[-4px] focus:outline-primary"
          >
            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/90 text-white shadow-lg ring-2 ring-white/60 backdrop-blur-sm transition-all duration-200 opacity-100 scale-100 md:opacity-0 md:scale-90 md:group-hover/card:opacity-100 md:group-hover/card:scale-100 md:group-focus-within/card:opacity-100 md:group-focus-within/card:scale-100">
              <PlayIcon />
            </span>
          </button>
        )}

        {/* Stop control — reverts the card to its static photo. */}
        {hoverVideo && isPlaying && (
          <button
            type="button"
            onClick={handleStop}
            aria-label={`Διακοπή βίντεο: ${athlete.name}`}
            className="absolute top-3 right-3 z-40 flex items-center justify-center w-9 h-9 rounded-full bg-slate-950/75 text-white ring-1 ring-white/25 hover:bg-slate-950 transition-colors cursor-pointer focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          >
            <StopIcon />
          </button>
        )}
      </div>

      {/* Athlete Information — the card has a fixed total height (h-[420px] mobile,
          h-[520px] desktop), image is fixed height (220/260px), and this text
          container fills the remaining space with flex-grow. All cards now have
          identical height, and shorter accomplishment text leaves empty space
          rather than shrinking the card. line-clamp-4 truncates longer text. */}
      <div className="p-5 flex flex-col gap-2 flex-grow overflow-hidden">
        <h3 className="font-display font-bold text-base md:text-lg text-white leading-tight flex flex-wrap items-center gap-1.5 flex-shrink-0">
          {athlete.name}
          {athlete.nickname && (
            <span className="text-primary text-xs sm:text-sm font-normal">
              "{athlete.nickname}"
            </span>
          )}
        </h3>

        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-sans flex-shrink-0">
          {athlete.sport}
        </span>

        <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mt-1 flex-grow line-clamp-4">
          {athlete.accomplishment}
        </p>
      </div>
    </div>
  );
};
