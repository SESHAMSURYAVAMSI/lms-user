"use client";

import { useParams } from "next/navigation";
import { ELEARNING_COURSES } from "@/app/data/elearning/elearning";
import Image from "next/image";

export default function ElearningDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const course = ELEARNING_COURSES.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="p-10 text-center text-gray-600">
        Course not found
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Course Image */}
      <div className="relative w-full h-[320px] rounded-2xl overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Course Info */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-[#252641]">
          {course.title}
        </h1>

        <p className="text-gray-600">
          {course.type} • {course.mode}
        </p>

        <p className="text-sm text-gray-500">
          {course.dateRange} | {course.time}
        </p>
      </div>
    </div>
  );
}
