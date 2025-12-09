"use client";

import React from "react";


type Comment = {
  id: string;
  author: string;
  profile?: string;
  text: string;
  date?: string;
};

type Props = {
  description?: string;
  comments: Comment[];
  commentText: string;
  setCommentText: (v: string) => void;
  onAddComment: () => void;
};

/** Avatar: uses image if provided, otherwise initials fallback */
function Avatar({ name, profile, size = 40 }: { name: string; profile?: string; size?: number }) {
  const style = { width: size, height: size };

  if (profile) {
    return (
      // use native <img> so path relative to /public works
      <img
        src={profile}
        alt={name}
        style={style}
        className="rounded-full object-cover"
      />
    );
  }

  const initials = name
    .split(" ")
    .map((n) => n[0] ?? "")
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      style={style}
      className="rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#1F5C9E] font-semibold"
    >
      {initials}
    </div>
  );
}

/** human-friendly relative time */
function timeAgo(iso?: string) {
  if (!iso) return "just now";
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const mins = Math.floor(diff / (60 * 1000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

export default function Overview({
  description,
  comments,
  commentText,
  setCommentText,
  onAddComment,
}: Props) {
  return (
    <div className="space-y-6">
      {/* ABOUT WEBINAR BOX */}
      <div className="border rounded-2xl p-6 bg-white">
        <h3 className="text-lg font-semibold">About Webinar</h3>
        <p className="mt-3 text-gray-600 leading-relaxed">{description}</p>
      </div>

      {/* ADD YOUR COMMENT BOX */}
      <div className="border rounded-2xl p-6 bg-white">
        <h4 className="text-md font-semibold mb-4">Add Your Comment</h4>

        <div className="flex gap-4">
          <div className="flex-shrink-0">
            {/* show your profile if available; adjust path to your user's image */}
            <Avatar name="You" profile="/images/users/my-profile.jpg" size={44} />
          </div>

          <div className="flex-1">
            <div className="border rounded-lg p-3">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
                placeholder="Write your comment..."
                className="w-full resize-none text-sm outline-none"
              />
            </div>

            <div className="mt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setCommentText("")}
                className="px-3 py-1.5 border rounded text-sm"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={onAddComment}
                className="px-3 py-1.5 bg-[#1F5C9E] text-white rounded text-sm"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* COMMENTS BOX */}
      <div className="border rounded-2xl p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">Comments ({comments.length})</h4>
          <div className="text-sm text-gray-500">Most recent first</div>
        </div>

        <div className="space-y-4">
          {comments.length === 0 && (
            <div className="text-gray-500">No comments yet.</div>
          )}

          {comments.map((c) => (
            <div key={c.id} className="border-t pt-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Avatar name={c.author} profile={c.profile} size={40} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{c.author}</div>
                      <div className="text-xs text-gray-400">{timeAgo(c.date)}</div>
                    </div>

                    <div className="text-xs text-gray-400">•</div>
                  </div>

                  <div className="mt-3 text-sm text-gray-700 leading-relaxed">{c.text}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
