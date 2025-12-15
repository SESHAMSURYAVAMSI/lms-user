"use client";

import React, { useState } from "react";
import { addToMyLearning } from "@/lib/myLearningStorage";

export default function RegisterForm({
  webinarId,
  onDone,
}: {
  webinarId: string;
  onDone: () => void;
}) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  function submit() {
    if (!value.trim()) {
      alert("Please enter a valid membership number, email, or phone.");
      return;
    }

    setLoading(true);

    // ✅ SAVE TO MY LEARNING
    addToMyLearning(Number(webinarId));

    setTimeout(() => {
      alert("Registered successfully!");
      setLoading(false);
      onDone(); // close modal
    }, 600);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-center text-lg font-semibold text-blue-600">
        Register for FREE
      </h2>

      <h3 className="text-center text-xl font-bold text-[#FFB347]">
        USI ISU Webinar
      </h3>

      <p className="text-center text-gray-600 text-sm">
        Enter your USI membership number / registered email / phone number.
      </p>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="USI membership no. | Email | Phone Number"
        className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-[#1F5C9E] focus:outline-none text-sm"
      />

      <button
        onClick={submit}
        disabled={loading}
        className="w-full px-4 py-2 bg-[#1F5C9E] text-white rounded-md hover:bg-[#FFB347] transition disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
