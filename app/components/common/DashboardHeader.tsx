"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

/* Helper to build profile image URL */
const getImageUrl = (path?: string | null): string => {
  if (!path) return "/profile.jpeg";
  if (path.startsWith("http")) return path;
  return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || ""}${path}`;
};

export default function DashboardHeader() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [imgError, setImgError] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  const profileSrc = imgError
    ? "/profile.jpeg"
    : getImageUrl(user?.profilePhoto);

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-r from-[#B5D9FF] to-[#D6E7FF] shadow-md flex items-center justify-between px-8 z-50">
      
      {/* ===== LEFT SECTION ===== */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/dashboard/events")}
      >
        {/* USI Logo */}
        <Image
          src="/urological.png"
          alt="Urological Society of India"
          width={160}
          height={60}
          priority
          className="object-contain"
        />

        {/* Divider */}
        <div className="h-10 w-[1px] bg-[#1F5C9E] mx-3" />

        {/* ISU Logo + Text */}
        <div className="flex items-center gap-2">
          <Image
            src="/ISU_Logo.png"
            alt="Indian School of Urology"
            width={55}
            height={55}
            priority
            className="object-contain"
          />
          <p className="text-sm font-bold text-[#1F5C9E] leading-tight">
            Indian School <br /> of Urology
          </p>
        </div>
      </div>

      {/* ===== RIGHT SECTION ===== */}
      <div className="flex items-center gap-6">
        {/* Profile */}
        <button
          onClick={() => router.push("/dashboard/myprofile")}
          className="focus:outline-none"
        >
          {loading ? (
            <Skeleton className="w-[45px] h-[45px] rounded-full" />
          ) : (
            <div className="relative w-[45px] h-[45px] rounded-full overflow-hidden border-2 border-white shadow-sm">
              <Image
                src={profileSrc}
                alt="Profile"
                fill
                sizes="45px"
                className="object-cover"
                onError={() => setImgError(true)}
              />
            </div>
          )}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-orange-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
