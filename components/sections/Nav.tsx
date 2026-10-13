"use client";

import * as React from "react";
import { List, X } from "@phosphor-icons/react";
import { SunMark } from "@/components/shared/SunMark";
import { contacts } from "@/data/contacts";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { id: "residencies", label: "Residencies" },
  { id: "together", label: "Together" },
  { id: "progress", label: "Progress" },
  { id: "venues", label: "Venues" },
  { id: "gallery", label: "Gallery" },
  { id: "tour", label: "Tour" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * Top bar: sun mark on the left, pill with anchors and "Book" on the right.
 * Slides out on scroll down, back on scroll up (class toggle, no state per scroll).
 * Active anchor is white, the rest fog.
 */
export function Nav() {
  const barRef = React.useRef<HTMLElement>(null);
  const [active, setActive] = React.useState<string>("");
  const [menu, setMenu] = React.useState(false);

  React.useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const bar = barRef.current;
      if (bar) {
        const hide = y > last && y > 160;
        bar.dataset.hidden = hide ? "true" : "false";
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const els = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (e): e is HTMLElement => !!e,
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <>
      <header
        ref={barRef}
        data-hidden="false"
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[var(--page-x)] pt-4",
          "transition-transform duration-[var(--d-base)] ease-[var(--ease-out)] data-[hidden=true]:-translate-y-[120%]",
        )}
      >
        <a
          href="#top"
          aria-label="SUNRISE, back to top"
          className="grid size-14 place-items-center rounded-full bg-ink-900/80 backdrop-blur-[16px]"
        >
          <SunMark className="w-8" />
        </a>

        <nav
          aria-label="Sections"
          className="hidden h-14 items-center gap-1 rounded-[var(--r-pill)] bg-ink-900/80 py-2 pl-3 pr-2 backdrop-blur-[16px] lg:flex"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={active === l.id ? "true" : undefined}
              className={cn(
                "rounded-full px-3 py-2 text-meta font-medium uppercase tracking-[0.06em] no-underline transition-colors duration-[var(--d-fast)]",
                active === l.id ? "text-white" : "text-fog-400 hover:text-white",
              )}
            >
              {l.label}
            </a>
          ))}
          <a
            href={contacts.bookings.href}
            className="ml-2 inline-flex h-10 items-center rounded-full bg-sun-500 px-5 text-meta font-semibold uppercase tracking-[0.06em] text-white no-underline transition-colors duration-[var(--d-base)] hover:bg-dawn-400 hover:text-white"
          >
            Book
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={contacts.bookings.href}
            className="inline-flex h-14 items-center rounded-full bg-sun-500 px-6 text-meta font-semibold uppercase tracking-[0.06em] text-white no-underline hover:bg-dawn-400 hover:text-white"
          >
            Book
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menu}
            onClick={() => setMenu(true)}
            className="grid size-14 place-items-center rounded-full bg-ink-900/80 text-white backdrop-blur-[16px]"
          >
            <List size={24} />
          </button>
        </div>
      </header>

      {menu ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-ink-950 px-[var(--page-x)] py-4"
        >
          <div className="flex justify-end">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenu(false)}
              className="grid size-14 place-items-center rounded-full bg-ink-900 text-white"
            >
              <X size={24} />
            </button>
          </div>
          <ul className="mt-8 flex flex-1 flex-col justify-center gap-2">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setMenu(false)}
                  className="block font-display text-display font-semibold leading-[1.02] tracking-[-0.03em] text-white no-underline"
                >
                  {l.label.toLowerCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
