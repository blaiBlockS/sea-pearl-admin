"use client";

import Button from "@/components/common/button";
import { DatePicker } from "@/components/common/datePicker";
import { DataTable } from "@/components/common/table";
import { incomeColumnHelper } from "@/components/common/table/columns";
import Title from "@/components/layout/title";
import { QUERY_KEY } from "@/constants/queryKey";
import usePageData from "@/hook/usePageData";
import {
  getAllIncomes,
  getIncomesByDate,
  postUploadIncomeCsv,
} from "@/services/dashboard/income";
import { IncomeType } from "@/types/income";
import { convertPageIndex } from "@/utils/covertPageIndex";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRef, useState } from "react";

const INCOME_PAGE_INDEX = "incomeIndex";
const INCOME_PAGE_SIZE = "incomeSize";

const IncomeSection = () => {
  const { pageIndex, pageSize, pathname } = usePageData({
    customPageIndexKey: INCOME_PAGE_INDEX,
    customPageSizeKey: INCOME_PAGE_SIZE,
  });

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
        order: "desc",
      }),
  });

  const uploadMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => postUploadIncomeCsv({ id }),
    onSuccess: () => {
      window.alert("업로드 완료.");
    },
    onError: () => {
      window.alert("업로드 중 에러가 발생하였습니다.");
    },
  });

  const UploadButton = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
      fileInputRef.current?.click(); // input 클릭 트리거
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        console.log("선택된 파일:", file.name);
        // 여기서 CSV 파싱하거나 서버로 전송하는 로직 넣기
      }
    };

    return (
      <Button variant="fill" onClick={handleButtonClick}>
        <div className="flex h-10 items-center gap-2 px-5">
          <span className="text-body3-medium">수익 입력</span>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            style={{ display: "none" }} // 숨김 처리
            onChange={handleFileChange}
          />
        </div>
      </Button>
    );
  };

  return (
    <div className="flex-1">
      {/* 지출 타이틀 */}
      <Title fontSize="text-head2" ActionButton={UploadButton}>
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
        customPageData={{
          customPageIndexKey: INCOME_PAGE_INDEX,
          customPageSizeKey: INCOME_PAGE_SIZE,
        }}
      />
    </div>
  );
};

export default IncomeSection;
