import * as React from "react";
import { cn } from "@/lib/utils";
import "./airport.css";

type Props = {
  text?: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * The SUNRISE name as airport lights: dim letters, a flame runs along them
 * (CSS only, transform-free), and now and then the whole word blinks twice.
 * Speed follows --airport-step / --airport-lap, which a parent can raise on
 * hover. Reduced motion: all letters burn steady dawn-400.
 */
export function GiantWordmark({ text = "SUNRISE", className, style }: Props) {
  const letters = [...text];
  return (
    <span
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
          style={{ "--i": i } as React.CSSProperties}
        >
          {ch}
        </span>
      ))}
      <span aria-hidden className="airport-blink">
        {text}
      </span>
    </span>
  );
}
