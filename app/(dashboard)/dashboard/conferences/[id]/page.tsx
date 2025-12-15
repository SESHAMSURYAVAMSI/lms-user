"use client";

import { useParams } from "next/navigation";
import { LIVE_CONFERENCES } from "@/app/data/liveConference";
import { useState } from "react";
import RegisterModal from "@/app/components/dashboard/RegisterModal";

export default function LiveConferenceDetailsPage() {
  const { id } = useParams();
  const conference = LIVE_CONFERENCES.find(
    (c) => c.id === Number(id)
  );

  const [open, setOpen] = useState(false);

  if (!conference) {
    return (
      <div className="p-10 text-center text-gray-500">
        Conference not found
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-[#252641]">
        {conference.title}
      </h1>

      {/* Meta */}
      <p className="text-gray-600">
        {conference.dateRange} • {conference.time} • {conference.mode}
      </p>

      {/* Action */}
      <div className="pt-4">
        <button
          onClick={() => setOpen(true)}
          className={`px-6 py-2 rounded-full font-semibold ${
            conference.price > 0
              ? "bg-orange-500 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          {conference.price > 0
            ? `₹${conference.price} | Buy Now`
            : "Register Free"}
        </button>
      </div>

      {/* SAME MODAL AS WEBINAR */}
      <RegisterModal
        open={open}
        onClose={() => setOpen(false)}
        course={{
          ...conference,
          title: conference.title,
        }}
      />
    </div>
  );
}
