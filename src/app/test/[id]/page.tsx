import { Button, buttonVariants } from "@/components/ui/button";

import Link from "next/link";
import Quiz from "@/components/quiz/quiz";
import { cn } from "@/lib/utils";

type PageProps = {
  params: {
    id: string;
  };
};

function Page({ params }: PageProps) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
        Back
      </Link>

      <Quiz testID={parseInt(params.id)} />
    </div>
  );
}

export default Page;
