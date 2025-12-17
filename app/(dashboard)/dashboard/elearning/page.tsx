"use client";

import { useMemo, useState } from "react";
import ElearningCourseCard from "@/app/components/dashboard/elearning/ElearningCourseCard";
import RegisterModal from "@/app/components/dashboard/elearning/RegisterModal";
import { ELEARNING_COURSES } from "@/app/data/elearning/elearning";
import type { ElearningCourse } from "@/app/data/elearning/elearning";

export default function ElearningPage() {
  const [q, setQ] = useState(""); // ✅ fixed
  const [open, setOpen] = useState(false);
  const [selected, setSelected] =
    useState<ElearningCourse | null>(null);

  const courses = useMemo(() => {
    const query = q.trim().toLowerCase();
    return query
      ? ELEARNING_COURSES.filter((c) =>
          c.title.toLowerCase().includes(query)
        )
      : ELEARNING_COURSES;
  }, [q]);

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1320px] w-full px-6 py-6">
        <h1 className="text-2xl font-semibold mb-6">
          E-Learning
        </h1>

        {/* 🔍 Search Input */}
        <div className="mb-6">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search courses..."
            className="w-full md:w-96 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#1F5C9E]"
          />
        </div>

        {/* 📚 Courses Grid */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          }}
        >
          {courses.map((course) => (
            <ElearningCourseCard
              key={course.id}
              course={course}
              onRegister={(c) => {
                setSelected(c);
                setOpen(true);
              }}
            />
          ))}
        </div>

        {/* 📝 Register Modal */}
        <RegisterModal
          open={open}
          onClose={() => setOpen(false)}
          course={selected}
        />
      </div>
    </div>
  );
}
