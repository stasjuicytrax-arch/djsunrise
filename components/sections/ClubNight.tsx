import { FullPlayer, SoundIcon } from "@/components/shared/FullPlayer";
import { LoopVideo } from "@/components/shared/LoopVideo";

const STORIES = [
  {
    id: "v4",
    loop: "/video/v4-clubnight-loop.mp4",
    full: "/video/v4-clubnight-full.mp4",
    poster: "/video/posters/img-7875-9x16.jpg",
    title: "Club night, arrival and the booth",
    caption: "Club night",
    offset: "md:mt-0",
  },
  {
    id: "v5",
    loop: "/video/v5-shortfilm-loop.mp4",
    full: "/video/v5-shortfilm-full.mp4",
    poster: "/video/posters/short-film-9x16.jpg",
    title: "Short film, blue light dance floor",
    caption: "Short film",
    offset: "md:mt-24",
  },
] as const;

/**
 * Club night (DROP): two vertical stories on the curtain light.
 * Desktop: staggered pair, mobile: a snap strip. A tap plays the full cut with sound.
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
      <ul className="relative mx-auto flex max-w-[1792px] snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--page-x)] md:justify-center md:gap-10 md:overflow-visible [&::-webkit-scrollbar]:hidden">
        {STORIES.map((s) => (
          <li
            key={s.id}
            className={`w-[72vw] shrink-0 snap-center md:w-[min(28vw,420px)] ${s.offset}`}
          >
            <FullPlayer
              src={s.full}
              poster={s.poster}
              vertical
              title={s.title}
              triggerClassName="group relative block aspect-[9/16] w-full overflow-hidden rounded-[var(--r-md)] text-left md:rounded-[var(--r-lg)]"
            >
              <LoopVideo
                src={s.loop}
                poster={s.poster}
                className="pointer-events-none absolute inset-0 size-full"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "var(--g-vignette)" }}
              />
              <span className="absolute bottom-4 left-4 grid size-14 place-items-center rounded-full bg-sun-500 text-white transition-colors duration-[var(--d-base)] group-hover:bg-dawn-400">
                <SoundIcon />
              </span>
              <span className="absolute bottom-6 right-4 text-meta font-medium uppercase tracking-[0.06em] text-white">
                {s.caption}
              </span>
              <span className="sr-only">{s.title}, play with sound</span>
            </FullPlayer>
          </li>
        ))}
      </ul>
    </section>
  );
}
