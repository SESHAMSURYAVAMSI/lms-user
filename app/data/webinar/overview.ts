// overview data per webinar id
export const overviews = {
  1: {
    description:
      "This webinar focuses on renal transplantation best practices and case studies.",
    highlights: ["3 Sessions", "12 Videos", "50 mins Duration"],
    // initial comments (will be loaded to component state)
    comments: [
      {
        id: "c1",
        author: "Jane Doe",
        profile: "/images/dravatar.jpg",
        text: "Excellent session last time!",
        date: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      },
      {
        id: "c2",
        author: "John Smith",
        profile: "/images/dravatar.jpg",
        text: "Looking forward to this.",
        date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },

  2: {
    description:
      "This webinar focuses on urology advances and smart learning modules.",
    highlights: ["Live Q&A", "Certificate Available"],
    comments: [],
  },

  3: {
    description: "Pediatric urology — updates and case discussions.",
    highlights: ["Case-based learning"],
    comments: [],
  },

  4: {
    description:
      "A complete detailed discussion and training session on renal transplantation.",
    highlights: ["Hands-on demo", "Expert panel discussion"],
    comments: [
      {
        id: "c3",
        author: "Alice Brown",
        // no photo provided -> component will fallback to initials
        text: "Looking forward to the session!",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },

  5: {
    description:
      "Latest advances in interventional cardiology explained by experts.",
    highlights: ["Live demo", "Q&A"],
    comments: [],
  },
};
