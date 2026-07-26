"use client"

import React, { JSX } from "react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/custom/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/custom/dropdown"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/custom/sidebar"
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  Bolt,
  LogIn,
  KeySquare,
  LucideIcon,
} from "lucide-react"

import { AppSidebarUserProps, AuthSidebarProps, NavDropdown, NavMainItem, UserProps } from "@/lib/utils/interface";

export function NavUserX({ user }: { user: UserProps }) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger>{/* asChild */}
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-md">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export function NavUserDropdown({
  user,
  nav,
  auth
}: {
  user?: any | null;
  nav: NavDropdown;
  auth: AuthSidebarProps
}): JSX.Element {
  const router = useRouter();

  return (
    <>
      {user ? (
        <>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <NavAvatar user={user} />
              <NavName user={user} />
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {auth.authenticated ? (
            <>
              {nav.main.map((item, index) => (
                <DropdownMenuGroup
                  key={index}
                >
                  <NavDropdownItem
                    icon={item.icon}
                    title={item.title}
                    link={item.url}
                  />
                </DropdownMenuGroup>
              ))}
              <DropdownMenuSeparator />
              <NavDropdownItem
                icon={LogOut}
                title="Đăng xuất"
                action={auth.logout}
              />
            </>
          ) : nav.secondary.map((item, index) => (
            <DropdownMenuGroup
              key={index}
            >
              <NavDropdownItem
                icon={item.icon}
                title={item.title}
                action={(
                  item.url === "/sign-in" ? (
                    auth.login
                  ) : item.url === "/sign-up" ? (
                    auth.register
                  ) : () => {}
                )}
                // link={item.url}
              />
            </DropdownMenuGroup>
          ))}
        </>
      ) : (
        <>
          {/*<DropdownMenuLabel className="p-0 font-normal">*/}
          {/*  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">*/}
          {/*    <NavAvatar user={user} />*/}
          {/*    <NavName user={user} />*/}
          {/*  </div>*/}
          {/*</DropdownMenuLabel>*/}
          {/*<DropdownMenuSeparator />*/}
          <DropdownMenuGroup>
            {nav && nav.secondary.map((item, index) => (
              <NavDropdownItem
                key={index}
                icon={item.icon}
                title={item.title}
                link={item.url}
              />
            ))}
          </DropdownMenuGroup>
        </>
      )}
    </>
  );
}

export function NavUser({
  user,
  nav,
  auth,
  type,
  size = "icon",
  side = "bottom",
  align = "end"
}: AppSidebarUserProps) {
  const { isMobile } = useSidebar();

  return (
    <>
      {type === "navbar" ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>{/* asChild */}
              <Button
                variant="ghost"
                size="icon"
                className="p-0 cursor-pointer"
              >
                <NavAvatar user={user} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align={align}
              sideOffset={4}
            >
              <NavUserDropdown user={user} nav={nav} auth={auth} />
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : type === "sidebar" ? (
        <>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger>{/* asChild */}
                  {size === "lg" ? (
                    <SidebarMenuButton
                      size="lg"
                      className="h-14 data-[active=true]:bg-professional-main/24 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <NavAvatar user={user} />
                      <NavName user={user} />
                      <ChevronsUpDown className="ml-auto size-4" />
                    </SidebarMenuButton>
                  ) : size === "icon" ? (
                    <SidebarMenuButton
                      size="default"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:p-0"
                    >
                      <NavAvatar user={user} />
                      <NavName user={user} />
                      <ChevronsUpDown className="ml-auto size-4" />
                    </SidebarMenuButton>
                  ) : (
                    <>
                      <SidebarMenuButton
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:p-0"
                      >
                        <NavAvatar user={user} />
                        <NavName user={user} />
                        <ChevronsUpDown className="ml-auto size-4" />
                      </SidebarMenuButton>
                    </>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  // side={isMobile ? "bottom" : "right"}
                  side={isMobile ? "bottom" : side}
                  align={align}
                  sideOffset={4}
                >
                  <NavUserDropdown user={user} nav={nav} auth={auth} />
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export function NavAvatar({ user }: { user?: any | null }) {
  return (
    <>
      <Avatar className="">
        {user ? (
          <>
            <AvatarImage
              src={user?.imageUrl ?? user?.avatarUrl ?? undefined}
              alt={user?.fullName ?? `${user?.firstName ?? ''} ${user?.lastName ?? ''}`}
            />
            <AvatarFallback className="bg-professional-main/24" suppressHydrationWarning>
              {(user?.firstName?.charAt(0) ?? 'U').toUpperCase()}
              {(user?.lastName?.charAt(0) ?? 'A').toUpperCase()}
            </AvatarFallback>
            {/* <AvatarImage src={user?.imageUrl} alt={`${user?.fullName}`} /> */}
            {/* <AvatarFallback className="rounded-md">JG</AvatarFallback> */}
            {/* <AvatarImage src={nullToUndefined(user?.avatar_url)} alt={nullToUndefined(user?.name)} /> */}
            {/* <AvatarFallback className="rounded-lg">WD</AvatarFallback> */}
          </>
        ) : (
          <>
            {/* <AvatarImage src={user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture ?? undefined} alt={`${user?.user_metadata?.name}`} /> */}
            <AvatarFallback className="">VA</AvatarFallback>
          </>
        )}
      </Avatar>
    </>
  )
}

export function NavName({ user }: { user?: any | null }) {
  const name = user.name

  return (
    <>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium" suppressHydrationWarning>
          {name}
        </span>
        <span className="truncate text-xs" suppressHydrationWarning>
          {user ? user.email : "user@gorth.org"}
        </span>
      </div>
    </>
  )
}

export function NavDropdownItem({
  icon: Icon,
  title,
  link,
  action
}: {
  icon: LucideIcon;
  title: string;
  link?: string;
  action?: () => void;
}) {
  return (
    <>
      <DropdownMenuItem
        className=""
        onClick={action}
      >
        <Icon className="h-4 w-4" />
        {link ? <Link href={link}>{title}</Link> : <span>{title}</span>}
      </DropdownMenuItem>
    </>
  )
}
