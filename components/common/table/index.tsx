"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationDeck } from "../pagenation";

interface DataTableProps<TData, TValue> {
  isPageNationOn?: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  pageSize?: number;
  pageIndex?: number;
  pathname?: string;

  noDataText?: string;
}

export function DataTable<TData, TValue>({
  isPageNationOn = true,
  columns,
  data,

  pageSize,
  pageIndex,
  pathname,

  noDataText = "No results.",
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    columns,
    data,
    columnResizeMode: "onEnd",
    getCoreRowModel: getCoreRowModel(),
  });

  const pageNationOn = isPageNationOn && pageSize && pageIndex && pathname;

  return (
    <div>
      <Table className="overflow-hidden rounded-lg">
        <TableHeader className="h-14">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table?.getRowModel()?.rows?.length ? (
            table?.getRowModel()?.rows?.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {noDataText}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {pageNationOn && (
        <PaginationDeck
          data={data}
          pageIndex={pageIndex}
          pageSize={pageSize}
          pathname={pathname}
        />
      )}
    </div>
  );
}
