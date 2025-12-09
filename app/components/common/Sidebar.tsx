// app/(dashboard)/Sidebar.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import {
  FaBookOpen,
  FaVideo,
  FaGraduationCap,
  FaTools,
  FaLaptopCode,
  FaCalendarAlt,
  FaMicrophone,
  FaUser,
} from "react-icons/fa";

export interface SideTab {
  name: string;
  icon: IconType;
  baseUrl: string;
  subtabs: { name: string; icon: IconType }[];
}

const sideTabs: SideTab[] = [
  { name: "My Learning", icon: FaBookOpen, baseUrl: "mylearning", subtabs: [] },
  { name: "Webinar", icon: FaVideo, baseUrl: "webinar", subtabs: [] },
  { name: "Smart Learning Program", icon: FaGraduationCap, baseUrl: "program", subtabs: [] },
  { name: "Live Operative Workshops", icon: FaTools, baseUrl: "workshops", subtabs: [] },
  { name: "eLearning Courses", icon: FaLaptopCode, baseUrl: "elearning", subtabs: [] },
  { name: "Live Conferences", icon: FaCalendarAlt, baseUrl: "conferences", subtabs: [] },
  { name: "Speakers", icon: FaMicrophone, baseUrl: "speakers", subtabs: [] },
  { name: "My Profile", icon: FaUser, baseUrl: "myprofile", subtabs: [] },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const HEADER_HEIGHT = 80;

  return (
    <aside
      className="fixed left-0 w-67 bg-white border-r border-black-400 flex flex-col font-poppins shadow-sm"
      style={{ top: `${HEADER_HEIGHT}px`, height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
    >
      <nav className="flex-1 mt-2 space-y-1 px-2 overflow-y-auto">
        {sideTabs.map((item) => {
          const active = pathname === `/dashboard/${item.baseUrl}`;
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => router.push(`/dashboard/${item.baseUrl}`)}
              className={`relative flex items-center gap-3 w-full text-left px-4 py-3 text-[15px] font-medium rounded-xl transition-all duration-300 ${
                active ? "bg-orange-50 text-orange-600" : "text-[#0A0A0A] hover:bg-orange-100 hover:text-orange-600"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute left-0 top-0 h-full w-[4px] bg-orange-500 rounded-r-full"
                />
              )}
              <Icon size={18} />
              <span className="z-10">{item.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
