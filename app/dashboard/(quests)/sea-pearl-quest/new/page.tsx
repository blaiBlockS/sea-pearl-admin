"use client";

import Button from "@/components/common/button";
import Title from "@/components/layout/title";
import QuestForm from "@/components/pages/dashboard/quests/seaPearl/seaPearlQuestForm";
import { QuestConfigType, questSchema } from "@/schemas/sea-pearl-quest.schema";
import { postCreateSeaPearlQuest } from "@/services/dashboard/quest/seaPearlQuest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";

export default function Quest() {
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
  const pathname = usePathname();

  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<QuestConfigType>({
    resolver: zodResolver(questSchema),
    mode: "onChange",
    // defaultValues:
  });

  const mutation = useMutation({
    mutationFn: postCreateSeaPearlQuest,
    onSuccess: () => {
      window.alert("래플을 성공적으로 생성하였습니다.");
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
