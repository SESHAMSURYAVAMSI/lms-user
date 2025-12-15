"use client";

import Link from "next/link";
import { Building, Video, MapPin, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type {
  SpeakerDetailsInfo,
  SpeakerVideo,
} from "@/app/types/speaker-details";

interface Props {
  speaker: SpeakerDetailsInfo;
  videos: SpeakerVideo[];
}

/* ---------------- FRONTEND-ONLY IMAGE HANDLER ---------------- */
const getImageUrl = (path: string | null, fallback: string) => {
  if (!path) return fallback;
  if (path.startsWith("http")) return path;
  return fallback; // no backend paths
};

export default function SpeakerDetails({ speaker, videos }: Props) {
  const renderActionButton = (video: SpeakerVideo) => {
    if (video.userEnrollmentStatus === "ENROLLED") {
      return (
        <Link
          href={`/dashboard/registeredevents/${video.eventId}/video/${video.topicId}`}
        >
          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-5">
            Watch Now
          </Button>
        </Link>
      );
    }

    const eventUrl = `/dashboard/events/${video.eventId}`;
    const buttonText =
      video.eventRegType === "PAID" ? "Buy Now" : "Register Free";

    return (
      <Link href={eventUrl}>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-5">
          {buttonText}
        </Button>
      </Link>
    );
  };

  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 font-medium">
        <Link href="/dashboard/speakers" className="hover:underline">
          Speakers
        </Link>
        <span className="mx-2">{">"}</span>
        <span className="text-orange-600">{speaker.name}</span>
      </div>

      {/* Speaker Header */}
      <div className="flex items-center gap-6 border-b border-gray-200 pb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={getImageUrl(speaker.image, "/speakers.png")}
            alt={speaker.name}
            className="object-cover w-full h-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/speakers.png";
            }}
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-orange-600">
            {speaker.name}
          </h1>

          <p className="text-gray-700 flex items-center gap-2 mt-2">
            <Building className="w-4 h-4 text-gray-400" />
            <span>{speaker.affiliation}</span>
          </p>

          <p className="text-gray-700 flex items-center gap-2 mt-1">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{speaker.location}</span>
          </p>

          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            <Video className="w-4 h-4" />
            {speaker.totalVideos} videos
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <div>
        <h2 className="text-xl font-semibold text-blue-900 mb-1">
          Videos
        </h2>
        <p className="text-gray-600 mb-6">
          {speaker.totalVideos} Videos • {speaker.totalMinutes} mins
          total length
        </p>

        <div className="space-y-4">
          {videos.map((video, index) => (
            <div
              key={video.topicId}
              className="flex flex-col sm:flex-row items-start gap-4 border-b border-gray-200 pb-4 last:border-b-0"
            >
              <span className="text-gray-500 w-8 text-center pt-2">
                {index + 1}
              </span>

              {/* Thumbnail */}
              <div className="w-40 h-24 relative rounded-md overflow-hidden shrink-0 bg-gray-200">
                <img
                  src={getImageUrl(video.thumbnail, "/event-logo.png")}
                  alt={video.title}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/event-logo.png";
                  }}
                />

                {video.userEnrollmentStatus !== "ENROLLED" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="flex-1">
                <p className="text-gray-800 leading-snug">
                  {video.title}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Event –{" "}
                  <Link
                    href={`/dashboard/events/${video.eventId}`}
                    className="font-semibold text-orange-600 hover:underline"
                  >
                    {video.eventName}
                  </Link>
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-gray-500 font-mono whitespace-nowrap">
                  Video – {video.videoDuration}
                </span>
                {renderActionButton(video)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
