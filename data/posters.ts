// Posters wall: 10 posters (public/posters, low-res crops until originals arrive)
// mixed with 14 video stills (public/stills, webp). Posters never touch in a column.
export type WallItem = {
  src: string;
  alt: string;
  w: number;
  h: number;
  kind: "poster" | "still";
  /** The October Tour poster: its lightbox links to the tour board. */
  tour?: boolean;
};

export const wallTitle = "posters & live frames";

export const wallColumns: WallItem[][] = [
  [
    {
      "src": "/posters/poster-01.jpg",
      "alt": "Poster: 10 October, DJ Sunrise",
      "w": 192,
      "h": 264,
      "kind": "poster"
    },
    {
      "src": "/stills/club-night-02.webp",
      "alt": "Club night, from the booth",
      "w": 900,
      "h": 1600,
      "kind": "still"
    },
    {
      "src": "/posters/poster-06.jpg",
      "alt": "Poster: Kudo, Sexy Fruits Pool Party",
      "w": 192,
      "h": 266,
      "kind": "poster"
    },
    {
      "src": "/stills/festival-grozzman-03.webp",
      "alt": "Festival stage",
      "w": 1600,
      "h": 800,
      "kind": "still"
    },
    {
      "src": "/stills/club-night-09.webp",
      "alt": "Club night, red smoke",
      "w": 900,
      "h": 1600,
      "kind": "still"
    },
    {
      "src": "/posters/poster-09.jpg",
      "alt": "Poster: DJ Sunrise, 26.10",
      "w": 196,
      "h": 266,
      "kind": "poster"
    }
  ],
  [
    {
      "src": "/stills/festival-grozzman-12.webp",
      "alt": "Festival crowd",
      "w": 1600,
      "h": 800,
      "kind": "still"
    },
    {
      "src": "/posters/poster-02.jpg",
      "alt": "Poster: Republic, DJ Sunrise",
      "w": 202,
      "h": 264,
      "kind": "poster"
    },
    {
      "src": "/stills/club-night-13.webp",
      "alt": "Club night, dance floor",
      "w": 900,
      "h": 1600,
      "kind": "still"
    },
    {
      "src": "/stills/spaceplus-night-11.webp",
      "alt": "Space Plus, night",
      "w": 900,
      "h": 1600,
      "kind": "still"
    },
    {
      "src": "/posters/poster-05.jpg",
      "alt": "Poster: October Tour, DJ Sunrise",
      "w": 198,
      "h": 264,
      "kind": "poster",
      "tour": true
    },
    {
      "src": "/stills/festival-grozzman-22.webp",
      "alt": "Festival, SUNRISE b2b Grozzman",
      "w": 1600,
      "h": 800,
      "kind": "still"
    }
  ],
  [
    {
      "src": "/posters/poster-07.jpg",
      "alt": "Poster: Sunrise, beach",
      "w": 202,
      "h": 266,
      "kind": "poster"
    },
    {
      "src": "/stills/spaceplus-night-23.webp",
      "alt": "Space Plus, crowd",
      "w": 900,
      "h": 1600,
      "kind": "still"
    },
    {
      "src": "/stills/festival-grozzman-25.webp",
      "alt": "Festival, main stage",
      "w": 1600,
      "h": 800,
      "kind": "still"
    },
    {
      "src": "/posters/poster-03.jpg",
      "alt": "Poster: Lunar New Year",
      "w": 195,
      "h": 264,
      "kind": "poster"
    },
    {
      "src": "/stills/spaceplus-pete-d-05.webp",
      "alt": "Space Plus, lasers",
      "w": 900,
      "h": 1600,
      "kind": "still"
    },
    {
      "src": "/posters/poster-10.jpg",
      "alt": "Poster: Record, DJ Sunrise, Moscow",
      "w": 198,
      "h": 266,
      "kind": "poster"
    }
  ],
  [
    {
      "src": "/stills/club-night-22.webp",
      "alt": "Club night, lights",
      "w": 900,
      "h": 1600,
      "kind": "still"
    },
    {
      "src": "/stills/festival-grozzman-30.webp",
      "alt": "Festival lights",
      "w": 1600,
      "h": 800,
      "kind": "still"
    },
    {
      "src": "/posters/poster-04.jpg",
      "alt": "Poster: DJ Sunrise",
      "w": 196,
      "h": 264,
      "kind": "poster"
    },
    {
      "src": "/stills/spaceplus-pete-d-12.webp",
      "alt": "Space Plus, booth",
      "w": 900,
      "h": 1600,
      "kind": "still"
    },
    {
      "src": "/posters/poster-08.jpg",
      "alt": "Poster: Sunrise Friday Night",
      "w": 195,
      "h": 266,
      "kind": "poster"
    },
    {
      "src": "/stills/festival-grozzman-32.webp",
      "alt": "Festival, drop",
      "w": 1600,
      "h": 800,
      "kind": "still"
    }
  ]
];

/** Flat list in reading order (column by column, row by row) for the lightbox. */
export const wallItems: WallItem[] = Array.from({ length: 6 }).flatMap((_, row) =>
  wallColumns.map((c) => c[row]),
);
