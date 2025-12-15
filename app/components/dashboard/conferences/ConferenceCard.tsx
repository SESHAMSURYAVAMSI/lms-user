"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import type { LiveConference } from "@/app/data/liveConference";

export default function ConferenceCard({
  conference,
}: {
  conference: LiveConference;
}) {
  const router = useRouter();

  return (
    <article className="flex flex-col bg-white rounded-2xl p-4 shadow hover:shadow-lg transition">
      {/* Image */}
      <div
        className="rounded-xl overflow-hidden cursor-pointer"
        onClick={() =>
          router.push(`/dashboard/live-conference/${conference.id}`)
        }
      >
        <Image
          src={conference.image}
          alt={conference.title}
          width={480}
          height={260}
          className="object-cover w-full h-44"
        />
      </div>

      <div className="mt-3 flex flex-col flex-grow">
        {/* Meta */}
        <div className="text-sm flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CalendarDays size={14} />
            {conference.dateRange}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            {conference.time}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span className="text-green-600 font-medium">
              {conference.mode}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="mt-4 text-base font-semibold text-[#252641] cursor-pointer"
          onClick={() =>
            router.push(`/dashboard/live-conference/${conference.id}`)
          }
        >
          {conference.title}
        </h3>

        {/* Button → SAME FLOW AS WEBINAR */}
        <div className="mt-auto pt-4 flex justify-center">
          <button
            onClick={() =>
              router.push(`/dashboard/live-conference/${conference.id}`)
            }
            className={`px-4 py-2 rounded-full text-sm font-semibold w-full ${
              conference.price > 0
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {conference.price > 0
              ? `₹${conference.price} | Buy Now`
              : "Register Free"}
          </button>
        </div>
      </div>
    </article>
  );
}
