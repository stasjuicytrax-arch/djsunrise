"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react/dist/ssr";
import { Parallax } from "@/components/shared/motion";
import { announceSound, onOtherSound } from "@/lib/soundBus";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

const STORIES = [
  {
    id: "v2",
    loop: "/video/v2-aftermovie-9x16-loop.mp4",
    full: "/video/v2-aftermovie-9x16-full.mp4",
    poster: "/video/posters/after-movie-grozzman-9x16.webp",
    caption: "sunrise b2b grozzman",
  },
  {
    id: "v3",
    loop: "/video/v3-spaceplus-loop.mp4",
    full: "/video/v3-spaceplus-full.mp4",
    poster: "/video/posters/spaceplus-pete-d-9x16.webp",
    caption: "space plus bangkok",
  },
  {
    id: "v4",
    loop: "/video/v4-clubnight-loop.mp4",
    full: "/video/v4-clubnight-full.mp4",
    poster: "/video/posters/img-7875-9x16.webp",
    caption: "club night",
  },
  {
    id: "v5",
    loop: "/video/v5-shortfilm-loop.mp4",
    full: "/video/v5-shortfilm-full.mp4",
    poster: "/video/posters/short-film-9x16.webp",
    caption: "short film",
  },
] as const;

type Story = (typeof STORIES)[number];

// At most two muted loops play at once: the two most visible cards win.
const ratios = new Map<string, number>();
const listeners = new Map<string, (on: boolean) => void>();
function rebalance() {
  const top = [...ratios.entries()]
    .filter(([, r]) => r > 0.35)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([id]) => id);
  listeners.forEach((fn, id) => fn(top.includes(id)));
}

/**
 * One vertical story: a muted loop that plays only while visible. The speaker
 * button swaps the same element to the full cut with sound. Only one video on
 * the page has sound at a time (soundBus).
 */
function StoryCard({ story, className }: { story: Story; className?: string }) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [sound, setSound] = React.useState(false);
  const soundRef = React.useRef(false);
  const reduce = useReducedMotion();

  const toLoop = React.useCallback(() => {
    const v = ref.current;
    if (!v) return;
    soundRef.current = false;
    setSound(false);
    v.src = asset(story.loop);
    v.loop = true;
    v.muted = true;
    void v.play().catch(() => undefined);
  }, [story.loop]);

  // loop source, and play only while visible
  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.src = asset(story.loop);
    v.muted = true;
    v.loop = true;
    let visible = false;
    const sync = () => {
      if (reduce && !soundRef.current) return;
      if ((visible || soundRef.current) && !document.hidden) void v.play().catch(() => undefined);
      else v.pause();
    };
    listeners.set(story.id, (on) => {
      visible = on;
      sync();
    });
    const io = new IntersectionObserver(
      ([e]) => {
        ratios.set(story.id, e.isIntersecting ? e.intersectionRatio : 0);
        rebalance();
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
    );
    io.observe(v);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      listeners.delete(story.id);
      ratios.delete(story.id);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [story.loop, story.id, reduce]);

  // another video took the sound: back to the silent loop
  React.useEffect(
    () =>
      onOtherSound(story.id, () => {
        if (soundRef.current) toLoop();
      }),
    [story.id, toLoop],
  );

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (soundRef.current) {
      toLoop();
      return;
    }
    announceSound(story.id);
    v.src = asset(story.full);
    v.loop = false;
    v.muted = false;
    v.currentTime = 0;
    v.play().then(
      () => {
        soundRef.current = true;
        setSound(true);
      },
      () => toLoop(),
    );
  };

  return (
    <div
      className={cn(
        "relative aspect-[9/16] w-full overflow-hidden rounded-[var(--r-md)] bg-ink-900 md:rounded-[var(--r-lg)]",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(story.poster)}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 size-full object-cover"
      />
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={asset(story.poster)}
        onEnded={toLoop}
        aria-label={story.caption}
        className="absolute inset-0 size-full object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(10,9,9,0.8) 0%, transparent 38%), var(--g-vignette)",
        }}
      />
      <p className="absolute bottom-4 left-4 right-20 m-0 text-micro font-medium uppercase tracking-[0.1em] text-white">
        {story.caption}
      </p>
      <button
        type="button"
        onClick={toggle}
        aria-label={`${story.caption}, ${sound ? "turn sound off" : "play with sound"}`}
        className="absolute bottom-3 right-3 grid size-12 place-items-center rounded-full bg-sun-500 text-white transition-colors duration-[var(--d-fast)] hover:bg-dawn-400"
      >
        {sound ? <SpeakerHigh weight="fill" size={22} /> : <SpeakerSlash weight="fill" size={22} />}
      </button>
    </div>
  );
}

/**
 * Club night (DROP): four vertical stories on the curtain light.
 * Desktop: one row, staggered (2 and 4 lower by 80px) with a light depth
 * parallax. Tablet: 2x2. Phone: a snap strip with the next card peeking.
 */
export function ClubNight() {
  return (
    <section
      aria-label="Club night"
      className="relative mt-[var(--section-y)] overflow-hidden py-[clamp(48px,8vh,96px)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--g-sunrise)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--g-curtain)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950 to-transparent"
      />
      <ul className="relative mx-auto flex max-w-[1792px] snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--page-x)] pb-20 md:grid md:grid-cols-2 scroll-pl-[var(--page-x)] md:gap-6 md:overflow-visible md:pb-24 lg:grid-cols-4 lg:gap-8 [&::-webkit-scrollbar]:hidden">
        {STORIES.map((s, i) => (
          <li
            key={s.id}
            className={cn(
              "w-[72vw] shrink-0 snap-start md:w-auto",
              i % 2 === 1 && "lg:translate-y-20",
            )}
          >
            <Parallax distance={i % 2 === 1 ? 20 : 34}>
              <StoryCard story={s} />
            </Parallax>
          </li>
        ))}
      </ul>
    </section>
  );
}
