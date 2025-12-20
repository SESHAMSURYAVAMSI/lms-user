"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { webinars } from "@/app/data/webinar/webinar";
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

import { CalendarDays, Clock } from "lucide-react";

/* ================= TYPES ================= */
type TabType = "overview" | "faculty" | "faq" | "feedback" | "quiz";

export default function WebinarDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const webinar = webinars.find((w) => w.id === id);
  const overview = overviews[id as keyof typeof overviews];
  const faculty = facultyByWebinar[id] ?? [];
  const faq = faqByWebinar[id] ?? [];
  const feedbackCfg =
    feedbackByWebinar[id] ?? { placeholder: "Share your feedback..." };
  const quiz = quizByWebinar[id] ?? [];

  const [tab, setTab] = useState<TabType>("overview");
  const [registerOpen, setRegisterOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  const [comments, setComments] = useState(overview?.comments ?? []);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setComments(overview?.comments ?? []);
    setCommentText("");
  }, [overview]);

  if (!webinar) {
    return <div className="p-8 text-center">Webinar not found</div>;
  }

  const questionsCount = quiz.length;
  const perQuestionSeconds =
    quizMetaByWebinar[id]?.perQuestionSeconds ?? 30;

  const durationMinutes =
    Math.ceil((questionsCount * perQuestionSeconds) / 60) || 5;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* ===== Breadcrumb ===== */}
      <div className="mb-4 flex items-center gap-2 text-sm">
        <button
          onClick={() => router.push("/dashboard/webinar")}
          className="text-orange-600 font-medium hover:underline"
        >
          Webinar
        </button>
        <span className="text-gray-400">{">"}</span>
        <span className="text-gray-600 font-medium">
          {webinar.title}
        </span>
      </div>

      {/* ===== Layout ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        {/* LEFT */}
        <div className="space-y-6">
          {/* Video */}
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="relative w-full pt-[56.25%]">
              <iframe
                src={webinar.videoUrl ?? ""}
                title={webinar.title}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-semibold text-[#252641]">
                {webinar.title}
              </h1>

              {/* ===== META ===== */}
              <div className="mt-3 text-sm text-gray-700 space-y-2">
                {/* DATE */}
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  <span>
                    {webinar.startDate} – {webinar.endDate}
                  </span>
                </div>

                {/* TIME + MODE (DOT WITH MODE ON RIGHT) */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{webinar.time}</span>
                  </div>

                  {/* MODE WITH GREEN DOT */}
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 border border-black inline-block" />
                    <span className="font-medium text-green-600">
                      {webinar.mode}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-gray-700">
                {overview?.description}
              </p>

              {/* ACTION BUTTON */}
              <div className="mt-6 flex gap-4">
                {webinar.price && webinar.price > 0 ? (
                  <button
                    onClick={() => setPurchaseOpen(true)}
                    className="px-5 py-2 bg-orange-500 text-white rounded-full"
                  >
                    ₹{webinar.price} | Buy Now
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

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow p-4">
            <div className="flex gap-3 border-b pb-3">
              {(
                ["overview", "faculty", "FAQ", "feedback", "quiz"] as TabType[]
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
              {tab === "faculty" && <Faculty faculty={faculty} />}
              {tab === "faq" && <FAQ faq={faq} />}
              {tab === "feedback" && (
                <Feedback cfg={feedbackCfg} webinarId={id} />
              )}
              {tab === "quiz" && (
                <Quiz
                  title={webinar.title}
                  subtitle="Subsection"
                  durationMinutes={`${durationMinutes} Minutes`}
                  questionsCount={questionsCount}
                  perQuestionSeconds={perQuestionSeconds}
                  onStart={() =>
                    router.push(
                      `/dashboard/webinar/${webinar.id}/quiz-runner`
                    )
                  }
                />
              )}
            </div>
          </div>
        </div>

        {/* RIGHT (Sponsor) */}
        <div className="bg-white rounded-2xl shadow p-6 sticky top-6 h-fit flex flex-col items-center">
          <p className="text-xs text-gray-500 mb-4">
            EDUCATIONAL GRANT BY
          </p>
          <Image
            src="/Sun_Pharma.png"
            alt="Sun Pharma"
            width={60}
            height={60}
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
          webinarId={String(webinar.id)}
          onDone={() => setRegisterOpen(false)}
        />
      </Modal>

      <Modal
        open={purchaseOpen}
        onClose={() => setPurchaseOpen(false)}
        title="Purchase Ticket"
      >
        <PurchaseForm
          webinarId={String(webinar.id)}
          price={webinar.price ?? 0}
          onDone={() => setPurchaseOpen(false)}
        />
      </Modal>
    </div>
  );
}
