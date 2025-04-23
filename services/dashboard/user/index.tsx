import { END_POINT } from "@/constants/route";
import { clientAxios } from "@/services";
import { UserFilterType, UserListType } from "@/types/user";

// <GET> 모든 INCOME 내역 조회
export const getAllUsers = async (
  page: number,
  size: number,
  order: "asc" | "desc",
  category: UserFilterType
): Promise<UserListType> => {
  const res = await clientAxios.get<{ data: UserListType }>(
    END_POINT.GET_USERS(page, size, order, category)
  );

  return res.data.data;
};

// <GET> 날짜 별 INCOME 내역 조회
export const getUserDetail = async ({ search }: { search: string }) => {
  const res = await clientAxios.get<{}>(END_POINT.GET_USER_DETAIL);

  return res.data;
};

export const postSearchUser = async (search: string) => {
  const res = await clientAxios.post(END_POINT.GET_USER_SEARCH, { search });

  return res.data;
};
