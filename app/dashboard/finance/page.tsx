"use client";

import Button from "@/components/common/button";
import { DataTable } from "@/components/common/table";
import { expenseColumnHelper } from "@/components/common/table/columns";
import Title from "@/components/layout/title";
import { ExpenseType } from "@/types/expense";
import { ColumnDef } from "@tanstack/react-table";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Skeleton from "react-loading-skeleton";
import ExpenseSection from "./_expense";
import IncomeSection from "./_income";

export default function Finance() {
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
  const expenseColumns = [
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

    expenseColumnHelper.accessor("expenseDate", {
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
      header: () => "출금요청 USDT",
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

  // 수익 업로드 버튼
  const uploadProfitButton = () => {
    return (
      <Button variant="fill" onClick={() => {}}>
        <div className="flex h-10 items-center gap-2 pr-3 pl-2">
          <span className="text-body3-medium">수익 입력</span>
        </div>
      </Button>
    );
  };

  return (
    <div className="px-9 py-7">
      {/* 타이틀 */}
      <Title>수익 및 지출</Title>

      {/* 수익 섹션 */}
      <section className="flex gap-8">
        <div className="flex-1">
          {/* 수익 타이틀 */}
          <Title fontSize="text-head2" ActionButton={uploadProfitButton}>
            <span className="mr-5">수익</span>
            <span>{} USDT</span>
          </Title>

          {/* 테이블 */}
          <DataTable
            columns={expenseColumns}
            data={new Array(10).fill(undefined).map(() => ({
              id: "string",
              userId: "string",
              telegramId: 0,
              firstName: "string",
              lastName: "string",
              userName: "string",
              orderDate: "2025-04-16T02:43:18.667Z",
              expenseDate: "2025-04-16T02:43:18.667Z",
              amount: 0,
              link: "string",
              createdAt: "2025-04-16T02:43:18.667Z",
              updatedAt: "2025-04-16T02:43:18.667Z",
            }))}
          />
        </div>

        {/* 지출 섹션 */}
        <div className="flex-1">
          {/* 지출 타이틀 */}
          <Title fontSize="text-head2">
            <span className="mr-5">지출</span>
            <span>{} USDT</span>
          </Title>

          {/* 테이블 */}
          <DataTable
            columns={expenseColumns}
            data={new Array(10).fill(undefined).map(() => ({
              id: "string",
              userId: "string",
              telegramId: 0,
              firstName: "string",
              lastName: "string",
              userName: "string",
              orderDate: "2025-04-16T02:43:18.667Z",
              expenseDate: "2025-04-16T02:43:18.667Z",
              amount: 0,
              link: "string",
              createdAt: "2025-04-16T02:43:18.667Z",
              updatedAt: "2025-04-16T02:43:18.667Z",
            }))}
          />
        </div>
      </section>
    </div>
  );
}

function FinanceInner() {
  return (
    <div className="px-9 py-7">
      {/* 타이틀 */}
      <Title>수익 및 지출</Title>

      {/* GRID */}
      <section className="flex gap-8">
        {/* 수익 */}
        <IncomeSection />

        {/* 지출 */}
        <ExpenseSection />
      </section>
    </div>
  );
}
