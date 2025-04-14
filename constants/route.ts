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
  POST_BLOCKS_QUESTS: "/api/blocks/create-blocks-quest",
  PUT_BLOCKS_QUEST_ENABLED: "/api/blocks/toggle-blocks-quest",

  // COMMUNITY QUEST
  GET_COMMUNITY_QUEST: "",
  PUT_COMMUNITY_QUEST: "",
} as const;
