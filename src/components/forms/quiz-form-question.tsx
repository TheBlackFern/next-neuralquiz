import { Question } from "@/db/schema";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { TChoice } from "./quiz-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Dispatch, SetStateAction } from "react";

type QuizFormQuestionProps = {
  question: Question;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  handleChoice: (
    option: string,
    optionIndex: number,
    answer: string,
    index: number
  ) => void;
  choice?: TChoice;
};

const QuizFormQuestion = ({
  question,
  step,
  setStep,
  handleChoice,
  choice,
}: QuizFormQuestionProps) => {
  return (
    <Card
      className={cn(
        "w-[300px] h-auto flex items-center flex-row",
        question.image && "md:w-[600px]"
      )}
    >
      <div>
        <CardHeader>
          <CardTitle>Question {step + 1}</CardTitle>
          <CardDescription>{question.question}</CardDescription>
          {question.image && (
            // <div className="w-[200px] h-[200px] md:hidden">
            <Image
              src={question.image}
              width={250}
              height={250}
              className="w-[250px] h-[250px] md:hidden self-center"
              alt="question image"
            />
            // </div>
          )}
        </CardHeader>

        <CardContent className="w-full flex flex-col gap-2">
          <div className="w-24 flex flex-col items-center justify-center gap-1.5">
            {question.options.map((option, optionIndex) => (
              <Button
                key={optionIndex}
                className={cn(
                  "font-medium w-full",
                  choice?.choice === optionIndex && {
                    "bg-green-500 hover:bg-green-500/90":
                      choice?.isCorrect === true,
                    "bg-red-500 hover:bg-red-500/90":
                      choice?.isCorrect === false,
                  }
                )}
                onClick={() =>
                  handleChoice(option, optionIndex, question.answer, step)
                }
              >
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => setStep((prev) => prev + 1)} className="w-16">
            {choice ? "Next" : "Skip"}
          </Button>
          {step !== 0 && (
            <Button
              onClick={() => setStep((prev) => prev - 1)}
              variant="outline"
            >
              Back
            </Button>
          )}
        </CardFooter>
      </div>
      {question.image && (
        <Image
          src={question.image}
          width={300}
          height={300}
          className="w-[300px] h-[300px] max-md:hidden self-center p-6 shrink-0"
          alt="question image"
        />
      )}
    </Card>
  );
};

export default QuizFormQuestion;
