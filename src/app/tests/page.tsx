import LinkButton from "@/components/shared/link-button";
import { fetchTests } from "@/db";

const Page = async () => {
  const tests = await fetchTests();

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="text-3xl font-medium">Select a test</h2>
      {tests ? (
        tests.map((test) => (
          <LinkButton
            href={"/tests/" + test.id}
            key={test.id}
            topText={test.topic}
            bottomText={test.description ?? ""}
            className="w-[90vw] max-w-[600px] sm:w-[70vw]"
          />
        ))
      ) : (
        <p className="font-medium">No tests found!</p>
      )}
    </div>
  );
};

export default Page;
