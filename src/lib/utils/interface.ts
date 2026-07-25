import React, { ComponentProps, ComponentType, ElementType, ReactNode } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";
import {
  Table as TanStackTable,
  Column,
  ColumnDef
} from "@tanstack/react-table";
import { SidebarGroup } from "@/components/custom/sidebar";
import { navigation } from "@/layouts/navbar";

// ============================================================================
// SIDEBAR INTERFACES
// ============================================================================

export interface NavMainItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: NavSubItem[];
}

export interface NavSubItem {
  title: string
  url: string
  description?: string
}

export interface NavDropdown {
  main: NavMainItem[]
  secondary: NavMainItem[]
  navigation?: NavMainItem[]
}

export interface NavMessage {
  name: string;
  email: string;
  avatar?: string;
  subject?: string;
  teaser?: string;
  date: string;
}

export interface UserProps {
  name: string;
  email: string;
  avatar: string;
  // name?: string | null;
  // email?: string | null;
  // avatar?: string | null;
}

export interface AppSidebarUserProps {
  user?: any | null;
  nav: NavDropdown;
  auth: AuthSidebarProps;
  type?: "sidebar" | "navbar";
  size?: "icon" | "sm" | "md" | "lg";
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export interface SidebarProps {
  user: UserProps
  navMain: NavMainItem[]
  navSecondary: NavMainItem[]
  navDropdown: NavMainItem[]
  navSignal: NavMainItem[]
  projects: ProjectProps[]
  teams?: TeamProps[]
  brand?: BrandProps
}

export interface MessageProps {
  user: UserProps
  navMain: NavMainItem[]
  // navSecondary: NavMainItem[]
  navDropdown: NavMainItem[]
  navSignal: NavMainItem[]
  // projects: ProjectProps[]
  // teams?: TeamProps[]
  navMessage: NavMessage[]
  brand?: BrandProps
}

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: SidebarProps,
  auth: AuthSidebarProps,
}

export interface MessSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: MessageProps,
  auth: AuthSidebarProps,
}

export interface NavCoreProps extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
  items: NavMainItem[];
}

export interface AuthSidebarProps {
  // account: AuthUser | null
  loading: boolean
  authenticated: boolean
  // refresh: () => Promise<AuthUser | null>
  login: (returnTo?: string) => void
  register: (returnTo?: string) => void
  logout: (returnTo?: string) => Promise<void>
}

export interface AppSidebarPropsX extends ComponentProps<typeof Sidebar> {
  sidebar: {
    role: string;
    navMain: NavMainItem[];
    projects: { name: string; url: string; icon: LucideIcon }[];
    // user: { name: string; email: string; avatar: string };
  };
  global: {
    name: string;
    description: string;
  };
  user?: any | null;
  // user: AppSidebarUser;
}

export interface ProjectProps {
  name: string
  url: string
  icon: LucideIcon
}

export interface TeamProps {
  name: string
  logo: React.ElementType
  plan: string
}

export interface BrandProps {
  name: string
  logo: string | undefined
  plan?: string | undefined
}

export interface TeamSwitcherProps {
  teams: TeamProps[];
}

export interface HeaderProps {
  top?: ReactNode;
  bottom?: ReactNode;
  left: ReactNode;
  right: ReactNode;
  user?: any | null;
  auth: AuthSidebarProps;
  nav: NavDropdown
}

// ============================================================================
// SIDEBAR INTERFACES
// ============================================================================

export interface StatsBoxProps {
  title: string
  description: string
  icon: LucideIcon
  color?: string
  stats: string | number
}

export interface BadgeIconProps {
  color?: string
  icon: LucideIcon
}


// ============================================================================
// DATATABLES INTERFACES
// ============================================================================

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  search: {
    column: string
    placeholder: string
  }
  filter?: {
    column: string
    title?: string
    options: {
      label: string
      value: string | number | boolean
      icon?: ComponentType<{
        className?: string | undefined;
      }> | undefined
    }[]
  }[]
  max?: string
  onReload?: () => void
  onDownload?: () => void
  onCreate?: () => void
  onUpdate?: (category: any) => void
  onChange?: () => void
}

export interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export interface DataTableSortButtonProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export interface DataTablePaginationProps<TData> {
  table: TanStackTable<TData>
}

export interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string | number | boolean
    icon?: React.ComponentType<{ className?: string }>
  }[]
}