"use client";

import Button from "@/components/common/button";
import { DatePicker } from "@/components/common/datePicker";
import { DataTable } from "@/components/common/table";
import { incomeColumnHelper } from "@/components/common/table/columns";
import Title from "@/components/layout/title";
import { QUERY_KEY } from "@/constants/queryKey";
import usePageData from "@/hook/usePageData";
import { getAllIncomes, getIncomesByDate } from "@/services/dashboard/income";
import { IncomeType } from "@/types/income";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";

const ExpenseSection = () => {
  const { pageIndex, pageSize, pathname } = usePageData();

  const raffleColumns = [
    incomeColumnHelper.accessor("id", {
      id: "id",
      header: () => <div className="pl-3">번호</div>,
      size: 100,
      cell: ({ row }) => {
        return <div className="pl-3">{row.index + 1}</div>;
      },
    }),

    incomeColumnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => <div className="">정산 날짜</div>,
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

    incomeColumnHelper.accessor("our_ads", {
      id: "expenseDate",
      header: () => <div className="">자체 집계한 광고 시청 횟수</div>,
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

    incomeColumnHelper.accessor("real_ads", {
      id: "userName",
      header: () => <div className="">실제 집계된 광고 시청 횟수</div>,
      size: 100,
      cell: ({ getValue }) => {
        const userName = getValue<string>();

        return `${userName}`;
      },
    }),

    incomeColumnHelper.accessor("usdt", {
      id: "order_amount",
      header: () => "정산 USDT",
      size: 100,
      cell: ({ getValue }) => {
        const id = getValue<number>();

        return `${id?.toLocaleString()}`;
      },
    }),

    incomeColumnHelper.accessor("avg_price", {
      id: "link",
      header: () => "평균 광고 단가",
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
  ] as ColumnDef<IncomeType, unknown>[];

  // 지출 START END DATE 설정
  const [start, setStart] = useState(new Date(2025, 1, 1));
  const [end, setEnd] = useState(new Date(2051, 12, 31));
  const [confirm, setConfirm] = useState(false);

  const handleChangeStartDate = (v: Date | undefined) => {
    if (v === undefined) return;
    setStart(v);
  };
  const handleChangeEndDate = (v: Date | undefined) => {
    if (v === undefined) return;
    setEnd(v);
  };

  // 전체 수익 조회 데이터 패칭
  const { data: allIncomeData } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_ALL_FINANCE_INCOMES,
    queryFn: () => getAllIncomes(pageIndex, pageSize),
  });

  // 기간 별 지출 수익 데이터 패칭
  const { data: dateRangedData } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_FINANCE_INCOMES_BY_DATE(
      pageIndex,
      pageSize,
      start.toISOString(),
      end.toISOString()
    ),
    queryFn: () =>
      getIncomesByDate({
        page: pageIndex, //
        size: pageSize,
        start: start.toISOString(),
        end: end.toISOString(),
        order: "asc",
      }),
  });

  console.log(allIncomeData, "allIncomeData");

  return (
    <div className="flex-1">
      {/* 지출 타이틀 */}
      <Title fontSize="text-head2">
        <span className="mr-5">수익</span>
        {/* <span>
          {confirm
            ? dateRangedData.totalExpenseAmount
            : defaultData.totalExpenseAmount}{" "}
          USDT
        </span> */}
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
        <Button
          onClick={() => setConfirm(true)}
          variant="fill"
          className="px-3 bg-background-teritary hover:bg-background-teritary/50"
        >
          조회
        </Button>
      </div>

      {/* 테이블 */}
      {/* <DataTable
        columns={raffleColumns}
        data={confirm ? dateRangedData.expenses : defaultData.expenses}
        pageSize={pageSize}
        pageIndex={pageIndex}
        pathname={pathname}
      /> */}
    </div>
  );
};

export default ExpenseSection;
