"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { workshops } from "@/app/data/workshop/workshop";
import { overviews } from "@/app/data/workshop/overview";
import { facultyByWorkshop } from "@/app/data/workshop/faculty";
import { faqByWorkshop } from "@/app/data/workshop/faq";
import { feedbackByWorkshops } from "@/app/data/workshop/feedback";
import { quizByWorkshop, quizMetaByWorkshop } from "@/app/data/workshop/quiz";

import Modal from "@/app/components/dashboard/workshop/Modal";
import RegisterForm from "@/app/components/dashboard/workshop/RegisterForm";
import PurchaseForm from "@/app/components/dashboard/workshop/PurchaseForm";

import WorkshopOverview from "@/app/components/dashboard/workshop/tabs/WorkshopOverview";
import WorkshopFaculty from "@/app/components/dashboard/workshop/tabs/WorkshopFaculty";
import WorkshopFAQ from "@/app/components/dashboard/workshop/tabs/WorkshopFAQ";
import WorkshopFeedback from "@/app/components/dashboard/workshop/tabs/WorkshopFeedback";
import WorkshopQuiz from "@/app/components/dashboard/workshop/tabs/WorkshopQuiz";

import { CalendarDays, Clock } from "lucide-react";

/* ================= TYPES ================= */
type TabType = "overview" | "faculty" | "faq" | "feedback" | "quiz";

export default function WorkshopDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const workshopId = Number(params.id);

  const workshop = workshops.find((w) => w.id === workshopId);
  const overview = overviews[workshopId as keyof typeof overviews];
  const faculty = facultyByWorkshop[workshopId] ?? [];
  const faq = faqByWorkshop[workshopId] ?? [];
  const feedbackCfg =
    feedbackByWorkshops[workshopId] ?? {
      placeholder: "Share your feedback...",
    };
  const quiz = quizByWorkshop[workshopId] ?? [];

  const [tab, setTab] = useState<TabType>("overview");
  const [registerOpen, setRegisterOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  const [comments, setComments] = useState(overview?.comments ?? []);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setComments(overview?.comments ?? []);
    setCommentText("");
  }, [overview]);

  if (!workshop) {
    return (
      <div className="p-8 text-center">
        Workshop not found
      </div>
    );
  }

  const questionsCount = quiz.length;
  const perQuestionSeconds =
    quizMetaByWorkshop[workshopId]?.perQuestionSeconds ?? 30;

  const durationMinutes =
    Math.ceil((questionsCount * perQuestionSeconds) / 60) || 5;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* ===== Breadcrumb ===== */}
      <div className="mb-4 flex items-center gap-2 text-sm">
        <button
          onClick={() => router.push("/dashboard/workshop")}
          className="text-orange-600 font-medium hover:underline"
        >
          Workshop
        </button>
        <span className="text-gray-400">{">"}</span>
        <span className="text-gray-600 font-medium">
          {workshop.title}
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
                src={workshop.videoUrl ?? ""}
                title={workshop.title}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-semibold text-[#252641]">
                {workshop.title}
              </h1>

              {/* META */}
              <div className="mt-3 text-sm text-gray-700 space-y-2">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  {workshop.startDate} – {workshop.endDate}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {workshop.time}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 border border-black" />
                    <span className="font-medium text-green-600">
                      {workshop.mode}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-gray-700">
                {overview?.description}
              </p>

              {/* ACTION */}
              <div className="mt-6 flex gap-4">
                {workshop.price > 0 ? (
                  <button
                    onClick={() => setPurchaseOpen(true)}
                    className="px-5 py-2 bg-orange-500 text-white rounded-full"
                  >
                    ₹{workshop.price} | Buy Workshop
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
              {(["overview", "faculty", "faq", "feedback", "quiz"] as TabType[]).map(
                (t) => (
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
                )
              )}
            </div>

            <div className="mt-6">
              {tab === "overview" && (
                <WorkshopOverview
                  description={overview?.description}
                  comments={comments}
                  commentText={commentText}
                  setCommentText={setCommentText}
                  onAddComment={() => {}}
                />
              )}

              {tab === "faculty" && (
                <WorkshopFaculty faculty={faculty} />
              )}

              {tab === "faq" && <WorkshopFAQ faq={faq} />}

              {tab === "feedback" && (
                <WorkshopFeedback
                  cfg={feedbackCfg}
                  workshopId={workshopId}
                />
              )}

              {tab === "quiz" && (
                <WorkshopQuiz
                  title={workshop.title}
                  subtitle="Subsection"
                  durationMinutes={`${durationMinutes} Minutes`}
                  questionsCount={questionsCount}
                  perQuestionSeconds={perQuestionSeconds}
                  onStart={() =>
                    router.push(
                      `/dashboard/workshop/${workshopId}/quiz-runner`
                    )
                  }
                />
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
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
        title="Register for Workshop"
      >
        <RegisterForm
          workshopId={String(workshopId)}
          onDone={() => setRegisterOpen(false)}
        />
      </Modal>

      <Modal
        open={purchaseOpen}
        onClose={() => setPurchaseOpen(false)}
        title="Purchase Workshop"
      >
        <PurchaseForm
          workshopId={String(workshopId)}
          price={workshop.price}
          onDone={() => setPurchaseOpen(false)}
        />
      </Modal>
    </div>
  );
}
