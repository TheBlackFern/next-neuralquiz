import { TQuestions } from "@/db";
import QuizFormQuestion from "./quiz-form-question";
import { useState } from "react";
import { m, useTime } from "framer-motion";
import { cn } from "@/lib/utils";

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
            translateX: `${-(step - index) * 600}px`,
          }}
          style={{
            translateX: `${-(step - index) * 600}px`,
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
    </div>
  );
};

export default QuizForm;
