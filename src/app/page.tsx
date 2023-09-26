import QuizLink from "@/components/quiz/quiz-link";
import { fetchTests } from "@/db";

async function Page() {
  const tests = await fetchTests();

  return (
    <div className="flex flex-col gap-5 items-center">
      <h1 className="text-3xl text-center font-bold">Test Away!</h1>
      <p className="text-lg text-muted-foreground mb-5 text-center [text-wrap:balance]">
        Select a quiz you want to take and try your best to answer all
        questions.
      </p>
      {tests ? (
        tests.map((test) => <QuizLink key={test.id} test={test} />)
      ) : (
        <p className="font-medium">No tests found!</p>
      )}
    </div>
  );
}

export default Page;
