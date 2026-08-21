"use client";

import React, {
  PropsWithChildren,
  Suspense,
  useEffect,
  useRef,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Bar,
  Progress,
  AppProgressProvider as ProgressProvider,
  useProgress,
} from "@bprogress/next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToasterProvider } from "@/providers/toaster";
import { ThemeProvider } from "@/providers/theme";
import {
  LayoutProvider,
  type Collapsible,
  type LayoutVariant,
} from "@/providers/layout";
import { DirectionProvider, type Direction } from "@/providers/direction";
// import { ThemeWrapper } from "./theme/theme-wrapper";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

function SuspenseProgress() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const historyNavigation = useRef(false);
  const { start, stop } = useProgress();

  useEffect(() => {
    function handlePopState() {
      historyNavigation.current = true;
      start();
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [start]);

  useEffect(() => {
    if (!historyNavigation.current) return;

    historyNavigation.current = false;
    stop();
  }, [pathname, search, stop]);

  return null;
}

export function ApplicationProvider({
  children,
  initialCollapsible,
  initialDirection,
  initialVariant,
}: PropsWithChildren<{
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
              <Suspense fallback={null}>
                <SuspenseProgress />
              </Suspense>
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
