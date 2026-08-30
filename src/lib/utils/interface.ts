import React, {
  ComponentProps,
  ComponentType,
  ElementType,
  ReactNode,
} from "react";
import {
  Column,
  ColumnDef,
  ReactTable,
  RowData,
  RowModel,
  Table,
  TableFeature,
  TableFeatures,
  TableOptions,
} from "@tanstack/react-table";
import { LucideIcon } from "lucide-react";
import { Sidebar, SidebarGroup } from "@/components/custom/sidebar";

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
  title: string;
  url: string;
  description?: string;
}

export interface NavDropdown {
  main: NavMainItem[];
  secondary: NavMainItem[];
  navigation?: NavMainItem[];
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
  user: UserProps;
  nav: NavDropdown;
  auth: AuthSidebarProps;
  type?: "sidebar" | "navbar";
  size?: "icon" | "sm" | "md" | "lg";
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
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
  // navSecondary: NavMainItem[]
  navDropdown: NavMainItem[];
  navSignal: NavMainItem[];
  // projects: ProjectProps[]
  // teams?: TeamProps[]
  navMessage: NavMessage[];
  brand?: BrandProps;
}

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: SidebarProps;
  auth: AuthSidebarProps;
}

export interface MessSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: MessageProps;
  auth: AuthSidebarProps;
}

// export interface NavCoreProps extends React.ComponentPropsWithoutRef<typeof SidebarGroup>
export interface NavCoreProps extends ComponentProps<typeof SidebarGroup> {
  items: NavMainItem[];
}

export interface AuthSidebarProps {
  loading: boolean;
  authenticated: boolean;
  // refresh: () => Promise<AuthUser | null>
  login: (returnTo?: string) => void;
  register: (returnTo?: string) => void;
  logout: (returnTo?: string) => Promise<void>;
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
  user: UserProps;
  // user: AppSidebarUser;
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
  logo: string | undefined; // ?
  plan?: string | undefined;
}

export interface TeamSwitcherProps {
  teams: TeamProps[];
}

export interface HeaderProps {
  top?: ReactNode;
  bottom?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  user: UserProps;
  auth: AuthSidebarProps;
  nav: NavDropdown;
  mode?: "navbar" | "dashboard"
}

export interface FooterProps {
  top?: ReactNode
  middle?: ReactNode
  bottom?: ReactNode
  nav: NavDropdown
  mode?: "navbar" | "dashboard"
}

// ============================================================================
// SIDEBAR INTERFACES
// ============================================================================

export interface StatsBoxProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: string;
  stats: string | number;
}

export interface BadgeIconProps {
  color?: string;
  icon: LucideIcon;
}

// ============================================================================
// DATATABLES INTERFACES
// ============================================================================

export interface DataTableFeatures {
  columnFilteringFeature: TableFeature;
  rowSortingFeature: TableFeature;
  rowPaginationFeature: TableFeature;
  rowSelectionFeature: TableFeature;
  columnVisibilityFeature: TableFeature;
  columnSizingFeature: TableFeature;
  columnResizingFeature: TableFeature;
  columnFacetingFeature: TableFeature;
  filteredRowModel: (table: Table<any, any>) => () => RowModel<any, any>;
  sortedRowModel: (table: Table<any, any>) => () => RowModel<any, any>;
  paginatedRowModel: (table: Table<any, any>) => () => RowModel<any, any>;
  facetedRowModel: (
    table: Table<any, any>,
    columnId: string,
  ) => () => RowModel<any, any>;
  facetedUniqueValues: (
    table: Table<TableFeatures, any>,
    columnId: string,
  ) => () => Map<any, number>;
}

export interface DataTableFilterOption {
  label: string;
  value: string | number | boolean;
  icon?: ComponentType<{ className?: string }>;
}

export interface DataTableFilter {
  column: string;
  title?: string;
  options: DataTableFilterOption[];
}

export interface DataTableSearch {
  column: string;
  placeholder: string;
}

export interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData, any>[];
  data: TData[];
  search?: DataTableSearch;
  filters?: DataTableFilter[];
  /** @deprecated Use `filters` instead. */
  filter?: DataTableFilter[];
  fluidColumn?: string;
  /** @deprecated Use `fluidColumn` instead. */
  max?: string;
  initialPageSize?: number;
  pageSizeOptions?: number[];
  getRowId?: TableOptions<DataTableFeatures, TData>["getRowId"];
  enableRowSelection?: TableOptions<
    DataTableFeatures,
    TData
  >["enableRowSelection"];
  emptyMessage?: ReactNode;
  onRowClick?: (row: TData) => void;
  onReload?: () => void;
  onDownload?: () => void;
  onCreate?: () => void;
  render?: ReactNode;
}

export interface DataTableColumnHeaderProps<
  TData extends RowData,
  TValue = unknown,
> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<DataTableFeatures, TData, TValue>;
  title: string;
}

export interface DataTableSortButtonProps<
  TData extends RowData,
  TValue = unknown,
> extends DataTableColumnHeaderProps<TData, TValue> { }

export interface DataTablePaginationProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>;
}

export interface DataTableViewOptionsProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>;
}

export interface DataTableFacetedFilterProps<
  TData extends RowData,
  TValue = unknown,
> {
  column?: Column<DataTableFeatures, TData, TValue>;
  title?: string;
  options: DataTableFilterOption[];
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
