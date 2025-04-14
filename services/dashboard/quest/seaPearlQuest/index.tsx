import { END_POINT } from "@/constants/route";
import { QuestConfigRequestType } from "@/schemas/sea-pearl-quest.schema";
import { clientAxios } from "@/services";

// SHELL 전체 리스트 페이지 GET
export const getAllSeaPearlQuests = async (): Promise<QuestType[]> => {
  const res = await clientAxios.get<QuestType[]>(END_POINT.GET_BLOCKS_QUESTS);

  return res.data;
};

// SEA PEARL QUEST 생성
export const postCreateSeaPearlQuest = async (dto: QuestConfigRequestType) => {
  const res = await clientAxios.post<{ message: string }>(
    END_POINT.POST_BLOCKS_QUESTS,
    dto
  );

  return res;
};

// SEA PEARL QUEST 수정
export const postUpdateisExposionEnabled = async (id: string) => {
  const res = await clientAxios.put<{ message: string }>(
    END_POINT.PUT_BLOCKS_QUEST_ENABLED,
    {
      id,
    }
  );

  return res;
};
