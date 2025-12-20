"use client";

import React, { useState } from "react";
import { addToMyConferences } from "@/lib/myConferenceStorage";

export default function RegisterForm({
  conferenceId,
  onDone,
}: {
  conferenceId: string;
  onDone: () => void;
}) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  function submit() {
    if (!value.trim()) {
      alert(
        "Please enter a valid membership number, email, or phone."
      );
      return;
    }

    setLoading(true);

    // ✅ SAVE TO MY CONFERENCES
    addToMyConferences(Number(conferenceId));

    setTimeout(() => {
      alert("Registered successfully for the conference!");
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
        USI ISU Conference
      </h3>

      <p className="text-center text-gray-600 text-sm">
        Enter your membership number / registered email / phone number.
      </p>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Membership No. | Email | Phone Number"
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
