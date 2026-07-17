"use client";

import Link from "next/link";
import React from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ButtonProps {
  children?: React.ReactNode;
  label?: string;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: React.ReactNode;
}

const MotionLink = motion.create(Link);

export const Button: React.FC<ButtonProps> = ({
  children,
  label,
  variant = "primary",
  href,
  onClick,
  type = "button",
  className = "",
  icon,
}) => {
  const reduced = usePrefersReducedMotion();

  // Gentle periodic wiggle on the icon only: a brief rotation swing, then a
  // pause, then it repeats — never a constant motion. Fully disabled under
  // prefers-reduced-motion, explicitly pinned back to rotate:0 (rather than
  // just omitting animate props) so a mid-swing value never freezes in place
  // if reduced-motion is detected partway through a cycle. Runs independently
  // of the button's own whileHover/whileTap scale below, so both compose
  // without conflict.
  const iconWiggleProps = reduced
    ? { animate: { rotate: 0 }, transition: { duration: 0 } }
    : {
        animate: { rotate: [0, -8, 8, -8, 0] },
        transition: {
          duration: 0.6,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut" as const,
        },
      };

  const content = (
    <>
      {icon && (
        <motion.span
          className="mr-2 inline-flex items-center select-none"
          style={{ transformOrigin: "50% 50%" }}
          aria-hidden="true"
          {...iconWiggleProps}
        >
          {icon}
        </motion.span>
      )}
      <span>{children || label}</span>
    </>
  );

  const baseStyles =
    "inline-flex items-center justify-center font-sans font-medium rounded-btn text-base transition-all duration-200 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary min-h-[44px] px-6 py-3 cursor-pointer select-none";

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

  // Spring-based scale on hover/tap, layered on top of the existing CSS hover
  // lift + shadow. Motion animates `scale` via the `transform` property; the
  // Tailwind hover lift uses the independent `translate` property, so the two
  // compose without conflict (no double lift). When reduced motion is preferred
  // we pass no motion props, leaving only the (instant) CSS hover styling.
  const motionProps = reduced
    ? {}
    : {
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.98 },
        transition: { type: "spring" as const, stiffness: 400, damping: 17 },
      };

  if (href) {
    if (href.startsWith("#")) {
      return (
        <motion.a href={href} className={combinedStyles} onClick={onClick} {...motionProps}>
          {content}
        </motion.a>
      );
    }
    return (
      <MotionLink href={href} className={combinedStyles} onClick={onClick} {...motionProps}>
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button type={type} className={combinedStyles} onClick={onClick} {...motionProps}>
      {content}
    </motion.button>
  );
};
