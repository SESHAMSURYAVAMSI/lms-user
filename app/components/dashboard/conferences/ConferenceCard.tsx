"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";
import type { LiveConference } from "@/app/data/liveConference";

export default function ConferenceCard({
  conference,
}: {
  conference: LiveConference;
}) {
  const router = useRouter();

  return (
    <article className="flex flex-col bg-white rounded-3xl p-5 shadow-md hover:shadow-lg transition">
      {/* Image */}
      <div
        className="rounded-2xl overflow-hidden cursor-pointer mb-4"
        onClick={() =>
          router.push(`/dashboard/live-conference/${conference.id}`)
        }
      >
        <Image
          src={conference.image}
          alt={conference.title}
          width={480}
          height={300}
          className="object-cover w-full h-48"
        />
      </div>

      {/* Meta */}
      <div className="text-sm text-gray-700 space-y-3">
        {/* Date */}
        <div className="flex items-center gap-2">
          <CalendarDays size={14} />
          <span>{conference.dateRange}</span>
        </div>

        {/* Time + Mode (PROPERLY ALIGNED) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>{conference.time}</span>
          </div>

          {/* GREEN DOT + MODE */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 border border-black inline-block" />
            <span className="text-green-600 font-medium">
              {conference.mode}
            </span>
          </div>
        </div>
      </div>

      {/* Title */}
      <h3
        className="mt-4 text-base font-semibold text-[#252641] line-clamp-2 cursor-pointer"
        onClick={() =>
          router.push(`/dashboard/live-conference/${conference.id}`)
        }
      >
        {conference.title}
      </h3>

      {/* Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() =>
            router.push(`/dashboard/webinar/${conference.id}`)
          }
          className={`w-full py-2 rounded-full text-sm font-semibold ${
            conference.price > 0
              ? "bg-orange-500 hover:bg-orange-600 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {conference.price > 0
            ? `₹ ${conference.price} | Buy Now`
            : "Register Free"}
        </button>
      </div>
    </article>
  );
}
