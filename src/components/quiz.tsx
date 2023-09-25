"use client";

import { TQuestions } from "@/db";
import QuizForm from "./forms/quiz-form";
import { LazyMotion, domAnimation } from "framer-motion";

type QuizProps = {
  questions: TQuestions;
};

const Quiz = ({ questions }: QuizProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <QuizForm questions={questions} />
    </LazyMotion>
  );
};

export default Quiz;
