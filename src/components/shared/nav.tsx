import { BrainCircuit } from "lucide-react";
import { ThemeToggle } from "../theme/theme-toggle";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
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
        <BrainCircuit size={24} color="orange" />
        <span className="max-xs:hidden font-thin tracking-[0.2em] text-lg">
          NeuralQuiz
        </span>
      </Link>
      <ThemeToggle className="ml-auto" />
    </nav>
  );
};

export default Nav;
