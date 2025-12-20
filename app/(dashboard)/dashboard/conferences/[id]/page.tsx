"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { LIVE_CONFERENCES } from "@/app/data/conferences/liveConference";
import { overviews } from "@/app/data/conferences/overview";
import { facultyByConference } from "@/app/data/conferences/faculty";
import { faqByConference } from "@/app/data/conferences/faq";
import { feedbackByConference } from "@/app/data/conferences/feedback";
import {
  quizByConference,
  quizMetaByConference,
} from "@/app/data/conferences/quiz";

import Modal from "@/app/components/dashboard/webinar/Modal";
import RegisterForm from "@/app/components/dashboard/webinar/RegisterForm";
import PurchaseForm from "@/app/components/dashboard/webinar/PurchaseForm";

import Overview from "@/app/components/dashboard/webinar/tabs/Overview";
import Faculty from "@/app/components/dashboard/webinar/tabs/Faculty";
import FAQ from "@/app/components/dashboard/webinar/tabs/FAQ";
import Feedback from "@/app/components/dashboard/webinar/tabs/Feedback";
import Quiz from "@/app/components/dashboard/webinar/tabs/Quiz";

import { CalendarDays, Clock } from "lucide-react";

/* ================= TYPES ================= */
type TabType = "overview" | "faculty" | "faq" | "feedback" | "quiz";

export default function ConferenceDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const conference = LIVE_CONFERENCES.find((c) => c.id === id);
  const overview = overviews[id as keyof typeof overviews];
  const faculty = facultyByConference[id] ?? [];
  const faq = faqByConference[id] ?? [];
  const feedbackCfg =
    feedbackByConference[id] ?? { placeholder: "Share your feedback..." };
  const quiz = quizByConference[id] ?? [];

  const [tab, setTab] = useState<TabType>("overview");
  const [registerOpen, setRegisterOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  const [comments, setComments] = useState(overview?.comments ?? []);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setComments(overview?.comments ?? []);
    setCommentText("");
  }, [overview]);

  if (!conference) {
    return (
      <div className="p-8 text-center">
        Conference not found
      </div>
    );
  }

  const questionsCount = quiz.length;
  const perQuestionSeconds =
    quizMetaByConference[id]?.perQuestionSeconds ?? 30;

  const durationMinutes =
    Math.ceil((questionsCount * perQuestionSeconds) / 60) || 5;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* BREADCRUMB */}
      <div className="mb-4 flex items-center gap-2 text-sm">
        <button
          onClick={() =>
            router.replace("/dashboard/conferences")
          }
          className="text-orange-600 font-medium hover:underline"
        >
          Live Conference
        </button>
        <span className="text-gray-400">{">"}</span>
        <span className="text-gray-600 font-medium">
          {conference.title}
        </span>
      </div>

      {/* LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        {/* LEFT */}
        <div className="space-y-6">
          {/* VIDEO */}
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="relative w-full pt-[56.25%]">
              <iframe
                src={conference.videoUrl ?? ""}
                title={conference.title}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-semibold text-[#252641]">
                {conference.title}
              </h1>

              {/* META */}
              <div className="mt-3 text-sm text-gray-700 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    {conference.startDate} - {conference.endDate}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 border border-black" />
                    <span className="font-medium text-green-600">
                      {conference.mode}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  {conference.time}
                </div>
              </div>

              <p className="mt-4 text-gray-700">
                {overview?.description}
              </p>

              {/* ACTION */}
              <div className="mt-6">
                {conference.price && conference.price > 0 ? (
                  <button
                    onClick={() => setPurchaseOpen(true)}
                    className="px-5 py-2 bg-orange-500 text-white rounded-full"
                  >
                    ₹{conference.price} | Buy Ticket
                  </button>
                ) : (
                  <button
                    onClick={() => setRegisterOpen(true)}
                    className="px-5 py-2 bg-green-600 text-white rounded-full"
                  >
                    Register Free
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="bg-white rounded-2xl shadow p-4">
            <div className="flex gap-3 border-b pb-3">
              {(
                ["overview", "faculty", "faq", "feedback", "quiz"] as TabType[]
              ).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
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
                  description={overview?.description}
                  comments={comments}
                  commentText={commentText}
                  setCommentText={setCommentText}
                  onAddComment={() => {}}
                />
              )}
              {tab === "faculty" && (
                <Faculty faculty={faculty} />
              )}
              {tab === "faq" && <FAQ faq={faq} />}
              {tab === "feedback" && (
                <Feedback cfg={feedbackCfg} webinarId={id} />
              )}
              {tab === "quiz" && (
                <Quiz
                  title={conference.title}
                  subtitle="Conference Session"
                  durationMinutes={`${durationMinutes} Minutes`}
                  questionsCount={questionsCount}
                  perQuestionSeconds={perQuestionSeconds}
                  onStart={() =>
                    router.push(
                      `/dashboard/conferences/${conference.id}/quiz-runner`
                    )
                  }
                />
              )}
            </div>
          </div>
        </div>

        {/* RIGHT – SPONSOR */}
        <div className="bg-white rounded-2xl shadow p-6 sticky top-6 h-fit flex flex-col items-center">
          <p className="text-xs text-gray-500 mb-4">
            EDUCATIONAL GRANT BY
          </p>
          <Image
            src="/sun_pharma.png"
            alt="Sun Pharma"
            width={70}
            height={50}
            className="object-contain"
          />
        </div>
      </div>

      {/* MODALS */}
      <Modal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        title="Register for Conference"
      >
        <RegisterForm
          webinarId={String(conference.id)}
          onDone={() => setRegisterOpen(false)}
        />
      </Modal>

      <Modal
        open={purchaseOpen}
        onClose={() => setPurchaseOpen(false)}
        title="Purchase Conference Ticket"
      >
        <PurchaseForm
          webinarId={String(conference.id)}
          price={conference.price ?? 0}
          onDone={() => setPurchaseOpen(false)}
        />
      </Modal>
    </div>
  );
}
