import React from "react";
import { Input } from "../ui/input";
import { QuizInputProps } from "./quiz-question";

const QuizInputOpen = ({ question, step, answers }: QuizInputProps) => {
  return (
    <Input
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
