"use client";

import { useState } from "react";
import SpeakersList from "@/app/components/dashboard/Speakers/SpeakersList";
import { speakers } from "@/app/data/speakers";
import type { Speaker } from "@/app/data/speakers";

export type SortByType = "alphabetical";

export default function SpeakersPage() {
  const [sortBy] = useState<SortByType>("alphabetical");

  const sortedSpeakers: Speaker[] =
    sortBy === "alphabetical"
      ? [...speakers].sort((a, b) => a.name.localeCompare(b.name))
      : speakers;

  return (
    <SpeakersList
      entries={sortedSpeakers}
      sortBy={sortBy}
      setSortBy={() => {}}
    />
  );
}
