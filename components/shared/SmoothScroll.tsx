"use client";

import * as React from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
  registerGsap,
  setLenis,
} from "@/lib/motion";

/**
 * Lenis smooth scroll, driven by the GSAP ticker so ScrollTrigger and Lenis
 * share one clock. Off with reduced motion (native scroll, native anchors).
 * In-page anchors glide through Lenis.
 */
export function SmoothScroll() {
  React.useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      const id = a.getAttribute("href")?.slice(1);
      if (id === undefined) return;
      const el = id ? document.getElementById(id) : document.body;
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(id ? el : 0, { duration: 1.4, offset: id === "top" || !id ? 0 : -16 });
      history.replaceState(null, "", id ? `#${id}` : location.pathname);
    };
    document.addEventListener("click", onClick);

    // layout shifts (lazy images, video, folders, filters) move the triggers: refresh
    let t = 0;
    const refresh = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    const ro = new ResizeObserver(refresh);
    ro.observe(document.body);
    window.addEventListener("load", refresh);
    void document.fonts?.ready.then(refresh);

    return () => {
      document.removeEventListener("click", onClick);
      ro.disconnect();
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
