// Source: docs/CONTENT.md, slides 6-7. Only these numbers exist.
export type Milestone = {
  year: string;
  text: string;
  people?: number;
  note?: string;
};

export const milestones: Milestone[] = [
  { year: "2006", text: "Playing since FIFA World Cup 2006. DJ career start since 2006" },
  { year: "2013", text: "Played at the world festival Sensation for 35,000 people at the main event", people: 35000 },
  { year: "2013", text: "Took part in the Kazantip festival, one of the most legendary and world festivals" },
  { year: "2014", text: "Won the Thai Club Life Awards in the nomination Best DJ foreigner from Eastern Europe", note: "Source magazine name to be confirmed" },
  { year: "2017", text: "Performed in Nha Trang for more than 20,000 people on the day", people: 20000 },
  { year: "2022", text: "During FIFA World Cup Qatar 2022 he was a resident of the Zamna Doha Qatar world festival" },
  { year: "2022", text: "Participated as a DJ in FIFA World Cup Qatar 2022 Fan Fest, 3 stadium and 2 main stage" },
];

export const cities = { value: 120, label: "cities around the world" };

export const countries = [
  "Germany", "Italy", "Netherlands", "France", "Switzerland", "Latvia",
  "Russia", "Turkey", "Thailand", "Vietnam", "UAE", "Ukraine", "Greece",
  "Malaysia", "Singapore", "Qatar", "Egypt", "Mexico", "Philippines",
];
