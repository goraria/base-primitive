import type { ComponentProps, ElementType } from "react";
import type { LucideIcon } from "lucide-react";

import type { Sidebar, SidebarGroup } from "@/components/custom/sidebar";

export interface NavSubItem {
  title: string;
  url: string;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: NavSubItem[];
}

export interface NavDropdown {
  main: NavMainItem[];
  secondary: NavMainItem[];
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
}

export interface AuthSidebarProps {
  loading: boolean;
  authenticated: boolean;
  login: (returnTo?: string) => void;
  register: (returnTo?: string) => void;
  logout: (returnTo?: string) => Promise<void>;
}

export interface ProjectProps {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface TeamProps {
  name: string;
  logo: ElementType;
  plan: string;
}

export interface BrandProps {
  name: string;
  logo?: string;
  plan?: string;
}

export interface SidebarProps {
  user: UserProps;
  navMain: NavMainItem[];
  navSecondary: NavMainItem[];
  navDropdown: NavMainItem[];
  navSignal: NavMainItem[];
  projects: ProjectProps[];
  teams?: TeamProps[];
  brand?: BrandProps;
}

export interface MessageProps {
  user: UserProps;
  navMain: NavMainItem[];
  navDropdown: NavMainItem[];
  navSignal: NavMainItem[];
  navMessage: NavMessage[];
  brand?: BrandProps;
}

export interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
  data: SidebarProps;
  auth: AuthSidebarProps;
}

export interface MessSidebarProps extends ComponentProps<typeof Sidebar> {
  data: MessageProps;
  auth: AuthSidebarProps;
}

export interface AppSidebarUserProps {
  user: UserProps;
  nav: NavDropdown;
  auth: AuthSidebarProps;
  type?: "sidebar" | "navbar";
  size?: "icon" | "sm" | "md" | "lg";
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export interface NavCoreProps extends ComponentProps<typeof SidebarGroup> {
  items: NavMainItem[];
}

export interface TeamSwitcherProps {
  teams: TeamProps[];
}
