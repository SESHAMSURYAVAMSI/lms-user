"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock, ChevronDown } from "lucide-react";

import { workshops as allWorkshops } from "@/app/data/workshop/workshop";

const TABS = ["live", "upcoming", "past"] as const;
type Tab = (typeof TABS)[number];
type Sort = "newest" | "popularity";

export default function WorkshopList() {
  const [tab, setTab] = useState<Tab>("live");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("newest");
  const [sortOpen, setSortOpen] = useState(false);

  const router = useRouter();
  const now = new Date();
  const sortRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!sortRef.current) return;
      if (!sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const workshops = useMemo(() => {
    const inTab = allWorkshops.filter((w) => {
      const start = new Date(w.startDate);
      const end = new Date(w.endDate);

      if (tab === "live") return start <= now && end >= now;
      if (tab === "upcoming") return start > now;
      return end < now;
    });

    const query = q.trim().toLowerCase();
    const searched = query
      ? inTab.filter((w) =>
          w.title.toLowerCase().includes(query)
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
      {/* HEADER */}
      <div className="mb-4 flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#252641]">
            Live Operative Workshops
          </h1>

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

        {/* SORT */}
        <div ref={sortRef} className="relative">
          <button
            onClick={() => setSortOpen((s) => !s)}
            className="flex items-center gap-2 rounded-md border px-3 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium"
          >
            Sort By <ChevronDown size={14} />
          </button>

          {sortOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-md border shadow-lg z-50">
              <button
                onClick={() => {
                  setSort("newest");
                  setSortOpen(false);
                }}
                className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
              >
                Newest First
              </button>
              <button
                onClick={() => {
                  setSort("popularity");
                  setSortOpen(false);
                }}
                className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
              >
                Popularity
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search Workshop..."
          className="w-full md:w-96 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#1F5C9E]"
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {workshops.map((w) => (
          <article
            key={w.id}
            className="flex flex-col bg-white rounded-2xl p-4 card-shadow transform transition-all duration-300 hover:-translate-y-2"
          >
            {/* IMAGE */}
            <div className="rounded-xl overflow-hidden">
              <Image
                src={w.image}
                alt={w.title}
                width={480}
                height={260}
                className="object-cover w-full h-44"
              />
            </div>

            {/* CONTENT */}
            <div className="mt-3 flex flex-col flex-grow">
              <div className="text-sm flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <CalendarDays size={14} />
                  {w.startDate} – {w.endDate}
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{w.time}</span>

                  <span className="ml-5 w-2.5 h-2.5 rounded-full bg-green-500 border border-black inline-block" />
                  <span className="text-green-600 font-medium">
                    {w.mode}
                  </span>
                </div>
              </div>

              <h3 className="mt-4 text-base font-semibold text-[#252641] line-clamp-2 min-h-[3rem]">
                {w.title}
              </h3>

              <div className="mt-auto pt-4">
                {w.price && w.price > 0 ? (
                  <button
                    onClick={() =>
                      router.push(`/dashboard/workshop/${w.id}`)
                    }
                    className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm font-semibold"
                  >
                    ₹{w.price} | Buy Now
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      router.push(`/dashboard/workshop/${w.id}`)
                    }
                    className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-semibold"
                  >
                    Register Free
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {workshops.length === 0 && (
        <p className="text-gray-500 text-center mt-8">
          No Workshops found.
        </p>
      )}
    </div>
  );
}
