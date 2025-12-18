"use client";

import { useState } from "react";

export default function ReplyBox() {
  const [text, setText] = useState("");

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
      <h2 className="text-lg font-semibold">
        Leave a Reply
      </h2>

      <textarea
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment..."
        className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5C9E]"
      />

      <div className="flex gap-3">
        <button
          onClick={() => setText("")}
          className="px-4 py-2 text-sm rounded-lg border text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          className="px-4 py-2 text-sm rounded-lg bg-[#1F5C9E] text-white hover:bg-[#174a7d]"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
}
