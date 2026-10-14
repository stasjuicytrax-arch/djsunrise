"use client";

import * as React from "react";
import { Play, SpeakerSlash } from "@phosphor-icons/react";
import { SunPill } from "@/components/shared/SunPill";
import { Wordmark } from "@/components/shared/Wordmark";
import { contacts } from "@/data/contacts";
import { residencies, residenciesTitle } from "@/data/residencies";
import { asset } from "@/lib/asset";

const SRC = {
  desk: {
    loop: "/video/v1-aftermovie-loop.mp4",
    full: "/video/v1-aftermovie-full.mp4",
    poster: "/video/posters/after-movie-grozzman-16x9.jpg",
  },
  mob: {
    loop: "/video/v2-aftermovie-9x16-loop.mp4",
    full: "/video/v2-aftermovie-9x16-full.mp4",
    poster: "/video/posters/after-movie-grozzman-9x16.jpg",
  },
} as const;

/**
 * Hero: festival film full-bleed from the first frame (desktop V1, mobile V2),
 * a thin dawn-orange horizon above a bottom bar with the wordmark, the three
 * DJ Mag ranks, sound and booking. No reveal animation: only the bar and nav
 * ease in (fade + 10px, ~0.5 s). Layout follows docs/hero-sketch.html.
 */
export function Hero() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [mobile, setMobile] = React.useState<boolean | null>(null);
  const [soundOn, setSoundOn] = React.useState(false);

  // Source is chosen on the client so a phone never downloads the 2:1 file.
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const media = mobile ? SRC.mob : SRC.desk;
  const ready = mobile !== null;

  // Play the muted loop while on screen and while the tab is visible.
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v || !ready) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    v.src = asset(media.loop);
    v.poster = asset(media.poster);
    v.muted = true;
    setSoundOn(false);
    let visible = true;
    const sync = () => {
      if (reduce) return;
      if (visible && !document.hidden) void v.play().catch(() => undefined);
      else v.pause();
    };
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ready, media.loop, media.poster]);

  const backToLoop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.src = asset(media.loop);
    v.loop = true;
    v.muted = true;
    void v.play().catch(() => undefined);
    setSoundOn(false);
  };

  // "Sound on" turns the same video element into the full cut with sound.
  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    if (!soundOn) {
      v.src = asset(media.full);
      v.loop = false;
      v.muted = false;
      v.currentTime = 0;
      v.play().then(
        () => setSoundOn(true),
        () => {
          v.muted = true;
        },
      );
    } else {
      backToLoop();
    }
  };

  const ranks = [...residencies].sort((a, b) => a.rank - b.rank);

  return (
    <section
      id="top"
      className="hero relative isolate overflow-hidden bg-ink-950 max-[860px]:h-auto min-[861px]:h-svh min-[861px]:min-h-[600px]"
    >
      <div className="stage relative max-[860px]:h-[72svh] max-[860px]:min-h-[480px] min-[861px]:absolute min-[861px]:inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(media.poster)}
          alt=""
          aria-hidden
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover"
        />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          onEnded={backToLoop}
          aria-label="SUNRISE b2b Grozzman, festival after movie"
          className="absolute inset-0 size-full object-cover"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 45%, transparent 50%, rgba(10,9,9,.85) 100%), linear-gradient(to top, rgba(10,9,9,.92) 0%, rgba(10,9,9,.35) 26%, transparent 46%)",
          }}
        />
        {/* the horizon: thin dawn-orange line above the bar */}
        <div
          aria-hidden
          className="horizon pointer-events-none absolute inset-x-0 z-[3] h-px max-[860px]:bottom-0 min-[861px]:bottom-[clamp(118px,17vh,170px)]"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--dawn-400) 20%, var(--dawn-400) 80%, transparent)",
          }}
        />
      </div>

      <div
        className="hero-bar z-[4] grid items-center gap-[clamp(16px,4vw,64px)] px-[clamp(16px,3vw,40px)] max-[860px]:relative max-[860px]:grid-cols-1 max-[860px]:gap-[22px] max-[860px]:bg-ink-950 max-[860px]:pb-[30px] max-[860px]:pt-[22px] min-[861px]:absolute min-[861px]:inset-x-0 min-[861px]:bottom-0 min-[861px]:h-[clamp(118px,17vh,170px)] min-[861px]:grid-cols-[auto_1fr_auto]"
        style={{ animation: "hero-fade 0.5s var(--ease-out) 0.15s both" }}
      >
        <div className="grid gap-2">
          <h1 className="m-0">
            <Wordmark className="h-[clamp(30px,4vw,54px)] w-auto" />
            <span className="sr-only">, DJ, Bangkok, Pattaya</span>
          </h1>
          <p className="m-0 text-[12px] font-semibold uppercase tracking-[0.16em] text-fog-400">
            Bangkok <span aria-hidden className="text-dawn-400">{"//"}</span>
            <span className="sr-only">,</span> Pattaya
          </p>
        </div>

        <ul
          role="list"
          className="m-0 flex list-none items-start gap-[clamp(18px,3.4vw,52px)] p-0 max-[860px]:justify-between min-[861px]:justify-center"
          aria-label={residenciesTitle}
        >
          {ranks.map((r) => (
            <li key={r.id}>
              <b
                className="block font-display font-light leading-[0.9] tracking-[-0.04em] text-bone-100"
                style={{
                  fontSize: "clamp(30px, 3.6vw, 56px)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                #{r.rank}
              </b>
              <span className="mt-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-fog-400">
                {r.club}
              </span>
            </li>
          ))}
          <li className="self-end max-[860px]:hidden">
            <small className="block max-w-[11ch] font-mono text-[11px] leading-[1.3] text-fog-400">
              {residenciesTitle}
            </small>
          </li>
        </ul>

        <p className="m-0 -mt-3 font-mono text-[11px] leading-[1.3] text-fog-400 min-[861px]:hidden">
          {residenciesTitle}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={toggleSound}
            className="inline-flex h-[52px] cursor-pointer items-center gap-3 rounded-full border-0 bg-bone-100/10 py-1.5 pl-1.5 pr-[18px] text-[14px] font-semibold text-white backdrop-blur-[10px] transition-colors duration-[var(--d-fast)] hover:bg-bone-100/20"
          >
            <span className="grid size-10 place-items-center rounded-full bg-white text-ink-950">
              {soundOn ? <SpeakerSlash weight="fill" size={16} /> : <Play weight="fill" size={14} />}
            </span>
            <span>{soundOn ? "Sound off" : "Sound on"}</span>
          </button>
          <SunPill href={contacts.bookings.href} target="_blank" rel="noopener">
            Book a date
          </SunPill>
        </div>
      </div>
    </section>
  );
}
