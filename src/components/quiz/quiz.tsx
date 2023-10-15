"use client";
import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import QuizQuestion from "./quiz-question";
import QuizResults from "./quiz-results";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { TQuestions } from "@/db";

type QuizProps = {
  questions: TQuestions;
};

export type TAnswer =
  | { type: "multiple"; answer: string[] }
  | { type: "single" | "open"; answer: string };

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

const Quiz = ({ questions }: QuizProps) => {
  const initialAnswers = React.useMemo(
    () => calculateInitial(questions),
    [questions],
  );
  const answers = React.useRef<Array<TAnswer>>(initialAnswers);
  const [step, setStep] = React.useState(0);

  return (
    <div className="flex min-h-screen w-[300px] flex-col items-center gap-2 overflow-x-hidden md:w-[600px]">
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
              translateX: `${-(step - index) * 650}px`,
            }}
            style={{
              translateX: `${-(step - index) * 650}px`,
            }}
            transition={{
              ease: "easeInOut",
            }}
            key={question.id}
          >
            <QuizQuestion
              key={question.id}
              currentStep={step}
              step={index}
              answers={answers}
              question={question}
            >
              <Button
                disabled={step !== index}
                onClick={() => setStep((prev) => prev + 1)}
                className="w-16"
              >
                Next
              </Button>
              {step !== 0 && (
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
        <m.div
          className="absolute left-0 right-0 top-0 flex flex-col items-center justify-center gap-3"
          animate={{
            translateX: `${-(step - questions.length) * 600}px`,
          }}
          style={{
            translateX: `${-(step - questions.length) * 600}px`,
          }}
          transition={{
            ease: "easeInOut",
          }}
        >
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
        </m.div>
      </div>
    </div>
  );
};

export default Quiz;
