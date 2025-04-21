"use client";

import Button from "@/components/common/button";
import Title from "@/components/layout/title";
import QuestForm from "@/components/pages/dashboard/quests/seaPearl/seaPearlQuestForm";
import { QuestConfigType, questSchema } from "@/schemas/quest.schema";
import { postCreateSeaPearlQuest } from "@/services/dashboard/quest/seaPearlQuest";
import { combineDateAndTime } from "@/utils/combineDateAndTime";
import { getDefaultSubQuestValues } from "@/utils/getDefaultSubQuestValues";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";

export default function NewSeaPearlQuest() {
  return (
    <ErrorBoundary
      fallbackRender={(error) => <div>에러: {JSON.stringify(error.error)}</div>}
    >
      <Suspense fallback={<></>}>
        <NewSeaPearlQuestInner />
      </Suspense>
    </ErrorBoundary>
  );
}

function NewSeaPearlQuestInner() {
  const router = useRouter();

  const startDay = new Date(2024, 12, 31, 0, 0);
  const endDay = new Date(2050, 12, 31, 0, 0);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<QuestConfigType>({
    resolver: zodResolver(questSchema),
    mode: "onChange",
    defaultValues: {
      enabled: false,
      period: {
        startDate: new Date(2024, 12, 31, 0, 0),
        startTime: new Date(2050, 12, 31, 0, 0), // dayjs 객체
        endDate: new Date(2050, 12, 31, 0, 0), // 또는 dayjs().toDate()
        endTime: new Date(2050, 12, 31, 0, 0),
      },
      questLogo: "check-in",
      questNumber: 100,
      resetCycle: "daily",
      reward: [
        {
          amount: 0,
          type: "shell",
        },
      ],
      roundInCycle: 1,
      title: "",
      url: undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: postCreateSeaPearlQuest,
    onSuccess: () => {
      window.alert("퀘스트를 성공적으로 등록하였습니다.");
    },
    onError: () => {
      window.alert("생성 중 에러가 발생하였습니다.");
    },
  });

  // 제출 핸들러.
  const onSubmit = (submitData: QuestConfigType) => {
    const confirm = window.confirm(
      "퀘스트을 정말 생성하시겠습니까?\n" +
        `퀘스트 제목: ${submitData.title}\n` +
        `최대 인원: ${submitData.maxParticipants}\n` +
        `래플 시작시기: ${submitData.period.startDate}\n` +
        `래플 종료시기: ${submitData.period.endDate}`
    );
    if (!confirm) return;

    const {
      enabled,
      questNumber,
      title,

      questLogo,

      reward,
      url,
      resetCycle,
      roundInCycle,
      maxParticipants,

      period,
    } = submitData;

    const mergedStartDate = combineDateAndTime(
      period.startDate,
      period.startTime
    ).toISOString(); // ← 최종적으로 JS Date 객체로 변환

    const mergedEndDate = combineDateAndTime(
      period.endDate,
      period.endTime
    ).toISOString(); // ← 최종적으로 JS Date 객체로 변환

    mutation.mutate({
      questNumber,
      title,
      questLogo,
      reward,
      url,
      resetCycle,
      roundInCycle,
      maxParticipants,
      enabled,

      period: {
        start: mergedStartDate,
        end: mergedEndDate,
      },
    });
  };

  // 새로운 래플 생성 버튼
  const NewQuestButton = () => {
    return (
      <Button variant="fill" onClick={handleSubmit(onSubmit)}>
        <div className="flex h-10 items-center gap-2 px-3">
          <span className="text-body3-medium">등록</span>
        </div>
      </Button>
    );
  };

  // 뒤로가기 버튼
  const SubButton = () => {
    const handleNavigateNewRaffle = () => {
      router.back();
    };

    return (
      <Button
        variant="fill"
        onClick={handleNavigateNewRaffle}
        className="bg-button-secondary hover:bg-button-secondary/50"
      >
        <div className="flex h-10 items-center gap-2 px-3">
          <span className="text-body3-medium">취소</span>
        </div>
      </Button>
    );
  };

  return (
    <div className="px-9 py-7 max-w-5/8">
      {/* TITLE */}
      <Title ActionButton={NewQuestButton} SubButton={SubButton}>
        Sea Pearl 퀘스트 등록
      </Title>

      {/* QUEST CONFIG SETTING */}
      <QuestForm register={register} control={control} errors={errors} />
    </div>
  );
}
