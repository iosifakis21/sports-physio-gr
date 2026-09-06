"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import type { SpringOptions } from "motion/react";

const Tilt = dynamic(() => import("./Tilt").then((m) => m.Tilt));

interface TiltOnDemandProps {
  children: React.ReactNode;
  className?: string;
  rotationFactor?: number;
  scaleFactor?: number;
  shadow?: boolean;
  springOptions?: SpringOptions;
}

/**
 * Φορτώνει το `Tilt` — και μαζί του τη motion/react — μόνο όταν κάποιος
 * πραγματικά πάει να αλληλεπιδράσει με τη φωτογραφία.
 *
 * ΓΙΑΤΙ: το `Tilt` είναι ο τελευταίος καταναλωτής της motion/react σε όλο το
 * site. Ακόμη και μέσω `next/dynamic`, το κομμάτι των 120 KB κατέβαινε σε
 * ΚΑΘΕ φόρτωση της αρχικής κατά την ενυδάτωση — για ένα διακοσμητικό εφέ που
 * οι περισσότεροι επισκέπτες δεν ενεργοποιούν ποτέ, και που στο κινητό δεν
 * υπάρχει καν χωρίς γυροσκόπιο.
 *
 * Σε ηρεμία το `Tilt` ΔΕΝ εφαρμόζει κανέναν μετασχηματισμό: η κλίση
 * εμφανίζεται μόνο καθώς κινείται ο δείκτης. Άρα ένα σκέτο `div` με το ίδιο
 * className είναι οπτικά ταυτόσημο μέχρι την πρώτη επαφή — και από εκεί και
 * πέρα αναλαμβάνει το κανονικό component.
 */
export const TiltOnDemand: React.FC<TiltOnDemandProps> = ({
  children,
  className,
  ...tiltProps
}) => {
  const [activated, setActivated] = useState(false);

  if (activated) {
    return (
      <Tilt className={className} {...tiltProps}>
        {children}
      </Tilt>
    );
  }

  return (
    <div
      className={className}
      // `pointerenter` πιάνει ποντίκι και στυλό· το `touchstart` τις οθόνες
      // αφής, όπου το εφέ οδηγείται από το γυροσκόπιο.
      onPointerEnter={() => setActivated(true)}
      onTouchStart={() => setActivated(true)}
    >
      {children}
    </div>
  );
};
