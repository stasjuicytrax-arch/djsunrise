"use client";

import * as React from "react";
import { prefersReducedMotion } from "@/lib/motion";

const SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Split-flap text: when it enters the screen the characters flick through
 * random symbols and settle left to right (60 ms row stagger, under 1.5 s).
 * The final text is in the markup; reduced motion leaves it alone.
 */
export function FlapText({
  text,
  delay = 0,
  className,
}: {
  text: string;
  /** ms before this row starts. */
  delay?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started) return;
        started = true;
        io.disconnect();
        const chars = [...text];
        const t0 = performance.now() + delay;
        const settle = (i: number) => 240 + Math.min(i, 12) * 55; // ms after the row starts
        // hold the final width so scrambling glyphs do not shift the row
        el.style.display = "inline-block";
        el.style.minWidth = `${el.offsetWidth}px`;
        const tick = (now: number) => {
          const t = now - t0;
          if (t < 0) {
            raf = requestAnimationFrame(tick);
            return;
          }
          let done = true;
          const out = chars.map((c, i) => {
            if (c === " " || t >= settle(i)) return c;
            done = false;
            return SET[Math.floor(Math.random() * SET.length)];
          });
          el.textContent = out.join("");
          if (done) {
            el.textContent = text;
            el.style.minWidth = "";
            el.style.display = "";
          } else raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = text;
      el.style.minWidth = "";
      el.style.display = "";
    };
  }, [text, delay]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
