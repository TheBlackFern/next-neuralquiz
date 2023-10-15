import React from "react";
import { Input } from "../ui/input";

import { QuizInputProps } from "./quiz-question";

const QuizInputOpen = ({ currentStep, step, answers }: QuizInputProps) => {
  return (
    <Input
      disabled={currentStep !== step}
      placeholder="Write your answer..."
      onChange={(e) => {
        answers.current[step] = {
          answer: e.target.value,
          type: "open",
        };
      }}
    />
  );
};

export default QuizInputOpen;
