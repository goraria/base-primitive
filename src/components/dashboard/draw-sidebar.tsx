"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/custom/drawer";
import { SidebarProvider, SidebarTrigger } from "@/components/custom/sidebar";
import { cn } from "@/lib/utils";
import type { AppSidebarProps } from "@/lib/utils/interface";

export function DrawSidebar({
  data,
  auth,
  className,
  ...props
}: AppSidebarProps) {
  return (
    <SidebarProvider defaultOpen={false} className="contents min-h-0 w-auto">
      <Drawer modal swipeDirection="left">
        <DrawerTrigger
          render={<SidebarTrigger aria-label="Open sidebar navigation" />}
        />
        <DrawerContent className="gap-0">
          <DrawerTitle className="sr-only">Navigation</DrawerTitle>
          <AppSidebar
            data={data}
            auth={auth}
            {...props}
            collapsible="none"
            className={cn("h-full w-full", className)}
          />
        </DrawerContent>
      </Drawer>
    </SidebarProvider>
  );
}
