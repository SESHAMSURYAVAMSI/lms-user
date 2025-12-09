"use client";

import { webinars } from "@/app/data/webinar";
import { notFound } from "next/navigation";
import Image from "next/image";
import Comments from "@/app/components/dashboard/webinar/comments";

export default function WebinarDetails({ params }: { params: { id: string } }) {
  const webinar = webinars.find((w) => String(w.id) === params.id);
  if (!webinar) return notFound();

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-orange-500 mb-2">
        Webinar &gt; {webinar.title}
      </div>

      {/* ---------- FIRST ROW: Video + Educational Grant ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        {/* LEFT SIDE: Webinar Details Card */}
        <div className="bg-white rounded-xl shadow-md p-4">
          {/* Thumbnail */}
          <div className="relative w-full mb-4">
            <Image
              src={webinar.image}
              alt={webinar.title}
              width={400}
              height={400}
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>

          {/* Details */}
          <h1 className="text-2xl font-bold text-[#252641] mb-2">
            {webinar.title}
          </h1>
          <p className="text-gray-600 mb-1">
            {webinar.startDate} - {webinar.endDate} | {webinar.time}
          </p>
          <p className="text-green-600 font-medium mb-3">{webinar.mode}</p>

          <button className="bg-[#1F5C9E] text-white px-6 py-2 rounded-md hover:bg-[#184b84] transition">
            Register Free
          </button>
        </div>

        {/* RIGHT SIDE: Sponsor / Educational Grant Box */}
        <div className="bg-white p-8 rounded-2xl shadow-md self-start h-[300px] flex flex-col justify-center sticky top-24">
          <h3 className="font-semibold mb-5 text-center text-gray-700">
            EDUCATIONAL GRANT BY
          </h3>
          <div className="flex justify-center items-center flex-1">
            <Image
              src="/sun_pharma.png"
              alt="Sponsor"
              width={70}
              height={80}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* ---------- SECOND ROW: Tabs + About + Comments ---------- */}
      <div className="bg-white rounded-2xl shadow-md p-4 w-full lg:w-[calc(100%-320px)]">
        {/* Tabs */}
        <div className="flex gap-6 border-b mb-6 text-sm font-medium">
          <button className="text-[#1F5C9E] border-b-2 border-[#1F5C9E] pb-2">
            Overview
          </button>
          <button className="text-gray-500 hover:text-[#1F5C9E] pb-2">
            Faculty
          </button>
          <button className="text-gray-500 hover:text-[#1F5C9E] pb-2">FAQ</button>
          <button className="text-gray-500 hover:text-[#1F5C9E] pb-2">
            Feedback
          </button>
        </div>

        {/* About Webinar */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2 text-[#252641]">
            About Webinar
          </h2>
          <p className="text-gray-600 leading-relaxed">{webinar.description}</p>
        </div>

        {/* Comments (with scroll) */}
        <div className="border-t pt-4 max-h-[350px] overflow-y-auto rounded-md bg-gray-50 p-4">
          <Comments />
        </div>
      </div>
    </div>
  );
}
