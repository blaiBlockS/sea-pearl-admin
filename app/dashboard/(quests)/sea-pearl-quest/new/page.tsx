"use client";

import Button from "@/components/common/button";
import Title from "@/components/layout/title";
import QuestForm from "@/components/pages/dashboard/quests/seaPearl/seaPearlQuestForm";
import { raffleFormSchema } from "@/schemas/raffle.schema";
import { QuestConfigType, questSchema } from "@/schemas/sea-pearl-quest.schema";
import { getDefaultValues } from "@/utils/getDefaultRaffleValues";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
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
    // defaultValues: {
    //   period: {
    //     startDate: new Date(),
    //   },
    // },
  });

  // 새로운 래플 생성 버튼
  const NewQuestButton = () => {
    const handleNavigateNewRaffle = () => {
      router.push(pathname + "/new");
    };

    return (
      <Button variant="fill" onClick={handleNavigateNewRaffle}>
        <div className="flex h-10 items-center gap-2 pr-3 pl-2">
          <PlusIcon size={20} />
          <span className="text-body3-medium">New Quest</span>
        </div>
      </Button>
    );
  };

  return (
    <div className="px-9 py-7">
      {/* TITLE */}
      <Title ActionButton={NewQuestButton}>Sea Pearl 퀘스트 등록</Title>

      {/* QUEST CONFIG SETTING */}
      <QuestForm register={register} control={control} errors={errors} />
    </div>
  );
}
