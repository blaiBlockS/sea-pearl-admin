import Button from "@/components/common/button";
import { PagenationDeck } from "@/components/common/pagenation";
import { DataTable } from "@/components/common/table";
import { userUsdtColumnHelper } from "@/components/common/table/columns";
import Tag from "@/components/common/tag";
import { QUERY_KEY } from "@/constants/queryKey";
import usePageData from "@/hook/usePageData";
import { getUserUsdtExpense } from "@/services/dashboard/user";
import { RaffleType } from "@/types/columns";
import { UserUsdtExpenseType } from "@/types/user";
import { convertPageIndex } from "@/utils/covertPageIndex";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const UsdtExpenseTable = () => {
  return (
    <ErrorBoundary
      fallbackRender={(error) => <div>에러: {JSON.stringify(error.error)}</div>}
    >
      <Suspense fallback={<UsdtExpenseTableFallback />}>
        <UsdtExpenseTableInner />
      </Suspense>
    </ErrorBoundary>
  );
};

const UsdtExpenseTableFallback = () => {
  const { pageSize, pageIndex, pathname } = usePageData({});
  const router = useRouter();

  const userUsdtExpenseColumns = [
    userUsdtColumnHelper.accessor("id", {
      id: "id",
      header: () => <div className="pl-3">ID</div>,
      enableResizing: false, //disable resizing for just this column
      size: 100,
      cell: ({ row }) => (
        <div className="flex pl-3">
          {convertPageIndex(row.index, pageIndex)}
        </div>
      ),
    }),

    userUsdtColumnHelper.accessor("expenseDate", {
      id: "start",
      header: () => "출금 일시",
      size: 150,
      cell: ({ getValue }) => {
        let expenseDate = getValue<string | null>();

        return (
          <div>
            {expenseDate ? (
              <div>
                <div>{format(expenseDate, "yy-MM-dd")}</div>
                <div>{format(expenseDate, "HH:mm:ss")}</div>
              </div>
            ) : (
              <span>미지급</span>
            )}
          </div>
        );
      },
    }),

    userUsdtColumnHelper.accessor("from", {
      id: "from",
      header: "from",
      size: 50,
      cell: ({ getValue }) => {
        const to = getValue<string>();
        return to ? to.toLocaleString() : "-";
      },
    }),

    userUsdtColumnHelper.accessor("to", {
      id: "to",
      header: "to",
      size: 50,
      cell: ({ getValue }) => {
        const to = getValue<string>();
        return to ? to.toLocaleString() : "-";
      },
    }),
  ] as ColumnDef<RaffleType, unknown>[];

  return <></>;
};

const UsdtExpenseTableInner = () => {
  const { pageSize, pageIndex, pathname } = usePageData({
    customPageIndexKey: "usdtPage",
    customPageSizeKey: "usdtSize",
  });
  const router = useRouter();

  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const userUsdtExpenseColumns = [
    userUsdtColumnHelper.accessor("id", {
      id: "id",
      header: () => <div className="pl-3">ID</div>,
      enableResizing: false, //disable resizing for just this column

      cell: ({ row }) => (
        <div className="flex pl-3">
          {convertPageIndex(row.index, pageIndex)}
        </div>
      ),
    }),

    userUsdtColumnHelper.accessor("expenseDate", {
      id: "start",
      header: () => "출금 일시",

      cell: ({ getValue }) => {
        let expenseDate = getValue<string | null>();

        return (
          <div>
            {expenseDate ? (
              <div>
                <div>{format(expenseDate, "yy-MM-dd")}</div>
                <div>{format(expenseDate, "HH:mm:ss")}</div>
              </div>
            ) : (
              <span>미지급</span>
            )}
          </div>
        );
      },
    }),

    userUsdtColumnHelper.accessor("from", {
      id: "from",
      header: "from",

      cell: ({ getValue }) => {
        const to = getValue<string>();
        return to ? to.toLocaleString() : "-";
      },
    }),

    userUsdtColumnHelper.accessor("to", {
      id: "to",
      header: "to",

      cell: ({ getValue }) => {
        const to = getValue<string>();
        return to ? to.toLocaleString() : "-";
      },
    }),

    userUsdtColumnHelper.accessor("amount", {
      id: "amount",
      header: "Amount",

      cell: ({ getValue }) => {
        const to = getValue<number>();
        return to ? `${to.toLocaleString()} USDT` : "-";
      },
    }),

    userUsdtColumnHelper.accessor("link", {
      id: "txid",
      header: "TXID",

      cell: ({ getValue }) => {
        const to = getValue<string>();
        return to ? to : "-";
      },
    }),
  ] as ColumnDef<UserUsdtExpenseType, unknown>[];

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_USER_USDT_EXPENSE(id, pageIndex, pageSize),
    queryFn: () => getUserUsdtExpense(id, pageIndex, pageSize, "asc"),
  });

  let totalPages = 1;
  if (pageSize && data.totalCount) {
    totalPages = Math.ceil(data.totalCount / pageSize);
  }

  return (
    <div className="">
      {/* 테이블 */}
      <DataTable columns={userUsdtExpenseColumns} data={data.expenses} />
      <PagenationDeck
        currentPageKeyAlias={"usdtPage"}
        totalPageKeyAlias={"usdtSize"}
        currentPage={pageIndex}
        totalPages={totalPages}
      />
    </div>
  );
};

export default UsdtExpenseTable;
