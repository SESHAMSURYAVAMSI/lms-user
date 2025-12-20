"use client";

import React, { useEffect, useRef } from "react";
import { Clock, HelpCircle, SkipForward } from "lucide-react";

type QuizProps = {
  title?: string;
  subtitle?: string;
  durationMinutes?: string | number;
  questionsCount?: number;
  perQuestionSeconds?: number;
  onStart?: () => void;
};

export default function WorkshopQuiz({
  title = "USI ISU Workshop - Renal Transplantation",
  subtitle = "Transplantation Subsection",
  durationMinutes = "05 Minutes",
  questionsCount = 10,
  perQuestionSeconds = 30,
  onStart,
}: QuizProps) {
  const ringRef = useRef<SVGCircleElement | null>(null);

  /* ---------- ring animation ---------- */
  useEffect(() => {
    const circle = ringRef.current;
    if (!circle) return;

    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    const targetOffset = circumference * 0.22;
    let start: number | null = null;
    const duration = 800;

    function animate(ts: number) {
      if (!start) start = ts;
      if (!circle) return;

      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      circle.style.strokeDashoffset = String(
        circumference - (circumference - targetOffset) * eased
      );

      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, []);

  const durationDisplay =
    typeof durationMinutes === "number"
      ? `${String(durationMinutes).padStart(2, "0")} Minutes`
      : durationMinutes;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-[#1F2B4A]">
        Quiz
      </h3>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">

            {/* LEFT CONTENT */}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-[#1F2B4A]">
                {title}
                <span className="block text-sm text-gray-600 mt-1">
                  {subtitle}
                </span>
              </h2>

              {/* ICON + TEXT LIST */}
              <div className="mt-6 space-y-4 max-w-xl">

                {/* Duration */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
                    <Clock size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {durationDisplay}
                  </span>
                </div>

                {/* Questions */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
                    <HelpCircle size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {questionsCount} Questions
                  </span>
                </div>

                {/* Skip rule */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
                    <SkipForward size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Skip the Question — Can’t Go Back
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT TIMER */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-[110px] h-[110px] flex items-center justify-center">
                <svg width="110" height="110">
                  <circle
                    cx="55"
                    cy="55"
                    r="46"
                    stroke="#e6f4ea"
                    strokeWidth="12"
                    fill="none"
                  />
                </svg>

                <svg
                  width="110"
                  height="110"
                  className="absolute -rotate-90"
                >
                  <circle
                    ref={ringRef}
                    cx="55"
                    cy="55"
                    r="46"
                    stroke="#16A34A"
                    strokeWidth="12"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-xl font-bold text-green-700">
                    {perQuestionSeconds}
                  </div>
                  <div className="text-xs text-gray-500">
                    Sec
                  </div>
                </div>
              </div>

              <div className="mt-3 text-sm font-medium text-gray-700">
                {perQuestionSeconds} Sec Each Question
              </div>
            </div>
          </div>

          {/* START BUTTON */}
          <div className="mt-8">
            <button
              onClick={() => onStart?.()}
              className="w-full md:w-1/2 mx-auto block bg-[#1F5C9E] hover:bg-[#184a81] text-white py-3 rounded-lg font-semibold shadow-md transition"
            >
              START NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
