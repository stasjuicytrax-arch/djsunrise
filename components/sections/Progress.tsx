import { CountUp } from "@/components/shared/CountUp";
import { Reveal, Scrub } from "@/components/shared/motion";
import { cities, countries, milestones } from "@/data/progress";

/**
 * Progress (STATE): seven milestones on a rail with a running gradient.
 * Left column stays put on desktop and carries the closing fact, 120 cities.
 */
export function Progress() {
  return (
    <section
      id="progress"
      data-pause-offscreen
      className="px-[var(--page-x)] pt-[var(--section-y)]"
    >
      <div className="mx-auto grid max-w-[1792px] gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="m-0 font-display text-display font-semibold leading-[0.95] tracking-[-0.03em]">
            <span className="text-sun-500">{"//"}</span> progress
          </h2>

          <div className="mt-16">
            <CountUp value={cities.value} tone="counter" className="text-giant" />
            <p className="m-0 mt-4 text-h3 font-medium text-white">{cities.label}</p>
            <p className="m-0 mt-6 max-w-[48ch] text-body text-fog-400">
              {countries.join(", ")}.
            </p>
          </div>
        </div>

        <ol className="relative m-0 list-none p-0 pl-10 md:pl-14">
          {/* the rail: dim full line plus a gradient that runs along it */}
          <span
            aria-hidden
            className="absolute bottom-0 left-[7px] top-0 w-[3px] overflow-hidden rounded-full bg-ink-700 md:left-[11px]"
          >
            <Scrub
              as="span"
              from={{ scaleY: 0 }}
              to={{ scaleY: 1 }}
              triggerSelector="ol"
              start="top 65%"
              end="bottom 55%"
              className="absolute inset-0 origin-top"
              style={{ background: "linear-gradient(180deg, var(--sun-500), var(--dawn-400))" }}
            />
            <span
              className="rail-run absolute inset-x-0 h-[22%]"
              style={{ background: "linear-gradient(180deg, transparent, var(--dawn-400), var(--sun-500))" }}
            />
          </span>

          {milestones.map((m, i) => (
            <Reveal
              as="li"
              kind="mask"
              y={28}
              duration={0.9}
              key={`${m.year}-${i}`}
              className="relative pb-20 last:pb-0"
            >
              <span
                aria-hidden
                className="absolute -left-10 top-[0.55em] size-[17px] rounded-full border-[3px] border-ink-950 bg-sun-500 md:-left-14 md:size-6"
              />
              <p className="m-0 font-display text-display font-semibold leading-[0.95] tracking-[-0.03em] text-white tabular">
                {m.year}
              </p>
              <p className="m-0 mt-4 max-w-[34ch] text-h3 font-medium leading-[1.15] tracking-[-0.015em] text-bone-100">
                {m.text}
              </p>
              {m.people ? (
                <div className="mt-8 flex items-end gap-4">
                  <CountUp value={m.people} tone="counter" className="text-display" />
                  <span className="pb-2 text-meta font-medium uppercase tracking-[0.06em] text-fog-400">
                    people
                  </span>
                </div>
              ) : null}
            </Reveal>
          ))}
        </ol>
      </div>
      <style>{`
        @keyframes rail-run { from { transform: translateY(-100%); } to { transform: translateY(460%); } }
        .rail-run { animation: rail-run 5.5s var(--ease-in-out) infinite; }
        @media (prefers-reduced-motion: reduce) { .rail-run { animation: none; opacity: 0; } }
      `}</style>
    </section>
  );
}
