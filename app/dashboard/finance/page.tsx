"use client";

import Button from "@/components/common/button";
import { DataTable } from "@/components/common/table";
import { expenseColumnHelper } from "@/components/common/table/columns";
import Title from "@/components/layout/title";
import { QUERY_KEY } from "@/constants/queryKey";
import usePageData from "@/hook/usePageData";
import {
  // getAllExpenses,
  getExpensesByDate,
} from "@/services/dashboard/expense";
import { ExpenseType } from "@/types/expense";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Skeleton from "react-loading-skeleton";

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
      header: () => <div className="pl-3">출금 요청 일자</div>,
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
      header: () => <div className="pl-3">출금 요청 일자</div>,
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

    expenseColumnHelper.accessor("txHashUrl", {
      id: "txHashUrl",
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
              telegramUid: 0,
              firstName: "string",
              lastName: "string",
              userName: "string",
              expenseDate: "2025-04-16T02:43:18.667Z",
              order_amount: 0,
              txHashUrl: "string",
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
  const { pageIndex, pageSize, pathname } = usePageData();
  const [start, setStart] = useState(new Date(2025, 1, 1).toISOString());
  const [end, setEnd] = useState(new Date(2051, 12, 31).toISOString());

  const raffleColumns = [
    expenseColumnHelper.accessor("id", {
      id: "id",
      header: () => <div className="pl-3">번호</div>,
      size: 100,
      cell: ({ getValue }) => {
        const id = getValue<number>();

        return `${id?.toLocaleString()}`;
      },
    }),

    expenseColumnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => <div className="pl-3">출금 요청 일자</div>,
      size: 100,
      cell: ({ getValue }) => {
        const createdAt = getValue<string>();

        return (
          <div>
            <div>{createdAt ? format(createdAt, "yy-MM-dd") : "-"}</div>
            <div>{createdAt ? format(createdAt, "HH:mm:ss") : "-"}</div>
          </div>
        );
      },
    }),

    expenseColumnHelper.accessor("expenseDate", {
      id: "expenseDate",
      header: () => <div className="pl-3">출금 일자</div>,
      size: 100,
      cell: ({ getValue }) => {
        const createdAt = getValue<string>();

        return (
          <div>
            <div>{createdAt ? format(createdAt, "yy-MM-dd") : "-"}</div>
            <div>{createdAt ? format(createdAt, "HH:mm:ss") : "-"}</div>
          </div>
        );
      },
    }),

    expenseColumnHelper.accessor("userName", {
      id: "userName",
      header: () => <div className="pl-3">유저명</div>,
      size: 100,
      cell: ({ getValue }) => {
        const userName = getValue<string>();

        return `${userName}`;
      },
    }),

    expenseColumnHelper.accessor("order_amount", {
      id: "order_amount",
      header: () => "출금 USDT",
      size: 100,
      cell: ({ getValue }) => {
        const id = getValue<number>();

        return `${id?.toLocaleString()}`;
      },
    }),

    expenseColumnHelper.accessor("txHashUrl", {
      id: "txHashUrl",
      header: () => "TXID",
      size: 150,
      cell: ({ getValue }) => {
        const txHashUrl = getValue<string>();

        return `${txHashUrl}`;
      },
    }),

    expenseColumnHelper.display({
      id: "toDetailPage",
      header: "출금 등록/상세",
      size: 250,
      cell: () => (
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

  console.log(start, end, "start and end");

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_FINANCE_EXPENSE(pageIndex, pageSize, start, end),
    queryFn: () =>
      getExpensesByDate({
        page: pageIndex, //
        size: pageSize,
        start,
        end,
        order: "asc",
      }),
  });

  // const { data: allData } = useSuspenseQuery({
  //   queryKey: QUERY_KEY.GET_ALL_FINANCE_EXPENSES,
  //   queryFn: () => getAllExpenses(pageIndex, pageSize),
  // });

  // 지출
  // const { data } = useSuspenseQuery({
  //   queryKey: QUERY_KEY.GET_FINANCE_EXPENSE(pageIndex, pageSize),
  //   queryFn: () => getAllShellRaffles(pageIndex, pageSize),
  // });

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
            columns={raffleColumns}
            data={data.expenses}
            pageSize={pageSize}
            pageIndex={pageIndex}
            pathname={pathname}
          />
        </div>
      </section>
    </div>
  );
}
