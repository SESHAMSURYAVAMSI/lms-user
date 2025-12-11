"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { webinars } from "@/app/data/webinar";
import { quizByWebinar, quizMetaByWebinar } from "@/app/data/webinar/quiz";

/** format seconds to MM:SS */
function formatMMSS(sec: number) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function QuizRunner({ params }: { params: any }) {
  // unwrap params safely for this Next.js version
  const p = (React as any).use?.(params) ?? params;
  const rawId = p?.id ?? params?.id;
  const id = Number.isNaN(Number(rawId)) ? rawId : parseInt(String(rawId), 10);

  const router = useRouter();

  // load webinar (for title) and quiz data
  const webinar = (webinars || []).find((w) => w.id === id) ?? null;
  const questions = (quizByWebinar || {})[id] ?? [];
  const meta = (quizMetaByWebinar || {})[id] ?? {};
  const perQuestionSeconds = meta?.perQuestionSeconds ?? 30;

  // state
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(perQuestionSeconds);
  const [running, setRunning] = useState(true);
  const [answers, setAnswers] = useState<
    { qid: string; selectedIndex: number | null; correctIndex?: number }[]
  >([]);
  const [finished, setFinished] = useState(false);

  const timerRef = useRef<number | null>(null);

  // start/reset timer when index changes
  useEffect(() => {
    setSelected(null);
    setTimeLeft(perQuestionSeconds);
    setRunning(true);

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, perQuestionSeconds]);

  // auto-submit on timeout
  useEffect(() => {
    if (timeLeft <= 0 && running) {
      handleSubmit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  if (!webinar) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">Quiz</h2>
        <p className="mt-3 text-gray-600">Webinar not found for id: {String(id)}</p>
        <button className="mt-4 px-3 py-2 border rounded" onClick={() => router.push("/dashboard/webinar")}>
          Back to webinars
        </button>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">Quiz</h2>
        <p className="mt-3 text-gray-600">No quiz questions are available for this webinar.</p>
        <button className="mt-4 px-3 py-2 border rounded" onClick={() => router.push(`/dashboard/webinar/${id}`)}>
          Back to webinar
        </button>
      </div>
    );
  }

  const q = questions[index];

  function nextQuestion(record?: { qid: string; selectedIndex: number | null; correctIndex?: number }) {
    setAnswers((prev) => (record ? [...prev, record] : prev));
    if (index + 1 >= questions.length) {
      // finish quiz
      setFinished(true);
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setRunning(false);
      return;
    }
    setIndex((i) => i + 1);
  }

  function handleSubmit(isAuto = false) {
    const record = {
      qid: q.id,
      selectedIndex: selected,
      correctIndex: q.answerIndex,
    };

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRunning(false);

    setTimeout(() => {
      nextQuestion(record);
    }, isAuto ? 250 : 350);
  }

  function handleSkip() {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRunning(false);

    setTimeout(() => {
      nextQuestion({ qid: q.id, selectedIndex: null, correctIndex: q.answerIndex });
    }, 200);
  }

  // When finished show result card (styled as your screenshot)
  if (finished) {
    const correctCount = answers.reduce((acc, a) => (a.selectedIndex === a.correctIndex ? acc + 1 : acc), 0);
    // format two-digit like "07/10"
    const scoreText = `${String(correctCount).padStart(2, "0")}/${String(questions.length).padStart(2, "0")}`;

    // choose display name (fallback)
    const userDisplayName = "Dr. Niteesh"; // if you have auth, replace with actual user name

    return (
      <div className="p-8 min-h-screen flex items-start justify-center">
        <div className="w-full max-w-3xl">
          <div className="text-sm text-orange-600 mb-4">Webinar &gt; {webinar.title} &gt; QUIZ</div>
          <h1 className="text-2xl font-semibold mb-8 text-center">Quiz - 1 Result</h1>

          <div className="bg-white rounded-2xl shadow-lg p-12 flex items-center justify-center">
            <div className="w-full max-w-sm text-center">
              {/* orange score badge */}
              <div className="mx-auto w-28 h-28 rounded-full flex items-center justify-center bg-gradient-to-br from-orange-300 to-orange-500 shadow-inner" style={{ boxShadow: "0 6px 18px rgba(22, 78, 99, 0.06)" }}>
                <div>
                  <div className="text-white font-bold text-2xl">{scoreText}</div>
                  <div className="text-sm text-white/90 mt-0.5">Your Score</div>
                </div>
              </div>

              <h2 className="mt-6 text-xl font-semibold text-[#111827]">Congratulation</h2>
              <p className="mt-2 text-gray-600"> {userDisplayName} ! You Completed Quiz</p>

              <div className="mt-6">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-6 py-2 bg-[#1F5C9E] hover:bg-[#184a81] text-white rounded-md shadow"
                >
                  BACK TO HOME
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* top-right optional logo area (like screenshot) */}
        <div className="hidden lg:block ml-8">
          <div className="bg-white p-3 rounded shadow">
            <img src="/images/usi-logo.png" alt="logo" className="w-32 object-contain" />
          </div>
        </div>
      </div>
    );
  }

  // running question UI
  const percent = Math.max(0, Math.min(1, timeLeft / perQuestionSeconds));
  const ringSize = 96;
  const stroke = 8;
  const radius = (ringSize - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - percent);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-orange-600">Webinar &gt; {webinar.title} &gt; QUIZ</div>
          <h1 className="text-2xl font-semibold mt-2">Quiz 1</h1>
        </div>

        <div className="hidden md:block">
          <div className="bg-white p-3 rounded shadow">
            <img src="/images/usi-logo.png" alt="logo" className="w-28 object-contain" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-8">
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-xl shadow p-6 w-56 flex flex-col items-center">
            <div className="relative w-24 h-24">
              <svg width={ringSize} height={ringSize} viewBox={`0 0 ${ringSize} ${ringSize}`}>
                <circle cx={ringSize / 2} cy={ringSize / 2} r={radius} stroke="#e6f4ea" strokeWidth={stroke} fill="none" />
                <circle
                  cx={ringSize / 2}
                  cy={ringSize / 2}
                  r={radius}
                  stroke="#16A34A"
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashoffset}
                  style={{ transition: "stroke-dashoffset 250ms linear" }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-lg font-bold text-green-700">{formatMMSS(Math.max(0, timeLeft))}</div>
                <div className="text-xs text-gray-500">TIMER</div>
              </div>
            </div>
          </div>

          <div className="w-full mt-6 text-right text-sm font-semibold text-[#1F5C9E]">
            QUESTIONS : {String(index + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}
          </div>
        </div>

        <div className="mt-6">
          <div className="text-lg font-semibold">
            {index + 1}. {q.q}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {q.options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const isSelected = selected === i;
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full flex items-center gap-4 p-4 border rounded-md text-left transition ${
                  isSelected ? "bg-blue-50 border-blue-400" : "bg-white border-gray-300"
                }`}
              >
                <div className={`w-10 h-10 rounded-sm flex items-center justify-center font-semibold ${isSelected ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}>
                  {letter}
                </div>
                <div className="flex-1 text-sm text-gray-700">{opt}</div>

                <div className="w-8 h-8 flex items-center justify-center">
                  {isSelected ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="#0B6CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => {
              if (selected === null) {
                alert("Please select an answer or click Skip.");
                return;
              }
              handleSubmit(false);
            }}
            className="px-6 py-2 bg-[#0B6CFF] text-white rounded-md shadow"
          >
            SUBMIT ANSWER
          </button>

          <button onClick={handleSkip} className="px-4 py-2 border rounded-md">
            SKIP
          </button>
        </div>
      </div>
    </div>
  );
}
