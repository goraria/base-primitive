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
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
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
              defaultOpen={isActive}
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
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const isSubActive = subItem.url !== "#" && pathname === subItem.url;

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
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
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
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

export function NavMainOld({ items, ...props }: NavCoreProps) {
  const { setOpen } = useSidebar();
  const pathname = usePathname();

  const isMenuActive = useCallback((item: NavMainItem) => {
    if (item.url !== "#" && pathname === item.url) return true;
    if (item.items) {
      return item.items.some((sub: { url: string }) => sub.url !== "#" && pathname === sub.url);
    }
    return false;
  }, [pathname]);
  const isSubMenuActive = useCallback((item: { url: string }) => {
    return item.url !== "#" && pathname === item.url;
  }, [pathname]);

  const getDefaultOpenIndex = useCallback(() => {
    return items.findIndex((item: NavMainItem) => isMenuActive(item));
  }, [items, isMenuActive]);
  const [openIndex, setOpenIndex] = useState<number | null>(() => {
    const idx = getDefaultOpenIndex();
    return idx !== -1 ? idx : null;
  });

  useEffect(() => {
    const idx = getDefaultOpenIndex();
    setOpenIndex(idx !== -1 ? idx : null);
  }, [getDefaultOpenIndex]);

  return (
    <SidebarGroup {...props}>
      {/*<SidebarGroupLabel className="text-lg font-medium">Main</SidebarGroupLabel>*/}
      <SidebarMenu>
        {items.map((item: NavMainItem, idx: number) => {
          const isOpen = openIndex === idx;
          const hasSubMenu = Array.isArray(item.items) && item.items.length > 0;
          const Icon = item.icon

          if (!hasSubMenu) {
            return (
              <SidebarMenuItem key={`${item.title}-${item.url}-${idx}`}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isMenuActive(item)}
                  // asChild
                >
                  <Link href={item.url} onClick={() => setOpen(true)}>
                    {Icon && <Icon />}
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
                    isActive={isMenuActive(item)}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen && hasSubMenu ? "auto" : 0,
                    opacity: isOpen && hasSubMenu ? 1 : 0,
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
                  {hasSubMenu && (
                    <SidebarMenuSub>
                      {item.items?.map((subItem, sIdx) => (
                        <SidebarMenuSubItem key={`${item.title}-${subItem.title}-${subItem.url}-${sIdx}`}>
                          <SidebarMenuSubButton
                            // asChild
                            isActive={isSubMenuActive(subItem)}
                            onClick={() => setOpen(true)}
                          >
                            {/*<Link href={subItem.url}>*/}
                            {/*  <span*/}
                            {/*    className="w-2 h-2 p-2 bg-muted-foreground rounded-full active:text-destructive"*/}
                            {/*  />*/}
                            {/*  <span>{subItem.title}</span>*/}
                            {/*</Link>*/}
                            <Link
                              href={subItem.url}
                            // className="flex items-center h-4 "
                            >
                              <span className="w-4 h-4 flex justify-center items-center">
                                <span
                                  className={cn(
                                    "w-2 h-2 rounded-full",
                                    isSubMenuActive(subItem)
                                      ? "bg-professional-main"
                                      : "bg-muted-foreground border border-background"
                                  )}
                                />
                              </span>
                              {/*<Badge*/}
                              {/*  className="w-4 h-4 p-0 bg-destructive rounded-full active:text-destructive"*/}
                              {/*/>*/}
                              <span className="text-sm text-foreground">{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </motion.div>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export function NavMasterOld({ items, ...props }: NavCoreProps) {
  const { setOpen } = useSidebar();
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>();

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
              open={openIndex === undefined ? isActive : openIndex === idx}
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
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const isSubActive = subItem.url !== "#" && pathname === subItem.url;

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
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
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export function NavSub({ items }: NavCoreProps) {
  const { setOpen } = useSidebar();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isUrlActive = useCallback((url: string) => {
    if (!url || url === "#") return false;

    const [targetPath, queryString] = url.split("?");
    if (targetPath !== pathname) return false;

    if (!queryString) return searchParams.toString().length === 0;

    const expectedParams = new URLSearchParams(queryString);
    for (const [key, value] of expectedParams.entries()) {
      if (searchParams.get(key) !== value) return false;
    }

    return true;
  }, [pathname, searchParams]);

  // Helper to check if a menu or submenu is active by current route
  const isMenuActive = useCallback((item: NavMainItem) => {
    if (isUrlActive(item.url)) return true;
    if (item.items) {
      return item.items.some((sub: { url: string }) => isUrlActive(sub.url));
    }
    return false;
  }, [isUrlActive]);
  const isSubMenuActive = useCallback((item: { url: string }) => {
    return isUrlActive(item.url);
  }, [isUrlActive]);

  // useEffect(() => {
  //   const idx = items.findIndex((item: NavMainItem) => isMenuActive(item));
  //   setOpenIndex(idx !== -1 ? idx : null);
  // }, [pathname, items]);

  // Tính toán nav mở mặc định ngay từ lần render đầu tiên
  const getDefaultOpenIndexS = React.useCallback(() => {
    return items.findIndex((item: NavMainItem) => isMenuActive(item));
  }, [items, isMenuActive]);
  const [openIndex, setOpenIndex] = useState<number | null>(() => {
    const idx = getDefaultOpenIndexS();
    return idx !== -1 ? idx : null;
  });

  // Đồng bộ openIndex khi pathname hoặc items thay đổi (nếu cần)
  useEffect(() => {
    const idx = getDefaultOpenIndexS();
    setOpenIndex(idx !== -1 ? idx : null);
  }, [getDefaultOpenIndexS]);

  // Hiển thị hiệu ứng cho tất cả nav đang hiển thị (có items), không chỉ nav đang active
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Danh mục</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item: NavMainItem, idx: number) => {
          const isOpen = openIndex === idx;
          const hasSubMenu = Array.isArray(item.items) && item.items.length > 0;

          if (!hasSubMenu) {
            return (
              <SidebarMenuItem key={`${item.title}-${item.url}-${idx}`}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isMenuActive(item)}
                  // asChild
                >
                  <Link href={item.url} onClick={() => setOpen(true)}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          return (
            <Collapsible
              key={`${item.title}-${item.url}-${idx}`}
              // asChild
              open={isOpen}
              onOpenChange={(next) => setOpenIndex(next ? idx : null)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger>{/* asChild */}
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isMenuActive(item)}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen && hasSubMenu ? "auto" : 0,
                    opacity: isOpen && hasSubMenu ? 1 : 0,
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
                  {hasSubMenu && (
                    <SidebarMenuSub>
                      {item.items?.map((subItem, sIdx) => (
                        <SidebarMenuSubItem key={`${item.title}-${subItem.title}-${subItem.url}-${sIdx}`}>
                          <SidebarMenuSubButton
                            // asChild
                            isActive={isSubMenuActive(subItem)}
                            onClick={() => setOpen(true)}
                            className="h-9"
                          >
                            {/*<Link href={subItem.url}>*/}
                            {/*  <span*/}
                            {/*    className="w-2 h-2 p-2 bg-muted-foreground rounded-full active:text-destructive"*/}
                            {/*  />*/}
                            {/*  <span>{subItem.title}</span>*/}
                            {/*</Link>*/}
                            <Link
                              href={subItem.url}
                            // className="flex items-center h-4 "
                            >
                              <span className="w-4 h-4 flex justify-center items-center">
                                <span
                                  className={cn(
                                    "w-2 h-2 rounded-full",
                                    isSubMenuActive(subItem)
                                      ? "bg-professional-main"
                                      : "bg-muted-foreground border border-background"
                                  )}
                                />
                              </span>
                              {/*<Badge*/}
                              {/*  className="w-4 h-4 p-0 bg-destructive rounded-full active:text-destructive"*/}
                              {/*/>*/}
                              <span className="text-sm text-foreground">{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                  {/*{hasSubMenu && (*/}
                  {/*  <SidebarMenuSub>*/}
                  {/*    {item.items?.map((subItem: { title: string; url: string }, sIdx: number) => (*/}
                  {/*      <SidebarMenuItem key={`${item.title}-${subItem.title}-${subItem.url}-${sIdx}`}>*/}
                  {/*        <SidebarMenuButton*/}
                  {/*          tooltip={{*/}
                  {/*            children: subItem.title,*/}
                  {/*            hidden: false,*/}
                  {/*          }}*/}
                  {/*          onClick={() => {*/}
                  {/*            setOpen(true);*/}
                  {/*          }}*/}
                  {/*          isActive={isSubMenuActive(subItem)}*/}
                  {/*        >*/}
                  {/*          <Link href={subItem.url}>*/}
                  {/*            <span>{subItem.title}</span>*/}
                  {/*          </Link>*/}
                  {/*        </SidebarMenuButton>*/}
                  {/*      </SidebarMenuItem>*/}
                  {/*    ))}*/}
                  {/*  </SidebarMenuSub>*/}
                  {/*)}*/}
                </motion.div>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
