"use client";

import Button from "@/components/common/button";
import { DatePicker } from "@/components/common/datePicker";
import { SelectBox } from "@/components/common/selectBox";
import { DataTable } from "@/components/common/table";
import { expenseColumnHelper } from "@/components/common/table/columns";
import Title from "@/components/layout/title";
import { QUERY_KEY } from "@/constants/queryKey";
import usePageData from "@/hook/usePageData";
import {
  getAllNotYetPaidExpenses,
  getAllPaidExpenses,
  getPaidExpensesByDate,
} from "@/services/dashboard/expense";
import { ExpenseType } from "@/types/expense";
import { ExpenseStatusType } from "@/types/expenseStatus";
import { cn } from "@/utils/cn";
import { isExpenseStatus } from "@/utils/isExpenseStatus";
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

  // 출금요청 | 지급완료 필터
  const [expenseStatus, setExpenseStatus] =
    useState<ExpenseStatusType>("출금요청"); // 출금요청 | 지급완료
  const handleExpenseStatus = (v: string) => {
    if (isExpenseStatus(v)) {
      setExpenseStatus(v);
    }
  };

  // '지급 요청' 조회 데이터 패칭
  const { data: allNotYetPaidData } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_ALL_FINANCE_EXPENSES,
    queryFn: () => getAllNotYetPaidExpenses(pageIndex, pageSize),
  });

  // '지급 완료' 기간 별 조회 데이터 패칭
  const { data: allPaidDataByDate } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_FINANCE_EXPENSES_BY_DATE(
      pageIndex,
      pageSize,
      start.toISOString(),
      end.toISOString()
    ),
    queryFn: () =>
      getPaidExpensesByDate({
        page: pageIndex, //
        size: pageSize,
        start: start.toISOString(),
        end: end.toISOString(),
        order: "asc",
      }),
  });

  // '지급 완료' 조회 데이터 패칭
  // const { data: allPaidData } = useSuspenseQuery({
  //   queryKey: QUERY_KEY.GET_ALL_FINANCE_EXPENSES,
  //   queryFn: () => getAllPaidExpenses(pageIndex, pageSize),
  // });

  console.log(allNotYetPaidData, "allNotYetPaidData");
  console.log(allPaidDataByDate, "allPaidDataByDate");

  const data =
    expenseStatus === "지급완료"
      ? allPaidDataByDate.expenses
      : allNotYetPaidData.expenses;

  return (
    <div className="flex-1">
      {/* 지출 타이틀 */}
      <Title fontSize="text-head2">
        <span className="mr-5">지출</span>
        <span>
          {expenseStatus === "지급완료"
            ? allPaidDataByDate.totalExpenseAmount
            : 0}{" "}
          USDT
        </span>
      </Title>

      {/* Date Picker */}
      <div className="py-4 flex gap-4">
        {/* 날짜 조회 */}

        <div
          className={cn(
            "flex gap-2",
            expenseStatus === "출금요청" && "opacity-30 pointer-events-none"
          )}
        >
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

        {/* 출금요청/지급완료 박스 */}
        <SelectBox
          onValueChange={handleExpenseStatus}
          value={expenseStatus}
          valueList={["출금요청", "지급완료"]}
          triggerClassName={"bg-background-teritary border"}
        />

        {/* 조회 버튼 */}
        {/* <Button
          onClick={() => setConfirm(true)}
          variant="fill"
          className="px-3 bg-background-teritary hover:bg-background-teritary/50"
        >
          조회
        </Button> */}
      </div>

      {/* 테이블 */}
      <DataTable
        columns={raffleColumns}
        data={data}
        pageSize={pageSize}
        pageIndex={pageIndex}
        pathname={pathname}
      />
    </div>
  );
};

export default ExpenseSection;
