import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/shared/nav";
import Background from "@/components/shared/background";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NeuralQuiz",
  description: "Test your skills in molecular neurology.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("antialised", inter.className)}>
        <Providers>
          <Nav />

          <main className="relative min-h-screen flex w-full flex-col items-center justify-between p-5 pt-24 sm:p-24">
            {children}
            <Background />
            <Toaster />
          </main>
        </Providers>
      </body>
    </html>
  );
}
