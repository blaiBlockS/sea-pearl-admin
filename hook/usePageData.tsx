"use client";

import { usePathname, useSearchParams } from "next/navigation";

interface PageDataProps {
  customPageIndexKey?: string;
  customPageSizeKey?: string;
}

// pageNation 메타정보 생성 훅
const usePageData = ({
  customPageIndexKey,
  customPageSizeKey,
}: PageDataProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const indexString = customPageIndexKey ? `${customPageIndexKey}` : "page";
  const sizeString = customPageSizeKey ? `${customPageSizeKey}` : "size";

  // 쿼리스트링에서 page, size 가져오기
  const pageIndex = parseInt(searchParams.get(indexString) || "1", 10);
  const pageSize = parseInt(searchParams.get(sizeString) || "10", 10);

  return { pageIndex, pageSize, pathname };
};

export default usePageData;
