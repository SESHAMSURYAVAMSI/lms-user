"use client";

import SpeakersGrid from "@/app/components/dashboard/Speakers/SpeakersGrid";
import { SPEAKERS } from "@/app/data/speakers";

export default function SpeakersPage() {
  return (
    <div className="p-6">
      <SpeakersGrid speakers={SPEAKERS} />
    </div>
  );
}
