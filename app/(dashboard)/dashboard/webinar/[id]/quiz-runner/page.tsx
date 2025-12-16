import QuizRunnerClient from "./QuizRunnerClient";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <QuizRunnerClient id={params.id} />;
}
