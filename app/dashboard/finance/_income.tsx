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
import { convertPageIndex } from "@/utils/covertPageIndex";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";

const IncomeSection = () => {
  const { pageIndex, pageSize, pathname } = usePageData();

  const incomeColumns = [
    incomeColumnHelper.accessor("id", {
      id: "id",
      header: () => <div className="pl-3">번호</div>,
      size: 100,
      cell: ({ row }) => {
        return (
          <div className="pl-3">{convertPageIndex(row.index, pageIndex)}</div>
        );
      },
    }),

    incomeColumnHelper.accessor("settlement_date", {
      id: "settlement_date",
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
      id: "our_ads",
      header: () => <div className="">자체 집계한 광고 시청 횟수</div>,
      size: 100,
      cell: ({ getValue }) => {
        const ourAds = getValue<number>();

        return <div>{ourAds && ourAds.toLocaleString()}</div>;
      },
    }),

    incomeColumnHelper.accessor("real_ads", {
      id: "realAds",
      header: () => <div className="">실제 집계된 광고 시청 횟수</div>,
      size: 100,
      cell: ({ getValue }) => {
        const realAds = getValue<number>();

        return <div>{realAds && realAds.toLocaleString()}</div>;
      },
    }),

    incomeColumnHelper.accessor("usdt", {
      id: "usdt",
      header: () => "정산 USDT",
      size: 100,
      cell: ({ getValue }) => {
        const usdt = getValue<number>();

        return `${usdt?.toLocaleString()}`;
      },
    }),

    incomeColumnHelper.accessor("avg_price", {
      id: "avg_price",
      header: () => "평균 광고 단가",
      size: 150,
      cell: ({ getValue }) => {
        const avgPrice = getValue<string>();

        return <div>{avgPrice}</div>;
      },
    }),
  ] as ColumnDef<IncomeType, unknown>[];

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

  // 전체 수익 조회 데이터 패칭
  const { data: allIncomeData } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_ALL_FINANCE_INCOMES,
    queryFn: () => getAllIncomes(pageIndex, pageSize),
  });

  // 기간 별 지출 수익 데이터 패칭
  const { data: allIncomeDataByDate } = useSuspenseQuery({
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

  return (
    <div className="flex-1">
      {/* 지출 타이틀 */}
      <Title fontSize="text-head2">
        <span className="mr-5">수익</span>
        <span>{allIncomeDataByDate.totalIncomeAmount} USDT</span>
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
        columns={incomeColumns}
        data={allIncomeDataByDate.incomes}
        pageSize={pageSize}
        pageIndex={pageIndex}
        pathname={pathname}
      />
    </div>
  );
};

export default IncomeSection;
