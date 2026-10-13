"use client";

import * as React from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { regions, venues, type Region } from "@/data/venues";
import { cn } from "@/lib/utils";

const tourAnchor = (date: string) => `#tour-${date.replace(".", "-")}`;

/**
 * Venues (LIST): 34 places, filter by region with FLIP reflow.
 * Hover lights one row and dims the rest. Tour venues carry an "oct tour" mark
 * that jumps to the date on the board.
 */
export function Venues() {
  const [filter, setFilter] = React.useState<"All" | Region>("All");
  const reduce = useReducedMotion();
  const shown = venues.filter((v) => filter === "All" || v.region === filter);

  return (
    <section id="venues" className="px-[var(--page-x)] pt-[var(--section-y)]">
      <div className="mx-auto max-w-[1792px]">
        <h2 className="m-0 font-display text-display font-semibold leading-[0.95] tracking-[-0.03em]">
          venues
        </h2>
        <p className="mb-10 mt-4 text-lead font-medium text-fog-400">
          Top venues I&apos;ve performed at
        </p>

        <div role="group" aria-label="Filter by region" className="mb-12 flex flex-wrap gap-2">
          {regions.map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={filter === r}
              onClick={() => setFilter(r)}
              className={cn(
                "h-11 rounded-[var(--r-pill)] border px-5 text-meta font-medium uppercase tracking-[0.06em] transition-colors duration-[var(--d-fast)]",
                filter === r
                  ? "border-sun-500 bg-sun-500 text-white"
                  : "border-ink-700 text-fog-400 hover:border-fog-400 hover:text-white",
              )}
            >
              {r}
            </button>
          ))}
        </div>

        <LayoutGroup>
          <ul className="venues-list m-0 grid list-none grid-cols-1 gap-x-16 p-0 md:grid-cols-2">
            <AnimatePresence initial={false} mode="popLayout">
              {shown.map((v) => (
                <motion.li
                  key={`${v.club}-${v.city}`}
                  layout={reduce ? false : "position"}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="venue-row group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink-700 py-4 transition-colors duration-[var(--d-fast)] hover:text-white"
                >
                  <span className="font-display text-h3 font-medium uppercase leading-[1.1] tracking-[-0.015em] text-bone-100 transition-colors duration-[var(--d-fast)] group-hover:text-white">
                    {v.club}
                    {v.tour ? (
                      <a
                        href={tourAnchor(v.tour)}
                        className="ml-3 inline-block rounded-full bg-sun-500 px-3 py-1.5 align-middle text-micro font-medium uppercase tracking-[0.1em] text-white no-underline hover:bg-dawn-400 hover:text-white"
                      >
                        oct tour
                      </a>
                    ) : null}
                  </span>
                  <span className="shrink-0 text-right text-meta font-medium uppercase tracking-[0.06em] text-fog-400">
                    {v.city}, {v.country}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </LayoutGroup>

        <p className="m-0 mt-10 max-w-[70ch] text-body text-fog-400">
          Performances in more than 120 cities around the world.
        </p>
      </div>
      <style>{`
        /* one row lit, the rest recede */
        .venues-list:has(.venue-row:hover) .venue-row:not(:hover) > span:first-child { color: var(--fog-400); }
      `}</style>
    </section>
  );
}
