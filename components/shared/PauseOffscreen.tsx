"use client";

import * as React from "react";

/**
 * Pauses every infinite CSS animation inside elements marked with
 * `data-pause-offscreen` while they are outside the viewport (the rule in
 * globals.css keys off `data-offscreen="true"`). One IntersectionObserver
 * for the whole page.
 */
export function PauseOffscreen() {
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-pause-offscreen]"));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          (e.target as HTMLElement).dataset.offscreen = e.isIntersecting ? "false" : "true";
        }
      },
      { rootMargin: "80px 0px" },
    );
    els.forEach((el) => {
      el.dataset.offscreen = "true"; // paused until proven visible
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return null;
}
