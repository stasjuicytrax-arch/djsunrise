import { FullPlayer, SoundIcon } from "@/components/shared/FullPlayer";
import { LoopVideo } from "@/components/shared/LoopVideo";

/**
 * Showreel (DROP): V1 full-bleed on desktop, V2 vertical on mobile.
 * Muted loop in view; "Play with sound" opens the full cut.
 */
export function Showreel() {
  return (
    <section
      id="showreel"
      aria-label="Showreel"
      className="relative mt-[var(--section-y)] h-[min(78svh,820px)] min-h-[420px] w-full overflow-hidden bg-ink-950"
    >
      {/* desktop */}
      <LoopVideo
        src="/video/v1-aftermovie-loop.mp4"
        poster="/video/posters/after-movie-grozzman-16x9.jpg"
        className="absolute inset-0 hidden size-full md:block"
      />
      {/* mobile */}
      <LoopVideo
        src="/video/v2-aftermovie-9x16-loop.mp4"
        poster="/video/posters/after-movie-grozzman-9x16.jpg"
        className="absolute inset-0 size-full md:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(10,9,9,0.78) 0%, rgba(10,9,9,0.35) 30%, transparent 55%), var(--g-vignette)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 px-[var(--page-x)] pb-8 md:pb-12">
        <h2 className="m-0 max-w-[14ch] font-display text-h3 font-medium leading-[1.1] tracking-[-0.015em] text-white md:max-w-none md:text-h2">
          sunrise b2b grozzman
        </h2>

        <span className="hidden md:contents">
          <FullPlayer
            src="/video/v1-aftermovie-full.mp4"
            poster="/video/posters/after-movie-grozzman-16x9.jpg"
            title="Showreel, full version"
            triggerClassName="group inline-flex shrink-0 items-center gap-3 rounded-full bg-sun-500 py-2 pl-2 pr-6 text-body font-semibold text-white transition-colors duration-[var(--d-base)] hover:bg-dawn-400"
          >
            <span className="grid size-14 place-items-center rounded-full bg-white text-sun-500">
              <SoundIcon />
            </span>
            Play with sound
          </FullPlayer>
        </span>
        <span className="contents md:hidden">
          <FullPlayer
            src="/video/v2-aftermovie-9x16-full.mp4"
            poster="/video/posters/after-movie-grozzman-9x16.jpg"
            vertical
            title="Showreel, full version"
            triggerClassName="group inline-flex shrink-0 items-center gap-3 rounded-full bg-sun-500 py-2 pl-2 pr-5 text-meta font-semibold uppercase tracking-[0.06em] text-white transition-colors duration-[var(--d-base)] hover:bg-dawn-400"
          >
            <span className="grid size-12 place-items-center rounded-full bg-white text-sun-500">
              <SoundIcon />
            </span>
            Play with sound
          </FullPlayer>
        </span>
      </div>
    </section>
  );
}
