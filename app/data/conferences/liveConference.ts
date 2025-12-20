export type LiveConference = {
  id: number;
  title: string;

  // ✅ used in list cards
  dateRange: string;

  // ✅ used in detail pages / quiz logic
  startDate: string;
  endDate: string;

  time: string;
  mode: "Virtual" | "In-Person";
  image: string;
  price: number;
  videoUrl?: string;
};

export const LIVE_CONFERENCES: LiveConference[] = [
  {
    id: 1,
    title: "USI ISU Conference – Renal Transplantation Subsection",
    dateRange: "17 Apr 2026 – 18 Apr 2026",
    startDate: "2026-04-17",
    endDate: "2026-04-18",
    time: "7:30 PM to 9:30 PM",
    mode: "Virtual",
    image: "/images/learning.png",
    price: 0,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
  },
  {
    id: 2,
    title: "USI ISU Conference – Renal Transplantation Subsection",
    dateRange: "17 Apr 2026 – 18 Apr 2026",
    startDate: "2026-04-17",
    endDate: "2026-04-18",
    time: "7:30 PM to 9:30 PM",
    mode: "Virtual",
    image: "/images/learning.png",
    price: 499,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
  },
  {
    id: 3,
    title: "USI ISU Conference – Renal Transplantation Subsection",
    dateRange: "17 Apr 2026 – 18 Apr 2026",
    startDate: "2026-04-17",
    endDate: "2026-04-18",
    time: "7:30 PM to 9:30 PM",
    mode: "Virtual",
    image: "/images/learning.png",
    price: 0,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
  },
  {
    id: 4,
    title: "USI ISU Conference – Renal Transplantation Subsection",
    dateRange: "17 Apr 2026 – 18 Apr 2026",
    startDate: "2026-04-17",
    endDate: "2026-04-18",
    time: "7:30 PM to 9:30 PM",
    mode: "Virtual",
    image: "/images/learning.png",
    price: 0,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
  },
  {
    id: 5,
    title: "USI ISU Conference – Renal Transplantation Subsection",
    dateRange: "17 Apr 2026 – 18 Apr 2026",
    startDate: "2026-04-17",
    endDate: "2026-04-18",
    time: "7:30 PM to 9:30 PM",
    mode: "Virtual",
    image: "/images/learning.png",
    price: 0,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
  },
];
