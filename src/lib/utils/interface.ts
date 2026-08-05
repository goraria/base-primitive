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
// TANSTACK QUERY
// ============================================================================

// export type CallerMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

// export type CallerToastConfig =
//   | boolean
//   | {
//       loading?: string
//       success?: string
//       error?: string
//     }

// export interface CallerOptions<TData = unknown> {
//   url: string
//   method?: CallerMethod
//   data?: TData
//   params?: Record<string, unknown>
//   headers?: Record<string, string>
//   timeout?: number
//   toast?: CallerToastConfig
//   withCredentials?: boolean
// }

// export interface CallerExtraOptions {
//   auth?: boolean
//   baseURL?: string | null
//   unwrapData?: boolean
// }

// export type CallerConfig<TData = unknown> = CallerOptions<TData> & CallerExtraOptions

// export type CallerRequestOptions<TData = unknown> = Omit<
//   CallerOptions<TData>,
//   "method" | "url"
// >

// export type CallerRequestConfig<TData = unknown> =
//   CallerRequestOptions<TData> & CallerExtraOptions

// export interface ApiErrorPayload {
//   message?: unknown
//   error?: unknown
//   errors?: unknown
// }

// export interface EndpointFetchArgs {
//   url: string
//   baseUrl?: string | null
//   method?: CallerMethod
//   body?: unknown
//   data?: unknown
//   params?: Record<string, unknown>
//   headers?: HeadersInit
//   timeout?: number
// }

// export interface EndpointFetchBaseQueryError {
//   status: number | "FETCH_ERROR"
//   data?: unknown
//   error?: string
// }

// export interface EndpointQueryMeta {
//   response?: {
//     status: number
//   }
// }

// export interface EndpointQueryReturnValue<TResult, TError> {
//   data?: TResult
//   error?: TError
//   meta?: EndpointQueryMeta
// }

// export interface EndpointBaseQueryApi {
//   signal?: AbortSignal
// }

// export interface EndpointBaseQueryExtraOptions {
//   endpointType?: "query" | "mutation"
// }

// export type EndpointBaseQueryFn<TArgs, TResult, TError> = (
//   args: TArgs,
//   api: EndpointBaseQueryApi,
//   extraOptions?: EndpointBaseQueryExtraOptions
// ) => Promise<EndpointQueryReturnValue<TResult, TError>>

// export type EndpointQueryArg<TArg> = {
//   bivarianceHack: (arg: TArg) => string | EndpointFetchArgs
// }["bivarianceHack"]

// export type EndpointQueryFn<TResult, TArg> = (
//   arg: TArg,
//   api: EndpointBaseQueryApi,
//   extraOptions: EndpointBaseQueryExtraOptions | undefined,
//   baseQuery: EndpointBaseQueryFn<
//     string | EndpointFetchArgs,
//     unknown,
//     EndpointFetchBaseQueryError
//   >
// ) => Promise<EndpointQueryReturnValue<TResult, EndpointFetchBaseQueryError>>

// export interface EndpointDefinition<
//   TResult = unknown,
//   TArg = unknown,
//   TType extends "query" | "mutation" = "query",
// > {
//   type: TType
//   query?: EndpointQueryArg<TArg>
//   queryFn?: EndpointQueryFn<TResult, TArg>
//   transformResponse?: (raw: unknown) => TResult
//   transformErrorResponse?: (raw: unknown) => unknown
//   providesTags?: unknown
//   invalidatesTags?: unknown
// }

// export type EndpointFunctions<TEndpoints extends Record<string, unknown>> = {
//   [K in keyof TEndpoints]: TEndpoints[K] extends EndpointDefinition<
//     infer TResult,
//     infer TArg,
//     "query" | "mutation"
//   >
//     ? undefined extends TArg
//       ? (
//           arg?: TArg,
//           api?: EndpointBaseQueryApi
//         ) => Promise<
//           EndpointQueryReturnValue<TResult, EndpointFetchBaseQueryError>
//         >
//       : (
//           arg: TArg,
//           api?: EndpointBaseQueryApi
//         ) => Promise<
//           EndpointQueryReturnValue<TResult, EndpointFetchBaseQueryError>
//         >
//     : never
// }

// export interface EndpointHookOptions {
//   skip?: boolean
// }

// export interface EndpointHookResult<TResult, TArg> {
//   data: TResult | null
//   error: EndpointFetchBaseQueryError | null
//   loading: boolean
//   result: EndpointQueryReturnValue<TResult, EndpointFetchBaseQueryError> | null
//   meta?: EndpointQueryMeta
//   refresh: (
//     arg?: TArg
//   ) => Promise<EndpointQueryReturnValue<TResult, EndpointFetchBaseQueryError>>
// }

// export type EndpointHookFunctions<TEndpoints extends Record<string, unknown>> = {
//   [K in keyof TEndpoints]: TEndpoints[K] extends EndpointDefinition<
//     infer TResult,
//     infer TArg,
//     "query" | "mutation"
//   >
//     ? undefined extends TArg
//       ? (
//           arg?: TArg,
//           options?: EndpointHookOptions
//         ) => EndpointHookResult<TResult, TArg>
//       : (
//           arg: TArg,
//           options?: EndpointHookOptions
//         ) => EndpointHookResult<TResult, TArg>
//     : never
// }

// export interface EndpointBuilder {
//   query<TResult, TArg>(
//     definition: Omit<EndpointDefinition<TResult, TArg, "query">, "type">
//   ): EndpointDefinition<TResult, TArg, "query">
//   mutation<TResult, TArg>(
//     definition: Omit<EndpointDefinition<TResult, TArg, "mutation">, "type">
//   ): EndpointDefinition<TResult, TArg, "mutation">
// }

// export interface CreateEndpointConfig<TEndpoints extends Record<string, unknown>> {
//   baseQuery: EndpointBaseQueryFn<
//     string | EndpointFetchArgs,
//     unknown,
//     EndpointFetchBaseQueryError
//   >
//   reducerPath?: string
//   tagTypes?: string[]
//   endpoints: (builder: EndpointBuilder) => TEndpoints
// }

// export interface EndpointFetchBaseQueryConfig {
//   baseUrl?: string
//   prepareHeaders?: (headers: Headers) => Promise<Headers> | Headers
// }

// export interface EndpointApiResponseEnvelope<TData = unknown> {
//   data?: TData
//   message?: string
// }

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