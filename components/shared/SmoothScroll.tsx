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
/** Lenis is switched off (native scroll) until the perf trace clears it. ScrollTrigger stays. */
const ENABLE_LENIS = false;

export function SmoothScroll() {
  React.useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const lenis = ENABLE_LENIS
      ? new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true })
      : null;
    setLenis(lenis);
    const tick = (t: number) => lenis?.raf(t * 1000);
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      const id = a.getAttribute("href")?.slice(1);
      if (id === undefined) return;
      const el = id ? document.getElementById(id) : document.body;
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(id ? el : 0, { duration: 1.4, offset: id === "top" || !id ? 0 : -16 });
      else el.scrollIntoView({ behavior: "auto", block: "start" });
      history.replaceState(null, "", id ? `#${id}` : location.pathname);
    };
    document.addEventListener("click", onClick);

    // ScrollTrigger.refresh() runs exactly twice on its own: once after load and
    // once after fonts. Layout changes call refreshScroll() by hand. No observers
    // on the body height (a refresh can change it and loop).
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    void document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", onLoad);
      if (lenis) {
        gsap.ticker.remove(tick);
        lenis.destroy();
      }
      setLenis(null);
    };
  }, []);

  return null;
}
