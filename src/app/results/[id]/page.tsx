import QuizResults from "@/components/results/result";
import { fetchResult } from "@/db";
import { TAnswer } from "@/db/schema";

type PageProps = {
  params: {
    id: string;
  };
};

async function Page({ params }: PageProps) {
  const result = await fetchResult(parseInt(params.id));

  //TODO: make a proper error message
  if (!result) {
    return <p className="text-lg font-medium">Ooops... Result not found</p>;
  }

  // TODO: answers validation (why?)
  return (
    <QuizResults
      correctAnswers={result.correctAnswers}
      answers={result.result.answers as TAnswer[]}
    />
  );
}

export default Page;
