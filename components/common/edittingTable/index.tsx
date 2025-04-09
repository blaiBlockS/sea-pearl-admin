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
import { LucidePlus } from "lucide-react";
import Button from "../button";
import { useEffect, useState } from "react";
import { CreateRouletteRewardFormData } from "@/schemas/roulette.schema";
import { UseFormWatch } from "react-hook-form";

interface DataTableProps<TData, TValue> {
  onAppend: () => void;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sumView?: Record<string, number | string>[];
  watch: UseFormWatch<CreateRouletteRewardFormData>;
}

export function EdittingTable<TData, TValue>({
  onAppend,
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    columns,
    data,
    columnResizeMode: "onEnd",
    getCoreRowModel: getCoreRowModel(),
  });

  /**
   * @총합_계산
   */

  const [totalChances, setTotalChances] = useState(0);
  useEffect(() => {}, []);

  return (
    <div>
      <Table className="overflow-hidden rounded-lg">
        {/* TABLE_HEADER */}
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

        {/* TABLE_BODY */}
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
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-10 text-center bg-background-secondary"
            >
              <div className="flex justify-between w-full ">
                <Button
                  className="flex items-center gap-4 rounded hover:bg-background-teritary py-1 px-2"
                  onClick={onAppend}
                >
                  <LucidePlus size={18} />
                  <span>행 추가하기</span>
                </Button>
                {
                  <div className="flex pr-12 gap-6">
                    <div className="flex gap-2">
                      <span className="text-text-secondary">총 당첨확률:</span>
                      <span className="">{`${totalChances}`}</span>
                    </div>
                  </div>
                }
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
