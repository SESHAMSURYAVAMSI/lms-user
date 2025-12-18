export default function TopicCard({
  week,
  topic,
  description,
}: {
  week: string;
  topic: string;
  description: string[];
}) {
  return (
    <>
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[#252641]">{week}</h2>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-8 space-y-4">
        <h1 className="text-2xl font-semibold">
          TOPIC : {topic}
        </h1>

        {description.map((d, i) => (
          <p key={i} className="text-gray-600 text-sm">
            {d}
          </p>
        ))}
      </div>
    </>
  );
}
