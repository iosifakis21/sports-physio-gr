"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";

interface NavLinkItem {
  label: string;
  href: string;
}

const navLinks: NavLinkItem[] = [
  { label: "Υπηρεσίες", href: "#ypiresies" },
  { label: "Φυσικοθεραπεία", href: "#fysikotherapeia" },
  { label: "Διαδικασία", href: "#diadikasia" },
  { label: "Γνωρίστε με", href: "#gnoriste-me" },
  { label: "Αξιολογήσεις", href: "#axiologiseis" },
  { label: "FAQ", href: "#faq" },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

      const focusableElements = Array.from(
        menuEl.querySelectorAll<HTMLElement>(focusableElementsString)
      );
      const firstFocusableEl = focusableElements[0];
      const lastFocusableEl = focusableElements[focusableElements.length - 1];

      // Automatically focus first item
      firstFocusableEl?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMenuOpen(false);
          hamburgerRef.current?.focus();
        }

        if (e.key === "Tab") {
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
          <a href="#" className="flex items-center gap-2 group focus:outline focus:outline-2 focus:outline-primary rounded-md p-1" aria-label="Αρχική σελίδα Sports Physio">
            <Image src="/images/logonobg.png" alt="Sports-Physio.gr — Μιχάλης Σιούλης" width={220} height={148} priority className="h-12 md:h-14 w-auto group-hover:scale-[1.03] transition-transform duration-200" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Κύριο Μενού Πλοήγησης">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans font-medium text-ink-600 hover:text-primary-link text-sm transition-colors duration-200 focus:outline focus:outline-2 focus:outline-primary rounded p-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Header Primary CTA (Desktop and Tablet) */}
            <Button
              href="#kleiste-rantevou"
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="font-sans font-semibold text-lg text-ink-900 hover:text-primary p-2 border-b border-ink-900/5 transition-colors focus:outline focus:outline-2 focus:outline-primary rounded"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Drawer Footer / CTA */}
        <div className="flex flex-col gap-4 mt-8">
          <Button
            href="#booking"
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
