"use client";

import QuizForm from "./quiz-form";
import { LazyMotion, domAnimation } from "framer-motion";

import { TQuestions, fetchQuestionsByTestID } from "@/db";
// import { useGetQuestionsByIdQuery } from "@/redux/api";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

type QuizProps = {
  testID: number;
};

const Quiz = ({ testID }: QuizProps) => {
  // const {
  //   data: questions,
  //   error,
  //   isLoading,
  // } = useGetQuestionsByIdQuery(testID);
  // TODO: RTK Query or React Query, please!
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

  if (!testQuestions) return <Skeleton className="w-[200px] h-[300px]" />;
  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>{JSON.stringify(error)}</p>;
  return <QuizForm questions={testQuestions} />;
};

export default Quiz;
