// Source: docs/CONTENT.md, slide 8 (34 venues, spelling fixes approved 2026-10-13).
export type Region = "Asia" | "Middle East" | "Europe" | "Americas";

export type Venue = {
  club: string;
  city: string;
  country: string;
  region: Region;
  /** Tour date this venue links to (tour.ts `date`), if any. */
  tour?: string;
};

export const regions: ("All" | Region)[] = ["All", "Asia", "Middle East", "Europe", "Americas"];

export const venues: Venue[] = [
  { club: "Epic", city: "Boracay", country: "Philippines", region: "Asia" },
  { club: "Blu", city: "Dubai", country: "UAE", region: "Middle East" },
  { club: "Secret Room", city: "Dubai", country: "UAE", region: "Middle East" },
  { club: "Five Beach", city: "Dubai", country: "UAE", region: "Middle East" },
  { club: "Praia", city: "Dubai", country: "UAE", region: "Middle East" },
  { club: "OSH", city: "Dubai", country: "UAE", region: "Middle East" },
  { club: "Kudo Beach", city: "Phuket", country: "Thailand", region: "Asia" },
  { club: "Republic", city: "Pattaya", country: "Thailand", region: "Asia" },
  { club: "Z Club", city: "Nha Trang", country: "Vietnam", region: "Asia" },
  { club: "Envy", city: "Ho Chi Minh", country: "Vietnam", region: "Asia" },
  { club: "Rush Hour", city: "Dortmund", country: "Germany", region: "Europe", tour: "05.10" },
  { club: "Bel Air", city: "Cloppenburg", country: "Germany", region: "Europe", tour: "19.10" },
  { club: "Mio", city: "Berlin", country: "Germany", region: "Europe", tour: "04.10" },
  { club: "Watergate", city: "Berlin", country: "Germany", region: "Europe", tour: "04.10" },
  { club: "Pacha", city: "Munich", country: "Germany", region: "Europe", tour: "02.10" },
  { club: "My House", city: "Dresden", country: "Germany", region: "Europe" },
  { club: "Escape", city: "Amsterdam", country: "Netherlands", region: "Europe", tour: "11.10" },
  { club: "Duomo Festival", city: "Milan", country: "Italy", region: "Europe", tour: "06.10" },
  { club: "First Club", city: "Riga", country: "Latvia", region: "Europe", tour: "18.10" },
  { club: "Soho Rooms", city: "Moscow", country: "Russia", region: "Europe" },
  { club: "Angels Fashion Place", city: "Voronezh", country: "Russia", region: "Europe" },
  { club: "Skybar", city: "Kyiv", country: "Ukraine", region: "Europe" },
  { club: "Ibiza", city: "Odesa", country: "Ukraine", region: "Europe" },
  { club: "Panorama Lounge", city: "Kharkiv", country: "Ukraine", region: "Europe" },
  { club: "Kazantip", city: "Popovka", country: "Ukraine", region: "Europe" },
  { club: "Mandarin Oriental", city: "Zurich", country: "Switzerland", region: "Europe" },
  { club: "Four Seasons Hotel", city: "Maldives", country: "Maldives", region: "Asia" },
  { club: "Rixos Sungate", city: "Kemer", country: "Turkey", region: "Europe" },
  { club: "Lijo", city: "Bodrum", country: "Turkey", region: "Europe" },
  { club: "Buddha Bar", city: "Sharm El Sheikh", country: "Egypt", region: "Middle East" },
  { club: "Buddha Bar", city: "Monte Carlo", country: "Monaco", region: "Europe" },
  { club: "Zouk", city: "Kuala Lumpur", country: "Malaysia", region: "Asia" },
  { club: "Mandala", city: "Cancun", country: "Mexico", region: "Americas" },
  { club: "Mandala Beach", city: "Cancun", country: "Mexico", region: "Americas" },
];
