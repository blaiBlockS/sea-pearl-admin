import { END_POINT } from "@/constants/route";
import { CommunityQuestConfigType } from "@/schemas/community-quest.schema";
import { QuestConfigWithCombinedPeriod } from "@/schemas/quest.schema";
import { clientAxios } from "@/services";
import { CommunityQuestType } from "@/types/communityQuest";
import { SeaPearlQuestType } from "@/types/seaPearlQuest";
import axios from "axios";
import { ImageType } from "react-images-uploading";

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
export const postCommunityQuest = async (
  dto: CommunityQuestConfigType & { logo?: ImageType }
) => {
  const { enabled, name, projectNumber, description, logo } = dto;

  const formData = new FormData();
  // formData.append("enabled", String(enabled));
  formData.append("projectNumber", String(projectNumber));
  formData.append("name", name);

  if (description) {
    formData.append("description", String(description));
  }
  if (dto?.logo?.file) {
    formData.append("logo", dto.logo.file);
  }

  try {
    const res = await axios.post(
      "https://seapearladmin-u4lugvc76a-uc.a.run.app/api/files/projects/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("✅ 업로드 성공", res.data);
  } catch (err) {
    console.error("❌ 업로드 실패", err);
  }

  return; //
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

// COMMUNITY QUEST 단일 아이템 조회
export const getCommunityQuestDetail = async (id: string) => {
  const res = await clientAxios.get<CommunityQuestConfigType>(
    END_POINT.GET_COMMUNITY_QUEST_DETAIL(id)
  );

  return res.data;
};

// COMMUNITY QUEST 단일 아이템 수정
export const putUpdateCommunityQuest = async (
  dto: QuestConfigWithCombinedPeriod & { id: string }
) => {
  const res = await clientAxios.put<{ message: string }>(
    END_POINT.PUT_COMMUNITY_QUEST,
    dto
  );

  return res;
};
