"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  MotionStyle,
  SpringOptions,
} from "motion/react";

type TiltProps = {
  children: React.ReactNode;
  className?: string;
  style?: MotionStyle;
  rotationFactor?: number;
  isRevese?: boolean;
  springOptions?: SpringOptions;
  /** Scale reached at full tilt (e.g. 1.02). 1 disables the scale-up. */
  scaleFactor?: number;
  /** Soft shadow that intensifies with tilt and resets when flat. */
  shadow?: boolean;
};

// iOS 13+ gates gyroscope data behind an explicit permission request that must
// come from a user gesture; other platforms just start reporting.
type PermissionedDeviceOrientation = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

export function Tilt({
  children,
  className,
  style,
  rotationFactor = 15,
  isRevese = false,
  springOptions,
  scaleFactor = 1,
  shadow = false,
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const gyroActive = useRef(false);
  const permissionRequested = useRef(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, springOptions);
  const ySpring = useSpring(y, springOptions);

  const rotateX = useTransform(
    ySpring,
    [-0.5, 0.5],
    isRevese
      ? [rotationFactor, -rotationFactor]
      : [-rotationFactor, rotationFactor]
  );
  const rotateY = useTransform(
    xSpring,
    [-0.5, 0.5],
    isRevese
      ? [-rotationFactor, rotationFactor]
      : [rotationFactor, -rotationFactor]
  );

  // 0 when flat, 1 at full tilt — drives the scale-up and shadow so both
  // reset cleanly when the interaction ends.
  const intensity = useTransform<number, number>(
    [xSpring, ySpring],
    ([xv, yv]) => Math.min(1, Math.hypot(xv, yv) * 2)
  );
  const scale = useTransform(intensity, [0, 1], [1, scaleFactor]);
  const shadowBlur = useTransform(intensity, [0, 1], [12, 36]);
  const shadowY = useTransform(intensity, [0, 1], [6, 18]);
  const shadowAlpha = useTransform(intensity, [0, 1], [0.08, 0.28]);

  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
  const boxShadow = useMotionTemplate`0 ${shadowY}px ${shadowBlur}px rgba(15, 23, 42, ${shadowAlpha})`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || gyroActive.current) return;

    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    if (gyroActive.current) return;
    x.set(0);
    y.set(0);
  };

  // Gyroscope-driven tilt on touch devices, feeding the same x/y motion
  // values as the mouse path. gamma is left/right tilt; beta is front/back,
  // offset by ~40° because that's roughly how a phone is naturally held.
  const handleOrientation = useRef((e: DeviceOrientationEvent) => {
    if (e.beta === null || e.gamma === null) return;
    const clamp = (v: number) => Math.max(-0.5, Math.min(0.5, v));
    x.set(clamp(e.gamma / 60));
    y.set(clamp((e.beta - 40) / 60));
  });

  const startGyro = () => {
    if (gyroActive.current) return;
    gyroActive.current = true;
    window.addEventListener("deviceorientation", handleOrientation.current);
  };

  useEffect(() => {
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) return;
    const isTouchDevice = !window.matchMedia("(pointer: fine)").matches;
    if (!isTouchDevice) return;

    const DOE = DeviceOrientationEvent as PermissionedDeviceOrientation;
    // Platforms without a permission gate (Android, older iOS) can start
    // listening immediately, no gesture needed. iOS waits for onTouchStart.
    if (typeof DOE.requestPermission !== "function") {
      startGyro();
    }

    const orientationHandler = handleOrientation.current;
    return () => {
      window.removeEventListener("deviceorientation", orientationHandler);
      gyroActive.current = false;
    };
  }, []);

  // iOS permission flow: request on first touch (a valid user gesture). If
  // denied or unavailable, do nothing — the element simply stays static.
  const handleTouchStart = () => {
    if (gyroActive.current || permissionRequested.current) return;
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) return;
    const DOE = DeviceOrientationEvent as PermissionedDeviceOrientation;
    if (typeof DOE.requestPermission !== "function") return;

    permissionRequested.current = true;
    DOE.requestPermission()
      .then((state) => {
        if (state === "granted") startGyro();
      })
      .catch(() => {
        /* denied or unsupported — stay static, no UI */
      });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        ...style,
        transform,
        ...(shadow ? { boxShadow } : {}),
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      {children}
    </motion.div>
  );
}
