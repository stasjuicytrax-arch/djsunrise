import { SunPill } from "@/components/shared/SunPill";
import { contacts } from "@/data/contacts";
import { residencies } from "@/data/residencies";
import { asset } from "@/lib/asset";

const PORTRAIT_POSITION = "52% 30%";

/**
 * Hero (TZ 3.1). Layers, back to front:
 * 1. studio portrait on the sunrise gradient (the photo itself is the light)
 * 2. giant SUNRISE, cropped by the bottom edge of the frame
 * 3. cut-out portrait, head and shoulders over the letters
 * 4. copy, CTA
 */
export function Hero() {
  const clubs = residencies.map((r) => r.club).join(" · ");

  return (
    <section id="top" className="px-[var(--page-x)] pt-[var(--page-x)]">
      <div className="hero-frame relative h-[calc(100svh-var(--page-x))] min-h-[560px] overflow-hidden rounded-b-[28px] bg-dawn-600 md:rounded-b-[var(--r-xl)]">
        {/* 1. portrait */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/brand/portrait-hero.jpg")}
          alt="Portrait of DJ SUNRISE in a black polo, arms crossed"
          width={1672}
          height={941}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
          style={{ objectPosition: PORTRAIT_POSITION }}
        />

        {/* scrim under the name: keeps white copy above 4.5:1 on the orange side */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(270deg, rgba(10,9,9,0.62) 0%, rgba(10,9,9,0.34) 28%, transparent 56%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(0deg, rgba(10,9,9,0.7) 0%, rgba(10,9,9,0.55) 38%, transparent 62%)",
          }}
        />

        {/* 2. the name */}
        <h1
          className="absolute inset-x-0 bottom-0 m-0 flex justify-center whitespace-nowrap font-display font-semibold uppercase text-white"
          style={{
            fontSize: "var(--t-name)",
            lineHeight: 0.8,
            letterSpacing: "-0.04em",
            transform: "translateY(3%)",
          }}
        >
          <span className="sr-only">SUNRISE, DJ, Bangkok, Pattaya</span>
          <span aria-hidden>SUNRISE</span>
        </h1>

        {/* 3. cut-out over the letters */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/brand/portrait-cutout.webp")}
          alt=""
          aria-hidden
          width={1672}
          height={941}
          decoding="async"
          className="pointer-events-none absolute inset-0 size-full object-cover"
          style={{
            objectPosition: PORTRAIT_POSITION,
            // head and shoulders only: the torso must not swallow the letters
            maskImage: "linear-gradient(180deg, #000 0%, #000 64%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 64%, transparent 80%)",
          }}
        />
        {/* 4. copy */}
        <div className="absolute inset-x-5 top-[54%] flex flex-col items-start gap-5 md:inset-x-auto md:right-8 md:top-1/2 md:w-[min(26rem,34vw)] md:-translate-y-1/2 lg:w-[26rem]">
          <p className="m-0 text-meta font-medium uppercase tracking-[0.06em] text-white">
            bangkok <span aria-hidden>{"//"}</span>
            <span className="sr-only">,</span> pattaya
          </p>
          <p className="m-0 font-display text-h3 font-medium leading-[1.1] tracking-[-0.015em] text-white">
            DJ Mag Top 100 Clubs resident.
          </p>
          <p className="m-0 text-meta font-medium uppercase tracking-[0.06em] text-white">{clubs}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
            <SunPill href={contacts.bookings.href} target="_blank" rel="noopener">
              Book a date
            </SunPill>
            <SunPill href="#showreel" variant="ghost">
              Watch showreel
            </SunPill>
          </div>
        </div>
      </div>
    </section>
  );
}
