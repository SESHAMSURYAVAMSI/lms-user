"use client";

import Image from "next/image";
import Link from "next/link";
import { Building, MapPin, Video } from "lucide-react";
import type { Speaker } from "@/app/data/speakers";

export default function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <Link
      href={`/dashboard/speakers/${speaker.id}`}
      className="border rounded-xl p-4 bg-white hover:shadow-lg transition flex gap-4 card-shadow transform transition-all duration-300 hover:-translate-y-2"
    >
      <Image
        src={speaker.photo}
        alt={speaker.name}
        width={80}
        height={80}
        className="rounded-full object-cover"
      />

      <div className="space-y-1">
        <h3 className="text-[#1F5C9E] font-semibold text-sm">
          {speaker.name}
        </h3>

        <p className="flex items-center gap-2 text-xs">
          <Building size={14} /> {speaker.institute}
        </p>

        <p className="flex items-center gap-2 text-xs">
          <MapPin size={14} /> {speaker.location}
        </p>

        <p className="flex items-center gap-2 text-xs font-medium">
          <Video size={14} /> {speaker.videos} videos
        </p>
      </div>
    </Link>
  );
}
