import { END_POINT } from "@/constants/route";
import { QuestConfigRequestType } from "@/schemas/sea-pearl-quest.schema";
import { clientAxios } from "@/services";
import { CommunityQuestType } from "@/types/communityQuest";
import { SeaPearlQuestType } from "@/types/seaPearlQuest";

// COMMUNITY 전체 리스트 페이지 GET
export const getAllCommunityQuests = async (): Promise<
  CommunityQuestType[]
> => {
  const res = await clientAxios.get<CommunityQuestType[]>(
    END_POINT.GET_COMMUNITY_QUESTS
  );

  return res.data;
};

// COMMUNITY QUEST 생성
export const postCreateCommunityQuest = async (dto: QuestConfigRequestType) => {
  const res = await clientAxios.post<{ message: string }>(
    END_POINT.POST_COMMUNITY_QUEST,
    dto
  );

  return res;
};

// COMMUNITY QUEST 토글 수정
export const postUpdateCommunityQuestToggle = async (id: string) => {
  const res = await clientAxios.put<{ message: string }>(
    END_POINT.PUT_COMMUNITY_ENABLED,
    {
      id,
    }
  );

  return res;
};

// COMMUNITY QUEST 단일 아이템 수정
export const putUpdateCommunityQuest = async (
  dto: QuestConfigRequestType & { id: string }
) => {
  const res = await clientAxios.put<{ message: string }>(
    END_POINT.PUT_COMMUNITY_QUEST,
    dto
  );

  return res;
};
