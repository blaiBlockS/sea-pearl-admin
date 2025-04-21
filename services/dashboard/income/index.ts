import { END_POINT } from "@/constants/route";
import { clientAxios } from "@/services";
import { ExpenseListType, ExpenseType } from "@/types/expense";
import { IncomeListType } from "@/types/income";

// <GET> 모든 INCOME 내역 조회
export const getAllIncomes = async (
  page: number,
  size: number
): Promise<IncomeListType> => {
  const res = await clientAxios.get<IncomeListType>(
    END_POINT.GET_ALL_INCOMES(page, size)
  );

  return res.data;
};

// <GET> INCOME CSV 내보내기
export const postUploadIncomeCsv = async (file: any) => {
  const res = await clientAxios.post<{}>(END_POINT.POST_UPLOAD_INCOME_CSV);

  return res.data;
};

// <GET> 날짜 별 INCOME 내역 조회
export const getIncomesByDate = async ({
  page,
  size,
  start,
  end,
  order = "asc",
}: {
  page: number;
  size: number;
  start: string;
  end: string;
  order: "asc" | "desc";
}) => {
  const res = await clientAxios.get<IncomeListType>(
    END_POINT.GET_INCOMES_BY_DETAIL({
      page,
      size,
      start,
      end,
      order,
    })
  );

  return res.data;
};
