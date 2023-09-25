import { Button } from "@/components/ui/button";
import { fetchQuestionsByTestID } from "@/db";

import Link from "next/link";
import Quiz from "@/components/quiz";
``;
type PageProps = {
  params: {
    id: string;
  };
};

async function Page({ params }: PageProps) {
  // const testQuestions = await fetchQuestionsByTestID(parseInt(params.id));
  const testQuestions = [
    {
      id: "4",
      question: "Do you see this question?",
      answer: "Yes",
      options: ["Yes", "No", "Unsure"],
      image: null,
      test: 1,
    },
    {
      id: "5",
      question: "What animal do you see in the picture?",
      answer: "Cat",
      options: ["Cat", "Dog", "Parrot"],
      image:
        "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80",
      test: 1,
    },
    {
      id: "6",
      question: "What is 2 + 2?",
      answer: "4",
      options: ["4", "4.0", "2 * 2", "Ugh..."],
      image: null,
      test: 1,
    },
    {
      id: "7",
      question: "Is this a real question?",
      answer: "Who knows",
      options: [
        "Yes",
        "Right?",
        "Or is it?",
        "Who knows",
        "I mean, you tell me",
      ],
      image: null,
      test: 1,
    },
    {
      id: "8",
      question: "What is the plant in the picture?",
      answer: "Daisy",
      options: [
        "Chamomile",
        "Marigold",
        "Daisy",
        "False Sunflower",
        "Ice Plant",
        "Are you serious?",
      ],
      image:
        "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80",
      test: 1,
    },
    {
      id: "9",
      question:
        'How many letters are in a word "antidisestablishmentarianism"?',
      answer: "28",
      options: ["25", "26", "27", "28", "29", "30"],
      image: null,
      test: 1,
    },
  ];
  console.log(testQuestions);

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
