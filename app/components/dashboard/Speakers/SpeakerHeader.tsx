"use client";

import Image from "next/image";
import {
  GraduationCap,
  Briefcase,
  Star,
  MapPin,
} from "lucide-react";
import type { Speaker } from "@/app/data/speakers";

export default function SpeakerHeader({
  speaker,
}: {
  speaker: Speaker;
}) {
  return (
    <div className="flex gap-6 items-start">

      {/* LEFT: SPEAKER DETAILS */}
      <div className="flex-1 bg-white rounded-xl shadow p-6">

        {/* NAME ABOVE IMAGE */}
        <h1 className="text-xl font-semibold text-[#1F5C9E] mb-4">
          {speaker.name}
        </h1>

        <div className="flex gap-6 items-center">
          {/* Avatar */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-[4px] border-[#1F5C9E] flex items-center justify-center">
              <Image
                src={speaker.photo || "/speakers.png"}
                alt={speaker.name}
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <GraduationCap size={16} className="text-[#1F5C9E]" />
              <span>{speaker.qualification}</span>
            </div>

            <div className="flex items-center gap-2">
              <Briefcase size={16} className="text-[#1F5C9E]" />
              <span>{speaker.designation}</span>
            </div>

            <div className="flex items-center gap-2">
              <Star size={16} className="text-[#1F5C9E]" />
              <span>{speaker.experience}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#1F5C9E]" />
              <span>{speaker.location}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
