"use client";

import { winnerColumnHelper } from "@/components/common/table/columns";
import { ColumnDef } from "@tanstack/react-table";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { useParams } from "next/navigation";
import Title from "@/components/layout/title";
import { useRouter } from "next/navigation";
import usePageData from "@/hook/usePageData";
import Button from "@/components/common/button";
import { PlusIcon } from "lucide-react";
import Input from "@/components/common/input";
import { DataTable } from "@/components/common/table";

export type Winner = {
  grade: number;
  name: string;
  reward: number;
  handle: string | null;
  lotto_number: string;
}[];

const raffleColumns = [
  winnerColumnHelper.accessor("grade", {
    id: "grade",
    header: () => <div className="pl-3">등수</div>,
    cell: ({ getValue }) => (
      <div className="flex pl-3">{getValue<number>()}</div>
    ),
  }),

  winnerColumnHelper.accessor("name", {
    id: "reward",
    header: "USDT",
    cell: ({ getValue }) => {
      const name = getValue<string>();
      return name;
    },
  }),

  winnerColumnHelper.accessor("reward", {
    id: "name",
    header: "Telegram Name",
    cell: ({ getValue }) => {
      const reward = getValue<number>();
      return reward;
    },
  }),

  winnerColumnHelper.accessor("handle", {
    id: "Telegram Handle",
    header: "Telegram Handle",
    cell: ({ getValue }) => {
      const handle = getValue<string>();

      console.log(handle, "handle");
      return handle ?? "-";
    },
  }),

  winnerColumnHelper.accessor("lotto_number", {
    id: "lotto_number",
    header: "Lotto Number",
    cell: ({ getValue }) => {
      const lottoNumber = getValue<number>();
      return lottoNumber;
    },
  }),
] as ColumnDef<Winner, unknown>[];

export default function CommunityQuestInfo() {
  return (
    <ErrorBoundary fallback={<div>Error</div>}>
      <Suspense fallback={<div>...</div>}>
        <CommunityQuestInfoInner />
      </Suspense>
    </ErrorBoundary>
  );
}

function CommunityQuestInfoInner() {
  const { id } = useParams();
  const router = useRouter();
  const { pathname } = usePageData();

  // useForm

  // 수정 버튼
  const EditButton = () => {
    const handleNavigateNewRaffle = () => {
      router.push(pathname + "/new");
    };

    return (
      <Button variant="fill" onClick={handleNavigateNewRaffle}>
        <div className="flex h-10 items-center gap-2 px-5">
          <span className="text-body3-medium">수정</span>
        </div>
      </Button>
    );
  };

  // 삭제 버튼
  const RemoveButton = () => {
    const handleNavigateNewRaffle = () => {
      router.push(pathname + "/new");
    };

    return (
      <Button
        variant="fill"
        className="bg-button-secondary"
        onClick={handleNavigateNewRaffle}
      >
        <div className="flex h-10 items-center gap-2 px-5">
          <span className="text-body3-medium">프로젝트 삭제</span>
        </div>
      </Button>
    );
  };

  // 새로운 래플 생성 버튼
  const NewQuestButton = () => {
    const handleNavigateNewRaffle = () => {
      router.push(pathname + "/new");
    };

    return (
      <Button variant="fill" onClick={handleNavigateNewRaffle}>
        <div className="flex h-10 items-center gap-2 pl-2 pr-3">
          <PlusIcon size={20} />
          <span className="text-body3-medium">New Quest</span>
        </div>
      </Button>
    );
  };

  return (
    <div className="px-9 py-7 flex flex-col gap-8">
      {/* 페이지 타이틀 */}
      <Title SubButton={RemoveButton}>Community Quest</Title>

      {/* 페이지 그리드 */}
      <div className="flex gap-8">
        {/* LEFT */}
        <div className="h-full w-3/7">
          {/* 프로젝트 수정 */}
          <Title fontSize="text-head2" ActionButton={EditButton}>
            프로젝트 수정
          </Title>

          {/* 커뮤니티 프로젝트 총 수정 요소 */}
          <div className="flex flex-1 flex-col rounded-lg gap-5 p-8 min-h-50 bg-background-secondary border border-stroke-secondary">
            {/* 프로젝트 순번 */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-body2 flex-1 max-w-1/5">프로젝트 순번</span>
              <div className="flex flex-1 max-w-4/5 gap-4">
                <Input
                  type="number"
                  inputClassName="h-10 input-no-spinner"
                  placeholder="Enter quantity"
                  // hint={errors?.questNumber?.message}
                  // {...register("questNumber", { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* 프로젝트 명 */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-body2 flex-1 max-w-1/5">프로젝트 명</span>
              <div className="flex flex-1 max-w-4/5 gap-4">
                <Input
                  type="number"
                  inputClassName="h-10 input-no-spinner"
                  placeholder="Enter quantity"
                  // hint={errors?.questNumber?.message}
                  // {...register("questNumber", { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* 로고 */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-body2 flex-1 max-w-1/5">로고</span>
              <div className="flex flex-1 max-w-4/5 gap-4">
                <Input
                  type="number"
                  inputClassName="h-10 input-no-spinner"
                  placeholder="Enter quantity"
                  // hint={errors?.questNumber?.message}
                  // {...register("questNumber", { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="h-full w-4/7">
          {/* 프로젝트 수정 */}
          <Title fontSize="text-head2" ActionButton={NewQuestButton}>
            퀘스트
          </Title>

          {/* 프로젝트 수정 */}
          <DataTable columns={raffleColumns} data={[]} />
        </div>
      </div>
    </div>
  );
}
