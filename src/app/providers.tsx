"use client";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { LazyMotion, domAnimation } from "framer-motion";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </LazyMotion>
  );
}
