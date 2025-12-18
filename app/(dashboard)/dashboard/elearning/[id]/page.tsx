"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  ChevronDown,
  Eye,
} from "lucide-react";

import { ELEARNING_COURSES } from "@/app/data/elearning/elearning";
import { COURSE_DETAIL } from "@/app/data/elearning/detail";
import PreviewVideoModal from "@/app/components/dashboard/elearning/PreviewVideoModal";

/* ---------- helpers ---------- */
function formatTotalTime(totalMinutes: number) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h ${m}m`;
}

export default function ElearningDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const course = ELEARNING_COURSES.find((c) => c.id === id);

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showMore, setShowMore] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewLecture, setPreviewLecture] = useState<{
    title: string;
    videoUrl: string;
  } | null>(null);

  if (!course) return <div className="p-8">Course not found</div>;

  const sections = COURSE_DETAIL.content.length;
  const totalLectures = COURSE_DETAIL.content.reduce(
    (s, w) => s + w.lectures,
    0
  );
  const totalMinutes = COURSE_DETAIL.content.reduce(
    (s, w) => s + w.durationMinutes,
    0
  );

  return (
    <div className="max-w-[1320px] mx-auto px-6 py-6 space-y-8">

      {/* ================= BREADCRUMB ================= */}
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={() => router.push("/dashboard/elearning")}
          className="text-gray-500 hover:text-[#1F5C9E]"
        >
          E-learning Courses
        </button>
        <span className="text-gray-400">{">"}</span>
        <span className="text-[#1F5C9E] font-medium">
          {course.title}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6">

        {/* ================= LEFT ================= */}
        <div className="space-y-6">

          {/* VIDEO PLAYER */}
          <div className="rounded-2xl overflow-hidden aspect-video shadow">
            <iframe
              src={course.videoUrl}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>

          {/* META */}
          <div className="bg-white rounded-2xl shadow p-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CalendarDays size={14} />
                {course.dateRange}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 border border-black" />
                <span className="text-green-600 font-medium">
                  {course.mode}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Clock size={14} />
              {course.time}
            </div>

            <h1 className="text-lg font-semibold text-[#252641]">
              {course.title}
            </h1>
          </div>

          {/* COURSE CONTENT */}
          <section className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-1">Course content</h2>

            <p className="text-sm text-gray-600 mb-4">
              {sections} sections • {totalLectures} lectures •{" "}
              {formatTotalTime(totalMinutes)} total length
            </p>

            <div className="border rounded-xl divide-y">
              {COURSE_DETAIL.content.map((week, i) => {
                const open = openIndex === i;

                return (
                  <div key={i}>
                    <button
                      onClick={() => setOpenIndex(open ? null : i)}
                      className={`w-full flex justify-between px-4 py-3 text-sm font-medium ${
                        open
                          ? "bg-[#1F5C9E] text-white"
                          : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex gap-2 items-center">
                        <ChevronDown
                          size={16}
                          className={`transition ${open ? "rotate-180" : ""}`}
                        />
                        {week.week}
                      </div>

                      <span>
                        {week.lectures} lectures • {week.durationMinutes} min
                      </span>
                    </button>

                    {open &&
                      week.items.map((lec, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between px-6 py-3 text-sm border-t"
                        >
                          {/* ✅ CLICKABLE LECTURE TITLE */}
                          <button
                            onClick={() =>
                              router.push("/dashboard/elearning/lecture")
                            }
                            className="text-left text-[#6FAEFF] hover:underline font-medium"
                          >
                            {lec.title}
                          </button>

                          <div className="flex items-center gap-6">
                            {lec.preview && lec.videoUrl && (
                              <button
                                onClick={() => {
                                  setPreviewLecture({
                                    title: lec.title,
                                    videoUrl: lec.videoUrl!,
                                  });
                                  setPreviewOpen(true);
                                }}
                                className="flex items-center gap-1 text-green-600 text-xs font-medium"
                              >
                                <Eye size={14} /> Preview
                              </button>
                            )}

                            <span className="text-xs text-gray-500">
                              {lec.duration} min
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-6">
          <p className="text-xs text-gray-500 mb-4 text-center">
            EDUCATIONAL GRANT BY
          </p>
          <Image
            src="/Sun_Pharma.png"
            alt="Sun Pharma"
            width={60}
            height={60}
            className="mx-auto object-contain"
          />
        </div>
      </div>

      {/* PREVIEW MODAL */}
      {previewLecture && (
        <PreviewVideoModal
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          title={previewLecture.title}
          videoUrl={previewLecture.videoUrl}
        />
      )}
    </div>
  );
}
