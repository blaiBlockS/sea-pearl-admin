"use client";

import Button from "@/components/common/button";
import Input from "@/components/common/input";
import { DataTable } from "@/components/common/table";
import { userColumnHelper } from "@/components/common/table/columns";
import Title from "@/components/layout/title";
import { QUERY_KEY } from "@/constants/queryKey";
import usePageData from "@/hook/usePageData";
import { getAllUsers } from "@/services/dashboard/user";
import { ExpenseType } from "@/types/expense";
import { UserFilterType, UserType } from "@/types/user";
import { convertPageIndex } from "@/utils/covertPageIndex";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Suspense, useState } from "react";
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
  return <div className="px-9 py-7"></div>;
}

function FinanceInner() {
  const { pageIndex, pageSize, pathname } = usePageData({});

  const userColumns = [
    userColumnHelper.accessor("id", {
      id: "id",
      header: () => <div className="pl-3">번호</div>,
      size: 100,
      cell: ({ row }) => {
        return (
          <div className="pl-3">{convertPageIndex(row.index, pageIndex)}</div>
        );
      },
    }),

    userColumnHelper.accessor("userName", {
      id: "settlement_date",
      header: () => (
        <div className="">
          <div>Telegram Name</div>
          <div>Telegram Handle</div>
        </div>
      ),
      size: 100,
      cell: ({ row }) => {
        const username = row.original.userName;
        const first = row.original.firstName;
        const last = row.original.lastName;

        return (
          <div>
            <div>
              {first} {last}
            </div>
            <div>@{username}</div>
          </div>
        );
      },
    }),

    userColumnHelper.accessor("inviteCount", {
      id: "inviteCount",
      header: () => <div className="">초대한 유저 수</div>,
      size: 100,
      cell: ({ getValue }) => {
        const adCount = getValue<number>();

        return <div>{adCount?.toLocaleString() ?? 0}</div>;
      },
    }),

    userColumnHelper.accessor("adCount", {
      id: "adCount",
      header: () => <div className="">시청한 광고 수</div>,
      size: 100,
      cell: ({ getValue }) => {
        const adCount = getValue<number>();

        return <div>{adCount?.toLocaleString() ?? 0}</div>;
      },
    }),

    userColumnHelper.accessor("shell", {
      id: "shell",
      header: () => "얻은 Shell 수",
      size: 100,
      cell: ({ getValue }) => {
        const shell = getValue<number>();

        return `${shell?.toLocaleString()}`;
      },
    }),

    userColumnHelper.accessor("usdt", {
      id: "usdt",
      header: () => "얻은 USDT 양",
      size: 150,
      cell: ({ getValue }) => {
        const usdt = getValue<string>();

        return <div>{usdt}</div>;
      },
    }),

    // 마지막 방문

    userColumnHelper.accessor("updatedAt", {
      id: "updatedAt",
      header: () => "마지막 접속일",
      size: 150,
      cell: ({ getValue }) => {
        const updatedAt = getValue<string>();

        return (
          <div>
            <div>{updatedAt ? format(updatedAt, "yy-MM-dd") : "-"}</div>
            <div>{updatedAt ? format(updatedAt, "HH:mm:ss") : "-"}</div>
          </div>
        );
      },
    }),

    userColumnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => "가입일",
      size: 150,
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

    userColumnHelper.display({
      id: "toDetailPage",
      header: () => <div className="flex">상세 보기</div>,
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
  ] as ColumnDef<UserType, unknown>[];

  const [category, setCategory] = useState<UserFilterType>("friends");
  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_USERS(pageIndex, pageSize),
    queryFn: () => getAllUsers(pageIndex, pageSize, category),
  });

  console.log(data, "get user");

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
      <DataTable
        columns={userColumns}
        data={data.users}
        pageIndex={pageIndex}
        pageSize={pageSize}
        pathname={pathname}
      />
    </div>
  );
}
