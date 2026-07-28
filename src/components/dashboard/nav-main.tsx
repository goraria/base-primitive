"use client"

import React, { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link"
import {
  type LucideIcon,
  ChevronRight, Dot,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuAction,
  useSidebar
} from "@/components/custom/sidebar";
import { Badge } from "@/components/custom/badge";
import { cn } from "@/lib/utils";
import { NavCoreProps, NavMainItem, NavSubItem } from "@/lib/utils/interface";

export function NavOrigin({ items, ...props }: NavCoreProps) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel className="text-lg font-medium">Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            // asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger>{/* asChild */}
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem: any) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton>{/* asChild */}
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
        {/*{items.map((item) => (*/}
        {/*  <Collapsible key={item.title} asChild defaultOpen={item.isActive}>*/}
        {/*    <SidebarMenuItem>*/}
        {/*      <SidebarMenuButton asChild tooltip={item.title}>*/}
        {/*        <Link href={item.url}>*/}
        {/*          {item.icon && <item.icon />}*/}
        {/*          <span>{item.title}</span>*/}
        {/*        </Link>*/}
        {/*      </SidebarMenuButton>*/}
        {/*      {item.items?.length ? (*/}
        {/*        <>*/}
        {/*          <CollapsibleTrigger asChild>*/}
        {/*            <SidebarMenuAction className="data-[state=open]:rotate-90">*/}
        {/*              <ChevronRight />*/}
        {/*              <span className="sr-only">Toggle</span>*/}
        {/*            </SidebarMenuAction>*/}
        {/*          </CollapsibleTrigger>*/}
        {/*          <CollapsibleContent>*/}
        {/*            <SidebarMenuSub>*/}
        {/*              {item.items?.map((subItem) => (*/}
        {/*                <SidebarMenuSubItem key={subItem.title}>*/}
        {/*                  <SidebarMenuSubButton asChild>*/}
        {/*                    <a href={subItem.url}>*/}
        {/*                      <span>{subItem.title}</span>*/}
        {/*                    </a>*/}
        {/*                  </SidebarMenuSubButton>*/}
        {/*                </SidebarMenuSubItem>*/}
        {/*              ))}*/}
        {/*            </SidebarMenuSub>*/}
        {/*          </CollapsibleContent>*/}
        {/*        </>*/}
        {/*      ) : null}*/}
        {/*    </SidebarMenuItem>*/}
        {/*  </Collapsible>*/}
        {/*))}*/}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export function NavMaster({ items, ...props }: NavCoreProps) {
  const { setOpen } = useSidebar();
  const pathname = usePathname();

  return (
    <SidebarGroup {...props}>
      <SidebarMenu>
        {items.map((item: NavMainItem, idx: number) => {
          const isActive = item.url !== "#" && pathname === item.url
            || !!item.items?.some((subItem) => subItem.url !== "#" && pathname === subItem.url);

          if (!item.items?.length) {
            return (
              <SidebarMenuItem key={`${item.title}-${item.url}-${idx}`}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  render={<Link href={item.url} onClick={() => setOpen(true)} />}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={`${item.title}-${item.url}-${idx}`}
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger
                  render={
                    <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isActive}
                    />
                  }
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const isSubActive = subItem.url !== "#" && pathname === subItem.url;

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            isActive={isSubActive}
                            onClick={() => setOpen(true)}
                            render={<Link href={subItem.url} />}
                          >
                            <span className="w-4 h-4 flex justify-center items-center">
                              <span
                                className={cn(
                                  "w-2 h-2 rounded-full",
                                  isSubActive
                                    ? "bg-professional-main"
                                    : "bg-muted-foreground border border-background"
                                )}
                              />
                            </span>
                            <span className="text-sm text-foreground">{subItem.title}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export function NavMain({ items, ...props }: NavCoreProps) {
  const { setOpen } = useSidebar();
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>();

  return (
    <SidebarGroup {...props}>
      <SidebarMenu>
        {items.map((item: NavMainItem, idx: number) => {
          const isActive = item.url !== "#" && pathname === item.url
            || !!item.items?.some((subItem) => subItem.url !== "#" && pathname === subItem.url);
          const isOpen = openIndex === undefined ? isActive : openIndex === idx;

          if (!item.items?.length) {
            return (
              <SidebarMenuItem key={`${item.title}-${item.url}-${idx}`}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  // asChild
                >
                  <Link href={item.url} onClick={() => setOpen(true)}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={`${item.title}-${item.url}-${idx}`}
              open={isOpen}
              onOpenChange={(next) => setOpenIndex(next ? idx : null)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger>{/* asChild */}
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isActive}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    height: { type: "tween", duration: 0.3 },
                    opacity: { duration: 0.2, delay: isOpen ? 0.1 : 0 }
                  }}
                  style={{
                    overflow: "hidden"
                  }}
                >
                  <SidebarMenuSub>
                    {item.items?.map((subItem, sIdx) => {
                      const isSubActive = subItem.url !== "#" && pathname === subItem.url;

                      return (
                        <SidebarMenuSubItem key={`${item.title}-${subItem.title}-${subItem.url}-${sIdx}`}>
                          <SidebarMenuSubButton
                            // asChild
                            isActive={isSubActive}
                            onClick={() => setOpen(true)}
                          >
                            <Link href={subItem.url}>
                              <span className="w-4 h-4 flex justify-center items-center">
                                <span
                                  className={cn(
                                    "w-2 h-2 rounded-full",
                                    isSubActive
                                      ? "bg-professional-main"
                                      : "bg-muted-foreground border border-background"
                                  )}
                                />
                              </span>
                              <span className="text-sm text-foreground">{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </motion.div>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export function NavSub({ items, ...props }: NavCoreProps) {
  const { setOpen } = useSidebar();
  const pathname = usePathname();
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});

  return (
    <SidebarGroup {...props}>
      <SidebarMenu>
        {items.map((item: NavMainItem, idx: number) => {
          const itemKey = `${item.title}-${item.url}-${idx}`;
          const isActive = item.url !== "#" && pathname === item.url
            || !!item.items?.some((subItem) => subItem.url !== "#" && pathname === subItem.url);

          if (!item.items?.length) {
            return (
              <SidebarMenuItem key={itemKey}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  render={<Link href={item.url} onClick={() => setOpen(true)} />}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={itemKey}
              open={openItems[itemKey] ?? isActive}
              onOpenChange={(open) => {
                setOpenItems((current) => ({
                  ...current,
                  [itemKey]: open,
                }));
              }}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger
                  render={
                    <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isActive}
                    />
                  }
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent
                  className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-linear [&[hidden]:not([hidden='until-found'])]:hidden data-ending-style:h-0 data-starting-style:h-0"
                >
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const isSubActive = subItem.url !== "#" && pathname === subItem.url;

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            isActive={isSubActive}
                            onClick={() => setOpen(true)}
                            render={<Link href={subItem.url} />}
                          >
                            <span className="w-4 h-4 flex justify-center items-center">
                              <span
                                className={cn(
                                  "w-2 h-2 rounded-full",
                                  isSubActive
                                    ? "bg-professional-main"
                                    : "bg-muted-foreground border border-background"
                                )}
                              />
                            </span>
                            <span className="text-sm text-foreground">{subItem.title}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
