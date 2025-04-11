"use client";

import Button from "@/components/common/button";
import Title from "@/components/layout/title";
import { PlusIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Quest() {
  return (
    <ErrorBoundary
      fallbackRender={(error) => <div>에러: {JSON.stringify(error.error)}</div>}
    >
      <Suspense fallback={<></>}>
        <NewCommunityQuestInner />
      </Suspense>
    </ErrorBoundary>
  );
}

function NewCommunityQuestInner() {
  const router = useRouter();
  const pathname = usePathname();

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
      <Title ActionButton={NewQuestButton}>Sea Pearl 퀘스트 등록</Title>
    </div>
  );
}
