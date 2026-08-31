"use client";

import React, {
  PropsWithChildren,
  Suspense,
  useEffect,
  useRef,
} from "react";
import {
  usePathname,
  useSearchParams,
  useServerInsertedHTML,
} from "next/navigation";
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
import { FontProvider } from "@/providers/font";
import {
  LayoutProvider,
  type Collapsible,
  type LayoutWidth,
  type LayoutVariant,
  type NavbarBehavior,
} from "@/providers/layout";
import { DirectionProvider, type Direction } from "@/providers/direction";
import {
  BASE_COLOR_OPTIONS,
  CHART_COLOR_OPTIONS,
  DEFAULT_CUSTOMIZER_STATE,
  THEME_COLOR_OPTIONS,
} from "@/hooks/use-customizer";
// import { ThemeWrapper } from "./theme/theme-wrapper";

const customizerInitializerScript = `(() => {
  try {
    const cookies = Object.fromEntries(
      document.cookie.split(";").map((entry) => {
        const separator = entry.indexOf("=");
        const name = separator < 0 ? entry : entry.slice(0, separator);
        const value = separator < 0 ? "" : entry.slice(separator + 1);
        return [decodeURIComponent(name.trim()), decodeURIComponent(value)];
      })
    );
    const root = document.documentElement;
    const presets = ${JSON.stringify({
      "color-base": {
        allowed: BASE_COLOR_OPTIONS.map(({ key }) => key),
        fallback: DEFAULT_CUSTOMIZER_STATE.base,
      },
      "color-paint": {
        allowed: THEME_COLOR_OPTIONS.map(({ key }) => key),
        fallback: DEFAULT_CUSTOMIZER_STATE.paint,
      },
      "color-chart": {
        allowed: CHART_COLOR_OPTIONS.map(({ key }) => key),
        fallback: DEFAULT_CUSTOMIZER_STATE.chart,
      },
    })};

    Object.entries(presets).forEach(([name, preset]) => {
      const value = preset.allowed.includes(cookies[name])
        ? cookies[name]
        : preset.fallback;
      root.setAttribute(name, value);
    });

    const requestedTheme = ["light", "dark", "system"].includes(
      cookies["color-theme"]
    )
      ? cookies["color-theme"]
      : "system";
    const resolvedTheme =
      requestedTheme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : requestedTheme;

    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
    root.style.colorScheme = resolvedTheme;

    const layoutWidth = ["centered", "full-width"].includes(
      cookies.layout_width
    )
      ? cookies.layout_width
      : "centered";
    root.removeAttribute("layout-width");
    root.removeAttribute("navbar-behavior");
    root.setAttribute(
      "wide",
      layoutWidth === "full-width" ? "wide" : "contained"
    );
  } catch {}
})();`;

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

function CustomizerInitializer() {
  useServerInsertedHTML(() => (
    <script
      id="gorth-customizer-initializer"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: customizerInitializerScript }}
    />
  ));

  return null;
}

export function ApplicationProvider({
  children,
  initialCollapsible,
  initialDirection,
  initialVariant,
  initialWidth,
  initialNavbarBehavior,
}: PropsWithChildren<{
  initialCollapsible?: Collapsible;
  initialDirection?: Direction;
  initialVariant?: LayoutVariant;
  initialWidth?: LayoutWidth;
  initialNavbarBehavior?: NavbarBehavior;
}>) {
  return (
    <>
      <CustomizerInitializer />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider disableTransitionOnChange>
          <FontProvider>
            <DirectionProvider initialDirection={initialDirection}>
              <LayoutProvider
                initialCollapsible={initialCollapsible}
                initialVariant={initialVariant}
                initialWidth={initialWidth}
                initialNavbarBehavior={initialNavbarBehavior}
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
          </FontProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
