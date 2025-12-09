"use client";

import { useState, useEffect } from "react";
import ProfileComponent from "@/app/components/dashboard/myprofile/ProfileComponent";
import type { ProfileData } from "@/app/types/profile";
import { Loader2 } from "lucide-react";
import { useUser } from "@/app/context/UserContext"; // Import the useUser hook

export default function MyProfilePage() {
  const { user, setUser, loading: userLoading, error: userError } = useUser();
  
  // This local state is useful if you want to show a loading spinner specific to the page content
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!userLoading) {
      setInitialLoading(false);
    }
  }, [userLoading]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Profile</h1>
      
      {initialLoading && (
        <div className="flex justify-center items-center p-10 bg-[#F6FAFF] rounded-xl">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            <span className="ml-4 text-lg">Loading Your Profile...</span>
        </div>
      )}

      {userError && !initialLoading && (
        <div className="p-8 text-center text-red-600 bg-red-50 rounded-xl">
          <strong>Error:</strong> {userError}
        </div>
      )}

      {!initialLoading && !userError && user && (
        // Pass the initial user data and the context's setUser function
        <ProfileComponent initialData={user} onProfileUpdate={setUser} />
      )}
    </div>
  );
}

