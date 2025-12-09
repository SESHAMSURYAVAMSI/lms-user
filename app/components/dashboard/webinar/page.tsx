"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock, MapPin, ChevronDown } from "lucide-react";
import { webinars as allWebinars } from "@/app/data/webinar";

const TABS = ["live", "upcoming", "past"] as const;
type Tab = (typeof TABS)[number];
type Sort = "newest" | "popularity";

export default function WebinarList() {
  const [tab, setTab] = useState<Tab>("live");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const router = useRouter();
  const now = new Date();
  const sortRef = useRef<HTMLDivElement | null>(null);

  // close sort menu on outside click or Escape
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!sortRef.current) return;
      if (!sortRef.current.contains(e.target as Node)) setSortOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setSortOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const webinars = useMemo(() => {
    const inTab = allWebinars.filter((w) => {
      const s = new Date(w.startDate);
      const e = new Date(w.endDate);
      if (tab === "live") return s <= now && e >= now;
      if (tab === "upcoming") return s > now;
      return e < now;
    });

    const query = q.trim().toLowerCase();
    const searched = query
      ? inTab.filter(
          (w) =>
            w.title.toLowerCase().includes(query) ||
            (w.type || "").toString().toLowerCase().includes(query)
        )
      : inTab;

    return searched.sort((a, b) =>
      sort === "newest"
        ? +new Date(b.startDate) - +new Date(a.startDate)
        : (b.popularity ?? 0) - (a.popularity ?? 0)
    );
  }, [tab, q, sort, now]);

  return (
    <div className="p-6">
      {/* Header + Sort */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#252641]">USI Webinars</h1>

          {/* Tabs */}
          <div className="mt-3 flex gap-6 border-b pb-3">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`capitalize pb-1 text-sm ${
                  tab === t
                    ? "text-[#1F5C9E] border-b-2 border-[#1F5C9E] font-semibold"
                    : "text-gray-500 hover:text-[#1F5C9E]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Sort box (functional) */}
        <div ref={sortRef} className="relative">
          <button
            onClick={() => setSortOpen((s) => !s)}
            className="flex items-center gap-2 rounded-md border px-3 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium shadow-sm hover:bg-orange-100 transition"
            aria-haspopup="true"
            aria-expanded={sortOpen}
          >
            Sort By
            <ChevronDown size={14} />
          </button>

          {/* Dropdown */}
          {sortOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-md border shadow-lg z-50 overflow-hidden">
              <button
                onClick={() => {
                  setSort("newest");
                  setSortOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm ${sort === "newest" ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-gray-50"}`}
              >
                Newest First
              </button>
              <button
                onClick={() => {
                  setSort("popularity");
                  setSortOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm ${sort === "popularity" ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-gray-50"}`}
              >
                Popularity
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search webinars..."
          className="w-full md:w-96 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1F5C9E]"
        />
      </div>

      {/* Grid with hover animations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {webinars.map((w) => (
          <article
            key={w.id}
            className="group flex flex-col bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgba(13,37,64,0.06)] transform transition will-change-transform hover:shadow-[0_12px_40px_rgba(13,37,64,0.10)] hover:-translate-y-2 hover:scale-[1.01]"
          >
            {/* image container with subtle zoom on hover */}
            <div className="rounded-xl overflow-hidden">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={w.image}
                  alt={w.title}
                  width={480}
                  height={260}
                  className="object-cover w-full h-44 transition-transform duration-400 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            {/* metadata */}
            <div className="mt-3 text-sm text-black-900 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <CalendarDays size={14} />
                <span>{w.startDate} - {w.endDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{w.time}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span className="font-medium text-green-600">{w.mode}</span>
              </div>
            </div>

            <h3 className="mt-4 text-base font-semibold text-[#252641]">{w.title}</h3>

            {/* action button centered */}
            <div className="mt-4 flex justify-center">
              {w.price && w.price > 0 ? (
                <button
                  onClick={() => router.push(`/dashboard/webinar/${w.id}`)}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm font-semibold transition"
                >
                  ₹{w.price} | Buy Now
                </button>
              ) : (
                <button
                  onClick={() => router.push(`/dashboard/webinar/${w.id}`)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-semibold transition"
                >
                  Register Free
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      {webinars.length === 0 && (
        <p className="text-gray-500 text-center mt-8">No webinars found.</p>
      )}
    </div>
  );
}
