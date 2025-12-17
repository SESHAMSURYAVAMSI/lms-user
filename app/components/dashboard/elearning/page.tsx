"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import CourseCard from "./ElearningCourseCard";
import RegisterModal from "./RegisterModal";
import { ChevronDown } from "lucide-react";
import { ELEARNING_COURSES, type ElearningCourse } from "@/app/data/elearning/elearning";

type Sort = "newest" | "popularity";

export default function ElearningPage() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement | null>(null);

  // modal state
  const [selectedCourse, setSelectedCourse] = useState<ElearningCourse | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Close sort dropdown on outside click or Escape
  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (!sortRef.current) return;
      if (!sortRef.current.contains(e.target as Node)) setSortOpen(false);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSortOpen(false);
    };

    document.addEventListener("click", click);
    document.addEventListener("keydown", esc);

    return () => {
      document.removeEventListener("click", click);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  const openModal = (course: ElearningCourse) => {
    setSelectedCourse(course);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCourse(null);
    document.body.style.overflow = "";
  };

  // Search + Sort
  const webinars = useMemo(() => {
    const query = q.trim().toLowerCase();
    const arr = ELEARNING_COURSES.slice();

    const searched = query
      ? arr.filter(
          (w) =>
            w.title.toLowerCase().includes(query) ||
            (w.type ?? "").toLowerCase().includes(query)
        )
      : arr;

    return searched.sort((a, b) =>
      sort === "newest"
        ? +new Date(b.startDate) - +new Date(a.startDate)
        : (b.popularity ?? 0) - (a.popularity ?? 0)
    );
  }, [q, sort]);

  return (
    <div className="p-6 bg-white">
      {/* Header + Sort */}
      <div className="mb-4 flex items-start justify-between">
        <h1 className="text-2xl font-semibold text-[#252641]">eLearning Courses</h1>

        {/* Sort Button */}
        <div ref={sortRef} className="relative">
          <button
            onClick={() => setSortOpen((o) => !o)}
            className="flex items-center gap-2 rounded-md border px-3 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium shadow-sm hover:bg-orange-100 transition"
          >
            Sort By
            <ChevronDown size={14} />
          </button>

          {sortOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-md border shadow-lg z-50 overflow-hidden">
              <button
                onClick={() => {
                  setSort("newest");
                  setSortOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm ${sort === "newest" ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-gray-50"}`}
              >
                Newest First
              </button>

              <button
                onClick={() => {
                  setSort("popularity");
                  setSortOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm ${sort === "popularity" ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-gray-50"}`}
              >
                Popularity
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search courses..."
          className="w-full sm:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Grid - items-stretch ensures h-full cards stretch */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
        {webinars.map((w: ElearningCourse) => (
          <CourseCard
            key={w.id}
            course={w}
            onRegister={() => openModal(w)}
          />
        ))}
      </div>

      {webinars.length === 0 && <p className="text-gray-500 text-center mt-8">No courses found.</p>}

      {/* Register modal */}
      <RegisterModal open={modalOpen} onClose={closeModal} course={selectedCourse} />
    </div>
  );
}
