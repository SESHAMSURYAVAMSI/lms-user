"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courses } from "@/app/data/mylearning";

export default function MyLearningPage() {
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();

  const filteredCourses = courses.filter((course) => {
    if (!query) return true;
    const title = (course.title || "").toString().toLowerCase();
    const type = (course.type || "").toString().toLowerCase();
    return title.includes(query) || type.includes(query);
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-[#0d2540]">My Courses</h1>

      {/* Search bar */}
      <div className="relative mb-8 w-full max-w-sm">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by title or type"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-3 py-2.5 border rounded-lg w-full focus:ring-2 focus:ring-blue-200 outline-none text-gray-700"
        />
      </div>

      {/* Course grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl overflow-hidden shadow-[0_12px_30px_rgba(13,37,64,0.07)] hover:shadow-[0_18px_40px_rgba(13,37,64,0.10)] transition-transform transform hover:-translate-y-1"
          >
            <div className="relative">
              <Image
                src={course.image}
                alt={course.title}
                width={480}
                height={280}
                className="object-cover w-full h-48 rounded-t-xl"
              />
            </div>

            <div className="p-5 space-y-2">
              <div className="flex flex-col gap-1 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="inline-block text-[14px]">📅</span>
                  <span>{course.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block text-[14px]">⏰</span>
                  <span>{course.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Type:</span>
                  <span className="font-medium text-gray-700">{course.type}</span>
                </div>
              </div>

              <h2 className="mt-3 text-lg font-semibold text-[#0d2540] leading-snug">
                {course.title}
              </h2>

              {/* Centered button */}
              <div className="mt-4 flex justify-center">
                <Button
                  className="px-4 py-2 bg-[#3b82f6] hover:bg-[#2b6ad6] text-white rounded-lg text-sm w-32"
                  onClick={() => console.log("View", course.id)}
                >
                  View Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <p className="text-gray-500 text-center mt-8">No courses found.</p>
      )}
    </div>
  );
}
