import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type QuizFormResultsProps = {
  score: number;
  total: number;
  children: ReactNode;
};

function ratingPhrase(rating: number) {
  if (rating < 0.5) return "Remember, practice makes perfect!";
  if (rating < 0.8) return "Way to go!";
  if (rating < 1) return "You&apos;ve done well!";
  return "Perfect!";
}

const QuizFormResults = ({ score, total, children }: QuizFormResultsProps) => {
  return (
    <Card className="w-[250px] flex flex-col text-center items-center">
      <CardHeader>
        <CardTitle>Results</CardTitle>
        {/* TODO: analyse the results */}
        <CardDescription>{ratingPhrase(score / total)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-24 h-24 from-primary to-primary-foreground bg-gradient-to-b from-40% rounded-full grid place-content-center">
          <p className="text-primary-foreground text-3xl font-bold tracking-tighter">
            {`${score} / ${total}`}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex w-full justify-between">
        {children}
      </CardFooter>
    </Card>
  );
};

export default QuizFormResults;
