// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { CalendarDays, Clock, MapPin } from "lucide-react";
// import type { LiveConference } from "@/app/data/liveConference";

// export function ConferenceCard({
//   conference,
// }: {
//   conference: LiveConference;
// }) {
//   const router = useRouter();

//   return (
//     <article className="flex flex-col bg-white rounded-2xl p-4 shadow hover:shadow-lg transition">
//       {/* Image */}
//       <div
//         className="rounded-xl overflow-hidden cursor-pointer"
//         onClick={() =>
//           router.push(`/dashboard/live-conference/${conference.id}`)
//         }
//       >
//         <Image
//           src={conference.image}
//           alt={conference.title}
//           width={480}
//           height={260}
//           className="object-cover w-full h-44"
//         />
//       </div>

//       <div className="mt-3 flex flex-col flex-grow">
//         {/* Meta */}
//         <div className="text-sm flex flex-col gap-2">
//           <div className="flex items-center gap-2">
//             <CalendarDays size={14} />
//             {conference.dateRange}
//           </div>
//           <div className="flex items-center gap-2">
//             <Clock size={14} />
//             {conference.time}
//           </div>
//           <div className="flex items-center gap-2">
//             <MapPin size={14} />
//             <span className="text-green-600 font-medium">
//               {conference.mode}
//             </span>
//           </div>
//         </div>

//         {/* Title */}
//         <h3
//           className="mt-4 text-base font-semibold text-[#252641] cursor-pointer"
//           onClick={() =>
//             router.push(`/dashboard/live-conference/${conference.id}`)
//           }
//         >
//           {conference.title}
//         </h3>

//         {/* Button → SAME FLOW AS WEBINAR */}
//         <div className="mt-auto pt-4 flex justify-center">
//           <button
//             onClick={() =>
//               router.push(`/dashboard/live-conference/${conference.id}`)
//             }
//             className={`px-4 py-2 rounded-full text-sm font-semibold w-full ${
//               conference.price > 0
//                 ? "bg-orange-500 hover:bg-orange-600 text-white"
//                 : "bg-green-600 hover:bg-green-700 text-white"
//             }`}
//           >
//             {conference.price > 0
//               ? `₹${conference.price} | Buy Now`
//               : "Register Free"}
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }

// export default ConferenceCard;

"use client";

import { useMemo, useState } from "react";
import ConferenceCard from "@/app/components/dashboard/conferences/ConferenceCard";
import { LIVE_CONFERENCES } from "@/app/data/liveConference";

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
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#252641]">
          Live Conference
        </h1>

        {/* SEARCH ONLY (as per image) */}
        <div className="mt-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="w-full md:w-80 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* GRID */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
  );
}

