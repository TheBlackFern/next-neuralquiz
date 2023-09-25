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
import { Dispatch, Fragment, SetStateAction } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

type QuizFormQuestionProps = {
  question: Question;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  handleChoice: (option: string, answer: string, index: number) => void;
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
            <Image
              src={question.image}
              width={200}
              height={200}
              className="w-[200px] h-[200px] md:hidden self-center"
              alt="question image"
            />
          )}
        </CardHeader>

        <CardContent className="w-full flex flex-col gap-2">
          <RadioGroup
            onValueChange={(value) => {
              handleChoice(value, question.answer, step);
            }}
          >
            {question.options.map((option, optionIndex) => (
              <div className="flex items-center gap-2" key={optionIndex}>
                <RadioGroupItem value={option} id={`r${optionIndex}`} />
                <Label
                  htmlFor={`r${optionIndex}`}
                  className={cn(
                    " font-normal text-sm w-full",
                    choice?.choice === option && {
                      "text-green-500 hover:text-green-500/90":
                        choice?.isCorrect === true,
                      "text-red-500 hover:text-red-500/90":
                        choice?.isCorrect === false,
                    }
                  )}
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
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
