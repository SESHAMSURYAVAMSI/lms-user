"use client";

import { useEffect, useState } from "react";
import { X, IndianRupee, UserPlus } from "lucide-react";
import type { ElearningCourse } from "@/app/data/elearning/elearning";

export default function RegisterModal({
  open,
  onClose,
  course,
}: {
  open: boolean;
  onClose: () => void;
  course: ElearningCourse | null;
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!open) setValue("");
  }, [open]);

  if (!open || !course) return null;

  const isPaid = course.price > 0;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-2xl p-6 w-[92%] sm:w-[520px] z-50">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2">
          {isPaid ? (
            <IndianRupee className="text-orange-500" />
          ) : (
            <UserPlus className="text-green-600" />
          )}
          <h2 className="text-sm font-semibold text-[#1F5C9E]">
            {isPaid ? "Purchase Course" : "Register for FREE"}
          </h2>
        </div>

        <h3 className="mt-2 text-xl font-bold">
          {course.title}
        </h3>

        <input
          className="mt-4 w-full border rounded-lg px-3 py-2"
          placeholder="USI No / Email / Phone"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button
          className={`mt-6 w-full py-2 rounded-lg text-white font-semibold ${
            isPaid
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
          onClick={onClose}
        >
          {isPaid ? `Pay ₹${course.price}` : "Register Free"}
        </button>
      </div>
    </div>
  );
}
