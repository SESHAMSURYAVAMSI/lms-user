"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { webinars } from "@/app/data/webinar";
import { quizByWebinar, quizMetaByWebinar } from "@/app/data/webinar/quiz";

/* ---------- helpers ---------- */
interface AnswerRecord {
  qid: string | number;
  selectedIndex: number | null;
  correctIndex: number;
}

function formatMMSS(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function QuizRunner({ params }: { params: { id: string } }) {
  const id = Number(params?.id);
  const router = useRouter();

  const webinar = webinars.find((w) => w.id === id);
  const questions = quizByWebinar[id] ?? [];
  const meta = quizMetaByWebinar[id] ?? {};
  const perQuestionSeconds = meta.perQuestionSeconds ?? 150;

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(perQuestionSeconds);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [finished, setFinished] = useState(false);

  const timerRef = useRef<number | null>(null);

  /* ---------- timer ---------- */
  useEffect(() => {
    if (finished) return;

    setSelected(null);
    setTimeLeft(perQuestionSeconds);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index, perQuestionSeconds, finished]);

  useEffect(() => {
    if (timeLeft <= 0 && !finished) handleSubmit();
  }, [timeLeft, finished]);

  if (!webinar || questions.length === 0) {
    return <div className="p-8">Quiz not available</div>;
  }

  const q = questions[index];

  function nextQuestion(record: AnswerRecord) {
    setAnswers((prev) => [...prev, record]);

    if (index + 1 >= questions.length) {
      setFinished(true);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    setIndex((i) => i + 1);
  }

  function handleSubmit() {
    if (timerRef.current) clearInterval(timerRef.current);

    nextQuestion({
      qid: q.id,
      selectedIndex: selected,
      correctIndex: q.answerIndex,
    });
  }

  function handleSkip() {
    if (timerRef.current) clearInterval(timerRef.current);
    nextQuestion({
      qid: q.id,
      selectedIndex: null,
      correctIndex: q.answerIndex,
    });
  }

  /* ================= RESULT PAGE ================= */
  if (finished) {
    const correctCount = answers.filter(
      (a) => a.selectedIndex === a.correctIndex
    ).length;

    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">

          {/* LEFT */}
          <div>
            {/* ✅ Breadcrumb buttons (RESULT PAGE) */}
            <div className="flex items-center gap-2 text-sm mb-6">
              <button
                onClick={() => router.push("/dashboard/webinar")}
                className="text-orange-600 hover:underline font-medium"
              >
                Webinar
              </button>
              <span className="text-gray-400">&gt;</span>

              <button
                onClick={() => router.push(`/dashboard/webinar/${webinar.id}`)}
                className="text-orange-600 hover:underline font-medium truncate max-w-[320px]"
                title={webinar.title}
              >
                {webinar.title}
              </button>
              <span className="text-gray-400">&gt;</span>

              <span className="text-gray-500 font-semibold">QUIZ</span>
            </div>

            <div className="flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow p-12 w-full max-w-md text-center">
                <div className="mx-auto w-28 h-28 rounded-full bg-orange-500 text-white flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold">
                    {String(correctCount).padStart(2, "0")} /{" "}
                    {String(questions.length).padStart(2, "0")}
                  </div>
                  <div className="text-sm">Your Score</div>
                </div>

                <h2 className="mt-6 text-xl font-semibold">
                  Congratulations!
                </h2>

                <p className="mt-2 text-gray-600">
                  You have successfully completed the quiz.
                </p>

                {/* ✅ FIXED REDIRECT */}
                <button
                  onClick={() =>
                    router.push(`/dashboard/webinar/${webinar.id}`)
                  }
                  className="mt-6 px-6 py-2 bg-[#1F5C9E] text-white rounded-md"
                >
                  BACK TO HOME
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-2xl shadow p-6 sticky top-6 h-fit">
            <p className="text-xs text-gray-500 mb-3 text-center">
              EDUCATIONAL GRANT BY
            </p>
            <Image
              src="/sun_pharma.png"
              alt="Sun Pharma"
              width={60}
              height={60}
              className="object-contain mx-auto"
            />
          </div>
        </div>
      </div>
    );
  }

  /* ---------- timer ring ---------- */
  const ringSize = 120;
  const stroke = 10;
  const radius = (ringSize - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.max(0, timeLeft / perQuestionSeconds);
  const dashoffset = circumference * (1 - percent);

  /* ================= QUIZ UI ================= */
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">

        {/* LEFT */}
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-3">
            <button
              onClick={() => router.push("/dashboard/webinar")}
              className="text-orange-600 hover:underline font-medium"
            >
              Webinar
            </button>
            <span className="text-gray-400">&gt;</span>

            <button
              onClick={() => router.push(`/dashboard/webinar/${webinar.id}`)}
              className="text-orange-600 hover:underline font-medium truncate max-w-[320px]"
            >
              {webinar.title}
            </button>
            <span className="text-gray-400">&gt;</span>

            <span className="text-gray-500 font-semibold">QUIZ</span>
          </div>

          <h1 className="text-2xl font-semibold text-center">Quiz 1</h1>

          {/* TIMER */}
          <div className="flex justify-center mt-4 mb-6">
            <div className="bg-white rounded-xl shadow p-6 w-60 text-center">
              <div className="relative mx-auto w-28 h-28">
                <svg width={ringSize} height={ringSize}>
                  <circle
                    cx={ringSize / 2}
                    cy={ringSize / 2}
                    r={radius}
                    stroke="#D1FAE5"
                    strokeWidth={stroke}
                    fill="none"
                  />
                  <circle
                    cx={ringSize / 2}
                    cy={ringSize / 2}
                    r={radius}
                    stroke="#22C55E"
                    strokeWidth={stroke}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-green-700">
                  {formatMMSS(timeLeft)}
                </div>
              </div>
              <div className="text-xs mt-2 text-gray-500">TIMER</div>
            </div>
          </div>

          <div className="text-right font-semibold text-blue-700 mb-4">
            QUESTIONS : {String(index + 1).padStart(2, "0")} /{" "}
            {String(questions.length).padStart(2, "0")}
          </div>

          <h2 className="text-lg font-semibold mb-6">
            {index + 1}. {q.q}
          </h2>

          <div className="space-y-4">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full flex items-center gap-4 p-4 border rounded-md ${
                  selected === i
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                <div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center font-semibold">
                  {String.fromCharCode(65 + i)}
                </div>
                <span>{opt}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => selected !== null && handleSubmit()}
              className="px-6 py-2 bg-blue-700 text-white rounded-md"
            >
              SUBMIT ANSWER
            </button>
            <button
              onClick={handleSkip}
              className="px-6 py-2 border rounded-md"
            >
              SKIP
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-2xl shadow p-6 sticky top-6 h-fit">
          <p className="text-xs text-gray-500 mb-3 text-center">
            EDUCATIONAL GRANT BY
          </p>
          <Image
            src="/sun_pharma.png"
            alt="Sun Pharma"
            width={60}
            height={60}
            className="object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
