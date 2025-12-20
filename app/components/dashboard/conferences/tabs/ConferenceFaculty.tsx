"use client";

import React from "react";
import Image from "next/image";
import {
  Briefcase,
  Building2,
  MapPin,
  Award,
  Users,
  GraduationCap,
} from "lucide-react";

/* ================= TYPES ================= */
type FacultyItem = {
  id?: string | number;
  role?: "convenor" | "co-convenor" | "faculty" | string;
  name: string;
  title?: string;
  institution?: string;
  location?: string;
  photo?: string;
};

interface Props {
  faculty?: FacultyItem[];
  conferenceTitle?: string; // ✅ renamed
}

/* ================= COMPONENT ================= */
export default function ConferenceFaculty({
  faculty = [],
  conferenceTitle,
}: Props) {
  const byRole = (role: string) =>
    faculty.filter((f) => f.role?.toLowerCase() === role);

  const convenor = byRole("convenor");
  const coConvenor = byRole("co-convenor");
  const others = faculty.filter(
    (f) =>
      !["convenor", "co-convenor"].includes(
        f.role?.toLowerCase() || ""
      )
  );

  /* ================= CARD ================= */
  function Card({ f }: { f: FacultyItem }) {
    return (
      <div className="border rounded-xl p-4 flex gap-4 bg-white">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-[#E5E7EB] flex items-center justify-center overflow-hidden shrink-0">
          {f.photo ? (
            <Image
              src={f.photo}
              alt={f.name}
              width={80}
              height={80}
              className="object-cover"
            />
          ) : (
            <span className="text-xl font-semibold text-gray-600">
              {f.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="space-y-1">
          <h3 className="text-[#1F5C9E] font-semibold">
            {f.name}
          </h3>

          {f.title && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Briefcase size={14} />
              <span>{f.title}</span>
            </div>
          )}

          {f.institution && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Building2 size={14} />
              <span>{f.institution}</span>
            </div>
          )}

          {f.location && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin size={14} />
              <span>{f.location}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ================= SECTION ================= */
  function Section({
    title,
    icon: Icon,
    items,
    cols = "grid-cols-1",
  }: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    items: FacultyItem[];
    cols?: string;
  }) {
    if (!items.length) return null;

    return (
      <div className="mb-10">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Icon className="w-5 h-5 text-[#1F5C9E]" />
          {title}
        </h2>

        <div className={`grid ${cols} gap-6`}>
          {items.map((f, i) => (
            <Card key={f.id ?? i} f={f} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Optional Conference Title */}
      {conferenceTitle && (
        <h2 className="text-xl font-semibold mb-6 text-[#252641]">
          Conference Faculty – {conferenceTitle}
        </h2>
      )}

      <Section
        title="Convenor"
        icon={Award}
        items={convenor}
        cols="grid-cols-1 max-w-md"
      />

      <Section
        title="Co-Convenor"
        icon={Users}
        items={coConvenor}
        cols="grid-cols-1 md:grid-cols-2"
      />

      <Section
        title="Faculty"
        icon={GraduationCap}
        items={others}
        cols="grid-cols-1 md:grid-cols-2"
      />

      {faculty.length === 0 && (
        <p className="text-gray-500">
          No faculty information available.
        </p>
      )}
    </div>
  );
}
