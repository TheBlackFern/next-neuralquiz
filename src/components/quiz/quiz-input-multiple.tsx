import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

import { cn } from "@/lib/utils";

import { QuizInputProps } from "./quiz-question";
import { CheckedState } from "@radix-ui/react-checkbox";

const QuizInputMultiple = ({
  question,
  currentStep,
  step,
  answers,
  handleGivenAnswer,
}: QuizInputProps) => {
  function handleChecked(checked: CheckedState, option: string) {
    handleGivenAnswer(step);
    const prevVal = answers.current[step];
    // had to create a new value and make this check for TS
    // to understand that yeah this IS the correct type
    if (prevVal.type !== "multiple") return;
    if (checked) {
      !prevVal.answer.includes(option) && prevVal.answer.push(option);
    } else {
      prevVal.answer = prevVal.answer.filter((value) => value !== option);
    }
  }

  return (
    <div className="flex flex-col items-start gap-3">
      {question.options &&
        question.options.map((option, optionIndex) => (
          <div className="flex items-center gap-2" key={optionIndex}>
            <Checkbox
              disabled={currentStep !== step}
              value={option}
              id={`o${optionIndex}`}
              onCheckedChange={(checked) => handleChecked(checked, option)}
            />
            <Label
              htmlFor={`o${optionIndex}`}
              className={cn("w-full text-base font-normal")}
            >
              {option}
            </Label>
          </div>
        ))}
    </div>
  );
};

export default QuizInputMultiple;
