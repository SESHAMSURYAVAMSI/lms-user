"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SPEAKERS } from "@/app/data/speakers";
import SpeakerHeader from "@/app/components/dashboard/Speakers/SpeakerHeader";

export default function SpeakerDetailsPage() {
  const { id } = useParams();
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

      {/* ✅ MAIN LAYOUT (LIKE WEBINAR PAGE) */}
      <div className="flex gap-6 items-start">

        {/* LEFT CONTENT */}
        <div className="flex-1 space-y-6">

          {/* Speaker Card */}
          <SpeakerHeader speaker={speaker} />

          {/* Webinars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((v) => (
              <div
                key={v}
                className="bg-white rounded-xl shadow p-3"
              >
                <Image
                  src="/images/learning.png"
                  alt="Webinar"
                  width={400}
                  height={220}
                  className="rounded-lg object-cover"
                />

                <div className="mt-2 text-xs text-gray-500">
                  17 Apr 2026 – 18 Apr 2026
                </div>
                <div className="text-xs text-gray-500">
                  7:30 PM – 9:30 PM
                </div>

                <p className="mt-2 text-sm font-semibold text-[#252641]">
                  USI ISU Webinar – Renal Transplantation Subsection
                </p>

                {v % 2 === 0 ? (
                  <button className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white text-xs py-2 rounded">
                    ₹499 | Buy Now
                  </button>
                ) : (
                  <button className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white text-xs py-2 rounded">
                    Register Free
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ✅ RIGHT: SUN PHARMA (EXACTLY LIKE WEBINAR PAGE) */}
        <div className="w-[260px] shrink-0">
          <div className="bg-white rounded-xl shadow p-4 text-center sticky top-24">
            <p className="text-xs text-gray-500 mb-3">
              EDUCATIONAL GRANT BY
            </p>

            <Image
              src="/sun_pharma.png"
              alt="Sun Pharma"
              width={60}
              height={60}
              className="mx-auto object-contain"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
