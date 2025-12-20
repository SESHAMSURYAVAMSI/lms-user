// /app/data/program/quiz.ts

/* ================= TYPES ================= */
export type QuizQuestion = {
  id: string;
  q: string;
  options: string[];
  answerIndex: number;
};

/* ================= QUESTIONS PER PROGRAM ================= */
export const quizByConference: Record<number, QuizQuestion[]> = {
  1: [
    {
      id: "q1",
      q: "Which organ is primarily discussed in the Renal Transplantation program?",
      options: ["Heart", "Lungs", "Kidney", "Liver"],
      answerIndex: 2,
    },
    {
      id: "q2",
      q: "Which specialist typically performs a renal transplant?",
      options: [
        "Cardiologist",
        "Transplant Surgeon",
        "Dermatologist",
        "Pulmonologist",
      ],
      answerIndex: 1,
    },
    {
      id: "q3",
      q: "Which of the following is a common immunosuppressant drug used after transplant?",
      options: ["Aspirin", "Tacrolimus", "Metformin", "Amoxicillin"],
      answerIndex: 1,
    },
    {
      id: "q4",
      q: "What is the primary goal of transplantation surgery?",
      options: [
        "Cosmetic improvement",
        "Restore organ function",
        "Weight loss",
        "Pain relief",
      ],
      answerIndex: 1,
    },
    {
      id: "q5",
      q: "Which laboratory test monitors kidney function after transplant?",
      options: [
        "HbA1c",
        "Serum creatinine",
        "LFTs",
        "Lipid profile",
      ],
      answerIndex: 1,
    },
    {
      id: "q6",
      q: "Cold ischemia time refers to:",
      options: [
        "Time the organ is warm outside the body",
        "Time the organ is preserved on ice before transplant",
        "Operation duration",
        "Time until first dose of antibiotics",
      ],
      answerIndex: 1,
    },
    {
      id: "q7",
      q: "Which imaging is commonly used to evaluate living donor kidneys pre-op?",
      options: [
        "Chest X-ray",
        "CT angiography",
        "Brain MRI",
        "DEXA scan",
      ],
      answerIndex: 1,
    },
    {
      id: "q8",
      q: "A common early post-transplant complication is:",
      options: [
        "Graft rejection",
        "Diabetes mellitus type 2",
        "Chronic arthritis",
        "Myopia",
      ],
      answerIndex: 0,
    },
    {
      id: "q9",
      q: "Which blood group compatibility is important for kidney transplant?",
      options: ["ABO", "Rh only", "None", "HLA only"],
      answerIndex: 0,
    },
    {
      id: "q10",
      q: "What is the purpose of induction therapy after transplant?",
      options: [
        "Prevent infection",
        "Provide pain relief",
        "Strong early immune suppression to prevent rejection",
        "Improve blood pressure",
      ],
      answerIndex: 2,
    },
  ],

  2: [],
  3: [],
  4: [],
  5: [],
};

/* ================= QUIZ META PER PROGRAM ================= */
export const quizMetaByConference: Record<
  number,
  {
    perQuestionSeconds?: number;
    durationMinutes?: number;
  }
> = {
  1: { perQuestionSeconds: 30 },
  2: { perQuestionSeconds: 20 },
  3: { perQuestionSeconds: 30 },
  4: { perQuestionSeconds: 30 },
  5: { perQuestionSeconds: 30 },
};
