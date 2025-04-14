"use client";

import Button from "@/components/common/button";
import { DataTable } from "@/components/common/table";
import { raffleColumnHelper } from "@/components/common/table/columns";
import Title from "@/components/layout/title";
import RaffleInfoConfig from "@/components/pages/dashboard/raffle/raffleInfoConfig";
import RaffleWinnerConfig from "@/components/pages/dashboard/raffle/raffleWinnerConfig";
import {
  CreateRaffleFormData,
  raffleFormSchema,
} from "@/schemas/raffle.schema";
import { RaffleType } from "@/types/columns";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postCreateShellRaffle } from "@/services/dashboard/content/shellRaffle";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRouter } from "next/navigation";

const raffleColumns = [
  raffleColumnHelper.accessor("id", {
    id: "id",
    header: () => <div className="pl-3">ID</div>,
    cell: ({ getValue }) => (
      <div className="flex pl-3">
        {getValue<number>().toString().slice(0, 4)}...
      </div>
    ),
  }),

  raffleColumnHelper.accessor("reward", {
    id: "reward",
    header: "총 리워드(USDT)",
    cell: ({ getValue }) => {
      const reward = getValue<number>();
      return `${reward.toLocaleString()}`;
    },
  }),

  raffleColumnHelper.accessor("entry_fee", {
    id: "entry_fee",
    header: "1회 응모권 비용(Shell)",
    cell: ({ row }) => {
      const { entry_type, entry_fee } = row.original;
      if (entry_type && entry_fee) {
        return `${entry_fee.toLocaleString()} ${entry_type}`;
      }
    },
  }),

  raffleColumnHelper.accessor("participants", {
    id: "participants",
    header: "참여자 수",
    cell: ({ getValue }) => {
      const participants = getValue<number>();
      return participants.toLocaleString();
    },
  }),
] as ColumnDef<RaffleType, unknown>[];

export default function ShellRaffle() {
  return (
    <ErrorBoundary fallback={<div>Error</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <ShellRaffleInner />
      </Suspense>
    </ErrorBoundary>
  );
}

function ShellRaffleInner() {
  const navigation = useRouter();

  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<CreateRaffleFormData>({
    resolver: zodResolver(raffleFormSchema),
    mode: "onChange",
    defaultValues: {
      period: {
        startDate: new Date(), // 또는 dayjs().toDate()
        startTime: dayjs(), // dayjs 객체
        endDate: new Date(), // 또는 dayjs().toDate()
        endTime: dayjs(), // dayjs 객체
      },
      min_participants: 100,
      entry_fee: 1000,
      entry_type: "shell", // 예시

      reward: [
        {
          grade: 1,
          amount: 1000,
          reward_type: "usdt",
          winners: 1,
        },
        {
          grade: 2,
          amount: 100,
          reward_type: "usdt",
          winners: 5,
        },
        {
          grade: 3,
          amount: 50,
          reward_type: "usdt",
          winners: 10,
        },
        {
          grade: 4,
          amount: 10,
          reward_type: "usdt",
          winners: 100,
        },
      ],
    },
  });

  const mutation = useMutation({
    mutationFn: postCreateShellRaffle,
    onSuccess: () => {
      window.alert("래플을 성공적으로 생성하였습니다.");
    },
    onError: () => {
      window.alert("생성 중 에러가 발생하였습니다.");
    },
  });

  // 제출 핸들러.
  const onSubmit = async (data: CreateRaffleFormData) => {
    const confirm = window.confirm(
      "래플을 정말 생성하시겠습니까?\n" +
        `응모 비용: ${data.entry_fee}\n` +
        `최소 인원: ${data.min_participants}\n` +
        `래플 시작시기: ${data.period.startDate}\n` +
        `래플 종료시기: ${data.period.endDate}`
    );
    if (!confirm) return;

    const {
      entry_fee,
      entry_type,
      min_participants,

      reward,
      period,
    } = data;

    const mergedStartDate = dayjs(period.startDate)
      .set("hour", period.startTime.hour())
      .set("minute", period.startTime.minute())
      .set("second", period.startTime.second())
      .set("millisecond", period.startTime.millisecond())
      .toDate()
      .toISOString(); // ← 최종적으로 JS Date 객체로 변환

    const mergedEndDate = dayjs(period.endDate)
      .set("hour", period.endTime.hour())
      .set("minute", period.endTime.minute())
      .set("second", period.endTime.second())
      .set("millisecond", period.endTime.millisecond())
      .toDate()
      .toISOString(); // ← 최종적으로 JS Date 객체로 변환

    // fetching...

    try {
      await mutation.mutateAsync({
        entry_fee,
        entry_type,
        min_participants,
        reward,

        period: {
          start: mergedStartDate,
          end: mergedEndDate,
        },
      });

      navigation.back();
    } catch (err) {
      console.log(err, "shell-draw/new error");
    }
  };

  // 래플 생성 & 수정 버튼
  const SubmitNewRaffleButton = () => (
    <Button variant="fill" onClick={handleSubmit(onSubmit)}>
      <div className="flex h-10 items-center gap-2 p-3">
        <span className="text-body3-semibold">등록하기</span>
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
    console.log(index, "index");
    if (index < 4) return;

    remove(index);
    trigger();
  };

  return (
    <div className="flex gap-8 px-9 py-7">
      {/* 설정 등록 */}
      <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
        {/* 타이틀 */}
        <Title ActionButton={SubmitNewRaffleButton}>Shell Raffle 등록</Title>
        {/* 기본정보 설정 테이블 */}
        <RaffleInfoConfig
          register={register}
          control={control}
          errors={errors}
        />

        {/* 당첨 구성 설정 테이블 */}
        <RaffleWinnerConfig
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
        <DataTable isPageNationOn={false} columns={raffleColumns} data={[]} />
      </div>
    </div>
  );
}
