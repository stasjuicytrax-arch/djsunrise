import { NAV_LINKS } from "@/data/nav";
import { contacts } from "@/data/contacts";
import { asset } from "@/lib/asset";

/**
 * Footer: one compact band under the thin dawn-orange horizon line (the
 * same line as in the hero): section links, contacts, press kit, place, (c).
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-ink-950 px-[clamp(16px,3vw,40px)] pb-10 pt-12">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--dawn-400) 20%, var(--dawn-400) 80%, transparent)",
        }}
      />
      <div className="mx-auto grid max-w-[1792px] gap-x-10 gap-y-8 text-body md:grid-cols-[1.4fr_1fr_1fr_auto]">
        <nav aria-label="Footer sections">
          <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="inline-block py-2 text-bone-100">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          <li>
            <a href={contacts.bookings.href} className="inline-block py-1 font-mono text-data text-bone-100">
              {contacts.bookings.display}
            </a>
          </li>
          <li>
            <a href={contacts.email.href} className="inline-block break-all py-1 font-mono text-data text-bone-100">
              {contacts.email.display}
            </a>
          </li>
          <li>
            <a href={contacts.phone.href} className="font-mono text-data text-bone-100">
              {contacts.phone.display}
            </a>
          </li>
        </ul>

        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          <li>
            <a href={asset("/PromoKit-SunRise.pdf")} download className="inline-block py-2 text-bone-100">
              Download PDF press kit
            </a>
          </li>
          <li>
            <a href="#top" className="inline-block py-2 text-bone-100">
              Back to top
            </a>
          </li>
        </ul>

        <div className="md:text-right">
          <p className="m-0 text-bone-100">
            bangkok <span aria-hidden className="text-dawn-400">{"//"}</span>
            <span className="sr-only">,</span> pattaya
          </p>
          <p className="m-0 mt-2 text-fog-400">&copy; SUNRISE {year}</p>
        </div>
      </div>
    </footer>
  );
}
