"use client";

import QuizForm from "./forms/quiz-form";
import { LazyMotion, domAnimation } from "framer-motion";

import { TQuestions } from "@/db";

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
