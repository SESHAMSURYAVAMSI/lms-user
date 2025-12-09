"use client";

import { useState } from "react";
import Image from "next/image";

interface Comment {
  id: number;
  name: string;
  text: string;
}

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, name: "Jane Doe", text: "Really enjoyed this webinar! The speakers explained everything clearly." },
    { id: 2, name: "Kevin Peterson", text: "Great learning session, very interactive and well-organized." },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newEntry: Comment = {
      id: comments.length + 1,
      name: "You", // Later can be replaced with logged-in user's name
      text: newComment.trim(),
    };

    setComments([...comments, newEntry]);
    setNewComment("");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
      {/* Add Comment Box */}
      <h2 className="font-semibold text-lg mb-3">Add Your Comment</h2>
      <div className="flex items-start gap-3">
        <Image
          src="/profile.jpeg"
          alt="User"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5C9E]"
          rows={3}
        />
      </div>
      <div className="flex justify-end gap-3 mt-3">
        <button
          onClick={() => setNewComment("")}
          className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleAddComment}
          className="px-4 py-2 text-sm bg-[#1F5C9E] text-white rounded-md hover:bg-[#184b84]"
        >
          Comment
        </button>
      </div>

      {/* Comments List */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-4">
          Comments ({comments.length})
        </h2>
        {comments.map((c) => (
          <div key={c.id} className="border-b border-gray-100 pb-3 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <Image
                src="/profile.jpeg"
                alt={c.name}
                width={35}
                height={35}
                className="rounded-full object-cover"
              />
              <span className="font-semibold text-gray-700">{c.name}</span>
            </div>
            <p className="text-gray-600 text-sm ml-10">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
