"use client";

import Button from "@/components/common/button";
import { EdittingTable } from "@/components/common/edittingTable";
import { rouletteColumnHelper } from "@/components/common/edittingTable/columns";
import TableInput from "@/components/common/edittingTable/tableInput";
import Title from "@/components/layout/title";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  CreateRouletteRewardFormData,
  rouletteFormSchema,
} from "@/schemas/roulette.schema";
import {
  getRouletteConfig,
  putUpdateRouletteConfig,
} from "@/services/dashboard/content/roulette";
import { RouletteRewardType } from "@/types/roulette";
import { parseDefaultRouletteValues } from "@/utils/getDefaultRouletteValues";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { LucideCheck, LucideTrash2 as TrashIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useFieldArray, useForm } from "react-hook-form";

export default function Roulette() {
  return (
    <ErrorBoundary
      fallbackRender={(error) => <div>에러: {JSON.stringify(error.error)}</div>}
    >
      <Suspense fallback={<></>}>
        <RouletteInner />
      </Suspense>
    </ErrorBoundary>
  );
}

function RouletteInner() {
  const router = useRouter();
  const pathname = usePathname();

  // 1. 데이터 패칭
  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_ROULETTE_CONFIG,
    queryFn: getRouletteConfig,
  });

  // 2. 테이블 데이터로 변환
  const {
    register,
    control,
    handleSubmit,

    formState: { errors },
  } = useForm<CreateRouletteRewardFormData>({
    resolver: zodResolver(rouletteFormSchema),
    mode: "onChange",
    defaultValues: parseDefaultRouletteValues(data),
  });

  // 3. 테이블 데이터 배열 동적 관리
  const { fields, append, remove } = useFieldArray({
    control,
    name: "reward",
  });

  // 4. HEADER / CELL 메타 정보
  const rouletteColumns = [
    rouletteColumnHelper.accessor("liveBar", {
      id: "liveBar",
      header: () => <div className="pl-3">라이브바</div>,
      cell: ({ row }) => (
        <label className="flex justify-start pl-3">
          <input
            type="checkbox"
            {...register(`reward.${row.index}.liveBar`)}
            className="peer hidden"
          />
          <div
            className={`w-4 h-4 rounded-xs border border-stroke-secondary bg-background-primary peer-checked:border-none peer-checked:bg-blue-500`}
          />
          <LucideCheck
            size={12}
            className="w-4 h-4 peer-checked:opacity-100 opacity-0 absolute"
          />
        </label>
      ),
    }),

    rouletteColumnHelper.accessor("amount", {
      id: "amount",
      header: "리워드 양",
      cell: ({ row }) => {
        return <TableInput {...register(`reward.${row.index}.amount`)} />;
      },
    }),

    rouletteColumnHelper.accessor("reward_type", {
      id: "reward_type",
      header: "리워드 분류",
      cell: ({ getValue }) => {
        const reward = getValue<number>();
        return reward;
      },
    }),

    rouletteColumnHelper.accessor("chance", {
      id: "chance",
      header: "당첨 확률",
      cell: ({ row }) => {
        return <TableInput {...register(`reward.${row.index}.chance`)} />;
      },
    }),

    rouletteColumnHelper.display({
      id: "delete",
      header: "삭제",
      cell: ({ row }) => {
        return (
          <Button
            variant="unstyled"
            onClick={() => {
              console.log(row.index, "row.index");
            }}
          >
            <TrashIcon size={16} />
          </Button>
        );
      },
    }),
  ] as ColumnDef<RouletteRewardType, unknown>[];

  const mutation = useMutation({
    mutationFn: putUpdateRouletteConfig,
    onSuccess: () => {
      window.alert("룰렛 구성을 성공적으로 수정하였습니다.");
    },
    onError: () => {
      window.alert("수정 중 에러가 발생하였습니다.");
    },
  });
  const onSubmit = (submittedData: RouletteRewardType[]) => {};

  // 수정 완료 버튼
  const EditCompleteButton = () => {
    const handleNavigateNewRaffle = () => {
      router.push(pathname + "/new");
    };

    return (
      <Button variant="fill" onClick={handleSubmit(onSubmit)}>
        <div className="flex h-10 items-center gap-2 px-6">
          <span className="text-body3-medium">수정</span>
        </div>
      </Button>
    );
  };

  return (
    <div className="px-9 py-7">
      <Title ActionButton={EditCompleteButton}>Roulette / Live Bar</Title>

      {/* 설정 등록 */}
      <form className="flex flex-1 gap-5">
        <div className="flex-3/5">
          {/* 타이틀 */}
          <Title fontSize="text-head2">Roulette Reward 수정</Title>

          {/* 룰렛 구성 설정 테이블 */}

          <EdittingTable columns={rouletteColumns} data={fields} />
        </div>

        <div className="flex-2/5">
          {/* 타이틀 */}
          <Title fontSize="text-head2">결과</Title>
        </div>
      </form>
    </div>
  );
}
