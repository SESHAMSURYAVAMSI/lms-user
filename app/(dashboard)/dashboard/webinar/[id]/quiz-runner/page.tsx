import QuizRunnerClient from "@/app/(dashboard)/dashboard/webinar/[id]/quiz-runner/QuizRunnerClient";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <QuizRunnerClient id={params.id} />;
}
