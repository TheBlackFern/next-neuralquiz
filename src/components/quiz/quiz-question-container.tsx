import Image from "next/image";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { TChoice } from "./quiz";

import { cn } from "@/lib/utils";
import { Question } from "@/db/schema";
import QuizQuestionSingle from "./quiz-question-single";
import QuizQuestionMultiple from "./quiz-question-multiple";
import QuizQuestionOpen from "./quiz-question-open";

type QuizQuestionContainerProps = {
  question: Question;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  handleChoice: (option: string, answer: string, index: number) => void;
  choice?: TChoice;
};

const QuizQuestionContainer = (props: QuizQuestionContainerProps) => {
  const { question, step, setStep, handleChoice, choice } = props;
  switch (question.type) {
    case "single":
      return <QuizQuestionSingle {...props} />;
    case "multiple":
      return <QuizQuestionMultiple {...props} />;
    case "open":
      return <QuizQuestionOpen {...props} />;
    default:
      "Error";
  }
};

export default QuizQuestionContainer;
