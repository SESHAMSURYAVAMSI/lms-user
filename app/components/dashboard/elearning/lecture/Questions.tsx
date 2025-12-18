export default function Questions({
  questions,
}: {
  questions: string[];
}) {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
      <h2 className="text-lg font-semibold">
        Please Answer the Following :
      </h2>

      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
        {questions.map((q, index) => (
          <li key={index}>{q}</li>
        ))}
      </ul>
    </div>
  );
}
