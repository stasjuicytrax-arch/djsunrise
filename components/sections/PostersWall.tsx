"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { wallColumns, wallItems, wallTitle, type WallItem } from "@/data/posters";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger, prefersReducedMotion, registerGsap } from "@/lib/motion";

/**
 * Posters & live frames (STATE): a full-bleed mosaic of four columns. On
 * scroll the columns drift at different pace, odd ones up and even ones down
 * (ScrollTrigger scrub, no scroll listeners). Posters and stills are mixed so
 * posters never touch. A click opens a lightbox (arrows, Esc, swipe); the
 * October Tour poster also links to the tour board.
 */
export function PostersWall() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const colRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [open, setOpen] = React.useState<number | null>(null);
  const opener = React.useRef<HTMLElement | null>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  // scroll-linked drift
  React.useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    registerGsap();
    const mm = gsap.matchMedia();
    const run = (amp: number) => {
      colRefs.current.forEach((col, i) => {
        if (!col) return;
        const up = i % 2 === 0; // 1st and 3rd columns go up, 2nd and 4th down
        gsap.fromTo(
          col,
          { yPercent: up ? amp : -amp },
          {
            yPercent: up ? -amp : amp,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      });
    };
    mm.add("(min-width: 768px)", () => run(8));
    mm.add("(max-width: 767px)", () => run(4));
    return () => mm.revert();
  }, []);

  const close = React.useCallback(() => {
    setOpen(null);
    opener.current?.focus();
  }, []);
  const step = React.useCallback((d: number) => {
    setOpen((i) => (i === null ? i : (i + d + wallItems.length) % wallItems.length));
  }, []);

  React.useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "Tab") {
        const btns = Array.from(document.querySelectorAll<HTMLElement>("[data-wall-btn]"));
        if (!btns.length) return;
        const i = btns.indexOf(document.activeElement as HTMLElement);
        const next = e.shiftKey ? (i <= 0 ? btns.length - 1 : i - 1) : (i + 1) % btns.length;
        e.preventDefault();
        btns[next].focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const main = document.querySelector("main");
    main?.setAttribute("inert", "");
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
    };
  }, [open, close, step]);

  const touchX = React.useRef<number | null>(null);
  const current: WallItem | null = open === null ? null : wallItems[open];

  const goTour = () => {
    close();
    const t = document.getElementById("tour");
    if (t) {
      window.setTimeout(() => t.scrollIntoView({ behavior: "smooth" }), 50);
    }
  };

  return (
    <section
      id="posters"
      ref={sectionRef}
      aria-label={wallTitle}
      className="relative mt-[var(--section-y)] h-[180vh] min-h-[900px] overflow-hidden bg-ink-950"
    >
      {/* four columns, edge ones cropped by the screen (tablet 3, phone 2) */}
      <div className="absolute -inset-x-[7%] -top-[6%] bottom-0 flex gap-6 md:-inset-x-[5%]">
        {wallColumns.map((col, ci) => (
          <div
            key={ci}
            ref={(el) => {
              colRefs.current[ci] = el;
            }}
            className={cn(
              "flex min-w-0 flex-1 flex-col gap-6 will-change-transform",
              ci === 2 && "max-md:hidden",
              ci === 3 && "max-lg:hidden",
              ci % 2 === 1 ? "pt-[14vh]" : "pt-0",
            )}
          >
            {col.map((item) => {
              const flat = wallItems.indexOf(item);
              return (
                <button
                  key={item.src}
                  type="button"
                  aria-label={item.tour ? `${item.alt}, open` : item.alt}
                  onClick={(e) => {
                    opener.current = e.currentTarget;
                    setOpen(flat);
                  }}
                  className="block w-full overflow-hidden rounded-[var(--r-lg)] bg-ink-800 text-left"
                  style={{ aspectRatio: `${item.w} / ${item.h}` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(item.src)}
                    alt=""
                    width={item.w}
                    height={item.h}
                    loading="lazy"
                    draggable={false}
                    className="block size-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* fade in and out of the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[20%]"
        style={{ background: "linear-gradient(180deg, var(--ink-950) 0%, transparent 100%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[20%]"
        style={{ background: "linear-gradient(0deg, var(--ink-950) 0%, transparent 100%)" }}
      />

      {/* small mono line over the wall */}
      <h2 className="pointer-events-none absolute inset-x-0 top-8 z-10 m-0 text-center font-mono text-micro font-medium uppercase tracking-[0.1em] text-fog-400">
        {wallTitle}
      </h2>

      {current && typeof document !== "undefined"
        ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[70] grid place-items-center bg-ink-950/95 p-4"
          onClick={(e) => e.target === e.currentTarget && close()}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <button
            ref={closeRef}
            data-wall-btn
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-4 top-4 grid size-14 place-items-center rounded-full bg-ink-800 text-white hover:bg-sun-500"
          >
            <X size={24} />
          </button>
          <button
            data-wall-btn
            type="button"
            aria-label="Previous"
            onClick={() => step(-1)}
            className="absolute left-4 top-1/2 grid size-14 -translate-y-1/2 place-items-center rounded-full bg-ink-800 text-white hover:bg-sun-500"
          >
            <CaretLeft size={24} />
          </button>
          <button
            data-wall-btn
            type="button"
            aria-label="Next"
            onClick={() => step(1)}
            className="absolute right-4 top-1/2 grid size-14 -translate-y-1/2 place-items-center rounded-full bg-ink-800 text-white hover:bg-sun-500"
          >
            <CaretRight size={24} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(current.src)}
            alt={current.alt}
            className="max-h-[84svh] w-auto max-w-[80vw] rounded-[var(--r-md)] object-contain"
          />
          {current.tour ? (
            <button
              data-wall-btn
              type="button"
              onClick={goTour}
              className="absolute bottom-6 left-1/2 inline-flex h-[52px] -translate-x-1/2 items-center rounded-full bg-sun-500 px-6 text-[14px] font-semibold text-white hover:bg-dawn-400"
            >
              Tour dates
            </button>
          ) : null}
        </div>,
        document.body,
      )
        : null}
    </section>
  );
}

// keep ScrollTrigger referenced so tree-shaking never drops plugin registration order
void ScrollTrigger;
