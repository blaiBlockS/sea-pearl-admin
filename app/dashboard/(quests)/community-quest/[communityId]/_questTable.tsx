import { ColumnDef } from "@tanstack/react-table";
import { subQuestColumnHelper } from "@/components/common/table/columns";
import { DataTable } from "@/components/common/table";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKey";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import {
  getSubQuestsByCommunityId,
  putToggleSubQuest,
} from "@/services/dashboard/quest/communityQuest/subQuest";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import usePageData from "@/hook/usePageData";
import Button from "@/components/common/button";
import { QuestConfigType } from "@/schemas/quest.schema";

interface QuestTableProps {
  id: string;
}

const QuestTable = ({ id }: QuestTableProps) => {
  return (
    <ErrorBoundary fallback={<QuestTableFallback />}>
      <Suspense fallback={<QuestTableFallback />}>
        {/* id가 있어야 실행 */}
        {id && <QuestTableInner id={id} />}
      </Suspense>
    </ErrorBoundary>
  );
};

const QuestTableFallback = () => {
  const raffleColumns = [
    subQuestColumnHelper.accessor("id", {
      id: "id",
      header: () => <div className="pl-3">번호</div>,
      size: 50,
      cell: ({ row }) => <div className="flex pl-3">{row.index + 1}</div>,
    }),

    subQuestColumnHelper.accessor("enabled", {
      id: "isPubliclyExposed",
      header: () => <div className="pl-3">노출 여/부</div>,
      size: 100,
      cell: ({ row }) => {
        const title = row.original.title;
        const id = row.original.id;
        const enabled = row.original.enabled;

        // enabled 로 기본값
        return (
          <div className="flex pl-3">
            <Switch id="exposeEnabled" checked={enabled} disabled />
          </div>
        );
      },
    }),

    subQuestColumnHelper.accessor("title", {
      id: "title",
      header: "퀘스트명",
      cell: ({ getValue }) => {
        const questName = getValue<string>();
        return questName;
      },
    }),

    subQuestColumnHelper.accessor("questLogo", {
      id: "questLogo",
      header: "퀘스트 분류",
      size: 100,
      cell: ({ getValue }) => {
        const questLogo = getValue<string>();
        return questLogo ?? "-";
      },
    }),

    subQuestColumnHelper.accessor("reward", {
      id: "reward",
      header: "퀘스트 총 보상",
      size: 100,
      cell: ({ row }) => {
        const { reward } = row.original;
        let shell: number = 0;
        let pearl: number = 0;

        if (Array.isArray(reward)) {
          reward.forEach((item) => {
            const { amount, type } = item;

            if (type === "shell") {
              shell += amount;
            } else if (type === "pearl") {
              pearl += amount;
            }
          });
        }

        return (
          <div className="flex flex-col">
            <span>{shell} shell</span>
            <span>{pearl} pearl</span>
          </div>
        );
      },
    }),

    subQuestColumnHelper.accessor("archivedPeople", {
      id: "archivedPeople_maxParticipants",
      header: "참여자 수",
      size: 100,
      cell: ({ row }) => {
        const { archivedPeople, maxParticipants } = row.original;

        return (
          <span>
            {archivedPeople} / {maxParticipants}
          </span>
        );
      },
    }),

    subQuestColumnHelper.accessor("start", {
      id: "start",
      header: "노출 시작 일시",
      size: 100,
      cell: ({ getValue }) => {
        const start = getValue<string>();

        return (
          <div>
            <div>{start ? format(start, "yy-MM-dd") : "-"}</div>
            <div>{start ? format(start, "HH:mm:ss") : "-"}</div>
          </div>
        );
      },
    }),

    subQuestColumnHelper.accessor("end", {
      id: "end",
      header: "노출 종료 일시",
      size: 100,
      cell: ({ getValue }) => {
        const end = getValue<string>();
        return (
          <div>
            <div>{end ? format(end, "yy-MM-dd") : "-"}</div>
            <div>{end ? format(end, "HH:mm:ss") : "-"}</div>
          </div>
        );
      },
    }),

    subQuestColumnHelper.display({
      id: "toDetailPage",
      header: "",
      size: 50,
      cell: ({ row }) => (
        <div className="flex justify-end pr-3">
          <Button
            variant="fill"
            className="bg-button-secondary hover:bg-button-disabled h-10 px-4"
          >
            상세보기
          </Button>
        </div>
      ),
    }),
  ] as ColumnDef<QuestConfigType, unknown>[];

  return (
    <DataTable columns={raffleColumns} data={[]} noDataText={"No Quests"} />
  );
};

// INNER
const QuestTableInner = ({ id }: { id: string }) => {
  const raffleColumns = [
    subQuestColumnHelper.accessor("id", {
      id: "id",
      header: () => <div className="pl-3">번호</div>,
      size: 50,
      cell: ({ row }) => <div className="flex pl-3">{row.index + 1}</div>,
    }),

    subQuestColumnHelper.accessor("enabled", {
      id: "isPubliclyExposed",
      header: () => <div className="pl-3">노출 여/부</div>,
      size: 100,
      cell: ({ row }) => {
        const title = row.original.title;
        const id = row.original.id;
        const enabled = row.original.enabled;

        // enabled 로 기본값
        return (
          <div className="flex pl-3">
            <Switch
              id="exposeEnabled"
              checked={enabled}
              onCheckedChange={() => subQuestToggleMutation.mutate({ id })}
            />
          </div>
        );
      },
    }),

    subQuestColumnHelper.accessor("title", {
      id: "title",
      header: "퀘스트명",
      cell: ({ getValue }) => {
        const questName = getValue<string>();
        return questName;
      },
    }),

    subQuestColumnHelper.accessor("questLogo", {
      id: "questLogo",
      header: "퀘스트 분류",
      size: 100,
      cell: ({ getValue }) => {
        const questLogo = getValue<string>();
        return questLogo ?? "-";
      },
    }),

    subQuestColumnHelper.accessor("reward", {
      id: "reward",
      header: "퀘스트 총 보상",
      size: 100,
      cell: ({ row }) => {
        const { reward } = row.original;
        let shell: number = 0;
        let pearl: number = 0;

        if (Array.isArray(reward)) {
          reward.forEach((item) => {
            const { amount, type } = item;

            if (type === "shell") {
              shell += amount;
            } else if (type === "pearl") {
              pearl += amount;
            }
          });
        }

        return (
          <div className="flex flex-col">
            <span>{shell} shell</span>
            <span>{pearl} pearl</span>
          </div>
        );
      },
    }),

    subQuestColumnHelper.accessor("archivedPeople", {
      id: "archivedPeople_maxParticipants",
      header: "참여자 수",
      size: 100,
      cell: ({ row }) => {
        const { archivedPeople, maxParticipants } = row.original;

        return (
          <span>
            {archivedPeople} / {maxParticipants}
          </span>
        );
      },
    }),

    subQuestColumnHelper.accessor("start", {
      id: "start",
      header: "노출 시작 일시",
      size: 100,
      cell: ({ getValue }) => {
        const start = getValue<string>();

        return (
          <div>
            <div>{start ? format(start, "yy-MM-dd") : "-"}</div>
            <div>{start ? format(start, "HH:mm:ss") : "-"}</div>
          </div>
        );
      },
    }),

    subQuestColumnHelper.accessor("end", {
      id: "end",
      header: "노출 종료 일시",
      size: 100,
      cell: ({ getValue }) => {
        const end = getValue<string>();
        return (
          <div>
            <div>{end ? format(end, "yy-MM-dd") : "-"}</div>
            <div>{end ? format(end, "HH:mm:ss") : "-"}</div>
          </div>
        );
      },
    }),

    subQuestColumnHelper.display({
      id: "toDetailPage",
      header: "",
      size: 50,
      cell: ({ row }) => (
        <div className="flex justify-end pr-3">
          <Button
            variant="fill"
            className="bg-button-secondary hover:bg-button-disabled h-10 px-4"
            onClick={() => router.push(pathname + `/${row.original.id}`)}
          >
            상세보기
          </Button>
        </div>
      ),
    }),
  ] as ColumnDef<QuestConfigType, unknown>[];

  const queryClient = useQueryClient();

  const subQuestToggleMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => putToggleSubQuest({ id }),
    onSuccess: () => {
      window.alert("수정 완료.");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.GET_COMMUNITY_QUEST_SUB_QUESTS(id),
      });
    },
    onError: () => {
      window.alert("수정 중 에러가 발생하였습니다.");
    },
  });

  const { pathname } = usePageData();
  const router = useRouter();

  // 커뮤니티 퀘스트 단일 데이터 조회
  const { data: communityQuestData } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_COMMUNITY_QUEST_SUB_QUESTS(id),
    queryFn: () => getSubQuestsByCommunityId(id),
  });

  return <DataTable columns={raffleColumns} data={communityQuestData} />;
};

export default QuestTable;
