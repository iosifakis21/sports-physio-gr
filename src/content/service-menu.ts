import { servicePages, servicePageHref } from "./service-pages";
import servicesData from "./services.json";

/** Ένα στοιχείο του mega menu «Υπηρεσίες» στο header. */
export interface ServiceMenuItem {
  slug: string;
  /** Σύντομος τίτλος (ίδιος με τις κάρτες της αρχικής). */
  title: string;
  /** Η φωτογραφία hero της σελίδας υπηρεσίας — ξαναχρησιμοποιείται στο menu. */
  photo: string;
  href: string;
}

/**
 * Οι 6 υπηρεσίες για το menu πλοήγησης: σύντομος τίτλος από το
 * `services.json` (ίδιος με τις κάρτες) και η ήδη υπάρχουσα εικόνα hero
 * της αντίστοιχης σελίδας — δεν προστίθενται νέα assets.
 */
export const serviceMenuItems: ServiceMenuItem[] = servicePages.map((page) => ({
  slug: page.slug,
  title:
    servicesData.find((service) => service.id === page.serviceId)?.title ??
    page.hero.title,
  photo: page.hero.photo,
  href: servicePageHref(page.slug),
}));
