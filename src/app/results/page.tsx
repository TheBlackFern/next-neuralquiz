import React from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchResults } from "@/db";

const Page = async () => {
  const results = await fetchResults();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h2 className="text-3xl font-medium">Test Results</h2>
      <div className="grid w-full gap-3 [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))]">
        {results.map((res) => (
          <Link
            href={`/results/${res.id}`}
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "flex h-auto flex-col items-start",
            )}
          >
            <span className="line-clamp-1 break-all">{res.testtaker}</span>
            <span className="line-clamp-1 break-all">{res.test}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
