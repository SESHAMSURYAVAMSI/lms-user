// data/elearning.ts
export type ElearningCourse = {
  id: number;
  title: string;
  dateRange: string;
  startDate: string;
  endDate: string;
  time: string;
  type?: string;
  mode?: string;
  image: string;
  price: number;
  popularity: number;
  videoUrl?: string;
  createdAt?: string;
};

export const ELEARNING_COURSES: ElearningCourse[] = [
  {
    id: 1,
    title: "USI ISU Webinar - Renal Transplantation Subsection",
    startDate: "2026-04-17",
    endDate: "2026-04-18",
    dateRange: "17 Apr 2026 - 18 Apr 2026",
    time: "7:30 PM to 9:30 PM",
    type: "USI Webinar",
    mode: "Virtual",
    image: "/images/learning.png",
    price: 0,
    popularity: 90,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    createdAt: "2026-04-17",
  },
  {
    id: 2,
    title: "Smart Learning - Urology Advances",
    startDate: "2026-06-20",
    endDate: "2026-06-21",
    dateRange: "20 Jun 2026 - 21 Jun 2026",
    time: "8:00 PM to 9:30 PM",
    type: "Smart Learning Program",
    mode: "Virtual",
    image: "/images/learning.png",
    price: 499,
    popularity: 120,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    createdAt: "2026-06-20",
  },
  {
    id: 3,
    title: "USI ISU Webinar - Pediatric Urology",
    startDate: "2025-11-02",
    endDate: "2025-11-02",
    dateRange: "02 Nov 2025",
    time: "6:00 PM to 8:00 PM",
    type: "USI Webinar",
    mode: "Virtual",
    image: "/images/learning.png",
    price: 0,
    popularity: 60,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    createdAt: "2025-11-02",
  },
  {
    id: 4,
    title: "USI Webinar - Renal Transplantation",
    startDate: "2026-04-17",
    endDate: "2026-04-18",
    dateRange: "17 Apr 2026 - 18 Apr 2026",
    time: "7:30 PM - 9:30 PM",
    type: "USI Webinar",
    mode: "Virtual",
    image: "/images/learning.png",
    price: 0,
    popularity: 120,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    createdAt: "2026-04-17",
  },
  {
    id: 5,
    title: "Advanced Cardiology Updates",
    startDate: "2026-05-05",
    endDate: "2026-05-05",
    dateRange: "05 May 2026",
    time: "6:00 PM - 8:00 PM",
    type: "Advanced Program",
    mode: "Virtual",
    image: "/images/learning.png",
    price: 499,
    popularity: 340,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    createdAt: "2026-05-05",
  },
];
