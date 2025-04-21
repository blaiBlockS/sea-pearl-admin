"use client";

import Button from "@/components/common/button";
import Input from "@/components/common/input";
import { DataTable } from "@/components/common/table";
import { expenseColumnHelper } from "@/components/common/table/columns";
import Title from "@/components/layout/title";
import { QUERY_KEY } from "@/constants/queryKey";
import usePageData from "@/hook/usePageData";
import { getAllPearlRaffles } from "@/services/dashboard/content/pearlRaffle";
import { ExpenseType } from "@/types/expense";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Skeleton from "react-loading-skeleton";

export default function User() {
  return (
    <ErrorBoundary
      fallbackRender={(error) => <div>에러: {JSON.stringify(error.error)}</div>}
    >
      <Suspense fallback={<FinanceInnerFallback />}>
        <FinanceInner />
      </Suspense>
    </ErrorBoundary>
  );
}

function FinanceInnerFallback() {
  return (
    <div className="px-9 py-7">
      {/* 타이틀 */}
      <Title>총 유저 수 {}명</Title>
    </div>
  );
}

function FinanceInner() {
  const { pageIndex, pageSize, pathname } = usePageData({});

  const tableColumns = [
    expenseColumnHelper.accessor("id", {
      id: "id",
      header: () => <div className="pl-3">요청 일자</div>,
      size: 100,
      cell: () => (
        <div className="flex pl-3 w-full">
          <Skeleton
            baseColor="#333"
            highlightColor="#222"
            width={50}
            height={24}
          />
        </div>
      ),
    }),

    expenseColumnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => <div className="pl-3">요청 일자</div>,
      size: 100,
      cell: () => (
        <div className="flex pl-3 w-full">
          <Skeleton
            baseColor="#333"
            highlightColor="#222"
            width={50}
            height={24}
          />
        </div>
      ),
    }),

    expenseColumnHelper.accessor("expenseDate", {
      id: "status",
      header: () => <div className="pl-3">출금 일자</div>,
      size: 200,
      cell: () => {
        return (
          <div className="flex pl-3">
            <div
              className={
                "px-2 py-1 rounded text-body4-semibold bg-text-teritary/20 text-text-teritary"
              }
            >
              로딩중
            </div>
          </div>
        );
      },
    }),

    expenseColumnHelper.accessor("userName", {
      id: "username",
      header: () => "유저명",
      size: 150,
      cell: () => {
        return (
          <div>
            <Skeleton
              baseColor="#333"
              highlightColor="#222"
              width={60}
              height={12}
            />
            <Skeleton
              baseColor="#333"
              highlightColor="#222"
              width={60}
              height={12}
            />
          </div>
        );
      },
    }),

    expenseColumnHelper.accessor("order_amount", {
      id: "order_amount",
      header: () => "출금 USDT",
      size: 200,
      cell: () => {
        return (
          <div>
            <Skeleton
              baseColor="#333"
              highlightColor="#222"
              width={60}
              height={12}
            />
            <Skeleton
              baseColor="#333"
              highlightColor="#222"
              width={60}
              height={12}
            />
          </div>
        );
      },
    }),

    expenseColumnHelper.accessor("link", {
      id: "link",
      header: "TXID",
      size: 150,
      cell: () => {
        return (
          <Skeleton
            baseColor="#333"
            highlightColor="#222"
            width={60}
            height={12}
          />
        );
      },
    }),

    expenseColumnHelper.display({
      id: "toDetailPage",
      header: "출금 등록/상세",
      size: 250,
      cell: ({ row }) => (
        <div className="flex justify-end pr-3">
          <Button
            variant="fill"
            className="bg-button-secondary hover:bg-button-disabled h-10 px-4"
          >
            상세내역
          </Button>
        </div>
      ),
    }),
  ] as ColumnDef<ExpenseType, unknown>[];

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_USERS(pageIndex, pageSize),
    queryFn: () => getAllPearlRaffles(pageIndex, pageSize),
  });

  return (
    <div className="px-9 py-7">
      {/* 타이틀 */}
      <Title>총 유저 수 {}명</Title>

      {/* 조회 필터 */}
      <div>
        <Input />
        <Button variant="fill">조회</Button>
        <Button variant="fill">초기화</Button>
      </div>

      {/* 테이블 */}
      {/* <DataTable
        columns={tableColumns}
        data={data}
        pageIndex={pageIndex}
        pageSize={pageSize}
        pathname={pathname}
      /> */}
    </div>
  );
}
