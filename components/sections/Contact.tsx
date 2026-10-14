import { CopyButton } from "@/components/shared/CopyButton";
import { SunPill } from "@/components/shared/SunPill";
import { SunriseHaze } from "@/components/shared/SunriseHaze";
import { contacts } from "@/data/contacts";
import { asset } from "@/lib/asset";

const ROWS = [
  { c: contacts.bookings, label: "Bookings, WhatsApp", copy: "bookings number" },
  { c: contacts.email, label: "E-mail", copy: "e-mail" },
  { c: contacts.phone, label: "Phone", copy: "phone number" },
] as const;

/**
 * Contact (DROP + Persuade). Velvet Haze as a sunset: light rises from the
 * bottom, the top fades from --ink-950 so there is no seam with Tour. The
 * portrait stands on the same thin horizon line as in the hero; the footer
 * follows right under it.
 */
export function Contact() {
  return (
    <div id="contact" className="relative">
      {/* erodes the red fringe of the cut-out by 2px and softens the edge */}
      <svg width="0" height="0" aria-hidden className="absolute">
        <filter id="portrait-edge" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="erode" radius="2" result="core" />
          <feGaussianBlur in="core" stdDeviation="0.9" result="soft" />
          <feComposite in="SourceGraphic" in2="soft" operator="in" />
        </filter>
      </svg>

      <SunriseHaze>
        {/* seam-free entry: 100% ink at the top, clear by 35% of the height */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[35%]"
          style={{ background: "linear-gradient(180deg, var(--ink-950) 0%, transparent 100%)" }}
        />

        {/* portrait, bottom right, standing on the horizon */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/brand/portrait-cutout.webp")}
          alt=""
          aria-hidden
          loading="lazy"
          className="pointer-events-none absolute bottom-px hidden h-[82%] w-auto max-w-none object-contain object-bottom md:block md:-right-[16%] lg:-right-[10%]"
          style={{ filter: "url(#portrait-edge)" }}
        />

        <div className="relative flex min-h-[max(100svh,760px)] flex-1 flex-col justify-end px-[var(--page-x)] pb-[clamp(48px,9vh,96px)] pt-[30svh]">
          <h2 className="m-0 font-display text-h2 font-medium leading-[1] tracking-[-0.025em] text-white">
            <span className="text-sun-500">{"//"}</span> contact
          </h2>

          <p className="m-0 mt-6 font-display text-display font-semibold leading-[0.95] tracking-[-0.03em] text-white">
            Book SUNRISE
          </p>

          <div className="pointer-events-auto mt-8">
            <SunPill href={contacts.bookings.href} target="_blank" rel="noopener">
              Book on WhatsApp
            </SunPill>
          </div>

          <ul className="m-0 mt-14 flex max-w-[34rem] list-none flex-col p-0">
            {ROWS.map(({ c, label, copy }) => (
              <li
                key={c.kind}
                className="group/row pointer-events-auto flex items-center justify-between gap-4 border-b border-white/10 py-3.5"
              >
                <span className="grid gap-1">
                  <span className="text-micro font-medium uppercase tracking-[0.1em] text-fog-400">
                    {label}
                  </span>
                  <a
                    href={c.href}
                    {...(c.kind === "whatsapp" ? { target: "_blank", rel: "noopener" } : {})}
                    className="break-all font-mono text-data text-white no-underline hover:text-sun-400"
                  >
                    {c.display}
                  </a>
                </span>
                <CopyButton
                  value={c.display}
                  label={copy}
                  variant="text"
                  className="shrink-0 md:opacity-0 md:transition-opacity md:group-hover/row:opacity-100 md:focus-visible:opacity-100"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* the same thin horizon line as in the hero, footer sits right under it */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--dawn-400) 20%, var(--dawn-400) 80%, transparent)",
          }}
        />
      </SunriseHaze>
    </div>
  );
}
