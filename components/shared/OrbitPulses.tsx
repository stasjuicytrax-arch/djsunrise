"use client";

import * as React from "react";

type Props = {
  /** Orbit radii as percentages of the stage width, inner to outer. */
  radii: readonly number[];
};

// One lap duration (s) per orbit: the outer one is the slowest.
const DUR = [1.6, 2.0, 2.4];
// Direction per orbit: inner clockwise, middle against, outer clockwise.
const REVERSE = [false, true, false];
// Pulse layers, aligned at the head. Lengths are % of the circumference.
const LAYERS = [
  { len: 11, color: "var(--sun-500)", opacity: 0.35, width: 0.5 }, // soft tail
  { len: 7, color: "var(--dawn-400)", opacity: 0.9, width: 0.55 }, // body
  { len: 1.6, color: "#FFF4E8", opacity: 1, width: 0.62 }, // near-white head
] as const;

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/**
 * Light pulses that now and then run along the three orbit lines: a short
 * arc with a soft tail and a near-white head. Random 2-6 s pauses, mixed
 * directions, about every 4th pulse comes twice. The inner pulse lights the
 * SUNRISE letter it is passing. Only runs while on screen; hover makes
 * pulses more frequent; not mounted at all for reduced motion.
 */
export function OrbitPulses({ radii }: Props) {
  const rootRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = false;
    let hover = false;
    const timers = new Set<number>();
    const anims = new Set<Animation>();
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    };

    const stage = root.parentElement as HTMLElement | null;
    const area = root.closest<HTMLElement>(".orbits");
    const letters = () =>
      Array.from(stage?.querySelectorAll<HTMLElement>(".airport-letter") ?? []);

    const spark = (i: number) => {
      const el = letters()[i];
      if (!el) return;
      el.classList.add("spark");
      later(() => el.classList.remove("spark"), 260);
    };

    const run = (orbit: number, after?: () => void) => {
      const group = root.querySelector<SVGGElement>(`[data-orbit="${orbit}"]`);
      if (!group) return;
      const dur = DUR[orbit] ?? 2;
      const reverse = REVERSE[orbit];
      const circles = Array.from(group.querySelectorAll<SVGCircleElement>("circle"));
      group.style.opacity = "1";
      let done = 0;
      circles.forEach((c, k) => {
        const L = LAYERS[k].len;
        // segment spans [-offset, -offset + L]: head at -offset + L
        const a = c.animate(
          [{ strokeDashoffset: L }, { strokeDashoffset: L - 100 }],
          { duration: dur * 1000, easing: "linear", direction: reverse ? "reverse" : "normal" },
        );
        anims.add(a);
        a.onfinish = () => {
          anims.delete(a);
          if (++done === circles.length) {
            group.style.opacity = "0";
            after?.();
          }
        };
      });
      // the inner pulse lights the letter it passes (angle -> letter, approximate)
      if (orbit === 0) {
        const n = letters().length;
        for (let k = 0; k < n; k++) {
          const p = (k + 0.5) / n; // share of the lap
          later(() => spark(k), p * dur * 1000);
        }
      }
    };

    const cycle = (orbit: number, count = 0) => {
      const pause = (hover ? rand(0.8, 2.2) : rand(2, 6)) * 1000;
      later(() => {
        if (!visible) {
          cycle(orbit, count);
          return;
        }
        // about every 4th pulse comes twice in a row
        const twice = (count + 1) % 4 === 0;
        run(orbit, () => {
          if (twice && visible) run(orbit, () => cycle(orbit, count + 1));
          else cycle(orbit, count + 1);
        });
      }, pause);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0.2 },
    );
    io.observe(root);

    const onEnter = () => {
      hover = true;
    };
    const onLeave = () => {
      hover = false;
    };
    area?.addEventListener("pointerenter", onEnter);
    area?.addEventListener("pointerleave", onLeave);

    radii.forEach((_, i) => {
      // stagger first launches so the orbits do not start together
      later(() => cycle(i), rand(0.4, 2.2) * 1000);
    });

    return () => {
      io.disconnect();
      area?.removeEventListener("pointerenter", onEnter);
      area?.removeEventListener("pointerleave", onLeave);
      timers.forEach((t) => window.clearTimeout(t));
      anims.forEach((a) => a.cancel());
      timers.clear();
      anims.clear();
    };
  }, [radii]);

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 100 100"
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full overflow-visible"
    >
      {radii.map((r, i) => (
        <g
          key={r}
          data-orbit={i}
          style={{
            opacity: 0,
            filter: "drop-shadow(0 0 6px var(--sun-400))",
            // start at 12 o'clock
            transformOrigin: "50% 50%",
            transform: "rotate(-90deg)",
          }}
          fill="none"
        >
          {LAYERS.map((l) => (
            <circle
              key={l.len}
              cx={50}
              cy={50}
              r={r}
              pathLength={100}
              stroke={l.color}
              strokeOpacity={l.opacity}
              strokeWidth={l.width}
              strokeLinecap="round"
              strokeDasharray={`${l.len} ${100 - l.len}`}
              strokeDashoffset={l.len}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}
