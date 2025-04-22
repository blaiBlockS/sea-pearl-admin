import { END_POINT } from "@/constants/route";
import { clientAxios } from "@/services";
import { ExpenseListType, ExpenseType } from "@/types/expense";
import { IncomeListType } from "@/types/income";
import axios from "axios";

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

export const postUploadIncomeCsv = async (formData: FormData) => {
  try {
    const res = await clientAxios.post(
      "/api/files/income/upload-csv",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("업로드 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("업로드 실패:", err);
  }
};
