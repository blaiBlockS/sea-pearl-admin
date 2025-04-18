"use client";

import Button from "@/components/common/button";
import { DatePicker } from "@/components/common/datePicker";
import { DataTable } from "@/components/common/table";
import { expenseColumnHelper } from "@/components/common/table/columns";
import Title from "@/components/layout/title";
import { QUERY_KEY } from "@/constants/queryKey";
import usePageData from "@/hook/usePageData";
import { getExpensesByDate } from "@/services/dashboard/expense";
import { ExpenseType } from "@/types/expense";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ExpenseSection = () => {
  const { pageIndex, pageSize, pathname } = usePageData();
  const router = useRouter();

  const raffleColumns = [
    expenseColumnHelper.accessor("id", {
      id: "id",
      header: () => <div className="pl-3">번호</div>,
      size: 100,
      cell: ({ row }) => {
        return <div className="pl-3">{row.index + 1}</div>;
      },
    }),

    expenseColumnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => <div className="">요청 일자</div>,
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
      header: () => <div className="">출금 일자</div>,
      size: 100,
      cell: ({ getValue }) => {
        const expenseDate = getValue<string>();

        return (
          <div>
            {expenseDate ? (
              <>
                <div>{format(expenseDate, "yy-MM-dd")}</div>
                <div>{format(expenseDate, "HH:mm:ss")}</div>
              </>
            ) : (
              <div className="text-text-disabled">미입력</div>
            )}
          </div>
        );
      },
    }),

    expenseColumnHelper.accessor("userName", {
      id: "userName",
      header: () => <div className="">유저명</div>,
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

    expenseColumnHelper.accessor("link", {
      id: "link",
      header: () => "TXID",
      size: 150,
      cell: ({ getValue }) => {
        const link = getValue<string>();

        return (
          <div>
            {link ? (
              <div>{link}</div>
            ) : (
              <div className="text-text-disabled">미입력</div>
            )}
          </div>
        );
      },
    }),

    expenseColumnHelper.display({
      id: "toDetailPage",
      header: "출금 등록/상세",
      size: 250,
      cell: ({ row }) => (
        <div className="flex justify-end pr-3">
          {row?.original?.link ? (
            <Button
              variant="fill"
              className="bg-button-secondary hover:bg-button-disabled h-10 px-4"
              onClick={() =>
                router.push(pathname + `/expense/${row.original.id}`)
              }
            >
              상세
            </Button>
          ) : (
            <Button
              variant="fill"
              className=" h-10 px-4"
              onClick={() =>
                router.push(pathname + `/expense/${row.original.id}`)
              }
            >
              등록
            </Button>
          )}
        </div>
      ),
    }),
  ] as ColumnDef<ExpenseType, unknown>[];

  // 지출 START END DATE 설정
  const [start, setStart] = useState(new Date(2025, 1, 1));
  const [end, setEnd] = useState(new Date(2051, 12, 31));
  const handleChangeStartDate = (v: Date | undefined) => {
    if (v === undefined) return;
    setStart(v);
  };
  const handleChangeEndDate = (v: Date | undefined) => {
    if (v === undefined) return;
    setEnd(v);
  };

  // 지출 조회 데이터 패칭
  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_FINANCE_EXPENSE(
      pageIndex,
      pageSize,
      start.toISOString(),
      end.toISOString()
    ),
    queryFn: () =>
      getExpensesByDate({
        page: pageIndex, //
        size: pageSize,
        start: start.toISOString(),
        end: end.toISOString(),
        order: "asc",
      }),
  });

  return (
    <div className="flex-1">
      {/* 지출 타이틀 */}
      <Title fontSize="text-head2">
        <span className="mr-5">지출</span>
        <span>{data.totalExpenseAmount} USDT</span>
      </Title>

      {/* Date Picker */}
      <div className="py-4 flex gap-4">
        <DatePicker
          onChange={handleChangeStartDate}
          value={start}
          className="flex-0"
        />
        <DatePicker
          onChange={handleChangeEndDate}
          value={end}
          className="flex-0"
        />
      </div>

      {/* 테이블 */}
      <DataTable
        columns={raffleColumns}
        data={data.expenses}
        pageSize={pageSize}
        pageIndex={pageIndex}
        pathname={pathname}
      />
    </div>
  );
};

export default ExpenseSection;
