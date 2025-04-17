export const END_POINT = {
  // SHELL RAFFLE
  GET_SHELL_RAFFLES: (pageNumber: number, pageSize: number) =>
    `/api/shellRaffle/getAllShellRaffle?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  POST_SHELL_RAFFLES: "/api/shellRaffle/createShellRaffle",
  GET_SHELL_RAFFLE_DETAIL: (id: string) =>
    `api/shellRaffle/detailShellRaffle?id=${id}`,
  PUT_SHELL_RAFFLES: "/api/shellRaffle/updateShellRaffle",

  // PEARL RAFFLE
  GET_PEARL_RAFFLES: (pageNumber: number, pageSize: number) =>
    `/api/pearlRaffle/getAllPearlRaffle?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  POST_PEARL_RAFFLES: "/api/pearlRaffle/createPearlRaffle",
  GET_PEARL_RAFFLE_DETAIL: (id: string) =>
    `api/pearlRaffle/detailPearlRaffle?id=${id}`,
  PUT_PEARL_RAFFLES: "/api/pearlRaffle/updatePearlRaffle",

  // ROULETTE & LIVE BAR
  GET_ROULETTE_CONFIG: "/api/roulette/getall",
  PUT_UPDATE_ROULETTE_CONFIG: "/api/roulette/update",

  GET_LIVE_BAR_CONFIG: "/api/roulette/livebar",
  PUT_UPDATE_LIVE_BAR: "/api/roulette/update/livebar",

  // FREE BOX
  GET_FREE_BOX_CONFIG: "/api/freebox/getFreebox",
  PUT_FREE_BOX_CONFIG: "/api/freebox/updateFreebox",

  // BLOCKS QUEST
  GET_BLOCKS_QUESTS: "/api/blocks/get-all-blocks-quest",
  GET_BLOCKS_QUEST_DETAIL: (id: string) =>
    `/api/blocks/get-blocks-quest-by-id?id=${id}`,
  POST_BLOCKS_QUEST: "/api/blocks/create-blocks-quest",
  PUT_BLOCKS_QUEST: "/api/blocks/update-blocks-quest",
  PUT_BLOCKS_QUEST_ENABLED: "/api/blocks/toggle-blocks-quest",

  // COMMUNITY QUEST
  GET_COMMUNITY_QUESTS: "/api/projects/getAll",
  GET_COMMUNITY_QUEST_DETAIL: (id: string) => `/api/projects/getById?id=${id}`,
  POST_COMMUNITY_QUEST: "/api/projects/create",
  PUT_COMMUNITY_QUEST: "/api/files/projects/update", // FILE
  PUT_COMMUNITY_ENABLED: "/api/projects/toggle",
  PUT_COMMUNITY_QUEST_DELETE: "/api/projects/delete",

  // SUB QUESTS
  GET_SUB_QUESTS: (id: string) => `/api/quests/getAll?projectId=${id}`,
  GET_SUB_QUEST_DETAIL: (id: string) => `/api/quests/getById?id=${id}`,
  POST_SUB_QUEST: `/api/quests/create`,
  PUT_SUB_QUEST_DETAIL: `/api/quests/update`,
  PUT_SUB_QUEST_TOGGLE: `/api/quests/toggle`,
  PUT_SUB_QUEST_DELETE: `/api/quests/delete`,

  // EXPENSE
  GET_ALL_EXPENSE: (page: number, size: number) =>
    `/api/expense/get-all?page=${page}&size=${size}&order=asc`,
  GET_EXPENSE_DETAIL: (id: string) => `/api/expense/detail?id=${id}`,
  PUT_EXPENSE_UPDATE: "/api/expense/update",
  GET_EXPENSE_BY_DATE: ({
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
  }) =>
    `/api/expense/get-all-by-date?page=${page}&size=${size}&start=${start}&end=${end}&order=${order}`,
} as const;
