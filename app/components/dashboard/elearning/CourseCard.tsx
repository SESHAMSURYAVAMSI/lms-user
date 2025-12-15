"use client";

import React from "react";
import Image from "next/image";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import type { ElearningCourse } from "@/app/data/elearning/elearning";

type Props = {
  course: ElearningCourse;
  onPrimaryAction?: () => void;
  onNavigate?: () => void; // ✅ FIX ADDED
};

export default function CourseCard({
  course,
  onPrimaryAction,
  onNavigate,
}: Props) {
  return (
    <article
      className="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_12px_30px_rgba(31,41,55,0.06)] transition-shadow hover:shadow-[0_18px_40px_rgba(31,41,55,0.08)]"
    >
      {/* IMAGE (CLICKABLE) */}
      <div
        onClick={onNavigate}
        className="relative w-full h-44 overflow-hidden cursor-pointer"
      >
        <Image
          src={course.image || "/images/learning.png"}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5 flex-1 flex flex-col">
        {/* META */}
        <div className="flex flex-col gap-2 text-xs text-slate-500 mb-3">
          <div className="flex items-center gap-2">
            <CalendarDays size={14} />
            <span>{course.dateRange}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>{course.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span className="font-medium text-green-600">
              {course.mode ?? course.type}
            </span>
          </div>
        </div>

        {/* TITLE (CLICKABLE) */}
        <h3
          onClick={onNavigate}
          className="text-sm sm:text-base font-semibold text-[#252641] leading-snug mb-4 min-h-[3.25rem] cursor-pointer hover:underline"
        >
          {course.title}
        </h3>

        {/* ACTION BUTTON (FIXED AT BOTTOM) */}
        <div className="mt-auto flex justify-center">
          {course.price && course.price > 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrimaryAction?.();
              }}
              className="min-w-[160px] bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition"
            >
              ₹{course.price} | Buy Now
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrimaryAction?.();
              }}
              className="min-w-[160px] bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition"
            >
              Register Free
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
