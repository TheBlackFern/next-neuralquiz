import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { TChoice } from "./quiz-form";

import { cn } from "@/lib/utils";
import { Question } from "@/db/schema";

type QuizFormQuestionProps = {
  question: Question;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
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
    <section
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm w-[300px] h-auto flex justify-start items-center flex-row",
        question.image && "md:w-[600px]"
      )}
    >
      <div>
        <div className="flex flex-col space-y-1.5 p-6">
          <h2 className="text-2xl font-semibold leading-none tracking-tight">
            Question {step + 1}
          </h2>
          <p className="text-sm text-muted-foregrounds">{question.question}</p>
          {question.image && (
            <Image
              src={question.image}
              width={250}
              height={250}
              className="w-[250px] h-[250px] md:hidden self-center"
              alt="question image"
            />
          )}
        </div>

        <p className="p-6 pt-0 w-full flex flex-col gap-2">
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
                    " font-normal text-sm w-full"
                    // choice?.choice === option && {
                    //   "text-green-500 hover:text-green-500/90":
                    //     choice?.isCorrect === true,
                    //   "text-red-500 hover:text-red-500/90":
                    //     choice?.isCorrect === false,
                    // }
                  )}
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </p>
        <div className="items-center p-6 pt-0 flex justify-between">
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
        </div>
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
    </section>
  );
};

export default QuizFormQuestion;
