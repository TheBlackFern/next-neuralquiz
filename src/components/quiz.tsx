"use client";

import QuizForm from "./forms/quiz-form";
import { LazyMotion, domAnimation } from "framer-motion";

import { TQuestions, fetchQuestionsByTestID } from "@/db";
// import { useGetQuestionsByIdQuery } from "@/redux/api";
import { useEffect, useState } from "react";

type QuizProps = {
  testID: number;
};

const Quiz = ({ testID }: QuizProps) => {
  // const {
  //   data: questions,
  //   error,
  //   isLoading,
  // } = useGetQuestionsByIdQuery(testID);

  const [testQuestions, setTestQuestions] = useState<TQuestions | null>(null);

  useEffect(() => {
    let active = true;
    load();
    return () => {
      active = false;
    };

    async function load() {
      const res = await fetchQuestionsByTestID(testID);
      if (!active) {
        return;
      }
      setTestQuestions(res);
    }
  }, [testID]);

  if (!testQuestions) return <p>loading...</p>;
  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>{JSON.stringify(error)}</p>;
  return (
    <LazyMotion features={domAnimation}>
      <QuizForm questions={testQuestions} />
    </LazyMotion>
  );
};

export default Quiz;
