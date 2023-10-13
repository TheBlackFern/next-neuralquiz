import Link from "next/link";
import Quiz from "@/components/quiz/quiz";
import { Skeleton } from "@/components/ui/skeleton";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchQuestionsByTestID } from "@/db";

type PageProps = {
  params: {
    id: string;
  };
};

async function Page({ params }: PageProps) {
  const testQuestions = await fetchQuestionsByTestID(parseInt(params.id));

  if (!testQuestions) return <Skeleton className="w-[200px] h-[300px]" />;

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Link
        href="/tests"
        className={cn(buttonVariants({ variant: "outline" }))}
      >
        Back
      </Link>
      <Quiz questions={testQuestions} />
    </div>
  );
}

export default Page;
