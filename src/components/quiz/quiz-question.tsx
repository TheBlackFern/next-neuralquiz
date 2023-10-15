import Image from "next/image";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

import { cn } from "@/lib/utils";
import { TQuestion, TAnswer } from "@/db/schema";
import QuizInputSingle from "./quiz-input-single";
import QuizInputMultiple from "./quiz-input-multiple";
import QuizInputOpen from "./quiz-input-open";

type QuizQuestionProps = {
  question: TQuestion;
  currentStep: number;
  step: number;
  answers: React.MutableRefObject<TAnswer[]>;
  children: React.ReactNode;
};

export type QuizInputProps = {
  question: TQuestion;
  currentStep: number;
  step: number;
  answers: React.MutableRefObject<TAnswer[]>;
};

const QuizQuestion = (props: QuizQuestionProps) => {
  const { question, currentStep, step, answers, children } = props;

  return (
    <section
      className={cn(
        "flex h-auto w-[300px] flex-row items-center rounded-lg border bg-card text-card-foreground shadow-sm",
        question.image && "md:w-[600px]",
      )}
    >
      <div className="w-full max-w-[300px]">
        <div className="flex flex-col space-y-1.5 p-6 pb-3">
          <h2 className="text-2xl font-semibold leading-none tracking-tight">
            Question {step + 1}
          </h2>
          <p className="text-muted-foregrounds text-sm">{question.question}</p>
          {question.image && (
            <div className="relative h-[250px] w-[250px] shrink-0 self-center p-6 md:hidden">
              <Image
                src={question.image}
                fill={true}
                className="object-cover object-center"
                alt="question image"
              />
            </div>
          )}
        </div>

        <div className="w-full p-6 pt-0">
          {question.type === "single" && <QuizInputSingle {...props} />}
          {question.type === "multiple" && <QuizInputMultiple {...props} />}
          {question.type === "open" && <QuizInputOpen {...props} />}
        </div>

        <div className="flex w-full items-center justify-between p-6 pt-0">
          {children}
        </div>
      </div>
      {question.image && (
        <div className="relative ml-auto mr-5 h-[250px] w-[300px] shrink-0 self-center max-md:hidden">
          <Image
            src={question.image}
            fill={true}
            className="object-cover object-center"
            alt="question image"
          />
        </div>
      )}
    </section>
  );
};

export default QuizQuestion;
