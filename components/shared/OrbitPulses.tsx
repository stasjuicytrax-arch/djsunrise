"use client";

import * as React from "react";

type Props = {
  /** Orbit radii as percentages of the stage width, inner to outer. Pass a stable array. */
  radii: readonly number[];
  /** Width of the SUNRISE word as a percentage of the stage width (letter flares). */
  wordWidth?: number;
};

// One lap duration (s) per orbit: the outer one is the slowest.
const DUR = [1.6, 2.0, 2.4];
// Inner clockwise, middle against, outer clockwise.
const REVERSE = [false, true, false];
// Pulse layers, aligned at the head. Lengths are % of the circumference.
const LAYERS = [
  { len: 11, color: "var(--sun-400)", opacity: 0.22, width: 1.5 }, // glow, no blur filter
  { len: 11, color: "var(--sun-500)", opacity: 0.4, width: 0.5 }, // soft tail
  { len: 7, color: "var(--dawn-400)", opacity: 0.95, width: 0.55 }, // body
  { len: 1.6, color: "#FFF4E8", opacity: 1, width: 0.62 }, // near-white head
] as const;

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/**
 * Light pulses that now and then run along the three orbit lines: a short
 * arc with a soft tail and a near-white head. Random 2-6 s pauses, mixed
 * directions, about every 4th pulse comes twice (with a short gap). The
 * inner pulse flares the SUNRISE letter it is passing (by projected x).
 * Runs only while on screen; hover makes pulses more frequent; not mounted
 * for reduced motion.
 */
export function OrbitPulses({ radii, wordWidth = 26.4 }: Props) {
  const rootRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const q = new URLSearchParams(window.location.search);
    // off by default until the perf trace clears it; ?pulses forces it on, ?nopulses off
    if (!q.has("pulses") || q.has("nopulses")) return;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = false;
    let hover = false;
    const timers = new Set<number>();
    const anims = new Set<Animation>();
    const pauseTimer = new Map<number, number>(); // orbit -> pending pause timer
    const idle = new Set<number>(); // orbits waiting for the section to be visible
    const counts = radii.map(() => 0);

    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
      return id;
    };

    const stage = root.parentElement as HTMLElement | null;
    const area = root.closest<HTMLElement>(".orbits");
    const letters = () =>
      Array.from(stage?.querySelectorAll<HTMLElement>(".airport-letter") ?? []);

    const flare = (i: number) => {
      const el = letters()[i];
      if (!el) return;
      el.classList.add("spark");
      later(() => el.classList.remove("spark"), 240);
    };

    const run = (orbit: number, after: () => void) => {
      const group = root.querySelector<SVGGElement>(`[data-orbit="${orbit}"]`);
      if (!group) return after();
      const dur = DUR[orbit] ?? 2;
      const reverse = REVERSE[orbit];
      const circles = Array.from(group.querySelectorAll<SVGCircleElement>("circle"));

      // fade the whole arc in and out so nothing pops
      const fade = group.animate(
        [{ opacity: 0 }, { opacity: 1, offset: 0.08 }, { opacity: 1, offset: 0.85 }, { opacity: 0 }],
        { duration: dur * 1000, easing: "linear", fill: "forwards" },
      );
      anims.add(fade);

      let finished = 0;
      circles.forEach((c, k) => {
        const L = LAYERS[k].len;
        // forward: segment [-o, -o+L], head at -o+L, o from L to L-100.
        // reverse: head is the segment start (-o), o from -100 to 0.
        const frames = reverse
          ? [{ strokeDashoffset: -100 }, { strokeDashoffset: 0 }]
          : [{ strokeDashoffset: L }, { strokeDashoffset: L - 100 }];
        const a = c.animate(frames, { duration: dur * 1000, easing: "linear" });
        anims.add(a);
        a.onfinish = () => {
          anims.delete(a);
          if (++finished === circles.length) {
            anims.delete(fade);
            fade.cancel();
            after();
          }
        };
      });

      // the inner pulse flares the letter it passes, by projected x
      if (orbit === 0) {
        const n = letters().length;
        const r = radii[0];
        for (let k = 0; k < n; k++) {
          const x = ((k + 0.5) / n - 0.5) * wordWidth; // letter centre, % from centre
          const s = Math.max(-1, Math.min(1, x / r));
          const a1 = Math.asin(s); // passing over the top, moving right
          const a2 = Math.PI - Math.asin(s); // passing under, moving left
          for (const ang of [a1, a2]) {
            const th = (ang + Math.PI * 2) % (Math.PI * 2);
            later(() => flare(k), (th / (Math.PI * 2)) * dur * 1000);
          }
        }
      }
    };

    const cycle = (orbit: number) => {
      const pause = (hover ? rand(0.8, 2.2) : rand(2, 6)) * 1000;
      const id = later(() => {
        pauseTimer.delete(orbit);
        if (!visible) {
          idle.add(orbit);
          return;
        }
        counts[orbit] += 1;
        const twice = counts[orbit] % 4 === 0;
        run(orbit, () => {
          if (twice && visible) later(() => run(orbit, () => cycle(orbit)), 220);
          else cycle(orbit);
        });
      }, pause);
      pauseTimer.set(orbit, id);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && idle.size) {
          const wake = [...idle];
          idle.clear();
          wake.forEach((o) => cycle(o));
        }
      },
      { threshold: 0.2 },
    );
    io.observe(root);

    // hover: re-roll pending pauses with the short range
    const onEnter = () => {
      hover = true;
      pauseTimer.forEach((id, orbit) => {
        window.clearTimeout(id);
        timers.delete(id);
        pauseTimer.delete(orbit);
        cycle(orbit);
      });
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

    const groups = Array.from(root.querySelectorAll<SVGGElement>("[data-orbit]"));
    return () => {
      io.disconnect();
      area?.removeEventListener("pointerenter", onEnter);
      area?.removeEventListener("pointerleave", onLeave);
      timers.forEach((t) => window.clearTimeout(t));
      anims.forEach((a) => a.cancel());
      timers.clear();
      anims.clear();
      groups.forEach((g) => {
        g.style.opacity = "0";
      });
      letters().forEach((l) => l.classList.remove("spark"));
    };
  }, [radii, wordWidth]);

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
            // start at 12 o'clock
            transformOrigin: "50% 50%",
            transform: "rotate(-90deg)",
          }}
          fill="none"
        >
          {LAYERS.map((l, li) => (
            <circle
              key={li}
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
