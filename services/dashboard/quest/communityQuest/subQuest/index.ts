import { END_POINT } from "@/constants/route";
import {
  QuestConfigType,
  QuestConfigWithCombinedPeriod,
} from "@/schemas/quest.schema";
import { clientAxios } from "@/services";

// COMMUNITY QUEST - SUB QUESTS 전체 조회
export const getSubQuestsByCommunityId = async (
  id: string
): Promise<QuestConfigType[]> => {
  const res = await clientAxios.get<QuestConfigType[]>(
    END_POINT.GET_SUB_QUESTS(id)
  );

  return res.data;
};

// COMMUNITY QUEST - SUB QUESTS 상세 조회
export const getSubQuestDetail = async (
  id: string
): Promise<QuestConfigWithCombinedPeriod> => {
  const res = await clientAxios.get<QuestConfigWithCombinedPeriod>(
    END_POINT.GET_SUB_QUEST_DETAIL(id)
  );

  return res.data;
};

// COMMUNITY QUEST - SUB QUESTS 단일 아이템 생성
export const postCreateSubQuest = async (
  dto: QuestConfigWithCombinedPeriod
) => {
  const res = await clientAxios.put<{ message: string }>(
    END_POINT.PUT_COMMUNITY_QUEST,
    dto
  );

  return res;
};

// COMMUNITY QUEST - SUB QUESTS 수정
export const putUpdateSubQuest = async (
  dto: QuestConfigWithCombinedPeriod & { id: string }
) => {
  const res = await clientAxios.put<{ message: string }>(
    END_POINT.PUT_SUB_QUEST_DETAIL,
    dto
  );

  return res;
};

// COMMUNITY QUEST - SUB QUESTS 토글
export const putToggleSubQuest = async (dto: { id: string }) => {
  const res = await clientAxios.put<{ message: string }>(
    END_POINT.PUT_SUB_QUEST_TOGGLE,
    dto
  );

  return res;
};
