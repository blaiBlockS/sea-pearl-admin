"use client";

import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useState } from "react";
import { useParams } from "next/navigation";
import Title from "@/components/layout/title";
import { useRouter } from "next/navigation";
import usePageData from "@/hook/usePageData";
import Button from "@/components/common/button";
import { PlusIcon } from "lucide-react";
import Input from "@/components/common/input";
import { Controller, useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import ImageUploadingBox from "@/components/common/imageUploading";
import { ImageListType, ImageType } from "react-images-uploading";
import {
  CommunityQuestConfigType,
  communityQuestSchema,
} from "@/schemas/community-quest.schema";
import { getCommunityQuestDetail } from "@/services/dashboard/quest/communityQuest";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { QUERY_KEY } from "@/constants/queryKey";
import QuestTable from "./_questTable";
import { putToggleSubQuest } from "@/services/dashboard/quest/communityQuest/subQuest";

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
  const id = Array.isArray(params.communityId)
    ? params.communityId[0]
    : params.communityId;

  const router = useRouter();
  const { pathname } = usePageData();

  // 커뮤니티 퀘스트 단일 데이터 조회
  const { data: communityQuestData } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_COMMUNITY_QUESTS_DETAIL(id),
    queryFn: () => getCommunityQuestDetail(id),
  });

  // 이미지 데이터
  const [images, setImages] = useState<ImageType[]>([]);

  // RHF
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CommunityQuestConfigType>({
    resolver: zodResolver(communityQuestSchema),
    mode: "onChange",
    defaultValues: communityQuestData,
  });

  // 생성 MUTATION
  const subQuestToggleMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => putToggleSubQuest({ id }),
    onSuccess: () => {
      window.alert("성공적으로 커뮤니티 퀘스트를 생성하였습니다.");
    },
    onError: () => {
      window.alert("생성 중 에러가 발생하였습니다.");
    },
  });

  // 생성 핸들러
  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  // 제출 핸들러
  const onSubmit = (data: CommunityQuestConfigType) => {
    const {
      name,
      enabled,
      questStartDate,
      questEndDate,
      projectNumber,
      description,
    } = data;

    // mutation.mutate({
    //   name,
    //   enabled,
    //   questStartDate,
    //   questEndDate,
    //   description,
    //   projectNumber,
    //   logo: images?.[0],
    // });
  };

  // 프로젝트 내역 수정 버튼
  const EditButton = () => {
    return (
      <Button variant="fill" onClick={handleSubmit(onSubmit)}>
        <div className="flex h-10 items-center gap-2 px-5">
          <span className="text-body3-medium">수정</span>
        </div>
      </Button>
    );
  };

  // 프로젝트 삭제 버튼
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

  // 새로운 서브 퀘스트 생성 버튼
  const NewQuestButton = () => {
    const handleNavigateNewRaffle = () => {
      router.push(pathname + "/new-quest");
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
        <div className="h-full w-3/8">
          {/* 프로젝트 수정 */}
          <Title fontSize="text-head2" ActionButton={EditButton}>
            프로젝트 수정
          </Title>

          {/* 커뮤니티 프로젝트 총 수정 요소 */}
          <div className="flex flex-1 flex-col rounded-lg gap-5 p-8 min-h-50 bg-background-secondary border border-stroke-secondary">
            {/* 노출여부 */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-body2 flex-1 max-w-1/5">노출 여부</span>
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

            {/* 프로젝트 순번 */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-body2 flex-1 max-w-1/5">프로젝트 순번</span>
              <div className="flex flex-1 max-w-4/5 gap-4">
                <Input
                  type="number"
                  inputClassName="h-10 input-no-spinner"
                  placeholder="Enter Project Order"
                  hint={errors?.projectNumber?.message}
                  {...register("projectNumber", { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* 프로젝트 명 */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-body2 flex-1 max-w-1/5">프로젝트 명</span>
              <div className="flex flex-1 max-w-4/5 gap-4">
                <Input
                  inputClassName="h-10 input-no-spinner"
                  placeholder="Enter Title"
                  hint={errors?.name?.message}
                  {...register("name")}
                />
              </div>
            </div>

            {/* 로고 */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-body2 flex-1 max-w-1/5">로고</span>
              <div className="flex flex-1 max-w-4/5 gap-4">
                {/* 이미지 업로드 */}
                <ImageUploadingBox images={images} onChange={onChange} />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="h-full w-5/8">
          {/* 프로젝트 수정 */}
          <Title fontSize="text-head2" ActionButton={NewQuestButton}>
            퀘스트
          </Title>

          {/* SUB QUESTS */}
          <QuestTable id={id} />
        </div>
      </div>
    </div>
  );
}
