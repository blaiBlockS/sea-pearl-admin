"use client";

import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useEffect } from "react";
import { useParams } from "next/navigation";
import Title from "@/components/layout/title";
import { useRouter } from "next/navigation";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import { Controller, useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  QuestConfigType,
  QuestConfigWithCombinedPeriod,
  questSchema,
} from "@/schemas/quest.schema";
import {
  deleteToggleSubQuest,
  getSubQuestDetail,
  putUpdateSubQuest,
} from "@/services/dashboard/quest/communityQuest/subQuest";
import { getDefaultSubQuestValues } from "@/utils/getDefaultSubQuestValues";
import { DatePicker } from "@/components/common/datePicker";
import { SelectBox } from "@/components/common/selectBox";
import { CustomTimePicker } from "@/components/common/customTimePicker";
import { combineDateAndTime } from "@/utils/combineDateAndTime";

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
  const params = useParams();
  const id = Array.isArray(params.questId) ? params.questId[0] : params.questId;
  const questId = Array.isArray(params.questId)
    ? params.questId[0]
    : params.questId;

  console.log(questId, "projquestIdectId");
  // 커뮤니티 서브 퀘스트 단일 데이터 조회
  const { data: subQuestData } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_COMMUNITY_QUEST_SUB_QUEST_DETAIL(questId),
    queryFn: () => getSubQuestDetail(questId),
    refetchOnWindowFocus: true,
  });

  // RHF
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuestConfigType>({
    resolver: zodResolver(questSchema),
    mode: "onChange",
    defaultValues: getDefaultSubQuestValues(subQuestData),
  });

  useEffect(() => {
    if (subQuestData) {
      reset(getDefaultSubQuestValues(subQuestData));
    }
  }, [subQuestData, reset]);

  // 수정 MUTATION
  const updateMutation = useMutation({
    mutationFn: (dto: QuestConfigWithCombinedPeriod & { id: string }) =>
      putUpdateSubQuest(dto),
    onSuccess: () => {
      window.alert("성공적으로 퀘스트를 수정하였습니다.");
    },
    onError: () => {
      window.alert("수정 중 에러가 발생하였습니다.");
    },
  });

  // 삭제 MUTATION
  const removeMutation = useMutation({
    mutationFn: (dto: { id: string }) => deleteToggleSubQuest(dto),
    onSuccess: () => {
      window.alert("성공적으로 퀘스트를 삭제하였습니다.");
    },
    onError: () => {
      window.alert("삭제 중 에러가 발생하였습니다.");
    },
  });

  // 제출 핸들러
  const onSubmit = (data: QuestConfigType) => {
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
    } = data;

    const mergedStartDate = combineDateAndTime(
      period.startDate,
      period.startTime
    ).toISOString(); // ← 최종적으로 JS Date 객체로 변환

    const mergedEndDate = combineDateAndTime(
      period.endDate,
      period.endTime
    ).toISOString(); // ← 최종적으로 JS Date 객체로 변환

    updateMutation.mutate({
      id,
      enabled,
      questNumber,
      title,
      questLogo,
      reward,
      url,
      resetCycle,
      roundInCycle,
      maxParticipants,
      period: {
        start: mergedStartDate,
        end: mergedEndDate,
      },
    });
  };

  const queryClient = useQueryClient();
  const router = useRouter();
  // 삭제 핸들러
  const handleDelete = async () => {
    await removeMutation.mutateAsync({ id });
    queryClient.invalidateQueries({
      queryKey: QUERY_KEY.GET_COMMUNITY_QUEST_SUB_QUESTS(questId),
    });
    router.back();
  };

  // 프로젝트 내역 수정 버튼
  const EditButton = () => {
    return (
      <Button
        variant="fill"
        onClick={handleSubmit(onSubmit, (err) => {
          console.log(err, "err");
        })}
      >
        <div className="flex h-10 items-center gap-2 px-5">
          <span className="text-body3-medium">수정</span>
        </div>
      </Button>
    );
  };

  // 프로젝트 삭제 버튼
  const RemoveButton = () => {
    return (
      <Button
        variant="fill"
        className="bg-button-secondary"
        onClick={handleDelete}
      >
        <div className="flex h-10 items-center gap-2 px-5">
          <span className="text-body3-medium">삭제</span>
        </div>
      </Button>
    );
  };

  return (
    <div className="px-9 py-7 flex flex-col gap-8">
      {/* 페이지 타이틀 */}

      {/* 페이지 그리드 */}
      <div className="flex gap-8">
        {/* LEFT */}
        <div className="h-full w-4/8">
          {/* 프로젝트 수정 */}
          <Title
            fontSize="text-head2"
            ActionButton={EditButton}
            SubButton={RemoveButton}
          >
            퀘스트 수정
          </Title>

          {/* 커뮤니티 프로젝트 총 수정 요소 */}
          <div className="flex flex-1 flex-col rounded-lg gap-5 p-8 min-h-50 bg-background-secondary border border-stroke-secondary">
            {/* 노출여부 */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-body2 flex-1 max-w-1/5">
                퀘스트 노출 여부
              </span>
              <div className="flex flex-1 max-w-4/5 gap-4">
                <Controller
                  name={"enabled"}
                  control={control}
                  defaultValue={false}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Switch onCheckedChange={onChange} checked={value} />
                      {value && (
                        <span className="text-text-teritary text-body4-medium">
                          *노출 여부 활성화 시 생성하자마자 사용자에게
                          노출됩니다.
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
            </div>

            {/* 퀘스트 순번 */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-body2 flex-1 max-w-1/5">퀘스트 순번</span>
              <div className="flex flex-1 max-w-4/5 gap-4">
                <Input
                  type="number"
                  inputClassName="h-10 input-no-spinner"
                  placeholder="Enter Project Order"
                  hint={errors?.questNumber?.message}
                  {...register("questNumber", { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* 퀘스트 명 */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-body2 flex-1 max-w-1/5">퀘스트 명</span>
              <div className="flex flex-1 max-w-4/5 gap-4">
                <Input
                  inputClassName="h-10 input-no-spinner"
                  placeholder="Enter Title"
                  hint={errors?.title?.message}
                  {...register("title")}
                />
              </div>
            </div>

            {/* 퀘스트 분류 */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-body2 flex-1 max-w-1/5">퀘스트 분류</span>
              <div className="flex  flex-1 max-w-4/5 gap-4">
                <Controller
                  name={"questLogo"}
                  control={control}
                  defaultValue="check-in"
                  render={({ field: { onChange, value } }) => (
                    <SelectBox
                      onValueChange={onChange}
                      value={value}
                      valueList={[
                        "shellraffle",
                        "pearlraffle",
                        "freebox",
                        "website",
                        "telegram",
                        "youtube",
                        "x",
                        "discord",
                        "check-in",
                      ]}
                    />
                  )}
                />
              </div>
            </div>

            {/* 리워드 분류 */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-body2 flex-1 max-w-1/5">리워드 분류</span>
              <div className="flex  flex-1 max-w-4/5 gap-4">
                <Controller
                  name={`reward.0.type`}
                  control={control}
                  defaultValue="shell"
                  render={({ field: { onChange, value } }) => (
                    <SelectBox
                      onValueChange={onChange}
                      value={value}
                      valueList={["shell", "pearl"]}
                    />
                  )}
                />
              </div>
            </div>

            {/* 리워드 수량 */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-body2 flex-1 max-w-1/5">리워드 수량</span>
              <div className="flex flex-1 max-w-4/5 gap-4">
                <Input
                  inputClassName="h-10 input-no-spinner"
                  placeholder="Enter Title"
                  hint={errors?.reward?.[0]?.message}
                  {...register("reward.0.amount", { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* 링크 선택 */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-body2 flex-1 max-w-1/5">링크 (선택)</span>
              <div className="flex flex-1 max-w-4/5 gap-4">
                <Input
                  inputClassName="h-10 input-no-spinner"
                  placeholder="Enter Title"
                  hint={errors?.url?.message}
                  {...register("url")}
                />
              </div>
            </div>

            {/* 반복주기 */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-body2 flex-1 max-w-1/5">반복 주기</span>
              <div className="flex  flex-1 max-w-4/5 gap-4">
                <Controller
                  name={"resetCycle"}
                  control={control}
                  defaultValue="daily"
                  render={({ field: { onChange, value } }) => (
                    <SelectBox
                      onValueChange={onChange}
                      value={value}
                      valueList={["daily", "weekly", "monthly", "none"]}
                    />
                  )}
                />
              </div>
            </div>

            {/* 퀘스트 완료 기준 횟수 */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-body2 flex-1 max-w-1/5">
                퀘스트 완료 기준 횟수
              </span>
              <div className="flex flex-1 max-w-4/5 gap-4">
                <Input
                  inputClassName="h-10 input-no-spinner"
                  placeholder="Enter Title"
                  hint={errors?.roundInCycle?.message}
                  {...register("roundInCycle")}
                />
              </div>
            </div>

            {/* 최대 참여자 수 */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-body2 flex-1 max-w-1/5">
                최대 참여자 수
              </span>
              <div className="flex flex-1 max-w-4/5 gap-4">
                <Input
                  type="number"
                  inputClassName="h-10 input-no-spinner"
                  placeholder="Enter Value"
                  hint={errors?.maxParticipants?.message}
                  {...register("maxParticipants")}
                />
              </div>
            </div>

            {/* 시작일시 */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-body2 flex-1 max-w-1/5">시작일시</span>
              <div className="flex flex-1 max-w-4/5 gap-4">
                {/* DATE_PICKER */}
                <Controller
                  name="period.startDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker value={field.value} onChange={field.onChange} />
                  )}
                />

                {/* TIME_PICKER */}
                <Controller //
                  name="period.startTime"
                  control={control}
                  render={({ field }) => (
                    <CustomTimePicker
                      {...field}
                      value={field.value}
                      onChange={(value: Date | undefined) =>
                        field.onChange(value)
                      }
                    />
                  )}
                />
              </div>
            </div>

            {/* 종료일시 */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-body2 flex-1 max-w-1/5">종료일시</span>
              <div className="flex flex-1 max-w-4/5 gap-4">
                {/* DATE_PICKER */}
                <Controller
                  name="period.endDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      value={field.value} //
                      onChange={field.onChange}
                    />
                  )}
                />

                {/* TIME_PICKER */}
                <Controller //
                  name="period.endTime"
                  control={control}
                  render={({ field }) => (
                    <CustomTimePicker
                      {...field}
                      value={field.value}
                      onChange={(value: Date | undefined) =>
                        field.onChange(value)
                      }
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
