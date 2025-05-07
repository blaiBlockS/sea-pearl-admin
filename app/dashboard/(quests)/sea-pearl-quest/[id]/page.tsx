"use client";

import Button from "@/components/common/button";
import Title from "@/components/layout/title";
import QuestForm from "@/components/pages/dashboard/quests/seaPearl/seaPearlQuestForm";
import { QUERY_KEY } from "@/constants/queryKey";
import { QuestConfigType, questSchema } from "@/schemas/quest.schema";
import {
  getOneSeaPearlQuest,
  putUpdateSeaPearlQuest,
} from "@/services/dashboard/quest/seaPearlQuest";
import { combineDateAndTime } from "@/utils/combineDateAndTime";
import { getDefaultSubQuestValues } from "@/utils/getDefaultSubQuestValues";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";

export default function SeaPearlQuestDetail() {
  return (
    <ErrorBoundary fallback={<div>error</div>}>
      <Suspense fallback={<div>loading</div>}>
        <SeaPearlQuestDetailInner />
      </Suspense>
    </ErrorBoundary>
  );
}

function SeaPearlQuestDetailInner() {
  const router = useRouter();
  const param = useParams();
  const id = Array.isArray(param.id) ? param.id[0] : param.id;

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_SEA_PEARL_QUEST_DETAIL(id),
    queryFn: () => getOneSeaPearlQuest(id),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0, // 데이터는 항상 stale 상태로 간주됨
  });

  if (!data) return null; // fallback or loading UI

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuestConfigType>({
    resolver: zodResolver(questSchema),
    mode: "onChange",
    defaultValues: getDefaultSubQuestValues(data),
  });

  useEffect(() => {
    if (data) {
      reset(getDefaultSubQuestValues(data));
    }
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: putUpdateSeaPearlQuest,
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
      "퀘스트을 정말 수정하시겠습니까?\n" +
        `퀘스트 제목: ${submitData.title}\n` +
        `최대 인원: ${submitData.maxParticipants}\n` +
        `래플 시작시기: ${format(submitData.period.startDate, "yyyy.MM.dd.")} ${format(submitData.period.startTime, "HH:mm a")}\n` +
        `래플 종료시기: ${format(submitData.period.endDate, "yyyy.MM.dd.")} ${format(submitData.period.endTime, "HH:mm a")}`
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
      id,
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
  const EditButton = () => {
    return (
      <Button variant="fill" onClick={handleSubmit(onSubmit)}>
        <div className="flex h-10 items-center gap-2 px-3">
          <span className="text-body3-medium">수정</span>
        </div>
      </Button>
    );
  };

  // 뒤로가기 버튼
  const SubButton = () => {
    const handleGoBack = () => {
      router.back();
    };

    return (
      <Button
        variant="fill"
        onClick={handleGoBack}
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
      <Title ActionButton={EditButton} SubButton={SubButton}>
        Sea Pearl 퀘스트 수정
      </Title>

      {/* QUEST CONFIG SETTING */}
      <QuestForm register={register} control={control} errors={errors} />
    </div>
  );
}
