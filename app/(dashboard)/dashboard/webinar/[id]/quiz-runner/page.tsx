import QuizRunnerClient from "./QuizRunnerClient";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ REQUIRED IN NEXT 15

  return <QuizRunnerClient id={id} />;
}
