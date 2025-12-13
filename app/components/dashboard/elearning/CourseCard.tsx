"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import type { ElearningCourse } from "@/app/data/elearning/elearning";

export default function CourseCard({
  course,
  onPrimaryAction,
  onNavigate,
}: {
  course: ElearningCourse;
  onPrimaryAction?: () => void;
  onNavigate?: () => void;
}) {
  const href = `/elearning/${encodeURIComponent(String(course.id))}`;

  return (
    <article
      // card itself not handling navigation; image/title use Link
      className="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_12px_30px_rgba(31,41,55,0.06)] transition-shadow hover:shadow-[0_18px_40px_rgba(31,41,55,0.08)]"
      aria-labelledby={`course-${course.id}`}
    >
      {/* Image (clickable + cursor pointer) */}
      <Link href={href} className="block relative w-full h-44 overflow-hidden cursor-pointer">
        <Image
          src={course.image || "/images/learning.png"}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Meta Row */}
        <div className="flex items-start justify-between text-xs text-slate-500 mb-3">
          <div className="flex items-center gap-3">
            <CalendarDays size={16} className="text-slate-600" />
            <span>{course.dateRange}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-slate-600" />
              <span>{course.time}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-slate-600" />
              <span className="text-sm font-medium text-green-600">{course.mode ?? course.type}</span>
            </div>
          </div>
        </div>

        {/* Title (clickable + cursor pointer) */}
        <h3 id={`course-${course.id}`} className="text-sm sm:text-base font-semibold text-[#252641] leading-snug mb-4 min-h-[3.25rem]">
          <Link href={href} className="hover:underline cursor-pointer">
            {course.title}
          </Link>
        </h3>

        {/* Primary button pinned to bottom; stopPropagation prevents navigation */}
        <div className="mt-auto flex items-center justify-center">
          {course.price && course.price > 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrimaryAction?.();
              }}
              className="min-w-[160px] bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-sm transition"
            >
              ₹{course.price} | Buy Now
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrimaryAction?.();
              }}
              className="min-w-[160px] bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-sm transition"
            >
              Register Free
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
