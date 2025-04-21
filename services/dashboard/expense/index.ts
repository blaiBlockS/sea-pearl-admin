import { END_POINT } from "@/constants/route";
import { clientAxios } from "@/services";
import { GetRaffleFormDataDto } from "@/schemas/raffle.schema";
import { ExpenseListType, ExpenseType } from "@/types/expense";

// <GET> 모든 지급 전 EXPENSE 내역 조회
export const getAllNotYetPaidExpenses = async (
  page: number,
  size: number
): Promise<ExpenseListType> => {
  const res = await clientAxios.get<ExpenseListType>(
    END_POINT.GET_ALL_NOT_YET_PAID_EXPENSE(page, size)
  );

  return res.data;
};

// <GET> 모든 지급완료 EXPENSE 내역 조회
export const getAllPaidExpenses = async (
  page: number,
  size: number
): Promise<ExpenseListType> => {
  const res = await clientAxios.get<ExpenseListType>(
    END_POINT.GET_ALL_PAID_EXPENSE(page, size)
  );

  return res.data;
};

// <GET> 지급완료 날짜 별 지출 내역 조회
export const getPaidExpensesByDate = async ({
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
  const res = await clientAxios.get<ExpenseListType>(
    END_POINT.GET_ALL_PAID_EXPENSE_BY_DATE({
      page,
      size,
      start,
      end,
      order,
    })
  );

  return res.data;
};

// <GET> 특정 EXPENSE 내역 조회
export const getExpenseDetail = async (id: string) => {
  const res = await clientAxios.get<ExpenseType>(
    END_POINT.GET_EXPENSE_DETAIL(id)
  );

  return res.data;
};

// <PUT> 지출 내역 업데이트
export const putExpenseUpdate = async (dto: any) => {
  const res = await clientAxios.put<GetRaffleFormDataDto>(
    END_POINT.PUT_EXPENSE_UPDATE,
    dto
  );

  return res.data;
};
