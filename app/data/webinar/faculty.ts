// faculty lists keyed by webinar id
export type FacultyItem = {
  id?: number | string;
  role?: "convenor" | "co-convenor" | "faculty" | string;
  name: string;
  title?: string;
  institution?: string;
  location?: string;
  photo?: string; // /images/...
};

export const facultyByWebinar: Record<number, FacultyItem[]> = {
  1: [
    { id: 1, role: "convenor", name: "Dr. R.V. Sudarshan", title: "Andrologist", institution: "AIIMS Delhi", location: "Tamil Nadu, India", photo: "/images/dravatar.jpg" },
    { id: 2, role: "co-convenor", name: "Dr. A. Balan", title: "Urologic Oncologist", institution: "CIMS Hospital", location: "Mumbai, India", photo: "/images/dravatar.jpg" },
    { id: 3, role: "faculty", name: "Dr. C. Kumar", title: "Nephrologist", institution: "SGPGI", location: "Lucknow, India", photo: "/images/dravatar.jpg" },
    { id: 4, role: "faculty", name: "Dr. D. Rao", title: "Transplant Surgeon", institution: "CMC Vellore", location: "Vellore, India", photo: "/images/dravatar.jpg" },
  ],

  2: [
    { id: 1, role: "convenor", name: "Dr. X Y", title: "Urology Specialist", institution: "NIMS", location: "Hyderabad, India", photo: "/images/dravatar.jpg" },
  ],

  3: [
    { id: 1, role: "convenor", name: "Dr. M. Patel", title: "Pediatric Urologist", institution: "KIMS", location: "Bengaluru, India" , photo: "/images/dravatar.jpg"},
  ],

  4: [
    { id: 1, role: "convenor", name: "Dr. A", title: "Professor of Surgery", institution: "Some Hospital", location: "City, Country" , photo: "/images/dravatar.jpg"},
    { id: 2, role: "faculty", name: "Dr. B", title: "Nephrologist", institution: "Some Hospital", location: "City, Country" , photo: "/images/dravatar.jpg"},
  ],

  5: [
    { id: 1, role: "convenor", name: "Dr. C", title: "Interventional Cardiologist", institution: "Heart Center", location: "City, Country", photo: "/images/dravatar.jpg" },
  ],
};
