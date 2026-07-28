"use client"

import * as React from "react"
import Link from "next/link"
import { Command } from "lucide-react"

import { NavMain, NavMaster, NavOrigin } from "@/components/dashboard/nav-main"
import { NavProjects } from "@/components/dashboard/nav-projects"
import { NavSecondary } from "@/components/dashboard/nav-secondary"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem, SidebarSeparator,
} from "@/components/custom/sidebar"

import { LucideIcon } from "lucide-react"
import { TeamSwitcher } from "@/components/dashboard/team-switcher"
import { AppSidebarProps } from "@/lib/utils/interface";

export function AppSidebar({ data, auth, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
    {/*<Sidebar variant="inset" {...props}>*/}
      <SidebarHeader>
        {data.teams?.length ? (
          <TeamSwitcher teams={data.teams} />
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="h-14"
                render={<Link href="/" />}
              >
                {data.brand && data.brand.logo ? (
                  <>
                    <div className="flex aspect-square size-9 items-center justify-center rounded-md text-sidebar-primary-foreground">
                      <img src={data.brand.logo} className="size-9" alt={data.brand.name}/>
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      {data.brand.plan ? (
                        <>
                          <span className="truncate font-medium">{data.brand.name}</span>
                          <span className="truncate text-xs">{data.brand.plan}</span>
                        </>
                      ) : (
                        <span className="truncate font-medium text-xl">{data.brand.name}</span>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex aspect-square size-9 items-center justify-center rounded-md bg-professional-main text-sidebar-primary-foreground">
                      <Command className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">Gorth Inc</span>
                      <span className="truncate text-xs">Enterprise</span>
                    </div>
                  </>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarHeader>
      {/*<SidebarSeparator className="mx-0" />*/}
      <SidebarContent>
        <NavMaster items={data.navMain} />
        <SidebarSeparator className="mx-0 -my-2" />
        <NavSecondary items={data.navSecondary} />
        <SidebarSeparator className="mx-0 -my-2" />
        <NavProjects projects={data.projects} className="mt-auto" />
      </SidebarContent>
      {/*<SidebarSeparator className="mx-0" />*/}
      <SidebarFooter>
        <NavUser
          user={data.user}
          type="sidebar"
          side="right"
          size="lg"
          auth={auth}
          nav={{
            main: data.navDropdown,
            secondary: data.navSignal
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}


// "use client"
//
// import React, { ComponentProps } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { NavMain } from "@/components/dashboard/nav-main"
// import { NavSecondary } from "@/components/dashboard/nav-secondary"
// import { NavProjects } from "@/components/dashboard/nav-projects"
// import { NavUser } from "@/components/dashboard/nav-user"
// import { TeamSwitcher } from "@/components/dashboard/team-switcher"
// import { type LucideIcon } from "lucide-react"k
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenuButton,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarRail,
// } from "@/components/custom/sidebar"
// import { AppSidebarProps } from "@/lib/utils/interface"
// import {
//   BookOpen,
//   Bot,
//   Command,
//   Frame,
//   LifeBuoy,
//   Map,
//   PieChart,
//   Send,
//   Settings2,
//   SquareTerminal,
// } from "lucide-react"
//
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   navMain: [
//     {
//       title: "Playground",
//       url: "#",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         {
//           title: "History",
//           url: "#",
//         },
//         {
//           title: "Starred",
//           url: "#",
//         },
//         {
//           title: "Settings",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Models",
//       url: "#",
//       icon: Bot,
//       items: [
//         {
//           title: "Genesis",
//           url: "#",
//         },
//         {
//           title: "Explorer",
//           url: "#",
//         },
//         {
//           title: "Quantum",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Documentation",
//       url: "#",
//       icon: BookOpen,
//       items: [
//         {
//           title: "Introduction",
//           url: "#",
//         },
//         {
//           title: "Get Started",
//           url: "#",
//         },
//         {
//           title: "Tutorials",
//           url: "#",
//         },
//         {
//           title: "Changelog",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   navSecondary: [
//     {
//       title: "Support",
//       url: "#",
//       icon: LifeBuoy,
//     },
//     {
//       title: "Feedback",
//       url: "#",
//       icon: Send,
//     },
//   ],
//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: Frame,
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: PieChart,
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: Map,
//     },
//   ],
// }
//
// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   return (
//     <Sidebar variant="inset" {...props}>
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg" asChild>
//               <a href="#">
//                 <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
//                   <Command className="size-4" />
//                 </div>
//                 <div className="grid flex-1 text-left text-sm leading-tight">
//                   <span className="truncate font-medium">Acme Inc</span>
//                   <span className="truncate text-xs">Enterprise</span>
//                 </div>
//               </a>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain items={data.navMain} />
//         <NavProjects projects={data.projects} />
//         <NavSecondary items={data.navSecondary} className="mt-auto" />
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser user={data.user} type="sidebar" />
//       </SidebarFooter>
//     </Sidebar>
//   )
// }
//
// export function AppSidebarX({ sidebar, global, user, ...props }: AppSidebarProps) {
// // export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg" className="h-14" asChild>
//               <Link href="/">
//                 {/* <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"> */}
//                   {/* <Command className="size-4" /> */}
//                 {/* </div> */}
//                 {/* <Image src="/logo/logo.png" alt={global.name} width={40} height={40} /> */}
//                 <Image src="/logo/icon.png" alt={global.name} width={36} height={36} />
//                 <div className="grid flex-1 text-left text-sm leading-tight">
//                   <span className="truncate font-medium">{global.name}</span>
//                   <span className="truncate text-xs">{sidebar.role}</span>
//                 </div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain items={sidebar.navMain} />
//         <NavProjects projects={sidebar.projects} />
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser user={user} type="sidebar" size="lg" side="right" align="end" />
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   )
// }

// <SidebarContent>
//           <SidebarGroup>
//             <SidebarGroupContent className="px-1.5 md:px-0">
//               <SidebarMenu>
//                 {data.navMain.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton
//                       tooltip={{
//                         children: item.title,
//                         hidden: false,
//                       }}
//                       onClick={() => {
//                         setActiveItem(item)
//                         setOpen(true)
//                       }}
//                       isActive={activeItem?.title === item.title}
//                       className="px-2.5"
//                     >
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </SidebarContent>
//         <SidebarFooter>
//           <NavUser
//             user={user}
//             type="sidebar"
//             size="icon"
//             side="right"
//             align="end"
//           />
//           {/* <NavUser/> */}
//         </SidebarFooter>
//       </Sidebar>
//
//       {/* This is the second sidebar */}
//       {/* We disable collapsible and let it fill remaining space */}
//       <Sidebar collapsible="none" className="hidden flex-1 md:flex">
//         <SidebarHeader className="gap-3.5 border-b p-4">
//           <div className="flex w-full items-center justify-between">
//             <div className="text-foreground text-base font-medium">
//               {activeItem?.title}
//             </div>
//             <Label className="flex items-center gap-2 text-sm">
//               <span>Chưa đọc</span>
//               <Switch className="shadow-none" />
//             </Label>
//           </div>
//           <SidebarInput
//             placeholder="Tìm kiếm..."
//             value={searchQuery}
//             onChange={(event) => setSearchQuery(event.target.value)}
//           />
//         </SidebarHeader>
//         <SidebarContent>
//           <SidebarGroup className="p-0">
//             <SidebarGroupContent className="flex flex-col gap-1 mt-2">
//               {isLoading && filteredConversations.length === 0 ? (
//                 <div className="p-4 text-xs text-muted-foreground">
//                   Đang tải cuộc trò chuyện...
//                 </div>
//               ) : error ? (
//                 <div className="p-4 space-y-2">
//                   <p className="text-xs text-destructive">{error}</p>
//                   <Button size="sm" variant="outline" onClick={refresh}>
//                     Thử lại
//                   </Button>
//                 </div>
//               ) : filteredConversations.length > 0 ? (
//                 filteredConversations.map((conversation) => {
//                   const conv = conversation as ConversationWithRelations
//                   return (
//                     <ConversationItem
//                       key={conv.id}
//                       conversation={conv}
//                       isActive={conv.id === activeConversationId}
//                       action={() => {
//                         router.push(`/message/${conv.id}`)
//                         setOpen(true)
//                       }}
//                       currentUserId={currentUserId}
//                     />
//                   )
//                 })
//               ) : (
//                 <div className="p-4 text-xs text-muted-foreground">
//                   Không có cuộc trò chuyện.
//                 </div>
//               )}
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </SidebarContent>
//       </Sidebar>
//     </Sidebar>
//   )
// }
