export const feedbackByWorkshops: Record<
  number,
  {
    placeholder?: string;
    questions?: { id: string; q: string; options: string[] }[];
  }
> = {
  1: {
    placeholder: "Share your feedback about the webinar...",
    questions: [
      {
        id: "q1",
        q: "Lorem ipsum dolor sit amet?",
        options: [
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet."
        ],
      },
      {
        id: "q2",
        q: "Eloem ipsum dolor sit amet Eloem ipsum dolor sit ame?",
        options: [
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet."
        ],
      },
      {
        id: "q3",
        q: "Eloem ipsum dolor sit amet?",
        options: [
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet."
        ],
      },
      {
        id: "q4",
        q: "Lorem ipsum dolor sit amet Eloem ipsum dolor sit ame?",
        options: [
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet."
        ],
      },
    ],
  },

  2: {
    placeholder: "Share your feedback about urology advances...",
    questions: [
      {
        id: "u1",
        q: "Was the content relevant to your field?",
        options: ["Highly relevant", "Somewhat relevant", "Not relevant", "Unsure"],
      },
      {
        id: "u2",
        q: "Was the Q&A portion helpful?",
        options: ["Very helpful", "Somewhat helpful", "Not helpful", "Did not attend"],
      },
    ],
  },

  3: {
    placeholder: "Share your feedback about pediatric urology...",
    questions: [
      {
        id: "p1",
        q: "How satisfied are you with the overall session?",
        options: ["Excellent", "Good", "Average", "Poor"],
      },
    ],
  },

  4: {
    placeholder: "Share your feedback about renal transplantation training...",
    questions: [
      {
        id: "r1",
        q: "Was the practical demonstration useful?",
        options: ["Very useful", "Useful", "Not useful", "Did not attend"],
      },
    ],
  },

  5: {
    placeholder: "Share your feedback about cardiology updates...",
    questions: [
      {
        id: "c1",
        q: "Did the webinar cover the latest techniques?",
        options: ["Yes", "Partially", "No", "Unsure"],
      },
    ],
  },
};
