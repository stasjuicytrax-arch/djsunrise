# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Next.js 15 (App Router, TypeScript, static export), Tailwind CSS v4, shadcn/ui, Motion + GSAP + Lenis, Phosphor icons. Fixed by `docs/TZ.md` §6; deploy on Vercel.

## Users
Booking agencies and promoters. Demanding, scan fast, often on a phone. They decide within 30 to 60 seconds whether the artist is at the right level and whether to make contact.

## Product Purpose
One-page e-press-kit for DJ SUNRISE (Bangkok // Pattaya) that replaces the PDF "PromoKit SunRise". Success = the booker is convinced of the artist's level and reaches contact (WhatsApp or e-mail).

## Positioning
A press kit that behaves like the artist's night: one warm sunrise light in a dark club, built only from verified facts (residencies in DJ Mag Top 100 Clubs, 120 cities, Top 100 DJs played together, October tour of 11 dates).

## Operating Context
Content structure follows the 10 slides of the PromoKit PDF (`docs/TZ.md` §2). Language: English. Copy, names and numbers come only from `docs/CONTENT.md`; spelling fixes from that file's table are approved by the client (confirmed 2026-10-13).

## Capabilities and Constraints
- Videos V1 to V5 (`public/video/`) and all 11 tour dates are mandatory.
- 7 components from 21st.dev are mandatory and recoloured to design tokens (`docs/DESIGN-SYSTEM.md` §7.2).
- Gallery runs on placeholders (`public/gallery/`), swapped by editing `data/gallery.ts`.
- No em-dash or en-dash in visible text.
- Open: year and status of October Tour, main booking number confirmation, socials (none in PDF, do not add), domain, whether V6 is needed.

## Brand Commitments
Logo: red sun of 16 rays plus white wordmark. Divider `//`. Highlight pill on one word. Studio portrait on red-orange sunrise gradient. Visual system is fixed in `docs/DESIGN-SYSTEM.md` v2.

## Evidence on Hand
Portrait and cutout, logo PNG/SVG, 5 videos in 2 versions, 12 gallery placeholders, 10 poster crops (low resolution), PromoKit PDF. Absent and not to be fabricated: live photos, original posters, hat photo, social links, testimonials, prices.

## Product Principles
1. Facts only: nothing in the page that is not in the PromoKit.
2. Warm light in darkness: media carries colour, the interface recedes.
3. Fast to contact: a booking action is always one tap away.
4. Motion has meaning: sunrise at the start, sunset at the contact.
5. Works on a phone first, reduced-motion is a first-class version.

## Accessibility & Inclusion
Contrast per DESIGN-SYSTEM §3, keyboard everywhere, focus-visible, reduced-motion version, sr-only lists behind orbits and marquee.
