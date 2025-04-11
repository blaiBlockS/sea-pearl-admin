"use client";

import Button from "@/components/common/button";
import { DataTable } from "@/components/common/table";
import { raffleColumnHelper } from "@/components/common/table/columns";
import Title from "@/components/layout/title";
import { QUERY_KEY } from "@/constants/queryKey";
import usePageData from "@/hook/usePageData";
import { getAllShellRaffles } from "@/services/dashboard/content/shellRaffle";
import { RaffleType } from "@/types/columns";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Skeleton from "react-loading-skeleton";

export default function Finance() {
  return (
    <ErrorBoundary
      fallbackRender={(error) => <div>에러: {JSON.stringify(error.error)}</div>}
    >
      <Suspense fallback={<></>}>
        <FinanceInner />
      </Suspense>
    </ErrorBoundary>
  );
}

function FinanceInner() {
  const { pageIndex, pageSize, pathname } = usePageData();

  const raffleColumns = [
    raffleColumnHelper.accessor("id", {
      id: "id",
      header: () => <div className="pl-3">ID</div>,
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

    raffleColumnHelper.accessor("status", {
      id: "status",
      header: () => <div className="pl-3">상태</div>,
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

    raffleColumnHelper.accessor("start", {
      id: "start",
      header: () => "시작 일시",
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

    raffleColumnHelper.accessor("end", {
      id: "end",
      header: () => "종료 일시",
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

    raffleColumnHelper.accessor("reward", {
      id: "reward",
      header: "총 리워드(USDT)",
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

    raffleColumnHelper.accessor("entry_fee", {
      id: "entry_fee",
      header: "1회 응모권 비용(Shell)",
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

    raffleColumnHelper.accessor("participants", {
      id: "participants",
      header: "참여자 수",
      size: 50,
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

    raffleColumnHelper.display({
      id: "toDetailPage",
      header: "",
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
  ] as ColumnDef<RaffleType, unknown>[];

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_FINANCE_EXPENSE(pageIndex, pageSize),
    queryFn: () => getAllShellRaffles(pageIndex, pageSize),
  });

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
            data={data}
            pageSize={pageSize}
            pageIndex={pageIndex}
            pathname={pathname}
          />
        </div>
      </section>
    </div>
  );
}
