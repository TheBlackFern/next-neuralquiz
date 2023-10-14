import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TAnswer } from "./quiz";

type QuizResultsProps = {
  score: number;
  total: number;
  answers: React.MutableRefObject<TAnswer[]>;
  children: ReactNode;
};

function ratingPhrase(rating: number) {
  if (rating < 0.5) return "Remember, practice makes perfect!";
  if (rating < 0.8) return "Way to go!";
  if (rating < 1) return "You&apos;ve done well!";
  return "Perfect!";
}

const QuizResults = ({ score, total, answers, children }: QuizResultsProps) => {
  return (
    <Card className="w-fit flex flex-col text-center items-center">
      <CardHeader>
        <CardTitle>Results</CardTitle>
        <CardDescription>{ratingPhrase(score / total)}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="w-24 h-24 from-primary to-primary-foreground bg-gradient-to-b from-40% rounded-full grid place-content-center self-center">
          <p className="text-primary-foreground text-3xl font-bold tracking-tighter">
            {`${score} / ${total}`}
          </p>
        </div>
        <div className="flex flex-col items-start p-3">
          {answers.current.map((answer, index) => (
            <div key={index}>
              <span className="font-mono">{index}</span> :{" "}
              {JSON.stringify(answer.answer)}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex w-full justify-between gap-3">
        {children}
      </CardFooter>
    </Card>
  );
};

export default QuizResults;
