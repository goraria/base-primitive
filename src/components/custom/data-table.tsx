"use client";

import React from "react";
import {
  type RowData,
  columnFacetingFeature,
  columnFilteringFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  flexRender,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/custom/dropdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/custom/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/custom/button";
import { Badge } from "@/components/custom/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import {
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Settings2,
  Check,
  RotateCw,
  PlusCircle,
  Ellipsis,
  Download,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  DataTableColumnHeaderProps,
  DataTableFacetedFilterProps,
  DataTableFeatures,
  DataTablePaginationProps,
  DataTableProps,
  DataTableSortButtonProps,
  DataTableViewOptionsProps,
} from "@/lib/utils/interface";

export const dataTableFeatures: DataTableFeatures = tableFeatures({
  columnFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  columnVisibilityFeature,
  columnSizingFeature,
  columnResizingFeature,
  columnFacetingFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
});

export function DataTableSortButton<TData extends RowData, TValue>({
  column,
  title,
  className,
}: DataTableSortButtonProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const handleSort = () => {
    const currentSort = column.getIsSorted();

    if (currentSort === false) {
      // First click: no sort → ascending
      column.toggleSorting(false);
    } else if (currentSort === "asc") {
      // Second click: ascending → descending
      column.toggleSorting(true);
    } else {
      // Third click: descending → clear sorting
      column.clearSorting();
    }
  };

  return (
    <Button variant="ghost" onClick={handleSort}>
      <span>{title}</span>
      {column.getIsSorted() === "desc" ? (
        <ArrowDown />
      ) : column.getIsSorted() === "asc" ? (
        <ArrowUp />
      ) : (
        <ArrowUpDown />
      )}
    </Button>
  );
}

export function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }
  return (
    // <div className={cn("flex items-center gap-2", className)}>
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            // size="sm"
            className="data-open:bg-accent" // -ml-3
          />
        }
      >
        <span>{title}</span>
        {column.getIsSorted() === "desc" ? (
          <ArrowDown />
        ) : column.getIsSorted() === "asc" ? (
          <ArrowUp />
        ) : (
          <ChevronsUpDown />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => column.clearSorting()}>
          <ChevronsUpDown />
          Default
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <ArrowUp />
          Ascending
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <ArrowDown />
          Descending
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
          <EyeOff />
          Hide
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    // </div>
  );
}

export function DataTablePaginationOld<TData extends RowData>({
  table,
}: DataTablePaginationProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows.length;
  const totalRows = table.getFilteredRowModel().rows.length;

  return (
    <div className="flex items-center justify-between">
      {" "}
      {/** px-2 */}
      <div className="text-muted-foreground flex-1 text-sm">
        <span className="font-bold text-primary">{selectedRows}</span> of{" "}
        <span className="font-bold text-primary">{totalRows}</span> rows selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.state.pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.state.pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[7, 10, 25, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.state.pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function DataTablePagination<TData extends RowData>({
  table,
}: DataTablePaginationProps<TData>) {
  const currentPage = table.state.pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const pageSize = table.state.pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;
  const selectedRows = table.getFilteredSelectedRowModel().rows.length;
  const firstVisibleRow = totalRows === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastVisibleRow = Math.min(currentPage * pageSize, totalRows);

  // Build the list of visible page numbers.
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show every page when the total is small.
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Collapse larger ranges with ellipses.
      if (currentPage <= 4) {
        // Display: 1 2 3 4 5 ... 10
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Display: 1 ... 6 7 8 9 10
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Display: 1 ... 4 5 6 ... 10
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 text-sm text-muted-foreground">
        {/** flex-1 */}
        <div>
          Showing <span className="font-bold text-primary">{firstVisibleRow}</span> to{" "}
          <span className="font-bold text-primary">{lastVisibleRow}</span> of{" "}
          <span className="font-bold text-primary">{totalRows}</span> items.
        </div>
        <div>
          <span className="font-bold text-primary">{selectedRows}</span> of{" "}
          <span className="font-bold text-primary">{totalRows}</span> rows selected.
        </div>
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        {/* Pagination Numbers */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className=""
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>

          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <Button
                  variant="outline"
                  size="icon"
                  className=""
                  // onClick={() => {}}
                  // disabled
                >
                  {/* <span className="px-2 text-sm text-muted-foreground">...</span> */}
                  <Ellipsis />
                </Button>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  className=""
                  onClick={() => table.setPageIndex((page as number) - 1)}
                >
                  <span className="">{page}</span>
                </Button>
              )}
            </React.Fragment>
          ))}

          <Button
            variant="outline"
            size="icon"
            className=""
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function DataTableViewOptions<TData extends RowData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="mr-2 hidden lg:flex"
            aria-label="Toggle columns"
            title="Toggle columns"
          />
        }
      >
        <Settings2 />
        <span className="sr-only">Toggle columns</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide(),
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DataTableFacetedFilter<TData extends RowData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(
    column?.getFilterValue() as (string | number | boolean)[],
  );

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size="default"
            className="h-9 w-auto gap-1 rounded-md border-dashed p-1 whitespace-nowrap"
          />
        }
      >
        <PlusCircle />
        {title}
        {selectedValues?.size > 0 && (
          <>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Badge
              variant="default"
              className="rounded-md px-1 font-normal lg:hidden"
            >
              {selectedValues.size}
            </Badge>
            <div className="hidden gap-1 lg:flex">
              {selectedValues.size > 2 ? (
                <Badge
                  variant="default"
                  className="rounded-md px-1 font-normal"
                >
                  {selectedValues.size} selected
                </Badge>
              ) : (
                options
                  .filter((option) => selectedValues.has(option.value))
                  .map((option) => (
                    <Badge
                      variant="default"
                      key={String(option.value)}
                      className="rounded-md px-1 font-normal"
                    >
                      {option.label}
                    </Badge>
                  ))
              )}
            </div>
          </>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto min-w-52 p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={String(option.value)}
                    showCheck={false}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined,
                      );
                    }}
                  >
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                    showCheck={false}
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  search,
  filters,
  filter,
  fluidColumn,
  max,
  initialPageSize = 10,
  pageSizeOptions = [7, 10, 25, 50, 100],
  getRowId,
  enableRowSelection = true,
  emptyMessage = "No data available.",
  onRowClick,
  onReload,
  onDownload,
  onCreate,
  render,
}: DataTableProps<TData>) {
  const activeFilters = filters ?? filter;
  const flexibleColumn = fluidColumn ?? max;

  const table = useTable({
    features: dataTableFeatures,
    data,
    columns,
    getRowId,
    enableRowSelection,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: initialPageSize,
      },
    },
  });

  const isFiltered = table.state.columnFilters.length > 0;

  return (
    <Card className="p-0">
      <CardHeader className="flex items-center justify-between pt-6">
        <div className="flex items-center gap-1">
          {search && (
            <Input
              placeholder={search.placeholder}
              value={
                (table.getColumn(search.column)?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn(search.column)
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          )}
          {activeFilters?.map((f) => (
            <DataTableFacetedFilter
              key={f.column}
              column={table.getColumn(f.column)}
              title={f.title}
              options={f.options}
            />
          ))}
          {isFiltered && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => table.resetColumnFilters()}
              aria-label="Reset filters"
              title="Reset filters"
            >
              <X />
              <span className="sr-only">Reset filters</span>
            </Button>
          )}
          {/*<Button variant="secondary" className="">*/}
          {/* Clear filters */}
          {/*</Button>*/}
        </div>
        {/* <div className="flex items-center space-x-2">
         <p className="text-sm font-medium">Rows per page</p>
         </div> */}
        <div className="flex items-center space-x-2">
          <Select
            value={`${table.state.pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder={table.state.pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="bottom">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DataTableViewOptions table={table} />
          {onDownload && (
            <Button
              variant="outline"
              size="icon"
              className=""
              onClick={onDownload}
            >
              <Download />
            </Button>
          )}
          {onReload && (
            <Button
              variant="outline"
              size="icon"
              className=""
              onClick={onReload}
            >
              <RotateCw />
            </Button>
          )}
          {onCreate && (
            <Button
              variant="default"
              size="icon"
              className=""
              onClick={onCreate}
            >
              <PlusCircle />
            </Button>
          )}
          {render}
        </div>
      </CardHeader>
      <div className="border-y">
        <Table className="w-full table-fixed">
          <TableHeader className="h-12">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  const isColumn = header.column.id === flexibleColumn;

                  return (
                    <TableHead
                      key={`${header.id}-${index}`}
                      style={{
                        width: isColumn ? "auto" : `${header.getSize()}px`,
                        minWidth: isColumn ? "200px" : undefined,
                      }}
                      className={cn("h-14", isColumn ? "w-auto" : "")}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell, index) => {
                    const isColumn = cell.column.id === flexibleColumn;

                    return (
                      <TableCell
                        key={`${cell.id}-${index}`}
                        style={{
                          width: isColumn
                            ? "auto"
                            : `${cell.column.getSize()}px`,
                          minWidth: isColumn ? "200px" : undefined,
                        }}
                        className={cn("h-16", isColumn ? "w-auto" : "")}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <CardFooter className="block pb-6">
        <DataTablePagination table={table} />
        {/* <DataTablePagination table={table} /> */}
      </CardFooter>
    </Card>
  );
}

// export const columns: ColumnDef<DataTableFeatures, Payment>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//     // enableResizing: false,
//     size: 50, // Checkbox column width
//   },
//   {
//     accessorKey: "pro",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Profile" />
//     ),
//     cell: ({ row }) => {
//       const user = row.original;
//       return (
//         <div className="flex items-center gap-3">
//           <div className="flex-shrink-0">
//             {user.avatar ? (
//               <Image
//                 className="h-9 w-9 rounded-md object-cover"
//                 src={user.avatar}
//                 alt="avatar"
//                 width={36}
//                 height={36}
//               />
//             ) : (
//               <div className="h-9 w-9 rounded-md bg-accent flex items-center justify-center">
//                 <span className="text-sm font-medium text-primary">
//                   {user.firstname?.[0] ?? "J"}
//                   {user.lastname?.[0] ?? "G"}
//                 </span>
//               </div>
//             )}
//           </div>
//           <div className="min-w-0 flex-1">
//             <div className="truncate lowercase">{user.email}</div>
//             <div className="truncate text-xs text-muted-foreground">
//               {user.username ?? "japtor"} | {user.phone_number || "No phone"}
//             </div>
//           </div>
//         </div>
//       );
//     },
//     size: 300, // Profile column width
//   },
//   {
//     accessorKey: "user",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="User" />
//     ),
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id));
//     },
//     size: 200, // User column width
//   },
//   {
//     accessorKey: "email",
//     // header: "Email",
//     header: ({ column }) => (
//       <DataTableSortButton column={column} title="Email" />
//     ),
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id));
//     },
//     size: 120, // Status column width
//   },
//   // {
//   //   accessorKey: "amount",
//   //   // header: "Amount",
//   //   header: () => <div className="text-right">Amount</div>,
//   //   cell: ({ row }) => {
//   //     // const amount = parseFloat(row.getValue("amount"))
//   //     // const formatted = new Intl.NumberFormat("vi-VN", {
//   //     //   style: "currency",
//   //     //   currency: "VND",
//   //     // }).format(amount)
//   //     const formatted = formatCurrency({
//   //       value: row.getValue("amount"),
//   //       currency: "VND"
//   //     })
//   //
//   //     return <div className="text-right font-medium">{formatted}</div>
//   //   },
//   //   size: 120, // Amount column width
//   // },
//   {
//     id: "actions",
//     // accessorKey: "actions",
//     // header: () => <div className="text-right">Actions</div>,
//     enableResizing: false,
//     size: 50, // Actions column width
//     cell: ({ row }) => {
//       const payment = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger
//             render={
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="p-0" // h-8 w-8
//               />
//             }
//           >
//             <span className="sr-only">Open menu</span>
//             <MoreHorizontal />
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(payment.id)}
//             >
//               Copy payment ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View payment details</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Edit</DropdownMenuItem>
//             <DropdownMenuItem>Duplicate</DropdownMenuItem>
//             <DropdownMenuItem>Favorite</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuSub>
//               <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
//               <DropdownMenuPortal>
//                 <DropdownMenuSubContent>
//                   <DropdownMenuItem>Pending</DropdownMenuItem>
//                   <DropdownMenuItem>Confirmed</DropdownMenuItem>
//                   <DropdownMenuItem>Preparing</DropdownMenuItem>
//                   <DropdownMenuItem>Ready</DropdownMenuItem>
//                   <DropdownMenuItem>Served</DropdownMenuItem>
//                   <DropdownMenuItem>Completed</DropdownMenuItem>
//                   <DropdownMenuItem>Cancelled</DropdownMenuItem>
//                 </DropdownMenuSubContent>
//               </DropdownMenuPortal>
//             </DropdownMenuSub>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

// export const statuses = [
//   {
//     value: "pending",
//     label: "Pending",
//     icon: HelpCircle,
//   },
//   {
//     value: "processing",
//     label: "Processing",
//     icon: Timer,
//   },
//   {
//     value: "success",
//     label: "Success",
//     icon: CheckCircle,
//   },
//   {
//     value: "failed",
//     label: "Failed",
//     icon: CircleOff,
//   },
// ];

// export const priorities = [
//   {
//     label: "Low",
//     value: "low",
//     icon: ArrowDown,
//   },
//   {
//     label: "Medium",
//     value: "medium",
//     icon: ArrowRight,
//   },
//   {
//     label: "High",
//     value: "high",
//     icon: ArrowUp,
//   },
// ];

// export type Payment = {
//   id: string;
//   amount: number;
//   user: string;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
//   avatar?: string;
//   firstname?: string;
//   lastname?: string;
//   username?: string;
//   phone_number?: string;
// };
