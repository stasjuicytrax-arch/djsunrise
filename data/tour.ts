// Source: docs/CONTENT.md, slide 9. All 11 dates are mandatory. Year is not shown (open question).
export type TourDate = { date: string; city: string; country: string; iso: string };

export const tourTitle = "October tour";

export const tour: TourDate[] = [
  { date: "02.10", city: "Munich", country: "Germany", iso: "DE" },
  { date: "04.10", city: "Berlin", country: "Germany", iso: "DE" },
  { date: "05.10", city: "Dortmund", country: "Germany", iso: "DE" },
  { date: "06.10", city: "Milan", country: "Italy", iso: "IT" },
  { date: "11.10", city: "Amsterdam", country: "Netherlands", iso: "NL" },
  { date: "12.10", city: "Osnabrück", country: "Germany", iso: "DE" },
  { date: "18.10", city: "Riga", country: "Latvia", iso: "LV" },
  { date: "19.10", city: "Cloppenburg", country: "Germany", iso: "DE" },
  { date: "25.10", city: "Lausanne", country: "Switzerland", iso: "CH" },
  { date: "26.10", city: "Montreux", country: "Switzerland", iso: "CH" },
  { date: "31.10", city: "Geneva", country: "Switzerland", iso: "CH" },
];

export const tourSummary = [
  { value: 11, label: "shows" },
  { value: 6, label: "countries" },
  { value: 1, label: "month" },
];
