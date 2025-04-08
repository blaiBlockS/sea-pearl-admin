import { END_POINT } from "@/constants/route";
import { clientAxios } from "../../..";
import { RaffleType, tableResponseType } from "@/types/columns";
import {
  CreateRaffleFormDataDto,
  CreateRaffleFormDataDtoWithId,
  GetRaffleFormDataDto,
} from "@/schemas/raffle.schema";

// SHELL 전체 리스트 페이지 GET
export const getAllShellRaffles = async (
  pageIndex: number,
  pageSize: number,
): Promise<RaffleType[]> => {
  const res = await clientAxios.get<tableResponseType<RaffleType[]>>(
    END_POINT.GET_SHELL_RAFFLES(pageIndex, pageSize),
  );

  return res.data.data;
};

// SHELL 생성 페이지 POST
export const postCreateShellRaffle = async (dto: CreateRaffleFormDataDto) => {
  const res = await clientAxios.post<{ message: string }>(
    END_POINT.POST_SHELL_RAFFLES,
    dto,
  );

  return res;
};

// SHELL 수정페이지 GET
export const getUpdateShellRaffle = async (id: string) => {
  const res = await clientAxios.get<GetRaffleFormDataDto>(
    END_POINT.GET_SHELL_RAFFLE_DETAIL(id),
  );

  return res.data;
};

// SHELL 수정페이지 POST
export const postUpdateShellRaffle = async (
  dto: CreateRaffleFormDataDtoWithId,
) => {
  const res = await clientAxios.put(END_POINT.PUT_SHELL_RAFFLES, {
    ...dto,
  });

  return res;
};
