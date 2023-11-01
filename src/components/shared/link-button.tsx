import React from "react";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { buttonVariants } from "../ui/button";

type LinkButtonProps = {
  href: string;
  topText: string;
  bottomText?: string;
  className?: string;
};

const LinkButton = ({
  href,
  topText,
  bottomText,
  className,
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "secondary" }),
        "group flex h-auto flex-row justify-start gap-3 px-5 py-3",
        className,
      )}
    >
      <p className="text-start">
        <span className="line-clamp-1 break-all text-base sm:text-lg">
          {topText}
        </span>
        <span className="line-clamp-1 break-all text-[12px] text-muted-foreground sm:text-base">
          {bottomText}
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

export default LinkButton;
