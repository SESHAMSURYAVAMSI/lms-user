"use client";

import React, { useState } from "react";

const questions = [
  {
    id: "q1",
    q: "Which organ is discussed in the Renal Transplant webinar?",
    options: ["Heart", "Lungs", "Kidney", "Liver"],
    answerIndex: 2,
  },
];

export default function Quiz() {
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  function submit() {
    if (selected === null) return alert("Please pick one");
    setDone(true);
  }

  if (done) {
    return (
      <div>
        <h3 className="font-semibold">Quiz Result</h3>
        <p className="mt-3 text-gray-700">
          {selected === questions[0].answerIndex ? "Correct 🎉" : "Incorrect ❌"}
        </p>
      </div>
    );
  }

  const q = questions[0];

  return (
    <div>
      <h3 className="font-semibold">Quiz</h3>
      <p className="mt-3">{q.q}</p>

      <div className="mt-2 space-y-2">
        {q.options.map((opt, i) => (
          <label
            key={i}
            className={`flex items-center gap-2 p-2 border rounded cursor-pointer ${
              selected === i ? "bg-blue-50" : ""
            }`}
          >
            <input type="radio" checked={selected === i} onChange={() => setSelected(i)} />
            {opt}
          </label>
        ))}
      </div>

      <button onClick={submit} className="px-3 py-2 bg-blue-600 text-white rounded mt-4">
        Submit
      </button>
    </div>
  );
}
