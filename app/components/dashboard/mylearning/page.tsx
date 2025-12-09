"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courses } from "@/app/data/mylearning";

export default function MyLearningPage() {
  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-3">
      <h1 className="text-xl font-semibold mb-4">My Courses</h1>

      {/* Search bar */}
      <div className="relative mb-6 w-full max-w-sm">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 pr-3 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Course grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all"
          >
            <Image
              src={course.image}
              alt={course.title}
              width={400}
              height={250}
              className="object-cover w-full h-48"
            />
            <div className="p-4 space-y-1">
              <p className="text-sm text-gray-600">📅 {course.date}</p>
              <p className="text-sm text-gray-600">⏰ {course.time}</p>
              <p className="text-sm text-gray-600">
                Type: <span className="font-medium">{course.type}</span>
              </p>
              <h2 className="font-semibold text-base mt-2 leading-snug">
                {course.title}
              </h2>
              <Button className="w-full mt-3 bg-blue-500 hover:bg-blue-700 text-white">
                View Now
              </Button>
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
