import { Test } from "@/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, ChevronsRight } from "lucide-react";

type QuizLinkProps = {
  test: Test;
};

const QuizLink = ({ test }: QuizLinkProps) => {
  return (
    <Link key={test.id} href={`/test/${test.id}`}>
      <Button
        variant={"secondary"}
        className="group flex flex-row gap-3 h-auto justify-start px-5 py-3"
      >
        <p className="text-start">
          <span className="line-clamp-1 text-lg break-all">{test.topic}</span>
          <span className="text-muted-foreground line-clamp-1 break-all">
            {test.description}
          </span>
        </p>
        <ChevronsRight
          width={24}
          height={48}
          className="group-hover:opacity-100 opacity-0 transition-all duration-200"
        />
      </Button>
    </Link>
  );
};

export default QuizLink;
