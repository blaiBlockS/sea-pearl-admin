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
import usePageData from "@/hook/usePageData";
import { PaginationDeck } from "../pagenation";
// import { Suspense } from "react";

interface DataTableProps<TData, TValue> {
  isPageNationOn?: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  pageSize?: number;
  pageIndex?: number;
  pathname?: string;
}

export function DataTable<TData, TValue>({
  isPageNationOn = true,
  columns,
  data,

  pageSize,
  pageIndex,
  pathname,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    columns,
    data,
    columnResizeMode: "onEnd",
    getCoreRowModel: getCoreRowModel(),
  });

  if (typeof data === "undefined") {
    return <></>;
  }

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
                No results.
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
