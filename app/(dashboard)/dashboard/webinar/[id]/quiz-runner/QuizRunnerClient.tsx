"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { webinars } from "@/app/data/webinar";
import { quizByWebinar, quizMetaByWebinar } from "@/app/data/webinar/quiz";

/* ---------- types ---------- */
type AnswerRecord = {
  qid: string | number;
  selectedIndex: number | null;
  correctIndex: number;
};

/* ---------- helpers ---------- */
function formatMMSS(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function QuizRunnerClient() {
  const params = useParams();
  const router = useRouter();

  const webinarId = Number(params.id);
  const webinar = webinars.find((w) => w.id === webinarId);

  const questions = quizByWebinar[webinarId] ?? [];
  const meta = quizMetaByWebinar[webinarId] ?? {};
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

  useEffect(() => {
    if (finished && answers.length > 0) {
      // Save answers or navigate to results page
      console.log("Quiz completed with answers:", answers);
    }
  }, [finished, answers]);

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

  /* ---------- timer ring ---------- */
  const ringSize = 120;
  const stroke = 10;
  const radius = (ringSize - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.max(0, timeLeft / perQuestionSeconds);
  const dashoffset = circumference * (1 - percent);

  const ringColor =
    percent <= 0.2 ? "#EF4444" : percent <= 0.5 ? "#F59E0B" : "#22C55E";

  /* ================= QUIZ UI ================= */
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">

        {/* LEFT */}
        <div>

          {/* ✅ BREADCRUMB */}
          <div className="flex items-center gap-2 text-sm mb-4">
            <button
              onClick={() => router.push("/dashboard/webinar")}
              className="text-orange-600 hover:underline font-medium"
            >
              Webinar
            </button>
            <span className="text-gray-400">&gt;</span>

            <button
              onClick={() =>
                router.push(`/dashboard/webinar/${webinar.id}`)
              }
              className="text-orange-600 hover:underline font-medium truncate max-w-[320px]"
              title={webinar.title}
            >
              {webinar.title}
            </button>

            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-500 font-semibold">Quiz</span>
          </div>

          <h1 className="text-2xl font-semibold mb-4 text-center">
            Quiz
          </h1>

          {/* CIRCULAR TIMER */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-xl shadow p-6 w-60 text-center">
              <div className="relative mx-auto w-[120px] h-[120px]">
                <svg width={ringSize} height={ringSize}>
                  <circle
                    cx={ringSize / 2}
                    cy={ringSize / 2}
                    r={radius}
                    stroke="#E5E7EB"
                    strokeWidth={stroke}
                    fill="none"
                  />
                  <circle
                    cx={ringSize / 2}
                    cy={ringSize / 2}
                    r={radius}
                    stroke={ringColor}
                    strokeWidth={stroke}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${ringSize / 2} ${ringSize / 2})`}
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                  {formatMMSS(timeLeft)}
                </div>
              </div>

              <div className="text-xs mt-2 text-gray-500 font-medium">
                TIMER
              </div>
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
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center font-semibold">
                  {String.fromCharCode(65 + i)}
                </div>
                <span>{opt}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className="px-6 py-2 bg-blue-700 text-white rounded-md disabled:opacity-50"
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
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <p className="text-xs text-gray-500 mb-3 text-center">
            EDUCATIONAL GRANT BY
          </p>
          <Image
            src="/sun_pharma.png"
            alt="Sun Pharma"
            width={60}
            height={60}
            className="mx-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
