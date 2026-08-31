"use client";

import Link from "next/link";
import React from "react";
import { calPopupAttributes } from "@/lib/cal";

interface ButtonProps {
  children?: React.ReactNode;
  label?: string;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: React.ReactNode;
  /**
   * Opens the Cal.com booking popup on click instead of navigating to the
   * inline calendar. `href` is then only used as a no-script fallback.
   */
  calPopup?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  label,
  variant = "primary",
  href,
  onClick,
  type = "button",
  className = "",
  icon,
  calPopup = false,
}) => {
  const content = (
    <>
      {icon && (
        // Gentle periodic wiggle on the icon only: a brief rotation swing,
        // then a pause, then it repeats — never constant motion. Driven by a
        // CSS keyframe (see --animate-icon-wiggle) so the CTA, which sits in
        // the header and the Hero, ships no animation JS.
        <span
          className="mr-2 inline-flex items-center select-none origin-center animate-icon-wiggle"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span>{children || label}</span>
    </>
  );

  // A font-weight passed via className can't reliably beat the default below:
  // both are plain utilities of equal specificity, so the winner is decided by
  // stylesheet order, not by class order on the element (font-bold loses to
  // font-medium that way). Drop the default when the caller sets its own.
  const hasWeightOverride =
    /(?:^|\s)font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)(?:\s|$)/.test(
      className
    );

  const baseStyles = `inline-flex items-center justify-center font-sans ${
    hasWeightOverride ? "" : "font-medium"
  } rounded-btn text-base transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary min-h-[44px] px-6 py-3 cursor-pointer select-none`;

  const variantStyles =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary-hover hover:-translate-y-[2px] hover:shadow-md"
      : "border border-primary text-primary bg-surface hover:bg-surface-alt hover:-translate-y-[2px] hover:shadow-sm";

  const combinedStyles = `${baseStyles} ${variantStyles} ${className}`;

  // If a primary CTA is used, ensure we enforce strictly the allowed labels
  const textCheck = typeof label === "string" ? label : typeof children === "string" ? children : "";
  if (
    variant === "primary" &&
    textCheck &&
    (textCheck.toLowerCase().includes("ραντεβού") || textCheck.toLowerCase().includes("book") || textCheck.toLowerCase().includes("appointment")) &&
    textCheck !== "Κλείστε Ραντεβού"
  ) {
    console.warn(`WARNING: Primary CTA label "${textCheck}" violates branding rules. It must strictly be "Κλείστε Ραντεβού".`);
  }

  // Cal.com's embed script listens for clicks on any element carrying
  // data-cal-link and opens the modal — but it does NOT preventDefault, so a
  // real <a href="#kleiste-rantevou"> would open the popup *and* jump the page
  // behind it. Render a plain <button> instead and keep `href` purely as a
  // fallback: if the embed script never loaded, window.Cal is undefined at
  // click time and we navigate to the inline calendar as before.
  if (calPopup) {
    return (
      <button
        type={type}
        className={combinedStyles}
        {...calPopupAttributes}
        onClick={() => {
          onClick?.();
          const calLoaded =
            typeof window !== "undefined" &&
            (window as unknown as { Cal?: unknown }).Cal !== undefined;
          if (!calLoaded && href) {
            window.location.href = href;
          }
        }}
      >
        {content}
      </button>
    );
  }

  if (href) {
    if (href.startsWith("#")) {
      return (
        <a href={href} className={combinedStyles} onClick={onClick}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedStyles} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedStyles} onClick={onClick}>
      {content}
    </button>
  );
};
