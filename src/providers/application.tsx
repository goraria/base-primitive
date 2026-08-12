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
import {
  LayoutProvider,
  type Collapsible,
  type LayoutVariant,
} from "@/providers/layout";
import {
  DirectionProvider,
  type Direction,
} from "@/providers/direction";
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
  initialCollapsible,
  initialDirection,
  initialVariant,
}: React.PropsWithChildren<{
  initialCollapsible?: Collapsible;
  initialDirection?: Direction;
  initialVariant?: LayoutVariant;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <DirectionProvider initialDirection={initialDirection}>
          <LayoutProvider
            initialCollapsible={initialCollapsible}
            initialVariant={initialVariant}
          >
            <ProgressProvider
              height="2px"
              options={{ showSpinner: false, template: null }}
              shallowRouting
            >
              <Progress>
                <Bar className="bg-primary!" />
              </Progress>
              <TooltipProvider>
                {children}
                <ToasterProvider />
              </TooltipProvider>
            </ProgressProvider>
          </LayoutProvider>
        </DirectionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
