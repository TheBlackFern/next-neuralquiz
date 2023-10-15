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
  correctAnswers: Array<string | string[] | null>;
  answers: React.MutableRefObject<TAnswer[]>;
  children: ReactNode;
};

function ratingPhrase(rating: number) {
  if (rating < 0.5) return "Remember, practice makes perfect!";
  if (rating < 0.8) return "Way to go!";
  if (rating < 1) return "You&apos;ve done well!";
  return "Perfect!";
}

function calculateCorrectness(
  answers: TAnswer[],
  correctAnswers: Array<string | string[] | null>,
) {
  return answers.reduce<(boolean | null)[]>((isCorrect, answer, index) => {
    switch (answer.type) {
      case "multiple":
        isCorrect.push(
          answer.answer.sort().join(",") ===
            (correctAnswers[index] as string[]).sort().join(","),
        );
        break;
      case "open":
        isCorrect.push(null);
        break;
      case "single":
        isCorrect.push(answer.answer === correctAnswers[index]);
        break;
    }
    return isCorrect;
  }, []);
}

const QuizResults = ({
  correctAnswers,
  answers,
  children,
}: QuizResultsProps) => {
  // const correctness = calculateCorrectness(answers.current, correctAnswers);

  // const score = correctness.reduce<number>((score, isCorrect) => {
  //   if (isCorrect) score += +isCorrect;
  //   return score;
  // }, 0);
  // const total = correctAnswers.length;

  return (
    <Card className="flex w-fit flex-col items-center text-center">
      <CardHeader>
        <CardTitle>Results</CardTitle>
        {/* <CardDescription>{ratingPhrase(score / total)}</CardDescription> */}
      </CardHeader>
      <CardContent className="flex w-full flex-col">
        {/* <div className="w-24 h-24 from-primary to-primary-foreground bg-gradient-to-b from-40% rounded-full grid place-content-center self-center">
          <p className="text-primary-foreground text-3xl font-bold tracking-tighter">
            {`${score} / ${total}`}
          </p>
        </div> */}
        <div className="grid grid-cols-2 items-center gap-2 p-3">
          <p className="text-xs font-medium text-muted-foreground sm:text-sm">
            Your answer
          </p>
          <p className="text-xs font-medium text-muted-foreground sm:text-sm">
            Correct answer
          </p>
          {answers.current.map((answer, index) => {
            switch (answer.type) {
              case "multiple":
                return (
                  <>
                    <p className="text-xs sm:text-sm">
                      {answer.answer.sort().join(", ")}
                    </p>
                    <p className="text-xs sm:text-sm">
                      {(correctAnswers[index] as string[]).sort().join(", ")}
                    </p>
                  </>
                );
              case "open":
                return (
                  <>
                    <p className="text-xs sm:text-sm">{answer.answer}</p>
                    <p className="text-xs sm:text-sm">-</p>
                  </>
                );
              case "single":
                return (
                  <>
                    <p className="text-xs sm:text-sm">{answer.answer}</p>
                    <p className="text-xs sm:text-sm">
                      {correctAnswers[index]}
                    </p>
                  </>
                );
            }
          })}
        </div>
      </CardContent>
      <CardFooter className="flex w-full justify-between gap-3">
        {children}
      </CardFooter>
    </Card>
  );
};

export default QuizResults;
