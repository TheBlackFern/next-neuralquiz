"use client";
import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import QuizQuestion from "./quiz-question";
import { m } from "framer-motion";

import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { cn, getErrorMessage } from "@/lib/utils";

import { TQuestions, createResults } from "@/db";
import { TAnswer } from "@/db/schema";

function calculateInitial(questions: TQuestions) {
  const initialAnswers: TAnswer[] = [];
  questions.forEach((question) => {
    switch (question.type) {
      case "multiple":
        initialAnswers.push({
          type: question.type,
          answer: [],
        });
        break;
      case "open":
      case "single":
        initialAnswers.push({
          type: question.type,
          answer: "",
        });
        break;
    }
  });
  return initialAnswers;
}

type QuizProps = {
  questions: TQuestions;
  testID: number;
};

const Quiz = ({ questions, testID }: QuizProps) => {
  const initialAnswers = React.useMemo(
    () => calculateInitial(questions),
    [questions],
  );
  const answers = React.useRef<Array<TAnswer>>(initialAnswers);
  const [step, setStep] = React.useState(0);
  const { toast } = useToast();
  const router = useRouter();

  async function handleSubmit() {
    try {
      const res = await createResults(answers.current, testID);
      // toast({
      //   title: "Submitted results",
      //   description: (
      //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //       <code className="text-white">{JSON.stringify(res, null, 2)}</code>
      //     </pre>
      //   ),
      // });
      router.push("/result/" + res);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: `Failed to submit results: ${getErrorMessage(
          error,
        )}. Please, try again.`,
      });
    }
    // if (res?.result) {
    //   toast({
    //     title: "Submitted results",
    //     description: (
    //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //         <code className="text-white">
    //           {JSON.stringify(res.result, null, 2)}
    //         </code>
    //       </pre>
    //     ),
    //   });
    // }
  }

  return (
    <div className="flex min-h-screen w-[300px] flex-col items-center gap-2 overflow-x-hidden md:w-[600px]">
      <div className="mt-2 space-x-3">
        <Button className="" onClick={handleSubmit}>
          Submit
        </Button>
        <Link
          href="/tests"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Back
        </Link>
      </div>
      <div className="max-xs:max-w-[300px] flex h-auto w-fit flex-row flex-wrap justify-center gap-2 pt-1">
        {questions.map((question, index) => (
          <Button
            variant={"outline"}
            className={cn(
              step === index &&
                "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
              "h-8 w-8 text-sm",
            )}
            onClick={() => setStep(index)}
            key={question.id}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      <div className="relative min-h-screen w-full">
        {questions.map((question, index) => (
          <m.div
            className={cn(
              "left-0 right-0 top-0 flex flex-col items-center justify-center gap-3",
              {
                absolute: index !== 0,
              },
            )}
            animate={{
              translateX: `${-(step - index) * 600}px`,
            }}
            style={{
              translateX: `${-(step - index) * 600}px`,
            }}
            transition={{
              ease: "easeInOut",
            }}
            key={question.id}
          >
            <QuizQuestion
              currentStep={step}
              step={index}
              answers={answers}
              question={question}
            >
              {index === questions.length - 1 && (
                <Button className="" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
              {index !== questions.length - 1 && (
                <Button
                  disabled={step !== index}
                  onClick={() => setStep((prev) => prev + 1)}
                  className="w-16"
                >
                  Next
                </Button>
              )}
              {index !== 0 && (
                <Button
                  disabled={step !== index}
                  onClick={() => setStep((prev) => prev - 1)}
                  variant="outline"
                >
                  Back
                </Button>
              )}
            </QuizQuestion>
          </m.div>
        ))}
        {/* <QuizMotion step={step} initOffset={questions.length}>
          <QuizResults
            correctAnswers={questions.reduce<Array<string | string[] | null>>(
              (acc, question) => {
                acc.push(question.answer);
                return acc;
              },
              [],
            )}
            answers={answers}
            // TODO: calculate?
            // score={answers.reduce<number>((score, choice) => {
            //   choice?.correctAnswer && score++;
            //   return score;
            // }, 0)}
          >
            <Button
              disabled={step !== questions.length}
              variant="outline"
              onClick={() => setStep(0)}
            >
              Retake
            </Button>
            <Link
              href="/tests"
              tabIndex={step !== questions.length ? -1 : 0}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              New Test
            </Link>
          </QuizResults>
        </QuizMotion> */}
      </div>
    </div>
  );
};

export default Quiz;
