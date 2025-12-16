"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
// import Image from "next/image";

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

export default function QuizRunnerClient() {
  const params = useParams();
  const webinarId = Number(params.id);
  const router = useRouter();

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
      <div className="p-8 max-w-xl mx-auto text-center bg-white rounded-2xl shadow">
        <h2 className="text-2xl font-bold">
          {correctCount} / {questions.length}
        </h2>
        <p className="mt-2 text-gray-600">
          You have successfully completed the quiz
        </p>
        <button
          onClick={() => router.push(`/dashboard/webinar/${webinar.id}`)}
          className="mt-6 px-6 py-2 bg-blue-700 text-white rounded"
        >
          Back to Webinar
        </button>
      </div>
    );
  }

  /* ================= QUIZ UI ================= */
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-xl font-semibold mb-2">
        Question {index + 1} / {questions.length}
      </h1>

      {/* TIMER DISPLAY */}
      <div className="mb-4 text-right font-semibold text-green-700">
        Time Left: {formatMMSS(timeLeft)}
      </div>

      <p className="mb-6">{q.q}</p>

      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-full p-4 border rounded transition ${
              selected === i
                ? "bg-blue-50 border-blue-500"
                : "hover:bg-gray-50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="px-6 py-2 bg-blue-700 text-white rounded disabled:opacity-50"
        >
          Submit
        </button>

        <button
          onClick={handleSkip}
          className="px-6 py-2 border rounded"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
