"use client";

import Button from "@/components/common/button";
import { DataTable } from "@/components/common/table";
import { winnerColumnHelper } from "@/components/common/table/columns";
import Title from "@/components/layout/title";
import RaffleInfoConfig from "@/components/pages/dashboard/raffle/raffleInfoConfig";
import RaffleWinnerConfig from "@/components/pages/dashboard/raffle/raffleWinnerConfig";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  CreateRaffleFormData,
  raffleFormSchema,
  Winner,
} from "@/schemas/raffle.schema";
import {
  getUpdatePearlRaffle,
  postUpdatePearlRaffle,
} from "@/services/dashboard/content/pearlRaffle";
import { updateDisabledParser } from "@/utils/convertStatus";
import { getDefaultValues } from "@/utils/getDefaultValues";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useFieldArray, useForm } from "react-hook-form";

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

export default function PearlRaffle() {
  return (
    <ErrorBoundary fallback={<div>Error</div>}>
      <Suspense fallback={<div>...</div>}>
        <PearlRaffleDetailInner />
      </Suspense>
    </ErrorBoundary>
  );
}

function PearlRaffleDetailInner() {
  const { id } = useParams();

  if (typeof id !== "string") {
    throw new Error("Error");
  }

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_PEARL_RAFFLE_DETAIL(id),
    queryFn: () => getUpdatePearlRaffle(id),
    refetchOnWindowFocus: true,
  });

  const disabled = updateDisabledParser(data.status);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<CreateRaffleFormData>({
    resolver: zodResolver(raffleFormSchema),
    mode: "onChange",
    defaultValues: getDefaultValues(data),
  });

  const mutation = useMutation({
    mutationFn: postUpdatePearlRaffle,
    onSuccess: () => {
      window.alert("해당 래플을 성공적으로 수정하였습니다.");
    },
    onError: () => {
      window.alert("수정 중 에러가 발생하였습니다.");
    },
  });

  // 제출 핸들러.
  const onSubmit = (submitData: CreateRaffleFormData) => {
    const confirm = window.confirm(
      "래플을 정말 생성하시겠습니까?\n" +
        `응모 비용: ${submitData.entry_fee}\n` +
        `최소 인원: ${submitData.min_participants}\n` +
        `래플 시작시기: ${submitData.period.startDate}\n` +
        `래플 종료시기: ${submitData.period.endDate}`
    );
    if (!confirm) return;

    const {
      entry_fee,
      entry_type,
      min_participants,

      reward,
      period,
    } = submitData;

    const mergedStartDate = dayjs(period.startDate)
      .set("hour", period.startTime.hour())
      .set("minute", period.startTime.minute())
      .set("second", period.startTime.second())
      .set("millisecond", period.startTime.millisecond())
      .toDate()
      .toISOString(); // ← 최종적으로 JS Date 객체로 변환

    const mergedEndDate = dayjs(period.startDate)
      .set("hour", period.startTime.hour())
      .set("minute", period.startTime.minute())
      .set("second", period.startTime.second())
      .set("millisecond", period.startTime.millisecond())
      .toDate()
      .toISOString(); // ← 최종적으로 JS Date 객체로 변환

    mutation.mutate({
      id,
      entry_fee,
      entry_type,
      min_participants,
      reward,

      period: {
        start: mergedStartDate,
        end: mergedEndDate,
      },
    });
  };

  // 래플 생성 & 수정 버튼
  const SubmitNewRaffleButton = () => (
    <Button
      variant="fill"
      onClick={handleSubmit(onSubmit)}
      disabled={disabled}
      className={disabled ? "opacity-50" : ""}
    >
      <div className="flex h-10 items-center gap-2 p-3">
        <span className="text-body3-semibold">수정하기</span>
      </div>
    </Button>
  );

  const {
    fields: winnerFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "reward",
  });

  // 행 추가 핸들러
  const handleAddButton = () => {
    if (winnerFields.length >= 10) return;

    append({
      grade: winnerFields.length + 1,
      reward_type: "usdt",
      winners: 0,
      amount: 0,
    });
  };
  // 행 제거 핸들러
  const handleSubButton = (index: number) => {
    if (index < 4) return;

    remove(index);
    trigger();
  };

  return (
    <div className="flex gap-8 px-9 py-7">
      {/* 설정 등록 */}
      <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
        {/* 타이틀 */}
        <Title ActionButton={SubmitNewRaffleButton}>Pearl Raffle 수정</Title>

        {/* 기본정보 설정 테이블 */}
        <RaffleInfoConfig
          register={register}
          control={control}
          errors={errors}
        />

        {/* 당첨 구성 설정 테이블 */}
        <RaffleWinnerConfig
          disabled={disabled}
          control={control}
          register={register}
          onPressAddButton={handleAddButton}
          onPressSubButton={handleSubButton}
          winnerCols={winnerFields}
        />
      </form>

      {/* 결과 조회 */}
      <div className="flex-1">
        {/* 타이틀 */}
        <Title>결과</Title>

        {/* 결과 테이블 */}
        <DataTable
          isPageNationOn={false}
          columns={raffleColumns}
          data={data.winners}
        />
      </div>
    </div>
  );
}
