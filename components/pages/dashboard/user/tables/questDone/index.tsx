import { PagenationDeck } from "@/components/common/pagenation";
import { DataTable } from "@/components/common/table";
import { userQuestDoneColumnHelper } from "@/components/common/table/columns";
import { QUERY_KEY } from "@/constants/queryKey";
import usePageData from "@/hook/usePageData";
import { getUserQuestDone } from "@/services/dashboard/user";
import { RaffleType } from "@/types/columns";
import { UserQuestDoneType } from "@/types/user";
import { convertPageIndex } from "@/utils/covertPageIndex";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const QuestDoneTable = () => {
  return (
    <ErrorBoundary
      fallbackRender={(error) => <div>에러: {JSON.stringify(error.error)}</div>}
    >
      <Suspense fallback={<QuestDoneTableFallback />}>
        <QuestDoneTableInner />
      </Suspense>
    </ErrorBoundary>
  );
};

const QuestDoneTableFallback = () => {
  const { pageSize, pageIndex, pathname } = usePageData({});

  return <></>;
};

const QuestDoneTableInner = () => {
  const QUEST_DONE_PAGE = "questDonePage";
  const QUEST_DONE_SIZE = "questDoneSize";

  const { pageSize, pageIndex } = usePageData({
    customPageIndexKey: QUEST_DONE_PAGE,
    customPageSizeKey: QUEST_DONE_SIZE,
  });

  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const userUsdtExpenseColumns = [
    userQuestDoneColumnHelper.accessor("id", {
      id: "id",
      header: () => <div className="pl-3">ID</div>,
      enableResizing: false, //disable resizing for just this column

      cell: ({ row }) => (
        <div className="flex pl-3">
          {convertPageIndex(row.index, pageIndex)}
        </div>
      ),
    }),

    userQuestDoneColumnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => "완료 일시",

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

    userQuestDoneColumnHelper.accessor("projectName", {
      id: "projectName",
      header: "프로젝트명",

      cell: ({ getValue }) => {
        const to = getValue<string>();
        return to ? to.toLocaleString() : "-";
      },
    }),

    userQuestDoneColumnHelper.accessor("questName", {
      id: "questName",
      header: "퀘스트명",

      cell: ({ getValue }) => {
        const to = getValue<string>();
        return to ? to.toLocaleString() : "-";
      },
    }),

    userQuestDoneColumnHelper.accessor("rewardType", {
      id: "rewardType",
      header: "리워드 분류",

      cell: ({ getValue }) => {
        const to = getValue<number>();
        return to ? to.toLocaleString() : "-";
      },
    }),

    userQuestDoneColumnHelper.accessor("rewardAmount", {
      id: "rewardAmount",
      header: "리워드 개수",

      cell: ({ getValue }) => {
        const to = getValue<number>();
        return to ? to.toLocaleString() : "-";
      },
    }),
  ] as ColumnDef<UserQuestDoneType, unknown>[];

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_USER_QUEST_DONE(id, pageIndex, pageSize),
    queryFn: () => getUserQuestDone(id, pageIndex, pageSize, "desc"),
    refetchOnWindowFocus: true,
  });

  console.log(data, "questDone data");

  let totalPages = 1;
  if (pageSize && data.totalCount) {
    totalPages = Math.ceil(data.totalCount / pageSize);
  }

  return (
    <div className="">
      {/* 테이블 */}
      <DataTable columns={userUsdtExpenseColumns} data={data.data} />
      <PagenationDeck
        currentPageKeyAlias={QUEST_DONE_PAGE}
        totalPageKeyAlias={QUEST_DONE_SIZE}
        currentPage={pageIndex}
        totalPages={totalPages}
      />
    </div>
  );
};

export default QuestDoneTable;
