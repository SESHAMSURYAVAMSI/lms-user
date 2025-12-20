"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { SPEAKERS } from "@/app/data/speakers";
import { webinars } from "@/app/data/webinar/webinar"; // ✅ REAL DATA
import SpeakerHeader from "@/app/components/dashboard/Speakers/SpeakerHeader";

export default function SpeakerDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const speaker = SPEAKERS.find((s) => s.id === id);

  if (!speaker) {
    return <div className="p-10 text-center">Speaker not found</div>;
  }

  return (
    <div className="p-6">
      {/* ✅ BREADCRUMB */}
      <div className="mb-4 text-sm text-gray-500">
        <Link
          href="/dashboard/speakers"
          className="text-orange-600 hover:underline"
        >
          Speakers
        </Link>
        <span className="mx-2">{">"}</span>
        <span className="font-semibold text-gray-800">
          {speaker.name}
        </span>
      </div>

      {/* ✅ MAIN LAYOUT */}
      <div className="flex gap-6 items-start">
        {/* LEFT CONTENT */}
        <div className="flex-1 space-y-6">
          {/* Speaker Card */}
          <SpeakerHeader speaker={speaker} />

          {/* ✅ WEBINARS (FROM DATA FILE) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {webinars.map((webinar) => (
              <div
                key={webinar.id}
                className="bg-white rounded-xl shadow p-3 flex flex-col"
              >
                <Image
                  src={webinar.image}
                  alt={webinar.title}
                  width={400}
                  height={220}
                  className="rounded-lg object-cover"
                />

                {webinar.startDate && webinar.endDate && (
                  <div className="mt-2 text-xs text-gray-500">
                    {webinar.startDate} - {webinar.endDate}
                  </div>
                )}

                {webinar.time && (
                  <div className="text-xs text-gray-500">
                    {webinar.time}
                  </div>
                )}

                <p className="mt-2 text-sm font-semibold text-[#252641]">
                  {webinar.title}
                </p>

                {/* ✅ BUTTON BASED ON PRICE */}
                {webinar.price && webinar.price > 0 ? (
                  <button
                    onClick={() =>
                      router.push(`/dashboard/webinar/${webinar.id}`)
                    }
                    className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white text-xs py-2 rounded transition"
                  >
                    ₹{webinar.price} | Buy Now
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      router.push(`/dashboard/webinar/${webinar.id}`)
                    }
                    className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white text-xs py-2 rounded transition"
                  >
                    Register Free
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ✅ RIGHT: SUN PHARMA */}
        <div className="w-[260px] shrink-0">
          <div className="bg-white rounded-xl shadow p-4 text-center sticky top-24">
            <p className="text-xs text-gray-500 mb-3">
              EDUCATIONAL GRANT BY
            </p>

            <Image
              src="/Sun_Pharma.png"
              alt="Sun Pharma"
              width={60}
              height={60}
              className="mx-auto object-contain"
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
}
