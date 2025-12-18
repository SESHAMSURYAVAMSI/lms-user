export type Comment = {
  name: string;
  date: string;
  message: string;
};

export default function Comments({
  comments,
}: {
  comments: Comment[];
}) {
  if (!comments || comments.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
      <h2 className="text-lg font-semibold">
        Comments ({comments.length})
      </h2>

      <div className="space-y-3">
        {comments.map((c, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 space-y-1"
          >
            <p className="text-sm font-medium">
              {c.name}
            </p>

            <p className="text-xs text-gray-500">
              {c.date}
            </p>

            <p className="text-sm text-gray-700">
              {c.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
