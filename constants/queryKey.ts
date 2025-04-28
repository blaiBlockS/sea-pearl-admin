import { UserFilterType } from "@/types/user";

export const QUERY_KEY = {
  // USER
  GET_USERS: (
    pageIndex: number,
    pageSize: number,
    order: "asc" | "desc",
    category: UserFilterType
  ) => ["USERS", pageIndex, pageSize, order, category],
  GET_USER_SEARCH: (search: string) => ["USER_SEARCH", search],

  // USER_DETAIL
  GET_USER_DETAIL: (id: string) => ["USER_DETAIL", id],
  GET_USER_USDT_EXPENSE: (id: string, pageIndex: number, pageSize: number) => [
    "USER_USDT_EXPENSE",
    id,
    pageIndex,
    pageSize,
  ],
  GET_USER_REWARDS: (id: string) => ["USER_REWARDS", id],
  GET_USER_QUEST_DONE: (id: string) => ["USER_QUEST_DONE", id],

  // SHELL RAFFLE
  GET_SHELL_RAFFLES: (pageIndex: number, pageSize: number) => [
    "SHELL_RAFFLE",
    pageIndex,
    pageSize,
  ],
  GET_SHELL_RAFFLE_DETAIL: (id: string) => ["SHELL_RAFFLE_DETAIL", id],

  // PEARL RAFFLE
  GET_PEARL_RAFFLES: (pageIndex: number, pageSize: number) => [
    "PEARL_RAFFLE",
    pageIndex,
    pageSize,
  ],
  GET_PEARL_RAFFLE_DETAIL: (id: string) => ["PEARL_RAFFLE_DETAIL", id],

  // ROULETTE
  GET_ROULETTE_CONFIG: ["ROULETTE_CONFIG"],

  // LIVEBAR
  GET_LIVE_BAR_CONFIG: ["LIVE_BAR_CONFIG"],

  // FREE BOX
  GET_FREE_BOX_CONFIG: ["FREE_BOX_CONFIG"],

  // SEA-PEARL-QUEST
  GET_SEA_PEARL_QUESTS: (pageIndex: number, pageSize: number) => [
    "SEA_PEARL_QUESTS",
    pageIndex,
    pageSize,
  ],
  GET_SEA_PEARL_QUEST_DETAIL: (id: string | string[]) => [
    "SEA_PEARL_QUEST_DETAIL",
    id,
  ],

  // COMMUNITY-QUEST
  GET_COMMUNITY_QUESTS: (pageIndex: number, pageSize: number) => [
    "COMMUNITY_QUESTS",
    pageIndex,
    pageSize,
  ],
  GET_COMMUNITY_QUESTS_DETAIL: (id: string | string[]) => [
    "COMMUNITY_QUEST_DETAIL",
    id,
  ],

  // SUB-QUESTS
  GET_COMMUNITY_QUEST_SUB_QUESTS: (id: string) => [
    "COMMUNITY_QUEST_SUB_QUESTS",
    id,
  ],
  GET_COMMUNITY_QUEST_SUB_QUEST_DETAIL: (id: string) => [
    "GET_COMMUNITY_QUEST_SUB_QUEST_DETAIL",
    id,
  ],

  // FINANCE - EXPENSE
  GET_ALL_FINANCE_EXPENSES: ["ALL_FINANCE_EXPENSE"],
  GET_FINANCE_EXPENSES_BY_DATE: (
    pageIndex: number,
    pageSize: number,
    start: string,
    end: string
  ) => ["FINANCE_EXPENSE", pageIndex, pageSize, start, end],
  GET_FINANCE_EXPENSE_DETAIL: (id: string) => ["FINANCE_EXPENSE_DETAIL", id],

  // FINANCE - INCOME
  GET_ALL_FINANCE_INCOMES: ["ALL_FINANCE_INCOME"],
  GET_FINANCE_INCOMES_BY_DATE: (
    pageIndex: number,
    pageSize: number,
    start: string,
    end: string
  ) => ["FINANCE_INCOME", pageIndex, pageSize, start, end],
} as const;
