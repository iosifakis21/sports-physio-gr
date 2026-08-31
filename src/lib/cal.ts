"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

/** Shared Cal.com identifiers — used by both the inline embed (Booking
 *  section) and the popup triggers on every "Κλείστε Ραντεβού" CTA. */
export const CAL_NAMESPACE = "ραντεβου-φυσικοθεραπειας";
export const CAL_LINK = "sports-physio-nxqxxx/ραντεβου-φυσικοθεραπειας";

/** Attributes Cal.com's embed script looks for on a clicked element to open
 *  the booking modal. Spread onto any clickable element. */
export const calPopupAttributes = {
  "data-cal-namespace": CAL_NAMESPACE,
  "data-cal-link": CAL_LINK,
  "data-cal-config": '{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}',
} as const;

let initPromise: Promise<void> | null = null;

/** Configures the namespace exactly once per page load, no matter how many
 *  CTAs or embeds ask for it — repeated `cal("ui", …)` calls on the same
 *  namespace would otherwise re-send the config to the iframe. */
export function initCal(): Promise<void> {
  if (!initPromise) {
    initPromise = (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#1D4ED8" },
          dark: { "cal-brand": "#1D4ED8" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }
  return initPromise;
}

export function useCalInit() {
  useEffect(() => {
    void initCal();
  }, []);
}
