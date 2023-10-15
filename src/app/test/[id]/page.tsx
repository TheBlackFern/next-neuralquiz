import Quiz from "@/components/quiz/quiz";
import { Skeleton } from "@/components/ui/skeleton";

import { fetchQuestionsByTestID } from "@/db";

type PageProps = {
  params: {
    id: string;
  };
};

async function Page({ params }: PageProps) {
  const testQuestions = await fetchQuestionsByTestID(parseInt(params.id));

  if (!testQuestions) return <Skeleton className="h-[300px] w-[200px]" />;

  return <Quiz questions={testQuestions} testID={parseInt(params.id)} />;
}

export default Page;
