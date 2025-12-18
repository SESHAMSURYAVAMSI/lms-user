"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Search,
  CalendarDays,
  Clock,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMyLearningWebinars } from "@/lib/myLearningStorage";
import { useRouter } from "next/navigation";

/* ✅ STRONG TYPE */
type MyLearningWebinar = {
  id: number | string;
  title: string;
  image: string;
  date?: string;
  time?: string;
  mode?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
};

export default function MyLearningPage() {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState<MyLearningWebinar[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCourses(getMyLearningWebinars());
  }, []);

  const query = search.trim().toLowerCase();

  const filteredCourses = courses.filter((course) => {
    if (!query) return true;
    return (
      course.title.toLowerCase().includes(query) ||
      (course.type || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-[#0d2540]">
        My Courses
      </h1>

      {/* Search */}
      <div className="relative mb-8 w-full max-w-sm">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title"
          className="pl-10 pr-5 py-2 w-full border rounded-lg focus:ring-2 focus:ring-[#1F5C9E]"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
  className="
    bg-white rounded-2xl overflow-hidden flex flex-col
    card-shadow
    transform transition-all duration-300
    hover:-translate-y-2
  "
>
            {/* Image */}
            <div className="rounded-xl overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              width={480}
              height={260}
              className="object-cover w-full h-44"
            />
             </div>

            
            
            <div className="p-4 flex flex-col flex-grow">
              {/* Meta */}
              <div className="text-sm flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <CalendarDays size={14} />
                  {course.startDate} - {course.endDate}
                </div>

                {/* TIME + GREEN DOT */}
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{course.time}</span>

                  {/* GREEN ROUND DOT */}
                  <span className="ml-5 w-2.5 h-2.5 rounded-full bg-green-500 border border-black inline-block" />

                  <span className="text-green-600 font-medium">
                    {course.mode}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-2 text-base font-semibold text-[#252641] line-clamp-2 min-h-[3rem]">
                {course.title}
              </h3>

              {/* Button */}
              <div className="mt-auto pt-4 flex justify-center">
                <Button
                  onClick={() =>
                    router.push(`/dashboard/webinar/${course.id}`)
                  }
                  className="px-4 py-2 bg-[#3b82f6] hover:bg-[#2b6ad6] text-white rounded-lg text-sm w-32"
                >
                  View Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <p className="text-gray-500 text-center mt-8">
          No registered courses found.
        </p>
      )}
    </div>
  );
}
