"use client";

import { useMemo, useState } from "react";
import ConferenceCard from "@/app/components/dashboard/conferences/ConferenceCard";
import { LIVE_CONFERENCES } from "@/app/data/conferences/liveConference";

export default function LiveConferencePage() {
  const [q, setQ] = useState("");

  const conferences = useMemo(() => {
    const query = q.trim().toLowerCase();
    return query
      ? LIVE_CONFERENCES.filter((c) =>
          c.title.toLowerCase().includes(query)
        )
      : LIVE_CONFERENCES;
  }, [q]);

  return (
    <div className="w-full flex justify-center bg-[#fafafa]">
      {/* 🔒 HARD WIDTH WRAPPER */}
      <div className="w-full max-w-[1320px] px-6 py-6">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#252641]">
            Live Conference
          </h1>

          {/* SEARCH */}
          <div className="mt-4">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search conferences..."
              className="w-full sm:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* ✅ EXACT 4-CARD GRID (LOCKED WIDTH) */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          }}
        >
          {conferences.map((conf) => (
            <ConferenceCard key={conf.id} conference={conf} />
          ))}
        </div>

        {/* EMPTY STATE */}
        {conferences.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            No conferences found.
          </p>
        )}
      </div>
    </div>
  );
}
