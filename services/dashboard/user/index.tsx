import { END_POINT } from "@/constants/route";
import { clientAxios } from "@/services";
import { UserFilterType, UserListType } from "@/types/user";

// <GET> 모든 INCOME 내역 조회
export const getAllUsers = async (
  page: number,
  size: number,
  category: UserFilterType
): Promise<UserListType> => {
  const res = await clientAxios.get<{ data: UserListType }>(
    END_POINT.GET_USERS(page, size, category)
  );

  return res.data.data;
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
