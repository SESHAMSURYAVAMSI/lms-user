"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";
import type { ElearningCourse } from "@/app/data/elearning/elearning";

export default function ElearningCourseCard({
  course,
  onRegister,
}: {
  course: ElearningCourse;
  onRegister: (course: ElearningCourse) => void;
}) {
  const router = useRouter();

  const goToDetail = () => {
    router.push(`/dashboard/elearning/${course.id}`);
  };

  return (
    <article className="flex flex-col bg-white rounded-2xl p-5 overflow-hidden flex flex-col card-shadow transform transition-all duration-300 hover:-translate-y-2">

      {/* IMAGE */}
      <div
        className="rounded-xl overflow-hidden cursor-pointer"
        onClick={goToDetail}
      >
        <Image
          src={course.image}
          alt={course.title}
          width={480}
          height={260}
          className="object-cover w-full h-44"
        />
      </div>

      {/* DATE */}
      <div className="mt-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <CalendarDays size={14} />
          {course.dateRange}
        </div>
      </div>

      {/* TIME + MODE */}
      <div className="mt-2 flex items-center justify-between text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Clock size={14} />
          {course.time}
        </div>

        {course.mode && (
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 border border-black" />
            <span className="text-green-600 font-medium">
              {course.mode}
            </span>
          </div>
        )}
      </div>

      {/* TITLE */}
      <h3
        className="mt-3 text-[15px] font-semibold text-[#252641] line-clamp-2 cursor-pointer min-h-[40px]"
        onClick={goToDetail}
      >
        {course.title}
      </h3>

      {/* BUTTON */}
      <div className="mt-auto pt-4">
        <button
          onClick={() => onRegister(course)}
          className={`w-full py-2 rounded-full text-sm font-semibold ${
            course.price > 0
              ? "bg-orange-500 hover:bg-orange-600 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {course.price > 0
            ? `₹${course.price} | Buy Now`
            : "Register Free"}
        </button>
      </div>
    </article>
  );
}
