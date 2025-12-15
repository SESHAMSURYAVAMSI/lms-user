"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

import { webinars } from "@/app/data/webinar";
import { overviews } from "@/app/data/webinar/overview";
import { facultyByWebinar } from "@/app/data/webinar/faculty";
import { faqByWebinar } from "@/app/data/webinar/faq";
import { feedbackByWebinar } from "@/app/data/webinar/feedback";
import { quizByWebinar, quizMetaByWebinar } from "@/app/data/webinar/quiz";

import Modal from "@/app/components/dashboard/webinar/Modal";
import RegisterForm from "@/app/components/dashboard/webinar/RegisterForm";
import PurchaseForm from "@/app/components/dashboard/webinar/PurchaseForm";

import Overview from "@/app/components/dashboard/webinar/tabs/Overview";
import Faculty from "@/app/components/dashboard/webinar/tabs/Faculty";
import FAQ from "@/app/components/dashboard/webinar/tabs/FAQ";
import Feedback from "@/app/components/dashboard/webinar/tabs/Feedback";
import Quiz from "@/app/components/dashboard/webinar/tabs/Quiz";

import { CalendarDays, Clock, MapPin } from "lucide-react";

export default function WebinarDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const id = Number(params.id);

  const [tab, setTab] =
    useState<"overview" | "faculty" | "faq" | "feedback" | "quiz">("overview");

  const [registerOpen, setRegisterOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  const [comments, setComments] = useState<{ id: string; text: string; author: string }[]>([]);
  const [commentText, setCommentText] = useState("");

  const w = webinars.find((x) => x.id === id);

  const overview = overviews[id as keyof typeof overviews];
  const faculty = facultyByWebinar[id as keyof typeof facultyByWebinar] ?? [];
  const faq = faqByWebinar[id as keyof typeof faqByWebinar] ?? [];
  const feedbackCfg =
    feedbackByWebinar[id as keyof typeof feedbackByWebinar] ?? { placeholder: "Share your feedback..." };
  const quiz = quizByWebinar[id as keyof typeof quizByWebinar] ?? [];

  useEffect(() => {
    setComments(overview?.comments ?? []);
    setCommentText("");
  }, [overview?.comments]);

  if (!w) return <div className="p-8">Webinar not found</div>;

  const questionsCount = quiz.length;
  const perQuestionSeconds =
    quizMetaByWebinar[id]?.perQuestionSeconds ?? 30;

  const durationMinutes =
    Math.ceil((questionsCount * perQuestionSeconds) / 60) || 5;

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm">
        <button
          onClick={() => router.push("/dashboard/webinar")}
          className="text-orange-600 hover:underline font-medium"
        >
          Webinar
        </button>
        <span className="text-gray-400">{">"}</span>
        <span className="text-orange-600 font-medium">{w.title}</span>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">

        {/* LEFT */}
        <div className="space-y-6">

          {/* Video */}
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={w.videoUrl ?? ""}
                title={w.title}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-semibold text-[#252641]">
                {w.title}
              </h1>

              <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} /> {w.startDate} - {w.endDate}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} /> {w.time}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} /> {w.mode}
                </div>
              </div>

              <p className="mt-4 text-gray-700">
                {overview?.description}
              </p>

              <div className="mt-6 flex gap-4">
                {w.price && w.price > 0 ? (
                  <button
                    onClick={() => setPurchaseOpen(true)}
                    className="px-5 py-2 bg-orange-500 text-white rounded-full"
                  >
                    ₹{w.price} | Buy Now
                  </button>
                ) : (
                  <button
                    onClick={() => setRegisterOpen(true)}
                    className="px-5 py-2 bg-green-600 text-white rounded-full"
                  >
                    Register Free
                  </button>
                )}

                <button
                  onClick={() => router.push("/dashboard/webinar")}
                  className="px-5 py-2 border rounded-full"
                >
                  Back to List
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow p-4">
            <div className="flex gap-3 border-b pb-3 overflow-x-auto">
              {["overview", "faculty", "faq", "feedback", "quiz"].map((t) => (
                <button
                  key={t}
                  onClick={() =>
                    setTab(t as "overview" | "faculty" | "faq" | "feedback" | "quiz")
                  }
                  className={`capitalize px-3 py-1.5 rounded-md text-sm ${
                    tab === t
                      ? "bg-[#E8F3FF] text-[#1F5C9E] font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {tab === "overview" && (
                <Overview
                  description={overview?.description ?? ""}
                  comments={comments}
                  commentText={commentText}
                  setCommentText={setCommentText}
                  onAddComment={() => {}}
                />
              )}
              {tab === "faculty" && <Faculty faculty={faculty} />}
              {tab === "faq" && <FAQ faq={faq} />}
              {tab === "feedback" && (
                <Feedback cfg={feedbackCfg} webinarId={id} />
              )}
              {tab === "quiz" && (
                <Quiz
                  title={w.title}
                  subtitle="Subsection"
                  durationMinutes={`${durationMinutes} Minutes`}
                  questionsCount={questionsCount || 10}
                  perQuestionSeconds={perQuestionSeconds}
                  onStart={() =>
                    router.push(`/dashboard/webinar/${w.id}/quiz-runner`)
                  }
                />
              )}
            </div>
          </div>
        </div>

        {/* RIGHT – SPONSOR */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center sticky top-6 h-fit">
          <p className="text-xs text-gray-500 mb-4 text-center">
            EDUCATIONAL GRANT BY
          </p>
          <Image
            src="/sun_pharma.png"
            alt="Sun Pharma"
            width={60}
            height={50}
            className="object-contain"
          />
        </div>
      </div>

      {/* Modals */}
      <Modal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        title="Register for Webinar"
      >
        <RegisterForm
          webinarId={String(w.id)}
          onDone={() => setRegisterOpen(false)}
        />
      </Modal>

      <Modal
        open={purchaseOpen}
        onClose={() => setPurchaseOpen(false)}
        title="Purchase Ticket"
      >
        <PurchaseForm
          webinarId={String(w.id)}
          price={w.price ?? 0}
          onDone={() => setPurchaseOpen(false)}
        />
      </Modal>
    </div>
  );
}
