"use client";

import { useCalInit } from "@/lib/cal";

/**
 * Loads and configures the Cal.com embed script once per page load, from the
 * root layout, so the popup CTAs work on every page — including the ones that
 * don't render the inline Booking calendar. Renders nothing.
 */
export const CalInit: React.FC = () => {
  useCalInit();
  return null;
};
