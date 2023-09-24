import { fetchQuestions } from "@/db";
import Image from "next/image";

type PageProps = {
  params: {
    id: string;
  };
};

async function Page({ params }: PageProps) {
  const testQuestions = await fetchQuestions(parseInt(params.id));

  return (
    <div className="flex items-center justify-center flex-col">
      {testQuestions.map((question) => (
        <p className="flex flex-col gap-3">
          <span className="font-bold">{question.question}</span>
          {question.image && (
            <span className="w-full h-full relative">
              <Image
                src={question.image}
                width={200}
                height={200}
                alt="question image"
              />
            </span>
          )}
          <span className="text-green-700">{question.answer}</span>
          {question.options.map((option) => (
            <span className="font-medium">{option}</span>
          ))}
        </p>
      ))}
    </div>
  );
}

export default Page;
