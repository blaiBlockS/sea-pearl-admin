import { END_POINT } from "@/constants/route";
import { LiveBarConfigType } from "@/schemas/live-bar.schema";
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

export const getLiveBarConfig = async () => {
  const res = await clientAxios.get<LiveBarConfigType>(
    END_POINT.GET_LIVE_BAR_CONFIG
  );

  return res.data;
};

export const putUpdateLiveBarConfig = async (dto: LiveBarConfigType) => {
  const res = await clientAxios.put<{ [key: string]: string }>(
    END_POINT.PUT_UPDATE_ROULETTE_CONFIG,
    dto
  );

  return res.data;
};
