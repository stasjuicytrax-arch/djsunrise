import { SunMark } from "@/components/shared/SunMark";
import { nameStrip, nameStripLead } from "@/data/artists";
import "@/components/shared/marquee.css";

/**
 * Name-strip under the hero (REF-3): eight names from the Top 100 DJs,
 * one slow line, no eyebrow. The short lead sits left, tied to the line.
 */
export function NameStrip() {
  const list = (hidden?: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {nameStrip.map((name) => (
        <li key={name} className="flex shrink-0 items-center">
          <span className="font-display text-h2 font-medium uppercase leading-none tracking-[-0.025em] text-fog-400">
            {name}
          </span>
          <SunMark className="mx-8 w-6 shrink-0" />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label="Played together with"
      className="my-[calc(var(--section-y)*0.6)] flex flex-col gap-4 overflow-hidden md:flex-row md:items-center md:gap-6"
    >
      <p className="m-0 shrink-0 px-[var(--page-x)] text-body text-fog-400 md:pr-0">
        {nameStripLead}
      </p>
      <div className="marquee min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track" style={{ "--marquee-dur": "48s" } as React.CSSProperties}>
          {list()}
          {list(true)}
        </div>
      </div>
    </section>
  );
}
