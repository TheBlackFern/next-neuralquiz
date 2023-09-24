import QuestionsList from "@/components/tests";
import { Button } from "@/components/ui/button";
import { fetchQuestions } from "@/db";
import Link from "next/link";

type PageProps = {
  params: {
    id: string;
  };
};

async function Page({ params }: PageProps) {
  const testQuestions = await fetchQuestions(parseInt(params.id));

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Link href="/">
        <Button variant={"outline"}>Back</Button>
      </Link>
      <QuestionsList questions={testQuestions} />
    </div>
  );
}

export default Page;
