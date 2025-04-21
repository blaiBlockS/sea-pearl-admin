"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PagenationDeckProps {
  data: unknown[];
  pageIndex: number;
  pathname: string;
  pageSize: number;

  customPageData?: {
    customPageIndexKey: string;
    customPageSizeKey: string;
  };
}

export function PaginationDeck({
  data,

  pageIndex,
  pageSize,
  pathname,

  customPageData,
}: PagenationDeckProps) {
  console.log(pageIndex, "pageIndex");

  const isFirstPage = pageIndex === 1;
  const isLastPage = data.length < pageSize;

  const isEmpty = data.length === 0;

  const prevClass = cn(isFirstPage && "opacity-20", isEmpty && "opacity-20");
  const nextClass = cn(isLastPage && "opacity-20", isEmpty && "opacity-20");

  const customPageIndexKey = customPageData?.customPageIndexKey;
  const customPageSizeKey = customPageData?.customPageSizeKey;

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {/* Previous 버튼 */}
        <PaginationItem className={prevClass}>
          <PaginationPrevious
            href={
              isFirstPage
                ? ""
                : `${pathname}?${customPageIndexKey || "page"}=${pageIndex - 1}&${customPageSizeKey || "size"}=${pageSize}`
            }
          />
        </PaginationItem>

        {/* 1, 2, 3, 인덱스... */}
        {
          <PaginationItem>
            <PaginationLink href={`#`}>{pageIndex}</PaginationLink>
          </PaginationItem>
        }

        {/* Next 버튼 */}
        <PaginationItem className={nextClass}>
          <PaginationNext
            href={
              isLastPage
                ? ""
                : `${pathname}?${customPageIndexKey || "page"}=${pageIndex + 1}&${customPageSizeKey || "size"}=${pageSize}`
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
