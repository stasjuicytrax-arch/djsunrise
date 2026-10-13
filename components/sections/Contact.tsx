import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { CopyButton } from "@/components/shared/CopyButton";
import { SunriseHaze } from "@/components/shared/SunriseHaze";
import { contacts } from "@/data/contacts";
import { asset } from "@/lib/asset";

/**
 * Contact (DROP + Persuade). Velvet Haze (21st.dev, ember palette) is the
 * section itself; content sits in its dark lower part, links opt back into
 * pointer events. The sunset (step 4) is added on top of this.
 */
export function Contact() {
  const rows = [
    { c: contacts.email, mono: true },
    { c: contacts.phone, mono: true },
  ];

  return (
    <div id="contact">
      <SunriseHaze className="min-h-[max(100svh,760px)]">
        <div className="relative flex min-h-[inherit] flex-1 flex-col justify-end px-[var(--page-x)] pb-[var(--page-x)] pt-[28svh]">
          {/* cut-out portrait in the warm light, right side */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/brand/portrait-cutout.webp")}
            alt=""
            aria-hidden
            loading="lazy"
            className="pointer-events-none absolute bottom-0 right-0 hidden h-[78%] w-auto max-w-none object-contain object-bottom md:block md:-right-[12%]"
            style={{
              maskImage: "linear-gradient(180deg, #000 70%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(180deg, #000 70%, transparent 100%)",
            }}
          />

          <h2 className="relative m-0 font-display text-display font-semibold leading-[0.95] tracking-[-0.03em] text-white">
            <span className="text-sun-500">{"//"}</span> contact
          </h2>

          <div className="relative mt-10 flex flex-col gap-10 md:max-w-[min(60%,44rem)]">
            {/* main CTA: notch card with the sun button in the cut */}
            <a
              href={contacts.bookings.href}
              target="_blank"
              rel="noopener"
              className="group pointer-events-auto relative block overflow-hidden rounded-[var(--r-lg)] p-6 pr-24 text-white md:p-8 md:pr-28 no-underline hover:text-white"
              style={{ background: "var(--g-dawn)" }}
            >
              <span className="block font-display text-h2 font-semibold leading-[1.02] tracking-[-0.025em]">
                book sunrise
              </span>
              <span className="mt-3 block font-mono text-data">{contacts.bookings.display}</span>
              <span
                aria-hidden
                className="absolute -bottom-1 -right-1 grid size-24 place-items-center rounded-tl-[var(--r-lg)] bg-ink-950"
              >
                <span className="grid size-16 place-items-center rounded-full bg-sun-500 text-white transition-transform duration-[var(--d-base)] ease-[var(--ease-out)] group-hover:rotate-[11.25deg] group-hover:bg-dawn-400">
                  <ArrowUpRight size={28} weight="bold" />
                </span>
              </span>
            </a>

            <ul className="m-0 flex list-none flex-col gap-4 p-0">
              {rows.map(({ c }) => (
                <li key={c.kind} className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <span className="w-24 text-meta font-medium uppercase tracking-[0.06em] text-white">
                    {c.label}
                  </span>
                  <a
                    href={c.href}
                    className="pointer-events-auto min-w-0 break-all font-mono text-data text-white md:min-w-[19rem]"
                  >
                    {c.display}
                  </a>
                  <CopyButton value={c.display} label={c.label} />
                </li>
              ))}
              <li className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="w-20 text-meta font-medium uppercase tracking-[0.06em] text-white">
                  {contacts.bookings.label}
                </span>
                <a
                  href={contacts.bookings.href}
                  target="_blank"
                  rel="noopener"
                  className="pointer-events-auto font-mono text-data text-white"
                >
                  WhatsApp {contacts.bookings.display}
                </a>
                <CopyButton value={contacts.bookings.display} label="bookings number" />
              </li>
            </ul>
          </div>
        </div>
      </SunriseHaze>
    </div>
  );
}
