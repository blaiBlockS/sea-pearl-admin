import { END_POINT } from "@/constants/route";
import { FreeBoxConfigType } from "@/schemas/free-box.schema";
import { clientAxios } from "@/services";

export const getFreeBoxConfig = async () => {
  const res = await clientAxios.get<FreeBoxConfigType>(
    END_POINT.GET_FREE_BOX_CONFIG
  );

  return res.data;
};

export const putFreeBoxConfig = async (dto: FreeBoxConfigType) => {
  const res = await clientAxios.put<{ [key: string]: string }>(
    END_POINT.PUT_FREE_BOX_CONFIG,
    dto
  );

  return res.data;
};
