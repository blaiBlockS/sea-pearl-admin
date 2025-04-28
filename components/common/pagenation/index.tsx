"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PagenationDeckProps {
  currentPage: number;
  totalPages: number;
  keyword?: string;
  size?: number;

  currentPageKeyAlias?: string;
  totalPageKeyAlias?: string;
}

export function PagenationDeck({
  currentPage,
  totalPages,
  keyword,
  size = 10,

  currentPageKeyAlias,
  totalPageKeyAlias,
}: PagenationDeckProps) {
  /**
   * @페이지_갯수_로직
   */
  const arr = [];
  const RANGE = 10;
  for (let i = 1, j = -(RANGE / 2); i <= RANGE; i++, j++) {
    const temp = currentPage + j;

    // 페이지네이션 버튼이 1보다 작거나 최대치보다 높을 수 없도록 예외처리
    if (temp < 1 || temp > totalPages) continue;

    arr.push(temp);
  }

  /**
   * @활성화_비활성화_로직
   */
  const isEmpty = arr.length === 0;

  const isPrevElipsisOff = arr[0] === 1;
  const isNextElipsisOff = arr[arr.length - 1] === totalPages;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const prevClass = cn(isFirstPage && "opacity-20", isEmpty && "opacity-20");
  const nextClass = cn(isLastPage && "opacity-20", isEmpty && "opacity-20");

  // 키워드 패러미터가 있을 시
  let processedKeyword = keyword;
  if (keyword === undefined || keyword === null) {
    processedKeyword = "";
  }

  let currentPagekey = "page";
  if (currentPageKeyAlias) {
    currentPagekey = currentPageKeyAlias;
  }

  let totalPagekey = "size";
  if (totalPageKeyAlias) {
    totalPagekey = totalPageKeyAlias;
  }

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {/* 맨 뒤로가기 꺾쇠 */}
        <PaginationItem className={prevClass}>
          <PaginationPrevious
            href={{
              query: {
                [currentPagekey]: 1,
                [totalPagekey]: size,
                keyword: processedKeyword,
              },
            }}
          />
        </PaginationItem>
        {/* 좌측 ...꺽쇠 */}
        {!isPrevElipsisOff && !isEmpty && (
          <PaginationItem>
            <PaginationLink
              href={{
                query: {
                  [currentPagekey]: currentPage - RANGE / 2,
                  [totalPagekey]: size,
                  keyword: processedKeyword,
                },
              }}
            >
              <PaginationEllipsis />
            </PaginationLink>
          </PaginationItem>
        )}

        {/* items */}
        {arr.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink
              href={{
                query: {
                  [currentPagekey]: item,
                  [totalPagekey]: size,
                  keyword: processedKeyword,
                },
              }}
              isActive={item === currentPage}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* 우측 ...꺽쇠 */}
        {!isNextElipsisOff && !isEmpty && (
          <PaginationItem>
            <PaginationLink
              href={{
                query: {
                  [currentPagekey]: currentPage + RANGE / 2,
                  [totalPagekey]: size,
                  keyword: processedKeyword,
                },
              }}
            >
              <PaginationEllipsis />
            </PaginationLink>
          </PaginationItem>
        )}

        {/* 맨 뒤로가기 꺽쇠 */}
        <PaginationItem className={nextClass}>
          <PaginationNext
            href={{
              query: {
                [currentPagekey]: totalPages,
                [totalPagekey]: size,
                keyword: processedKeyword,
              },
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

// "use client";

// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { cn } from "@/lib/utils";

// interface PagenationDeckProps {
//   data: unknown[];
//   pageIndex: number;
//   pathname: string;
//   pageSize: number;

//   customPageData?: {
//     customPageIndexKey: string;
//     customPageSizeKey: string;
//   };
// }

// export function PaginationDeck({
//   data,

//   pageIndex,
//   pageSize,
//   pathname,

//   customPageData,
// }: PagenationDeckProps) {
//   console.log(pageIndex, "pageIndex");

//   const isFirstPage = pageIndex === 1;
//   const isLastPage = data.length < pageSize;

//   const isEmpty = data.length === 0;

//   const prevClass = cn(isFirstPage && "opacity-20", isEmpty && "opacity-20");
//   const nextClass = cn(isLastPage && "opacity-20", isEmpty && "opacity-20");

//   const customPageIndexKey = customPageData?.customPageIndexKey;
//   const customPageSizeKey = customPageData?.customPageSizeKey;

//   return (
//     <Pagination className="mt-4">
//       <PaginationContent>
//         {/* Previous 버튼 */}
//         <PaginationItem className={prevClass}>
//           <PaginationPrevious
//             href={
//               isFirstPage
//                 ? ""
//                 : `${pathname}?${customPageIndexKey || "page"}=${pageIndex - 1}&${customPageSizeKey || "size"}=${pageSize}`
//             }
//           />
//         </PaginationItem>

//         {/* 1, 2, 3, 인덱스... */}
//         {
//           <PaginationItem>
//             <PaginationLink href={`#`}>{pageIndex}</PaginationLink>
//           </PaginationItem>
//         }

//         {/* Next 버튼 */}
//         <PaginationItem className={nextClass}>
//           <PaginationNext
//             href={
//               isLastPage
//                 ? ""
//                 : `${pathname}?${customPageIndexKey || "page"}=${pageIndex + 1}&${customPageSizeKey || "size"}=${pageSize}`
//             }
//           />
//         </PaginationItem>
//       </PaginationContent>
//     </Pagination>
//   );
// }
