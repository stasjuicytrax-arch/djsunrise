"use client";

import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import { gallery, galleryCaption, galleryTitle } from "@/data/gallery";
import { asset } from "@/lib/asset";

/**
 * Gallery (STATE): the Tilted Grid Hero (21st.dev) on live photos. The title
 * sits above the ribbon, left, with a quiet mono caption on the right, so
 * nothing covers the photos. Soft ink gradients blend the section in and out.
 */
export function Gallery() {
  return (
    <section
      id="gallery"
      data-pause-offscreen
      className="relative mt-[var(--section-y)] flex h-[70svh] min-h-[480px] flex-col bg-ink-950 md:h-svh md:min-h-[640px]"
    >
      <div className="relative z-10 flex items-end justify-between gap-6 px-[var(--page-x)] pb-2 pt-[clamp(24px,5vh,56px)]">
        <h2 className="m-0 font-display text-display font-semibold leading-[0.95] tracking-[-0.03em] text-white">
          {galleryTitle}
        </h2>
        <p className="m-0 pb-2 text-right font-mono text-micro font-medium uppercase tracking-[0.1em] text-fog-400">
          {galleryCaption}
        </p>
      </div>

      <TiltedGridHero
        images={gallery.map((g) => ({ src: asset(g.src), alt: g.alt }))}
        tileHeight={58}
        aspectRatio={3 / 2}
        gap={4}
        axis={50}
        curve={55}
        fade={16}
        speed={6}
        className="min-h-0 flex-1 w-full bg-ink-950"
      />

      {/* blend into the page above and below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[6%]"
        style={{ background: "linear-gradient(180deg, var(--ink-950) 0%, transparent 100%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[8%]"
        style={{ background: "linear-gradient(0deg, var(--ink-950) 0%, transparent 100%)" }}
      />
    </section>
  );
}
