// Source: docs/CONTENT.md, slide 9. Low-res crops until originals arrive.
export type Poster = { src: string; alt: string; w: number; h: number; tour?: boolean };

export const posters: Poster[] = [
  { src: "/posters/poster-01.jpg", alt: "Poster: 10 October, DJ Sunrise", w: 192, h: 264 },
  { src: "/posters/poster-02.jpg", alt: "Poster: Republic, DJ Sunrise", w: 202, h: 264 },
  { src: "/posters/poster-03.jpg", alt: "Poster: Lunar New Year", w: 195, h: 264 },
  { src: "/posters/poster-04.jpg", alt: "Poster: DJ Sunrise", w: 196, h: 264 },
  { src: "/posters/poster-05.jpg", alt: "Poster: October Tour, DJ Sunrise", w: 198, h: 264, tour: true },
  { src: "/posters/poster-06.jpg", alt: "Poster: Kudo, Sexy Fruits Pool Party", w: 192, h: 266 },
  { src: "/posters/poster-07.jpg", alt: "Poster: Sunrise, beach", w: 202, h: 266 },
  { src: "/posters/poster-08.jpg", alt: "Poster: Sunrise Friday Night", w: 195, h: 266 },
  { src: "/posters/poster-09.jpg", alt: "Poster: DJ Sunrise, 26.10", w: 196, h: 266 },
  { src: "/posters/poster-10.jpg", alt: "Poster: Record, DJ Sunrise, Moscow", w: 198, h: 266 },
];
