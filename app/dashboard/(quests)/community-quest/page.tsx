"use client";

import Button from "@/components/common/button";
import { DataTable } from "@/components/common/table";
import {
  communityQuestColumnHelper,
  raffleColumnHelper,
} from "@/components/common/table/columns";
import Title from "@/components/layout/title";
import { Switch } from "@/components/ui/switch";
import { QUERY_KEY } from "@/constants/queryKey";
import usePageData from "@/hook/usePageData";
import {
  getAllCommunityQuests,
  postUpdateCommunityQuestToggle,
} from "@/services/dashboard/quest/communityQuest";
import { CommunityQuestType } from "@/types/communityQuest";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function CommunityQuest() {
  return (
    <ErrorBoundary
      fallbackRender={(error) => <div>에러: {JSON.stringify(error.error)}</div>}
    >
      <Suspense fallback={<></>}>
        <CommunityQuestInner />
      </Suspense>
    </ErrorBoundary>
  );
}

function CommunityQuestInner() {
  const router = useRouter();
  const { pathname } = usePageData();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => postUpdateCommunityQuestToggle(id),
    onSuccess: () => {
      window.alert("수정 성공");
    },
    onError: () => {
      window.alert("수정 중 에러가 발생하였습니다.");
    },
  });

  const handleToggleCommunityQuestExposion = async (
    id: string,
    title: string,
    enabled: boolean
  ) => {
    const confirm = window.confirm(
      `정말 ${title}을 ${enabled ? "끄" : "켜"}시겠습니까?`
    );

    if (confirm) {
      await mutation.mutateAsync(id);

      // 수정 후 invalidate로 재패칭
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.GET_COMMUNITY_QUESTS,
      });
    }
  };

  const raffleColumns = [
    communityQuestColumnHelper.accessor("id", {
      id: "id",
      header: () => <div className="pl-3">번호</div>,
      enableResizing: false,
      size: 50,
      cell: ({ row }) => <div className="flex pl-3">{row.index + 1}</div>,
    }),

    communityQuestColumnHelper.accessor("enabled", {
      id: "isPubliclyExposed",
      header: () => <div className="pl-3">노출 여/부</div>,
      size: 100,
      cell: ({ row }) => {
        const title = row.original.name;
        const id = row.original.id;
        const enabled = row.original.enabled;

        // enabled 로 기본값
        return (
          <div className="flex pl-3">
            <Switch
              id="exposeEnabled"
              checked={enabled}
              onCheckedChange={() =>
                handleToggleCommunityQuestExposion(id, title, enabled)
              }
            />
          </div>
        );
      },
    }),

    communityQuestColumnHelper.accessor("name", {
      id: "name",
      header: "프로젝트명",
      size: 200,
      cell: ({ getValue }) => {
        const projectName = getValue<string>();
        return `${projectName}`;
      },
    }),

    communityQuestColumnHelper.accessor("logo", {
      id: "logo",
      header: "로고",
      size: 100,
      cell: ({ getValue }) => {
        const logo = getValue<string>();
        // TODO: 수정
        return logo ? (
          <Image src={logo} alt="logo" width={24} height={24} />
        ) : (
          <></>
        );
      },
    }),

    communityQuestColumnHelper.accessor("quests", {
      id: "quests",
      header: "퀘스트 개수",
      size: 100,
      cell: ({ getValue }) => {
        const questNumber = getValue<number>();
        // TODO: 수정
        return `${questNumber?.toLocaleString()}`;
      },
    }),

    communityQuestColumnHelper.accessor("rewards", {
      id: "reward",
      header: "퀘스트 총 보상",
      size: 100,
      cell: ({ row }) => {
        const { rewards } = row.original;
        let shell: number = 0;
        let pearl: number = 0;

        if (Array.isArray(rewards)) {
          rewards.forEach((item) => {
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

    communityQuestColumnHelper.accessor("period.start", {
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

    communityQuestColumnHelper.accessor("period.end", {
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

    raffleColumnHelper.display({
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
  ] as ColumnDef<CommunityQuestType, unknown>[];

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_COMMUNITY_QUESTS,
    queryFn: getAllCommunityQuests,
  });

  // 새로운 래플 생성 버튼
  const NewQuestButton = () => {
    const handleNavigateNewRaffle = () => {
      router.push(pathname + "/new");
    };

    return (
      <Button variant="fill" onClick={handleNavigateNewRaffle}>
        <div className="flex h-10 items-center gap-2 pr-3 pl-2">
          <PlusIcon size={20} />
          <span className="text-body3-medium">New Quest</span>
        </div>
      </Button>
    );
  };

  return (
    <div className="px-9 py-7">
      {/* 타이틀 */}
      <Title ActionButton={NewQuestButton}>커뮤니티 퀘스트</Title>

      {/* 테이블 */}
      <DataTable
        columns={raffleColumns}
        data={data?.filter((item) => item.name !== "Block s") ?? []}
      />
    </div>
  );
}
