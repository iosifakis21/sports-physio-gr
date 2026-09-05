"use client";

import React, { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface TypewriterCycleProps {
  /** Words to cycle through, in order, looping back to the first after the last. */
  words: string[];
  /**
   * The complete real phrase (matching the surrounding sentence, including
   * trailing punctuation) announced to screen readers and present in the DOM
   * for SEO. Sighted users see the animated `words` cycling instead — this
   * text is visually hidden but not aria-hidden, so it's the one and only
   * version assistive tech reads.
   */
  srText: string;
  className?: string;
  /** Allow text to wrap to multiple lines instead of staying on one line (default: false). */
  allowWrap?: boolean;
}

const TYPE_MS = 90;
const DELETE_MS = 45;
const PAUSE_AFTER_TYPED_MS = 1400;
const GAP_BEFORE_NEXT_MS = 300;

/**
 * Typewriter-cycles through `words` (type, pause, delete, next — looping
 * forever) as a purely decorative, aria-hidden visual layered over an
 * invisible ghost of the longest word so the surrounding sentence never
 * reflows. The real sentence (`srText`) is rendered once, visually hidden,
 * for screen readers and SEO — never duplicated into the accessibility tree.
 *
 * Respects prefers-reduced-motion: renders a single static, fully visible
 * ending (last word + period) with no hidden duplicate and no animation.
 */

// Replace space before last word with non-breaking space (U+00A0) to prevent line breaks during mid-phrase typing
const addNonBreakingSpaceBeforeLastWord = (text: string): string => {
  const wordList = text.split(' ');
  if (wordList.length <= 1) return text;
  return wordList.slice(0, -1).join(' ') + '\u00a0' + wordList[wordList.length - 1];
};

export const TypewriterCycle: React.FC<TypewriterCycleProps> = ({
  words,
  srText,
  className = "",
  allowWrap = false,
}) => {
  const reduced = usePrefersReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  // Δεν υπάρχει πλέον `mounted` state.
  //
  // Χρησίμευε μόνο ως φύλακας του effect παρακάτω — αλλά τα effects δεν
  // τρέχουν ποτέ στον server, οπότε η συνθήκη ήταν εξ ορισμού αληθής όποτε
  // έφτανε να ελεγχθεί. Το `setMounted(true)` μέσα σε effect προκαλούσε έναν
  // περιττό κύκλο render σε κάθε mount (`react-hooks/set-state-in-effect`).
  useEffect(() => {
    if (reduced) return;

    const currentWord = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (charCount < currentWord.length) {
        timeout = setTimeout(() => setCharCount((c) => c + 1), TYPE_MS);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPED_MS);
      }
    } else {
      if (charCount > 0) {
        timeout = setTimeout(() => setCharCount((c) => c - 1), DELETE_MS);
      } else {
        timeout = setTimeout(() => {
          setWordIndex((i) => (i + 1) % words.length);
          setPhase("typing");
        }, GAP_BEFORE_NEXT_MS);
      }
    }

    return () => clearTimeout(timeout);
  }, [reduced, phase, charCount, wordIndex, words]);

  // Reduced motion: a single, static, fully visible ending — no hidden
  // duplicate needed since this is the only rendered copy.
  if (reduced) {
    const noWrapClass = allowWrap ? "" : "whitespace-nowrap";
    return (
      <span className={`block ${noWrapClass} ${className}`}>
        {addNonBreakingSpaceBeforeLastWord(words[words.length - 1])}.
      </span>
    );
  }

  const longestWord = words.reduce((a, b) => (b.length > a.length ? b : a), "");
  const processedLongestWord = addNonBreakingSpaceBeforeLastWord(longestWord);

  const currentWord = words[wordIndex];
  const isFullyTyped = charCount === currentWord.length;
  const displayTextRaw = currentWord.slice(0, charCount) + (isFullyTyped ? "." : "");
  const displayText = addNonBreakingSpaceBeforeLastWord(displayTextRaw);

  const noWrapClass = allowWrap ? "" : "whitespace-nowrap";

  return (
    <>
      {/* The one real, complete sentence fragment — read by screen readers,
          present in the DOM/HTML source for SEO. Visually hidden. */}
      <span className="sr-only">{srText}</span>

      {/* Decorative animated cycling word. Hidden from assistive tech so the
          sr-only text above is the only version ever announced. */}
      <span
        className={`relative block ${noWrapClass} ${className}`}
        aria-hidden="true"
      >
        {/* Invisible ghost reserves the width of the longest word (+ period)
            so the surrounding sentence never reflows as shorter/longer words
            type in and out. */}
        <span className="invisible">{processedLongestWord}.</span>
        <span className="absolute inset-0 left-0">
          {displayText}
          <span className="inline-block w-[2px] h-[0.85em] ml-0.5 -mb-[0.05em] bg-current animate-pulse align-middle" />
        </span>
      </span>
    </>
  );
};