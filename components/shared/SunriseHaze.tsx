"use client";

import * as React from "react";
import VelvetHaze, { type HazeParams } from "@/components/ui/velvet-haze";

/**
 * Velvet Haze (21st.dev) painted with the SUNRISE ember palette. Used as the
 * Contact background: it is the section root, its height follows the content,
 * and interactive children opt back in with `pointer-events-auto`.
 */
const EMBER: Partial<HazeParams> = {
  inkColor: "#0A0909", // --ink-950
  shadowColor: "#060506",
  emberColor: "#8F1719", // --sun-700
  violetColor: "#DD2C05", // --dawn-600
  lavenderColor: "#FE6C04", // --dawn-400
  silverColor: "#F2EFEE", // --bone-100
  exposure: 0.85, // keeps the silver haze from washing out contact text
  bloom: 1.1,
  ember: 1,
};

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export function SunriseHaze({ children, className }: Props) {
  // Grain is per pixel: cap the render scale on phones.
  const [maxDpr, setMaxDpr] = React.useState(1.5);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setMaxDpr(mq.matches ? 2 : 1.5);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <VelvetHaze
      height="auto"
      preset="ember"
      params={EMBER}
      maxDpr={maxDpr}
      className={className}
    >
      {children}
    </VelvetHaze>
  );
}
