import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

async function Page() {
  return (
    <div className="mt-12 flex flex-col items-center gap-5">
      <h1 className="text-center text-6xl font-bold">Test Away!</h1>
      <p className="mb-5 text-center text-xl text-muted-foreground [text-wrap:balance]">
        Select a quiz you want to take and try your best to answer every
        question.
      </p>
      <div className="flex w-full flex-row items-center justify-center gap-5">
        <Link
          href="/tests"
          className={cn(
            buttonVariants({ variant: "default" }),
            "h-12 w-32 px-2.5 py-1.5",
          )}
        >
          Quiz Me!
        </Link>
        <Link
          href="/create"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-12 w-32 gap-1 px-2.5 py-1.5",
          )}
        >
          <Plus size={20} /> Create
        </Link>
      </div>
    </div>
  );
}

export default Page;
