import { Question } from "@/db/schema";
import React from "react";
import { TChoice } from "./quiz";

type QuizQuestionMultipleProps = {
  question: Question;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  handleChoice: (option: string, answer: string, index: number) => void;
  choice?: TChoice;
};

const QuizQuestionMultiple = (props: QuizQuestionMultipleProps) => {
  return <div>QuizQuestionSingle</div>;
};

export default QuizQuestionMultiple;
