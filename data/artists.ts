// Source: docs/CONTENT.md, slides 3-5 (spelling fixes approved 2026-10-13).
export type ArtistGroup = {
  id: "top100" | "star" | "festival";
  title: string;
  heading: string;
  names: string[];
};

export const artistGroups: ArtistGroup[] = [
  {
    id: "top100",
    title: "Top 100 DJs",
    heading: "Play together in clubs with Top 100 DJs",
    names: [
      "Blasterjaxx", "Mariana BO", "Pink Panda", "Rave Republic", "Plastik Funk",
      "Kura", "Kaaze", "22 Bullets", "R3HAB", "Vinai",
      "Kaka", "Lizzy Wang", "Le Twins", "Diego Miranda", "Aryue",
    ],
  },
  {
    id: "star",
    title: "Star DJs & artists",
    heading: "Also star DJs and artists play together in clubs",
    names: [
      "Play N Skillz", "Blinders", "Sevenn", "Lil Pump",
      "Mykris", "Tay James", "Vion Konger", "Lil Jon", "Sick Individuals",
      "39 Kingdom", "Gian Nobilee", "Renato's", "Wolfpack", "Martin Jensen",
      "Juan Cuba", "ME2", "Kid Ink", "Aymoune",
    ],
  },
  {
    id: "festival",
    title: "Festival warm-ups",
    heading: "Together plays in same festivals warm up",
    names: [
      "Timmy Trumpet", "R3HAB", "W&W", "Tujamo", "Don Diablo", "Dyro",
      "Vini Vici", "Vinai", "Valentino Khan", "Mike Williams", "Artbat",
      "Patrice Bäumel", "Serge Devant", "Mr Black", "Liu", "Marco Carola",
      "Sven Väth", "Slushii",
    ],
  },
];

// Name-strip under hero (TZ §3 1a): 8 names, all from slide 3.
export const nameStrip = [
  "Blasterjaxx", "R3HAB", "Vinai", "Le Twins",
  "Diego Miranda", "Plastik Funk", "Kaaze", "22 Bullets",
];
export const nameStripLead = "played together with";
