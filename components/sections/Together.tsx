import { Orbits } from "@/components/shared/Orbits";
import { artistGroups } from "@/data/artists";
import { Reveal } from "@/components/shared/motion";

/**
 * Play together (LIST): three orbits of names around the sun.
 * "together" sits on the highlight pill, the only one on this screen.
 */
export function Together() {
  return (
    <section
      id="together"
      className="px-[var(--page-x)] pt-[var(--section-y)]"
    >
      <div className="mx-auto max-w-[1792px]">
        <h2 className="m-0 max-w-[16ch] font-display text-display font-semibold leading-[0.98] tracking-[-0.03em]">
          play{" "}
          <Reveal
            as="span"
            kind="wipe"
            duration={1.1}
            delay={0.15}
            className="inline-block rounded-full bg-sun-500 px-[0.32em] py-[0.04em] text-white"
          >
            together
          </Reveal>{" "}
          in clubs with Top 100 DJs
        </h2>

        <div className="mt-16">
          <Reveal kind="scale" duration={1.5} start="top 80%">
            <Orbits groups={artistGroups} className="mx-auto max-w-[1100px]" />
          </Reveal>
        </div>

        {/* orbit legend, desktop: which ring is which */}
        <ul className="mx-auto mt-10 hidden max-w-[1100px] justify-between gap-6 md:flex">
          {artistGroups.map((g) => (
            <li
              key={g.id}
              className="text-body font-medium text-bone-100"
            >
              {g.title}
              <span className="ml-2 font-mono text-fog-400">{g.names.length}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
