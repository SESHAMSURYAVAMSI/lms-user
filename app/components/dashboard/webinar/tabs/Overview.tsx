"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ================= TYPES ================= */
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

type LoggedUser = {
  fullName?: string;
  profilePhoto?: string;
};

/* ================= AVATAR ================= */
function Avatar({
  name,
  profile,
  size = 40,
}: {
  name: string;
  profile?: string;
  size?: number;
}) {
  const [error, setError] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0] ?? "")
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (profile && !error) {
    return (
      <div
        style={{ width: size, height: size }}
        className="relative rounded-full overflow-hidden"
      >
        <Image
          src={profile}
          alt={name}
          fill
          sizes="40px"
          className="object-cover"
          onError={() => setError(true)}
        />
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#1F5C9E] font-semibold"
    >
      {initials}
    </div>
  );
}

/* ================= TIME FORMAT ================= */
function timeAgo(iso?: string) {
  if (!iso) return "just now";

  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;

  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

/* ================= COMPONENT ================= */
export default function Overview({
  description,
  comments,
  commentText,
  setCommentText,
  onAddComment,
}: Props) {
  const [user, setUser] = useState<LoggedUser | null>(null);

  /* ✅ READ PROFILE FROM LOCAL STORAGE SAFELY */
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      setUser(null);
    }
  }, []);

  const userName = user?.fullName || "You";
  const userProfile = user?.profilePhoto;

  return (
    <div className="space-y-6">
      {/* ABOUT WEBINAR */}
      <div className="border rounded-2xl p-6 bg-white">
        <h3 className="text-lg font-semibold">About Webinar</h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* ADD COMMENT */}
      <div className="border rounded-2xl p-6 bg-white">
        <h4 className="text-md font-semibold mb-4">
          Add Your Comment
        </h4>

        <div className="flex gap-4">
          <Avatar
            name={userName}
            profile={userProfile}
            size={44}
          />

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

            <div className="mt-3 flex justify-end gap-3">
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

      {/* COMMENTS LIST */}
      <div className="border rounded-2xl p-6 bg-white">
        <div className="flex justify-between mb-4">
          <h4 className="text-lg font-semibold">
            Comments ({comments.length})
          </h4>
          <span className="text-sm text-gray-500">
            Most recent first
          </span>
        </div>

        {comments.length === 0 && (
          <p className="text-gray-500">No comments yet.</p>
        )}

        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="border-t pt-4">
              <div className="flex gap-4">
                <Avatar
                  name={c.author}
                  profile={c.profile}
                  size={40}
                />

                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {c.author}
                  </p>
                  <p className="text-xs text-gray-400">
                    {timeAgo(c.date)}
                  </p>

                  <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                    {c.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
