"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { LIVE_CONFERENCES } from "@/app/data/conferences/liveConference";
import {
  quizByConference,
  quizMetaByConference,
} from "@/app/data/conferences/quiz";

/* ================= TYPES ================= */
type AnswerRecord = {
  qid: number | string;
  selectedIndex: number | null;
  correctIndex: number;
};

/* ================= HELPERS ================= */
function formatMMSS(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

/* ================= TIMER CIRCLE ================= */
function TimerCircle({
  timeLeft,
  total,
}: {
  timeLeft: number;
  total: number;
}) {
  const radius = 55;
  const stroke = 5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = timeLeft / total;

  const color =
    progress > 0.5
      ? "#16a34a"
      : progress > 0.25
      ? "#f59e0b"
      : "#dc2626";

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg width={radius * 2} height={radius * 2} className="absolute">
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progress * circumference}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>

      <div className="flex flex-col items-center justify-center">
        <span className="text-lg font-bold" style={{ color }}>
          {formatMMSS(timeLeft)}
        </span>
        <span className="text-[11px] text-gray-500 font-medium mt-1">
          TIMER
        </span>
      </div>
    </div>
  );
}

/* ================= MAIN ================= */
export default function ConferenceQuizRunnerClient() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const conferenceId = Number(params.id);
  const conference = LIVE_CONFERENCES.find(
    (c) => c.id === conferenceId
  );

  const questions = quizByConference[conferenceId] ?? [];
  const meta = quizMetaByConference[conferenceId] ?? {};
  const perQuestionSeconds = meta.perQuestionSeconds ?? 150;

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(perQuestionSeconds);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [finished, setFinished] = useState(false);

  const timerRef = useRef<number | null>(null);

  /* ================= TIMER ================= */
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
  }, [index, finished, perQuestionSeconds]);

  useEffect(() => {
    if (timeLeft <= 0 && !finished) submitAnswer();
  }, [timeLeft, finished]);

  if (!conference || questions.length === 0) {
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

  function submitAnswer() {
    nextQuestion({
      qid: q.id,
      selectedIndex: selected,
      correctIndex: q.answerIndex,
    });
  }

  function skipQuestion() {
    nextQuestion({
      qid: q.id,
      selectedIndex: null,
      correctIndex: q.answerIndex,
    });
  }

  /* ================= RESULT PAGE ================= */
  if (finished) {
    const score = answers.filter(
      (a) => a.selectedIndex === a.correctIndex
    ).length;

    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">

          {/* LEFT */}
          <div>
            <h1 className="text-center text-xl font-semibold mb-10">
              Quiz Result
            </h1>

            <div className="flex justify-center">
              <div className="bg-white rounded-2xl shadow-xl px-16 py-14 text-center max-w-md w-full">
                <div className="mx-auto w-28 h-28 rounded-full bg-orange-100 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-orange-500 text-white flex flex-col items-center justify-center">
                    <span className="text-xs">Your Score</span>
                    <span className="text-xl font-bold">
                      {score}/{questions.length}
                    </span>
                  </div>
                </div>

                <h2 className="mt-6 text-lg font-semibold">
                  Congratulations 🎉
                </h2>

                <button
                  onClick={() =>
                    router.push(`/dashboard/conferences/${conferenceId}`)
                  }
                  className="mt-6 px-8 py-2 bg-[#1F5C9E] text-white rounded-md font-semibold"
                >
                  BACK TO CONFERENCE
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT – SPONSOR */}
          <div className="bg-white rounded-2xl shadow p-6 sticky top-6 h-fit flex flex-col items-center">
            <p className="text-xs text-gray-500 mb-4">
              EDUCATIONAL GRANT BY
            </p>
            <Image
              src="/Sun_Pharma.png"
              alt="Sun Pharma"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    );
  }

  /* ================= QUIZ PAGE ================= */
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">

        {/* LEFT – QUIZ */}
        <div>
          <h1 className="text-center font-semibold mb-4">
            Quiz
          </h1>

          <div className="bg-white rounded-xl shadow p-4 w-fit mx-auto mb-6">
            <TimerCircle
              timeLeft={timeLeft}
              total={perQuestionSeconds}
            />
          </div>

          <div className="text-right text-sm font-semibold text-blue-700 mb-4">
            QUESTIONS : {index + 1} / {questions.length}
          </div>

          <h2 className="font-semibold mb-6">
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
                <div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center font-semibold">
                  {String.fromCharCode(65 + i)}
                </div>
                <span>{opt}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={submitAnswer}
              disabled={selected === null}
              className="px-8 py-2 bg-blue-700 text-white rounded-md disabled:opacity-50"
            >
              SUBMIT ANSWER
            </button>
            <button
              onClick={skipQuestion}
              className="px-8 py-2 border border-blue-700 text-blue-700 rounded-md"
            >
              SKIP
            </button>
          </div>
        </div>

        {/* RIGHT – SPONSOR */}
        <div className="bg-white rounded-2xl shadow p-6 sticky top-6 h-fit flex flex-col items-center">
          <p className="text-xs text-gray-500 mb-4">
            EDUCATIONAL GRANT BY
          </p>
          <Image
            src="/Sun_Pharma.png"
            alt="Sun Pharma"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
