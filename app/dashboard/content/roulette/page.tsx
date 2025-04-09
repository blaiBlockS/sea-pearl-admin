"use client";

import Button from "@/components/common/button";
import CheckBox from "@/components/common/checkbox";
import { EdittingTable } from "@/components/common/edittingTable";
import { rouletteColumnHelper } from "@/components/common/edittingTable/columns";
import TableInput from "@/components/common/edittingTable/tableInput";
import { SelectBox } from "@/components/common/selectBox";
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
import { LucideTrash2 as TrashIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";

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
    watch,
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

  const handleAppend = () => {
    append({
      liveBar: false,
      amount: 0,
      reward_type: "usdt",
      chance: 0,
    });
  };

  // 4. HEADER / CELL 메타 정보
  const rouletteColumns = [
    rouletteColumnHelper.display({
      id: "id",
      header: () => <div className="pl-3">번호</div>,
      cell: ({ row }) => {
        return <div className="pl-3">{row.index + 1}</div>;
      },
    }),

    rouletteColumnHelper.accessor("liveBar", {
      id: "liveBar",
      header: () => <div>라이브바</div>,
      cell: ({ row }) => (
        <CheckBox {...register(`reward.${row.index}.liveBar`)} />
      ),
    }),

    rouletteColumnHelper.accessor("amount", {
      id: "amount",
      header: "리워드 양",
      cell: ({ row }) => {
        return (
          <TableInput
            {...register(`reward.${row.index}.amount`, { valueAsNumber: true })}
          />
        );
      },
    }),

    rouletteColumnHelper.accessor("reward_type", {
      id: "reward_type",
      header: "리워드 분류",
      cell: ({ row }) => {
        return (
          <Controller
            name={`reward.${row.index}.reward_type`}
            control={control}
            defaultValue="usdt"
            render={({ field: { onChange, value } }) => (
              <SelectBox onValueChange={onChange} value={value} />
            )}
          />
        );
      },
    }),

    rouletteColumnHelper.accessor("chance", {
      id: "chance",
      header: "당첨 확률",
      cell: ({ row }) => {
        return (
          <TableInput
            {...register(`reward.${row.index}.chance`, { valueAsNumber: true })}
          />
        );
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
              remove(row.index);
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
  const onSubmit = (submittedData: CreateRouletteRewardFormData) => {};

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

          <EdittingTable //
            columns={rouletteColumns}
            data={fields}
            onAppend={handleAppend}
            watch={watch}
          />
        </div>

        <div className="flex-2/5">
          {/* 타이틀 */}
          <Title fontSize="text-head2">결과</Title>
        </div>
      </form>
    </div>
  );
}
