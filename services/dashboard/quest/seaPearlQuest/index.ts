import { END_POINT } from "@/constants/route";
import { QuestConfigRequestType } from "@/schemas/sea-pearl-quest.schema";
import { clientAxios } from "@/services";
import { SeaPearlQuestType } from "@/types/seaPearlQuest";

// SHELL 전체 리스트 페이지 GET
export const getAllSeaPearlQuests = async (): Promise<SeaPearlQuestType[]> => {
  const res = await clientAxios.get<SeaPearlQuestType[]>(
    END_POINT.GET_BLOCKS_QUESTS
  );

  console.log(res, "res");

  return res.data;
};

// SEA PEARL QUEST 생성
export const postCreateSeaPearlQuest = async (dto: QuestConfigRequestType) => {
  const res = await clientAxios.post<{ message: string }>(
    END_POINT.POST_BLOCKS_QUEST,
    dto
  );

  return res;
};

// SEA PEARL QUEST 토글 수정
export const postUpdateSeaPearlQuestToggle = async (id: string) => {
  const res = await clientAxios.put<{ message: string }>(
    END_POINT.PUT_BLOCKS_QUEST_ENABLED,
    {
      id,
    }
  );

  return res;
};

// SEA PEARL QUEST 단일 아이템 조회
export const getOneSeaPearlQuest = async (id: string) => {
  const res = await clientAxios.get<QuestConfigRequestType>(
    END_POINT.GET_BLOCKS_QUEST_DETAIL(id)
  );

  return res.data;
};

// SEA PEARL QUEST 단일 아이템 수정
export const putUpdateSeaPearlQuest = async (
  dto: QuestConfigRequestType & { id: string }
) => {
  const res = await clientAxios.put<{ message: string }>(
    END_POINT.PUT_BLOCKS_QUEST,
    dto
  );

  return res;
};
