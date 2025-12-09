"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import SpeakerDetails from "@/app/components/dashboard/Speakers/SpeakerDetails";
import type { SpeakerPageData } from "@/app/types/speaker-details"; // Import the new type

export default function SpeakerDetailsPage() {
  const params = useParams();
  const id = params.id as string; // Get speaker ID from the URL

  const [data, setData] = useState<SpeakerPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchSpeakerDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("You must be logged in to view speaker details.");
        }

        const response = await fetch(`${backendUrl}/speakers/details/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch speaker details.");
        }

        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.error || "An unknown error occurred.");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakerDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        <span className="ml-4 text-lg">Loading Speaker Details...</span>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg">Error: {error}</div>;
  }

  if (!data) {
    return <div className="p-8 text-center text-gray-600">Speaker not found.</div>;
  }

  return (
    <div>
      {/* Pass the fetched data down to the display component */}
      <SpeakerDetails
        speaker={data.speakerDetails}
        videos={data.videos}
      />
    </div>
  );
}