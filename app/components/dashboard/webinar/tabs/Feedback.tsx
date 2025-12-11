"use client";

import React, { useState, useEffect } from "react";
import { feedbackByWebinar } from "@/app/data/webinar/feedback";

type Question = {
  id: string;
  q: string;
  options: string[]; // options will be displayed in two columns
};

type FeedbackCfg = {
  placeholder?: string;
  questions?: Question[];
};

/**
 * Props:
 * - cfg: optional config object (questions + placeholder)
 * - webinarId: optional webinar id to load config from feedbackByWebinar
 *
 * Prefer passing cfg from the page: <Feedback cfg={feedbackByWebinar[id]} />
 * If not passed, you may pass webinarId and the component will lookup the data.
 */
export default function Feedback({
  cfg,
  webinarId,
}: {
  cfg?: FeedbackCfg;
  webinarId?: number;
}) {
  // load config either from prop or from data file using webinarId
  const cfgFromId = webinarId ? feedbackByWebinar[webinarId] : undefined;
  const config: FeedbackCfg = cfg ?? cfgFromId ?? { placeholder: "Share your comments...", questions: [] };

  const questions = config.questions ?? [];
  const placeholder = config.placeholder ?? "Share your comments...";

  // answers map: questionId -> selectedOptionIndex | null
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // initialize answers state when questions change
  useEffect(() => {
    const initial = (questions || []).reduce((acc: Record<string, number | null>, q) => {
      acc[q.id] = null;
      return acc;
    }, {});
    setAnswers(initial);
  }, [questions]);

  function onSelect(questionId: string, optionIndex: number) {
    setAnswers((s) => ({ ...s, [questionId]: optionIndex }));
  }

  function validateAllAnswered() {
    if (!questions || questions.length === 0) return true; // nothing to validate
    return questions.every((q) => answers[q.id] !== null && answers[q.id] !== undefined);
  }

  function onSubmit() {
    if (questions && questions.length > 0 && !validateAllAnswered()) {
      alert("Please answer all feedback questions before submitting.");
      return;
    }

    setSubmitting(true);

    // simulate send
    setTimeout(() => {
      // `payload` contains question answers + comment
      const payload = {
        answers,
        comment: comment.trim(),
        webinarId: webinarId ?? null,
        submittedAt: new Date().toISOString(),
      };

      // TODO: replace with actual POST to your API endpoint
      console.log("Feedback payload:", payload);

      // UI feedback
      alert("Thank you — your feedback has been submitted.");
      // reset
      setSubmitting(false);
      setComment("");
      setAnswers(
        (questions || []).reduce((acc: Record<string, number | null>, q) => {
          acc[q.id] = null;
          return acc;
        }, {})
      );
    }, 700);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Feedback Questions</h2>

      <div className="space-y-6">
        {questions && questions.length > 0 ? (
          questions.map((q, idx) => (
            <div key={q.id} className="pt-2 pb-4">
              <div className="flex items-start justify-between">
                <div className="max-w-[85%]">
                  <div className="font-medium text-sm">
                    <span className="font-semibold mr-2">{idx + 1}.</span>
                    {q.q}
                  </div>
                </div>
                <div className="text-sm text-gray-400" />
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, i) => (
                  <label key={i} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      checked={answers[q.id] === i}
                      onChange={() => onSelect(q.id, i)}
                      className="h-4 w-4 accent-[#1F5C9E]"
                    />
                    <span className="text-sm">{opt}</span>
                  </label>
                ))}
              </div>

              <div className="mt-4 border-t" />
            </div>
          ))
        ) : (
          <div className="text-gray-600">No feedback questions available.</div>
        )}
      </div>

      {/* Comment box */}
      <div>
        <label className="block text-sm font-medium mb-2">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={placeholder}
          rows={6}
          className="w-full border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1F5C9E]"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="px-4 py-2 bg-[#1F5C9E] text-white rounded text-sm shadow hover:bg-[#184a81] disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "SUBMIT"}
        </button>
      </div>
    </div>
  );
}
