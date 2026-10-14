// Live photos of the shows (3:2, public/gallery). Replace files or edit this list to change the ribbon.
export type GalleryImage = { src: string; alt: string; w: number; h: number };

export const galleryTitle = "on stage";
export const galleryCaption = "festivals · clubs";

export const gallery: GalleryImage[] = [
  { src: "/gallery/show-01-club.jpg", alt: "SUNRISE playing a club night", w: 2000, h: 1333 },
  { src: "/gallery/show-02-club.jpg", alt: "SUNRISE at the booth in a club", w: 2000, h: 1333 },
  { src: "/gallery/show-03-festival.jpg", alt: "SUNRISE on a festival stage", w: 2000, h: 1333 },
  { src: "/gallery/show-04-festival.jpg", alt: "Festival crowd in front of the main stage", w: 2000, h: 1333 },
  { src: "/gallery/show-05-festival.jpg", alt: "SUNRISE performing at a festival", w: 2000, h: 1334 },
  { src: "/gallery/show-06-festival.jpg", alt: "Festival stage lights", w: 2000, h: 1334 },
  { src: "/gallery/show-07-festival.jpg", alt: "SUNRISE at a festival, night", w: 2000, h: 1334 },
];
