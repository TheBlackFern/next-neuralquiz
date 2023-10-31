import React from "react";
import { fetchResults } from "@/db";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const Page = async () => {
  const results = await fetchResults();
  return (
    <div className="flex flex-col gap-3">
      {results.map((res) => (
        <Link
          href={`/results/${res.id}`}
          className={cn(buttonVariants({ variant: "secondary" }))}
        >
          {res.testtaker} {res.test}
        </Link>
      ))}
    </div>
  );
};

export default Page;
