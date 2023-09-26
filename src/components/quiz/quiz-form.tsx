import { useState } from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import QuizFormQuestion from "./quiz-form-question";
import QuizFormResults from "./quiz-form-results";

import { TQuestions } from "@/db";

type QuizFormProps = {
  questions: TQuestions;
};

export type TChoice = {
  choice: string;
  isCorrect: boolean;
};

const QuizForm = ({ questions }: QuizFormProps) => {
  const [choices, setChoices] = useState<Array<TChoice | undefined>>(
    Array(questions.length)
  );
  const [step, setStep] = useState(0);

  const handleChoice = (option: string, answer: string, index: number) => {
    setChoices((prev) => {
      const upd = [...prev];
      upd[index] = {
        choice: option,
        isCorrect: option === answer,
      };
      return upd;
    });
  };

  return (
    <div className="relative h-[1000px] overflow-x-hidden w-[300px] md:w-[600px]">
      {questions.map((question, index) => (
        <m.div
          className={cn(
            "flex top-0 left-0 right-0 flex-col justify-center items-center gap-3",
            {
              absolute: index !== 0,
            }
          )}
          animate={{
            translateX: `${-(step - index) * 650}px`,
          }}
          style={{
            translateX: `${-(step - index) * 650}px`,
          }}
          transition={{
            ease: "easeInOut",
          }}
          key={question.id}
        >
          <QuizFormQuestion
            key={question.id}
            step={index}
            setStep={setStep}
            choice={choices[index]}
            handleChoice={handleChoice}
            question={question}
          />
        </m.div>
      ))}
      <m.div
        className="flex absolute top-0 left-0 right-0 flex-col justify-center items-center gap-3"
        animate={{
          translateX: `${-(step - questions.length) * 600}px`,
        }}
        style={{
          translateX: `${-(step - questions.length) * 600}px`,
        }}
        transition={{
          ease: "easeInOut",
        }}
      >
        <QuizFormResults
          score={choices.reduce<number>((score, choice) => {
            choice?.isCorrect && score++;
            return score;
          }, 0)}
          total={questions.length}
        >
          <Button variant="outline" onClick={() => setStep(0)}>
            Retake
          </Button>
          <Button>New Test</Button>
        </QuizFormResults>
      </m.div>
    </div>
  );
};

export default QuizForm;
