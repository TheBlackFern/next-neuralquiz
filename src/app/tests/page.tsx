import QuizLink from "@/components/quiz/quiz-link";
import { fetchTests } from "@/db";

const Page = async () => {
  const tests = await fetchTests();

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="text-3xl font-medium">Select a test</h2>
      {tests ? (
        tests.map((test) => <QuizLink key={test.id} test={test} />)
      ) : (
        <p className="font-medium">No tests found!</p>
      )}
    </div>
  );
};

export default Page;
