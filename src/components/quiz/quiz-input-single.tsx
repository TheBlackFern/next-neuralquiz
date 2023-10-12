import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { TChoice } from "./quiz";

import { cn } from "@/lib/utils";
import { Question } from "@/db/schema";

type QuizInputSingleProps = {
  question: Question;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setAnswers: React.Dispatch<React.SetStateAction<(TChoice | undefined)[]>>;
  choice?: TChoice;
};

//TODO: we don't need all these props

const QuizInputSingle = ({
  question,
  step,
  setStep,
  setAnswers,
  choice,
}: QuizInputSingleProps) => {
  return (
    <RadioGroup
      onValueChange={(value) => {
        setAnswers((prev) => {
          const upd = [...prev];

          // TODO: do a proper check
          upd[step] = {
            givenAnswer: value,
            correctAnswer: question.answer![0],
          };
          return upd;
        });
      }}
    >
      {question.options &&
        question.options.map((option, optionIndex) => (
          <div className="flex items-center gap-2" key={optionIndex}>
            <RadioGroupItem value={option} id={`r${optionIndex}`} />
            <Label
              htmlFor={`r${optionIndex}`}
              className={cn(
                " font-normal text-sm w-full"
                // choice?.choice === option && {
                //   "text-green-500 hover:text-green-500/90":
                //     choice?.isCorrect === true,
                //   "text-red-500 hover:text-red-500/90":
                //     choice?.isCorrect === false,
                // }
              )}
            >
              {option}
            </Label>
          </div>
        ))}
    </RadioGroup>
  );
};

export default QuizInputSingle;
