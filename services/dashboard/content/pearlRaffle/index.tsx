import { END_POINT } from "@/constants/route";
import { clientAxios } from "../../..";
import { RaffleType, tableResponseType } from "@/types/columns";
import {
  CreateRaffleFormDataDto,
  CreateRaffleFormDataDtoWithId,
  GetRaffleFormDataDto,
} from "@/schemas/raffle.schema";

// PEARL 전체 리스트 페이지 GET
export const getAllPearlRaffles = async (
  pageIndex: number,
  pageSize: number
): Promise<RaffleType[]> => {
  const res = await clientAxios.get<{ data: tableResponseType<RaffleType[]> }>(
    END_POINT.GET_PEARL_RAFFLES(pageIndex, pageSize)
  );

  console.log(res, "res!");

  return res.data.data.data;
};

// PEARL 생성 페이지 POST
export const postCreatePearlRaffle = async (dto: CreateRaffleFormDataDto) => {
  const res = await clientAxios.post<{ message: string }>(
    END_POINT.POST_PEARL_RAFFLES,
    dto
  );

  return res;
};

// PEARL 수정페이지 GET
export const getUpdatePearlRaffle = async (id: string) => {
  const res = await clientAxios.get<GetRaffleFormDataDto>(
    END_POINT.GET_PEARL_RAFFLE_DETAIL(id)
  );

  return res.data;
};

// SHELL 수정페이지 POST
export const postUpdatePearlRaffle = async (
  dto: CreateRaffleFormDataDtoWithId
) => {
  console.log(dto, "dto!!!!!!");
  const res = await clientAxios.put(END_POINT.PUT_PEARL_RAFFLES, {
    ...dto,
  });

  return res;
};
