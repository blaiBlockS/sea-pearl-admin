"use client";

import { usePathname, useSearchParams } from "next/navigation";

// pageNation 메타정보 생성 훅
const usePageData = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 쿼리스트링에서 page, size 가져오기
  const pageIndex = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("size") || "10", 10);

  return { pageIndex, pageSize, pathname };
};

export default usePageData;
