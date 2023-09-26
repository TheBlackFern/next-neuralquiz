import { Button } from "@/components/ui/button";

import Link from "next/link";
import Quiz from "@/components/quiz/quiz";

type PageProps = {
  params: {
    id: string;
  };
};

function Page({ params }: PageProps) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Link href="/">
        <Button variant={"outline"}>Back</Button>
      </Link>

      <Quiz testID={parseInt(params.id)} />
    </div>
  );
}

export default Page;
