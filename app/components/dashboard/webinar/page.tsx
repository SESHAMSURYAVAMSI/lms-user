"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { webinars as allWebinars } from "@/app/data/webinar";

const TABS = ["live", "upcoming", "past"] as const;
type Tab = (typeof TABS)[number];
type Sort = "newest" | "popularity";

export default function WebinarList() {
  const [tab, setTab] = useState<Tab>("live");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("newest");
  const router = useRouter();
  const now = new Date();

  const webinars = useMemo(() => {
    const inTab = allWebinars.filter((w) => {
      const s = new Date(w.startDate), e = new Date(w.endDate);
      return tab === "live" ? s <= now && e >= now : tab === "upcoming" ? s > now : e < now;
    });
    const searched = q ? inTab.filter((w) => w.title.toLowerCase().includes(q.toLowerCase())) : inTab;
    return searched.sort((a, b) =>
      sort === "newest"
        ? +new Date(b.startDate) - +new Date(a.startDate)
        : (b.popularity ?? 0) - (a.popularity ?? 0)
    );
  }, [tab, q, sort, now]);

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#252641]">USI Webinars</h1>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="text-sm border px-3 py-2 rounded-md"
        >
          <option value="newest">Newest First</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      <div className="mb-6 flex gap-6 border-b">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 capitalize ${
              tab === t ? "text-[#1F5C9E] border-b-2 border-[#1F5C9E]" : "text-gray-500 hover:text-[#1F5C9E]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search webinars..."
        className="mb-6 w-80 px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#1F5C9E]"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {webinars.map((w) => (
          <div key={w.id} className="flex flex-col rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-lg">
            <Image src={w.image} alt={w.title} width={400} height={200} className="mb-4 rounded-xl object-cover" />
            <div className="mb-1 flex items-center gap-2 text-sm text-gray-600">
              <CalendarDays size={16} />
              {w.startDate} - {w.endDate}
            </div>
            <div className="mb-1 flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} />
              {w.time}
            </div>
            <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} />
              <span className="font-medium text-green-600">{w.mode}</span>
            </div>
            <h3 className="mb-4 text-md font-semibold text-[#252641]">{w.title}</h3>
            <button
              onClick={() => router.push(`/dashboard/webinar/${w.id}`)}
              className={`mt-auto w-full rounded-md py-2 font-semibold text-white transition ${
                w.price > 0 ? "bg-orange-500 hover:bg-orange-600" : "bg-[#1F5C9E] hover:bg-[#184b84]"
              }`}
            >
              {w.price > 0 ? `₹${w.price} | Buy Now` : "View Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
