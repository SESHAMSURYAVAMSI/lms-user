"use client";

import { useState } from "react";
import { Building, MapPin, Search } from "lucide-react";
import type { Speaker } from "@/app/data/speakers";
import type { SortByType } from "@/app/(dashboard)/dashboard/speakers/page";

interface Props {
  entries: Speaker[];
  sortBy: SortByType;
  setSortBy: (value: SortByType) => void;
}

export default function SpeakersList({ entries }: Props) {
  const [search, setSearch] = useState("");

  const filtered = entries.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Speakers
      </h1>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <input
          className="pl-9 w-full border border-gray-300 rounded-md py-2 focus:ring-2 focus:ring-orange-500 outline-none"
          placeholder="Search speakers"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ✅ GRID: 4 SPEAKERS PER ROW */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-6
      ">
        {filtered.map((speaker) => (
          <a
            key={speaker.id}
            href={`/dashboard/speakers/${speaker.id}`}
            className="border border-gray-200 rounded-lg p-4 bg-white flex gap-4 hover:shadow-lg hover:border-orange-500 transition"
          >
            <img
              src={speaker.image}
              alt={speaker.name}
              className="w-20 h-20 rounded-full object-cover bg-gray-100"
            />

            <div>
              <h2 className="text-[1F5C9E] font-bold">
                {speaker.name}
              </h2>

              <p className="flex items-center text-sm mt-1">
                <Building className="w-4 h-4 mr-2" />
                {speaker.institute}
              </p>

              <p className="flex items-center text-sm mt-1">
                <MapPin className="w-4 h-4 mr-2" />
                {speaker.location}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
