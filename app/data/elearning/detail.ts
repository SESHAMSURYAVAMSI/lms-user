/* ================= TYPES ================= */

export type CourseLecture = {
  title: string;
  duration: number; // minutes
  preview?: boolean;
  videoUrl?: string;
};

export type CourseWeek = {
  week: string;
  lectures: number;
  durationMinutes: number;
  items: CourseLecture[];
};

export type CourseDetail = {
  learn: string[];
  includes: string[];
  description: string[];
  content: CourseWeek[];
};

/* ================= DATA ================= */

export const COURSE_DETAIL: CourseDetail = {
  learn: [
    "Understand core clinical concepts",
    "Real-world case discussions",
    "Expert-led teaching sessions",
    "Latest treatment protocols",
  ],

  includes: [
    "On-demand video lectures",
    "Downloadable resources",
    "Certificate of completion",
    "Lifetime access",
  ],

  description: [
    "This course is designed for medical professionals seeking in-depth understanding of modern clinical practices.",
    "It provides real-world case discussions, expert insights, and evidence-based approaches.",
    "The structured modules ensure clarity, retention, and practical application in daily practice.",
  ],

  content: [
    {
      week: "Week 1: Introduction",
      lectures: 3,
      durationMinutes: 45,
      items: [
        {
          title: "Course Overview",
          duration: 10,
          preview: true,
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        {
          title: "Clinical Background",
          duration: 20,
        },
        {
          title: "Key Objectives",
          duration: 15,
        },
      ],
    },

    {
      week: "Week 2: Core Concepts",
      lectures: 4,
      durationMinutes: 65,
      items: [
        {
          title: "Anatomy Review",
          duration: 15,
          preview: true,
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        {
          title: "Diagnosis Methods",
          duration: 20,
        },
        {
          title: "Clinical Decision Making",
          duration: 15,
        },
        {
          title: "Case Study",
          duration: 15,
        },
      ],
    },
  ],
};
