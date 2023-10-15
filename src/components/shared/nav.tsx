import Link from "next/link";
import { ThemeToggle } from "../theme/theme-toggle";
import { buttonVariants } from "../ui/button";
import { BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

const Nav = () => {
  return (
    <nav className="fixed top-0 z-20 flex h-14 w-full flex-row border-b bg-background px-3 py-1.5 sm:px-20">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "flex flex-row items-center justify-center gap-1",
        )}
      >
        <BrainCircuit size={24} color="hsl(var(--primary))" />
        <p className="max-xs:hidden text-[22px]/[30px] font-bold tracking-[-5%]">
          neural<span className="text-primary">quiz</span>
        </p>
      </Link>
      <ThemeToggle className="ml-auto" />
    </nav>
  );
};

export default Nav;
