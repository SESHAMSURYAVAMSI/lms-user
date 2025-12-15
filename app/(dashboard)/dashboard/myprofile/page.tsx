"use client";

import { useEffect, useState } from "react";
import ProfileComponent from "@/app/components/dashboard/myprofile/ProfileComponent";
import type { ProfileData } from "@/app/types/profile";
import { Loader2 } from "lucide-react";

const STORAGE_KEY = "user_profile";

export default function MyProfilePage() {
  const [user, setUser] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading + fetch from localStorage
    setTimeout(() => {
      const storedProfile = localStorage.getItem(STORAGE_KEY);

      if (storedProfile) {
        setUser(JSON.parse(storedProfile));
      } else {
        // fallback empty profile (first time)
        setUser({
          fullName: "",
          prefix: "",
          designation: "",
          affiliationHospital: "",
          mobile: "",
          email: "",
          country: "",
          state: "",
          city: "",
          pincode: "",
          profilePhoto: "/profile.jpeg",
        } as ProfileData);
      }

      setLoading(false);
    }, 500);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        My Profile
      </h1>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center p-10 bg-[#F6FAFF] rounded-xl">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          <span className="ml-4 text-lg">
            Loading Your Profile...
          </span>
        </div>
      )}

      {/* Profile */}
      {!loading && user && (
        <ProfileComponent initialData={user} />
      )}
    </div>
  );
}
