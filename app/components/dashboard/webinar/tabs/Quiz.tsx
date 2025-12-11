"use client";

import React, { useEffect, useRef } from "react";
import { Clock, HelpCircle, SkipForward } from "lucide-react";

type QuizProps = {
  title?: string;
  subtitle?: string;
  durationMinutes?: string | number; // e.g. "05 Minutes" or 5
  questionsCount?: number;
  perQuestionSeconds?: number;
  onStart?: () => void;
};

export default function Quiz({
  title = "USI ISU Webinar - Renal Transplantation",
  subtitle = "Transplantation Subsection",
  durationMinutes = "05 Minutes",
  questionsCount = 10,
  perQuestionSeconds = 30,
  onStart,
}: QuizProps) {
  const ringRef = useRef<SVGCircleElement | null>(null);

  // animate ring on mount (fills to ~78%)
  useEffect(() => {
    const circle = ringRef.current;
    if (!circle) return;
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    const fillPercent = 0.22; // leave ~22% empty -> ~78% filled
    const finalOffset = circumference * fillPercent;

    let start: number | null = null;
    const duration = 900;

    function step(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = circumference - (circumference - finalOffset) * eased;
      circle.style.strokeDashoffset = String(current);
      if (t < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, []);

  // format duration display: accept number (minutes) or string
  const durationDisplay =
    typeof durationMinutes === "number"
      ? `${String(durationMinutes).padStart(2, "0")} Minutes`
      : String(durationMinutes);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-[#1F2B4A]">Quiz</h3>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* LEFT: Title + stats */}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-[#1F2B4A] leading-tight">
                {title}
                <span className="block text-sm text-gray-600 mt-1">{subtitle}</span>
              </h2>

              <div className="mt-6 space-y-4 max-w-xl">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="p-2 rounded-full bg-gray-100 text-gray-600">
                    <Clock size={16} />
                  </div>
                  <div className="font-medium">{durationDisplay}</div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <div className="p-2 rounded-full bg-gray-100 text-gray-600">
                    <HelpCircle size={16} />
                  </div>
                  <div className="font-medium">{questionsCount} Questions</div>
                </div>

                <div className="flex items-start gap-3 text-gray-700 mt-2">
                  <div className="p-2 rounded-full bg-gray-100 text-gray-600 mt-1">
                    <SkipForward size={16} />
                  </div>
                  <div className="text-sm font-medium">Skip the Question — Can’t Back</div>
                </div>
              </div>
            </div>

            {/* RIGHT: circle + per-question text below it */}
            <div className="w-full lg:w-auto flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center">
                {/* background circle */}
                <svg width="110" height="110" viewBox="0 0 110 110" className="block">
                  <circle cx="55" cy="55" r="46" stroke="#e6f4ea" strokeWidth="12" fill="none" />
                </svg>

                {/* animated arc (rotated so arc starts at top) */}
                <svg width="110" height="110" viewBox="0 0 110 110" className="absolute top-0 left-0 transform -rotate-90">
                  <circle ref={ringRef} cx="55" cy="55" r="46" stroke="#16A34A" strokeWidth="12" strokeLinecap="round" fill="none" />
                </svg>

                {/* center number */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-xl font-bold text-green-700">{perQuestionSeconds}</div>
                  <div className="text-xs text-gray-500">Sec</div>
                </div>
              </div>

              {/* per-question text placed BELOW the circle */}
              <div className="mt-3 text-sm text-gray-700 font-medium">{perQuestionSeconds} Sec Each Questions</div>
            </div>
          </div>

          {/* START NOW button */}
          <div className="mt-8">
            <button
              onClick={() => (onStart ? onStart() : alert("Start quiz — implement runner"))}
              className="w-full md:w-1/2 mx-auto block bg-[#1F5C9E] hover:bg-[#184a81] text-white py-3 rounded-lg font-semibold shadow-md transition-colors"
            >
              START NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
