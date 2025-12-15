export type Speaker = {
  id: string;
  name: string;
  qualification: string;
  designation: string;
  experience: string;
  institute: string;
  location: string;
  photo: string;
  videos: number;
};

export const SPEAKERS: Speaker[] = [
  {
    id: "dr-rv-sudarshan",
    name: "Dr. R.V. Sudarshan",
    qualification: "MBBS, MD (Urology)",
    designation: "Urologist",
    experience: "15 Years (exp)",
    institute: "AIIMS Delhi",
    location: "Tamil Nadu, India",
    photo: "/speakers.png",
    videos: 4,
  },
];
