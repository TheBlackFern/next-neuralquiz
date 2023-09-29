import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/shared/nav";
import { Providers } from "./providers";
import Background from "@/components/shared/background";
import { cn } from "@/lib/utils";

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
      <link rel="shortcut icon" href="/images/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/favicon-16x16.png"
      />
      <body className={cn("antialised", inter.className)}>
        <Providers>
          <Nav />

          <main className="relative min-h-screen flex w-full flex-col items-center justify-between p-5 pt-24 sm:p-24">
            {children}
            <Background />
          </main>
        </Providers>
      </body>
    </html>
  );
}
