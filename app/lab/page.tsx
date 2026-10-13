"use client";

import * as React from "react";
import { BarDigits } from "@/components/shared/BarDigits";
import { GlassFolderCard } from "@/components/shared/GlassFolderCard";
import { Orbits } from "@/components/shared/Orbits";
import { TracingLine } from "@/components/shared/TracingLine";
import { GiantWordmark } from "@/components/shared/GiantWordmark";
import { SunriseHaze } from "@/components/shared/SunriseHaze";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import { artistGroups } from "@/data/artists";
import { residencies } from "@/data/residencies";
import { gallery } from "@/data/gallery";
import { contacts } from "@/data/contacts";
import { asset } from "@/lib/asset";

// Step 2 lab: every component on one page. Removed before step 3 sections ship.
export default function Lab() {
  const [open, setOpen] = React.useState<string | null>(null);
  return (
    <main className="space-y-24 pb-0">
      <section className="px-[var(--page-x)] pt-24">
        <h2 className="text-display font-semibold">residencies</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {residencies.map((r, i) => (
            <GlassFolderCard
              key={r.id}
              title={r.club}
              meta={`${r.city}, ${r.country}`}
              open={open === r.id}
              onToggle={() => setOpen(open === r.id ? null : r.id)}
              appearDelay={i * 0.14}
              files={[
                <span key="a">{r.role}</span>,
                <span key="b">{`#${r.rank} club in the world`}</span>,
              ]}
            >
              <BarDigits value={`#${r.rank}`} className="text-[88px]" delay={i * 0.14} />
            </GlassFolderCard>
          ))}
        </div>
      </section>

      <section className="px-[var(--page-x)]">
        <h2 className="text-display font-semibold">counters</h2>
        <div className="mt-12 flex flex-wrap items-end gap-12">
          <BarDigits value="35,000" className="text-[96px]" />
          <BarDigits value="120" className="text-[160px]" />
        </div>
      </section>

      <section className="px-[var(--page-x)]">
        <h2 className="mb-12 text-display font-semibold">play together</h2>
        <Orbits groups={artistGroups} className="mx-auto max-w-[1100px]" />
      </section>

      <section className="px-[var(--page-x)]">
        <TracingLine
          viewBox="0 0 1000 120"
          x2={1000}
          d="M20 90 C 200 10, 320 110, 500 60 S 800 20, 980 70"
          points={[
            { x: 20, y: 90, label: "Munich" },
            { x: 500, y: 60, label: "Riga" },
            { x: 980, y: 70, label: "Geneva" },
          ]}
        />
      </section>

      <TiltedGridHero
        images={gallery.map((g) => ({ src: asset(g.src), alt: g.alt }))}
        className="h-[min(80svh,760px)] w-full bg-ink-950"
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h2 className="text-display font-semibold">live</h2>
        </div>
      </TiltedGridHero>

      <SunriseHaze className="min-h-[min(80svh,760px)]">
        <div className="flex flex-1 flex-col justify-end gap-4 px-[var(--page-x)] pb-16 pt-[40svh]">
          <h2 className="text-display font-semibold">
            <span className="text-sun-500">{"//"}</span> contact
          </h2>
          <a className="pointer-events-auto w-fit font-mono text-data" href={contacts.bookings.href}>
            {contacts.bookings.display}
          </a>
          <a className="pointer-events-auto w-fit font-mono text-data" href={contacts.email.href}>
            {contacts.email.display}
          </a>
        </div>
      </SunriseHaze>

      <footer className="overflow-hidden px-[var(--page-x)]">
        <GiantWordmark />
      </footer>
    </main>
  );
}
