"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { webinars } from "@/app/data/webinar";
import { overviews } from "@/app/data/webinar/overview";
import { facultyByWebinar } from "@/app/data/webinar/faculty";
import { faqByWebinar } from "@/app/data/webinar/faq";

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

export default function WebinarDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = parseInt(params.id, 10);

  // main webinar meta
  const w = webinars.find((x) => x.id === id);
  // per-section separate data
  const overview = overviews[id];
  const faculty = facultyByWebinar[id] ?? [];
  const faq = faqByWebinar[id] ?? [];

  const [tab, setTab] = useState<"overview" | "faculty" | "faq" | "feedback" | "quiz">("overview");
  const [registerOpen, setRegisterOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  // comments live in overview data — keep local state so comments update without editing files
  const [comments, setComments] = useState(overview?.comments ?? []);
  const [commentText, setCommentText] = useState("");

  if (!w) return <div className="p-8">Webinar not found</div>;

  function onAddComment() {
    if (!commentText.trim()) return;
    const newC = { id: `c${Date.now()}`, author: "You", profile: "/images/users/my-profile.jpg", text: commentText, date: new Date().toISOString() };
    setComments((p) => [newC, ...p]);
    setCommentText("");
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* top card kept identical */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe src={w.videoUrl} title={w.title} className="absolute inset-0 w-full h-full" frameBorder={0} allowFullScreen />
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
          <p className="mt-4 text-gray-700">{overview?.description}</p>

          <div className="mt-6 flex gap-4">
            {w.price > 0 ? (
              <button onClick={() => setPurchaseOpen(true)} className="px-4 py-2 bg-orange-500 text-white rounded-full">₹{w.price} | Buy Now</button>
            ) : (
              <button onClick={() => setRegisterOpen(true)} className="px-4 py-2 bg-green-600 text-white rounded-full">Register Free</button>
            )}
            <button onClick={() => router.push("/dashboard/webinar")} className="px-4 py-2 border rounded">Back to List</button>
          </div>
        </div>
      </div>

      {/* tabs + per-section content */}
      <div className="mt-6 bg-white rounded-2xl p-4 shadow">
        <div className="flex gap-3 border-b pb-3 overflow-x-auto">
          {["overview", "faculty", "faq", "feedback", "quiz"].map((t) => (
            <button key={t} onClick={() => setTab(t as any)} className={`capitalize px-3 py-1.5 rounded-md text-sm ${tab === t ? "bg-[#E8F3FF] text-[#1F5C9E] font-semibold" : "text-gray-600 hover:bg-gray-50"}`}>{t}</button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "overview" && (
            <div className="bg-white rounded-xl border p-6">
              <Overview description={overview?.description} comments={comments} commentText={commentText} setCommentText={setCommentText} onAddComment={onAddComment} />
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
              <Feedback />
            </div>
          )}
          {tab === "quiz" && (
            <div className="bg-white rounded-xl border p-6">
              <Quiz />
            </div>
          )}
        </div>
      </div>

      {/* modals */}
      <Modal open={registerOpen} onClose={() => setRegisterOpen(false)} title="Register for Webinar">
        <RegisterForm webinarId={w.id.toString()} onDone={() => setRegisterOpen(false)} />
      </Modal>

      <Modal open={purchaseOpen} onClose={() => setPurchaseOpen(false)} title="Purchase Ticket">
        <PurchaseForm webinarId={w.id.toString()} price={w.price} onDone={() => setPurchaseOpen(false)} />
      </Modal>
    </div>
  );
}
