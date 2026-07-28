"use client";

import * as React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Bar,
  Progress,
  AppProgressProvider as ProgressProvider,
} from "@bprogress/next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToasterProvider } from "@/providers/toaster";
import { ThemeProvider } from "@/providers/theme";
// import { ThemeWrapper } from "./theme/theme-wrapper";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

export function ApplicationProvider({
  children,
}: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ProgressProvider
          height="4px"
          options={{ showSpinner: false, template: null }}
          shallowRouting
        >
          <Progress>
            <Bar className="bg-primary!"/>
          </Progress>
          <TooltipProvider>
            {children}
            <ToasterProvider/>
          </TooltipProvider>
        </ProgressProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
