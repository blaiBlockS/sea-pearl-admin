import { END_POINT } from "@/constants/route";
import { clientAxios } from "@/services";

// <GET> 모든 INCOME 내역 조회
export const getAllIncomes = async (
  page: number,
  size: number
): Promise<{}> => {
  const res = await clientAxios.get<{}>(END_POINT.GET_ALL_INCOMES(page, size));

  return res.data;
};

// <GET> INCOME CSV 내보내기
export const getExpensesByDate = async (id: string) => {
  const res = await clientAxios.get<{}>(END_POINT.GET_EXPENSE_DETAIL(id));

  return res.data;
};

// <GET> 날짜 별 INCOME 내역 조회
export const getIncomesByDate = async ({
  page,
  size,
  start,
  end,
  order = "desc",
}: {
  page: number;
  size: number;
  start: string;
  end: string;
  order: "asc" | "desc";
}) => {
  const res = await clientAxios.get<{}>(
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
