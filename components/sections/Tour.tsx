import { CountUp } from "@/components/shared/CountUp";
import { TracingLine } from "@/components/shared/TracingLine";
import { FlapText } from "@/components/shared/FlapText";
import { Reveal } from "@/components/shared/motion";
import { tour, tourSummary, tourTitle } from "@/data/tour";

// Schematic route: 11 points left to right on a gentle wave, no map underneath.
const X0 = 50;
const STEP = 110;
const pts = tour.map((t, i) => ({
  x: X0 + i * STEP,
  y: 70 + Math.sin(i * 0.9) * 26,
  label: t.city,
  below: i % 2 === 1,
}));
const routePath = pts.reduce((d, p, i) => {
  if (i === 0) return `M${p.x} ${p.y}`;
  const q = pts[i - 1];
  const cx = (q.x + p.x) / 2;
  return `${d} C ${cx} ${q.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
}, "");

/**
 * October tour (LIST): fact column, the route, and the board with all 11 dates.
 * The year is not shown until the client confirms it.
 */
export function Tour() {
  return (
    <section id="tour" data-pause-offscreen className="px-[var(--page-x)] py-[var(--section-y)]">
      <div className="mx-auto max-w-[1792px]">
        <h2 className="m-0 font-display text-display font-semibold leading-[0.95] tracking-[-0.03em]">
          {tourTitle}
        </h2>

        <dl className="m-0 mt-14 grid grid-cols-3 gap-6 md:max-w-3xl">
          {tourSummary.map((s, i) => (
            <div key={s.label} className="flex flex-col">
              <dt className="order-2 mt-2 text-meta font-medium uppercase tracking-[0.06em] text-fog-400">
                {s.label}
              </dt>
              <dd className="order-1 m-0">
                <CountUp value={s.value} tone="counter" delay={i * 0.1} className="text-display" />
              </dd>
            </div>
          ))}
        </dl>

        <Reveal kind="wipe" duration={1.6} start="top 85%" className="mt-20 hidden md:block">
          <TracingLine
            viewBox={`0 0 ${X0 * 2 + STEP * (tour.length - 1)} 140`}
            x1={0}
            x2={X0 * 2 + STEP * (tour.length - 1)}
            d={routePath}
            points={pts}
            duration={7}
            title="Tour route in order of dates"
          />
        </Reveal>

        <ol className="m-0 mt-16 list-none p-0">
          {tour.map((t, ri) => (
            <li
              key={t.date}
              id={`tour-${t.date.replace(".", "-")}`}
              className="tour-row group grid scroll-mt-28 grid-cols-[4.5rem_minmax(0,1fr)_auto] items-baseline gap-x-4 border-b border-ink-700 py-5 transition-colors duration-[var(--d-fast)] hover:bg-ink-800 md:grid-cols-[9rem_minmax(0,1fr)_10rem_auto] md:gap-x-6 md:px-4"
            >
              <time
                className="font-mono text-data text-bone-100 transition-colors duration-[var(--d-fast)] group-hover:text-sun-400"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                <FlapText text={t.date} delay={(ri % 4) * 60} />
              </time>
              <span className="min-w-0 break-words font-display text-h3 font-medium uppercase leading-[1.05] tracking-[-0.025em] text-white md:text-h2">
                <FlapText text={t.city} delay={(ri % 4) * 60 + 80} />
              </span>
              <span className="hidden text-meta font-medium uppercase tracking-[0.06em] text-fog-400 md:block">
                {t.country}
              </span>
              <span className="justify-self-end rounded-full border border-ink-700 px-3 py-1 font-mono text-meta text-bone-100">
                {t.iso}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
