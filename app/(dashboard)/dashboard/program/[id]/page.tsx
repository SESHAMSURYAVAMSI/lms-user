"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { programs } from "@/app/data/program/program";
import { overviews } from "@/app/data/program/overview";
import { facultyByProgram } from "@/app/data/program/faculty";
import { faqByProgram } from "@/app/data/program/faq";
import { feedbackByProgram } from "@/app/data/program/feedback";
import { quizByProgram, quizMetaByProgram } from "@/app/data/program/quiz";

import Modal from "@/app/components/dashboard/program/Modal";
import RegisterForm from "@/app/components/dashboard/program/RegisterForm";
import PurchaseForm from "@/app/components/dashboard/program/PurchaseForm";

import ProgramOverview from "@/app/components/dashboard/program/tabs/ProgramOverview";
import ProgramFaculty from "@/app/components/dashboard/program/tabs/ProgramFaculty";
import ProgramFAQ from "@/app/components/dashboard/program/tabs/ProgramFAQ";
import ProgramFeedback from "@/app/components/dashboard/program/tabs/ProgramFeedback";
import ProgramQuiz from "@/app/components/dashboard/program/tabs/ProgramQuiz";

import { CalendarDays, Clock } from "lucide-react";

/* ================= TYPES ================= */
type TabType = "overview" | "faculty" | "faq" | "feedback" | "quiz";

export default function ProgramDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const programId = Number(params.id);

  const program = programs.find((p) => p.id === programId);
  const overview = overviews[programId as keyof typeof overviews];
  const faculty = facultyByProgram[programId] ?? [];
  const faq = faqByProgram[programId] ?? [];
  const feedbackCfg =
    feedbackByProgram[programId] ?? { placeholder: "Share your feedback..." };
  const quiz = quizByProgram[programId] ?? [];

  const [tab, setTab] = useState<TabType>("overview");
  const [registerOpen, setRegisterOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  const [comments, setComments] = useState(overview?.comments ?? []);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setComments(overview?.comments ?? []);
    setCommentText("");
  }, [overview]);

  if (!program) {
    return <div className="p-8 text-center">Program not found</div>;
  }

  const questionsCount = quiz.length;
  const perQuestionSeconds =
    quizMetaByProgram[programId]?.perQuestionSeconds ?? 30;

  const durationMinutes =
    Math.ceil((questionsCount * perQuestionSeconds) / 60) || 5;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* ===== Breadcrumb ===== */}
      <div className="mb-4 flex items-center gap-2 text-sm">
        <button
          onClick={() => router.push("/dashboard/program")}
          className="text-orange-600 font-medium hover:underline"
        >
          Program
        </button>
        <span className="text-gray-400">{">"}</span>
        <span className="text-gray-600 font-medium">
          {program.title}
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
                src={program.videoUrl ?? ""}
                title={program.title}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-semibold text-[#252641]">
                {program.title}
              </h1>

              {/* META */}
              <div className="mt-3 text-sm text-gray-700 space-y-2">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  {program.startDate} – {program.endDate}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {program.time}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 border border-black" />
                    <span className="font-medium text-green-600">
                      {program.mode}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-gray-700">
                {overview?.description}
              </p>

              {/* ACTION */}
              <div className="mt-6 flex gap-4">
                {program.price > 0 ? (
                  <button
                    onClick={() => setPurchaseOpen(true)}
                    className="px-5 py-2 bg-orange-500 text-white rounded-full"
                  >
                    ₹{program.price} | Buy Program
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
                <ProgramOverview
                  description={overview?.description}
                  comments={comments}
                  commentText={commentText}
                  setCommentText={setCommentText}
                  onAddComment={() => {}}
                />
              )}
              {tab === "faculty" && (
                <ProgramFaculty faculty={faculty} />
              )}
              {tab === "faq" && <ProgramFAQ faq={faq} />}
              {tab === "feedback" && (
                <ProgramFeedback
                  cfg={feedbackCfg}
                  programId={programId}
                />
              )}
              {tab === "quiz" && (
                <ProgramQuiz
                  title={program.title}
                  subtitle="Subsection"
                  durationMinutes={`${durationMinutes} Minutes`}
                  questionsCount={questionsCount}
                  perQuestionSeconds={perQuestionSeconds}
                  onStart={() =>
                    router.push(
                      `/dashboard/program/${programId}/quiz-runner`
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
        title="Register for Program"
      >
        <RegisterForm
          programId={String(programId)}
          onDone={() => setRegisterOpen(false)}
        />
      </Modal>

      <Modal
        open={purchaseOpen}
        onClose={() => setPurchaseOpen(false)}
        title="Purchase Program"
      >
        <PurchaseForm
          programId={String(programId)}
          price={program.price}
          onDone={() => setPurchaseOpen(false)}
        />
      </Modal>
    </div>
  );
}
