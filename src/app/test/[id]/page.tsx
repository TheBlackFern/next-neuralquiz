import Quiz from "@/components/quiz";
import { Button } from "@/components/ui/button";
import { fetchQuestionsByTestID } from "@/db";
import Link from "next/link";

type PageProps = {
  params: {
    id: string;
  };
};

async function Page({ params }: PageProps) {
  const testQuestions = await fetchQuestionsByTestID(parseInt(params.id));

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Link href="/">
        <Button variant={"outline"}>Back</Button>
      </Link>

      <Quiz questions={testQuestions} />
    </div>
  );
}

export default Page;
