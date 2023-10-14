import Image from "next/image";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

import { cn } from "@/lib/utils";
import { Question } from "@/db/schema";
import QuizInputSingle from "./quiz-input-single";
import QuizInputMultiple from "./quiz-input-multiple";
import QuizInputOpen from "./quiz-input-open";
import { TAnswer } from "./quiz";

type QuizQuestionProps = {
  question: Question;
  currentStep: number;
  step: number;
  answers: React.MutableRefObject<TAnswer[]>;
  children: React.ReactNode;
};

export type QuizInputProps = {
  question: Question;
  currentStep: number;
  step: number;
  answers: React.MutableRefObject<TAnswer[]>;
};

const QuizQuestion = (props: QuizQuestionProps) => {
  const { question, currentStep, step, answers, children } = props;

  return (
    <section
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm w-[300px] h-auto flex items-center flex-row",
        question.image && "md:w-[600px]"
      )}
    >
      <div className="max-w-[300px]">
        <div className="flex flex-col space-y-1.5 p-6">
          <h2 className="text-2xl font-semibold leading-none tracking-tight">
            Question {step + 1}
          </h2>
          <p className="text-sm text-muted-foregrounds">{question.question}</p>
          {question.image && (
            <div className="relative shrink-0 w-[250px] p-6 h-[250px] md:hidden self-center">
              <Image
                src={question.image}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="question image"
              />
            </div>
          )}
        </div>

        <div className="p-6 pt-0 w-full">
          {question.type === "single" && <QuizInputSingle {...props} />}
          {question.type === "multiple" && <QuizInputMultiple {...props} />}
          {question.type === "open" && <QuizInputOpen {...props} />}
        </div>

        <div className="items-center p-6 pt-0 flex justify-between">
          {children}
        </div>
      </div>
      {question.image && (
        <div className="relative w-[300px] h-[250px] max-md:hidden self-center shrink-0 ml-auto mr-5">
          <Image
            src={question.image}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="question image"
          />
        </div>
      )}
    </section>
  );
};

export default QuizQuestion;
