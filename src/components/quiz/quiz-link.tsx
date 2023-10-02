import { Test } from "@/db/schema";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { ArrowRight, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

type QuizLinkProps = {
  test: Test;
};

const QuizLink = ({ test }: QuizLinkProps) => {
  return (
    <Link
      href={`/test/${test.id}`}
      className={cn(
        buttonVariants({ variant: "secondary" }),
        "group flex flex-row gap-3 h-auto justify-start px-5 py-3 w-[90vw] sm:w-[70vw] max-w-[600px]"
      )}
    >
      <p className="text-start">
        <span className="line-clamp-1 text-base sm:text-lg break-all">
          {test.topic}
        </span>
        <span className="text-muted-foreground text-[12px] sm:text-base line-clamp-1 break-all">
          {test.description}
        </span>
      </p>
      <ChevronsRight
        width={24}
        height={48}
        className="hidden sm:block group-hover:opacity-100 ml-auto opacity-0 transition-all duration-200"
      />
    </Link>
  );
};

export default QuizLink;
