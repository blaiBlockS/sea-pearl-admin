import { END_POINT } from "@/constants/route";
import { CreateRaffleFormDataDto } from "@/schemas/raffle.schema";
import { clientAxios } from "@/services";

// SHELL 전체 리스트 페이지 GET
export const getAllSeaPearlQuests = async (): Promise<QuestType[]> => {
  const res = await clientAxios.get<QuestType[]>(END_POINT.GET_BLOCKS_QUESTS);

  return res.data;
};

// SHELL 생성 페이지 POST
export const postCreateSeaPearlQuest = async (dto: CreateRaffleFormDataDto) => {
  const res = await clientAxios.post<{ message: string }>(
    END_POINT.POST_SHELL_RAFFLES,
    dto
  );

  return res;
};

export const postUpdateisExposionEnabled = async (id: string) => {
  const res = await clientAxios.put<{ message: string }>(
    END_POINT.PUT_BLOCKS_QUEST_ENABLED,
    {
      id,
    }
  );

  return res;
};
