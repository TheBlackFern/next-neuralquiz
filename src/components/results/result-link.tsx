import React from "react";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { buttonVariants } from "../ui/button";
import { TResult, TTest } from "@/db/schema";

type ResultLinkProps = {
  result: Omit<Omit<TResult, "answers">, "test"> & {
    test: string | null;
  };
};

const ResultLink = ({ result }: ResultLinkProps) => {
  return (
    <Link
      href={`/results/${result.id}`}
      className={cn(
        buttonVariants({ variant: "secondary" }),
        "group flex h-auto flex-row justify-start gap-3 px-5 py-3",
      )}
    >
      <p className="text-start">
        <span className="line-clamp-1 break-all text-base sm:text-lg">
          {result.testtaker}
        </span>
        <span className="line-clamp-1 break-all text-[12px] text-muted-foreground sm:text-base">
          {result.test}
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

export default ResultLink;
