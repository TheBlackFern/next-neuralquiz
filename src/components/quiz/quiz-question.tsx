import Image from "next/image";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { TChoice } from "./quiz";

import { cn } from "@/lib/utils";
import { Question } from "@/db/schema";
import QuizInputSingle from "./quiz-input-single";
import QuizInputMultiple from "./quiz-input-multiple";
import QuizInputOpen from "./quiz-input-open";

type QuizQuestionProps = {
  question: Question;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  handleChoice: (
    option: string,
    answer: string | string[] | null,
    index: number
  ) => void;
  choice?: TChoice;
};

const QuizQuestion = (props: QuizQuestionProps) => {
  const { question, step, setStep, handleChoice, choice } = props;

  return (
    <section
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm w-[300px] h-auto flex items-center flex-row",
        question.image && "md:w-[600px]"
      )}
    >
      <div className="max-w-[300px]">
        <div className="flex flex-col space-y-1.5 p-6">
          <h2 className="text-2xl font-semibold leading-none tracking-tight">
            Question {step + 1}
          </h2>
          <p className="text-sm text-muted-foregrounds">{question.question}</p>
          {question.image && (
            <div className="relative shrink-0 w-[250px] p-6 h-[250px] md:hidden self-center">
              <Image
                src={question.image}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="question image"
              />
            </div>
          )}
        </div>

        <p className="p-6 pt-0 w-full">
          {question.type === "single" && <QuizInputSingle {...props} />}
          {question.type === "multiple" && <QuizInputMultiple {...props} />}
          {question.type === "open" && <QuizInputOpen {...props} />}
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
        <div className="relative w-[300px] h-[250px] max-md:hidden self-center shrink-0 ml-auto mr-5">
          <Image
            src={question.image}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="question image"
          />
        </div>
      )}
    </section>
  );
};

export default QuizQuestion;
