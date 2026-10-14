"use client";

import * as React from "react";
import { LayoutGroup } from "motion/react";
import { CountUp } from "@/components/shared/CountUp";
import { GlassFolderCard } from "@/components/shared/GlassFolderCard";
import { LoopVideo } from "@/components/shared/LoopVideo";
import { FullPlayer, SoundIcon } from "@/components/shared/FullPlayer";
import { residencies, residenciesTitle } from "@/data/residencies";

/**
 * Residencies (STATE): three glass folders, one per club. The rank is the
 * loudest thing in each folder; a click opens the folder and fans its files.
 */
export function Residencies() {
  const [open, setOpen] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // a dialog (video) handles its own Esc; otherwise close the folder and keep focus on it
      if (document.querySelector("[role=dialog]")) return;
      document.querySelector<HTMLElement>("[aria-expanded=true][aria-controls]")?.focus();
      setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section
      id="residencies"
      className="px-[var(--page-x)] pt-[var(--section-y)]"
    >
      <div className="mx-auto max-w-[1792px]">
        <h2 className="m-0 font-display text-display font-semibold leading-[0.95] tracking-[-0.03em]">
          residencies
        </h2>
        <p className="mb-16 mt-4 text-lead font-medium text-fog-400">
          {residenciesTitle}
        </p>

        <LayoutGroup>
        <div className="flex flex-col gap-6">
          {residencies.map((r, i) => (
            <GlassFolderCard
              key={r.id}
              title={r.club}
              meta={`${r.city}, ${r.country}`}
              summary={r.role}
              open={open === r.id}
              onToggle={() => setOpen(open === r.id ? null : r.id)}
              appearDelay={i * 0.14}
              files={[
                ...(r.note ? [<p key="note" className="m-0 text-meta font-medium uppercase tracking-[0.06em] text-fog-400">{r.note}</p>] : []),
                <p key="rank" className="m-0 font-mono text-data text-bone-100">
                  #{r.rank} · {residenciesTitle}
                </p>,
                ...(r.video
                  ? [
                      <FullPlayer
                        key="video"
                        src={r.video.full}
                        poster={r.video.poster}
                        vertical
                        title={`${r.club}, video`}
                        triggerClassName="group relative block aspect-[9/16] w-full max-w-[220px] overflow-hidden rounded-[var(--r-lg)] text-left"
                      >
                        <LoopVideo
                          src={r.video.loop}
                          poster={r.video.poster}
                          className="pointer-events-none absolute inset-0 size-full"
                        />
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0"
                          style={{ background: "var(--g-vignette)" }}
                        />
                        <span className="absolute bottom-3 left-3 grid size-12 place-items-center rounded-full bg-sun-500 text-white transition-colors group-hover:bg-dawn-400">
                          <SoundIcon />
                        </span>
                        <span className="sr-only">Play with sound</span>
                      </FullPlayer>,
                    ]
                  : []),
              ]}
            >
              <span className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                <span className="text-meta font-medium uppercase tracking-[0.06em] text-white">
                  club in the world
                </span>
                <CountUp
                  value={r.rank}
                  from={100}
                  prefix="#"
                  tone="rank"
                  delay={i * 0.14}
                  className="text-giant"
                />
              </span>
            </GlassFolderCard>
          ))}
        </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
