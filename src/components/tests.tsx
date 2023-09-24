"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TQuestions } from "@/db";

type QuestionsListProps = {
  questions: TQuestions;
};

type TChoice = {
  choice: number;
  isCorrect: boolean;
};

const QuestionsList = ({ questions }: QuestionsListProps) => {
  const [choices, setChoices] = useState<Array<TChoice | null>>(
    Array(questions.length).fill(null)
  );

  const handleChoice = (
    option: string,
    optionIndex: number,
    answer: string,
    index: number
  ) => {
    console.log(option, answer, option === answer);
    setChoices((prev) => {
      const upd = [...prev];
      upd[index] = {
        choice: optionIndex,
        isCorrect: option === answer,
      };
      return upd;
    });
  };
  return (
    <div className="flex items-center gap-3 justify-center flex-col">
      {questions.map((question, questionIndex) => (
        <div
          className="flex flex-col justify-center items-center gap-3"
          key={question.id}
        >
          <p className="font-bold">{question.question}</p>
          {question.image && (
            <Image
              src={question.image}
              width={200}
              height={200}
              className="self-center"
              alt="question image"
            />
          )}
          <div className="w-24 flex flex-col items-center justify-center gap-1.5">
            {question.options.map((option, optionIndex) => (
              <Button
                key={optionIndex}
                className={cn(
                  "font-medium w-full",
                  choices[questionIndex]?.choice === optionIndex && {
                    "bg-green-500 hover:bg-green-500/90":
                      choices[questionIndex]?.isCorrect === true,
                    "bg-red-500 hover:bg-red-500/90":
                      choices[questionIndex]?.isCorrect === false,
                  }
                )}
                onClick={() =>
                  handleChoice(
                    option,
                    optionIndex,
                    question.answer,
                    questionIndex
                  )
                }
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;
