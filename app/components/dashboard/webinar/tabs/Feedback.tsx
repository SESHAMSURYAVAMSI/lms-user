"use client";

import React, { useState } from "react";

export default function Feedback() {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  function onSend() {
    if (!text.trim()) return;
    setSent(true);
    setTimeout(() => {
      alert("Thank you for your feedback!");
      setText("");
      setSent(false);
    }, 600);
  }

  return (
    <div>
      <h3 className="font-semibold">Feedback</h3>
      <textarea
        className="w-full border rounded p-2 mt-2"
        placeholder="Share your feedback..."
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mt-2 flex gap-2">
        <button onClick={onSend} className="px-3 py-2 bg-blue-600 text-white rounded" disabled={sent}>
          {sent ? "Sending..." : "Send Feedback"}
        </button>
        <button onClick={() => setText("")} className="px-3 py-2 border rounded">
          Clear
        </button>
      </div>
    </div>
  );
}
