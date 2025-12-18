export type LectureAsset = {
  type: "image" | "pdf" | "doc";
  title: string;
  url: string;
};

export const LECTURE_ASSETS: LectureAsset[] = [
  { type: "image", title: "Report Image", url: "/images/learning.png" },
  { type: "pdf", title: "HbA1c PDF", url: "/docs/report.pdf" },
];
