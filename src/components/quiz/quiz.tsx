"use client";
import React, { useMemo } from "react";
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
  console.log(initialAnswers);
  return initialAnswers;
}

const Quiz = ({ questions }: QuizProps) => {
  const initialAnswers = React.useMemo(
    () => calculateInitial(questions),
    [questions]
  );
  const answers = React.useRef<Array<TAnswer>>(initialAnswers);
  const [step, setStep] = React.useState(0);

  return (
    <div className="relative h-[1000px] w-[300px] md:w-[600px]">
      {questions.map((question, index) => (
        <m.div
          className={cn(
            "flex top-0 left-0 right-0 flex-col justify-center items-center gap-3",
            {
              absolute: index !== 0,
            }
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
      {step > questions.length - 2 && (
        <m.div
          className="flex absolute top-0 left-0 right-0 flex-col justify-center items-center gap-3"
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
            answers={answers}
            score={7}
            // TODO: calculate?
            // score={answers.reduce<number>((score, choice) => {
            //   choice?.correctAnswer && score++;
            //   return score;
            // }, 0)}
            total={questions.length}
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
              className={cn(buttonVariants({ variant: "default" }))}
            >
              New Test
            </Link>
          </QuizResults>
        </m.div>
      )}
    </div>
  );
};

export default Quiz;
