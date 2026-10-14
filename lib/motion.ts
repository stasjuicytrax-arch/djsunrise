"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

/**
 * Motion core: one place that registers GSAP plugins, knows about reduced
 * motion, and holds the shared Lenis instance (set by SmoothScroll).
 * Tokens mirror DESIGN-SYSTEM section 8.2.
 */

let registered = false;
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export const EASE_OUT = "expo.out"; // close to --ease-out cubic-bezier(.16,1,.3,1)
export const DUR = { fast: 0.24, base: 0.42, slow: 0.72, hero: 2.4 } as const;

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenis = l;
};
export const getLenis = () => lenis;

export { gsap, ScrollTrigger };
