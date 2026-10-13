"use client";

import * as React from "react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import { gallery, galleryLead, galleryTitle } from "@/data/gallery";
import { posters } from "@/data/posters";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

/**
 * Gallery & posters (STATE).
 * A: Tilted Grid Hero (21st.dev) on the placeholder set, full bleed.
 * B: a fan of ten posters in a half circle, like the rays of the logo.
 */
export function Gallery() {
  const [lightbox, setLightbox] = React.useState<number | null>(null);
  const opener = React.useRef<HTMLElement | null>(null);

  const open = (i: number, el: HTMLElement) => {
    if (posters[i].tour) {
      document.getElementById("tour")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    opener.current = el;
    setLightbox(i);
  };
  const close = React.useCallback(() => {
    setLightbox(null);
    opener.current?.focus();
  }, []);
  const step = React.useCallback((d: number) => {
    setLightbox((i) => (i === null ? i : (i + d + posters.length) % posters.length));
  }, []);

  React.useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "Tab") {
        // keep focus inside the lightbox: cycle its three buttons
        const btns = Array.from(
          document.querySelectorAll<HTMLElement>("[data-lightbox-btn]"),
        );
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
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
    };
  }, [lightbox, close, step]);

  const touchX = React.useRef<number | null>(null);

  const angles = posters.map((_, i) => -72 + (144 / (posters.length - 1)) * i);

  return (
    <section id="gallery" className="pt-[var(--section-y)]">
      {/* A. live */}
      <TiltedGridHero
        images={gallery.map((g) => ({ src: asset(g.src), alt: g.alt }))}
        className="h-[min(64svh,560px)] w-full bg-ink-950"
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-start gap-4 px-[var(--page-x)] py-12 text-center">
          <h2 className="m-0 font-display text-display font-semibold leading-[0.95] tracking-[-0.03em] text-white">
            {galleryTitle}
          </h2>
          <p className="m-0 max-w-[32ch] text-lead font-medium text-bone-100">
            {galleryLead}
          </p>
        </div>
      </TiltedGridHero>

      {/* B. posters */}
      <div className="mx-auto mt-[var(--section-y)] max-w-[1792px] px-[var(--page-x)]">
        <h3 className="m-0 text-center font-display text-h2 font-medium tracking-[-0.025em]">
          posters
        </h3>
        <div className="fan mx-auto mt-12 [container-type:inline-size]">
          <ul className="fan-stage m-0 list-none p-0">
            {posters.map((p, i) => (
              <li
                key={p.src}
                className="fan-slot"
                style={{ "--a": `${angles[i]}deg`, zIndex: p.tour ? 20 : i } as React.CSSProperties}
              >
                <button
                  type="button"
                  aria-label={p.tour ? `${p.alt}, go to the tour dates` : `Open poster: ${p.alt}`}
                  onClick={(e) => open(i, e.currentTarget)}
                  className={cn(
                    "fan-card block overflow-hidden rounded-[var(--r-md)] border border-ink-700 bg-ink-800",
                    "transition-transform duration-[var(--d-base)] ease-[var(--ease-out)] hover:-translate-y-3 focus-visible:-translate-y-3",
                    p.tour && "scale-[1.12]",
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(p.src)}
                    alt=""
                    width={p.w}
                    height={p.h}
                    loading="lazy"
                    draggable={false}
                    className="block h-auto w-full"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {lightbox !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={posters[lightbox].alt}
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
            type="button"
            aria-label="Close poster"
            data-lightbox-btn
            onClick={close}
            autoFocus
            className="absolute right-4 top-4 grid size-14 place-items-center rounded-full bg-ink-800 text-white hover:bg-sun-500"
          >
            <X size={24} />
          </button>
          <button
            type="button"
            aria-label="Previous poster"
            data-lightbox-btn
            onClick={() => step(-1)}
            className="absolute left-4 top-1/2 grid size-14 -translate-y-1/2 place-items-center rounded-full bg-ink-800 text-white hover:bg-sun-500"
          >
            <CaretLeft size={24} />
          </button>
          <button
            type="button"
            aria-label="Next poster"
            data-lightbox-btn
            onClick={() => step(1)}
            className="absolute right-4 top-1/2 grid size-14 -translate-y-1/2 place-items-center rounded-full bg-ink-800 text-white hover:bg-sun-500"
          >
            <CaretRight size={24} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(posters[lightbox].src)}
            alt={posters[lightbox].alt}
            className="max-h-[86svh] w-auto max-w-[80vw] rounded-[var(--r-md)] object-contain [image-rendering:auto]"
          />
        </div>
      ) : null}

      <style>{`
        .fan { max-width: 1100px; }
        .fan-stage { position: relative; height: 52cqw; }
        .fan-slot {
          position: absolute; left: 50%; bottom: 0; width: 0; height: 0;
          transform: rotate(var(--a));
        }
        .fan-card {
          position: absolute; left: 0; bottom: 36cqw;
          width: 15cqw; min-width: 64px;
          transform: translateX(-50%);
        }
        @media (min-width: 768px) { .fan-card { width: 13cqw; } .fan-stage { height: 46cqw; } .fan-card { bottom: 31cqw; } }
      `}</style>
    </section>
  );
}
