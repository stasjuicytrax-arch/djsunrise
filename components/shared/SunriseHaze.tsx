"use client";

import * as React from "react";
import VelvetHaze, { type HazeParams } from "@/components/ui/velvet-haze";

/**
 * Velvet Haze (21st.dev) painted as a sunset: only warm, dark colors, no pale
 * fog. The canvas is flipped vertically (see .haze-up in globals.css) so the
 * light rises from the bottom and the top of the section stays almost black.
 */
const SUNSET: Partial<HazeParams> = {
  inkColor: "#0A0909", // --ink-950
  shadowColor: "#060506",
  silverColor: "#8F1719", // --sun-700, the brightest the haze may get
  lavenderColor: "#DD2C05", // --dawn-600
  violetColor: "#FE6C04", // --dawn-400
  emberColor: "#3A0A0B",
  exposure: 0.55,
  bloom: 0.9,
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
      params={SUNSET}
      maxDpr={maxDpr}
      interactive={false}
      className={`haze-up ${className ?? ""}`}
    >
      {children}
    </VelvetHaze>
  );
}
