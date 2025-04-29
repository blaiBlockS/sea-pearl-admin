import { PagenationDeck } from "@/components/common/pagenation";
import { DataTable } from "@/components/common/table";
import { userRewardColumnHelper } from "@/components/common/table/columns";
import { QUERY_KEY } from "@/constants/queryKey";
import usePageData from "@/hook/usePageData";
import { getUserRewards, getUserUsdtExpense } from "@/services/dashboard/user";
import { RaffleType } from "@/types/columns";
import { UserRewardsType, UserUsdtExpenseType } from "@/types/user";
import { convertPageIndex } from "@/utils/covertPageIndex";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const RewardTable = () => {
  return (
    <ErrorBoundary
      fallbackRender={(error) => <div>에러: {JSON.stringify(error.error)}</div>}
    >
      <Suspense fallback={<RewardTableFallback />}>
        <RewardTableInner />
      </Suspense>
    </ErrorBoundary>
  );
};

const RewardTableFallback = () => {
  const { pageSize, pageIndex, pathname } = usePageData({});

  const userUsdtExpenseColumns = [
    userRewardColumnHelper.accessor("id", {
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

    userRewardColumnHelper.accessor("expenseDate", {
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
  ] as ColumnDef<RaffleType, unknown>[];

  return <></>;
};

const RewardTableInner = () => {
  const REWARD_PAGE = "rewardPage";
  const REWARD_SIZE = "rewardSize";

  const { pageSize, pageIndex } = usePageData({
    customPageIndexKey: REWARD_PAGE,
    customPageSizeKey: REWARD_SIZE,
  });

  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const userUsdtExpenseColumns = [
    userRewardColumnHelper.accessor("id", {
      id: "id",
      header: () => <div className="pl-3">ID</div>,
      enableResizing: false, //disable resizing for just this column

      cell: ({ row }) => (
        <div className="flex pl-3">
          {convertPageIndex(row.index, pageIndex)}
        </div>
      ),
    }),

    userRewardColumnHelper.accessor("expenseDate", {
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

    userRewardColumnHelper.accessor("reason", {
      id: "contentType",
      header: "컨텐츠 분류",

      cell: ({ getValue }) => {
        const to = getValue<string>();
        return to ? to.toLocaleString() : "-";
      },
    }),

    userRewardColumnHelper.accessor("fee_type", {
      id: "rewardType",
      header: "리워드 분류",

      cell: ({ getValue }) => {
        const to = getValue<string>();
        return to ? to.toLocaleString() : "-";
      },
    }),

    userRewardColumnHelper.accessor("amount", {
      id: "amount",
      header: "Amount",

      cell: ({ getValue }) => {
        const to = getValue<number>();
        return to ? `${to.toLocaleString()} USDT` : "-";
      },
    }),
  ] as ColumnDef<UserRewardsType, unknown>[];

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_USER_REWARDS(id, pageIndex, pageSize),
    queryFn: () => getUserRewards(id, pageIndex, pageSize, "asc"),
    refetchOnWindowFocus: true,
  });

  console.log(data, "rewards data");

  let totalPages = 1;
  if (pageSize && data.totalCount) {
    totalPages = Math.ceil(data.totalCount / pageSize);
  }

  return (
    <div className="">
      {/* 테이블 */}
      <DataTable columns={userUsdtExpenseColumns} data={data.rewards} />
      <PagenationDeck
        currentPageKeyAlias={REWARD_PAGE}
        totalPageKeyAlias={REWARD_SIZE}
        currentPage={pageIndex}
        totalPages={totalPages}
      />
    </div>
  );
};

export default RewardTable;
