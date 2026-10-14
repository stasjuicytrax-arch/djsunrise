"use client";

import * as React from "react";
import { SunMark } from "@/components/shared/SunMark";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/motion";

/**
 * The sunset: the logo sun sits on the horizon line and sinks below it while
 * the Contact section scrolls into place; its rays cool from sun-500 to
 * sun-700 on the way. The horizon line stays. Reduced motion: already set.
 * The clip is the bottom edge of this box (the line lies right below it).
 */
export function SunsetSun({ className }: { className?: string }) {
  const boxRef = React.useRef<HTMLDivElement>(null);
  const sunRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const box = boxRef.current;
    const sun = sunRef.current;
    if (!box || !sun) return;
    registerGsap();
    if (prefersReducedMotion()) {
      gsap.set(sun, { yPercent: 105 });
      return;
    }
    const section = box.closest("#contact") ?? box;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 55%",
          end: "bottom bottom",
          scrub: 0.7,
        },
      });
      tl.fromTo(sun, { yPercent: 0 }, { yPercent: 105, ease: "none" }, 0);
      const svg = sun.querySelector("svg");
      if (svg) tl.fromTo(svg, { fill: "#D82E2F" }, { fill: "#8F1719", ease: "none" }, 0);
    }, box);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={boxRef}
      aria-hidden
      className={className}
      style={{ overflow: "hidden", pointerEvents: "none" }}
    >
      <div ref={sunRef} className="h-full w-full will-change-transform">
        <SunMark className="h-full w-full" />
      </div>
    </div>
  );
}
