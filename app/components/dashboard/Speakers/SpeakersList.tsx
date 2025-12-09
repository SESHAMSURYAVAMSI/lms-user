"use client";

import { useState } from "react";
import {
  Building,
  MapPin,
  Video,
  SlidersHorizontal,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Speaker } from "@/app/types/speaker";
import type { SortByType } from "@/app/(dashboard)/dashboard/speakers/page";

interface Props {
  entries: Speaker[];
  sortBy: SortByType;
  setSortBy: (value: SortByType) => void;
}

const getImageUrl = (path: string | null) => {
  if (!path) return '/speakers.png';
  if (path.startsWith("http")) return path;
  return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || ""}${path}`;
};

export default function SpeakersList({ entries, sortBy, setSortBy }: Props) {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredSpeakers = entries
    .filter((sp) => sp.name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, visibleCount);

  const handleLoadMore = () => setVisibleCount(entries.length);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Speakers</h1>

      {/* Search + Sort Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Speakers"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 w-full border border-gray-300 rounded-md py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white flex items-center gap-2 whitespace-nowrap"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Sort By
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setSortBy("alphabetical")}>
              Alphabetical (A-Z)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("most-videos")}>
              Most Videos
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Speaker Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpeakers.map((speaker) => (
          <a
            key={speaker.id}
            href={`/dashboard/speakers/${speaker.id}`}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white flex gap-4 items-center hover:shadow-lg hover:border-orange-500 transition-all duration-300"
          >
            <div className="w-20 h-20 flex-shrink-0 rounded-full overflow-hidden bg-gray-100">
              <img
                src={getImageUrl(speaker.image)}
                alt={speaker.name}
                className="object-cover w-full h-full"
                onError={(e) => { (e.target as HTMLImageElement).src = '/speakers.png'; }}
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-orange-600 font-bold text-base">
                {speaker.name}
              </h2>
              {/* MODIFIED: Updated text and icon styles to be bold and black */}
              <div className="flex items-center text-sm font-sm text-black mt-1">
                <Building className="w-4 h-4 mr-2 text-black" />
                <span>{speaker.affliation}</span>
              </div>
              <div className="flex items-center text-sm font-sm text-black mt-1">
                <MapPin className="w-4 h-4 mr-2 text-black" />
                <span>{speaker.location}</span>
              </div>
              <div className="flex items-center text-sm font-sm text-black mt-1">
                <Video className="w-4 h-4 mr-2 text-black" />
                <span>{speaker.totalTopics} Videos</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < entries.filter(sp => sp.name.toLowerCase().includes(search.toLowerCase())).length && (
        <div className="text-center pt-4">
          <Button
            onClick={handleLoadMore}
            className="bg-green-700 hover:bg-green-800 text-white"
          >
            Load More . . .
          </Button>
        </div>
      )}
    </div>
  );
}