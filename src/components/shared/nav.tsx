import Link from "next/link";
import { ThemeToggle } from "../theme/theme-toggle";
import { buttonVariants } from "../ui/button";
import { BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

const Nav = () => {
  return (
    <nav className="fixed bg-background flex z-20 flex-row top-0 w-full py-1.5 sm:px-20 px-3 border-b h-14">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "flex flex-row justify-center items-center gap-1"
        )}
      >
        <BrainCircuit size={24} color="hsl(var(--primary))" />
        <p className="max-xs:hidden font-bold tracking-[-5%] text-[22px]/[30px]">
          neural<span className="text-primary">quiz</span>
        </p>
      </Link>
      <ThemeToggle className="ml-auto" />
    </nav>
  );
};

export default Nav;
