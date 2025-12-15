"use client";

import { useParams } from "next/navigation";
import { speakers } from "@/app/data/speakers";
import SpeakerDetails from "@/app/components/dashboard/Speakers/SpeakerDetails";

export default function SpeakerDetailsPage() {
  const { id } = useParams();

  const speaker = speakers.find(
    (s) => s.id === Number(id)
  );

  if (!speaker) {
    return (
      <div className="p-10 text-center text-gray-600">
        Speaker not found
      </div>
    );
  }

  return (
    <SpeakerDetails
      speaker={{
        id: String(id),
        name: speaker.name,
        image: speaker.image,
        affiliation: speaker.institute,
        location: speaker.location,
        totalVideos: 0,
        totalMinutes: 0,
      }}
      videos={[]}
    />
  );
}
