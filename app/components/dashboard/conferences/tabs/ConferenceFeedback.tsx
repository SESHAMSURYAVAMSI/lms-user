"use client";

import React, { useState, useEffect } from "react";
import { feedbackByConference } from "@/app/data/conferences/feedback";

/* ================= TYPES ================= */
type Question = {
  id: string;
  q: string;
  options: string[];
};

type FeedbackCfg = {
  placeholder?: string;
  questions?: Question[];
};

/**
 * Props:
 * - cfg: optional config object (questions + placeholder)
 * - conferenceId: optional conference id to load config
 *
 * Prefer passing cfg from the page:
 * <ConferenceFeedback cfg={feedbackByConference[id]} />
 */
export default function ConferenceFeedback({
  cfg,
  conferenceId,
}: {
  cfg?: FeedbackCfg;
  conferenceId?: number;
}) {
  // load config either from prop or from data file using conferenceId
  const cfgFromId = conferenceId
    ? feedbackByConference[conferenceId]
    : undefined;

  const config: FeedbackCfg =
    cfg ?? cfgFromId ?? {
      placeholder: "Share your feedback...",
      questions: [],
    };

  const questions = config.questions ?? [];
  const placeholder =
    config.placeholder ?? "Share your feedback...";

  // answers map: questionId -> selectedOptionIndex | null
  const [answers, setAnswers] = useState<
    Record<string, number | null>
  >({});
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // initialize answers state when questions change
  useEffect(() => {
    const initial = (questions || []).reduce(
      (acc: Record<string, number | null>, q) => {
        acc[q.id] = null;
        return acc;
      },
      {}
    );
    setAnswers(initial);
  }, [questions]);

  function onSelect(questionId: string, optionIndex: number) {
    setAnswers((s) => ({
      ...s,
      [questionId]: optionIndex,
    }));
  }

  function validateAllAnswered() {
    if (!questions || questions.length === 0) return true;
    return questions.every(
      (q) =>
        answers[q.id] !== null &&
        answers[q.id] !== undefined
    );
  }

  function onSubmit() {
    if (questions.length > 0 && !validateAllAnswered()) {
      alert(
        "Please answer all feedback questions before submitting."
      );
      return;
    }

    setSubmitting(true);

    // simulate send
    setTimeout(() => {
      const payload = {
        answers,
        comment: comment.trim(),
        conferenceId: conferenceId ?? null,
        submittedAt: new Date().toISOString(),
      };

      // TODO: replace with real API call
      console.log("Conference feedback payload:", payload);

      alert("Thank you — your feedback has been submitted.");

      setSubmitting(false);
      setComment("");
      setAnswers(
        (questions || []).reduce(
          (acc: Record<string, number | null>, q) => {
            acc[q.id] = null;
            return acc;
          },
          {}
        )
      );
    }, 700);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        Conference Feedback
      </h2>

      <div className="space-y-6">
        {questions.length > 0 ? (
          questions.map((q, idx) => (
            <div key={q.id} className="pt-2 pb-4">
              <div className="flex items-start justify-between">
                <div className="max-w-[85%]">
                  <div className="font-medium text-sm">
                    <span className="font-semibold mr-2">
                      {idx + 1}.
                    </span>
                    {q.q}
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      checked={answers[q.id] === i}
                      onChange={() =>
                        onSelect(q.id, i)
                      }
                      className="h-4 w-4 accent-[#1F5C9E]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>

              <div className="mt-4 border-t" />
            </div>
          ))
        ) : (
          <div className="text-gray-600">
            No feedback questions available for this conference.
          </div>
        )}
      </div>

      {/* Comment */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Comment
        </label>
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
