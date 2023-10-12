import { Question } from "@/db/schema";
import React from "react";
import { TChoice } from "./quiz";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

type QuizInputMultipleProps = {
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

const QuizInputMultiple = ({
  question,
  step,
  setStep,
  handleChoice,
  choice,
}: QuizInputMultipleProps) => {
  function handleChecked(checked: boolean) {}
  return (
    <div className="flex flex-col items-start gap-3">
      {question.options &&
        question.options.map((option, optionIndex) => (
          <div className="flex items-center gap-2" key={optionIndex}>
            <Checkbox
              value={option}
              id={`o${optionIndex}`}
              onCheckedChange={handleChecked}
            />
            <Label
              htmlFor={`o${optionIndex}`}
              className={cn(
                "font-normal text-sm w-full"
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
    </div>
  );
};

export default QuizInputMultiple;
