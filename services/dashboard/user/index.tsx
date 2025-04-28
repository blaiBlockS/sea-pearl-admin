import { END_POINT } from "@/constants/route";
import { clientAxios } from "@/services";
import {
  UserDetailType,
  UserFilterType,
  UserListType,
  UserQuestDoneType,
  UserRewardsType,
  UserType,
  UserUsdtExpenseType,
} from "@/types/user";

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
export const getUserDetail = async (id: string) => {
  const res = await clientAxios.get<{ data: UserDetailType }>(
    END_POINT.GET_USER_DETAIL(id)
  );

  return res.data.data;
};

// 유저 검색 기능
export const postSearchUser = async (search: string) => {
  const res = await clientAxios.post<{ data: UserType[] }>(
    END_POINT.GET_USER_SEARCH,
    { search }
  );

  return res.data.data;
};

export const getUserUsdtExpense = async (
  id: string,
  pageIndex: number,
  pageSize: number,
  order: "asc" | "desc" = "asc"
) => {
  const res = await clientAxios.get<{
    data: { expenses: UserUsdtExpenseType[]; totalCount: number };
  }>(END_POINT.GET_USER_USDTEXPENSE(id, pageIndex, pageSize, order));

  return res.data.data;
};

export const getUserRewards = async (
  id: string,
  pageIndex: number,
  pageSize: number,
  order: "asc" | "desc" = "asc"
) => {
  const res = await clientAxios.get<{
    data: { rewards: UserRewardsType[]; totalCount: number };
  }>(END_POINT.GET_USER_REWARDS(id, pageIndex, pageSize, order));

  return res.data.data;
};

export const getUserQuestDone = async (
  id: string,
  pageIndex: number,
  pageSize: number,
  order: "asc" | "desc" = "asc"
) => {
  const res = await clientAxios.get<{
    data: { data: UserQuestDoneType[]; totalCount: number };
  }>(END_POINT.GET_USER_QUEST_DONE(id, pageIndex, pageSize, order));

  return res.data.data;
};
