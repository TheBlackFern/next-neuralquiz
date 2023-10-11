import Image from "next/image";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { TChoice } from "./quiz";

import { cn } from "@/lib/utils";
import { Question } from "@/db/schema";
import QuizQuestionSingle from "./quiz-question-single";

type QuizQuestionContainerProps = {
  question: Question;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  handleChoice: (option: string, answer: string, index: number) => void;
  choice?: TChoice;
};

const QuizQuestionContainer = (props: QuizQuestionContainerProps) => {
  const { question, step, setStep, handleChoice, choice } = props;
  if (question.answer) {
    return <QuizQuestionSingle {...props} />;
  }
};

export default QuizQuestionContainer;
