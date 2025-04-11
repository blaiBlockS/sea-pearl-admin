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
  GET_SEA_PEARL_QUEST: (pageIndex: number, pageSize: number) => [
    "SEA_PEARL_QUEST",
    pageIndex,
    pageSize,
  ],

  // COMMUNITY-QUEST
  GET_COMMUNITY_QUEST: ["COMMUNITY_QUEST"],

  // FINANCE - EXPENSE
  GET_FINANCE_EXPENSE: (pageIndex: number, pageSize: number) => [
    "FINANCE_EXPENSE",
    pageIndex,
    pageSize,
  ],
} as const;
