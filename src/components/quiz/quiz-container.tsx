"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";
import Quiz from "./quiz";

import { TQuestions, fetchQuestionsByTestID } from "@/db";

type QuizContainerProps = {
  testID: number;
};

// TODO: This should be on a page! Not a component

const QuizContainer = ({ testID }: QuizContainerProps) => {
  // const {
  //   data: questions,
  //   error,
  //   isLoading,
  // } = useGetQuestionsByIdQuery(testID);
  // TODO: RTK Query or React Query, please!
  const [testQuestions, setTestQuestions] = React.useState<TQuestions | null>(
    null
  );

  React.useEffect(() => {
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
  return <Quiz questions={testQuestions} />;
};

export default QuizContainer;
