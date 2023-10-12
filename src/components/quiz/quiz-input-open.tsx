import { Question } from "@/db/schema";
import React from "react";
import { TChoice } from "./quiz";
import { Input } from "../ui/input";

type QuizInputOpenProps = {
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

const QuizInputOpen = ({
  question,
  step,
  setStep,
  handleChoice,
  choice,
}: QuizInputOpenProps) => {
  return (
    <Input
      placeholder="Write your answer..."
      onChange={(e) => handleChoice(e.target.value, null, step)}
    />
  );
};

export default QuizInputOpen;
