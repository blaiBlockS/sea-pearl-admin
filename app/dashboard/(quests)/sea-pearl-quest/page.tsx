"use client";

import Button from "@/components/common/button";
import { DataTable } from "@/components/common/table";
import { raffleColumnHelper } from "@/components/common/table/columns";
import Title from "@/components/layout/title";
import { QUERY_KEY } from "@/constants/queryKey";
import usePageData from "@/hook/usePageData";
import { cn } from "@/lib/utils";
import { getAllShellRaffles } from "@/services/dashboard/content/shellRaffle";
import { RaffleType } from "@/types/columns";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { PlusIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Quest() {
  return (
    <ErrorBoundary
      fallbackRender={(error) => <div>에러: {JSON.stringify(error.error)}</div>}
    >
      <Suspense fallback={<></>}>
        <SeaPearlQuestInner />
      </Suspense>
    </ErrorBoundary>
  );
}

function SeaPearlQuestInner() {
  const router = useRouter();
  const { pageIndex, pageSize, pathname } = usePageData();

  const raffleColumns = [
    raffleColumnHelper.accessor("id", {
      id: "id",
      header: () => <div className="pl-3">ID</div>,
      enableResizing: false, //disable resizing for just this column
      size: 100,
      cell: ({ getValue }) => (
        <div className="flex pl-3">
          {getValue<number>().toString().slice(0, 4)}...
        </div>
      ),
    }),

    raffleColumnHelper.accessor("status", {
      id: "status",
      header: () => <div className="pl-3">상태</div>,
      size: 200,
      cell: ({ getValue }) => {
        const value = getValue<string>();
        let result = "";
        let statusStyle = "";
        switch (value) {
          case "1":
            result = "대기중";
            statusStyle = "bg-text-teritary/20 text-text-teritary";
            break;
          case "2":
            result = "진행중";
            statusStyle = "bg-background-brand/20 text-text-brand";
            break;
          case "3":
            result = "완료됨";
            statusStyle = "bg-[#00E6B8]/20 text-[#00E6B8]";
            break;
          case "4":
            result = "취소환불";
            statusStyle = "bg-red-500/20 text-red-500";
            break;
          case "5":
          default:
            result = "서버에러";
            statusStyle = "bg-[#FF6600]/20 text-[#FF6600]";
            break;
        }

        return (
          <div className="flex pl-3">
            <div
              className={cn(
                "px-2 py-1 rounded text-body4-semibold",
                statusStyle
              )}
            >
              {result}
            </div>
          </div>
        );
      },
    }),

    raffleColumnHelper.accessor("start", {
      id: "start",
      header: () => "시작 일시",
      size: 150,
      cell: ({ getValue }) => {
        const start = getValue<string>();
        return (
          <div>
            <div>{format(start, "yy-MM-dd")}</div>
            <div>{format(start, "HH:mm:ss")}</div>
          </div>
        );
      },
    }),

    raffleColumnHelper.accessor("end", {
      id: "end",
      header: () => "종료 일시",
      size: 200,
      cell: ({ getValue }) => {
        const end = getValue<string>();
        return (
          <div>
            <div>{format(end, "yy-MM-dd")}</div>
            <div>{format(end, "HH:mm:ss")}</div>
          </div>
        );
      },
    }),

    raffleColumnHelper.accessor("reward", {
      id: "reward",
      header: "총 리워드(USDT)",
      size: 150,
      cell: ({ getValue }) => {
        const reward = getValue<number>();
        return `${reward.toLocaleString()}`;
      },
    }),

    raffleColumnHelper.accessor("entry_fee", {
      id: "entry_fee",
      header: "1회 응모권 비용(Shell)",
      size: 150,
      cell: ({ row }) => {
        const { entry_type, entry_fee } = row.original;
        if (entry_type && entry_fee) {
          return `${entry_fee.toLocaleString()}`;
        }
      },
    }),

    raffleColumnHelper.accessor("participants", {
      id: "participants",
      header: "참여자 수",
      size: 50,
      cell: ({ getValue }) => {
        const participants = getValue<number>();
        return participants.toLocaleString();
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
            onClick={() => router.push(pathname + `/${row.original.id}`)}
          >
            상세내역
          </Button>
        </div>
      ),
    }),
  ] as ColumnDef<RaffleType, unknown>[];

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_SHELL_RAFFLES(pageIndex, pageSize),
    queryFn: () => getAllShellRaffles(pageIndex, pageSize),
  });

  // 새로운 래플 생성 버튼
  const NewQuestButton = () => {
    const handleNavigateNewRaffle = () => {
      router.push(pathname + "/new");
    };

    return (
      <Button variant="fill" onClick={handleNavigateNewRaffle}>
        <div className="flex h-10 items-center gap-2 pr-3 pl-2">
          <PlusIcon size={20} />
          <span className="text-body3-medium">New Quest</span>
        </div>
      </Button>
    );
  };

  return (
    <div className="px-9 py-7">
      {/* 타이틀 */}
      <Title ActionButton={NewQuestButton}>Sea Pearl 퀘스트</Title>

      {/* 테이블 */}
      <DataTable
        columns={raffleColumns}
        data={data}
        // PAGENATION RELATED DATAS
        pageSize={pageSize}
        pageIndex={pageIndex}
        pathname={pathname}
      />
    </div>
  );
}
