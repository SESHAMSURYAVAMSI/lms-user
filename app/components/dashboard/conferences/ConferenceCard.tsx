  "use client";

  import Image from "next/image";
  import { useRouter } from "next/navigation";
  import { CalendarDays, Clock } from "lucide-react";
  import type { LiveConference } from "@/app/data/conferences/liveConference";

  export default function ConferenceCard({
    conference,
  }: {
    conference: LiveConference;
  }) {
    const router = useRouter();

    return (
    <article className="flex flex-col bg-white rounded-2xl p-5 overflow-hidden flex flex-col card-shadow transform transition-all duration-300 hover:-translate-y-2">

        {/* IMAGE */}
        <div
          className="rounded-2xl overflow-hidden cursor-pointer mb-3"
          onClick={() =>
            router.push(`/dashboard/conferences/${conference.id}`)
          }
        >
          <Image
            src={conference.image}
            alt={conference.title}
            width={480}
            height={280}
            className="object-cover w-full h-48"
          />
        </div>

        {/* META */}
        <div className="text-sm text-gray-700 space-y-2">

          <div className="flex items-center gap-2">
            <CalendarDays size={14} />
            <span>{conference.dateRange}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>{conference.time}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-green-600 font-medium">
                {conference.mode}
              </span>
            </div>
          </div>
        </div>

        {/* TITLE */}
        <h3
          className="mt-3 text-[15px] font-semibold text-[#252641] line-clamp-2 min-h-[40px] cursor-pointer"
          onClick={() =>
            router.push(`/dashboard/conferences/${conference.id}`)
          }
        >
          {conference.title}
        </h3>

        {/* BUTTON */}
        <div className="mt-auto pt-4">
          <button
            onClick={() =>
              router.push(`/dashboard/conferences/${conference.id}`)
            }
            className={`w-full py-2 rounded-full text-sm font-semibold ${
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
      </article>
    );
  }
