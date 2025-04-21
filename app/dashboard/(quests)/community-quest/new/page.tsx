"use client";

import { winnerColumnHelper } from "@/components/common/table/columns";
import { ColumnDef } from "@tanstack/react-table";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useState } from "react";
import Title from "@/components/layout/title";
import { useRouter } from "next/navigation";
import usePageData from "@/hook/usePageData";
import Button from "@/components/common/button";
import { PlusIcon } from "lucide-react";
import Input from "@/components/common/input";
import { DataTable } from "@/components/common/table";
import ImageUploadingBox from "@/components/common/imageUploading";
import { ImageListType, ImageType } from "react-images-uploading";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CommunityQuestConfigType,
  communityQuestSchema,
} from "@/schemas/community-quest.schema";
import { Switch } from "@/components/ui/switch";
import { useMutation } from "@tanstack/react-query";
import { postCreateCommunityQuest } from "@/services/dashboard/quest/communityQuest";

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

export default function NewCommunityQuest() {
  return (
    <ErrorBoundary fallback={<div>Error</div>}>
      <Suspense fallback={<div>...</div>}>
        <NewCommunityQuestInner />
      </Suspense>
    </ErrorBoundary>
  );
}

function NewCommunityQuestInner() {
  const router = useRouter();
  const { pathname } = usePageData({});

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
    defaultValues: {},
  });

  // 생성 MUTATION
  const mutation = useMutation({
    mutationFn: (dto: CommunityQuestConfigType) =>
      postCreateCommunityQuest(dto),
    onSuccess: () => {
      window.alert("성공적으로 커뮤니티 퀘스트를 생성하였습니다.");
      router.back();
    },
    onError: () => {
      window.alert("생성 중 에러가 발생하였습니다.");
    },
  });

  // 생성 핸들러
  const onChange = (imageList: ImageListType, addUpdateIndex?: number[]) => {
    setImages(imageList);
  };

  // 제출 핸들러
  const onSubmit = (data: CommunityQuestConfigType) => {
    const { name, enabled, projectNumber } = data;

    mutation.mutate({
      name,
      enabled,
      projectNumber,
      file: images?.[0],
    });
  };

  // 생성 버튼
  const PostButton = () => {
    return (
      <Button variant="fill" onClick={handleSubmit(onSubmit)}>
        <div className="flex h-10 items-center gap-2 px-5">
          <span className="text-body3-medium">생성</span>
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
      <Button
        variant="fill"
        onClick={handleNavigateNewRaffle}
        disabled={true}
        className="opacity-30"
      >
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
      <Title>Community Quest</Title>

      {/* 페이지 그리드 */}
      <div className="flex gap-8">
        {/* LEFT */}
        <div className="h-full w-3/7">
          {/* 프로젝트 수정 */}
          <Title fontSize="text-head2" ActionButton={PostButton}>
            프로젝트 생성
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
        <div className="h-full w-4/7 opacity-30">
          {/* 프로젝트 수정 */}
          <Title fontSize="text-head2" ActionButton={NewQuestButton}>
            퀘스트
          </Title>

          {/* 프로젝트 수정 */}
          <DataTable
            columns={raffleColumns}
            data={[]}
            noDataText="프로젝트 등록 후 퀘스트 등록이 가능합니다."
          />
        </div>
      </div>
    </div>
  );
}
