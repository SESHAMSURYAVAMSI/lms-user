"use client";

import { useState, useEffect } from "react";
import SpeakersList from "@/app/components/dashboard/Speakers/SpeakersList";
import type { Speaker } from "@/app/types/speaker";
import { Skeleton } from "@/components/ui/skeleton";

// Define the sort types to match the backend API
export type SortByType = "alphabetical" | "most-videos";

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // The 'sortBy' state now lives in the parent page component.
  const [sortBy, setSortBy] = useState<SortByType>("alphabetical"); // Default sort

  useEffect(() => {
    const fetchSpeakers = async () => {
      setLoading(true);
      setError(null);
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
        // The fetch URL now includes the sortBy state
        const response = await fetch(`${backendUrl}/speakers/public?sort=${sortBy}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.success) {
          setSpeakers(data.speakers);
        } else {
          throw new Error(data.error || 'Failed to fetch speakers.');
        }
      } catch (err: any) {
        setError(err.message);
        setSpeakers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
    // This effect will re-run whenever 'sortBy' changes, fetching new sorted data.
  }, [sortBy]);

  if (loading) {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-800">Speakers</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex gap-4 items-center p-4 border rounded-lg">
                <Skeleton className="w-20 h-20 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-24" />
                </div>
                </div>
            ))}
            </div>
        </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      {/* Pass the speakers, the current sort state, and the state setter to the child */}
      <SpeakersList
        entries={speakers}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </div>
  );
}