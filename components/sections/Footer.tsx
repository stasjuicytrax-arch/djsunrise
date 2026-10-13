import { GiantWordmark } from "@/components/shared/GiantWordmark";
import { NAV_LINKS } from "@/data/nav";
import { contacts } from "@/data/contacts";
import { asset } from "@/lib/asset";

/** Footer: link columns, then the name cropped by the bottom edge. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="overflow-hidden bg-ink-950 px-[var(--page-x)] pt-[var(--section-y)]">
      <div className="mx-auto grid max-w-[1792px] gap-12 md:grid-cols-4">
        <nav aria-label="Footer sections">
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-body text-bone-100">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          <li>
            <a href={contacts.bookings.href} className="font-mono text-data text-bone-100">
              {contacts.bookings.display}
            </a>
          </li>
          <li>
            <a href={contacts.email.href} className="font-mono text-data text-bone-100">
              {contacts.email.display}
            </a>
          </li>
          <li>
            <a href={contacts.phone.href} className="font-mono text-data text-bone-100">
              {contacts.phone.display}
            </a>
          </li>
        </ul>

        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          <li>
            <a
              href={asset("/PromoKit-SunRise.pdf")}
              download
              className="text-body text-bone-100"
            >
              Download PDF press kit
            </a>
          </li>
          <li>
            <a href="#top" className="text-body text-bone-100">
              Back to top
            </a>
          </li>
        </ul>

        <div className="md:text-right">
          <p className="m-0 text-body text-bone-100">
            bangkok <span aria-hidden>{"//"}</span>
            <span className="sr-only">,</span> pattaya
          </p>
          <p className="m-0 mt-2 text-body text-fog-400">&copy; SUNRISE {year}</p>
        </div>
      </div>

      <GiantWordmark className="mt-[calc(var(--section-y)*0.5)]" />
    </footer>
  );
}
