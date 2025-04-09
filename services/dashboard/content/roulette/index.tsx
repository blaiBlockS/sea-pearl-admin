import { END_POINT } from "@/constants/route";
import { clientAxios } from "@/services";
import {
  GetRouletteConfigDto,
  PutUpdateRouletteConfigDto,
} from "@/types/roulette";

export const getRouletteConfig = async () => {
  const res = await clientAxios.get<GetRouletteConfigDto>(
    END_POINT.GET_ROULETTE_CONFIG
  );

  return res.data;
};

export const putUpdateRouletteConfig = async (
  dto: PutUpdateRouletteConfigDto
) => {
  const res = await clientAxios.put<{ [key: string]: string }>(
    END_POINT.PUT_UPDATE_ROULETTE_CONFIG,
    dto
  );

  return res.data;
};
