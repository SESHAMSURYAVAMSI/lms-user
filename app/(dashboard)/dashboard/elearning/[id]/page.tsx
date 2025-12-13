// app/elearning/[id]/page.tsx  (DEBUG - data at app/data/elearning/elearning.ts)
import Link from "next/link";
import { ELEARNING_COURSES } from "@/app/data/elearning/elearning";

type Props = { params: { id: string } };

export default function DebugCoursePage({ params }: Props) {
  const id = Number(params.id);
  const course = ELEARNING_COURSES.find((c) => c.id === id);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Debug /elearning/{params.id}</h2>

        <p><strong>Parsed id:</strong> {isNaN(id) ? "NaN" : id}</p>
        <p><strong>Courses available (ids):</strong> {ELEARNING_COURSES.map(c => c.id).join(", ")}</p>

        <hr className="my-4" />

        {course ? (
          <>
            <p className="text-green-700 font-semibold">Course FOUND ✅</p>
            <p><strong>Title:</strong> {course.title}</p>
            <p><strong>Image:</strong> {course.image}</p>
            <div className="mt-4">
              <Link href={`/elearning/${course.id}`} className="underline">Open detail page</Link>
            </div>
          </>
        ) : (
          <>
            <p className="text-red-600 font-semibold">Course NOT found — this caused the 404.</p>
            <p>Possible reasons:</p>
            <ul className="list-disc ml-5">
              <li>The data import path is wrong for where your data file actually sits.</li>
              <li>The id in the URL is not present in the `ELEARNING_COURSES` array.</li>
              <li>The data file did not reload — restart the dev server.</li>
            </ul>
            <div className="mt-4">
              <Link href="/elearning" className="underline">Back to list</Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
