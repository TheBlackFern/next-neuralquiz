"use client";
import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import QuizQuestion from "./quiz-question";
import { QuizSubmitButton } from "./quiz-submit-button";
import { m } from "framer-motion";
import { Bookmark, Star } from "lucide-react";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import { TQuestions } from "@/db";
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
  const { theme } = useTheme();
  const initialAnswers = React.useMemo(
    () => calculateInitial(questions),
    [questions],
  );
  const answers = React.useRef<Array<TAnswer>>(initialAnswers);
  const [isAnswered, setIsAnswered] = React.useState<boolean[]>(
    Array(questions.length).fill(false),
  );
  const [isBookmarked, setIsBookmarked] = React.useState<boolean[]>(
    Array(questions.length).fill(false),
  );
  const [step, setStep] = React.useState(0);

  function handleBookmarked(index: number) {
    setIsBookmarked((prev) => {
      const upd = [...prev];
      upd[index] = !upd[index];
      return upd;
    });
  }
  function handleGivenAnswer(index: number) {
    setIsAnswered((prev) => {
      const upd = [...prev];
      upd[index] = true;
      return upd;
    });
  }

  return (
    <div className="flex min-h-screen w-[300px] flex-col items-center gap-4 overflow-x-hidden md:w-[600px]">
      <div className="mt-2 space-x-3">
        <QuizSubmitButton testId={testID} answers={answers.current} />
        <Link
          href="/tests"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Back
        </Link>
      </div>
      <div className="max-xs:max-w-[300px] flex h-auto w-fit flex-row flex-wrap justify-center gap-2 pt-1">
        {questions.map((question, index) => (
          <>
            <Button
              variant={"outline"}
              className={cn(
                "relative h-10 w-10 text-sm",
                step === index &&
                  "after:absolute after:-bottom-2 after:left-1/2 after:h-1 after:w-7 after:-translate-x-1/2 after:bg-primary after:content-['']",
                !isAnswered[index] &&
                  "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
              )}
              onClick={() => setStep(index)}
              key={question.id}
            >
              <>
                {isBookmarked[index] && (
                  <Bookmark
                    className={cn("absolute -top-0.5 right-0.5")}
                    size={14}
                    strokeWidth={1}
                    fill="currentColor"
                  />
                )}
                {index + 1}
              </>
            </Button>
          </>
        ))}
      </div>
      <div className="relative min-h-screen w-full">
        {questions.map((question, index) => (
          <m.div
            className={cn(
              "relative left-0 right-0 top-0 flex flex-col items-center justify-center gap-3",
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
              handleGivenAnswer={handleGivenAnswer}
              renderBookmark={() => (
                <Button
                  variant="ghost"
                  tabIndex={0}
                  className="absolute left-1.5 top-2 h-6 w-6 p-0"
                  disabled={step !== index}
                  onClick={() => {
                    handleBookmarked(index);
                  }}
                >
                  <Star
                    size={20}
                    className={cn(
                      isBookmarked[index] ? "text-primary" : "text-background",
                    )}
                    strokeWidth={1}
                    stroke={theme === "dark" ? "white" : "black"}
                    fill="currentColor"
                  />
                </Button>
              )}
            >
              {index === questions.length - 1 && (
                <QuizSubmitButton
                  isDisabled={step !== questions.length - 1}
                  testId={testID}
                  answers={answers.current}
                />
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
      </div>
    </div>
  );
};

export default Quiz;
