import React from "react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Test } from "@/db/schema";

type QuizLinkProps = {
  test: Test;
};

const QuizLink = ({ test }: QuizLinkProps) => {
  return (
    <Link
      href={`/test/${test.id}`}
      className={cn(
        buttonVariants({ variant: "secondary" }),
        "group flex h-auto w-[90vw] max-w-[600px] flex-row justify-start gap-3 px-5 py-3 sm:w-[70vw]",
      )}
    >
      <p className="text-start">
        <span className="line-clamp-1 break-all text-base sm:text-lg">
          {test.topic}
        </span>
        <span className="line-clamp-1 break-all text-[12px] text-muted-foreground sm:text-base">
          {test.description}
        </span>
      </p>
      <ChevronsRight
        width={24}
        height={48}
        className="ml-auto hidden opacity-0 transition-all duration-200 group-hover:opacity-100 sm:block"
      />
    </Link>
  );
};

export default QuizLink;
