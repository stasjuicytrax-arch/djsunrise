import * as React from "react";
import { cn } from "@/lib/utils";
import { GiantWordmark } from "./GiantWordmark";
import { OrbitPulses } from "./OrbitPulses";
import "./orbits.css";

export type OrbitGroup = {
  id: string;
  title: string;
  names: string[];
};

type Props = {
  groups: OrbitGroup[];
  className?: string;
};

// Radius as share of the stage width, seconds per turn, direction (polyrhythm).
const RINGS = [
  { r: 24, dur: 40, dir: "normal", size: "1.7cqw" },
  { r: 37, dur: 55, dir: "reverse", size: "1.9cqw" },
  { r: 48.5, dur: 70, dir: "normal", size: "2.1cqw" },
] as const;

const ROW_DUR = [46, 58, 70];
const RING_RADII = RINGS.map((r) => r.r);

/**
 * Three orbits of names around the SUNRISE sun. Desktop: rings with upright
 * names (each name counter-rotates). Mobile: one marquee row per group.
 * A full sr-only list is always present; reduced motion freezes the motion.
 */
export function Orbits({ groups, className }: Props) {
  return (
    <div data-pause-offscreen className={cn("orbits", className)}>
      {/* accessible list of every name */}
      <div className="sr-only">
        {groups.map((g) => (
          <section key={g.id}>
            <h3>{g.title}</h3>
            <ul>
              {g.names.map((n, i) => (
                <li key={`${n}-${i}`}>{n}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* desktop: orbits */}
      <div aria-hidden className="orbits-stage hidden md:block">
        <GiantWordmark
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ fontSize: "6.4cqw" }}
        />
        <OrbitPulses radii={RING_RADII} />
        {groups.slice(0, 3).map((g, gi) => {
          const ring = RINGS[gi];
          const n = g.names.length;
          return (
            <React.Fragment key={g.id}>
              <span
                className="absolute left-1/2 top-1/2 rounded-full border border-ink-700"
                style={{
                  width: `${ring.r * 2}%`,
                  height: `${ring.r * 2}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
              <div
                className="orbits-ring"
                style={
                  {
                    "--dur": `${ring.dur}s`,
                    "--dir": ring.dir,
                    "--dir-inv": ring.dir === "normal" ? "reverse" : "normal",
                    "--r": `${ring.r}cqw`,
                  } as React.CSSProperties
                }
              >
                {g.names.map((name, i) => (
                  <span
                    key={`${name}-${i}`}
                    className="orbits-slot"
                    style={{ "--a": `${(360 / n) * i}deg` } as React.CSSProperties}
                  >
                    <span className="orbits-hold">
                      <span className="orbits-name">
                        <span
                          className="orbits-label font-display font-medium tracking-[-0.015em] text-bone-100"
                          style={{ fontSize: ring.size }}
                        >
                          {name}
                        </span>
                      </span>
                    </span>
                  </span>
                ))}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* mobile: one marquee per group */}
      <div aria-hidden className="flex flex-col gap-8 md:hidden">
        {groups.slice(0, 3).map((g, gi) => (
          <div key={g.id} className="overflow-hidden">
            <p className="mb-3 px-[var(--page-x)] text-meta font-medium uppercase tracking-[0.06em] text-fog-400">
              {g.title}
            </p>
            <div
              className="orbits-row"
              style={
                {
                  "--dur": `${ROW_DUR[gi]}s`,
                  "--dir": gi === 1 ? "reverse" : "normal",
                } as React.CSSProperties
              }
            >
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex shrink-0 items-center">
                  {g.names.map((name, i) => (
                    <li
                      key={`${name}-${i}`}
                      className="shrink-0 pr-8 font-display text-h3 font-medium tracking-[-0.015em] text-bone-100"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
