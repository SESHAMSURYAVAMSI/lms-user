"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import ConferenceCard from "@/app/components/dashboard/conferences/ConferenceCard";
import { LIVE_CONFERENCES } from "@/app/data/conferences/liveConference";

export default function LiveConferencePage() {
  const [search, setSearch] = useState("");

  const filtered = LIVE_CONFERENCES.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-[#252641] mb-4">
        Live Conference
      </h1>

      {/* Search */}
      <div className="mb-6 max-w-sm relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search conferences..."
          className="pl-10 pr-3 py-2.5 border rounded-lg w-full focus:ring-2 focus:ring-[#1F5C9E]"
        />
      </div>

      {/* Grid – SAME AS WEBINARS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((conf) => (
          <ConferenceCard key={conf.id} conference={conf} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 text-center mt-8">
          No live conferences found.
        </p>
      )}
    </div>
  );
}
