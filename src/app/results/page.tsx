import React from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchResults } from "@/db";
import { ChevronsRight } from "lucide-react";
import ResultLink from "@/components/results/result-link";

const Page = async () => {
  const results = await fetchResults();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 md:px-16">
      <h2 className="text-3xl font-medium">Test Results</h2>
      <div className="grid w-full gap-3 [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))]">
        {results.map((res) => (
          <ResultLink result={res} />
          // <Link
          //   href={`/results/${res.id}`}
          //   className={cn(
          //     buttonVariants({ variant: "secondary" }),
          //     "group flex h-auto items-start",
          //   )}
          // >
          //   <p className="flex flex-col ">
          //     <span className="line-clamp-1 break-all">{res.testtaker}</span>
          //     <span className="line-clamp-1 break-all text-muted-foreground">
          //       {res.test}
          //     </span>
          //   </p>
          //   <ChevronsRight
          //     width={24}
          //     height={48}
          //     className="ml-auto hidden opacity-0 transition-all duration-200 group-hover:opacity-100 sm:block"
          //   />
          // </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
