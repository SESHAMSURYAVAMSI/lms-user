"use client";

import Breadcrumb from "@/app/components/dashboard/elearning/lecture/Breadcrumb";
import TopicCard from "@/app/components/dashboard/elearning/lecture/TopicCard";
import ViewContent from "@/app/components/dashboard/elearning/lecture/ViewContent";
import VideoContent from "@/app/components/dashboard/elearning/lecture/VideoContent";
import Questions from "@/app/components/dashboard/elearning/lecture/Questions";
import ReplyBox from "@/app/components/dashboard/elearning/lecture/ReplyBox";
import Comments from "@/app/components/dashboard/elearning/lecture/Comments";

import { LECTURE_DATA } from "@/app/data/elearning/lectureData";
import { LECTURE_ASSETS } from "@/app/data/elearning/lectureContent";
import { LECTURE_QUESTIONS } from "@/app/data/elearning/lectureQuestions";
import { LECTURE_COMMENTS } from "@/app/data/elearning/lectureComments";

export default function LecturePage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= BREADCRUMB ================= */}
      <Breadcrumb title={LECTURE_DATA.courseTitle} />

      {/* ================= PAGE CONTENT ================= */}
      <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">

        {/* TOPIC */}
        <TopicCard
          week={LECTURE_DATA.week}
          topic={LECTURE_DATA.topic}
          description={LECTURE_DATA.description}
        />

        {/* FILE CONTENT */}
        <ViewContent assets={LECTURE_ASSETS} />

        {/* VIDEO */}
        <VideoContent url={LECTURE_DATA.videoUrl} />

        {/* QUESTIONS */}
        <Questions questions={LECTURE_QUESTIONS} />

        {/* REPLY */}
        <ReplyBox />

        {/* COMMENTS */}
        <Comments comments={LECTURE_COMMENTS} />

      </div>
    </div>
  );
}
