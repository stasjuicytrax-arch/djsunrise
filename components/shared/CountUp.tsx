"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  /** Final number. */
  value: number;
  /** Start value. Ranks count down from 100, counters up from 0. */
  from?: number;
  /** Text before the number, e.g. "#". */
  prefix?: string;
  /** `rank` = white with a faint sun glow (Rank-LED), `counter` = solid dawn. */
  tone?: "rank" | "counter";
  /** Seconds. */
  duration?: number;
  /** Seconds before the count starts. */
  delay?: number;
  className?: string;
};

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

/**
 * Plain Outfit numerals that count when they enter the screen and clear
 * out of a 12px blur. Reduced motion renders the final number at once.
 * The final value is in the markup, so no-JS and crawlers see it too.
 */
export function CountUp({
  value,
  from = 0,
  prefix = "",
  tone = "counter",
  duration = 1.2,
  delay = 0,
  className,
}: Props) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const numRef = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  // Park at the start state before the number is seen.
  React.useLayoutEffect(() => {
    if (reduce) return;
    if (numRef.current) numRef.current.textContent = fmt(from);
    if (ref.current) ref.current.style.filter = "blur(12px)";
  }, [reduce, from]);

  React.useEffect(() => {
    if (reduce || !inView) return;
    const el = ref.current;
    const num = numRef.current;
    if (!el || !num) return;
    const counter = animate(from, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        num.textContent = fmt(v);
      },
      onComplete: () => {
        num.textContent = fmt(value);
      },
    });
    const blur = animate(12, 0, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.style.filter = v > 0.05 ? `blur(${v}px)` : "none";
      },
      onComplete: () => {
        el.style.filter = "none";
      },
    });
    return () => {
      counter.stop();
      blur.stop();
    };
  }, [inView, reduce, from, value, duration, delay]);

  return (
    <span
      ref={ref}
      className={cn(
        "tabular block font-display font-semibold leading-[0.82] tracking-[-0.04em] [font-variant-numeric:tabular-nums]",
        tone === "rank"
          ? "text-white [text-shadow:0_0_28px_color-mix(in_srgb,var(--sun-400)_55%,transparent)]"
          : "text-dawn-400",
        className,
      )}
    >
      {prefix}
      <span ref={numRef}>{fmt(value)}</span>
    </span>
  );
}
