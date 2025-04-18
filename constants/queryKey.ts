export const QUERY_KEY = {
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
  GET_SEA_PEARL_QUESTS: ["SEA_PEARL_QUESTS"],
  GET_SEA_PEARL_QUEST_DETAIL: (id: string | string[]) => [
    "SEA_PEARL_QUEST_DETAIL",
    id,
  ],

  // COMMUNITY-QUEST
  GET_COMMUNITY_QUESTS: ["COMMUNITY_QUESTS"],
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
  GET_FINANCE_EXPENSE: (
    pageIndex: number,
    pageSize: number,
    start: string,
    end: string
  ) => ["FINANCE_EXPENSE", pageIndex, pageSize, start, end],
  GET_FINANCE_EXPENSE_DETAIL: (id: string) => ["FINANCE_EXPENSE_DETAIL", id],
} as const;
