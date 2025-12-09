"use client";

import React from "react";

type FacultyItem = {
  id?: string | number;
  role?: "convenor" | "co-convenor" | "faculty" | string;
  name: string;
  title?: string;        // e.g. "Urologic Oncologist"
  institution?: string;  // e.g. "AIIMS Delhi"
  location?: string;     // e.g. "Tamil Nadu, India"
  photo?: string;        // path under /public e.g. "/images/users/dr1.jpg"
};

export default function Faculty({ faculty }: { faculty?: FacultyItem[] }) {
  // safety
  const list = faculty ?? [];

  // Group helpers
  const groupByRole = (role: string) =>
    list.filter((f) => (f.role || "").toLowerCase() === role);

  const convenors = groupByRole("convenor");
  const coConvenors = groupByRole("co-convenor");
  // remaining faculty (exclude convenors & co-convenors)
  const others = list.filter(
    (f) =>
      !["convenor", "co-convenor"].includes((f.role || "").toLowerCase())
  );

  function PersonCard({ f }: { f: FacultyItem }) {
    return (
      <div className="bg-white border rounded-lg p-4 flex items-start gap-4 shadow-sm">
        {/* avatar */}
        <div className="flex-shrink-0">
          {f.photo ? (
            <img
              src={f.photo}
              alt={f.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-semibold">
              {f.name
                .split(" ")
                .map((n) => n[0] ?? "")
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
          )}
        </div>

        {/* details */}
        <div className="flex-1">
          <div className="text-sm">
            <div className="text-[#1F5C9E] font-semibold text-base">{f.name}</div>
            {f.title && <div className="text-sm text-gray-600 mt-1">{f.title}</div>}
            {f.institution && (
              <div className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 7v7c0 5 5 9 9 9s9-4 9-9V7l-9-5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{f.institution}</span>
              </div>
            )}
            {f.location && (
              <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1118 0z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
                <span>{f.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render a section with heading and grid
  function Section({ title, items }: { title: string; items: FacultyItem[] }) {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">{title}</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((f, idx) => (
            <PersonCard key={f.id ?? idx} f={f} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* show convenor first */}
      <Section title="Convenor" items={convenors} />

      {/* co-convenor */}
      <Section title="Co - Convenor" items={coConvenors} />

      {/* remaining faculty */}
      <Section title="Faculty" items={others} />

      {/* fallback if nothing */}
      {list.length === 0 && (
        <div className="text-gray-600">No faculty information available.</div>
      )}
    </div>
  );
}
