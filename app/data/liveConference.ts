export type LiveConference = {
  id: number;
  title: string;
  dateRange: string;
  time: string;
  mode: "Virtual" | "In-Person";
  image: string;
  price: number;
};

export const LIVE_CONFERENCES: LiveConference[] = [
  {
    id: 1,
    title: "USI ISU Webinar – Renal Transplantation Subsection",
    dateRange: "17 Apr 2026 – 18 Apr 2026",
    time: "7:30 PM to 9:30 PM",
    mode: "Virtual",
    image: "/images/learning.png",
    price: 0,
  },
  {
    id: 2,
    title: "USI ISU Webinar – Renal Transplantation Subsection",
    dateRange: "17 Apr 2026 – 18 Apr 2026",
    time: "7:30 PM to 9:30 PM",
    mode: "Virtual",
    image: "/images/learning.png",
    price: 499,
  },
];
