import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

import { cn } from "@/lib/utils";

import { QuizInputProps } from "./quiz-question";

const QuizInputSingle = ({
  question,
  currentStep,
  step,
  answers,
  handleGivenAnswer,
}: QuizInputProps) => {
  return (
    <RadioGroup
      onValueChange={(value) => {
        handleGivenAnswer(step);
        answers.current[step] = {
          answer: value,
          type: "single",
        };
      }}
    >
      {question.options &&
        question.options.map((option, optionIndex) => (
          <div className="flex items-center gap-3" key={optionIndex}>
            <RadioGroupItem
              disabled={currentStep !== step}
              value={option}
              id={`r${optionIndex}`}
            />
            <Label
              htmlFor={`r${optionIndex}`}
              className={cn(" w-full text-base font-normal")}
            >
              {option}
            </Label>
          </div>
        ))}
    </RadioGroup>
  );
};

export default QuizInputSingle;
