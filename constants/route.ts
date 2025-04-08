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
} as const;
