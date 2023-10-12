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
  handleChoice: (
    option: string,
    answer: string | string[] | null,
    index: number
  ) => void;
  choice?: TChoice;
};

//TODO: we don't need all these props

const QuizInputSingle = ({
  question,
  step,
  setStep,
  handleChoice,
  choice,
}: QuizInputSingleProps) => {
  return (
    <RadioGroup
      onValueChange={(value) => {
        handleChoice(value, question.answer![0], step);
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
