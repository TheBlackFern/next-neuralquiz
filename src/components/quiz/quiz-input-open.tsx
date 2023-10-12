import { Question } from "@/db/schema";
import React from "react";
import { TChoice } from "./quiz";
import { Input } from "../ui/input";

type QuizInputOpenProps = {
  question: Question;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setAnswers: React.Dispatch<React.SetStateAction<(TChoice | undefined)[]>>;
  choice?: TChoice;
};

const QuizInputOpen = ({
  question,
  step,
  setStep,
  setAnswers,
  choice,
}: QuizInputOpenProps) => {
  return (
    <Input
      placeholder="Write your answer..."
      onChange={(e) =>
        setAnswers((prev) => {
          const upd = [...prev];

          // TODO: do a proper check
          upd[step] = {
            givenAnswer: e.target.value,
            correctAnswer: null,
          };
          return upd;
        })
      }
    />
  );
};

export default QuizInputOpen;
