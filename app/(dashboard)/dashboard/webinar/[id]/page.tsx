"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// main meta + per-section data
import { webinars } from "@/app/data/webinar"; // single-file webinars export (adjust if you use modular paths)
import { overviews } from "@/app/data/webinar/overview";
import { facultyByWebinar } from "@/app/data/webinar/faculty";
import { faqByWebinar } from "@/app/data/webinar/faq";
import { feedbackByWebinar } from "@/app/data/webinar/feedback";
import { quizByWebinar, quizMetaByWebinar } from "@/app/data/webinar/quiz";

// UI components
import Modal from "@/app/components/dashboard/webinar/Modal";
import RegisterForm from "@/app/components/dashboard/webinar/RegisterForm";
import PurchaseForm from "@/app/components/dashboard/webinar/PurchaseForm";

import Overview from "@/app/components/dashboard/webinar/tabs/Overview";
import Faculty from "@/app/components/dashboard/webinar/tabs/Faculty";
import FAQ from "@/app/components/dashboard/webinar/tabs/FAQ";
import Feedback from "@/app/components/dashboard/webinar/tabs/Feedback";
import Quiz from "@/app/components/dashboard/webinar/tabs/Quiz";

import { CalendarDays, Clock, MapPin } from "lucide-react";

export default function WebinarDetail({ params }: { params: any }) {
  // unwrap params safely (React.use(params) for Next.js migration)
  const p = (React as any).use?.(params) ?? params;
  const rawId = p?.id ?? params?.id;
  const id = Number.isNaN(Number(rawId)) ? rawId : parseInt(String(rawId), 10);

  const router = useRouter();

  // main webinar meta
  const w = (webinars || []).find((x) => x.id === id) ?? null;

  // per-section data loaded from separate files
  const overview = (overviews || {})[id] ?? null;
  const faculty = (facultyByWebinar || {})[id] ?? [];
  const faq = (faqByWebinar || {})[id] ?? [];
  const feedbackCfg = (feedbackByWebinar || {})[id] ?? { placeholder: "Share your feedback..." };

  // quiz data for this webinar (array)
  const quiz = (quizByWebinar || {})[id] ?? [];

  const [tab, setTab] = useState<"overview" | "faculty" | "faq" | "feedback" | "quiz">("overview");
  const [registerOpen, setRegisterOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  // comments live in overview data — keep local state so UI updates without editing files
  const [comments, setComments] = useState(overview?.comments ?? []);
  const [commentText, setCommentText] = useState("");

  // reinitialize comments if overview changes (e.g. navigate to different webinar)
  useEffect(() => {
    setComments(overview?.comments ?? []);
    setCommentText("");
  }, [overview?.comments]);

  if (!w) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">Webinar not found</h2>
        <p className="text-gray-600 mb-4">No webinar matches id <strong>{String(rawId)}</strong>.</p>

        <div className="text-sm text-gray-700">
          <p>Available webinars (ids):</p>
          <ul className="list-disc pl-6 mt-2">
            {(webinars || []).map((z) => (
              <li key={z.id}>
                {String(z.id)} — {z.title ?? "no title"}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  function onAddComment() {
    if (!commentText.trim()) return;
    const newC = {
      id: `c${Date.now()}`,
      author: "You",
      profile: "/images/users/my-profile.jpg",
      text: commentText.trim(),
      date: new Date().toISOString(),
    };
    setComments((p) => [newC, ...p]);
    setCommentText("");
    setTab("overview");
  }

  // --- Quiz props derived from data ---
  const questionsCount = Array.isArray(quiz) ? quiz.length : 0;

  // perQuestionSeconds: prefer overview -> quizMetaByWebinar -> fallback 30
  const perQuestionSeconds =
    (overview && (overview.perQuestionSeconds as number)) ??
    (quizMetaByWebinar && quizMetaByWebinar[id]?.perQuestionSeconds) ??
    30;

  const durationMinutesNumber = Math.ceil((questionsCount * perQuestionSeconds) / 60) || 5;
  const durationMinutesDisplay = `${String(durationMinutesNumber).padStart(2, "0")} Minutes`;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* TOP CARD */}
      <div className="bg-white rounded-2xl shadow overflow-hidden relative">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            src={w.videoUrl ?? ""}
            title={w.title}
            className="absolute inset-0 w-full h-full"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="absolute top-4 right-4 bg-white shadow-md rounded-lg p-3">
            <img src="/images/usi-logo.png" alt="USI" className="w-20 h-auto object-contain" />
          </div>
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-semibold text-[#252641]">{w.title}</h1>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2"><CalendarDays size={16} /> {w.startDate} - {w.endDate}</div>
            <div className="flex items-center gap-2"><Clock size={16} /> {w.time}</div>
            <div className="flex items-center gap-2"><MapPin size={16} /> {w.mode}</div>
          </div>

          <p className="mt-4 text-gray-700">{overview?.description ?? w.description}</p>

          <div className="mt-6 flex gap-4">
            {w.price && w.price > 0 ? (
              <button onClick={() => setPurchaseOpen(true)} className="px-4 py-2 bg-orange-500 text-white rounded-full">₹{w.price} | Buy Now</button>
            ) : (
              <button onClick={() => setRegisterOpen(true)} className="px-4 py-2 bg-green-600 text-white rounded-full">Register Free</button>
            )}

            <button onClick={() => router.push("/dashboard/webinar")} className="px-4 py-2 border rounded">Back to List</button>
          </div>
        </div>
      </div>

      {/* TABS + CONTENT */}
      <div className="mt-6 bg-white rounded-2xl p-4 shadow">
        <div className="flex gap-3 border-b pb-3 overflow-x-auto">
          {["overview", "faculty", "faq", "feedback", "quiz"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`capitalize px-3 py-1.5 rounded-md text-sm ${tab === t ? "bg-[#E8F3FF] text-[#1F5C9E] font-semibold" : "text-gray-600 hover:bg-gray-50"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "overview" && (
            <div className="bg-white rounded-xl border p-6">
              <Overview
                description={overview?.description ?? w.description}
                comments={comments}
                commentText={commentText}
                setCommentText={setCommentText}
                onAddComment={onAddComment}
              />
            </div>
          )}

          {tab === "faculty" && (
            <div className="bg-white rounded-xl border p-6">
              <Faculty faculty={faculty} />
            </div>
          )}

          {tab === "faq" && (
            <div className="bg-white rounded-xl border p-6">
              <FAQ faq={faq} />
            </div>
          )}

          {tab === "feedback" && (
            <div className="bg-white rounded-xl border p-6">
              <Feedback cfg={feedbackCfg} webinarId={id} />
            </div>
          )}

          {tab === "quiz" && (
            <div className="bg-white rounded-xl border p-6">
              <Quiz
                title={w.title}
                subtitle={overview?.subtitle ?? "Subsection"}
                durationMinutes={overview?.durationMinutes ?? durationMinutesDisplay}
                questionsCount={questionsCount || 10}
                perQuestionSeconds={perQuestionSeconds}
                onStart={() => {
                  // navigate to quiz runner page (create this route if needed)
                  router.push(`/dashboard/webinar/${w.id}/quiz-runner`);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      <Modal open={registerOpen} onClose={() => setRegisterOpen(false)} title="Register for Webinar">
        <RegisterForm webinarId={String(w.id)} onDone={() => setRegisterOpen(false)} />
      </Modal>

      <Modal open={purchaseOpen} onClose={() => setPurchaseOpen(false)} title="Purchase Ticket">
        <PurchaseForm webinarId={String(w.id)} price={w.price ?? 0} onDone={() => setPurchaseOpen(false)} />
      </Modal>
    </div>
  );
}
