import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

async function Page() {
  return (
    <div className="flex flex-col gap-5 items-center mt-12">
      <h1 className="text-6xl text-center font-bold">Test Away!</h1>
      <p className="text-xl text-muted-foreground mb-5 text-center [text-wrap:balance]">
        Select a quiz you want to take and try your best to answer every
        question.
      </p>
      <div className="flex flex-row gap-5 items-center justify-center w-full">
        <Link
          href="/tests"
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-32 px-2.5 py-1.5 h-12"
          )}
        >
          Quiz Me!
        </Link>
        <Link
          href="/create"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-32 gap-1 px-2.5 py-1.5 h-12"
          )}
        >
          <Plus size={20} /> Create
        </Link>
      </div>
    </div>
  );
}

export default Page;
