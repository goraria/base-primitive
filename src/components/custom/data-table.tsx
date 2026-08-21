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
} from "@/components/ui/command";
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
      // Lần 1: No sort → Asc
      column.toggleSorting(false);
    } else if (currentSort === "asc") {
      // Lần 2: Asc → Desc
      column.toggleSorting(true);
    } else {
      // Lần 3: Desc → Clear sort
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
          Mặc định
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <ArrowUp />
          Tăng dần
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <ArrowDown />
          Giảm dần
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
          <EyeOff />
          Ẩn
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    // </div>
  );
}

export function DataTablePaginationOld<TData extends RowData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      {" "}
      {/** px-2 */}
      <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} trong{" "}
        {table.getFilteredRowModel().rows.length} hàng được chọn.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Số hàng mỗi trang</p>
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
          Trang {table.state.pagination.pageIndex + 1} trong{" "}
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
            <span className="sr-only">Đi đến trang đầu</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Đi đến trang trước</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Đi đến trang tiếp theo</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Đi đến trang cuối</span>
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

  // Logic để tạo các page numbers hiển thị
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Nếu tổng số trang <= 7, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logic phức tạp hơn cho nhiều trang
      if (currentPage <= 4) {
        // Hiển thị: 1 2 3 4 5 ... 10
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Hiển thị: 1 ... 6 7 8 9 10
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Hiển thị: 1 ... 4 5 6 ... 10
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
      <div className="flex text-muted-foreground text-sm space-x-2">
        {/** flex-1 */}
        <div>
          Hiển thị{" "}
          {currentPage === 1
            ? 1
            : (currentPage - 1) * table.state.pagination.pageSize + 1}{" "}
          đến{" "}
          {Math.min(
            currentPage * table.state.pagination.pageSize,
            table.getFilteredRowModel().rows.length,
          )}{" "}
          trong {table.getFilteredRowModel().rows.length} mục
        </div>
        <div>
          {table.getFilteredSelectedRowModel().rows.length} trong{" "}
          {table.getFilteredRowModel().rows.length} hàng được chọn.
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
            className="ml-auto hidden lg:flex" // h-8
          />
        }
      >
        <Settings2 />
        {/*Cài đặt hiển thị*/}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Ẩn/Hiện cột</DropdownMenuLabel>
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
            className="h-9 border-dashed"
          />
        }
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        {title}
        {selectedValues?.size > 0 && (
          <>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Badge
              variant="secondary"
              className="rounded-sm px-1 font-normal lg:hidden"
            >
              {selectedValues.size}
            </Badge>
            <div className="hidden space-x-1 lg:flex">
              {selectedValues.size > 2 ? (
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {selectedValues.size} selected
                </Badge>
              ) : (
                options
                  .filter((option) => selectedValues.has(option.value))
                  .map((option) => (
                    <Badge
                      variant="secondary"
                      key={String(option.value)}
                      className="rounded-sm px-1 font-normal"
                    >
                      {option.label}
                    </Badge>
                  ))
              )}
            </div>
          </>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={String(option.value)}
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
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
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
                  >
                    Xóa bộ lọc
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
        <div className="flex items-center space-x-2">
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
              onClick={() => table.resetColumnFilters()}
              className="h-9 w-9 px-2 lg:px-3"
            >
              Reset
              <X />
            </Button>
          )}
          {/*<Button variant="secondary" className="">*/}
          {/*  Xoá lọc*/}
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
//         aria-label="Chọn tất cả"
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
//     size: 50, // Width cho checkbox column
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
//     size: 300, // Width cho Profile column
//   },
//   {
//     accessorKey: "user",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="User" />
//     ),
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id));
//     },
//     size: 200, // Width cho User column
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
//     size: 120, // Width cho Status column
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
//   //   size: 120, // Width cho Amount column
//   // },
//   {
//     id: "actions",
//     // accessorKey: "actions",
//     // header: () => <div className="text-right">Actions</div>,
//     enableResizing: false,
//     size: 50, // Width cho Actions column
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
//             <span className="sr-only">Mở menu</span>
//             <MoreHorizontal />
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(payment.id)}
//             >
//               Sao chép ID thanh toán
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Xem khách hàng</DropdownMenuItem>
//             <DropdownMenuItem>Xem chi tiết thanh toán</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Sửa</DropdownMenuItem>
//             <DropdownMenuItem>Tạo bản sao</DropdownMenuItem>
//             <DropdownMenuItem>Yêu thích</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuSub>
//               <DropdownMenuSubTrigger>Trạng thái</DropdownMenuSubTrigger>
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
//             <DropdownMenuItem variant="destructive">Xóa</DropdownMenuItem>
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
