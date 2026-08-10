"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/Button";
import { ServicesMegaMenu } from "@/components/ServicesMegaMenu";
import { servicePages, servicePageHref } from "@/content/service-pages";

interface NavLinkItem {
  label: string;
  /** Id of the homepage section this link scrolls to. */
  anchor: string;
}

/** The anchor whose nav item opens the services dropdown instead of only scrolling. */
const SERVICES_ANCHOR = "ypiresies";

/** Shared by every desktop nav item, including the services dropdown trigger. */
const desktopLinkClass =
  "font-sans font-medium text-ink-600 hover:text-primary-link text-sm transition-colors duration-200 focus:outline focus:outline-2 focus:outline-primary rounded p-1";

const navLinks: NavLinkItem[] = [
  { label: "Υπηρεσίες", anchor: "ypiresies" },
  { label: "Φυσικοθεραπεία", anchor: "fysikotherapeia" },
  { label: "Διαδικασία", anchor: "diadikasia" },
  { label: "Γνωρίστε με", anchor: "gnoriste-me" },
  { label: "Αξιολογήσεις", anchor: "axiologiseis" },
  { label: "FAQ", anchor: "faq" },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Every nav target lives on the homepage. On the homepage a bare hash scrolls
  // in place; anywhere else (e.g. a /ypiresies/... page) the link has to route
  // back to "/" first, so it needs the leading slash.
  const anchorHref = (anchor: string) => (isHomePage ? `#${anchor}` : `/#${anchor}`);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll for visual states
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle body scroll locking and keyboard listeners for accessibilty
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";

      // Focus trap setup
      const focusableElementsString =
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';
      const menuEl = menuRef.current;
      if (!menuEl) return;

      // Recomputed on every Tab rather than once on open: the services
      // accordion adds and removes tabbable links while the drawer is open.
      // The collapsed accordion keeps its links in the DOM but out of the tab
      // order (tabindex="-1"), so they must not count as a stop either.
      const getFocusableElements = () =>
        Array.from(menuEl.querySelectorAll<HTMLElement>(focusableElementsString)).filter(
          (el) => el.getAttribute("tabindex") !== "-1"
        );

      // Automatically focus first item
      getFocusableElements()[0]?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMenuOpen(false);
          hamburgerRef.current?.focus();
        }

        if (e.key === "Tab") {
          const focusableElements = getFocusableElements();
          const firstFocusableEl = focusableElements[0];
          const lastFocusableEl = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusableEl) {
              lastFocusableEl?.focus();
              e.preventDefault();
            }
          } else {
            // Tab
            if (document.activeElement === lastFocusableEl) {
              firstFocusableEl?.focus();
              e.preventDefault();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isMenuOpen]);

  // The accordion always starts collapsed the next time the drawer opens.
  useEffect(() => {
    if (!isMenuOpen) setIsServicesOpen(false);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full h-[80px] flex items-center justify-between px-4 md:px-8 border-b ${
          isScrolled
            ? "bg-surface/95 backdrop-blur-md border-ink-900/10 shadow-md h-[72px]"
            : "bg-surface border-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto w-full flex items-center justify-between">
          {/* Logo Mark */}
          <a href={isHomePage ? "#" : "/"} className="flex items-center gap-2 group focus:outline focus:outline-2 focus:outline-primary rounded-md p-1" aria-label="Αρχική σελίδα Sports Physio">
            <Image src="/images/logonobg.png" alt="Sports-Physio.gr — Μιχάλης Σιούλης" width={220} height={148} priority className="h-12 md:h-14 w-auto group-hover:scale-[1.03] transition-transform duration-200" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Κύριο Μενού Πλοήγησης">
            {navLinks.map((link) =>
              link.anchor === SERVICES_ANCHOR ? (
                <ServicesMegaMenu
                  key={link.anchor}
                  href={anchorHref(link.anchor)}
                  label={link.label}
                  triggerClassName={desktopLinkClass}
                />
              ) : (
                <a
                  key={link.anchor}
                  href={anchorHref(link.anchor)}
                  className={desktopLinkClass}
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Header Primary CTA (Desktop and Tablet) */}
            <Button
              href={anchorHref("kleiste-rantevou")}
              variant="primary"
              label="Κλείστε Ραντεβού"
              className="!hidden sm:!inline-flex"
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

            {/* Mobile Menu Toggle button */}
            <button
              ref={hamburgerRef}
              onClick={toggleMenu}
              type="button"
              className="lg:hidden p-2 text-ink-900 hover:text-primary transition-colors focus:outline focus:outline-2 focus:outline-primary rounded-md cursor-pointer"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={isMenuOpen ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink-900/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer (Left/Right drawer or Full-screen modal) */}
      <div
        id="mobile-navigation-drawer"
        ref={menuRef}
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-[300px] bg-surface shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Μενού πλοήγησης κινητού"
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col gap-8">
          {/* Drawer Header */}
          <div className="flex items-center justify-between">
            <span className="font-display font-extrabold text-lg text-ink-900">
              Πλοήγηση
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-1 text-ink-600 hover:text-ink-900 focus:outline focus:outline-2 focus:outline-primary rounded-md cursor-pointer"
              aria-label="Κλείσιμο μενού"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="flex flex-col gap-4" aria-label="Σύνδεσμοι κινητού">
            {navLinks.map((link) =>
              link.anchor === SERVICES_ANCHOR ? (
                <div key={link.anchor} className="border-b border-ink-900/5">
                  <button
                    type="button"
                    onClick={() => setIsServicesOpen((open) => !open)}
                    aria-expanded={isServicesOpen}
                    aria-controls="mobile-services-submenu"
                    className={`w-full flex items-center justify-between gap-2 font-sans font-semibold text-lg p-2 transition-colors focus:outline focus:outline-2 focus:outline-primary rounded cursor-pointer ${
                      isServicesOpen ? "text-primary" : "text-ink-900 hover:text-primary"
                    }`}
                  >
                    {link.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 shrink-0"
                      aria-hidden="true"
                    >
                      {/* "+" collapsed / "−" expanded */}
                      <path strokeLinecap="round" d="M4 12h16" />
                      {!isServicesOpen && <path strokeLinecap="round" d="M12 4v16" />}
                    </svg>
                  </button>

                  <div
                    id="mobile-services-submenu"
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isServicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="flex flex-col pb-2">
                        {servicePages.map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={servicePageHref(service.slug)}
                              onClick={() => setIsMenuOpen(false)}
                              tabIndex={isServicesOpen ? undefined : -1}
                              className="block font-sans text-base text-ink-600 hover:text-primary py-2 pl-4 pr-2 transition-colors focus:outline focus:outline-2 focus:outline-primary rounded"
                            >
                              {service.hero.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.anchor}
                  href={anchorHref(link.anchor)}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-sans font-semibold text-lg text-ink-900 hover:text-primary p-2 border-b border-ink-900/5 transition-colors focus:outline focus:outline-2 focus:outline-primary rounded"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>
        </div>

        {/* Drawer Footer / CTA */}
        <div className="flex flex-col gap-4 mt-8">
          <Button
            href={anchorHref("kleiste-rantevou")}
            variant="primary"
            label="Κλείστε Ραντεβού"
            onClick={() => setIsMenuOpen(false)}
            className="w-full"
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
        </div>
      </div>
    </>
  );
};
