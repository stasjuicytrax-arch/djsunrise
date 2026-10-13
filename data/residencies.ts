// Source: docs/CONTENT.md, slide 2.
export type Residency = {
  id: "republic" | "bootshaus" | "spaceplus";
  club: string;
  rank: number;
  role: string;
  city: string;
  country: string;
  note?: string;
  video?: { loop: string; full: string; poster: string };
};

export const residenciesTitle = "DJ Mag Top 100 Clubs";

export const residencies: Residency[] = [
  {
    id: "republic",
    club: "Republic",
    rank: 90,
    role: "Music director, resident · Republic Club & Lounge",
    city: "Pattaya",
    country: "Thailand",
    note: "Number #1 club in Pattaya",
  },
  {
    id: "bootshaus",
    club: "Bootshaus",
    rank: 7,
    role: "International resident · #7 club in the world",
    city: "Cologne",
    country: "Germany",
  },
  {
    id: "spaceplus",
    club: "Space Plus",
    rank: 43,
    role: "Resident club #43 in the world",
    city: "Bangkok",
    country: "Thailand",
    video: {
      loop: "/video/v3-spaceplus-loop.mp4",
      full: "/video/v3-spaceplus-full.mp4",
      poster: "/video/posters/spaceplus-pete-d-9x16.jpg",
    },
  },
];
