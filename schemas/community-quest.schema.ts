import { z } from "zod";

export const communityQuestSchema = z.object({
  enabled: z.boolean(),
  name: z.string().min(1, { message: "프로젝트 이름을 입력하세요." }),
  projectNumber: z.number().optional(),
  // file: z.instanceof(File).optional(),
  file: z.any().optional(),
  // questStartDate: z.string().default("2025-01-01T02:00:08.729Z"),
  // questEndDate: z.string().default("2080-12-31T02:00:08.729Z"),
});

// 리워드 타입 추론
export type CommunityQuestConfigType = z.infer<typeof communityQuestSchema>;
