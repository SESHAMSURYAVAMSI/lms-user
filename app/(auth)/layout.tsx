import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/app/components/auth/footer";

export const metadata: Metadata = {
  description: "Login or Signup to Urological Society of India",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-r from-[#d0ebff] to-[#a9d6fb]">
      {/* Header Section */}
      <header className="w-full py-10 flex flex-col items-center">
        {/* Logo & Title */}
        <div className="flex flex-col items-center justify-center space-y-3 mb-6">
          <div className="flex items-center justify-center gap-4 flex-wrap text-center">
            {/* USI Logo */}
            <Image
              src="/urological.png"
              alt="Urological Society of India"
              width={180}
              height={20}
              className="mb-2"
            />
            {/* Indian School of Urology Logo */}
            <Image
              src="/ISU_Logo.png"
              alt="Indian School of Urology"
              width={60}
              height={20}
              className="mb-2"
            />
            {/* Text beside logo */}
            <p className="text-medium sm:text-xl font-bold text-[#07288C] leading-tight">
              Indian School <br /> of Urology
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-wrap justify-center gap-6 px-6">
          {/* Card 1 - USI Webinars */}
          <div className="bg-white/40 rounded-xl p-4 w-60 h-56 flex flex-col items-center justify-between backdrop-blur-sm">
            <Image
              src="/usiw.png"
              alt="Events"
              width={100}
              height={100}
              className="mb-2"
            />
            <p className="text-lg font-bold text-[#1F5C9E]">USI Webinars</p>
            <p className="text-xl font-bold text-[#007AFF]">20</p>
          </div>

          {/* Card 2 - Smart Learning Program */}
          <div className="bg-white/40 rounded-xl p-4 w-60 h-56 flex flex-col items-center justify-between backdrop-blur-sm">
            <Image
              src="/slc.png"
              alt="Smart Learning"
              width={100}
              height={100}
              className="mb-2"
            />
            <p className="text-lg font-bold text-[#1F5C9E]">Smart Learning Courses</p>
            <p className="text-xl font-bold text-[#007AFF]">200</p>
          </div>

          {/* Card 3 - Live Operative Workshops */}
          <div className="bg-white/40 rounded-xl p-4 w-60 h-56 flex flex-col items-center justify-between backdrop-blur-sm">
            <Image
              src="/low.png"
              alt="Workshops"
              width={100}
              height={100}
              className="mb-2"
            />
            <p className="text-lg font-bold text-[#1F5C9E]">Live Operative Workshops</p>
            <p className="text-xl font-bold text-[#007AFF]">200</p>
          </div>

          {/* Card 4 - e-Learning Courses */}
          <div className="bg-white/40 rounded-xl p-4 w-60 h-56 flex flex-col items-center justify-between backdrop-blur-sm">
            <Image
              src="/elp.png"
              alt="e-Learning"
              width={100}
              height={100}
              className="mb-2"
            />
            <p className="text-lg font-bold text-[#1F5C9E]">e-Learning Program</p>
            <p className="text-xl font-bold text-[#007AFF]">40</p>
          </div>

          {/* Card 5 - Live Conferences */}
          <div className="bg-white/40 rounded-xl p-4 w-60 h-56 flex flex-col items-center justify-between backdrop-blur-sm">
            <Image
              src="/login-speaker.png"
              alt="Conferences"
              width={100}
              height={100}
              className="mb-2"
            />
            <p className="text-lg font-bold text-[#1F5C9E]">Live Conferences</p>
            <p className="text-xl font-bold text-[#007AFF]">40</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="flex w-full max-w-3xl bg-white/60 rounded-2xl overflow-hidden backdrop-blur-sm">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
