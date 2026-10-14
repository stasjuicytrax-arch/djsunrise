"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import "./airport.css";

type Props = {
  text?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Selector of the area whose hover speeds the run up (default: .orbits). */
  speedUpOn?: string;
};

/**
 * The SUNRISE name as airport lights: dim letters, a flame runs along them
 * and now and then the whole word blinks twice. While the pointer is over
 * the orbits the same animations play at 2x (playbackRate, so the phase
 * stays continuous). Reduced motion: all letters burn steady dawn-400.
 */
export function GiantWordmark({ text = "SUNRISE", className, style, speedUpOn = ".orbits" }: Props) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const letters = [...text];

  React.useEffect(() => {
    const el = ref.current;
    const area = el?.closest<HTMLElement>(speedUpOn);
    if (!el || !area || !window.matchMedia("(hover: hover)").matches) return;
    const rate = (r: number) => {
      for (const a of el.getAnimations({ subtree: true })) a.updatePlaybackRate(r);
    };
    const on = () => rate(2);
    const off = () => rate(1);
    area.addEventListener("pointerenter", on);
    area.addEventListener("pointerleave", off);
    return () => {
      area.removeEventListener("pointerenter", on);
      area.removeEventListener("pointerleave", off);
    };
  }, [speedUpOn]);

  return (
    <span
      ref={ref}
      className={cn("airport select-none", className)}
      style={style}
      role="img"
      aria-label={text}
    >
      {letters.map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="airport-letter"
          data-ch={ch}
          style={{ "--i": i } as React.CSSProperties}
        >
          {ch}
        </span>
      ))}
      <span aria-hidden className="airport-blink">
        {letters.map((ch, i) => (
          <span key={i} data-ch={ch}>
            {ch}
          </span>
        ))}
      </span>
    </span>
  );
}
