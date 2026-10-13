"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  poster: string;
  className?: string;
  /** Fraction of the element that must be visible to play. */
  threshold?: number;
  label?: string;
};

/**
 * Muted looping clip. Plays only while on screen and while the tab is visible;
 * with reduced motion it stays on the poster.
 */
export function LoopVideo({ src, poster, className, threshold = 0.25, label }: Props) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    let visible = false;
    const sync = () => {
      if (visible && !document.hidden) {
        void el.play().catch(() => undefined);
      } else {
        el.pause();
      }
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      el.pause();
    };
  }, [reduce, threshold]);

  return (
    <video
      ref={ref}
      className={cn("object-cover", className)}
      src={asset(src)}
      poster={asset(poster)}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      aria-hidden={label ? undefined : true}
      tabIndex={-1}
    />
  );
}
